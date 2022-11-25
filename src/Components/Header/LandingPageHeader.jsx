import React, { Fragment, useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./Header.scss";
import Banding from "../../Sass/img/Branding.png";
import { useNavigate, useLocation } from "react-router";

import { deleteAll, deleteCookie, getCookie, setCookie } from "../../Utils/cookieHandling";
import axios from "axios";
import { URL } from "../../Utils/url";
import { UserRoleContext } from "../../Utils/UserAuthorization";
import { toast } from "react-toastify";


import * as Icon from 'react-bootstrap-icons';

import Solswipe from '../../Sass/img/logos/Logo.png'


export default function LandingPageHeader(props) {
    const roleContext = useContext(UserRoleContext);

    //let { ethereum } = window;
    const location = useLocation();
    const navigate = useNavigate();
    const [disableForm, setDisableForm] = useState(true);
    const [showMenu, setShowMenu] = useState(true);
    const [state, setState] = useState({
        modal: false,
        address: "",
        balance: "",
        isPhantomInstall: false,
        isConnected: false,
    });
    



    return (
        <nav class="navbar navbar-expand-lg navbar-dark1 pb-0 header-new">
            <div class="container-fluid">
                <div class="navbar-brand d-flex justify-content-between w-100 align-items-center flex-wrap" onClick={() => navigate("/")}>
                    <img src={Solswipe} alt="" class="img-fluid" />

                </div>


            </div>
        </nav>
    );
}
