import * as React from "react";
import MainContainer from "./navigation/components/MainContainer";
import SettingContainer from "./navigation/components/SettingContainer";
import { AuthProvider } from "./navigation/logins/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SettingContainer />
    </AuthProvider>
  );
}

export default App;
