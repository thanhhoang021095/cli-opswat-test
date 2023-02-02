import React from "react";
import { useSelector } from "react-redux";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AppState } from "./store";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import { useLoading } from "./utils/hooks/useLoading";
import { UserPage } from "./pages/User";
import { ArticlePage } from "./pages/Article";

const App = () => {
  const { isLogged, loadingApp } = useSelector((state: AppState) => state.user);

  useLoading();

  return (
    <>
      {loadingApp ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadingApp}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              {!isLogged ? <Redirect push to="/login" /> : <HomePage />}
            </Route>
            <Route path="/article" exact>
              {!isLogged ? <Redirect push to="/login" /> : <ArticlePage />}
            </Route>
            <Route path="/user" exact>
              {!isLogged ? <Redirect push to="/login" /> : <UserPage />}
            </Route>
            <Route path="/login" exact component={Login} />
            <Route path="/Register" exact component={Register} />
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
};
export default App;
