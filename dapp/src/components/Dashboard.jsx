import React from 'react';
import { Typography, Button, Tooltip, TextField, Box } from '@mui/material';

const Dashboard = ({version, onHello}) => {

  return <>
          <div className="my-4 flex flex-col">
            <Typography variant="h4" component="h1" gutterBottom>
              Hello NEAR - {version}
            </Typography>
            <Typography variant="body1" component="p" className='text-lg my-2'>
              This app was developed for the Athena NEAR hackathon.
            </Typography>
            <Typography variant="body1" component="p" className='my-2'>
              This app demonstrates a simple hello world contract. Just enter your name and say hello.
              You can either say hello with or without attached NEAR. Without attached NEAR there is no
              confirmation necessary. When you attache some NEAR you need to confirm the called function.
            </Typography>
            <Box component="form" onSubmit={onHello}>
              <TextField id="name_prompt" label="Your Name" variant="outlined" className="my-4 self-center"
                          required autoFocus/>
              <div className='flex flex-row my-4 self-center'>
                <Tooltip title="Without attached NEAR." arrow className='mx-4'>
                  <Button size='large' className="self-center" variant="outlined" value="hello"
                          type="submit">
                    Say Hello!
                  </Button>
                </Tooltip>
                <Tooltip title="With 0.1 NEAR attached." arrow className='mx-4'>
                  <Button size='large' className="self-center" variant="outlined" value="donate"
                          type="submit">
                    Donate!
                  </Button>
                </Tooltip>
              </div>
            </Box>
          </div>
        </>
}

export default Dashboard;