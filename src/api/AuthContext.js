import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  reauthenticateWithPhoneNumber,
} from "firebase/auth";
import { auth } from "./firebase";

export let AuthContext = createContext();
let AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  useEffect(() => {
    return onAuthStateChanged(auth, userInfo => {
      if (
        (userInfo && userInfo.emailVerified === true) ||
        reauthenticateWithPhoneNumber
      ) {
        let TOKEN = userInfo.accessToken;
        window.sessionStorage.setItem("TOKEN", TOKEN);
        setUser(userInfo);
      } else {
        window.sessionStorage.removeItem("TOKEN");
        setUser(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
