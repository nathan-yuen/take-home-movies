import {
  createStyles,
  Fade,
  fade,
  IconButton,
  InputBase,
  makeStyles,
  Theme} from '@material-ui/core';
import { Close,Search } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('xs')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('xs')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch'
        }
      }
    },
    clearButton: {
      marginRight: theme.spacing(1)
    }
  })
);

interface Props {
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  onSearchClear: () => void;
  value?: string;
}

export default function SearchInput(props: Props) {
  const classes = useStyles();
  
  const { onSearchChange, onSearchClear, onSearchSubmit, value } = props;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.currentTarget.value);

  const onInpuEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const text = e.currentTarget.value;
      if (text) {
        onSearchSubmit(text);
      }
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        id="search-input"
        inputProps={{ 'aria-label': 'search' }}
        onChange={onInputChange}
        onKeyDown={onInpuEnter}
        placeholder="Search…"
        value={value}
      />            
      <Fade in={value !== ''}>
        <IconButton 
          className={classes.clearButton}
          onClick={onSearchClear}
          size="small" 
        >
          <Close fontSize="small" />
        </IconButton>
      </Fade>
    </div>      
  );
}
