import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import styles from "./Register.module.scss";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { userSlice } from "../../store/userSlice";
import { useHistory, Link } from "react-router-dom";
import api from "../../utils/api";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const { isLogged } = useSelector((state: AppState) => state.user);

  const [registerVal, setRegisterVal] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
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
    setRegisterVal((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password, confirmPassword, email } = registerVal;
    if (password && username && confirmPassword === password && email) {
      api.post("user", {
        username,
        password,
        email,
      });
      const navigateTimer = setTimeout(() => {
        if (!history) return;
        dispatch(userSlice.actions.loginSuccess());
        history.push("/login");
        clearTimeout(navigateTimer);
      }, 2000);
    } else {
      dispatch(userSlice.actions.loginFail());
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="username"
          name="username"
          value={registerVal.username}
          margin="dense"
          helperText={"Username is required"}
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={registerVal.password}
          margin="dense"
          helperText={"Password is required"}
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={registerVal.confirmPassword}
          margin="dense"
          helperText={"Confirm password is required"}
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={registerVal.email}
          margin="dense"
          helperText={"Email is required"}
          variant="standard"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          classes={{ root: styles.loginForm__button }}
        >
          Signup
        </Button>
        <div>
          I already have an account{" "}
          <Link
            to="/login"
            className={styles.signupBtn}
          >
            Sign in
          </Link>
        </div>
      </form>

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
          Register {isLogged ? "Success" : "Fail"}!
        </Alert>
      </Snackbar>
    </div>
  );
};
