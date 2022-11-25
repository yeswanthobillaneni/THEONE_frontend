import React, { Fragment, useState, useEffect, useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import './Header.scss'
import Banding from '../../Sass/img/Branding.png'
import { useNavigate, useLocation } from 'react-router'
import {
  deleteAll,
  deleteCookie,
  getCookie,
  setCookie,
} from '../../Utils/cookieHandling'
import axios from 'axios'
import { URL } from '../../Utils/url'
import { UserRoleContext } from '../../Utils/UserAuthorization'
import { toast } from 'react-toastify'
import * as Icon from 'react-bootstrap-icons'
import { Dropdown } from 'react-bootstrap'
import ETH from '../../Sass/img/ETH.png'
import SOL from '../../Sass/img/Sol.png'
import { useMetaMask, useConnectedMetaMask } from "metamask-react";
import Solswipe from '../../Sass/img/logos/Logo.png'
import {
  PublicKey,
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import LogRocket from 'logrocket';


export default function HeaderNavigator() {
  let { solana } = window
  const roleContext = useContext(UserRoleContext)
  const location = useLocation()
  const [clickData, setClickData] = useState(false)
  const navigate = useNavigate()
  const [disableForm, setDisableForm] = useState(true)
  const [showMenu, setShowMenu] = useState(true)
  const [modifiedDate, setModifiedDate] = useState(false)
  const [state, setState] = useState({
    modal: false,
    address: '',
    balance: '',
    isPhantomInstall: false,
    isConnected: false,
  })
  const [whiteListCheck, setWhiteListCheck] = useState(false)
   let rpc="https://solana-mainnet.g.alchemy.com/v2/gpAYaj6fl70Q-o6wSS9vXfB0sujfSoOl";
  const connection =new Connection(rpc, 'confirmed');
  const [currentChain,setCurrentChain]=useState('')

  let {  connect } = useMetaMask();

  useEffect(() => {
    if (solana in window) {
      solana = window.solana;
    }
    if (localStorage.getItem('token') && localStorage.getItem('phantomId')) {
      roleContext.updateContext({ isLoggedIn: true })
      checktoWhitelist()
    }
  }, [])


  if (solana) {
    solana.on('accountChanged', () => {
      solana.connect({ onlyIfTrusted: true }).then(() => {
        window.location.reload()
      })
    })
  }

  useEffect(() => {
    sessionStorage.setItem('balance', state.balance)
  }, [state.balance])

  useEffect(() => {
    if (state.address != '') {
      connection.getBalance(solana.publicKey).then((res) => {
        setState((state) => ({
          ...state,
          balance: res,
        }))
      })
    }

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.address])

  useEffect(()=>{
   if(location.pathname === "/login" || location.pathname === "/register"){
    navigate('/')
   }
  },[location])

  const { id } = useParams()
  const partner_name =location?.pathname === "/affiliate" ?  'card.solswipe.io' :`card.solswipe.io${location.pathname}`


  // login api
  const loginHandler = async () => {
    if (getCookie('phantomId')) {
      try {
        const response = await fetch(`${URL}/users/loginWithAddress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            partnerName: partner_name,
            userAddress: getCookie('phantomId'),
          }),
        }).then(async (response) => {
          const data = await response.json()

          if (response.status === 200) {
            setCookie('token', data.token)
            setCookie('email', data.email)
            setCookie('address', data.address)
            setCookie('partnerName', data.partnerName)
            setCookie('currentChain','SOL')
            setCurrentChain('SOL')
            roleContext.updateContext({ isLoggedIn: true })
            toast.success(data.message)
  

            if (location.pathname === '/affiliate') {
              await axios
                .put(`${URL}/users/updateaffiliate/${getCookie('phantomId')}`, {
                  affiliate: true,
                })
                .then((res) => {
                  if (res.status === 200) {
                    roleContext.updateContext({ affiliate: true })
                    console.log('affiliate updated')
                  } else {
                    toast.error(res.data.message)
                  }
                })
            }
             if(location.pathname !== '/affiliate'){
              navigate('/')
             }
          } else {
            toast.error(data.message)
          }
        })
      } catch (err) {
      } finally {
      }
    }
  }

  const networks = {
    eth: {
      chainId: '0x1',
      chainName: 'Ethereum',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet.infura.io/v3/undefined'],
      blockExplorerUrls: ['https://etherscan.io'],
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        
      ],
      blockExplorerUrls: ["https://bscscan.com"]
    },

    xdc:{
      chainId:`0x${Number(50).toString(16)}`,
      chainName: "XinFin Network Mainnet",
      nativeCurrency: {
        name: 'XinFin',
        symbol: "XDC",
        decimals:18
      },
      rpcUrls: [
        "https://rpc.xinfin.network",
      ],
      blockExplorerUrls: ["https://xinfin.org"]
    }
  };

  const changeNetwork = async ({ networkName }) => {
    try {
      
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName]
          }
        ]
      });
      setCurrentChain(networkName);
      connect().then((res) => {
        localStorage.setItem("metamaskId", res[0]);
        localStorage.setItem("currentChain", networkName.toUpperCase());
        window.location.reload();
        })

    } catch (err) {
      toast.error('Please Install Metamask')
        console.log(err)
    }
  };


  const handleNetworkSwitch = async (networkName) => {
    if (networkName.toLowerCase() === "eth") {
      if(window.ethereum){

      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }],
      }).then(() => {
        localStorage.setItem("currentChain", networkName.toUpperCase());
        connect().then((res) => {
        localStorage.setItem("metamaskId", res[0]);
        window.location.reload();
        })
      }).catch((e) => {
        
        toast.error(e);
      })
    }else{
      toast.error('Please Install Metamask')
    }
      return;
    }

    
    await changeNetwork({ networkName });
  };

  const checktoWhitelist = () => {
    axios
      .get(`${URL}/admin/cardapplyAndWhitelist/${getCookie('phantomId')}`)
      .then(function (response) {
        if (response.status === 200) {
          roleContext.updateContext({ affiliate: response.data.affiliate })
          roleContext.updateContext({ card_type: response.data.card_type })
          roleContext.updateContext({
            jdbCardNumber1: response.data.jdbCardNumber1,
          })
          roleContext.updateContext({
            card_activated: response.data.card_activated,
          })
          roleContext.updateContext({ card_active_reject: response.data.card_active_reject });
          var now
          let modifiedStatus = false
          if (response.data.stakedate != null) {
            now = new Date(response.data.stakedate)
            now.setMinutes(now.getMinutes() + 30)
            now = new Date(now)
          }

          if (new Date() > now) {
            modifiedStatus = true
          }

          roleContext.updateContext({ staking: response.data.staking })
          roleContext.updateContext({ stakingTime: modifiedStatus })
          roleContext.updateContext({
            approveStacking: response.data.stakeapprove,
          })

          if (
            response.data.jdbCardNumber1?.length === 16 &&
            response.data.card_activated === 2
          ) {
            setDisableForm(false)
          } else {
            setDisableForm(true)
          }

          if (response.data.card_applied === 1) {
            roleContext.updateContext({ card_applied: true })
          }

          if (response.data.kycStatus === '1' || response.data.kycStatus === 1) {
            roleContext.updateContext({ card_purchase: true })
          }
          if (response.data.card_activated === 2) {
            roleContext.updateContext({
              card_activated: response.data.card_activated,
            })
          }
          if (response.data.cardStatus === 'paid') {
            roleContext.updateContext({ card_status: true })
          }

         if(response.data.cardStatus === null  && response.data.card_type === 0){
          navigate('/cardpurchase')
         }else{
          return;
         }
        }
      })
      .catch(function (error) {})
  }



  const connectClickHandler = () => {
    if (solana && solana.isPhantom) {
      solana
        .connect()
        .then(() => {
          const publicKey = solana.publicKey.toString()
          localStorage.setItem('phantomId', publicKey)
          whiteListHandler()
          loginHandler()
          setState((state) => ({
            ...state,
            address: publicKey,
            isConnected: true,
          }))
        LogRocket.init('aygely/test123');
        LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
        name: publicKey,
      });
        })
        .catch((err) => {
          console.error(err, 'fsgvb')
          toast.error(err.message)
        })
    } else {
      toast.error('Please install Phantom !')
      setState((state) => ({ ...state, modal: true }))
    }
  }

  const whiteListHandler = () => {
    if (!getCookie('phantomId')) {
      // updateAllCoins()
      connectClickHandler()
      return
    }
    axios
      .get(
        `${URL}/users/whiteList?userAddress=${getCookie(
          'phantomId'
        )}&email=${getCookie('email')}`,
        {
          headers: {
            Authorization: getCookie('token'),
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          // updateAllCoins()
          setWhiteListCheck(true)
        } else {
          toast.error(response.data.message)
        }
      })
      .catch(function (error) {
        toast.success(error)
      })
  }





  return (
    <nav class="navbar navbar-expand-lg navbar-dark1  pb-0 header-new ">
      <div class="container-fluid ">
        <span class="navbar-brand" onClick={() => navigate('/')}>
          <img src={Solswipe} alt="" class="img-fluid" />
        </span>

        <div class="navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto ">


            <li class="nav-item first-nav d-flex align-items-center  justify-content-between">
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => setShowMenu(!showMenu)}
              >
                <span class="navbar-toggler-icon d-flex align-items-center justify-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="white"
                    class="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </span>
              </button>
              <div className='d-sm-flex flex-sm-column align-items-center flex-md-row mx-md-4 '>
              {
                 !disableForm  &&
              <div className="position-relative" style={{marginRight:'20px'}}>
                {(getCookie("phantomId") && getCookie('token')) &&
                  <button className="chainbutton f-sol" onClick={() => {
                    setClickData(!clickData);
                    
                  }}>
                    {localStorage.currentChain === '' ? 'Chain' : localStorage.currentChain}
                  </button>
                  
                }
               {clickData && <div className="position-absolute absolute-container">
                 {localStorage.currentChain.toLowerCase() ===  'eth'  || localStorage.currentChain.toLowerCase() ===  'sol' ?
                  <div >
                   <img src={"https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png"} width="20px" /><span onClick={() => { 
                    handleNetworkSwitch("bsc"); 
                 setClickData(!clickData); }}
                 >BSC</span></div> : ''
                 }

                 {
                  localStorage.currentChain.toLowerCase() ===  'bsc'  || localStorage.currentChain.toLowerCase() ===  'sol'  ?
                    <div style={{marginTop:'20px'}}>
                  <img src={ETH} width="20px" /> 
                  <span onClick={() => { 
                    handleNetworkSwitch("eth"); 
                   setClickData(!clickData);}}>
                    ETH
                    </span>
                    </div>
                    : ''
                 }

                 {
                  localStorage.currentChain.toLowerCase() ===  'bsc'  || localStorage.currentChain.toLowerCase() ===  'eth'  ?
                    <div style={{marginTop:'20px'}}>
                    <img src={SOL} width="20px" /> 
                  <span onClick={() => { 
                   setCookie('currentChain','SOL'); 
                   setClickData(!clickData);
                   window.location.reload();
                   }}>
                    SOL
                    </span>
                    </div>
                    : ''
                 } 
               

                </div>
                }

              </div>
              }

              <div className="btn btn-w padded" onClick={connectClickHandler}>
                {getCookie('phantomId') && getCookie('token')
                  ? getCookie('phantomId').slice(0, 6) +
                    '...' +
                    getCookie('phantomId').substr(
                      getCookie('phantomId').length - 4
                    )
                  : 'Connect to Phantom'}
              </div>
              </div>

            </li>

            {localStorage.getItem('phantomId') &&
            localStorage.getItem('token') ? (
              <>
                <li
                  class="nav-item text-center"
                  style={{ display: showMenu ? 'block' : 'none' }}
                >
                  <span
                    class={
                      location.pathname === '/' ||
                      location.pathname === '/dashboard'
                        ? 'nav-link active1'
                        : 'nav-link'
                    }
                    onClick={() => {
                      navigate('/')
                      checktoWhitelist()
                    }}
                  >
                    Home
                  </span>
                </li>

                {disableForm ? null : (
                  <li
                    class="nav-item text-center"
                    style={{ display: showMenu ? 'block' : 'none' }}
                  >
                    <span
                      class={
                        location.pathname === '/card-load-home'
                          ? 'nav-link active1'
                          : 'nav-link'
                      }
                      style={{ width: '100px' }}
                      onClick={() => {
                        navigate('/card-load-home')
                        checktoWhitelist()
                        window.location.reload()
                      }}
                    >
                      Load Card
                    </span>
                  </li>
                )}

                {
                  <li
                    class="nav-item text-center"
                    style={{ display: showMenu ? 'block' : 'none' }}
                  >
                    <span
                      class={
                        location.pathname === '/card-form' ||
                        location.pathname === '/card-activate' ||
                        location.pathname === '/card-submit' ||
                        location.pathname === '/card-load' ||
                        location.pathname === '/cardisactivate' ||
                        location.pathname === '/cardpurchase' ||
                        location.pathname === '/card-process'
                          ? 'nav-link active1'
                          : 'nav-link'
                      }
                      onClick={() => {
                        console.log(roleContext.card_purchase)
                        if (
                          (roleContext.affiliate &&
                          roleContext.card_purchase &&
                          roleContext.jdbCardNumber1 == null &&
                          roleContext.card_status) 
                        ) {
                          navigate('/card-process')
                          return
                        }
                        if (
                          roleContext.card_applied === 0 &&
                          (roleContext.card_status === true ||
                            roleContext.card_status === 'paid')
                        ) {
                          navigate('/card-form')
                        }
                        if (
                          (roleContext.jdbCardNumber1 !== null && roleContext.card_active_reject === "inprogress")
                        ) {
                          navigate('/cardisactivate')
                          return
                        }
                        if (roleContext.card_activated == 2) {
                          navigate('/card-load')
                        } else if (roleContext.card_activated == 1) {
                        } else if (
                          (roleContext.card_purchase &&
                          roleContext.jdbCardNumber1 != '' &&
                          roleContext.jdbCardNumber1 != null)|| roleContext.card_active_reject ==="Rejected"
                        ) {
                          navigate('/card-submit')
                        } else if (roleContext.card_applied == 2) {
                          navigate('/card-load')
                        } else if (
                          roleContext.card_status == null ||
                          roleContext.card_status == false
                        ) {
                          navigate('/cardpurchase')
                        } else {
                          console.log(roleContext.card_status, 'rolestatatatat')
                          //navigate("/cardpurchase");
                          navigate('/card-form')
                        }
                      }}
                    >
                      {roleContext.card_activated == 2 ? 'Transaction' : 'Card'}
                    </span>
                  </li>
                }
                {console.log(
                  roleContext.card_status,
                  roleContext.staking,
                  roleContext.stakingTime
                )}
                {/* {roleContext.affiliate?null:   roleContext.card_status 
                 ?
                  <>

                    <li class="nav-item" style={{ display: showMenu ? "block" : "none" }}>
                      <span
                        class={
                          location.pathname === "/stake"
                            ? "nav-link active1"
                            : "nav-link"
                        }
                        onClick={() => {
                          navigate("/stake");
                          checktoWhitelist();
                        }}
                      >
                        Stake
                      </span>
                    </li>
                  </> : ""} */}
                <li
                  class="nav-item text-center"
                  style={{ display: showMenu ? 'block' : 'none' }}
                >
                  <span
                    class="nav-link"
                    onClick={() => {
                      //deleteCookie('token');
                      deleteAll()
                      window.location.reload()
                    }}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
