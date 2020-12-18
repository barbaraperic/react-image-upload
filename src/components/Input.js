import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const Input = (props) => {
  const { 
    label, 
    id,
    helperText,
    className, 
    variant, 
    onChange } = props

  const classes = useStyles();

  return (
    <TextField 
      id={id} 
      label={label}
      helperText={helperText}
      variant={variant}
      className={`${classes.input} ${className}`}
      onChange={onChange}
    />
  )
}

const useStyles = makeStyles(() => ({
  input: {
    width: '200px',
    margin: '8px'
  }
}))

Input.defaultProps = {
  id: '',
  label: '',
  helperText: '',
  variant: 'outlined',
  className: '',
  onChange: () => {}
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Input