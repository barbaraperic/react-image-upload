import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Button = (props) => {
  const {
    variant,
    className,
    disabled,
    onClick,
    children
  } = props
  const classes = useStyles();

  return (
    <MuiButton 
      variant={variant}
      className={`${classes.button} ${className}`}
      disabled={disabled}
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Button