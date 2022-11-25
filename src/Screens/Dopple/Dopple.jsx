import { React, useEffect } from "react";
import HeaderNavigator from "../../Components/Header/HeaderNavigator";
import "./Dopple.scss";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { NavLink, useParams } from "react-router-dom";
import Home from "../Home/Home";
function Dopple() {
  const navigate = useNavigate();
  useEffect(() => {
    partnerCheck();
  }, []);
  const { id } = useParams();
  const partner_name = id ? id : "";
  //partner check
  const partnerCheck = async () => {

    var config = {
      method: 'get',
      url: 'https://backend.privacyswap.finance/users/partner/' + partner_name,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {

        }
        else {
          navigate("/login");
        }
      })
      .catch(function (error) {
        navigate("/login");
      });
  }
  return (
    <>
      <Home />
    </>
  );
}
export default Dopple;