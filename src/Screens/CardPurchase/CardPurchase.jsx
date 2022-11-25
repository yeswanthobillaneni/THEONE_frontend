import React, { Fragment, useState, useEffect, useContext } from 'react'
import LogoIcon from '../../Sass/img/Logoicon.svg'
import { getCookie } from '../../Utils/cookieHandling'
import axios from 'axios'
import ABI from '../../abi.json'
import { toast } from 'react-toastify'
import { URL } from '../../Utils/url'
import copy from '../../Sass/img/copy_address.png'
import premium from '../../Sass/img/blackcard.png'
import silver from '../../Sass/img/silvercard.png'
import golden from '../../Sass/img/goldcard.png'
import { useNavigate, useLocation } from 'react-router'
import './CardPurchase.scss'

import { UserRoleContext } from '../../Utils/UserAuthorization'
import Card from '../../Sass/img/Card.png'
import {
  PublicKey,
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
} from '@solana/web3.js'
import * as spltoken from '@solana/spl-token'

function CardPurchase(props) {
  const roleContext = useContext(UserRoleContext)
  const navigate = useNavigate()
  let { solana } = window
  const [radioClick, setRadioCheck] = useState('0')
  const [cardType, setCardType] = useState('')
  const [whiteListCheck, setWhiteListCheck] = useState(true)
  const [state, setState] = useState({
    modal: false,
    address: '',
    balance: '',
    isPhantomInstall: false,
    isConnected: false,
  })
  const [buttonName, setButtonName] = useState(null)
  let rpc="https://solana-mainnet.g.alchemy.com/v2/gpAYaj6fl70Q-o6wSS9vXfB0sujfSoOl";
  const connection =new Connection(rpc, 'confirmed');

  useEffect(() => {
    // if (getCookie("phantomId")) {
    //   setWhiteListCheck(true);
    // }
  }, [getCookie('phantomId')])

  window.onload = () => {
    if ('solana' in window) {
      solana = window.solana
    }
  }

  useEffect(() => {
    if (solana) {
      initialize()
      checktoWhitelist()
    }
    // updateAllCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solana])

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
    } else {
      setState((state) => ({
        ...state,
        balance: '',
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.address, state.network])

  const initialize = () => {
    if (solana && solana.isPhantom) {
      setState((state) => ({
        ...state,
        isPhantomInstall: true,
      }))

      solana
        .connect({ onlyIfTrusted: true })
        .then((result) => {
          if (result) {
            const publicKey = solana.publicKey.toString()
            setState((state) => ({
              ...state,
              address: publicKey,
              isConnected: true,
            }))
          } else {
            setState((state) => ({
              ...state,
              isConnected: false,
            }))
          }
        })
        .catch((error) => {})

      if (solana) {
        solana.on('accountChanged', () => {
          solana.connect({ onlyIfTrusted: true }).then(() => {
            window.location.reload()
          })
        })
      }
    } else {
      console.warn('Phantom not installed!')

      setState((state) => ({
        ...state,
        isPhantomInstall: false,
      }))
    }
  }

  const checktoWhitelist = () => {
    axios
      .get(`${URL}/admin/cardapplyAndWhitelist/${getCookie('phantomId')}`)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.address != null) {
            setWhiteListCheck(true)
          }
          if(response.data.cardStatus === 'paid'){
          navigate('/card-form')
          }
        } else {
          //  toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        toast.success(error)
      })
  }

  const copyAddressToClipboard = async () => {
    // navigator.clipboard.writeText("0x13e5eC037A9EB4ffff66097372f874eC28fB7d68");
    // toast.success("BEP20 Payment Address copied to clipboard");
  }
  const CheckPayment = async (value, name) => {
    try {
      let fromPublicKey=new PublicKey(solana.publicKey.toBase58());
      let ToAccount = new PublicKey("AX6MQeVjUCfHDRzCYEHXyYC9fbFV8UA294M8wSWEZkBY");
      let UsdcAddress = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");


     let USDC_Token=new spltoken.Token(
        connection,
        UsdcAddress,
        spltoken.TOKEN_PROGRAM_ID,
        fromPublicKey
      )

      const fromTokenAcc = await USDC_Token.getOrCreateAssociatedAccountInfo(
        fromPublicKey
      )

      const toTokenAcc = await USDC_Token.getOrCreateAssociatedAccountInfo(
        ToAccount
      )

      var transaction =await  new Transaction().add(
        spltoken.Token.createTransferInstruction(
          spltoken.TOKEN_PROGRAM_ID,
          fromTokenAcc.address,
          toTokenAcc.address,
          fromPublicKey,
          [],
          value * 1000000
        )
      )
      let latestBlockHash = await connection.getLatestBlockhash()
      transaction.recentBlockhash = await latestBlockHash.blockhash
      transaction.feePayer = fromPublicKey

      if (transaction) {
        console.log('Txn created')
      }
      let signed = await solana.signTransaction(transaction)
      let signature = await connection.sendRawTransaction(signed.serialize())
      await connection
        .confirmTransaction({
          signature,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          blockhash: latestBlockHash.blockhash,
        })
        .then((res) => {
          axios
            .post(
              `${URL}/users/cardPayment/${getCookie('phantomId')}`,
              { cardStatus: 'paid' ,cardpurchase_txhash:`https://solscan.io/tx/${signature}`,
                card_type:name,
                card_amount:value },
              {
                headers: {
                  Authorization: getCookie('token'),
                },
              }
            )
            .then(function (response) {
              if (response.status === 200) {
                localStorage.setItem('cardStatus', 'paid')
                localStorage.setItem('cardName', name)
                toast.success(response.data.message)
                navigate('/card-form')
                setButtonName('Paid')
              } else {
                toast.error('something went wrong')
              }
            })
            .catch(function (error) {
              toast.error('User has not paid')
            })
        })
    } catch (e) {
      console.log(e)
      toast.error('transaction Failed')
    }
  }


  
  return (
    <form>
      <div className=" pb--30 new-data">
        <div className="container py-4">
          <div className="row my-4">
            <div className="col-lg-12 mb-lg-0 mb-4">
              <div className="card z-index-2">
                <div className="card-body p-md-3 p-sm-0 ">
                  <h6 className="ms-2 mb-0 text-center h-white headtext  pt-3">
                    Card Purchase Payment
                  </h6>
                  <h6
                    className="ms-2 mb-0 text-center h-white   pb-3"
                    style={{ fontSize: '14px', fontWeight: 'normal' }}
                  >
                    Select your preferred card type
                  </h6>
                  <form>
                    <div className="row p-4 pt-0 justify-content-center">
                      <div
                        className={
                          radioClick == '0'
                            ? 'col-md-6  pt-3'
                            : 'col-md-6  pt-3 '
                        }
                      >
                        <div className="row ">
                          <div className="col-md-8 col-sm-12">
                            <div className="custom-control custom-checkbox mb-3">
                              <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-md-1 col-sm-12 d-flex align-items-center justify-content-center">
                                  <div>
                                    <input
                                      type="radio"
                                      className="custom-control-input"
                                      id="customCheck1"
                                      name="example1"
                                      checked={radioClick == '0'}
                                      onChange={(e) => {
                                        setRadioCheck(
                                          e.target.checked ? '0' : radioClick
                                        )
                                      }}
                                      // checked={(roleContext.card_type === "Premium Black") ? true : false}
                                    />
                                    <label for="customCheck1"></label>
                                  </div>
                                </div>
                                <div className="col-md-11 col-sm-12 d-flex justify-content-center">
                                  <label
                                    className="custom-control-label"
                                    for="customCheck1"
                                  >
                                    <img src={premium} width="100%" />
                                  </label>

                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12 new-btn text-center d-flex flex-column align-items-center justify-content-center">
                            <p className="h-white">Premium Black</p>

                            <h3 className="pt-0 mt-0 color-head">
                              250 <span className="f-sol">$USDC</span>
                            </h3>

                            <button
                              type="button"
                              className="btn stakebtns2 p-3"
                              //  disabled={(roleContext.card_type === "Premium Black") ? false : true}
                              onClick={() => {
                                if (radioClick != '0') {
                                  toast.error('Please select Premium Black')
                                  return
                                }

                                CheckPayment(250, 'Premium Black')
                              }}
                            >
                              {buttonName &&
                              roleContext.card_type === 'Premium Black'
                                ? 'Paid'
                                : 'CONFIRM PAYMENT'}
                            </button>
                          </div>
                        </div>
                      </div>
    <div
                        className={
                          radioClick === '2'
                            ? 'col-md-6  pt-3'
                            : 'col-md-6  pt-3 '
                        }
                      >
                        <div className="row ">
                          <div className="col-md-8 col-sm-12 ">
                            <div className="custom-control custom-checkbox mb-3">
                              <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-md-1 col-sm-12 d-flex align-items-center justify-content-center">
                                  <div>
                                    <input
                                    //coming soon disabled
                                    // disabled="true"
                                      type="radio"
                                      className="custom-control-input"
                                      id="customCheck3"
                                      name="example3"
                                      checked={radioClick == '2'}
                                      onChange={(e) => {
                                        setRadioCheck(
                                          e.target.checked ? '2' : radioClick
                                        )
                                      }}
                                      // checked={(roleContext.card_type === "Silver Metal") ? true : false}
                                    />
                                    <label for="customCheck3"></label>
                                  </div>
                                </div>
                                <div className="col-md-11 col-sm-12 d-flex justify-content-center" style={{position:'relative'}} >
                                  <label
                                    className="custom-control-label"
                                    for="customCheck3"
                                  >
                                    <img src={silver} width="100%" />
                                  </label>
                                  
                                  {/* <h3 className=' text-center' style={{position:'absolute',top:'40%',color:'#444'}}>COMING SOON</h3> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12 new-btn text-center d-flex flex-column align-items-center justify-content-center">
                            <p className="h-white">Silver Metal</p>
                            <h3 className="pt-0 mt-0 color-head">
                              550<span className="f-sol">$USDC</span>
                            </h3>

                            <button
                            // disabled="true"
                              type="button"
                              className="btn stakebtns2 p-3"
                              // disabled={(roleContext.card_type === "Silver Metal") ? false : true}

                              onClick={() => {
                                if (radioClick !== '2') {
                                  toast.error('Please select Silver Metal')
                                  return
                                }
                                CheckPayment(550, 'Silver Metal')
                              }}
                            >
                              {buttonName &&
                              roleContext.card_type === 'Silver Metal'
                                ? 'Paid'
                                : 'CONFIRM PAYMENT'}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                    </div>

                    <div className="row p-4 pt-0 ">
                  

                      <div
                        className={
                          radioClick === '3'
                            ? 'col-md-6  pt-3'
                            : 'col-md-6  pt-3 '
                        }
                      >
                        <div className="row d-flex align-items-center md-row">
                          <div className="col-md-8 col-sm-12">
                            <div className="custom-control custom-checkbox mb-3">
                              <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-md-1 col-sm-12 d-flex align-items-center justify-content-center">
                                  <div>
                                    <input
                                        //coming soon disabled
                                        // disabled="true"
                                        type="radio"
                                      className="custom-control-input"
                                      id="customCheck4"
                                      name="example4"
                                      checked={radioClick === '3'}
                                      onChange={(e) => {
                                        setRadioCheck(
                                          e.target.checked ? '3' : radioClick
                                        )
                                      }}
                                      //  checked={(roleContext.card_type === "Gold Metal") ? true : false}
                                    />
                                    <label for="customCheck4"></label>
                                  </div>
                                </div>
                                <div className="col-md-11 col-sm-12 d-flex justify-content-center" style={{position:'relative'}} >
                                  <label
                                    className="custom-control-label"
                                    for="customCheck4"
                                  >
                                    <img src={golden} width="100%" />
                                  </label>
                                  {/* <div style={{position:'absolute',top:'45%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',paddingRight:'20px'}}>
                                  <h2 className='cardtitle text-white' >COMING SOON</h2>
                                  </div> */}

                                  {/* <h3 className=' text-center' style={{position:'absolute',top:'40%',color:'#444'}}>COMING SOON</h3> */}

                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12 new-btn text-center d-flex flex-column align-items-center justify-content-center">
                            <p className="h-white">Gold Metal</p>
                            <h3 className="pt-0 mt-0 color-head">
                              550<span className="f-sol">$USDC</span>
                            </h3>

                            <button
                            //  disabled="true"
                              type="button"
                              className="btn stakebtns2 p-3"
                              //  disabled={(roleContext.card_type === "Gold Metal") ? false : true}

                              onClick={() => {
                                if (radioClick !== '3') {
                                  toast.error('Please select Gold Metal')
                                  return
                                }

                                CheckPayment(550, 'Gold Metal')
                              }}
                            >
                              {buttonName &&
                              roleContext.card_type === 'Gold Metal'
                                ? 'Paid'
                                : 'CONFIRM PAYMENT'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="d-flex justify-content-center span-txt txt--white mb--20">
          Ensure that correct USDC amount is sent from your connected wallet
          address for card purchase, otherwise card purchase will be rejected
          and no refunds will be entertained.
        </span>
      </div>
    </form>
  )
}

export default CardPurchase
