// 서버통신 기능 페이지
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import {} from "react/cjs/react.production.min";

import baseURL from "./config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = async (name, id, pw) => {
    try {
      setIsLoading(true);
      let res = await fetch(`${baseURL}/api/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          id: id,
          pw: pw,
        }),
      });
      res = await res.json();
      console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (id, pw) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseURL}/api/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "text/xml",
        },
        body: JSON.stringify({
          id: id,
          pw: pw,
        }),
      });
      const result = await res.json();
      console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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
