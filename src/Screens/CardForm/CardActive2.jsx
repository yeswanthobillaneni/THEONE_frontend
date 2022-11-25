import React from "react";
import { useEffect ,useContext} from "react";
import { UserRoleContext } from '../../Utils/UserAuthorization'
import CardImage from "../../Sass/img/Credit Card_Monochromatic.svg";
import { useNavigate } from "react-router";





export default function CardActivate2() {
  const roleContext = useContext(UserRoleContext)
  const navigate=useNavigate();

  const redirect=()=>{
      console.log('rolecontext',roleContext)
       if ( !roleContext.card_applied  &&(roleContext.card_status === true || roleContext.card_status === 'paid')) {
        navigate('/card-form')
      }
  }

  useEffect(()=>{
   setInterval(()=>{
     redirect()
   },3000)
  },[roleContext])
  
  return (

      <div className="container py-4">
        <div className="row justify-content-center pt-6">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <span className="navbar-brand">
              <img src={CardImage} alt="" className="img-fluid" />
            </span>
            <p className="text-center activetext pt-4">
              Your card payment is being processed in the blockchain. Refresh this page periodically to check your status.
            </p>
          </div>
        </div>
        {/* <p className="notetext text-center pt-4">
          Note: Please wait patiently and we will notify you on the next steps
        </p> */}
      </div>
 
  );
}
