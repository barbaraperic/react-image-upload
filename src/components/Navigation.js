import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import InputBase from './InputBase'
import logoIcon from '../images/logo.svg'

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

const Navigation = () => {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.searchItems}>
        <img src={logoIcon} alt="logoIcon" className={classes.logo}/>
        <InputBase placeholder="Search by name"className={classes.search}/>
      </div>
      <Button className={classes.button}>Add a photo</Button>
    </div>
  )
}

export default Navigation