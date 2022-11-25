import { useEffect } from "react";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  let timer;

const handleLogoutTimer = () => {
  timer = setTimeout(() => {
 
    resetTimer();
    
    Object.values(events).forEach((item) => {
      window.removeEventListener(item, resetTimer);
    });

    logoutAction();
  }, 1800000); 
};


const resetTimer = () => {
  if (timer) clearTimeout(timer);
};


useEffect(() => {
  Object.values(events).forEach((item) => {
    window.addEventListener(item, () => {
      resetTimer();
      handleLogoutTimer();
    });
  });
}, []);


const logoutAction = () => {
  localStorage.clear()
  window.location.pathname = "/";
};

  return children;
};

export default AppLogout;