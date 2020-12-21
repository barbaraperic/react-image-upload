import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MuiInputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    boxShadow: 'none',
    border: '1px solid #BDBDBD',
    borderRadius: '12px',
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins'
  },
  iconButton: {
    padding: 10,
    color: '#BDBDBD'
  },
}));

const Search = ({ placeholder }) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <MuiInputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
}

export default Search
