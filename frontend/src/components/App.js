import React, { useState, useEffect } from 'react';
import logo from '../logo.png';
import './App.css';
import importedContract from '../abis/drugValidation.json'
import Web3 from 'web3';
import axios from "axios";


function App() {

  const [ myAccount, setMyAccount ] = useState("");
  const [ myContract, setMyContract ] = useState("");
  const [ value, setValue ] = useState();
  const [ V1, setV1 ] = useState("");
  const [ V2, setV2 ] = useState("");
  const [ V3, setV3 ] = useState("");
  const [ V4, setV4 ] = useState("");
  const [ V5, setV5 ] = useState("");
  const [ V6, setV6 ] = useState("");
  const [ V7, setV7 ] = useState("");
  const [ V8, setV8 ] = useState("");
  const [ H1, setH1 ] = useState("");
  const [ H2, setH2 ] = useState("");
  const [ H3, setH3 ] = useState("");
  const [ Hash, setTX_Hash ] = useState("");
  // const [ TX, setTX ] = useState({});
  const [ My_H, setMy_H ] = useState([]);

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])
  
  
  const web3 = window.web3

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log(chainId);
      if(chainId !== "0x61"){

        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{ chainId: '0x61', rpcUrl: 'https://ropsten.infura.io/v3/9f65f2e7dc324b6fba99c874cecfbadd' }],
              });
            } catch (addError) {
              // handle "add" error
            }
          }
          // handle other "switch" errors
        }
        window.ethereum.on('chainChanged', handleChainChanged);
        function handleChainChanged(_chainId) {
          // We recommend reloading the page, unless you must do otherwise
          window.location.reload();
        }
      } else {      }
      // const a = await window.web3.eth.getAccounts()
      // if(a.length >= 1){
      //   axios.get("http://localhost:4100/profile?wallet="+a)
      // }  else {
      //   alert("E R R O R")
      // }



    }
    else if (window.web3) {
      window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9f65f2e7dc324b6fba99c874cecfbadd"))
      // alert(2)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  async function loadBlockchainData() {

    const web3 = (window.web3)
    // Load account
    const accounts = await web3.eth.getAccounts()
    var str = accounts[0];
    if( typeof accounts != "undefined" && accounts.length > 0){
      var start5 = str.substring(0, 5)
      var middle5 = ".....";
      var last5 = str.substring(37, 42);
      var joined = start5 + middle5 + last5
      // console.log("myAccount => " + myAccount)
      setMyAccount(joined )
      // setDisShow("block")

    }  else  {
      setMyAccount( "Connect Wallet" )
    }
      const contractData = new web3.eth.Contract(importedContract, "0x86D0943115c888C7210654053FE6988A55Cd6DCB")
      console.log(contractData);
      const value = await contractData.methods.value().call();
      console.log(value);
      setValue(value)

      
      const his1 = await contractData.methods.history(1).call();
      console.log(his1);
      setH1(his1)
      const his2 = await contractData.methods.history(2).call();
      console.log(his2);
      setH2(his2)
      const his3 = await contractData.methods.history(3).call();
      console.log(his3);
      setH3(his3)
      setMyContract(contractData)
      // setSupply(supply);      
      const a = await window.web3.eth.getAccounts()
      console.log(a);
      if(a.length >= 1){
        await axios.get("http://localhost:4100/getData?wallet="+a[0])
        .then((result) => {
          console.log(result.data.result);
          setMy_H(result.data.result);
        }).catch((err) => {
          console.log(err);
        });
      }  else {
        alert("E R R O R")
      }
  }

  async function add(e) {
    e.preventDefault()
    const web3 = (window.web3);
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    await myContract.methods.add( parseInt(V1), parseInt(V2)).send({from: accounts[0]})
    .on('transactionHash', function(hash){
      console.log("transactionHash");
      console.log(hash);
      setTX_Hash(hash)
    })
    .on('receipt', function(receipt){
        console.log("receipt");
        console.log(receipt);
        saveData(receipt, accounts[0])
        setTimeout(() => {
          setTX_Hash("");
        }, 2000);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmationNumber: "+confirmationNumber);
    })
    .on('error', function(error, receipt) {
        console.log("error");
        console.log(error);
        console.log("receipt");
        console.log(receipt);
    });

  }

  async function sub(e) {
    e.preventDefault()
    const web3 = (window.web3);
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    await myContract.methods.sub( parseInt(V3), parseInt(V4)).send({from: accounts[0]})
    .on('transactionHash', function(hash){
      console.log("transactionHash");
      console.log(hash);
      setTX_Hash(hash)
    })
    .on('receipt', function(receipt){
        console.log("receipt");
        console.log(receipt);
        saveData(receipt, accounts[0])
        setTimeout(() => {
          setTX_Hash("");
        }, 2000);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmationNumber: "+confirmationNumber);
    })
    .on('error', function(error, receipt) {
        console.log("error");
        console.log(error);
        console.log("receipt");
        console.log(receipt);
    });

  }

  async function mul(e) {
    e.preventDefault()
    const web3 = (window.web3);
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    await myContract.methods.mul( parseInt(V5), parseInt(V6)).send({from: accounts[0]})
    .on('transactionHash', function(hash){
      console.log("transactionHash");
      console.log(hash);
      setTX_Hash(hash)
    })
    .on('receipt', function(receipt){
        console.log("receipt");
        console.log(receipt);
        setTimeout(() => {
          setTX_Hash("");
        }, 2000);
        saveData(receipt, accounts[0])
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmationNumber: "+confirmationNumber);
    })
    .on('error', function(error, receipt) {
        console.log("error");
        console.log(error);
        console.log("receipt");
        console.log(receipt);
    });

  }

  async function div(e) {
    e.preventDefault()
    const web3 = (window.web3);
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    await myContract.methods.div( parseInt(V7), parseInt(V8)).send({from: accounts[0]})
    .on('transactionHash', function(hash){
      console.log("transactionHash");
      console.log(hash);
      setTX_Hash(hash)
    })
    .on('receipt', function(receipt){
        console.log("receipt");
        console.log(receipt);
        saveData(receipt, accounts[0])
        setTimeout(() => {
          setTX_Hash("");
        }, 2000);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmationNumber: "+confirmationNumber);
    })
    .on('error', function(error, receipt) {
        console.log("error");
        console.log(error);
        console.log("receipt");
        console.log(receipt);
    });

  }
  async function inc() {
    const web3 = (window.web3);
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    await myContract.methods.inc().send({from: accounts[0]})
    .on('transactionHash', function(hash){
      console.log("transactionHash");
      console.log(hash);
      setTX_Hash(hash)
    })
    .on('receipt', function(receipt){
        console.log("receipt");
        console.log(receipt);
        saveData(receipt, accounts[0])
        setTimeout(() => {
          setTX_Hash("");
        }, 2000);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmationNumber: "+confirmationNumber);
    })
    .on('error', function(error, receipt) {
        console.log("error");
        console.log(error);
        console.log("receipt");
        console.log(receipt);
    });

  }
  
  async function dec() {
    const web3 = (window.web3);
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    await myContract.methods.dec().send({from: accounts[0]})
    .on('transactionHash', function(hash){
      console.log("transactionHash");
      console.log(hash);
      setTX_Hash(hash)
    })
    .on('receipt', function(receipt){
        console.log("receipt");
        console.log(receipt);
        saveData(receipt, accounts[0])
        setTimeout(() => {
          setTX_Hash("");
        }, 2000);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmationNumber: "+confirmationNumber);
    })
    .on('error', function(error, receipt) {
        console.log("error");
        console.log(error);
        console.log("receipt");
        console.log(receipt);
    });

  }

  async function saveData(tx, wallet) {
    const aaa = await myContract.methods.history(3).call()

    await axios.post("http://localhost:4100/saveData", {
      wallet: wallet,
      value: aaa,
      transaction: tx
    }).then((result) => {
      loadBlockchainData()
    }).catch((err) => {
      alert("Error")
    });

  }


  return (
    <div style={{ margin: "15px"}}>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://github.com/MustafaAlvi21/boilerplate-dApp-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
      </nav>

    <br />  <br />  <br />  <br />

    <h5>Transaction Hash: {Hash} </h5>
    <div>
        <form action="" onSubmit={(e) => add(e)}>
            <input type="number" id="a1" value={V1} onChange={ (e) => { setV1(e.target.value)}} required />
            <input type="number" id="a2" value={V2} onChange={ (e) => { setV2(e.target.value)}} required />
            <input type="submit" id="add"  value="add btn"  />
        </form>
    </div>
    <div>
    <form action="" onSubmit={(e) => sub(e)}>
            <input type="number" id="a1" value={V3} onChange={ (e) => { setV3(e.target.value)}} required />
            <input type="number" id="a2" value={V4} onChange={ (e) => { setV4(e.target.value)}} required />
            <input type="submit" id="add"  value="sub btn"  />
        </form>
    </div>
    <div>
        <form action="" onSubmit={(e) => mul(e)}>
        <input type="number" id="a1" value={V5} onChange={ (e) => { setV5(e.target.value)}} required />
            <input type="number" id="a2" value={V6} onChange={ (e) => { setV6(e.target.value)}} required />
            <input type="submit" id="mul"  value="mul btn" />
        </form>
    </div>
    <div>
        <form action="" onSubmit={(e) => div(e)}>
        <input type="number" id="a1" value={V7} onChange={ (e) => { setV7(e.target.value)}} required />
            <input type="number" id="a2" value={V8} onChange={ (e) => { setV8(e.target.value)}} required />
            <input type="submit" id="div"  value="div btn " />
        </form>
    </div>
    <div>
        <button onClick={inc}>inc</button>
        <button onClick={dec}>dec</button>
    </div>

    <div>
        <h5>value  :  <span id="value" > { value } </span></h5>
    </div>
    <div style={{display: 'flex'}}>
      <div>
          <h5>OverAll History</h5>
          <p id="h3">latest : { H3 }</p>
          <p id="h2">previous 1 : { H2 }</p>
          <p id="h1">previous 2 : { H1 }</p>
      </div>
      <div style={{marginLeft: "20px"}}>
          <h5>Your History</h5>
          {console.log(My_H)}
          <p id="h3"> { My_H.map((i, key)=>{
              return(
                <p key={key}> {i.value} </p>
              )
          }) }</p>
          {/* <p id="h2">previous 1 : { H2 }</p>
          <p id="h1">previous 2 : { H1 }</p> */}
      </div>
    </div>
    </div>
  );

}

export default App;