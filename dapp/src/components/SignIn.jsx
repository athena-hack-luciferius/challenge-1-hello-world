import React from 'react';
import { Button, Typography } from '@mui/material';

export default function SignIn({signIn, version}) {
  return (
    <>
      <div className="my-4">
        <Typography variant="h4" component="h1" gutterBottom>
          Hello NEAR - {version}
        </Typography>
        <Button variant="outlined" size='large' onClick={signIn}>Log in</Button>
        <p>
            This app was developed for the XXX hackathon.
        </p>
        <p>
            Some small intro text.
        </p>
        <p>
            In order to use the app you need to sign in with your NEAR wallet.
        </p>
      </div>
      
    </>
  );
}
