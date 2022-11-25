import { useEffect, React, useState, useContext } from "react";
import "./Home.scss";
import RData from "../../Sass/img/R.png";
import { URL } from "../../Utils/url";
import LogoIcon from "../../Sass/img/Logoicon.svg";
import USDT from "../../Sass/img/USDT.png";
import USDC from "../../Sass/img/USDC.png";
import BTC from "../../Sass/img/BTC.png";
import AUTO from "../../Sass/img/AUTO.png";
import ABIEther2 from '../../abiether2.json'
import WBTCJ from '../../WBTCJ.json'
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
import { Modal, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { ethers } from "ethers";
import { BigNumber as BN } from "bignumber.js";


const Ethchain = () => {
    const [balances, setbalances] = useState([]);
    const [ethBalance,setEthbalance] = useState(null);
    const [loading,setLoading]=useState(true)


   
    const calculateDecimalFor8 = (value) => {

        if (value != undefined && value != null) {
          var num = value;
          var with5Decimals = num.toString().match(/^-?\d+(?:\.\d{0,8})?/)[0];
          return with5Decimals;
        }
        return 0;
      };


      const tokenfn=async()=>{
                setInterval( async() => {
         
        const web3 = await getWeb3();

        web3.eth.getBalance(getCookie("metamaskId")).then(balance => {
         
           setEthbalance(balance/Math.pow(10, 18))
         
          
          });

        var accs = await web3.eth.getAccounts();


        const newAccounts = await Promise.all(accs.map(async (address) => {
            const balance = await web3.eth.getBalance(address)

            const tokenBalances = await Promise.all(
                [
                {
                  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                  token: 'USDC',
                  image:  USDC
                },
                {
                  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                  token: 'USDT',
                  image:USDT
                },
                {
                  address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                  token: 'WBTC',
                  image:BTC
                }, 
                {
                  address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
                  token: 'BUSD',
                  image:BUSD
                },
            
               
          
                {
                  address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
                  token: 'MKR',
                  image:MKR
                },
                {
                  address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
                  token: 'CRV',
                  image:CRV
                }, 
            {
                  address: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
                  token: 'CVX',
                  image: CVX
                },
                {
                    address: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
                    token: 'LDO',
                    image: LDO
                },
                {
                    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
                    token: 'AAVE',
                    image: AAVE
                },
            
               {
                    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
                    token: 'UNI',
                    image: UNI
                },
            
               {
                address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
                token: 'COMP',
                image: COMP
            },
            
            {
                address: '0x6f40d4A6237C257fff2dB00FA0510DeEECd303eb',
                token: 'INST',
                image: INST
            },
            
            {
                address: '0xba100000625a3754423978a60c9317c58a424e3D',
                token: 'BAL',
                image: BAL
            },
            
            {
                address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
                token: 'SUSHI',
                image: SUSHI
            },
            {
                address: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
                token: 'YFI',
                image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5864.png"
            },
            {
                address: '0x6b175474e89094c44da98b954eedeac495271d0f',
                token: 'DAI',
                image: DAI
            },
           
               
              ].map(async (token) => {
               
                const tokenInst = new web3.eth.Contract(token.token == "WBTC"?WBTCJ:ABIEther2, token.address);
               
                const balance = await tokenInst.methods.balanceOf(address).call()
                
                
                return {
                    token: token.token,
                    balance : token.token === "USDT" || token.token === "USDC" ?balance / Math.pow(10,6) : token.token === "WBTC"? balance / Math.pow(10,8): web3.utils.fromWei((parseInt((balance) || 0)).toString(), 'ether'),
                    image: token.image
                }
            }))

            return  tokenBalances;
            
        }))
        setbalances(newAccounts[0]);

    
    }, 3000);
      }

    useEffect( () => {
     tokenfn()
     const timer=setTimeout(()=>setLoading(false),4000)
      return () => {
     clearTimeout(timer)
     };
    }, [])


  return (
       <div className="row">

        {loading && 
        <div className="col d-flex align-items-center justify-content-center">

        <Spinner size="md" variant="light" animation="border" role="status"/>
        </div>
        }
           
            {

                !loading &&
                balances.map((balance, index) => {
                    return <div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
                        <div className="wbtc wbtc-w">
                            <div className="brificon">
                                <img src={balance.image} width="40px" />
                            </div>
                            <p>{balance.token} </p>
                            <h4 className="price" style={{ fontSize: "15px" }}>


                                <>
                                { calculateDecimalFor8((
                                    balance.balance
                  )) }
                                </>
                            </h4>
                            {/* <h4 className="price">
                           $
                           {layerPricing("USDT") ?
                               <>
                                   {calculateDecimal((
                                       (layerPricing("USDT") ? layerPricing(balance.token) : 0)
                                   ) * (
                                        balance.balance ? balance.balance : 0
                                       ))}
                               </> : 0}
                       </h4> */}


                        </div>
                    </div>;

                })


    

            }

{
!loading &&
<div className={(localStorage.getItem("metamaskId") && localStorage.getItem("token")) ? 'col-md-3 p-2 pt-4' : "col-md-3 p-2 pt-4 reduce_opacity"}>
                        <div className="wbtc wbtc-w">
                            <div className="brificon">
                                <img src={ETH} width="40px" />
                            </div>
                            <p>{"ETH"} </p>
                            <h4 className="price" style={{ fontSize: "15px" }}>
                            { calculateDecimalFor8((
                                    ethBalance
                  )) }

                        
                            </h4>
                           


                        </div>
                    </div>

                            }

        </div>
  )
}

export default Ethchain