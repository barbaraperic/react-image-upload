import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import Input from './Input'

const Form = () => {

  const classes = useStyles();

  return (
    <form >
      <p style={{color: '#757575'}}>Add a new photo</p>
        <Input label="Label" />
        <Input label="Photo URL" />
      <div className={classes.buttons}>
        <Button>Submit</Button>
      </div>
    </form>
  )
}

const useStyles = makeStyles(() => ({
  inputs: {
    display: 'grid',
    textAlign: 'center'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
}))

export default Form