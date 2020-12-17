import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import InputBase from './InputBase'
import logoIcon from '../images/logo.svg'

const Navigation = () => {

  const [ image, setImage ] = useState(null)
  const [ newImages, setNewImages ] = useState([])
  const [ images, setImages ] = useState()
  const [ error, setError ] = useState(false)
  const [ message, setMessage ] = useState('')

  const classes = useStyles();

  useEffect(() => {
    axios.get('/images').then(result => {
      setImages(result)
    }).catch(error => {
      setError(true)
      setMessage(error)
    })
  }, [images])

  const handleChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleUpload = () => {
    const data = new FormData()
    data.append('image', image)
    axios.post('http://localhost:9000/image-upload', data, {
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(res => {
      const image = res.data.result
      setNewImages(prevState => ([
        ...prevState,
        image
      ]))
    }).catch(error => {
      console.error(error)
    })
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.searchItems}>
          <img src={logoIcon} alt="logoIcon" className={classes.logo}/>
          <InputBase placeholder="Search by name"className={classes.search}/>
        </div>
        <input type="file" className={classes.input} onChange={handleChange} />
        <Button type="submit" className={classes.button} onClick={handleUpload}>Add a photo</Button>
      </div>
      <div className={classes.grid}
      >
        {images && (
          images.data.result.resources.map((image, i) => (
            <img 
              src={image.url} 
              alt={image.resource_type} 
              key={i}
              className={classes.gridItem}
            />
          ))
        )}
      </div>
    </React.Fragment>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px'
  },
  searchItems: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    boxShadow: 'none',
    border: '1px solid #BDBDBD',
    color: '#BDBDBD',
    borderRadius: '12px',
  },
  logo: {
    marginRight: '16px'
  },
  button: {
    backgroundColor: '#3DB46D',
    textTransform: 'none',
    color: 'white',
    fontWeight: 700,
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: '#37bf6e',
    }
  },
  grid: {
    padding: '16px',
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
  },
  gridItem: {
    float: 'left',
    width: '260px',
    height: '160px',
    borderRadius: '8px',
    objectFit: 'cover',
    filter: 'grayscale(100%)',
  },
}))

export default Navigation