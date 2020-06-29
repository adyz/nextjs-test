import React, { createContext, useState } from "react";
import Cookie from "js-cookie";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [user, setUser] = useState(
    props.initialAuth ? JSON.parse(props.initialAuth) : {}
  );
  const storeUser = (user) => {
    console.log("Context storeUser");
    setUser(user);
    Cookie.set("auth", JSON.stringify(user));
  };
  const logout = () => {
    setUser({});
    Cookie.set("auth", JSON.stringify({}));
  };
  return (
    <GlobalContext.Provider value={{ user, storeUser, logout }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
