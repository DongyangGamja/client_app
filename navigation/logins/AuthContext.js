// 서버통신 기능 페이지
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [calInfo, setCalInfo] = useState([]);
  const [userLogin, setUserLogin] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = async (name, id, pw) => {
    setIsLoading(false);
    axios
      .post("http://3.39.32.181:8001/api/auth/register", {
        name,
        id,
        pw,
      })
      .then(async (res) => {
        let userInfo = await res.data;
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  const login = async (id, pw) => {
    setIsLoading(true);
    try {
      axios
        .post("http://3.39.32.181:8001/api/auth/login", {
          id,
          pw,
        })
        .then(async (res) => {
          const userInfo = await res.data;
          if (userInfo.result === true) {
            AsyncStorage.setItem("@user_Name", res.data.info[0]);
            AsyncStorage.setItem("@user_Id", res.data.info[1]);
            setUserInfo(userInfo.token);
            console.log(userInfo);
            setUserLogin(res.data.info[1]);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setIsLoading(false);
        });
    } catch (e) {
      console.error(e);
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

  /* 로그인 돼있는지 확인, 돼있으면 스플래시에서 바로 메인페이지로 넘어감
  const isLoggedIn = async () => {
    try {
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
  */

  const kcalInfo = async () => {
    setIsLoading(true);
    const userIdInfo = await AsyncStorage.getItem("@user_Id");
    axios
      .get("http://3.39.32.181:8001/api/gamja/all/" + userIdInfo)
      .then(async (res) => {
        const calInfo = await res.data;
        await AsyncStorage.setItem(
          "@gamja_info",
          JSON.stringify(calInfo.data[0])
        );
        await AsyncStorage.setItem(
          "@gamja_info1",
          JSON.stringify(calInfo.data[1])
        );
        await AsyncStorage.setItem(
          "@gamja_info2",
          JSON.stringify(calInfo.data[2])
        );
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  const gamjaRanking = () => {};

  return (
    <AuthContext.Provider
      value={{
        kcalInfo,
        register,
        login,
        splashLoading,
        isLoading,
        calInfo,
        userInfo,
        userLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
