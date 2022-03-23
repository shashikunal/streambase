import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export let AuthContext = createContext();
let AuthProvider = ({ children }) => {
  let [user, setUser] = useState("");
  useEffect(() => {
    return onAuthStateChanged(auth, userInfo => {
      if (userInfo && userInfo.emailVerified === true) {
        setUser(userInfo);
      } else {
        setUser(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
