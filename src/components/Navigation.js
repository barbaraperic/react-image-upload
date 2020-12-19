import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import Search from './Search'
import Modal from './Modal'
import Input from './Input'
import logoIcon from '../images/logo.svg'

const Navigation = () => {

  const [ open, setOpen ] = useState(false);
  const [ label, setLabel ] = useState('')
  const [ url, setUrl ] = useState('')

  const classes = useStyles();

  // useEffect(() => {
  //   axios.get('/images').then(result => {
  //     setImages(result)
  //   }).catch(error => {
  //     // setError(true)
  //     // setMessage(error)
  //   })
  // }, [images])

  
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
    }).then(res => {console.log('>>', res)})
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.searchItems}>
          <img src={logoIcon} alt="logoIcon" className={classes.logo}/>
          <Search placeholder="Search by name"className={classes.search} />
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