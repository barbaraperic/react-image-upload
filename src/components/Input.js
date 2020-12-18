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
    placeholder,
    onChange } = props

  const classes = useStyles();

  return (
    <TextField 
      id={id} 
      label={label}
      helperText={helperText}
      placeholder={placeholder}
      variant={variant}
      className={`${classes.input} ${className}`}
      onChange={onChange}
    />
  )
}

const useStyles = makeStyles(() => ({
  input: {
    width: '350px',
    margin: '12px 0'
  }
}))

Input.defaultProps = {
  id: '',
  label: '',
  helperText: '',
  placeholder: '',
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