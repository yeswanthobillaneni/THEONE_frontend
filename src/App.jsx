import "./App.css";
import { Routes, Route, Navigate ,BrowserRouter as Router} from "react-router-dom";
import Auth from "./Screens/Auth/Auth";
import Home from "./Screens/Home/Home";
import CardForm from "./Screens/CardForm/CardForm";
import { UserRoleContextConsumer } from "./Utils/UserAuthorization";
import React from "react";
import HeaderNavigator from "./Components/Header/HeaderNavigator";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword";
import ForgotPasswordLink from "./Screens/ForgotPasswordLink/ForgotPasswordLink";
import { ToastContainer } from "react-toastify";
// import Stake from "./Screens/Stake/Stake";
import CardActivate from "./Screens/CardForm/CardActivate";
import CardIsActivate from "./Screens/CardForm/CardIsActivate";
import Landing from "./Screens/Landing/Landing";
import CardSubmit from "./Screens/CardForm/CardSubmit";
import CardLoad from "./Screens/CardForm/Cardload";
import Dopple from "./Screens/Dopple/Dopple";
import CardPurchase from "./Screens/CardPurchase/CardPurchase";
import CardLoadHome from "./Screens/Home/cardLoadHome";
// import TestToken from "./Screens/Home/testToken";
import CardActivate2 from "./Screens/CardForm/CardActive2";
import { MetaMaskProvider, useMetaMask } from "metamask-react";
import AppLogout from "./Screens/Logout";

function App() {
  const notLoggedIn = (
    <Routes>
      {/* <ToastContainer /> */}
      <Route path="/login"   element={<Home/>} exact/>
      <Route path="/affiliate"  element={<Home/>} exact/>
      <Route path="/register" element={<Home/>} exact/>
      <Route path="/login/:id" element={<Dopple/>} exact />
      {/* <Route path="/forgotpassword" component={ForgotPasswordLink} exact /> */}
      {/* <Route path="/password-reset/:id/:id" component={ForgotPassword} exact /> */}
      {/* <Route path="/register" component={Auth} exact /> */}
      {/* <Route path="/login" component={Auth} exact /> */}
  
      <Route path="/:id" element={<Dopple/>} exact/>
      <Route index element={<Landing/>} exact/>
      <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
  );
  const loggedIn = (
   
    <div className="h-100 home-container">
      {/* <ToastContainer /> */}
      {/* <Header /> */}
      <AppLogout>

      <HeaderNavigator />
      <Routes>
        <Route path="/card-form" element={<CardForm />} exact />
        <Route path="/dashboard" element={<Home/>} exact />
        <Route path="/card-load-home" element={<CardLoadHome/>} exact />
        <Route path="/" element={<Home/>} exact />
        {/* <Route path="/stake" element={<Stake/>} exact /> */}
        <Route path="/card-process" element={<CardActivate2/>} exact />
        <Route path="/card-activate" element={<CardActivate/>} exact />
        <Route path="/cardisactivate" element={<CardIsActivate/>} exact />
        <Route path="/card-submit" element={<CardSubmit/>} exact />
        <Route path="/card-load" element={<CardLoad/>} exact />
        <Route path="/cardpurchase" element={<CardPurchase/>} exact />
        <Route path="*" element={<Navigate to="/" replace />}/>

      </Routes>
      </AppLogout>
    </div>

  );




  return (
    <> 
    <MetaMaskProvider>
      <UserRoleContextConsumer>

        {(value) =>
          value?.isLoggedIn || (localStorage.getItem("token") && localStorage.getItem("phantomId"))
            ? loggedIn
            : notLoggedIn
        }
      </UserRoleContextConsumer>
      <ToastContainer limit={1} autoClose={2000} />
    </MetaMaskProvider>

    </>
  );
}

export default App;
