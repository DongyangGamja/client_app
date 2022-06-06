// 서버통신 기능 페이지
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import RNFetchBlobFile from "react-native-fetch-blob/class/RNFetchBlobFile";

import baseURL from "./config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, id, pw) => {
    setIsLoading(true)
    axios
      .post("http://3.39.32.181:8001/api/auth/register", {
        name,
        id,
        pw,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.error(e);
        setIsLoading(false);
      });
  };

  const login = (id, pw) => {
    setIsLoading(true)
    axios
      .post("http://3.39.32.181:8001/api/auth/login", {
        id,
        pw,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        setUserInfo(userInfo);

      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };
  /* 로그아웃 기능
  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${baseURL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.access_token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        AsyncStorage.setItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error : ${e}`);
        setIsLoading(false);
      });
  };
    */

  //로그인 돼있는지 확인, 돼있으면 스플래시에서 바로 메인페이지로 넘어감
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        splashLoading,
        isLoading,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
