import { useEffect, React, useState, useContext } from "react";
import "./Home.scss";
import RData from "../../Sass/img/R.png";
import { URL } from "../../Utils/url";
import LogoIcon from "../../Sass/img/Logoicon.svg";
import USDC from "../../Sass/img/USDC.png";
import ABI from '../../abi.json';
import ABIEther from '../../abiether.json'

import SOL from '../../Sass/img/Sol.png'
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../../Utils/cookieHandling";
import HeaderNavigator from "../../Components/Header/HeaderNavigator";
import { UserRoleContext } from "../../Utils/UserAuthorization";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ethers } from "ethers";
import { BigNumber as BN } from "bignumber.js";
import { PublicKey,clusterApiUrl ,Connection,LAMPORTS_PER_SOL,Transaction,SystemProgram,sendAndConfirmTransaction,Keypair} from "@solana/web3.js";
import * as spltoken  from '@solana/spl-token';
import { base58 } from "ethers/lib/utils";
import Bscchain from "./Bscchain";
import Ethchain from "./Ethchain";
import getWeb3 from "../../Utils/getWeb3";
import USDT from "../../Sass/img/USDT.png";
import BTC from "../../Sass/img/BTC.png";
import AUTO from "../../Sass/img/AUTO.png";
import EPS from "../../Sass/img/EPS.png";
import MBOX from "../../Sass/img/MBOX.png";
import XVS from "../../Sass/img/XVS.png";
import CAKE from "../../Sass/img/CAKE.png";
import BUSD from "../../Sass/img/BUSD.png";
import ETH from "../../Sass/img/ETH.png";
import AAVE from '../../Sass/img/aave.png';
import UNI from '../../Sass/img/uniswap.png'
import COMP from '../../Sass/img/compound.png'
import INST from '../../Sass/img/instadapp.png'
import BAL from '../../Sass/img/balancer.png'
import SUSHI from '../../Sass/img/sushiswap.png'
import YEARN from '../../Sass/img/yearn.png'
import DAI from '../../Sass/img/dai.png'
import CVX from '../../Sass/img/convex.png';
import LDO from '../../Sass/img/lido.png';
import CardloadMetamsk from "./CardloadMetamsk";





export default function Home() {
  var web3=require('web3')
  let {solana} =window;
  let rpc="https://solana-mainnet.g.alchemy.com/v2/gpAYaj6fl70Q-o6wSS9vXfB0sujfSoOl";
  const connection =new Connection(rpc, 'confirmed');
  const [currentBalance, setCurrentBalance] = useState("");
  const navigate = useNavigate();
  const roleContext = useContext(UserRoleContext);
  const [partner, setPartner] = useState(null);
  const [bal, setbalance] = useState(0);
  const [balanceData, newBalanceData] = useState(null);
  const [hideModal, sethideModal] = useState(false);
  const [priceUSDC, setUSDC] = useState(null);
  const [priceSol,setSol]=useState(null);
  const [settingsSOL, setSettingsSOL] = useState(null);
  const [settingsUSDC, setSettingsUSDC] = useState(null);
  const [cardLoadFee, setCardLoadFee] = useState(null);
  const [wallletBalance, setWalletBalance] = useState(null);
  const [amount, setAmount] = useState(null);
  const [disableForm, setDisableForm] = useState(true);
  const [settings, setSettings] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [settingsConstants, setSettingsConstants] = useState(null);
  const [tokenSettingsConstants, setTokenSettingsConstants] = useState(null);
  const [currentChain,setCurrentChain]=useState('')




  const [tokenArray, setTokenArray] = useState([
    "SOL",
    "USDC",
  ]);
   


 


  const [phantomBalance, setPhantomBalance] = useState([]);
  
  const calculatePhantomBalance = async () => {
  let tempArr=[];
 
  tokenArray.map(async(a,b)=>{
    const index = initialData.findIndex(data => data.token === a)
    if (a.toUpperCase() == "SOL") {
       connection.getBalance(solana.publicKey).then((res) => {
        let amt = res / LAMPORTS_PER_SOL;
        tempArr.push({
          token: a,
          balance:amt
        })
      });
    }
    if(a.toUpperCase() == "USDC"){
     connection
        .getParsedTokenAccountsByOwner(solana.publicKey, {mint: new PublicKey(initialData[index].address),})
        .then((res) => {
          if (res.value.length > 0) {
            let amt =res.value[0].account.data.parsed.info.tokenAmount.uiAmount;
            tempArr.push({
              token: a,
              balance:amt
            })
          }
        });
    }
  })
    setPhantomBalance(tempArr)
  }

useEffect(()=>{
    if(roleContext.currentChain){
      setCurrentChain(roleContext.currentChain)
    }
},[roleContext.currentChain])







  const initialData = [
    {
      token:'SOL'
    },
    {
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      token: 'USDC'
    }
  ]
  const [addressesArray, setAddressesArray] = useState(initialData)
  const convertToBigNumber = (val) => {
    return ethers.utils.parseEther(val.toString()).toString()
  }
  const convertFromBigNumber = (val) => {
    return ethers.utils.formatEther(val.toString()).toString()
  }
  const calculateDecimal = (value) => {
    if (value != undefined) {
      var num = value;

      if (value.toString().match(/^-?\d+(?:\.\d{0,2})?/)) {
        var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        return with2Decimals;
      } else {
        return value;
      }

    }
    return 0;
  };

  const calculateDecimalFor8 = (value) => {

    if (value != undefined && value != null) {
      var num = value;
      var with5Decimals = num.toString().match(/^-?\d+(?:\.\d{0,8})?/)[0];
      return with5Decimals;
    }
    return 0;
  };
  const [state, setState] = useState({
    token: "",
    amount: "",
    total_amount: "",
  });

  window.onload = () => {

    if ("solana" in window) {
       solana = window.solana;
    }
}

    useEffect(() => {
    if (localStorage.getItem("phantomId")  && localStorage.getItem("token")){
      checkSolana();
    }
  }, [solana]);

  const checkSolana=()=>{

    if(solana){
   solana.connect({onlyIfTrusted:true}).then(()=>{


      calculatePhantomBalance()
      checktoWhitelist();
      calculateDecimal(20);
      setInterval(function () {
          priceHandler();
          getSettings();
        getBalanceHandler();
        partnerCheck();
      }, 3000);
        setInterval(function () {
        if(localStorage.getItem('currentChain')==='SOL'){
        calculatePhantomBalance()
        }
      }, 10000);
      getSettings();
      partnerCheck();
      getBalanceHandler();
      priceHandler();
  
    })
  }
  }



  const loadCardSubmit = async () => {
    setshowModal(true)
  };
  const updateUserBalanceHandler = (token, amount) => {
    axios
      .post(`${URL}/users/updateUserBalance?userAddress=${getCookie("phantomId")}&symbol=${token.toLowerCase() == "cake" ? "Cake" : token.toLowerCase() == "bnb" ? "bnb" : token.toLowerCase() == "btcb" ? "btcb" : token.toLowerCase() == "busd" ? "busd" : token.toLowerCase() == "eth" ? "eth" : token}&amount=${amount * Math.pow(10, 18)}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      })
      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const contractCall = async () => {
    let amountConst = state.amount;
    console.log(amountConst)
    axios.post(`${URL}/users/initiateCardPayment`, {
      amount: amountConst,
      userAddress: getCookie("phantomId"),
      chainId: 'sol',
      assetType: state.token.toLowerCase()=="sol" ? "sol" : state.token,
    }, {
      headers: {
        Authorization: getCookie("token"),
      },
    },).then(async (res) => {

      if (res.status === 200 || res.status === 201) {
 
     
    if ( state.token == 'SOL') {
      try{
        let from=new PublicKey(solana.publicKey.toBase58())
        let deposit=new PublicKey('EbMggJzRHFdShhWJS1fRzt7JzDGejPheRgPgy4d9scJj');

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey:from,
          toPubkey: deposit,
          lamports: LAMPORTS_PER_SOL * amountConst,
        })
      )


    transaction.feePayer = from;
    let latestBlockHash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = await latestBlockHash.blockhash;

    if(transaction) {
      console.log("Txn created");
    }
    let signed = await solana.signTransaction(transaction)
    let signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction({
      signature,      
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      blockhash: latestBlockHash.blockhash
    }).then(()=>{
      calculatePhantomBalance();
    })
  }catch(e){
    console.log(e)
    toast.error('Transaction Failed')
  }
  }
    if(state.token == "USDC"){
      try{

      let fromPublicKey=new PublicKey(solana.publicKey.toBase58());
      let ToAccount = new PublicKey("EbMggJzRHFdShhWJS1fRzt7JzDGejPheRgPgy4d9scJj");
      let UsdcAddress = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
     
      let USDC_Token=new spltoken.Token(
        connection,
        UsdcAddress,
        spltoken.TOKEN_PROGRAM_ID,
        fromPublicKey
      )
      console.log(USDC_Token)

      const fromTokenAcc=await USDC_Token.getOrCreateAssociatedAccountInfo(
        fromPublicKey
      )

       const toTokenAcc=await USDC_Token.getOrCreateAssociatedAccountInfo(
      ToAccount
      )
  
      var transaction =await  new  Transaction()
      .add(
        spltoken.Token.createTransferInstruction(
          USDC_Token.programId,
          fromTokenAcc.address,
          toTokenAcc.address,
          fromPublicKey,
          [],
          amountConst * 1000000
        )
        );
      transaction.feePayer = fromPublicKey;
      let latestBlockHash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = await latestBlockHash.blockhash;
  
      if(transaction) {
        console.log("Txn created");
      }
      let signed = await solana.signTransaction(transaction);
      let signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction({
        signature,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        blockhash: latestBlockHash.blockhash,
    }).then(()=>{
        calculatePhantomBalance();
  
      })
    }catch(e){
      toast.error("Transaction Failed")
    }

  }
}

})



}



  const checktoWhitelist = () => {
    axios
      .get(`${URL}/admin/cardapplyAndWhitelist/${getCookie('phantomId')}`)
      .then(function (response) {
        if (response.status === 200) {

          if (getCookie("token")){

            if (
              response.data.jdbCardNumber1.length === 16 &&
              response.data.card_activated === 2
            ) {
              setDisableForm(false);
            } else {
              setDisableForm(true);
            }
        } }else {
          //  toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        // toast.success(error);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("balance")) {
      setbalance(sessionStorage.getItem("balance"));
    }
  }, [sessionStorage.getItem("balance")]);

  const getBalanceHandler = async () => {
    axios
      .get(`${URL}/users/walletBalance/${getCookie("phantomId")}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          newBalanceData(response.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {

        toast.success(error);
      });
  };
  const confirmCardLoad = async () => {
    let totalAmount = ((layerPricing(state.token) * state.amount) - (parseInt(cardLoadFee) / 100));
    axios
      .post(`${URL}/users/createCardPayment`, {
        "cardLoadAmount": totalAmount,
        "otcAmount": state.token == "USDC" || state.token == 'BUSD' ? totalAmount * (settingsConstants / 100) : totalAmount * (tokenSettingsConstants / 100),
        "partnerFee": partner ? (totalAmount * (partner.partner_otc / 100)) : 0,
        "assetType": state.token.toLowerCase()== "sol" ? 'sol' : state.token,
        "prvFee": partner ? (totalAmount * (partner.prv_otc / 100)) : 0,
        "userAddress": getCookie("phantomId"),
        "quantity": state.totalAmount,
      })
      .then(function (response) {
        if (response.status === 200) {
          toast.success(response.data.message);
          setshowModal(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  };
  const priceHandler = async () => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/price`,
        {
          method: "GET",
          headers: {},
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        data.map((a, b) => {
          if (a.symbol === "USDCUSDT") {
            setUSDC(a);
          }
          if (a.symbol === "SOLUSDT") {
            setSol(a)
          }
        });
      }
    } catch (err) {

    } finally {
    }
  };



  const copyAddressToClipboard = () => {
    // axios
    //   .get(`${URL}/users/getDepositAddress`, {
    //     headers: {
    //       Authorization: getCookie("token"),
    //     },
    //   })
    //   .then(function (response) {
    //     if (response.status === 200) {
    //       navigator.clipboard.writeText(response.data.address);
    //       toast.success("Address copied to clipboard");
    //     } else {
    //       toast.error(response.data.message);
    //     }
    //   })
    //   .catch(function (error) {
    //     toast.success(error);
    //   });
  };

  const getSettings = async () => {
    axios
      .get(`${URL}/users/getBSCOne`, {
        headers: {
          Authorization: getCookie('token'),
        },
      })
      .then(function (response) {
        setCardLoadFee(response.data.card_load_fee)
        setTokenSettingsConstants(response.data.sol_token_otc_percentage)
        setSettingsConstants(response.data.sol_stables_otc_per)
        response.data.sol_token_otc_options.map((a, b) => {
          if (a.label === 'SOL') {
            setSettingsSOL(response.data.sol_token_otc_percentage)
          }
          if (a.label === 'USDC') {
            setSettingsUSDC(response.data.sol_token_otc_percentage)
          }
        })
        response.data.sol_stables_otc_options.map((a, b) => {
          if (a.label === 'USDC') {
            setSettingsUSDC(response.data.sol_stables_otc_per)
          }
          if (a.label === 'SOL') {
            setSettingsSOL(response.data.sol_stables_otc_per)
          }
        })
      })
      .catch(function (error) {})
  }

  //partner check
  const partnerCheck = async () => {
    var config = {
      method: 'get',
      url: `${URL}/users/partner/` + getCookie("partnerName"),
      headers: {}
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setPartner(response.data);
        }
      })
      .catch(function (error) {

      });
  }
  //layer 1 pricing    ////    price-
  const valueCalculator = (price, otc, prv, setting) => {
    return (price - ((price * setting) / 100)) - ((otc * price) / 100 + (prv * price) / 100);
  }
  const layerPricing = (value1) => {

    if (value1 === "SOL") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsSOL != null) {
        return calculateDecimal(valueCalculator(priceSol?.price, partner?.partner_otc, partner?.prv_otc, settingsSOL));
      }
      else if (settingsSOL && settingsSOL !== 0) {
        return calculateDecimal((priceSol?.price) - (priceSol?.price * (settingsSOL / 100)))
      } else {
        return priceSol?.price;
      }
    } else if (value1 === "USDC") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsUSDC != null) {
        return calculateDecimal(valueCalculator(priceUSDC?.price, partner?.partner_otc, partner?.prv_otc, settingsUSDC));
      }

      else if (settingsUSDC && settingsUSDC !== 0) {
        return calculateDecimal((priceUSDC?.price) - (priceUSDC?.price * (settingsUSDC / 100)))
      } else {
        return priceUSDC?.price;
      }
    } else {
      return 0;
    }
  };


  function convert(n) {
    var sign = +n < 0 ? "-" : "",
      toStr = n.toString();
    if (!/e/i.test(toStr)) {
      return n;
    }
    var [lead, decimal, pow] = n.toString()
      .replace(/^-/, "")
      .replace(/^([0-9]+)(e.*)/, "$1.$2")
      .split(/e|\./);
    return +pow < 0
      ? sign + "0." + "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) + lead + decimal
      : sign + lead + (+pow >= decimal.length ? (decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))) : (decimal.slice(0, +pow) + "." + decimal.slice(+pow)))
  }



  return (
    <>
      {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? "" : <HeaderNavigator />}
      <div className="background-imagetest dashboard">
        <div className="container py-4" style={{ maxWidth: "1500px" }}>
          <div className="row ">
            <div className="col-lg-7 mb-lg-0 mb-4">
              <div className="card z-index-2">
                <div className="card-body px-6 py-8 pt-4">
                  <h6 className="ms-2 mb-0 text-center h-white headtext mb-3">
            {
  localStorage.currentChain ==='SOL' ?
   'Phantom Wallet Balance'  
   : localStorage.currentChain === 'BSC' || localStorage.currentChain ==='ETH' ? 'Metamask Wallet Balance' : ''}
                  </h6>
 

 {
  localStorage.currentChain === 'BSC' && <Bscchain />  }

{ localStorage.currentChain === 'ETH' && <Ethchain/> }
{
  localStorage.currentChain ==='SOL' &&

                  <div className="row">
                   
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-4 p-2 pt-4' : "col-md-4 p-2 pt-4 reduce_opacity"}>
                      <div className="wbtc wbtc-w">
                        <div className="brificon">
                          <img src={SOL} width="40px" style={{borderRadius:"50%"}}/>
                        </div>
                        <div className="d-flex justify-content-center align-items-center pt-2">
                        <p>SOL</p>
                  
                        </div>
                        <h4 className="price" style={{ fontSize: "15px" }}>


                            {calculateDecimalFor8(convert(
                              phantomBalance.findIndex(data => data.token === "SOL") !== -1 ? phantomBalance.find(data => data.token === "SOL").balance : 0
                            ))}
                    
                        </h4>
                        <h4 className="price pt-2">
                          $
                          {layerPricing("SOL") ?
                            <>
                              {calculateDecimal(parseFloat(
                                (layerPricing("SOL"))
                              ).toFixed(2).toLocaleString("en-IN") * (phantomBalance.findIndex(data => data.token === "SOL") !== -1 ? phantomBalance.find(data => data.token === "SOL").balance : 0
                                ))}
                            </> : 0}
                        </h4>

                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-4 p-2 pt-4' : "col-md-4 p-2 pt-4 reduce_opacity"}>
                      <div className="wbtc wbtc-w">
                        <div className="brificon">
                          <img src={USDC} width="40px" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center pt-2">
                        <p>USDC</p>
                  
                        </div>
                        <h4 className="price" style={{ fontSize: "15px" }}>

                            {calculateDecimalFor8(convert(
                              phantomBalance.findIndex(data => data.token === "USDC") !== -1 ? phantomBalance.find(data => data.token === "USDC").balance : 0
                            ))}
                      
                        </h4>
                        <h4 className="price pt-2">
                          $
                          {layerPricing("USDC") ?
                            <>
                              {calculateDecimal(parseFloat(
                                (layerPricing("USDC"))
                              ).toFixed(2).toLocaleString("en-IN") * (
                                  phantomBalance.findIndex(data => data.token === "USDC") !== -1 ? phantomBalance.find(data => data.token === "USDC").balance : 0
                                ))}
                            </> : 0}
                            
                        </h4>

                      </div>
                    </div>
              
                  </div>

                              }


                </div>
              </div>
            </div>






            <div className="col-lg-5 mb-lg-0 mb-5 ">
              <div className="card z-index-2">
                <div className="card-body pt-3 pb-1 mobile-card" >
                  <div id={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? '' : "overlay"}></div>
                  <h6 className="ms-2 mb-0 text-center h-white headtext ">Deposit Into Dashboard Wallet </h6>


                  {
                    localStorage.currentChain ==='SOL' ?
                    

                  <div className="row justify-content-center ">
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-12  p-4 pt-1 mb-0' : "col-md-12  p-4 pt-3 mb-0 reduce_opacity"}>
                    
                        <form>
                          <div
                            className="wbtc gray row mt-2  pt-4 pb-4 mb-4"
                          // style={{ backgroundColor: "#3C4043" }}
                          >

                            <div className="col">
                              <label
                                for="exampleFormControlInput1"
                                className={
                                  "disableform"
                                }
                              >
                                Token
                              </label>
                              <select
                                className="form-control"
                                value={state.token}
                                id="exampleFormControlSelect1"
                                placeholder="Choose"
                                // disabled={disableForm === true ? true : false}
                                onChange={async (e) => {
                                  try {
                                    if (e.target.value == "Choose") {
                                      setState({ ...state, token: "" });
                                      return;
                                    }
                                    const index = initialData.findIndex(data => data.token === e.target.value)
                          
                                    setState({ ...state, token: e.target.value });
                                  
                                    if (e.target.value == "USDC") {
                                      connection
                                      .getParsedTokenAccountsByOwner(solana.publicKey, {mint: new PublicKey(initialData[index].address),})
                                      .then((res) => {
                                        if (res.value.length > 0) {
                                          setCurrentBalance(res.value[0].account.data.parsed.info.tokenAmount.uiAmount)
                                        }else{
                                          setCurrentBalance(0)
                                        }})
                                    }else if (e.target.value == "SOL") {
                                      connection.getBalance(solana.publicKey).then((res) => { 
                                        setCurrentBalance( res/ LAMPORTS_PER_SOL); 
                                     })
                                    }
                                    else {
                                   return;
                                    }
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }}
                              >
                                <option>Choose</option>
                                <option>SOL</option>
                                <option>USDC</option>
                              </select>
                            </div>
                            <div className="change-width"></div>
                            <div className="col">
                              <label
                                for="exampleFormControlInput2"
                                className={
                                  "disableform"
                                }
                              >
                                Available Balance
                              </label>
                              <input
                                type="number"
                                value={currentBalance}
                                disabled={true}
                                className="form-control"
                                id="amount"
                                placeholder="Balance"

                              />
                            </div>
                            <div className="w-100"></div>
                            <div className="col pt-1 pb-0">
                              <label
                                for="Name"
                                className="disableform"
                                
                              >
                                Total Amount
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                // disabled={disableForm === true ? true : false}
                                id="Name"
                                placeholder="0.12345"
                                onChange={(e) => {
                                  setState({ ...state, amount: e.target.value });
                                }}
                              />
                            </div>
                          </div>
                          <div className="justify-content-center text-center pt-1 pb-0">
                            <button
                              type="button"
                              className="btn btns mobile-style"
                              // disabled={disableForm === true ? true : false}
                              onClick={contractCall}
                            >
                              CONFIRM
                            </button>
                          </div>
                       
                        </form>
                     
                    </div>
                  </div>
:

<CardloadMetamsk />

                            }

                </div>

              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-lg-12 mb-lg-0 mb-4">
              <div className="card z-index-2">
                <div className="card-body p-6 new-card-style">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="ms-2 mb-0 h-white headtext mb-3">
                      Dashboard Balance
                    </h6>
                  </div>
                  <div className="row justify-content-left">
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={SOL} width="40px" style={{borderRadius:'50%'}}/>
                        </div>
                        <div className="d-flex justify-content-center align-items-center ">
                        <p>SOL</p>
               
                        </div>

                        <h4 className="price">
                          {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.sol / LAMPORTS_PER_SOL || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>


                        <h4
                          className="price"
                        
                        >
                          {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.sol
                                  ? (Number(balanceData?.sol / LAMPORTS_PER_SOL || 0))
                                  : 0) *
                                layerPricing("SOL")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={USDC} width="40px" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                        <p>USDC</p>
           
                        </div>
             
                        <h4
                          className="price"
                        >
                   {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.USDC / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}
                        </h4>
                        <h4
                          className="price"
                        
                        >
                          {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.USDC
                                  ? (Number(balanceData?.USDC / 10**18 || 0))
                                  : 0) *
                                layerPricing("USDC")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>







                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={USDT} width="40px" />
                        </div>
                        <p>
                          USDT{" "}
                        </p>
                        <h4 className="price">
                          {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.USDT / Math.pow(10,18)|| 0).toString())}

                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.USDT
                                  ? (Number(balanceData?.USDT / 10**18 || 0))
                                  : 0) *
                                layerPricing("USDT")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={BTC} width="40px" />
                        </div>
                        <p>
                          BTCB{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>


                        <h4 className="price">
                            {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.btcb / Math.pow(10,18) || 0).toString())}

                            </>
                            : 0}
                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.btcb
                                  ? (Number(balanceData?.btcb / 10**18 || 0))
                                  : 0) *
                                layerPricing("BTC")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={AUTO} width="40px" />
                        </div>
                        <p>
                          AUTO{" "}
                          {/* <i
                          className="fa fa-arrow-up icon1 icon-green"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.AUTO / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.AUTO
                                  ? (Number(balanceData?.AUTO / 10**18 || 0))
                                  : 0) *
                                layerPricing("AUTO")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={EPS} width="40px" />
                        </div>
                        <p>
                          EPS{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                                {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.EPS / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.EPS
                                  ? (Number(balanceData?.EPS / 10**18 || 0))
                                  : 0) *
                                layerPricing("EPS")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    {/* <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={MBOX} width="40px" />
                        </div>
                        <p>
                          MBOX{" "}
                         
                        </p>
                        <h4 className="price">
                          {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(web3.utils.fromWei(parseInt(balanceData?.MBOX || 0).toString(), 'ether'))}
                              
                            </>
                            : 0}
                        </h4>
                        <h4
                          className="price"
                          
                        >
                          {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimal(convert(
                                (balanceData?.MBOX
                                  ? (web3.utils.fromWei(parseInt(balanceData?.MBOX || 0).toString(), 'ether'))
                                  : 0) *
                                layerPricing("MBOX")
                              )).toString() + " USD" || "0"}</> : 0}
                        </h4>
                      </div>
                    </div> */}

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={XVS} width="40px" />
                        </div>
                        <p>
                          XVS{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.XVS / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.XVS
                                  ? (Number(balanceData?.XVS / 10**18 || 0))
                                  : 0) *
                                layerPricing("XVS")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={CAKE} width="40px" />
                        </div>
                        <p>
                          CAKE{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                                {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.Cake / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                            {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.Cake
                                  ? (Number(balanceData?.Cake / 10**18 || 0))
                                  : 0) *
                                layerPricing("CAKE")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={BUSD} width="40px" />
                        </div>
                        <p>
                          BUSD{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.busd / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.busd
                                  ? (Number(balanceData?.busd / 10**18 || 0))
                                  : 0) *
                                layerPricing("BUSD")
                              )).toString()  || "0"}
                            </>
                            : 0}

                        </h4>
                      </div>
                    </div>


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? copyAddressToClipboard : ""}
                      >
                        <div className="brificon">
                          <img src={ETH} width="40px" />
                        </div>
                        <p>
                          ETH{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.eth / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.eth
                                  ? (Number(balanceData?.eth / 10**18 || 0))
                                  : 0) *
                                layerPricing("ETH")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={"https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png"} width="40px" />
                        </div>
                        <p>
                          BNB{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.bnb / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.bnb
                                  ? (Number(balanceData?.bnb / 10**18 || 0))
                                  : 0) *
                                layerPricing("BNB")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={"https://s2.coinmarketcap.com/static/img/coins/64x64/1518.png"} width="40px" />
                        </div>
                        <p>
                          MKR{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.MKR / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.MKR
                                  ? (Number(balanceData?.MKR / 10**18 || 0))
                                  : 0) *
                                layerPricing("MKR")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={"https://s2.coinmarketcap.com/static/img/coins/64x64/6538.png"} width="40px" />
                        </div>
                        <p>
                          CRV{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.CRV / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.CRV
                                  ? (Number(balanceData?.CRV / 10**18 || 0))
                                  : 0) *
                                layerPricing("CRV")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={CVX} width="40px" />
                        </div>
                        <p>
                          CVX{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.CVX / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.CVX
                                  ? (Number(balanceData?.CVX / 10**18 || 0))
                                  : 0) *
                                layerPricing("CVX")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={LDO} width="40px" />
                        </div>
                        <p>
                          LDO{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.LDO / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.LDO
                                  ? (Number(balanceData?.LDO / 10**18 || 0))
                                  : 0) *
                                layerPricing("LDO")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={AAVE} width="40px" />
                        </div>
                        <p>
                          AAVE{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.AAVE / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.AAVE
                                  ? (Number(balanceData?.AAVE / 10**18 || 0))
                                  : 0) *
                                layerPricing("AAVE")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={UNI} width="40px" />
                        </div>
                        <p>
                          UNI{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                                {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.UNI / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.UNI
                                  ? (Number(balanceData?.UNI / 10**18 || 0))
                                  : 0) *
                                layerPricing("UNI")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={COMP} width="40px" />
                        </div>
                        <p>
                          COMP{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                                {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.COMP / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.COMP
                                  ? (Number(balanceData?.COMP / 10**18 || 0))
                                  : 0) *
                                layerPricing("COMP")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={BAL} width="40px" />
                        </div>
                        <p>
                          BAL{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.BAL / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.BAL
                                  ? (Number(balanceData?.BAL / 10**18 || 0))
                                  : 0) *
                                layerPricing("BAL")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={INST} width="40px" />
                        </div>
                        <p>
                          INST{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.INST / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                          {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.INST
                                  ? (Number(balanceData?.INST / 10**18 || 0))
                                  : 0) *
                                layerPricing("INST")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={SUSHI} width="40px" />
                        </div>
                        <p>
                          SUSHI{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.SUSHI / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.SUSHI
                                  ? (Number(balanceData?.SUSHI / 10**18 || 0))
                                  : 0) *
                                layerPricing("SUSHI")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={"https://s2.coinmarketcap.com/static/img/coins/64x64/5864.png"} width="40px" />
                        </div>
                        <p>
                          YFI{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                               {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.YFI / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.YFI
                                  ? (Number(balanceData?.YFI / 10**18 || 0))
                                  : 0) *
                                layerPricing("YFI")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={DAI} width="40px" />
                        </div>
                        <p>
                          DAI{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.DAI / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                             {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.DAI
                                  ? (Number(balanceData?.DAI / 10**18 || 0))
                                  : 0) *
                                layerPricing("DAI")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>



                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-2 p-2 pt-3' : "col-md-2 p-2 pt-3 reduce_opacity"}>
                      <div
                        className="wbtc wbtc-w cursor-pointer"

                      >
                        <div className="brificon">
                          <img src={BTC} width="40px" />
                        </div>
                        <p>
                          WBTC{" "}
                          {/* <i
                          className="fa fa-arrow-down icon1 icon-red"
                          aria-hidden="true"
                        ></i> */}
                        </p>
                        <h4 className="price">
                                {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {calculateDecimalFor8(Number(balanceData?.WBTC / Math.pow(10,18) || 0).toString())}
                        
                            </>
                            : 0}

                        </h4>
                        <h4
                          className="price"
                          
                        >
                              {(localStorage.getItem("phantomId") && localStorage.getItem("token")) ?
                            <>
                              {"$" + calculateDecimal(convert(
                                (balanceData?.WBTC
                                  ? (Number(balanceData?.WBTC / 10**18 || 0))
                                  : 0) *
                                layerPricing("WBTC")
                              )).toString()  || "0"}
                            </>
                            : 0}
                        </h4>
                      </div>
                    </div>












                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Confirm card load with selected crypto asset type and amount</Modal.Title>
          {/* <Button
            variant="danger"
            onClick={() => {
              setshowModal(false);
            }}
          >
            <i class="fas fa-times"></i>
          </Button> */}
        </Modal.Header>
        <Modal.Body>
          <div className="alert ">

            <span>Applicable card load fee applies.</span></div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setshowModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              confirmCardLoad();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
