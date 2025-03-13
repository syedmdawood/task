import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/profile",
        { headers: { token } }
      );
      if (data.success) {
        setUserData(data.userData);
        console.log(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = { token, setToken, getUserData, userData, setUserData };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
