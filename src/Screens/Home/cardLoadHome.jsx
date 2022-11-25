import { useEffect, React, useState, useContext } from 'react'
import './Home.scss'
import RData from '../../Sass/img/R.png'
import { URL } from '../../Utils/url'
import LogoIcon from '../../Sass/img/Logoicon.svg'
import USDC from '../../Sass/img/USDC.png'
import SOL from '../../Sass/img/Sol.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getCookie } from '../../Utils/cookieHandling'
import HeaderNavigator from '../../Components/Header/HeaderNavigator'
import { UserRoleContext } from '../../Utils/UserAuthorization'
import { Modal, Button } from 'react-bootstrap'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

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



var web3 = require('web3');
export default function CardLoadHome() {
  const roleContext = useContext(UserRoleContext)
  const [partner, setPartner] = useState(null)
  const [bal, setbalance] = useState(0)
  const [balanceData, newBalanceData] = useState(null)
  const [hideModal, sethideModal] = useState(false)
  const [wbtc, setWbtc] = useState([]);
  const [eth, setEth] = useState([]);
  const [busd, setBusd] = useState([]);
  const [bnb, setBnb] = useState([]);
  const [priceSol, setSol] = useState(null)
  const [priceUSDC, setUSDC] = useState(null)
  const [priceUSDT, setUSDT] = useState(null);
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
  const [settingsUSDT, setSettingsUSDT] = useState(null);
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
  const [settingsWBTC, setSettingsWBTC] = useState(null)
  const [settingsSOL, setSettingsSOL] = useState(null)
  const [settingsUSDC, setSettingsUSDC] = useState(null)
  const [cardLoadFee, setCardLoadFee] = useState(null)
  const [wallletBalance, setWalletBalance] = useState(null)
  const [amount, setAmount] = useState(null)
  const [disableForm, setDisableForm] = useState(true)
  const [settings, setSettings] = useState(null)
  const [showModal, setshowModal] = useState(false)
  const [settingsConstants, setSettingsConstants] = useState(null)
  const [tokenSettingsConstants, setTokenSettingsConstants] = useState(null)
  const [amountIssue, setAmountIssue] = useState(0)

  const calculateDecimal = (value) => {
    if (value != undefined) {
      var num = value

      if (value.toString().match(/^-?\d+(?:\.\d{0,2})?/)) {
        var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

        return with2Decimals
      } else {
        return value
      }
    }
    return 0
  }
  const calculateHoleDec = (value) => {
    if (value != undefined && value != null) {
      return value.toString().substring(0, 9)
    }
    return 0
  }
  const calculateDecimalFor8 = (value) => {
    if (value != undefined) {
      var num = value
      var with5Decimals = num.toString().match(/^-?\d+(?:\.\d{0,8})?/)[0]
      return with5Decimals
    }
    return 0
  }
  const calculateDecimalFor5 = (value) => {
    if (
      value != undefined &&
      value != null &&
      isNaN(value) === false &&
      value != Infinity
    ) {
      var num = value
      var with5Decimals = num.toString().match(/^-?\d+(?:\.\d{0,5})?/)[0]
      return with5Decimals
    }

    return 0
  }
  const [state, setState] = useState({
    token: '',
    amount: '',
    total_amount: '',
  })
  // API for coingeeko
  useEffect(() => {
    if (localStorage.getItem('phantomId') && localStorage.getItem('token')) {
      checktoWhitelist()
      calculateDecimal(20)
      setInterval(function () {
        priceHandler()
        getBalanceHandler()
        getSettings()
        partnerCheck();
      }, 3000)
      getSettings()
      partnerCheck()
      getBalanceHandler()
      priceHandler()
    }
  }, [])

  const loadCardSubmit = async () => {
    if (state.token == '') {
      toast.error('Please select the token')
      return
    }
    // if (state.total_amount < 1) {
    //   toast.error('Minimum amount is $50')
    //   return
    // }
    setshowModal(true)
  }

  const checktoWhitelist = () => {
    axios
      .get(`${URL}/admin/cardapplyAndWhitelist/${getCookie('phantomId')}`)
      .then(function (response) {
        if (response.status === 200) {
          if (getCookie('token'))
            if (
              response.data.jdbCardNumber1.length === 16 &&
              response.data.card_activated === 2
            ) {
              setDisableForm(false)
            } else {
              setDisableForm(true)
            }
        } else {
          //  toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        // toast.success(error);
      })
  }
  //
  useEffect(() => {
    if (sessionStorage.getItem('balance')) {
      setbalance(sessionStorage.getItem('balance'))
    }
  }, [sessionStorage.getItem('balance')])
  const getBalanceHandler = async () => {
    axios
      .get(`${URL}/users/walletBalance/${getCookie('phantomId')}`, {
        headers: {
          Authorization: getCookie('token'),
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          newBalanceData(response.data)
        } else {
          toast.error(response.data.message)
        }
      })
      .catch(function (error) {
        toast.success(error)
      })
  }
  const confirmCardLoad = async () => {
    let totalAmount = Math.abs(
      layerPricing(state.token) * amountIssue -
        layerPricing(state.token) * amountIssue * (parseInt(cardLoadFee) / 100)
    )


    axios
      .post(`${URL}/users/createCardPayment`, {
        cardLoadAmount:
          state.token.toLowerCase() === 'sol'
            ? totalAmount * LAMPORTS_PER_SOL
            : totalAmount * Math.pow(10, 18),
        otcAmount:state.token === "USDT" || state.token === "USDC" || state.token === 'BUSD' 
            ? totalAmount * (settingsConstants / 100)
            : totalAmount * (tokenSettingsConstants / 100),
        partnerFee: partner ? totalAmount * (partner.partner_otc / 100) : 0,
        assetType: state.token.toLowerCase() === 'sol' ? 'sol' :state.token.toLowerCase() === "cake" ? "Cake" : state.token.toLowerCase() === "btc" ? "btcb" : state.token.toLowerCase() === "busd" ? "busd" : state.token.toLowerCase() === "eth" ? "eth" : state.token,
        prvFee: partner ? totalAmount * (partner.prv_otc / 100) : 0,
        userAddress: getCookie('phantomId'),
        secondAddress:getCookie("metamaskId"),
        quantity: amountIssue,
        cardLoadFee:
          layerPricing(state.token) *
          amountIssue *
          (parseInt(cardLoadFee) / 100),
        finalAmount: layerPricing(state.token) * amountIssue,
        convertedAmount: calculateDecimal(totalAmount),
        convertedQuantity:
          state.token.toLowerCase() === 'sol'
            ? amountIssue * LAMPORTS_PER_SOL
            : amountIssue * Math.pow(10, 18),
      })
      .then(function (response) {
        if (response.status === 200) {
          toast.success(response.data?.user?.msg)
          toast.success(response.data.message)
          setshowModal(false)
        } else {
          toast.error(response.data.message)
        }
      })
      .catch(function (error) {
        toast.error(error)
      })
  }
  const priceHandler = async () => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/price`,
        {
          method: 'GET',
          headers: {},
        }
      )
      const data = await response.json()
      if (response.status === 200) {
        data.map((a, b) => {
          if (a.symbol === 'SOLUSDT') {
            setSol(a)
          }
          if (a.symbol === 'USDCUSDT') {
            setUSDC(a)
          }
            if (a.symbol === "BUSDUSDT") {
            setUSDT(a);
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
            setBnb(a)
          }
          if (a.symbol == "MKRUSDT") {
            setMKR(a)
          }
          if (a.symbol == "CRVUSDT") {
            setCRV(a)
          }
          if (a.symbol == "CVXUSDT") {
            setCVX(a)
          }
          if (a.symbol == "INSTUSDT") {
            setINST(a)
            console.log(a)
          }
          if (a.symbol == "LDOUSDT") {
            setLDO(a)
          }
          if (a.symbol == "AAVEUSDT") {
            setAAVE(a)
          }
          if (a.symbol == "UNIUSDT") {
            setUNI(a)
          }
          if (a.symbol == "COMPUSDT") {
            setCOMP(a)
          }
          if (a.symbol == "BALUSDT") {
            setBAL(a)
          }
          if (a.symbol == "SUSHIUSDT") {
            setSUSHI(a)
          }
          if (a.symbol == "YFIUSDT") {
            setYFI(a)
          }
          if (a.symbol == "DAIUSDT") {
            setDAI(a)
          }

   
        })
      }
    } catch (err) {
    } finally {
    }
  }
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

        response.data.bsc_token_otc_options.map((a, b) => {
          if (a.label === "USDT") {
            setSettingsUSDT(response.data.bsc_token_otc_percentage);
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
          if (a.label == "WBTC") {
            setSettingsWBTC(response.data.bsc_token_otc_percentage)
          }
        })
        response.data.bsc_stables_otc_options.map((a, b) => {

          if (a.label === "USDT") {
            setSettingsUSDT(response.data.bsc_stables_otc_per);
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

        JSON.parse(response.data.erc_token_otc_options).map((a, b) => {

          if (a.label === "MKR") {
            setSettingsMKR(response.data.erc_token_otc_percentage);
          }
          if (a.label === "CRV") {
            setSettingsCRV(response.data.erc_token_otc_percentage);
          }
          if (a.label === "CVX") {
            setSettingsCVX(response.data.erc_token_otc_percentage);
          }
          if (a.label === "LDO") {
            setSettingsLDO(response.data.erc_token_otc_percentage);
          }
          if (a.label === "AAVE") {
            setSettingsAAVE(response.data.erc_token_otc_percentage);
          }
          if (a.label === "UNI") {
            setSettingsUNI(response.data.erc_token_otc_percentage);
          }
          if (a.label === "COMP") {
            setSettingsCOMP(response.data.erc_token_otc_percentage);
          }
          if (a.label === "BAL") {
            setSettingsBAL(response.data.erc_token_otc_percentage);
          }
          if (a.label === "INST") {
            setSettingsINST(response.data.erc_token_otc_percentage);
          }
          if (a.label === "SUSHI") {
            setSettingsSUSHI(response.data.erc_token_otc_percentage);
          }
          if (a.label === "YFI") {
            setSettingsYFI(response.data.erc_token_otc_percentage);
          }
          if (a.label === "DAI") {
            setSettingsDAI(response.data.erc_token_otc_percentage);
          }
         
        })
        
        JSON.parse(response.data.erc_stables_otc_options).map((a, b) => {

          if (a.label === "MKR") {
            setSettingsMKR(response.data.erc_stables_otc_per);
          }
          if (a.label === "CRV") {
            setSettingsCRV(response.data.erc_stables_otc_per);
          }
          if (a.label === "CVX") {
            setSettingsCVX(response.data.erc_stables_otc_per);
          }
          if (a.label === "LDO") {
            setSettingsLDO(response.data.erc_stables_otc_per);
          }
          if (a.label === "AAVE") {
            setSettingsAAVE(response.data.erc_stables_otc_per);
          }
          if (a.label === "UNI") {
            setSettingsUNI(response.data.erc_stables_otc_per);
          }
          if (a.label === "COMP") {
            setSettingsCOMP(response.data.erc_stables_otc_per);
          }
          if (a.label === "BAL") {
            setSettingsBAL(response.data.erc_stables_otc_per);
          }
          if (a.label === "INST") {
            setSettingsINST(response.data.erc_stables_otc_per);
          }
          if (a.label === "SUSHI") {
            setSettingsSUSHI(response.data.erc_stables_otc_per);
          }
          if (a.label === "YFI") {
            setSettingsYFI(response.data.erc_stables_otc_per);
          }
          if (a.label === "DAI") {
            setSettingsDAI(response.data.erc_stables_otc_per);
          }
        })

      })
      .catch(function (error) {})
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
  }

  //partner check
  const partnerCheck = async () => {
    var config = {
      method: 'get',
      url:
        'https://backend.privacyswap.finance/users/partner/' +
        getCookie('partnerName'),
      headers: {},
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setPartner(response.data)
        }
      })
      .catch(function (error) {})
  }
  //layer 1 pricing    ////    price-
  const valueCalculator = (price, otc, prv, setting) => {
    return (
      price -
      (price * setting) / 100 -
      ((otc * price) / 100 + (prv * price) / 100)
    )
  }
  const layerPricing = (value1) => {
    if (value1 === 'SOL') {
      if (
        parseInt(partner?.partner_otc) &&
        parseInt(partner?.prv_otc) &&
        settingsSOL != null
      ) {
        return calculateDecimal(
          valueCalculator(
            priceSol?.price,
            partner?.partner_otc,
            partner?.prv_otc,
            settingsSOL
          )
        )
      } else if (settingsSOL && settingsSOL !== 0) {
        return calculateDecimal(
          priceSol?.price - priceSol?.price * (settingsSOL / 100)
        )
      }
      else {
        return priceSol?.price
      }
    } else if (value1 === 'USDC') {
      if (
        parseInt(partner?.partner_otc) &&
        parseInt(partner?.prv_otc) &&
        settingsUSDC != null
      ) {
        return calculateDecimal(
          valueCalculator(
            priceUSDC?.price,
            partner?.partner_otc,
            partner?.prv_otc,
            settingsUSDC
          )
        )
      } else if (settingsUSDC && settingsUSDC !== 0) {
        return calculateDecimal(
          priceUSDC?.price - priceUSDC?.price * (settingsUSDC / 100)
        )
      } else {
        return priceUSDC?.price
      }
    }else if (value1 === "USDT") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsUSDT != null) {
        return calculateDecimal(valueCalculator(priceUSDT?.price, partner?.partner_otc, partner?.prv_otc, settingsUSDT));
      }
      else if (settingsUSDT && settingsUSDT !== 0) {
        return calculateDecimal((priceUSDT?.price) - (priceUSDT?.price * (settingsUSDT / 100)))
      } else {
        return (priceUSDT?.price);
      }
    } else if (value1 === "BTCB") {
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
    }else if (value1 === "MKR") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsMKR != null) {
        return calculateDecimal(valueCalculator(priceMKR?.price, partner?.partner_otc, partner?.prv_otc, settingsMKR));
      }

      else if (settingsMKR !== 0) {
        return calculateDecimal((priceMKR?.price) - (priceMKR?.price * (settingsMKR / 100)))
      } else {
        return priceMKR?.price;
      }
    }else if (value1 === "CRV") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsCRV != null) {
        return calculateDecimal(valueCalculator(priceCRV?.price, partner?.partner_otc, partner?.prv_otc, settingsCRV));
      }

      else if (settingsCRV !== 0) {
        return calculateDecimal((priceCRV?.price) - (priceCRV?.price * (settingsCRV / 100)))
      } else {
        return priceMKR?.price;
      }
    }else if (value1 === "CVX") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsCVX != null) {
        return calculateDecimal(valueCalculator(priceCVX?.price, partner?.partner_otc, partner?.prv_otc, settingsCVX));
      }

      else if (settingsCVX !== 0) {
        return calculateDecimal((priceCVX?.price) - (priceCVX?.price * (settingsCVX / 100)))
      } else {
        return priceCVX?.price;
      }
    }else if (value1 === "LDO") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsLDO != null) {
        return calculateDecimal(valueCalculator(priceLDO?.price, partner?.partner_otc, partner?.prv_otc, settingsLDO));
      }

      else if (settingsLDO !== 0) {
        return calculateDecimal((priceLDO?.price) - (priceLDO?.price * (settingsLDO / 100)))
      } else {
        return priceLDO?.price;
      }
    }else if (value1 === "AAVE") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsAAVE != null) {
        return calculateDecimal(valueCalculator(priceAAVE?.price, partner?.partner_otc, partner?.prv_otc, settingsAAVE));
      }

      else if (settingsAAVE !== 0) {
        return calculateDecimal((priceAAVE?.price) - (priceAAVE?.price * (settingsAAVE / 100)))
      } else {
        return priceAAVE?.price;
      }
    }else if (value1 === "UNI") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsUNI != null) {
        return calculateDecimal(valueCalculator(priceUNI?.price, partner?.partner_otc, partner?.prv_otc, settingsUNI));
      }

      else if (settingsUNI !== 0) {
        return calculateDecimal((priceUNI?.price) - (priceUNI?.price * (settingsUNI / 100)))
      } else {
        return priceUNI?.price;
      }
    }else if (value1 === "COMP") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsCOMP != null) {
        return calculateDecimal(valueCalculator(priceCOMP?.price, partner?.partner_otc, partner?.prv_otc, settingsCOMP));
      }

      else if (settingsCOMP !== 0) {
        return calculateDecimal((priceCOMP?.price) - (priceCOMP?.price * (settingsCOMP / 100)))
      } else {
        return priceCOMP?.price;
      }
    }else if (value1 === "BAL") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsBAL != null) {
        return calculateDecimal(valueCalculator(priceBAL?.price, partner?.partner_otc, partner?.prv_otc, settingsBAL));
      }

      else if (settingsBAL !== 0) {
        return calculateDecimal((priceBAL?.price) - (priceBAL?.price * (settingsBAL / 100)))
      } else {
        return priceBAL?.price;
      }
    }else if (value1 === "INST") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsINST != null) {
        return calculateDecimal(valueCalculator(priceINST?.price, partner?.partner_otc, partner?.prv_otc, settingsINST));
      }

      else if (settingsINST !== 0) {
        return calculateDecimal((priceINST?.price) - (priceINST?.price * (settingsINST / 100)))
      } else {
        return priceINST?.price;
      }
    }else if (value1 === "SUSHI") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsSUSHI != null) {
        return calculateDecimal(valueCalculator(priceSUSHI?.price, partner?.partner_otc, partner?.prv_otc, settingsSUSHI));
      }

      else if (settingsSUSHI !== 0) {
        return calculateDecimal((priceSUSHI?.price) - (priceSUSHI?.price * (settingsSUSHI / 100)))
      } else {
        return priceSUSHI?.price;
      }
    }else if (value1 === "YFI") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsYFI != null) {
        return calculateDecimal(valueCalculator(priceYFI?.price, partner?.partner_otc, partner?.prv_otc, settingsYFI));
      }

      else if (settingsYFI !== 0) {
        return calculateDecimal((priceYFI?.price) - (priceYFI?.price * (settingsYFI / 100)))
      } else {
        return priceYFI?.price;
      }
    }else if (value1 === "DAI") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsDAI != null) {
        return calculateDecimal(valueCalculator(priceDAI?.price, partner?.partner_otc, partner?.prv_otc, settingsDAI));
      }

      else if (settingsDAI !== 0) {
        return calculateDecimal((priceDAI?.price) - (priceDAI?.price * (settingsDAI / 100)))
      } else {
        return priceDAI?.price;
      }
    }
    else if (value1 === "WBTC") {
      if (parseInt(partner?.partner_otc) && parseInt(partner?.prv_otc) && settingsWBTC != null) {
        return calculateDecimal(valueCalculator(priceBTC?.price, partner?.partner_otc, partner?.prv_otc, settingsWBTC));
      }

      else if (settingsBTC !== 0) {
        return calculateDecimal((priceBTC?.price) - (priceBTC?.price * (settingsWBTC / 100)))
      } 
      else {
        return priceBTC?.price;
      }
    }
    else {
      return 0
    }
  }
  function convert(n) {
    var sign = +n < 0 ? '-' : '',
      toStr = n.toString()
    if (!/e/i.test(toStr)) {
      return n
    }
    var [lead, decimal, pow] = n
      .toString()
      .replace(/^-/, '')
      .replace(/^([0-9]+)(e.*)/, '$1.$2')
      .split(/e|\./)
    return +pow < 0
      ? sign +
          '0.' +
          '0'.repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) +
          lead +
          decimal
      : sign +
          lead +
          (+pow >= decimal.length
            ? decimal + '0'.repeat(Math.max(+pow - decimal.length || 0, 0))
            : decimal.slice(0, +pow) + '.' + decimal.slice(+pow))
  }

  useEffect(() => {
    setAmountIssue(convert(state.total_amount / layerPricing(state.token)))
    setState({
      ...state,
      amount: calculateDecimalFor5(
        convert(state.total_amount / layerPricing(state.token))
      ),
    })
  }, [layerPricing(state.token)])

  const handleOnChange = (e,from = false) => {
    if (e.target.name === "amount") {
      if (e.target.value.toString().split('.')[1]?.length > 5) {
        return
      }
     
      setState({ ...state, total_amount: calculateDecimal(convert(layerPricing(state.token) * e.target.value)), amount: e.target.value });
    } else {
      if (e.target.value.toString().split('.')[1]?.length > 2 && !from) {
        return
      }
      console.log(calculateDecimalFor5(convert(e.target.value / layerPricing(state.token))))
      console.log(layerPricing(state.token))
      setAmountIssue(convert(e.target.value / layerPricing(state.token)))
      setState({ ...state, amount: calculateDecimalFor5(convert(e.target.value / layerPricing(state.token))), total_amount: e.target.value });
    }
  }
  return (
    <>
      {localStorage.getItem('phantomId') && localStorage.getItem('token') ? (
        ''
      ) : (
        <HeaderNavigator />
      )}
      <div className="dashboard">
        <div className="container py-4" style={{ maxWidth: '1500px' }}>
          <div className="row ">
            <div className="col-lg-7 mb-lg-0 mb-4">
              <div className="card z-index-2">
                <div className="card-body p-3 pt-4">
                  <h6 className="ms-2 mb-0 text-center h-white headtext mb-3">
                   Dashboard Wallet Balance
                  </h6>
                  <div className="row">
                    <div
                      className={
                        localStorage.getItem('phantomId') &&
                        localStorage.getItem('token')
                          ? 'col-md-3 p-2 pt-3'
                          : 'col-md-3 p-2 pt-3 reduce_opacity'
                      }
                    >
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={
                          localStorage.getItem('phantomId') &&
                          localStorage.getItem('token')
                            ? copyAddressToClipboard
                            : ''
                        }
                      >
                        <div className="brificon">
                          <img
                            src={SOL}
                            width="40px"
                            style={{ borderRadius: '50%' }}
                          />
                        </div>
                        <div className="">
                          <p>SOL</p>
                        </div>
                        <h4 className="price">
                          {localStorage.getItem('phantomId') &&
                          localStorage.getItem('token') ? (
                            <>
                              {calculateDecimalFor8(
                                Number(
                                  balanceData?.sol / LAMPORTS_PER_SOL || 0
                                ).toString()
                              )}
                            </>
                          ) : (
                            0
                          )}
                        </h4>

                        <h4 className="price">
                          {localStorage.getItem('phantomId') &&
                          localStorage.getItem('token') ? (
                            <>
                              {'$' +
                                calculateDecimal(
                                  convert(
                                    (balanceData?.sol
                                      ? Number(
                                          balanceData?.sol / LAMPORTS_PER_SOL ||
                                            0
                                        )
                                      : 0) * layerPricing('SOL')
                                  )
                                ).toString() || '0'}
                            </>
                          ) : (
                            0
                          )}
                        </h4>
                      </div>
                    </div>

                    <div
                      className={
                        localStorage.getItem('phantomId') &&
                        localStorage.getItem('token')
                          ? 'col-md-3 p-2 pt-3'
                          : 'col-md-3 p-2 pt-3 reduce_opacity'
                      }
                    >
                      <div
                        className="wbtc wbtc-w cursor-pointer"
                        onClick={
                          localStorage.getItem('phantomId') &&
                          localStorage.getItem('token')
                            ? copyAddressToClipboard
                            : ''
                        }
                      >
                        <div className="brificon">
                          <img src={USDC} width="40px" />
                        </div>
                        <div className="">
                          <p>USDC</p>
                        </div>
                        <h4 className="price">
                          {localStorage.getItem('phantomId') &&
                          localStorage.getItem('token') ? (
                            <>
                              {calculateDecimalFor8(
                                Number(
                                  balanceData?.USDC / 10 ** 18 || 0
                                ).toString()
                              )}
                            </>
                          ) : (
                            0
                          )}
                        </h4>
                        <h4 className="price">
                          {localStorage.getItem('phantomId') &&
                          localStorage.getItem('token') ? (
                            <>
                              {'$' +
                                calculateDecimal(
                                  convert(
                                    (balanceData?.USDC
                                      ? Number(balanceData?.USDC / 10 ** 18 || 0)
                                      : 0) * layerPricing('USDC')
                                  )
                                ).toString() || '0'}
                            </>
                          ) : (
                            0
                          )}
                        </h4>
                      </div>
                    </div>

                 <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    {/* <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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
                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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


                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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

                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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



                    <div className={(localStorage.getItem("phantomId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-3' : "col-md-3 p-2 pt-3 reduce_opacity"}>
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
            <div className="col-lg-5 mb-lg-0 mb-4 ">
              <div className="card z-index-2">
                <div className="card-body  pt-2 pb-0 mobile-card">
                  <div
                    id={
                      localStorage.getItem('phantomId') &&
                      localStorage.getItem('token')
                        ? ''
                        : 'overlay'
                    }
                  ></div>
                  <h6 className="ms-2 mb-0 text-center h-white headtext mb-3">
                    Load Card
                  </h6>
                  <div className="row justify-content-center ">
                    <div
                      className={
                        localStorage.getItem('phantomId') &&
                        localStorage.getItem('token')
                          ? 'col-md-12  p-4 pt-3 mb-0'
                          : 'col-md-12  p- pt-3 mb-0 reduce_opacity'
                      }
                    >
                      <div className="  " style={{ marginTop: '40px' }}>
                        <form>
                          <div
                            className={
                              disableForm === true
                                ? 'wbtc gray row pb-3 mb-4 disableform1'
                                : 'wbtc gray row pb-3 mb-4 '
                            }
                          >
                            <div className="col">
                              <label
                                for="exampleFormControlInput1"
                                className={
                                  disableForm === true ? '' : 'disableform'
                                }
                              >
                                Token Asset
                              </label>
                              <select
                                className="form-control"
                                value={state.token}
                                id="exampleFormControlSelect1"
                                placeholder="Choose"
                                disabled={disableForm === true ? true : false}
                                onChange={(e) => {
                                  if (e.target.value === 'Choose') {
                                    setState({ ...state, token: '' })
                                    return
                                  }
                                  setState({
                                    ...state,
                                    token: e.target.value,
                                    amount: '',
                                    total_amount: '',
                                  })
                                }}
                              >
                                <option>Choose</option>
                                <option>SOL</option>
                                <option>USDC</option>
                                <option>USDT</option>
                                <option>BUSD</option>
                                   
                                    <option>MKR</option>
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
                                    <option>WBTC</option>
                                    <option>CRV</option>

                                  <option>BTCB</option>
                                  <option>AUTO</option>
                                      <option>EPS</option>
                                      <option>XVS</option>
                                      <option>CAKE</option>
                                      
                                      <option>ETH</option>
                                      <option>BNB</option>
                              </select>
                            </div>
                            <div className="change-width"></div>
                            <div className="col">
                              <label
                                for="exampleFormControlInput2"
                                className={
                                  disableForm === true ? '' : 'disableform'
                                }
                              >
                                Token Amount
                              </label>
                              <input
                                type="number"
                                value={state.amount}
                                disabled={true}
                                className="form-control"
                                id="amount"
                                placeholder="Amount"
                                name="amount"
                                onChange={handleOnChange}
                              />
                            </div>
                            <div className="w-100"></div>
                            <div className="col pt-1 pb-0">
                              <label
                                for="Name"
                                className={
                                  disableForm === true ? '' : 'disableform'
                                }
                              >
                                Total Amount (USD)
                              </label>
                              <input
                                type="number"
                                value={state.total_amount}
                                className="form-control"
                                disabled={disableForm === true ? true : false}
                                name="total_amount"
                                id="Name"
                                placeholder="Minimum load is 50 USD"
                                onChange={handleOnChange}
                              />
                            </div>
                          </div>
                          <div className=" justify-content-center text-center pt-2 pb-0">
                            <button
                              type="button"
                              className="btn btns"
                              disabled={disableForm === true ? true : false}
                              onClick={loadCardSubmit}
                            >
                              CONFIRM
                            </button>
                          </div>
                          <div style={{ marginTop: '40px' }}></div>
                        </form>
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
          <Modal.Title>
            Confirm card load with selected crypto asset type and amount
          </Modal.Title>
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
          <div className="alert d-flex flex-column">
            {' '}
            <span>Token Amount : {state.amount}</span>
            <span>Applicable card load fee applies.</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setshowModal(false)
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              confirmCardLoad()
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


