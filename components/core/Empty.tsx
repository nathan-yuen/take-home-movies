import { makeStyles, SvgIconProps, Typography } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';
import React from 'react';

interface Props {
  Icon: SvgIconComponent;
  iconProps?: SvgIconProps;
  message?: string | JSX.Element;
}

const useStyles = makeStyles({
  empty: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '60vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyIcon: {
    fontSize: '10em'
  }
});

export default function Empty(props: Props) {
  const classes = useStyles();
  
  const { Icon, iconProps, message } = props;

  return (
    <div className={classes.empty}>
      <Icon className={classes.emptyIcon} {...iconProps} />
      <Typography className="empty-message">{message}</Typography>
    </div>
  );
}
