import React from 'react';
import { Button, Typography } from '@mui/material';

export default function SignIn({signIn, version}) {
  return (
    <>
      <div className="my-4">
        <Typography variant="h4" component="h1" gutterBottom>
          Hello NEAR - {version}
        </Typography>
        <Typography variant="body1" component="p" className='my-4'>
            This app was developed for the athena-NEAR hackathon. It demonstrates a simple Hello World smart contract together with an app.
            In order to use the app you need to sign in with your NEAR wallet.
        </Typography>
        <Button variant="outlined" size='large' onClick={signIn} className="self-center">Log in</Button>
      </div>
      
    </>
  );
}
