import { useEffect, React, useState, useContext } from "react";
import "./Home.scss";
import { URL } from "../../Utils/url";
import BTC from "../../Sass/img/BTC.png";

import ABI from '../../abi.json';
import ABIEther from '../../abiether.json'
import getWeb3 from "../../Utils/getWeb3";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../../Utils/cookieHandling";
import { UserRoleContext } from "../../Utils/UserAuthorization";
import { ethers } from "ethers";
import { BigNumber as BN } from "bignumber.js";
import ABIEther2 from '../../abiether2.json'


var web3 = require('web3');
const CardloadMetamsk = () => {

 const depositAddress = '0x10c63ed81ef4187468544bb913af070cf4c5719a'
  const [currentBalance, setCurrentBalance] = useState("");
  const roleContext = useContext(UserRoleContext);
  const [partner, setPartner] = useState(null);
  const [wbtc, setWbtc] = useState([]);
  const [eth, setEth] = useState([]);
  const [busd, setBusd] = useState([]);
  const [bnb, setBnb] = useState(null);
  const [bal, setbalance] = useState(0);
  const [balanceData, newBalanceData] = useState(null);
  const [hideModal, sethideModal] = useState(false);
  const [priceUSDT, setUSDT] = useState(null);
  const [priceUSDC, setUSDC] = useState(null);
  const [priceBTC, setBTC] = useState(null);
  const [priceAUTO, setAUTO] = useState(null);
  const [priceEPS, setEPS] = useState(null);
  const [priceMBOX, setMBOX] = useState(null);
  const [priceXVS, setXVS] = useState(null);
  const [priceCAKE, setCAKE] = useState(null);
  const [priceBUSD, setBUSD] = useState(null);
  const [priceETH, setETH] = useState(null);
  const [priceMKR, setMKR] = useState(null);
  const [priceCRV, setCRV] = useState(null);
  const [priceCVX, setCVX] = useState(null);
  const [priceLDO, setLDO] = useState(null);
  const [priceAAVE, setAAVE] = useState(null);
  const [priceUNI, setUNI] = useState(null);
  const [priceCOMP, setCOMP] = useState(null);
  const [priceBAL, setBAL] = useState(null);
  const [priceINST, setINST] = useState(null);
  const [priceSUSHI, setSUSHI] = useState(null);
  const [priceYFI, setYFI] = useState(null);
  const [priceDAI, setDAI] = useState(null);
  const [settingsWBTC, setSettingsWBTC] = useState(null)
  const [settingsSOL, setSettingsSOL] = useState(null)
  const [settingsUSDT, setSettingsUSDT] = useState(null);
  const [settingsUSDC, setSettingsUSDC] = useState(null);
  const [settingsBTC, setSettingsBTC] = useState(null);
  const [settingsAUTO, setSettingsAUTO] = useState(null);
  const [settingsEPS, setSettingsEPS] = useState(null);
  const [settingsMBOX, setSettingsMBOX] = useState(null);
  const [settingsXVS, setSettingsXVS] = useState(null);
  const [settingsCAKE, setSettingsCAKE] = useState(null);
  const [settingsBUSD, setSettingsBUSD] = useState(null);
  const [settingsETH, setSettingsETH] = useState(null);
  const [settingsBNB, setSettingsBNB] = useState(null);
  const [settingsMKR,setSettingsMKR]=useState(null);
  const [settingsCRV,setSettingsCRV]=useState(null);
  const [settingsCVX,setSettingsCVX]=useState(null);
  const [settingsLDO,setSettingsLDO]=useState(null);
  const [settingsAAVE,setSettingsAAVE]=useState(null);
  const [settingsUNI,setSettingsUNI]=useState(null);
  const [settingsCOMP,setSettingsCOMP]=useState(null);
  const [settingsBAL,setSettingsBAL]=useState(null);
  const [settingsINST,setSettingsINST]=useState(null);
  const [settingsSUSHI,setSettingsSUSHI]=useState(null);
  const [settingsYFI,setSettingsYFI]=useState(null);
  const [settingsDAI,setSettingsDAI]=useState(null);
  const [cardLoadFee, setCardLoadFee] = useState(null);
  const [wallletBalance, setWalletBalance] = useState(null);
  const [amount, setAmount] = useState(null);
  const [disableForm, setDisableForm] = useState(true);
  const [settings, setSettings] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [settingsConstants, setSettingsConstants] = useState(null);
  const [tokenSettingsConstants, setTokenSettingsConstants] = useState(null);

  const [web3n, setWeb3] = useState('');



  const [contract, setContract] = useState('');
  const [tokenArray, setTokenArray] = useState([
    "USDT",
    "EPS",
    "BUSD",
    "USDC",
    "MBOX",
    "ETH",
    "BTCB",
    "XVS",
    "BNB",
    "AUTO",
    "CAKE"
  ]);

  const [metamaskBalance, setMetamaskBalance] = useState([]);
  const calculateMetamaskBalance = async () => {
    let tempArr = []
    tokenArray.map(async (a, b) => {
      const index = initialData.findIndex(data => data.token === a)
      let contractAddress = "";
      if (index != -1) {
        contractAddress = addressesArray[index].address
      }


      const web3 = await getWeb3();
      let instance;
      if (a.toUpperCase() == "ETH") {
        instance = new web3.eth.Contract(
          ABIEther,
          contractAddress
        );
      }
      else if (a.toUpperCase() == "BNB") {
        web3.eth.getBalance(getCookie("metamaskId")).then(balance => {
          tempArr.push({
            token: a,
            balance: balance / Math.pow(10, 18)
          })
          // setMetamaskBalance({ ...metamaskBalance, "BNB": web3.utils.fromWei(parseInt(balance || 0).toString(), 'ether') });
        });
      }
      else {
        instance = new web3.eth.Contract(
          ABI,
          contractAddress
        );
      }
      if (a.toUpperCase() != "BNB") {

        const balanceConst = await instance.methods.balanceOf(getCookie("metamaskId")).call()
        tempArr.push({
          token: a,
          balance: balanceConst / Math.pow(10, 18)
        })
        // setMetamaskBalance({ ...metamaskBalance, a: web3.utils.fromWei(parseInt(balanceConst || 0).toString(), 'ether')});
      }
    })


    setMetamaskBalance(tempArr)

    console.log(tempArr, "uhugubg");
  }
  // useEffect(() => {
  //   console.log(metamaskBalance,"auavdbjvb");
  //   localStorage.setItem("metamaskbalance",metamaskBalance)
  // },[metamaskBalance])
  console.log(metamaskBalance)
  const initialData = [
    {
      address: '0x55d398326f99059ff775485246999027b3197955',
      token: 'USDT'
    },
    {
      address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      token: 'USDC'
    },
    {
      address: '0x3203c9e46ca618c8c1ce5dc67e7e9d75f5da2377',
      token: 'MBOX'
    }, {
      address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      token: 'CAKE'
    },
    {
      address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      token: 'BUSD'
    },
    {
      address: '0xa184088a740c695e156f91f5cc086a06bb78b827',
      token: 'AUTO'
    },
    {
      address: '0xa7f552078dcc247c2684336020c03648500c6d9f',
      token: 'EPS'
    },
    {
      address: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
      token: 'XVS'
    },
    {
      address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      token: 'BTCB'
    },
    {
      address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      token: 'ETH'
    }, {
      address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
      token: 'BNB'
    },
  ]

  const addressesArrayData = [
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      token: 'USDT'
    },
    {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      token: 'USDC'
    },

    {
      address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
      token: 'BUSD'
    },
    {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      token: 'WBTC',
      image:BTC
    }, 

    {
      address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
      token: 'MKR'
    },
    {
      address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
      token: 'CRV'
    },
    {
      address: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
      token: 'CVX'
    },
    {
      address: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
      token: 'LDO'
    },
    {
      address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      token: 'AAVE'
    },

    {
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      token: 'UNI'
    },

    {
      address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
      token: 'COMP'
    },

    {
      address: '0x6f40d4A6237C257fff2dB00FA0510DeEECd303eb',
      token: 'INST'
    },

    {
      address: '0xba100000625a3754423978a60c9317c58a424e3D',
      token: 'BAL'
    },

    {
      address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
      token: 'SUSHI'
    },
    {
      address: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
      token: 'YFI'
    },
    {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      token: 'DAI'
    },


  ];
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




  const contractCall = async () => {
    let amountConst = state.amount

    const web3 = await getWeb3();
    let contractAddress
    let value
  
    const index =  (localStorage.getItem('currentChain').toLowerCase() == "eth" ?addressesArrayData: addressesArray).findIndex(data => data.token === state.token)
   
    if (index !== -1) {
      contractAddress = localStorage.getItem('currentChain').toLowerCase() == "eth" ?addressesArrayData[index].address: addressesArray[index].address
    }
      
    if((state.token === "USDT" || state.token === "USDC" ) && localStorage.getItem("currentChain").toLowerCase() === "eth"){
      value = amountConst*Math.pow(10,6)
      
    }
   else if(( state.token === "WBTC") && localStorage.getItem("currentChain").toLowerCase() === "eth"){
     
      value = amountConst/Math.pow(10,8) * Math.pow(10,16)
    }
   else{
    value = web3.utils.toWei(amountConst.toString(), 'ether')
   }
      
  
   
    let instance;
    if (state.token == "ETH") {
      console.log("contractAddress", contractAddress)
      instance = new web3.eth.Contract(
        ABIEther,
        contractAddress
      );
      console.log(instance)
    } else {
      instance = new web3.eth.Contract(
        ABI,
        contractAddress
      );
    }
    setWeb3(web3);
    if (state.token == "BNB") {

      value = web3.utils.toWei(amountConst.toString(), 'ether')
      axios.post(`${URL}/users/initiateCardPayment`, {
        amount: (value),
        userAddress: getCookie("phantomId"),
        secondAddress:getCookie("metamaskId"),
        chainId: localStorage.getItem("currentChain").toUpperCase(),
        assetType: state.token,
      }, {
        headers: {
          Authorization: getCookie("token"),
        },
      },).then(async (res) => {
        if (res.status === 200 || res.status === 201) {
          
          
          const txData = {
            from: getCookie("metamaskId"),
            to: depositAddress,
            value: web3.utils.toHex(value),
          }
          window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              txData,
            ],
          }).then((txHash) => {
           
           // updateUserBalanceHandler(state.token, amountConst)
            calculateMetamaskBalance()
            
          })
            .catch((error) => {
              toast.error(error?.message);
            });
        }
      }).catch((err) => {
        console.log(err)
      })
      
    }
    
    else if(state.token === "ETH" && localStorage.getItem("currentChain").toLowerCase() === "eth"){
      value = web3.utils.toWei(amountConst.toString(), 'ether')
      axios.post(`${URL}/users/initiateCardPayment`, {
        amount: value,
        userAddress: getCookie("phantomId"),
        secondAddress:getCookie("metamaskId"),
        chainId: localStorage.getItem("currentChain").toUpperCase(),
        assetType: state.token,
      }, {
        headers: {
          Authorization: getCookie("token"),
        },
      },).then(async (res) => {
        if (res.status == 200 || res.status == 201) {
         
        
          const txData = {
            from: getCookie("metamaskId"),
            to: depositAddress,
            value: web3.utils.toHex(value),
          }
          window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              txData,
            ],
          }).then((txHash) => {
           
           // updateUserBalanceHandler(state.token, amountConst)
            calculateMetamaskBalance()
            
          })
            .catch((error) => {
              toast.error(error?.message);
            });
        }
      }).catch((err) => {
        console.log(err)
      })
      return;
    }
    
    else {
      axios.post(`${URL}/users/initiateCardPayment`, {
        amount: value,
        userAddress: getCookie("phantomId"),
        secondAddress:getCookie("metamaskId"),
        chainId: localStorage.getItem("currentChain").toUpperCase(),
        assetType: state.token,
      }, {
        headers: {
          Authorization: getCookie("token"),
        },
      },).then(async (res) => {
        if (res.status == 200 || res.status == 201) {
          if(localStorage.getItem("currentChain").toLowerCase() == "eth"){
            instance = new web3.eth.Contract(
              ABIEther2,
              contractAddress
            );
          }
        
          await instance.methods.transfer(depositAddress, value).send({ from: getCookie("metamaskId") }).then(res => {
            //updateUserBalanceHandler(state.token, amountConst)
            calculateMetamaskBalance()
          }).catch(error => {
            toast.error(error.message);
          })
        }
      }).catch((err) => {
        console.log(err)
      })
      return;

    }


  }


  useEffect(() => {
    if (sessionStorage.getItem("balance")) {
      setbalance(sessionStorage.getItem("balance"));
    }
  }, [sessionStorage.getItem("balance")]);





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

  const handleMaxButtonClick = async() => {
    if(state.token == ""){
      toast.error("Please select token");
      return
    }
    let tokenValue = state.token
                                    const web3 = await getWeb3();
                                    var accs = await web3.eth.getAccounts();
                                    // alert(e.target.value)
                                    if (localStorage.getItem('currentChain')?.toLowerCase() == 'eth') {


                                      if(localStorage.getItem('currentChain')?.toLowerCase() === 'eth' && (tokenValue === "ETH")){
                                        web3.eth.getBalance(getCookie("metamaskId")).then(balance => {
                                          
                                          setCurrentBalance(balance/Math.pow(10, 18));
                                          setState({...state,amount:balance/Math.pow(10, 18)}) 
                                           
                                           });
                                        
                                        return;
                                      }

                                      

                                      const newAccounts = await Promise.all(accs.map(async (address) => {


                                     

                                        const tokenInst = new web3.eth.Contract(ABIEther2, addressesArrayData[addressesArrayData.findIndex(item => item.token === tokenValue)].address);

                                        const balance = await tokenInst.methods.balanceOf(address).call()
                                       // alert(balance)
                                        return {

                                          balance,

                                        }




                                      }))

                                      if(localStorage.getItem('currentChain')?.toLowerCase() === 'eth' && (tokenValue === "USDT" || tokenValue === "USDC")){
                                        setCurrentBalance(newAccounts[0].balance / Math.pow(10,6));
                                        setState({...state,amount:newAccounts[0].balance / Math.pow(10,6)}) 
                                        return;
                                      }
                                      if(localStorage.getItem('currentChain')?.toLowerCase() === 'eth' && tokenValue === "WBTC"){
                                        setCurrentBalance(newAccounts[0].balance / Math.pow(10,8));
                                        setState({...state,amount:newAccounts[0].balance / Math.pow(10,8)}) 
                                        return;
                                      }
                                      console.log(web3.utils.fromWei((parseInt((newAccounts[0].balance) || 0)).toString(), 'ether'))
                                      setCurrentBalance(  web3.utils.fromWei((parseInt((newAccounts[0].balance) || 0)).toString(), 'ether'));
                                      setState({...state,amount:web3.utils.fromWei((parseInt((newAccounts[0].balance) || 0)).toString(), 'ether')}) 

                                      return;
                                    }
                                    const index = initialData.findIndex(data => data.token === tokenValue)

                                    let contractAddress = "";
                                    if (index != -1) {
                                      contractAddress = addressesArray[index].address
                                    }

                                    setState({ ...state, token: tokenValue });
                                    
                                    let instance;
                                    if (tokenValue == "ETH") {
                                      instance = new web3.eth.Contract(
                                        ABIEther,
                                        contractAddress
                                      );

                                    }
                                    else if (tokenValue == "BNB") {
                                      web3.eth.getBalance(getCookie("metamaskId")).then(balance => {
                                         setCurrentBalance(web3.utils.fromWei(parseInt(balance || 0).toString(), 'ether'));
                                         setState({...state,amount:web3.utils.fromWei(parseInt(balance || 0).toString(), 'ether')}) 
                                         return 
                                        })
                                      return
                                    }
                                  
                                    else {

                                      instance = new web3.eth.Contract(
                                        ABIEther,
                                        contractAddress
                                      );

                                    }
                                    const balanceConst = await instance.methods.balanceOf(getCookie("metamaskId")).call()
                                   
                                    setCurrentBalance(web3.utils.fromWei(convert(parseInt((balanceConst) || 0)).toString(), 'ether'));
                                    setState({...state,amount: web3.utils.fromWei(convert(parseInt((balanceConst) || 0)).toString(), 'ether')})
  }



  return (
    <div className="row justify-content-center ">
                    <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-12  p-4 pt-3 mb-0' : "col-md-12  p-4 pt-3 mb-0 reduce_opacity"}>
                      <div className="  " style={{ marginTop: "60px" }}>
                        <form>
                          <div
                            className="wbtc gray row pb-3 mb-4"
                      
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
                                      setState({ ...state, token: "" ,amount:''});
                                      return;
                                    }
                                    setState({ ...state, token: e.target.value,amount:'' });
                                    let tokenValue = e.target.value
                                    const web3 = await getWeb3();
                                    var accs = await web3.eth.getAccounts();
                                    // alert(e.target.value)
                                    if (localStorage.getItem('currentChain')?.toLowerCase() === 'eth') {
                                      
                              

                                      if(localStorage.getItem('currentChain')?.toLowerCase() === 'eth' && (tokenValue === "ETH")){
                                        web3.eth.getBalance(getCookie("metamaskId")).then(balance => {
                                          
                                          setCurrentBalance(balance/Math.pow(10, 18));
                                          
                                           
                                           });
                                        
                                        return;
                                      }

                                      

                                      const newAccounts = await Promise.all(accs.map(async (address) => {


                                     

                                        const tokenInst = new web3.eth.Contract(ABIEther2, addressesArrayData[addressesArrayData.findIndex(item => item.token === tokenValue)].address);

                                        const balance = await tokenInst.methods.balanceOf(address).call()
                                       // alert(balance)
                                        return {

                                          balance,

                                        }




                                      }))

                                      if(localStorage.getItem('currentChain')?.toLowerCase() === 'eth' && (tokenValue === "USDT" || tokenValue === "USDC")){
                                        setCurrentBalance(newAccounts[0].balance / Math.pow(10,6));
                                        return;
                                      }
                                      if(localStorage.getItem('currentChain')?.toLowerCase() === 'eth' && tokenValue === "WBTC"){
                                        setCurrentBalance(newAccounts[0].balance / Math.pow(10,8));
                                        return;
                                      }
                                      console.log(web3.utils.fromWei((parseInt((newAccounts[0].balance) || 0)).toString(), 'ether'))
                                      setCurrentBalance(  web3.utils.fromWei((parseInt((newAccounts[0].balance) || 0)).toString(), 'ether'));

                                      return;
                                    }
                                    const index = initialData.findIndex(data => data.token === tokenValue)

                                    let contractAddress = "";
                                    if (index != -1) {
                                      contractAddress = addressesArray[index].address
                                    }

                                    setState({ ...state, token: tokenValue });
                                    
                                    let instance;
                                    if (tokenValue == "ETH") {
                                      instance = new web3.eth.Contract(
                                        ABIEther,
                                        contractAddress
                                      );

                                    }
                                    else if (tokenValue == "BNB") {
                                      web3.eth.getBalance(getCookie("metamaskId")).then(balance => { setCurrentBalance(web3.utils.fromWei(parseInt(balance || 0).toString(), 'ether')); return })
                                      return
                                    }
                                 
                                    else {

                                      instance = new web3.eth.Contract(
                                        ABIEther,
                                        contractAddress
                                      );

                                    }
                                    const balanceConst = await instance.methods.balanceOf(getCookie("metamaskId")).call()
                                    console.log("balance from metamask", balanceConst)
                                    console.log(web3.utils.fromWei(convert(parseInt(("1007330900261871853294") || 0)).toString(), 'ether'));
                                    setCurrentBalance(web3.utils.fromWei(convert(parseInt((balanceConst) || 0)).toString(), 'ether'));
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }}
                              >
                                {
                                  localStorage.getItem("currentChain")?.toLowerCase() == "eth" ? <>

                                    <option>Choose</option>
                                    <option>USDT</option>
                                    <option>USDC</option>
                                    <option>BUSD</option>
                                    <option>MKR</option>
                                    <option>CVX</option>
                                    <option>CRV</option>
                                    <option>LDO</option>
                                    <option>AAVE</option>
                                    <option>UNI</option>
                                    <option>COMP</option>
                                    <option>INST</option>
                                    <option>BAL</option>
                                    <option>SUSHI</option>
                                    <option>WBTC</option>
                                    <option>YFI</option>
                                    <option>DAI</option>
                                    <option>ETH</option>




                                  </> :
                                    <>
                                      <option>Choose</option>
                                      <option>USDT</option>
                                      <option>USDC</option>
                                      <option>BTCB</option>
                                      <option>AUTO</option>
                                      <option>EPS</option>
                                      {/* <option>MBOX</option> */}
                                      <option>XVS</option>
                                      <option>CAKE</option>
                                      <option>BUSD</option>
                                      <option>ETH</option>
                                      <option>BNB</option>
                                    </>}

                                {/* <option>MKR</option>
                                <option>CRV</option>
                                <option>CVX</option>
                                <option>LDO</option>
                                <option>AAVE</option>
                                <option>UNI</option>
                                <option>COMP</option>
                                <option>INST</option>
                                <option>BAL</option>
                                <option>SUSHI</option>
                                <option>YFI</option>
                                <option>DAI</option>
                                <option>AVAX</option>
                                <option>WBTC</option>
                                <option>WETH</option>
                                <option>GBEX</option> */}

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
                                className={
                                  disableForm === true ? "" : "disableform"
                                }
                              >
                                Amount to Deposit
                              </label>
                              <div className="d-flex">
                              <input
                                type="number"
                                className="form-control"
                                // disabled={disableForm === true ? true : false}
                                id="Name"
                                placeholder="0.12345"
                                value={state.amount}
                                onChange={(e) => {
                                  setState({ ...state, amount: e.target.value });
                                }}
                              />
                              <button type="button" onClick={handleMaxButtonClick} style={{borderRadius: '9px',
    background: '#f3ba2f',
    border:'none',
    marginLeft: '10px'}} >Max</button>
                              </div>
                              
                            </div>
                          </div>
                          <div className=" justify-content-center text-center pt-2 pb-0">
                            <button
                              type="button"
                              className="btn btns mobile-style"
                              // disabled={disableForm === true ? true : false}
                              onClick={contractCall}
                            >
                              CONFIRM
                            </button>
                          </div>
                          <div style={{ marginTop: "70px" }}></div>
                        </form>
                      </div>
                    </div>
                  </div>
  )
}

export default CardloadMetamsk