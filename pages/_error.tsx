import { Error } from '@material-ui/icons';
import { NextPageContext } from 'next/dist/next-server/lib/utils';
import React from 'react';

import Empty from '../components/core/Empty';

export default function ErrorPage({ statusCode }) {
  let message: string;
  
  if (statusCode === 404) {
    message = 'Page Not Found';
  } else if (statusCode >= 500) {
    message = `Unexpected Error (${statusCode})`;
  } else {
    message = `Unknown Error (${statusCode})`;
  }

  return (
    <Empty
      Icon={Error}
      message={message}
    />
  );
}

ErrorPage.getInitialProps = ({ err, res } : NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
