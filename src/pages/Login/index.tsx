import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import styles from "./Login.module.scss";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { userSlice } from "../../store/userSlice";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { defaultOptionsConfig } from "../../constants/config";
import { baseUrl } from "../../constants/baseUrl";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const { isLogged } = useSelector((state: AppState) => state.user);

  const [loginVal, setLoginVal] = useState({
    username: "",
    password: "",
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVal((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = loginVal;
    if (password && username) {
      axios({
        ...defaultOptionsConfig,
        url: baseUrl + "auth",
        method: "POST",
        data: JSON.stringify({
          username,
          password,
        }),
      })
        .then(() => {
          dispatch(userSlice.actions.loginSuccess());
          const navigateTimer = setTimeout(() => {
            if (!history) return;
            dispatch(userSlice.actions.reloadApp(true));
            history.push("/");
            clearTimeout(navigateTimer);
          }, 2000);
        })
        .catch(() => {
          dispatch(userSlice.actions.loginFail());
        })
        .finally(() => {
          setOpenSnackbar(true);
        });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="username"
          name="username"
          value={loginVal.username}
          margin="dense"
          helperText={"Username is required"}
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={loginVal.password}
          margin="dense"
          variant="standard"
          helperText={"Password is required"}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          classes={{ root: styles.loginForm__button }}
        >
          Login
        </Button>
      </form>

      <div>
        Not a member?{" "}
        <Link to="/register" className={styles.signupBtn}>
          Sign up
        </Link>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={isLogged ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          Login {isLogged ? "Success" : "Fail"}!
        </Alert>
      </Snackbar>
    </div>
  );
};
