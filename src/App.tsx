import React from "react";

import GlobalStyle from "./styles/global";
import Signin from "./pages/SignIn";
import SignUp from "./pages/signUp";

const App: React.FC = () => (
  <>
    <Signin />
    {/* <SignUp /> */}
    <GlobalStyle />
  </>
);

export default App;
