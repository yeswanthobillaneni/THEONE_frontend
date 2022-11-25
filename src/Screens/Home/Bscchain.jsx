import { useEffect, React, useState, useContext } from "react";
import "./Home.scss";
import RData from "../../Sass/img/R.png";
import { URL } from "../../Utils/url";
import LogoIcon from "../../Sass/img/Logoicon.svg";
import USDT from "../../Sass/img/USDT.png";
import USDC from "../../Sass/img/USDC.png";
import BTC from "../../Sass/img/BTC.png";
import AUTO from "../../Sass/img/AUTO.png";
import ABI from '../../abi.json';
import ABIEther from '../../abiether.json'
import ABIEther2 from '../../abiether2.json'

import getWeb3 from "../../Utils/getWeb3";
import EPS from "../../Sass/img/EPS.png";
import MBOX from "../../Sass/img/MBOX.png";
import XVS from "../../Sass/img/XVS.png";
import CAKE from "../../Sass/img/CAKE.png";
import BUSD from "../../Sass/img/BUSD.png";
import ETH from "../../Sass/img/ETH.png";
import CRV from '../../Sass/img/Curve.png'
import MKR from '../../Sass/img/MKR.png';
import CVX from '../../Sass/img/convex.png';
import LDO from '../../Sass/img/lido.png';
import AAVE from '../../Sass/img/aave.png';
import UNI from '../../Sass/img/uniswap.png'
import COMP from '../../Sass/img/compound.png'
import INST from '../../Sass/img/instadapp.png'
import BAL from '../../Sass/img/balancer.png'
import SUSHI from '../../Sass/img/sushiswap.png'
import YEARN from '../../Sass/img/yearn.png'
import DAI from '../../Sass/img/dai.png'
import AVAX from '../../Sass/img/avalanche.png'
import WBTC from '../../Sass/img/wrapedbtc.png'
import WETH from '../../Sass/img/wrappedeth.png'
import GBEX from '../../Sass/img/globiance.png'
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../../Utils/cookieHandling";
import HeaderNavigator from "../../Components/Header/HeaderNavigator";
import { UserRoleContext } from "../../Utils/UserAuthorization";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ethers } from "ethers";
import { BigNumber as BN } from "bignumber.js";

const Bscchain = () => {


    const depositAddress = '0x10c63ed81ef4187468544bb913af070cf4c5719a'
    const [currentBalance, setCurrentBalance] = useState("");
    const navigate = useNavigate();
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
    const [settingsUSDT, setSettingsUSDT] = useState(null);
    const [settingsUSDC, setSettingsUSDC] = useState(null);
    const [settingsBTC, setSettingsBTC] = useState(null);
    const [settingsAUTO, setSettingsAUTO] = useState(null);
    const [settingsEPS, setSettingsEPS] = useState(null);
    const [settingsBNB, setSettingsBNB] = useState(null);
    const [settingsMBOX, setSettingsMBOX] = useState(null);
    const [settingsXVS, setSettingsXVS] = useState(null);
    const [settingsCAKE, setSettingsCAKE] = useState(null);
    const [settingsBUSD, setSettingsBUSD] = useState(null);
    const [settingsETH, setSettingsETH] = useState(null);
    const [cardLoadFee, setCardLoadFee] = useState(null);
    const [wallletBalance, setWalletBalance] = useState(null);
    const [amount, setAmount] = useState(null);
    const [disableForm, setDisableForm] = useState(true);
    const [settings, setSettings] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [settingsConstants, setSettingsConstants] = useState(null);
    const [tokenSettingsConstants, setTokenSettingsConstants] = useState(null);
  
    const [web3n, setWeb3] = useState('');


        useEffect(async() => {
      const web3 = await getWeb3();
      // let instance;
     
      //   instance = new web3.eth.Contract(
      //     ABIEther2,
      //     "0xdAC17F958D2ee523a2206206994597C13D831ec7"
      //   );
        
      //   const balanceConst = await instance.methods.balanceOf(getCookie("metamaskId")).call()
      //   console.log(balanceConst,"balance Data")
  
  
      var accs = await web3.eth.getAccounts();
  
  
      const newAccounts = await Promise.all(accs.map(async (address) => {
        const balance = await web3.eth.getBalance(address)
  
        const tokenBalances = await Promise.all([{
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          token: 'USDT'
        },{
          address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          token: 'USDC'
        }].map(async (token) => {
  
          const tokenInst = new web3.eth.Contract(ABIEther2, token.address);
  
          const balance = await tokenInst.methods.balanceOf(address).call()
  
          return {
            token: token.token,
            balance
          }
        }))
  
        return {
          address,
          balance: balance,
          tokens: tokenBalances
        }
      }))
      console.log(newAccounts, "newAccounts");
    },[])

 const [contract, setContract] = useState('');
    const [tokenArray, setTokenArray] = useState([
      "USDT",
      "EPS",
      "BUSD",
      "USDC",
      "ETH",
      "BTCB",
      "XVS",
      "BNB",
      "AUTO",
      "CAKE",
      "MKR",
      "CRV",
      "CVX",
      "LDO",
      "AAVE",
      "UNI",
      "COMP",
      "INST",
      "BAL",
      "SUSHI",
      "YFI",
      "DAI",
      // "AVAX",
      "WBTC",
      "WETH",
      // "GBEX"
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
              balance: balance/Math.pow(10, 18)
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
            balance: balanceConst/Math.pow(10, 18)
          })
          // setMetamaskBalance({ ...metamaskBalance, a: web3.utils.fromWei(parseInt(balanceConst || 0).toString(), 'ether')});
        }
      })
      
      
      setMetamaskBalance(tempArr)
     
      console.log(tempArr,"uhugubg");
    }
  
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
      }, 
      {
        address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
        token: 'BNB'
      },
      {
        address:'0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        token:'MKR'
      },
      {
        address:'0xD533a949740bb3306d119CC777fa900bA034cd52',
        token:'CRV'
      },
      {
        address:'0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
        token:'CVX'
      },
      {
        address:'0x5a98fcbea516cf06857215779fd812ca3bef1b32',
        token:'LDO'
      },
      {
        address:'0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        token:'AAVE'
      },
      {
        address:'0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        token:'SUSHI'
      },
      {
        address:'0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        token:'UNI'
      },
      {
        address:'0xc00e94cb662c3520282e6f5717214004a7f26888',
        token:'COMP'
      },
      {
        address:'0x6f40d4A6237C257fff2dB00FA0510DeEECd303eb',
        token:'INST'
      },
      {
        address:'0xba100000625a3754423978a60c9317c58a424e3D',
        token:'BAL'
      },
      {
        address:'0x6b175474e89094c44da98b954eedeac495271d0f',
        token:'DAI'
      },
      // {
      //   address:'FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z',
      //   token:'AVAX'
      // },
      {
        address:'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        token:'WETH'
      },
      {
        address:'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        token:'WBTC'
      },
  
      {
        address:'0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
        token:'YFI'
      },
      // {
      //   address:'xdc34514748f86a8da01ef082306b6d6e738f777f5a',
      //   token:'GBEX'
      // }
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
    // API for coingeeko
    useEffect(() => {
  
      if (localStorage.getItem("metamaskId") && localStorage.getItem("token") && localStorage.getItem("currentChain") === 'BSC') {
        calculateMetamaskBalance();
        calculateDecimal(20);
        setInterval(function () {
          calculateMetamaskBalance();
          priceHandler();
          getBalanceHandler();
          getSettings();
          partnerCheck();
        }, 5000);
        getSettings();
        getBalanceHandler();
        priceHandler();
     
      }
    }, []);
  
    const loadCardSubmit = async () => {
      setshowModal(true)
    };
    const updateUserBalanceHandler = (token, amount) => {
      axios
        .post(`${URL}/users/updateUserBalance?userAddress=${getCookie("metamaskId")}&symbol=${token.toLowerCase() == "cake" ? "Cake" : token.toLowerCase() == "bnb" ? "bnb" : token.toLowerCase() == "btcb" ? "btcb" : token.toLowerCase() == "busd" ? "busd" : token.toLowerCase() == "eth" ? "eth" : token}&amount=${amount * Math.pow(10, 18)}`, {
          headers: {
            Authorization: getCookie("token"),
          },
        })
        .then(function (response) {
          console.log(response,'update');
  
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const contractCall = async () => {
      let amountConst = state.amount
  
      const web3 = await getWeb3();
      let contractAddress
      let value
      const index = addressesArray.findIndex(data => data.token === state.token)
      if (index !== -1) {
        contractAddress = addressesArray[index].address
      }
  
      if (state.token === 'BUSD' || state.token === 'AUTO' || state.token === 'MBOX' || state.token === 'CAKE' || state.token === 'EPS' || state.token === 'XVS' || state.token == "BTCB") {
        value = web3.utils.toWei(amountConst.toString(), 'ether')
  
      } else if (state.token === 'USDT' || state.token === 'USDC' || state.token == "ETH") {
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
          console.log(txHash)
          updateUserBalanceHandler(state.token, amountConst)
          calculateMetamaskBalance()
          // const runInterval = setInterval(async () => {
          //   web3n.eth
          //     .getTransactionReceipt(txHash && txHash)
          //     .then((txReceipt) => {
          //       console.log(txReceipt);
          //     });
          // }, 5000);
        })
          .catch((error) => {
            toast.error(error?.message);
          });
      } else {
        await instance.methods.transfer(depositAddress, value).send({ from: getCookie("metamaskId") }).then(res => {
          updateUserBalanceHandler(state.token, amountConst)
          calculateMetamaskBalance()
        }).catch(error => {
          toast.error(error.message);
        })
      }
  
  
    }
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
  

    // 
    useEffect(() => {
      if (sessionStorage.getItem("balance")) {
        setbalance(sessionStorage.getItem("balance"));
      }
    }, [sessionStorage.getItem("balance")]);
    const getBalanceHandler = async () => {
      axios
        .get(`${URL}/users/walletBalance/${getCookie("metamaskId")}`, {
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
          "otcAmount": state.token == "USDT" || state.token == "USDC" || state.token == 'BUSD' ? totalAmount * (settingsConstants / 100) : totalAmount * (tokenSettingsConstants / 100),
          "partnerFee": partner ? (totalAmount * (partner.partner_otc / 100)) : 0,
          "assetType": state.token.toLowerCase() == "cake" ? "Cake" : state.token.toLowerCase() == "btc" ? "btcb" : state.token.toLowerCase() == "busd" ? "busd" : state.token.toLowerCase() == "eth" ? "eth" : state.token,
          "prvFee": partner ? (totalAmount * (partner.prv_otc / 100)) : 0,
          "userAddress": getCookie("metamaskId"),
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
            if (a.symbol === "BUSDUSDT") {
              setUSDT(a);
            }
            if (a.symbol === "USDCUSDT") {
              setUSDC(a);
            }
            if (a.symbol === "BTCUSDT") {
              setBTC(a);
            }
            if (a.symbol === "AUTOUSDT") {
              setAUTO(a);
            }
            if (a.symbol === "EPSUSDT") {
              setEPS(a);
            }
            if (a.symbol === "MBOXUSDT") {
              setMBOX(a);
            }
            if (a.symbol === "XVSUSDT") {
              setXVS(a);
            }
            if (a.symbol === "CAKEUSDT") {
              setCAKE(a);
            }
            if (a.symbol === "BUSDUSDT") {
              setBUSD(a);
            }
            if (a.symbol === "ETHUSDT") {
              setETH(a);
            }
            if (a.symbol == "BNBUSDT") {
              console.log("dhjhbvjb", a)
              setBnb(a)
            }
          });
        }
      } catch (err) {
  
      } finally {
      }
    };
    const getSettings = async () => {
      axios
        .get(`${URL}/users/getBSCOne`, {
          headers: {
            Authorization: getCookie("token"),
          },
        })
        .then(function (response) {
          setCardLoadFee(response.data.card_load_fee);
          setTokenSettingsConstants(response.data.bsc_token_otc_percentage);
          setSettingsConstants(response.data.bsc_stables_otc_per);
          response.data.bsc_token_otc_options.map((a, b) => {
            if (a.label === "USDT") {
              setSettingsUSDT(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "USDC") {
              setSettingsUSDC(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "BTC") {
              setSettingsBTC(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "AUTO") {
              setSettingsAUTO(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "EPS") {
              setSettingsEPS(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "MBOX") {
              setSettingsMBOX(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "XVS") {
              setSettingsXVS(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "CAKE") {
              setSettingsCAKE(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "BUSD") {
              setSettingsBUSD(response.data.bsc_token_otc_percentage);
            }
            if (a.label === "ETH") {
              setSettingsETH(response.data.bsc_token_otc_percentage);
            }
            if (a.label == "BNB") {
              setSettingsBNB(response.data.bsc_token_otc_percentage)
            }
          })
          response.data.bsc_stables_otc_options.map((a, b) => {
  
            if (a.label === "USDT") {
              setSettingsUSDT(response.data.bsc_stables_otc_per);
            }
            if (a.label === "USDC") {
              setSettingsUSDC(response.data.bsc_stables_otc_per);
            }
            if (a.label === "BTC") {
              setSettingsBTC(response.data.bsc_stables_otc_per);
            }
            if (a.label === "AUTO") {
              setSettingsAUTO(response.data.bsc_stables_otc_per);
            }
            if (a.label === "EPS") {
              setSettingsEPS(response.data.bsc_stables_otc_per);
            }
            if (a.label === "MBOX") {
              setSettingsMBOX(response.data.bsc_stables_otc_per);
            }
            if (a.label === "XVS") {
              setSettingsXVS(response.data.bsc_stables_otc_per);
            }
            if (a.label === "CAKE") {
              setSettingsCAKE(response.data.bsc_stables_otc_per);
            }
            if (a.label === "BUSD") {
              setSettingsBUSD(response.data.bsc_stables_otc_per);
            }
            if (a.label === "ETH") {
              setSettingsETH(response.data.bsc_stables_otc_per);
            }
          })
        })
        .catch(function (error) {
  
        });
    }
  
    //partner check
    const partnerCheck = async () => {
      var config = {
        method: 'get',
        url: 'https://backend.privacyswap.finance/users/partner/' + getCookie("partnerName"),
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
  
      if (value1 === "USDT") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsUSDT != null) {
          return calculateDecimal(valueCalculator(priceUSDT?.price, partner?.partner_otc, partner?.prv_otc, settingsUSDT));
        }
        else if (settingsUSDC && settingsUSDT !== 0) {
          return calculateDecimal((priceUSDT?.price) - (priceUSDT?.price * (settingsUSDT / 100)))
        } else {
          return priceUSDT?.price;
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
      } else if (value1 === "BTC") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsBTC != null) {
          console.log(priceBTC?.price, partner?.partner_otc, partner?.prv_otc, settingsBTC);
          return calculateDecimal(valueCalculator(priceBTC?.price, partner?.partner_otc, partner?.prv_otc, settingsBTC));
        }
        else if (settingsBTC !== 0) {
          return calculateDecimal((priceBTC?.price) - (priceBTC?.price * (settingsBTC / 100)))
        } else {
  
          return priceBTC?.price;
        }
      } else if (value1 === "AUTO") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsAUTO != null) {
          return calculateDecimal(valueCalculator(priceAUTO?.price, partner?.partner_otc, partner?.prv_otc, settingsAUTO));
        }
        else if (settingsAUTO !== 0) {
          return calculateDecimal((priceAUTO?.price) - (priceAUTO?.price * (settingsAUTO / 100)))
        } else {
          return priceAUTO?.price;
        }
      } else if (value1 === "MBOX") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsMBOX != null) {
          return calculateDecimal(valueCalculator(priceMBOX?.price, partner?.partner_otc, partner?.prv_otc, settingsMBOX));
        }
  
        else if (settingsMBOX !== 0) {
          return calculateDecimal((priceMBOX?.price) - (priceMBOX?.price * (settingsMBOX / 100)))
        } else {
          return priceMBOX?.price;
        }
      } else if (value1 === "CAKE") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsCAKE != null) {
          return calculateDecimal(valueCalculator(priceCAKE?.price, partner?.partner_otc, partner?.prv_otc, settingsCAKE));
        }
  
        else if (settingsCAKE !== 0) {
          return calculateDecimal((priceCAKE?.price) - (priceCAKE?.price * (settingsCAKE / 100)))
        } else {
          return priceCAKE?.price;
        }
      } else if (value1 === "XVS") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsXVS != null) {
          return calculateDecimal(valueCalculator(priceXVS?.price, partner?.partner_otc, partner?.prv_otc, settingsXVS));
        }
  
        else if (settingsXVS !== 0) {
          return calculateDecimal((priceXVS?.price) - (priceXVS?.price * (settingsXVS / 100)))
        } else {
          return priceXVS?.price;
        }
      } else if (value1 === "BUSD") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsBUSD != null) {
          return calculateDecimal(valueCalculator(priceBUSD?.price, partner?.partner_otc, partner?.prv_otc, settingsBUSD));
        }
  
        else if (settingsBUSD !== 0) {
          return calculateDecimal((priceBUSD?.price) - (priceBUSD?.price * (settingsBUSD / 100)))
        } else {
          return priceBUSD?.price;
        }
      } else if (value1 === "ETH") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsETH != null) {
          return calculateDecimal(valueCalculator(priceETH?.price, partner?.partner_otc, partner?.prv_otc, settingsETH));
        }
  
        else if (settingsETH !== 0) {
          return calculateDecimal((priceETH?.price) - (priceETH?.price * (settingsETH / 100)))
        } else {
          return priceETH?.price;
        }
      } else if (value1 === "EPS") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsEPS != null) {
          return calculateDecimal(valueCalculator(priceEPS?.price, partner?.partner_otc, partner?.prv_otc, settingsEPS));
        }
  
        else if (settingsEPS !== 0) {
          return calculateDecimal((priceEPS?.price) - (priceEPS?.price * (settingsEPS / 100)))
        } else {
          return priceEPS?.price;
        }
      } else if (value1 === "BNB") {
        if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsBNB != null) {
          return calculateDecimal(valueCalculator(bnb?.price, partner?.partner_otc, partner?.prv_otc, settingsBNB));
        }
  
        else if (settingsEPS !== 0) {
          return calculateDecimal((bnb?.price) - (bnb?.price * (settingsBNB / 100)))
        } else {
          return bnb?.price;
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
   <div className="row">
        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={USDT} width="40px" />
            </div>
            <p>USDT </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
             
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance?.findIndex(data => data.token === "USDT") !== -1 ? metamaskBalance.find(data => data.token === "USDT").balance : 0
                  ))}
                </> 
            </h4>
            <h4 className="price">
              $
              {layerPricing("USDT") ?
                <>
                  {calculateDecimal((
                    (layerPricing("USDT") ? layerPricing("USDT") : 0)
                  ) * (
                    metamaskBalance.findIndex(data => data.token === "USDT") !== -1 ? metamaskBalance.find(data => data.token === "USDT").balance : 0
                  ))}
                </> : 0}
            </h4>

           
          </div>
        </div>
        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={USDC} width="40px" />
            </div>
            <p>USDC </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
             
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "USDC") !== -1 ? metamaskBalance.find(data => data.token === "USDC").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price">
              $
              {layerPricing("USDC") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("USDC"))
                  ).toFixed(2).toLocaleString("en-IN") * (
                    metamaskBalance.findIndex(data => data.token === "USDC") !== -1 ? metamaskBalance.find(data => data.token === "USDC").balance : 0
                  ))}
                </> : 0}
            </h4>
           
          </div>
        </div>
        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={BTC} width="40px" />
            </div>
            <p>BTCB </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
          
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "BTCB") !== -1 ? metamaskBalance.find(data => data.token === "BTCB").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price">
              $
              {layerPricing("BTC") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("BTC"))
                  ).toFixed(2).toLocaleString("en-IN") * (
                    metamaskBalance.findIndex(data => data.token === "BTCB") !== -1 ? metamaskBalance.find(data => data.token === "BTCB").balance : 0
                  ))}
                </> : 0}
            </h4>
            
          </div>
        </div>

        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={AUTO} width="40px" />
            </div>
            <p>AUTO </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
          
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "AUTO") !== -1 ? metamaskBalance.find(data => data.token === "AUTO").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price">
              $
              {layerPricing("AUTO") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("AUTO"))
                  ).toFixed(2).toLocaleString("en-IN") * (
                    metamaskBalance.findIndex(data => data.token === "AUTO") !== -1 ? metamaskBalance.find(data => data.token === "AUTO").balance : 0
                  ))}
                </> : 0}
            </h4>
            
          </div>
        </div>

        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={EPS} width="40px" />
            </div>
            <p>EPS </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
          
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "EPS") !== -1 ? metamaskBalance.find(data => data.token === "EPS").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price">
              $
              {layerPricing("EPS") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("EPS"))
                  ).toFixed(2).toLocaleString("en-IN") * (
                    metamaskBalance.findIndex(data => data.token === "EPS") !== -1 ? metamaskBalance.find(data => data.token === "EPS").balance : 0
                  ))}
                </> : 0}
            </h4>
            
          </div>
        </div>

       

        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={XVS} width="40px" />
            </div>
            <p>XVS </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
          
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "XVS") !== -1 ? metamaskBalance.find(data => data.token === "XVS").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price">
              $
              {layerPricing("XVS") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("XVS"))
                  ).toFixed(2).toLocaleString("en-IN") * (
                    metamaskBalance.findIndex(data => data.token === "XVS") !== -1 ? metamaskBalance.find(data => data.token === "XVS").balance : 0
                  ))}
                </> : 0}
            </h4>
            
          </div>
        </div>
        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={CAKE} width="40px" />
            </div>
            <p>CAKE </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
          
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "CAKE") !== -1 ? metamaskBalance.find(data => data.token === "CAKE").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price" >
              $
              {layerPricing("CAKE") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("CAKE"))
                  ).toFixed(2).toLocaleString("en-IN") * (
                    metamaskBalance.findIndex(data => data.token === "CAKE") !== -1 ? metamaskBalance.find(data => data.token === "CAKE").balance : 0
                  ))}
                </> : 0}
            </h4>
           
          </div>
        </div>

        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={BUSD} width="40px" />
            </div>
            <p>BUSD </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
          
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "BUSD") !== -1 ? metamaskBalance.find(data => data.token === "BUSD").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price">
              $
              {layerPricing("BUSD") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("BUSD"))
                  ).toFixed(2).toLocaleString("en-IN") * (
                    metamaskBalance.findIndex(data => data.token === "BUSD") !== -1 ? metamaskBalance.find(data => data.token === "BUSD").balance : 0
                  ))}
                </> : 0}
            </h4>
            
          </div>
        </div>

        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={ETH} width="40px" />
            </div>
            <p>ETH </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
          
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "ETH") !== -1 ? metamaskBalance.find(data => data.token === "ETH").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price">
              $
              {layerPricing("ETH") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("ETH"))
                  ).toFixed(2).toLocaleString("en-IN") * ( metamaskBalance.findIndex(data => data.token === "ETH") !== -1 ? metamaskBalance.find(data => data.token === "ETH").balance : 0)                            
                )}</> : 0}
            </h4>
            
          </div>
        </div>
        <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
          <div className="wbtc wbtc-w">
            <div className="brificon">
              <img src={"https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png"} width="40px" />
            </div>
            <p>BNB </p>
            <h4 className="price" style={{fontSize:"15px"}}>
              
          
                <>
                  {calculateDecimalFor8(convert(
                    metamaskBalance.findIndex(data => data.token === "BNB") !== -1 ? metamaskBalance.find(data => data.token === "BNB").balance : 0
                  ))}
                </>
            </h4>
            <h4 className="price">
              $
              {layerPricing("BNB") ?
                <>
                  {calculateDecimal(parseFloat(
                    (layerPricing("BNB"))
                  ).toFixed(2).toLocaleString("en-IN") * ( metamaskBalance.findIndex(data => data.token === "BNB") !== -1 ? metamaskBalance.find(data => data.token === "BNB").balance : 0)
                )}</> : 0}
            </h4>
            
          </div>
        </div>

      </div>
  )
}

export default Bscchain