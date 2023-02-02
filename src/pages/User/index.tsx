import React, { FC, useEffect, useState } from "react";
import { useFetch } from "../../utils/hooks/useFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

import api from "../../utils/api";
import { AppDispatch, AppState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../store/userSlice";
import { useHistory } from "react-router-dom";

export const UserPage: FC = () => {
  const [userList, setUserList] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const { loadingApp } = useSelector((state: AppState) => state.user);
  const history = useHistory();

  const { response } = useFetch("user", loadingApp);
  useEffect(() => {
    if (response?.length) setUserList(response);
  }, [response]);

  const handleRemoveUser = (rowId: number) => {
    api
      .delete("user", {
        id: rowId,
      })
      .then(() => {
        dispatch(userSlice.actions.reloadApp(true));
      });
  };

  const handleSignout = () => {
    history.push("/login");
    dispatch(userSlice.actions.loginFail());
    dispatch(userSlice.actions.reloadApp(true));
  };
  return (
    <div className="App">
      <div className="app-title">
        <h2>User List</h2>
        <IconButton aria-label="signout" onClick={handleSignout}>
          <ExitToAppIcon />
        </IconButton>
      </div>
      {userList?.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Password</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">
                    {row.password.toString().replace(/./g, "*")}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleRemoveUser(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Do not have any user in list</p>
      )}
    </div>
  );
};
