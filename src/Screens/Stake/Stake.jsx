// import React, { Fragment, useState, useEffect, useContext } from "react";
// import LogoIcon from "../../Sass/img/Logoicon.svg";
// import CardIcon from "../../Sass/img/Card.svg";
// import { getCookie } from "../../Utils/cookieHandling";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { URL } from "../../Utils/url";
// import ABINew from '../../abinew.json';
// import ABIApprove from '../../approveABI.json'
// import copy from "../../Sass/img/copy_address.png";
// import cripto from "../../Sass/img/cripto-debitcard.png";
// import premium from "../../Sass/img/premium-black.png";
// import shield from "../../Sass/img/shield1.png";
// import silver from "../../Sass/img/silver-metal.png";
// import golden from "../../Sass/img/golden metal.png";
// import { useLocation ,useNavigate} from "react-router";
// import { getData, getBalance } from "../../Utils/helpers";
// import "./Stake.scss";
// import { UserRoleContext } from "../../Utils/UserAuthorization";
// import getWeb3 from "../../Utils/getWeb3";
// import CardActivate from "../CardForm/CardActivate";
// import CardActivate2 from "../CardForm/CardActive2";
// import visa from "../../Sass/img/logos/visa.png"
// import cardchip from '../../Sass/img/logos/Chip_Card.png'
// import Card from '../../Sass/img/Card.png'


// function Stake(props) {
//   const roleContext = useContext(UserRoleContext);
//   const { ethereum } = window;
//   const location = useLocation();
//   const [isLoading,setIsLoading] = useState(false);
//   const [approveTransaction, setApprove] = useState(roleContext.approveStacking);
//   const navigate = useNavigate();
//   const [whiteListCheck, setWhiteListCheck] = useState(true);
//   const [state, setState] = useState({
//     modal: false,
//     address: "",
//     balance: "",
//     network: "",
//     symbol: "",
//     isMetaMaskInstall: false,
//     isConnected: false,
//   });
//   const [buttonName, setButtonName] = useState("I already Paid");
//   useEffect(() => {
//     // if (getCookie("metamaskId")) {
//     //   setWhiteListCheck(true);
//     // }
//   }, [getCookie("metamaskId")]);
//   useEffect(() => {
//     initialize();
//     checktoWhitelist();
//     // updateAllCoins()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props]);

//   useEffect(() => {
//     sessionStorage.setItem("balance", state.balance);
//   }, [state.balance]);

//   useEffect(() => {
//     if (state.address !== "") {
//       getBalance(ethereum, state.address).then((result) => {
//         setState((state) => ({
//           ...state,
//           balance: result,
//         }));
//       });
//     } else {
//       setState((state) => ({
//         ...state,
//         balance: "",
//       }));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state.address, state.network]);
 

//   const updateStakingApprove = (payload) => {
//     axios
//       .post(`${URL}/users/updateStakeStatus/${getCookie("metamaskId")}`,payload)
//       .then(function (response) {
//         if(response.status == 200){
//           setApprove(true);
//           setIsLoading(false)
//         }
//         console.log("data",response)
//       })
//       .catch(function (error) {
//         toast.error(error);
//       });
//   }
//   const initialize = () => {
//     if (ethereum && ethereum.isMetaMask) {
//       console.info("Metamask installed!");

//       setState((state) => ({
//         ...state,
//         isMetaMaskInstall: true,
//       }));

//       getData(ethereum)
//         .then((result) => {
//           if (result) {
//             const [account, network, symbol] = result;


//             setState((state) => ({
//               ...state,
//               address: account,
//               network,
//               symbol,
//               isConnected: true,
//             }));
//           } else {
//             setState((state) => ({
//               ...state,
//               isConnected: false,
//             }));
//           }
//         })
//         .catch((error) => {

//         });

//       // ethereum.on("chainChanged", (_chainId) => {
//       //   getNetwork(ethereum, _chainId).then((result) => {
//       //     const [network, symbol] = result;

//       //     setState((state) => ({
//       //       ...state,
//       //       network,
//       //       symbol,
//       //     }));
//       //   });
//       // });

//       ethereum.on("accountsChanged", (accounts) => {
//         if (accounts[0]) {
//           setState((state) => ({
//             ...state,
//             address: accounts[0],
//           }));
//         } else {
//           setState((state) => ({
//             ...state,
//             address: "",
//             network: "",
//             isConnected: false,
//           }));
//         }
//       });
//     } else {
//       console.warn("Metamask not installed!");

//       setState((state) => ({
//         ...state,
//         isMetaMaskInstall: false,
//       }));
//     }
//   };
//   const connectClickHandler = () => {
//     if (state.isMetaMaskInstall) {
//       ethereum
//         .request({ method: "eth_requestAccounts" })
//         .then((result) => getData(ethereum, result))
//         .then((result) => {
//           const [account, network, symbol] = result;

//           localStorage.setItem("metamaskId", account);

//           toast.success("Address Whitelisted successfully");
//           setState((state) => ({
//             ...state,
//             address: account,
//             network,
//             symbol,
//             isConnected: true,
//           }));
//         })
//         .catch((error) => {

//         });
//     } else {
//       console.warn("Please install MetaMask!");
//       setState((state) => ({ ...state, modal: true }));
//     }
//   };
//   const checktoWhitelist = () => {
//     axios
//       .get(`${URL}/admin/cardapplyAndWhitelist/${getCookie("metamaskId")}`)
//       .then(function (response) {
//         if (response.status === 200) {
//           if (response.data.address != null) {
//             setWhiteListCheck(true);
//           }
//         } else {
//           //  toast.error(response.data.message);
//         }
//       })
//       .catch(function (error) {
//         toast.success(error);
//       });
//   };
//   const updateCoins = (coins, address, urlData, custom) => {
//     axios
//       .get(
//         `${URL}/users/${urlData}?userAddress=${address}&${coins}=${custom}`,
//         {
//           headers: {
//             Authorization: getCookie("token"),
//           },
//         }
//       )
//       .then(function (response) {

//         if (response.status === 200) {

//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch(function (error) {
//         toast.success(error);
//       });

//   }
//   const updateAllCoins = () => {

//     updateCoins("btcb", getCookie(
//       "metamaskId"
//     ), "updateBTCB", "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c");



//     updateCoins("eth", getCookie(
//       "metamaskId"
//     ), "updateETH", "0x2170ed0880ac9a755fd29b2688956bd959f933f8");




//     updateCoins("busd", getCookie(
//       "metamaskId"
//     ), "updateBUSD", "0xe9e7cea3dedca5984780bafc599bd69add087d56");






//     updateCoins("usdc", getCookie(
//       "metamaskId"
//     ), "updateUSDC", "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d");




//     updateCoins("cake", getCookie(
//       "metamaskId"
//     ), "updateCAKE", "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82");






//     updateCoins("xvs", getCookie(
//       "metamaskId"
//     ), "updateXVS", "0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63");







//     updateCoins("auto", getCookie(
//       "metamaskId"
//     ), "updateAUTO", "0xa184088a740c695e156f91f5cc086a06bb78b827");



//     updateCoins("mbox", getCookie(
//       "metamaskId"
//     ), "updateMBOX", "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377");



//     updateCoins("usdt", getCookie(
//       "metamaskId"
//     ), "updateUSDT", "0x55d398326f99059ff775485246999027b3197955");



//     updateCoins("EPS", getCookie(
//       "metamaskId"
//     ), "updateEPS", "0xa7f552078dcc247c2684336020c03648500c6d9f");





//     // updateCoins("bnb", getCookie(
//     //   "metamaskId"
//     // ), "updateBNB", "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c");


//     // updateCoins("mdx", getCookie(
//     //   "metamaskId"
//     // ), "updateMDX", "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c");


//     // updateCoins("alpaca", getCookie(
//     //   "metamaskId"
//     // ), "updateALPACA", "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c");

//   }
//   const whiteListHandler = () => {

//     if (!getCookie("metamaskId")) {
//       // updateAllCoins()
//       connectClickHandler();
//       return;
//     }
//     axios
//       .get(
//         `${URL}/users/whiteList?userAddress=${getCookie(
//           "metamaskId"
//         )}&email=${getCookie("email")}`,
//         {
//           headers: {
//             Authorization: getCookie("token"),
//           },
//         }
//       )
//       .then(function (response) {
//         if (response.status === 200) {
//           // updateAllCoins()
//           setWhiteListCheck(true);
//           toast.success("Address Whitelisted successfully");
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch(function (error) {
//         toast.success(error);
//       });
//   };
//   const stakeFunction = async () => {
//     setIsLoading(true);
//     const web3 = await getWeb3();
//     let instance1 = new web3.eth.Contract(
//       ABIApprove,
//       "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
//     );
//     instance1.methods.approve("0xD568c04D12F973b223053049f4513971AAf23f5e", "100000000000000000000000").send({ from: getCookie("metamaskId") }).then(async () => {
      
   
//       updateStakingApprove({
//         staking:false,
//         stakeapprove:true
//       });
//       toast.success("transaction approved from metamask");
     
//     }).catch((e) => {
//       setIsLoading(false)
//       toast.error(e);
//     })

//   }

//   const afterApproveFunction = async () => {
//     setIsLoading(true)
//     const web3 = await getWeb3();
//     let instance = new web3.eth.Contract(
//       ABINew,
//       "0xD568c04D12F973b223053049f4513971AAf23f5e"
//     );
//     instance.methods.deposit().send({ from: getCookie("metamaskId") }).then(() => {
//       toast.success("stake success");
//       updateStakingApprove
//       ({
//         staking:true,
//         stakeapprove:true
//       });
//       roleContext.updateContext({ staking: true });
//           roleContext.updateContext({ approveStacking: true });
         
//     }).catch((e) => {
//       toast.error(e);
//       setIsLoading(false)
//     })

//   }




//   const withdrawnHandler = async () => {
//     setIsLoading(true)
//     const web3 = await getWeb3();
//     let instance = new web3.eth.Contract(
//       ABINew,
//       "0xE91D878b9BA23dEF7CC8b61cB5799668841E74b3"
//     );
//     instance.methods.withdraw().send({ from: getCookie("metamaskId") }).then(() => {
//       toast.success("withdraw success");
//       setIsLoading(false)
//     }).catch((e) => {
//       toast.error(e);
//       setIsLoading(false)
//     })

//   }
// console.log(roleContext.stakingTime );


//   return (
//     roleContext.staking && roleContext.approveStacking && roleContext.stakingTime == false ?  <CardActivate2 />  : <form>
//       <div className="background-imagetest pb--30 new-data">
//         <div className="container py-4">
//           <div className="row ">
//             <div className="col-lg-3 mb-lg-0 mb-4  pt-5">
//               <div className="card z-index-2">
               
//                 <div className="card-body p-5 pt-5">
//                   <div className="row">
//                     <div className="col-md-12  pt-4">
//                       <h6 className="color-head1">Sol Staked</h6>
//                       <h3 className="pt-0 color-head">
//                         0 Sol
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-8 mb-lg-0  pt-5 ">
//               <div className="card z-index-2">
//                 <div className="card-body p-md-2 p-sm-0 pt-md-2 pb-md-0">
//                   <div className="row justify-content-center ">
//                     <div className="col-md-12  pt-3 mb-0 ">
//                       <div className="d-flex flex-column align-items-center justify-content-center text-center pt-0  pb-0">
//                         <h7 className="mb-0 text-center h-white headtext">
//                         Whitelist your MetaMask Wallet address by clicking the button below
//                         </h7>
//                         <button className="btn stakebtns py-3 px-5">Whitelist</button>

//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row my-4">
//             <div className="col-md-12 mb-lg-0 mb-4">
//               <div className="card z-index-2">
//                 <div className="card-body p-md-3 p-sm-0 ">
//                   <h6 className="ms-2 mb-0 text-center h-white cardhead pt-3 pb-3">
//                     Choose Card Eligibility
//                   </h6>
//                   <form>
//                     <div className="row p-2 pt-0 justify-content-center">

//                       <div className={(roleContext.card_type === "Premium Black") ? 'col-md-6  pt-3' : "col-md-6  pt-3 "}>
//                       {/* reduce_opacity */}

//                         <div className="row align-items-center justify-content-center mob-row">
//                           <div className="col-md-9">
//                             <div className="custom-control custom-checkbox mb-3">
//                               <div className="row align-items-center justify-content-center">
//                                 <div className="col-md-1 d-flex align-items-center justify-content-center">
//                                   <div>
//                                   <input
//                                     type="radio"
//                                     className="custom-control-input"
//                                     id="customCheck1"
//                                     name="example1"
//                                     // checked={(roleContext.card_type === "Premium Black") ? true : false}
//                                   />
//                                   <label for="customCheck1"></label>
//                                   </div>           
//                                 </div>
//                                 <div className="col-md-11 d-flex align-items-center justify-content-center ml-2">
//                                   <label
//                                     className="custom-control-label"
//                                     for="customCheck1"
//                                   >
//                                      <img src={Card} width={'100%'}/>
                                     
//                                   </label>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-md-3 new-btn d-flex flex-column  align-items-center justify-content-center mobcol2">
//                             <p className="cardtype">Premium Black</p>
//                             <h3 className="pt-0 mt-0 color-head">
//                              3000 <span className="f-sol">SOL</span>
//                             </h3>

//                             <button
//                               type="button"
//                               className="btn stakebtns1"
                           
//                               // disabled={(roleContext.card_type === "Premium Black") ? false : true}
//                               onClick={isLoading ?null:roleContext.stakingTime ? withdrawnHandler : approveTransaction ? afterApproveFunction : stakeFunction}
//                             >
//                               {isLoading ? "Loading ..." :roleContext.stakingTime ? "Withdraw" :  approveTransaction ? "STAKE BUSD" : "Approve"}
//                             </button>
//                           </div>
//                         </div>
//                       </div>

                      

                    

//                       <div className={(roleContext.card_type === "Gold Metal") ? 'col-md-6  pt-3 pr-3' : "col-md-6  pt-3"}>
//                       {/* reduce_opacity */}
//                         <div className="row d-flex align-items-center mob-row">
//                           <div className="col-md-9 ">
//                             <div className="custom-control custom-checkbox mb-3">
//                               <div className="row d-flex align-items-center justify-content-center">
//                                 <div className="col-md-1 d-flex align-items-center justify-content-center">
  
//                                 <div>
//                                   <input
//                                     type="radio"
//                                     className="custom-control-input"
//                                     id="customCheck2"
//                                     name="example1"
//                                     // checked={(roleContext.card_type === "Gold Metal") ? true : false}
//                                   />
//                                   <label for="customCheck2"></label>
//                                   </div>

//                                 </div>
//                                 <div className="col-md-11 d-flex align-items-center justify-content-center">
//                                   <label
//                                     className="custom-control-label"
//                                     for="customCheck2"
//                                   >
//                                      <img src={Card} width={'100%'}/>
                               
//                                   </label>

//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-md-3  new-btn d-flex flex-column  align-items-center justify-content-center mobcol2">
//                             <p className="cardtype">Gold Metal</p>
//                             <h3 className="pt-0 mt-0 color-head">
//                              3000 <span className="f-sol">SOL</span>
//                             </h3>

//                             <button
//                               type="button"
//                               className="btn stakebtns1 "
//                               width="30px"
//                               // disabled={(roleContext.card_type === "Gold Metal") ? false : true
//                               style={{ lineHeight: "18px !important" }}
//                               onClick={isLoading ?null:approveTransaction ? afterApproveFunction : stakeFunction}
//                             >
//                               {isLoading ? "Loading ..." :approveTransaction ? "STAKE BUSD" : "Approve"}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <span className="d-flex justify-content-center span-txt txt--white mb--20">
//           Ensure that correct BUSD amount is sent from your connected wallet address for card purchase, otherwise card purchase will be rejected and no refunds will be entertained.
//         </span> */}
//       </div>
//     </form>
//   );
// }

// export default Stake;
