import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button'
import Input from './Input'

const Form = ({ handleSubmit }) => {

  const classes = useStyles();

  const [ label, setLabel ] = useState('')
  const [ url, setUrl ] = useState('')

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(label, url)
  // }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{color: '#757575'}}>Add a new photo</p>
        <Input label="Label" onChange={(e) => setLabel(e.target.value)}/>
        <Input label="Photo URL" onChange={(e) => setUrl(e.target.value)}/>
      <div className={classes.buttons}>
        <Button type="submit">Submit</Button>
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