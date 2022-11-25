import React, { useState, createContext } from "react";

const UserRoleContext = createContext(null);
const UserRoleContextConsumer = UserRoleContext.Consumer;

const UserRoleContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState({
    isLoggedIn: false,
    card_applied: false,
    card_activated: false,
    jdbCardNumber1: "",
    card_submit: false,
    card_type: "",
    cardisactive: false,
    card_status: false,
    card_purchase: false,
    staking:false,
    approveStacking:false,
    affiliate:false
  });

  // Update the details context
  const updateContext = (data) => {
    setUserDetails(prevState => ({
      ...prevState,
      ...data
    }));
  };
  const updateCardApplied = (data) => {
    setUserDetails({
      ...userDetails,
      ...data
    });
  };

  return (
    <UserRoleContext.Provider
      value={{
        ...userDetails,
        updateContext: updateContext,
        updateCardApplied: updateCardApplied,
      }}
    >
      {props.children}
    </UserRoleContext.Provider>
  );
};

export { UserRoleContext, UserRoleContextProvider, UserRoleContextConsumer };
