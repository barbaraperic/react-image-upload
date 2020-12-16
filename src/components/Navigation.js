import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import InputBase from './InputBase'
import logoIcon from '../images/logo.svg'
import Masonry from 'react-masonry-css'


const Navigation = () => {

  const [ image, setImage ] = useState(null)
  const [ newImages, setNewImages ] = useState([])

  const classes = useStyles();

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
        setNewImages(state => [...state, image])
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
      <Masonry
        breakpointCols={3}
        className={classes.myMasonryGrid}
        columnClassName={classes.myMasonryGridColumn}
      >
        {newImages && (
            newImages.map((image, i) => (
              <img 
                key={i}
                src={image.url} 
                alt={image.original_filename}
                className={classes.image}
              />
            ))
          )}
      </Masonry>
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
  image: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    margin: '8px'
  },
  myMasonryGrid: {
    display: "-webkit-box", /* Not needed if autoprefixing */
    display: 'flex',
    marginLeft: '-30px', /* gutter size offset */
    width: 'auto'
  },
  myMasonryGridColumn: {
    paddingLeft: '30px', /* gutter size */
    backgroundClip: 'paddingBox'
  }
}))

export default Navigation