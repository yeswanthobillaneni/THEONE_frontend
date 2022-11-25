import React from 'react'
import card from '../../Sass/img/cardsdata.png'
import launchpad from '../../Sass/img/launchpad.png'
import crossfarming from '../../Sass/img/crossfarming.png'
import pRVWebsite from '../../Sass/img/PRV-Website.png'
import image1 from '../../Sass/img/1.png'
import image2 from '../../Sass/img/2.png'
import image3 from '../../Sass/img/3.png'
import image4 from '../../Sass/img/4.png'
import pic2 from '../../Sass/img/pic2.png'
import pic3 from '../../Sass/img/pic3.png'
import landingPic from '../../Sass/img/Hero.png'
import './PartnerShip.scss';
export default function PartnerShip() {
  return (
    <div style={{ marginLeft: '15vw', marginRight: "15vw" }}>
      <section class="position-relative">
        <img src={landingPic} className="w-100" style={{ marginTop: '60px', marginBottom: "70px" }} />
        
      </section>
      <section>
        <span style={{ color: "#F3BB2F", fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }} class="d-flex justify-content-center">Choose Your Winning Strategy</span>
        <div class="d-flex flex-wrap custom-data-class" style={{ marginTop: '40px' }}>
          <div className='position-relative' style={{ marginTop: '40px' }}>
            <span className='d-flex flex-column align-items-center' style={{ color: "white", fontWeight: 'bold', fontSize: '20px', marginBottom: '20px', marginTop: '20px' }}>Crypto Debit Cards</span>
            <img src={card} />
            <a href='https://docs.google.com/forms/d/e/1FAIpQLSfp5ir7tHOAajb4qsTVdyr6-su_UhLbtI8E0UGa8Kdppw81Ng/viewform' target="_blank" style={{color:'white',background:'#FF9F38',paddingTop:'10px',paddingBottom:'10px',paddingLeft:'15px',paddingRight:'15px',fontWeight:'bold',borderRadius:'8px',bottom:'-21px',left:"25%",position:'absolute'}}>Learn More</a>
          </div>
          <div className='position-relative' style={{ marginTop: '40px' }}>
            <span className='d-flex flex-column align-items-center' style={{ color: "white", fontWeight: 'bold', fontSize: '20px', marginBottom: '20px', marginTop: '20px' }}>Launchpad</span>
            <img src={launchpad} />
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSf3V3RJSkzWOQlry_p0N-5Bf4j7zaPZWCw-aTf3IHjHEMtymg/viewform" target="_blank" style={{color:'white',background:'#FF9F38',paddingTop:'10px',paddingBottom:'10px',paddingLeft:'15px',paddingRight:'15px',fontWeight:'bold',borderRadius:'8px',bottom:'-21px',left:"25%",position:'absolute'}}>Learn More</a>

          </div>
          <div className='position-relative' style={{ marginTop: '40px' }}>
            <span className='d-flex flex-column align-items-center' style={{ color: "white", fontWeight: 'bold', fontSize: '20px', marginBottom: '20px', marginTop: '20px' }}>Cross-Farming</span>
            <img src={crossfarming} />
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdS1xXL-7ant7lAiMHA-e_uajQtoMGXtPUQNPAE49O0PlZ7DQ/viewform" target="_blank" style={{color:'white',background:'#FF9F38',paddingTop:'10px',paddingBottom:'10px',paddingLeft:'15px',paddingRight:'15px',fontWeight:'bold',borderRadius:'8px',bottom:'-21px',left:"25%",position:'absolute'}}>Learn More</a>

          </div>

        </div>

      </section>

      <section>
        <div className='d-flex align-items-center justify-content-between flex-wrap'>
          <img src={pRVWebsite} class="mobile-responsive-image"/>
          <div className='d-flex flex-column' style={{ width: "400px" }}>
            <span style={{ color: "#F3BB2F", fontSize: '26px', fontWeight: 'bold', marginBottom: '20px' }}>Crypto Debit Cards</span>
            <span style={{ color: "white", fontSize: '15px', marginBottom: '10px' }}>
              Opportunity to purchase the cards in bulk
            </span>
            <span style={{ color: "white", fontSize: '15px', marginBottom: '10px' }}>
              Each card requires your token and our PYDEX to be staked for a period of 6 months, a win-win!
            </span>
            <span style={{ color: "white", fontSize: '15px', }}>
              Unlock the ease of cryptocurrency use to your community
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className='d-flex align-items-center justify-content-between flex-wrap'>
          <div className='d-flex flex-column' style={{ width: "400px" }}>
            <span style={{ color: "#F3BB2F", fontSize: '26px', fontWeight: 'bold', marginBottom: '20px' }}>Launchpad</span>
            <span style={{ color: "white", fontSize: '15px', marginBottom: '10px' }}>
              We do the heavy lifting when you launch with us
            </span>
            <span style={{ color: "white", fontSize: '15px', marginBottom: '10px' }}>
              Provide your investors with an opportunity to participate in a secure & compliant environment
            </span>
            <span style={{ color: "white", fontSize: '15px', }}>
              Tap into our superior marketing to promote your token launch
            </span>
          </div>
          <img src={pic2} class="mobile-responsive-image"/>

        </div>
      </section>
      <section>
        <div className='d-flex align-items-center justify-content-between flex-wrap'>
          <img src={pic3} class="mobile-responsive-image"/>
          <div className='d-flex flex-column' style={{ width: "400px" }}>
            <span style={{ color: "#F3BB2F", fontSize: '26px', fontWeight: 'bold', marginBottom: '20px' }}>Cross-Farming</span>
            <span style={{ color: "white", fontSize: '15px', marginBottom: '10px' }}>
              Host our selected high-APR farms or pools on each other’s platforms
            </span>
            <span style={{ color: "white", fontSize: '15px', marginBottom: '10px' }}>
              Give our respective users more opportunities to earn
            </span>
            <span style={{ color: "white", fontSize: '15px', }}>
              Watch our projects mutually grow together
            </span>
          </div>


        </div>
      </section>
      <div class="d-flex justify-content-center align-items-center">
        <button style={{
          width: '333px',
          height: '71px',
marginTop:'30px',
          background: '#FF9F38',
          boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          border: "none"
        }}>
          SIGN UP TODAY
        </button>
      </div>
      <section>
        <span style={{ color: "white", fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginTop: '70px', marginBottom: '50px' }} class="d-flex justify-content-center" >Why PrivacySwap?</span>

        <div class="d-flex  flex-wrap mobile-res-container">
          <div className='d-flex flex-column align-items-center'>
            <img src={image1} />
            <span style={{ color: "white", fontWeight: 'bold', fontSize: '20px' }}> Strong Utilities</span>
          </div>
          <div className='d-flex flex-column align-items-center'>
            <img src={image2} />
            <span style={{ color: "white", fontWeight: 'bold', fontSize: '20px' }}> Long-term Roadmap</span>
          </div>
          <div className='d-flex flex-column align-items-center'>
            <img src={image3} />
            <span style={{ color: "white", fontWeight: 'bold', fontSize: '20px' }}>Global Community</span>
          </div>
          <div className='d-flex flex-column align-items-center'>
            <img src={image4} />
            <span style={{ color: "white", fontWeight: 'bold', fontSize: '20px' }}>Superior
              Marketing Efforts</span>
          </div>
        </div>

      </section>
    </div>
  )
}
