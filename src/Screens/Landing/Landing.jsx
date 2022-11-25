import React, { Component } from "react";
import cripto from "../../Sass/img/cripto-debitcard.png";
import shield from "../../Sass/img/shield1.png";
import premium from '../../Sass/img/blackcard.png'
import silver from '../../Sass/img/silvercard.png'
import golden from '../../Sass/img/goldcard.png'
import line from "../../Sass/img/line.png";
import "./Landing.css";
import { Link } from "react-router-dom";
import HeaderNavigator from '../../Components/Header/HeaderNavigator';
import LandingPageHeader from "../../Components/Header/LandingPageHeader";
import { Modal, Button } from "react-bootstrap";
import SolSwipe from "../../Sass/img/logos/Logo.png";
import $ from 'jquery'
import { FileX } from "react-bootstrap-icons";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    }
  }

  componentDidMount() {
    $("ul").on("click", "li", function () {
      var pos = $(this).index() + 2;
      $("tr").find('td:not(:eq(0))').hide();
      $('td:nth-child(' + pos + ')').css('display', 'table-cell');
      $("tr").find('th:not(:eq(0))').hide();
      $('li').removeClass('active');
      $(this).addClass('active');
      $("tr").css("width","100%")
    });

    // Initialize the media query
    var mediaQuery = window.matchMedia('(min-width: 640px)');

    // Add a listen event
    mediaQuery.addListener(doSomething);

    // Function to do something with the media query
    function doSomething(mediaQuery) {
      if (mediaQuery.matches) {
        $('.sep').attr('colspan', 5);
      } else {
        $('.sep').attr('colspan', 2);
        $(".clk").trigger("click");
      }
    }

    // On load
    doSomething(mediaQuery);
  }
  render() {


    return (
      <div className="landing"><LandingPageHeader />
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
          <div className="container-fluid m-0 p-0">
            <div className="container py-4 ">
              <div className="row pt-6 justify-content-center align-items-center">
                <div className="col-lg-5 col-md-6 mb-lg-0 mb-4">
                  <div className="z-index-2">
                    <h3 className="mb-0  h-white headtext mb-3 color-head-landing">
                      <span className="f-sol">SolSwipe</span> Crypto Debit Card
                      (BETA PROGRAM)
                    </h3>
                    <p className="h-white color-head-landing-pt">
                      We have fast-forwarded our SolSwipe Crypto Debit Card. The
                      first limited batch of cards are slated to be released for you
                      guys by the end of Q3 2022. Details of staked amount and their
                      limits will be released at a later date.
                    </p>
                    <div>
                      <Link to="/affiliate"> 
                         <button
                        type="button"
                        className="btn  btns-v pr-3 h-white" 
        
                      >
                        Login
                      </button>
                      </Link>

                    </div>
                    {/* <button type="button" className="btn  btns-w btn-sign-landing1">
                  Learn More{" "}
                </button> */}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-lg-0 mb-4 mx-lg-3" >
                  <div className=" z-index-2 logoimgcon">
                    <img src={SolSwipe} alt="cripto-debitcard" className="img-fluid logoimg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid m-0 mt-5 p-4 sm-px-0 pt-4">
      
                <div className="container justify-content-center text-center">
                  <h3
                    className="mb-0 p-0  h-white headtext color-head-landing justify-content-center"
                    style={{ textTransform: "uppercase" }}
                  >
                    {" "}
                    Beta launch <span className="f-sol">card</span> Details
                  </h3>
                </div>

              <div className="container pt-5 mt-5">
                <div className="row justify-content-center">
                  <div className="col-lg-5 col-md-6 mb-lg-0 mb-4">
                    <div className="z-index-2">
                      <div className=" z-index-2">
                        <img
                          src={premium}
                          alt="premium-black"
                          className="img-fluid bd-right"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-4 mb-lg-0 mb-4 txt-right-landing">
                    <div className="z-index-2  d-flex align-items-end justify-content-end">
                      <div className="text-start">

                      <h3 className="mb-0  h-white headtext mb-3 color-head-landing ">
                        <span className="f-sol txt-transporm">PREMIUM BLACK</span>
                      </h3>
                   
                      {/* <p className="h-white color-head-landing-pt hd-fnt">
                    <img src={shield} alt="premium-black" className="img-fluid" />
                    <span className="pr-5 hd hd-color"> Stake: </span> $200 USD
                  </p> */}
                      <p className="h-white color-head-landing-pt hd-fnt">
                        <span className="pr-5 f-sol"> Card Cost: </span> $250 USDC 
                      </p>
                      <p className="h-white color-head-landing-pt hd-fnt">
                        <span className="pr-5 f-sol">
                          {" "}
                          Monthly Top-up Limit:{" "}
                        </span>{" "}
                        $30,000 USD
                      </p>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="row justify-content-center pt-5 mt-4">
                  <div className="col-lg-6 col-md-6 mb-lg-0 mb-4">
                    <div className="z-index-2">
                      <div className=" z-index-2">
                        <h3 className="mb-0  h-white headtext mb-3 color-head-landing">
                          <span className="f-sol txt-transporm">SILVER METAL</span>
                        </h3>
                  
                        {/* <p className="h-white color-head-landing-pt hd-fnt">
                      <img src={shield} alt="premium-black" className="img-fluid" />
                      <span className="pr-5 hd hd-color"> Stake: </span> $1,000 USD
                    </p> */}
                        <p className="h-white color-head-landing-pt hd-fnt">
                          <span className="pr-5 f-sol"> Card Cost: </span> $550 USDC
                        </p>
                        <p className="h-white color-head-landing-pt hd-fnt">
                          <span className="pr-5 f-sol">
                            {" "}
                            Monthly Top-up Limit:{" "}
                          </span>{" "}
                          $120,000 USD
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6 mb-lg-0 mb-4 txt-right-landing">
                    <div className=" z-index-2 " style={{position:'relative'}}>
                      <img
                        src={silver}
                        alt="premium-black"
                        className="img-fluid bd-left"
                      />
                      {/* <div className="cardoverlay" >
                          <h3 className="text-center" style={{color:'#fff'}}>COMING SOON</h3>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center pt-5 mt-4">
                  <div className="col-lg-5 col-md-6 mb-lg-0 mb-4">
                    <div className="z-index-2">
                      <div className="" style={{position:'relative'}}>
                        <img
                          src={golden}
                          alt="premium-black"
                          className="img-fluid bd-right"
                        />
                        {/* <div className="cardoverlay1" >
                          <h3 className="text-center" style={{color:'#fff'}}>COMING SOON</h3>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-lg-0 mb-4 txt-right-landing">
                    <div className="z-index-2 d-flex align-items-end justify-content-end">
                      <div className="text-start">

                      <h3 className="mb-0  h-white headtext mb-3 color-head-landing">
                        <span className="f-sol txt-transporm">GOLD METAL</span>
                      </h3>
               
                      {/* <p className="h-white color-head-landing-pt hd-fnt">
                    <img src={shield} alt="premium-black" className="img-fluid" />
                    <span className="pr-5 hd hd-color"> Stake: </span> $1,000 USD
                  </p> */}
                      <p className="h-white color-head-landing-pt hd-fnt">
                        <span className="pr-5 f-sol"> Card Cost: </span> $550 USDC 
                      </p>
                      <p className="h-white color-head-landing-pt hd-fnt">
                        <span className="pr-5 f-sol">
                          {" "}
                          Monthly Top-up Limit:{" "}
                        </span>{" "}
                        $150,000 USD
                      </p>
                    </div>
                    </div>

                  </div>
                </div>
               
              </div>
              {/* <div className="row  px-sm-0   mx-sm-0 mb-4 padd mob-wid">
                <div className="col-lg-12 d-flex align-items-center justify-content-center ">
                  <div className="container d-flex flex-column align-items-center justify-content-center mx-sm-0 px-sm-0 ">
            

                    <ul className="">
                      <li className="bg-purple">
                        <button className="button" >Black Premium</button>
                      </li>
                      <li className="bg-blue">
                        <button className="button"  >Metal - Black</button>
                      </li>
                      <li className="bg-green active clk">
                        <button className="button"  >Metal - Silver</button>
                      </li>
                      <li className="bg-blue">
                        <button className="button" >Metal - Gold</button>
                      </li>

                    </ul>
     

                    <table>
                      <thead>
                        <tr>
                          <th className="hide"></th>
                          <th className=" f-sol">Black Premium</th>
                          <th className=" f-sol">Metal - Black</th>
                          <th className=" default f-sol">Metal - Silver</th>
                          <th className=" f-sol">Metal - Gold</th>

                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td colspan="5" className="sep f-sol">Description</td>

                        </tr>
                        <tr>
                          <td >Monthly Max load</td>
                          <td ><span>30,000</span></td>
                          <td><span>100,000</span></td>
                          <td><span>120,000</span></td>
                          <td><span>150,000</span></td>
                        </tr>
  
                        <tr>
                          <td >Card Issuance Fee(USD)</td>
                          <td><span>250</span></td>
                          <td colspan="3"><span>550</span></td>
                        </tr>
                        <tr>
                          <td>Card Replacement Fee(USD)</td>
                          <td><span>100</span></td>
                          <td colspan="3"><span>200</span></td>
                        </tr>
                        <tr>
                          <td>Card Loading Fee(USD)</td>

                          <td colspan="4"><span>1%</span></td>
                        </tr>
                        <tr>
                          <td>ATM Withdrawal Fee</td>

                          <td colspan="4"><span>0.75%</span></td>
                        </tr>
                        <tr>
                          <td>Check balance Fee(ATM)</td>

                          <td colspan="4"><span>Possible Charge by Acquirer Bank ATM</span></td>
                        </tr>
                        <tr>
                          <td>POS and Online Fees</td>

                          <td colspan="4"><span>0.75%</span></td>
                        </tr>
                        <tr>
                          <td>FX Fee</td>

                          <td colspan="4"><span>Subjected to Interbank/Visa rates</span></td>
                        </tr>
                        <tr>
                          <td>ATM Withdrawal Limits</td>

                          <td colspan="4"><span>Subjected to ATM limits</span></td>
                        </tr>
                        
                        <tr>
                          <td>POS / Online Spending Limits</td>

                          <td colspan="4"><span>No Limits</span></td>
                        </tr>
                        <tr>
                          <td>Interest Bearing</td>
                          <td colspan="4"><span>1.5%</span></td>
                        </tr>
                        <tr>
                          <td>Supported currencies</td>

                          <td colspan="4"><span>USD</span></td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="ptext" >Disclaimer: Indicated Fees above are subjected to changes at the issuing bank's discretion. We will update the latest information as soon as practicable upon receipt of any new information.  </p>
                  </div>
                </div>
              </div> */}

                <div className="container  mt-5 text-center">

                  <h3 className="h-white  mb-4 txt-right-landing-h">
                    <span className="f-sol txt-transporm">
                      POS AND ONLINE PURCHASES
                    </span>
                  </h3>
                  <p className=" h-white  mb-4 txt-right-landing-h">
                    Bonus!{" "}
                    <span className="f-sol ">$10 Initial Deposit</span>
                  </p>
                  <h3 className="mb-0 p-0  h-white txt-right-landing-h justify-content-center">
                    <span className="f-sol">1st Year Annual Fee</span> Waived!
                  </h3>
                  <p className="txt-right-landing-p mb-4">
                    <i>Annual Fee: $60</i>
                  </p>
               
                  <h3 className="txt-right-landing-h justify-content-center f-sol mob-head"
                    style={{
                      fontSize: "45px",
                      fontWeight: "bolder",
                      color: "#f3ba2f",
                    }}
                  >
                    <strong>EXPERIENCE SOLSWIPE</strong>
                  </h3>
                  <p className="txt-right-landing-p mb-5 f-sol">
                    <i>like never before</i>
                  </p>
                  <div className="mt-5 pb-2 pb-5">
                  <Link to="/affiliate"> 
                    <button
                      type="button"
                      className="btn btn-sign-landing12 mt-4 f-sol"
       
                    >
                     Apply
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </main>

<div
   
 >
        <Modal show={this.state.showModal} onHide={() => { this.setState({ showModal: false }) }} >
          <Modal.Header>
            <Modal.Title>By using SolSwipe Card Loading Platform, I agree to the Important Disclaimer:</Modal.Title>

          </Modal.Header>
          <Modal.Body >
            <div className="alert d-flex flex-column">



              <span>- I am not a person or entity who resides in, are citizens of, are incorporated in , or have a registered office in any Prohibited Jurisdictions</span>

              <span>- I will not in the future access this site or use SolSwipe Card Loading Platform while located within any Prohibited Jurisdictions</span>

              <span>- I am lawfully permitted to access this site and use SolSwipe Card Loading Platform under the laws of the jurisdiction on which I reside and am located</span>

              <span>- I understand the risks associated with entering into and using SolSwipe Card Loading Platform</span>

            </div>
          </Modal.Body>
          <Modal.Footer style={{display:"flex",justifyContent:'center'}}>
           
            <Button
              variant="success"


              onClick={() => {
                this.setState({ showModal: false })
              }}


            >
              Agree And Proceed
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
    );
  }
}
export default Landing