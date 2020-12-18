import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import Input from './Input'

const Form = () => {

  const classes = useStyles();

  return (
    <form >
      <p style={{textAlign: 'center', color: '#757575'}}>Add a new photo</p>
      <div className={classes.inputs}>
        <Input label="Label" />
        <Input label="Photo URL" />
      </div>
      <div className={classes.buttons}>
        <Button>Submit</Button>
      </div>
    </form>
  )
}

const useStyles = makeStyles(() => ({
  form: {
    margin: 'auto',
    width: '50%',
    border: '1px solid green',
    padding: '10px',
    borderRadius: '8px'
  },
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