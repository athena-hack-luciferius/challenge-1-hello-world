import React from 'react';
import { Outlet } from 'react-router-dom'
import { IconButton, Typography, Link as MuiLink, Tooltip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import Popup from './components/Popup';

function Copyright() {
  return (
    <Typography variant="body1" color="text.secondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://twitter.com/FoobaFun">
        Crypto Sketches
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Layout = ({currentUser, signIn, signOut, clearMessage, message, isParty}) => {
  return (
    <>
      <div id="App">
          <main id="page-wrapper" className='flex flex-col justify-between h-full py-5 text-center'>
            <Outlet/>
            <Copyright/>
          </main>
          { currentUser
            ? <Tooltip title={'Log out ' + currentUser.accountId + '.'} arrow>
                <IconButton onClick={signOut} size="large" className='absolute top-0 right-0 m-2'>
                  <AccountBalanceWalletIcon fontSize="large" color='primary' />
                </IconButton>
              </Tooltip>
            : <Tooltip title='Log in using NEAR wallet.' arrow>
                <IconButton onClick={signIn} size="large" className='absolute top-0 right-0 m-2'>
                  <BrokenImageIcon fontSize="large" color='primary' />
                </IconButton>
              </Tooltip>
          }        
          {message && <Popup
            content={<>
              <b>A message for you</b>
              <p>{message}</p>
            </>}
            handleClose={clearMessage}
            isParty={isParty}
          />}
      </div>
    </>
  );
};

export default Layout;