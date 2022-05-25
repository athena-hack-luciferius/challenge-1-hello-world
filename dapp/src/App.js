import React, { useState, useEffect } from 'react';
import NotFound from './components/404.jsx';
import Dashboard from './components/Dashboard.jsx';
import SignIn from './components/SignIn.jsx';
import Layout from './layout';
import Big from 'big.js';
import { Route, Routes } from 'react-router-dom'
var version = require('../package.json').version;

const BOATLOAD_OF_GAS = Big(3).times(10 ** 14).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet, provider, lastTransaction, error }) => {
  const [message, setMessage] = useState('');
  const [isParty, setIsParty] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  useEffect(() => {
      if (error){
        setMessage(decodeURI(error));
        window.history.pushState({}, "", window.location.origin + window.location.pathname + window.location.hash);
      }
      else if (lastTransaction && currentUser) {          
        getState(lastTransaction, currentUser.accountId);
        window.history.pushState({}, "", window.location.origin + window.location.pathname + window.location.hash);
      }

      async function getState(txHash, accountId) {
        const result = await provider.txStatus(txHash, accountId);
        const receiver = result.transaction.receiver_id;
        const method = result.transaction.actions[0].FunctionCall.method_name;
        let message;

        if(receiver === contract.contractId && method === "donate" &&
           result.status.SuccessValue){
          //retrieve messages based on transaction details
          message = Buffer.from(result.status.SuccessValue, "base64").toString();
          message = `<p class='my-1'>${message.replaceAll('"','')}</p>`
          setIsParty(true);
          message = `${message}<p class='my-1 text-sm'>${result.receipts_outcome[0].outcome.logs[0]}</p>`;
        }
        if(!message){
          //some default fallback
          message = result.status.SuccessValue ? "The transaction was successfuller" : "The transaction failed";
        }
        if(message){
          setMessage(message);
        }
      }
  }, [lastTransaction, error, currentUser, provider, contract.contractId]);

  const onHello = async (e) => {
    e.preventDefault();
    const { name_prompt } = e.target.elements;
    const donate = e.nativeEvent.submitter.value === 'donate'
    if(donate){
      const attached = Big(1).times(10 ** 23).toFixed()
      contract.donate(
        {
          name: name_prompt.value
        },
        BOATLOAD_OF_GAS,
        attached
      );
    }
    else{
      setProcessing(true);
      const message = await contract.hello(
        {
          name: name_prompt.value
        }
      );

      setProcessing(false);
      setIsParty(true);
      setMessage(message.replaceAll('"',''));
      name_prompt.value = "";
      name_prompt.focus();
    }
  }
  
  const signIn = () => {
    wallet.requestSignIn(
      {contractId: nearConfig.contractName, //contract requesting access 
       methodNames: [contract.hello.name]}, //used methods
      'Athena Challenge #1 - Hello NEAR', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.reload(false);
  };

  const clearMessage = () => {
    setIsParty(false);
    setMessage('');
  };

  //cleanup styles Login/Logout Button Popup close button, Copyright at bottom, Buttons filled
  //add github build script

  if(!currentUser){
    return (
      <Routes>
        <Route path="/" element={<Layout currentUser={currentUser} signIn={signIn} signOut={signOut} clearMessage={clearMessage} message={message} isParty={isParty}/>}>
          <Route index element={<SignIn signIn={signIn} version={version} />}/>
          <Route path="*" element={<SignIn signIn={signIn} version={version} />}/>
        </Route>
      </Routes>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={<Layout currentUser={currentUser} signIn={signIn} signOut={signOut} clearMessage={clearMessage} message={message} isParty={isParty}/>}>
        <Route index element={<Dashboard version={version} onHello={onHello} processing={processing} />}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;
