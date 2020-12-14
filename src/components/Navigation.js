import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import InputBase from './InputBase'
import logoIcon from '../images/logo.svg'

const Navigation = () => {

  const [image, setImage ] = useState({ preview: '', raw: ''})

  const classes = useStyles();

  const handleChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
     })
  }
  
  console.log('image', image)

  const handleUpload = () => {
    axios.post('/image-upload', image)
      .then(res => console.log('>>>', res))
  }

  return (
    <div className={classes.container}>
      <div className={classes.searchItems}>
        <img src={logoIcon} alt="logoIcon" className={classes.logo}/>
        <InputBase placeholder="Search by name"className={classes.search}/>
      </div>
      <input type="file" className={classes.input} onChange={handleChange} />
      <Button type="file" className={classes.button} onClick={handleUpload}>Add a photo</Button>
    </div>
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
  }
}))

export default Navigation