import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#3DB46D',
    textTransform: 'none',
    color: 'white',
    fontWeight: 700,
    borderRadius: '8px',
    margin: '8px',
    '&:hover': {
      backgroundColor: '#37bf6e',
    }
  },
}));

const Button = (props) => {
  const {
    variant,
    className,
    disabled,
    type,
    onClick,
    children
  } = props
  const classes = useStyles();

  return (
    <MuiButton 
      variant={variant}
      className={`${classes.button} ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </MuiButton>
      
  );
}

Button.defaultProps = {
  variant: 'contained',
  className: '',
  disabled: false,
  onClick: () => {},
  children: 'Click'
}

Button.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Button