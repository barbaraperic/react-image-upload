import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import Search from './Search'
import Modal from './Modal'
import Input from './Input'
import logoIcon from '../images/logo.svg'

const Home = () => {

  const [ open, setOpen ] = useState(false);
  const [ label, setLabel ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ images, setImages ] = useState([])
  const [ error, setError ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ render, setRender ] = useState(false)
  const [ search, setSearch ] = useState('')

  const classes = useStyles();

  const getImages = () => {
    axios.get('/images').then(result => {
      setImages(result.data)
      setLoading(false)
    }).catch(error => {
      setError(true)
    })
  }

  useEffect(() => {
    getImages()
  }, [render])
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(false);
    axios.post('/image-upload', {
      label,
      url
    }).then(res => {
      setRender((prevState) => !prevState)
    })
  }

  const handleDeleteImage = (e) => {
    const _id = e.target.getAttribute("data-id")
    axios.delete('/image-delete', {
      data:  {data: _id}
    }).then(res => {
      setRender((prevState) => !prevState)
    }).catch(error => {
      throw error
    })
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    if (search.length <= 1 ) {
      getImages()
    }
  }

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const filterImages = images.filter(image => image.label === search)
      if (filterImages.length > 0) {
        setImages(filterImages)
      }
    }
  }, [search]);

  const totalImages = Object.keys(images).length
  console.log('images',images)

  if(loading) {
    return <p style={{ textAlign: 'center'}}>Loading</p>
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.searchItems}>
          <img src={logoIcon} alt="logoIcon" className={classes.logo}/>
          <Search 
            placeholder="Search by label"
            className={classes.search} 
            onChange={handleSearch}
            value={search}
          />
        </div>
        <Button onClick={handleOpen}>Add a photo</Button>
      </div>
      <div className={classes.grid}>
      </div>
       <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <p style={{color: '#757575'}}>Add a new photo</p>
            <Input label="Label" onChange={(e) => setLabel(e.target.value)}/>
            <Input label="Photo URL" onChange={(e) => setUrl(e.target.value)}/>
          <div style={{ textAlign: 'end'}}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
       </Modal>
       <div className={classes.layout} >
        {totalImages > 0 && (
          images.map((image, index) => (
            <div key={index} className={classes.gridItem} >
              <button 
                data-id={image._id} 
                className={classes.button} 
                onClick={handleDeleteImage}
                style={{ display: 'none'}}
              >
                Delete
              </button>
              <img 
                src={image.url} 
                alt={image.label}
                key={index}
                className={classes.image}
                style={{ width: '200px', height: '200px'}}
              />
              <p className={classes.label} style={{ display: 'none'}}>{image.label}</p>
            </div>
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
  layout: {
    display: 'grid',
    gridTemplateRows: 'auto',
    margin: '24px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
    gap: '1rem',
  },
  gridItem: {
    width: '100%',
    maxWidth: '16rem',
    position: 'relative',
    '&:hover': {
      '& $button': {
        display: 'block !important',

      },
      '& $label': {
        display: 'block !important',
      }
    }
  },
  button: {
    position: 'absolute',
    top: '9px',
    left: '138px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'red',
    border: '1px solid',
    fontWeight: '500',
    display: '',
    cursor: 'pointer',
  },
  label: {
    position: 'absolute',
    bottom: '-6px',
    left: '8px',
    textShadow: '1px 1px #888888'
  },
  image: {
    objectFit: 'cover',
    borderRadius: '8px',
    '&:hover .button': {
      opacity: '0.5'
    } 
  }
}))

export default Home