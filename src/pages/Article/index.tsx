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
  Button,
  Modal,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

import api from "../../utils/api";
import { AppDispatch, AppState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../store/userSlice";
import styles from "./Article.module.scss";
import { AddNewModal } from "./AddNewModal";
import { useHistory } from "react-router-dom";

export const ArticlePage: FC = () => {
  const history = useHistory();
  const [articleList, setArticleList] = useState([]);
  const [editRow, setEditRow] = useState({
    id: 0,
    updatedTitle: "",
    updatedContent: "",
  });
  const [isEditMode, setIsEditMode] = useState(true);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const dispatch: AppDispatch = useDispatch();

  const { loadingApp } = useSelector((state: AppState) => state.user);

  const { response } = useFetch("article", loadingApp);

  useEffect(() => {
    if (response?.length) setArticleList(response);
  }, [response]);

  const handleRemoveUser = (rowId: number) => {
    api
      .delete("article", {
        id: rowId,
      })
      .then(() => {
        dispatch(userSlice.actions.reloadApp(true));
      });
  };

  const handleUpdate = (rowId: number) => {
    api
      .put("article", {
        id: rowId,
        title: editRow.updatedTitle,
        content: editRow.updatedContent,
      })
      .then(() => {
        dispatch(userSlice.actions.reloadApp(true));
      });
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditRow((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignout = () => {
    history.push('/login')
    dispatch(userSlice.actions.loginFail());
    dispatch(userSlice.actions.reloadApp(true));
  }

  return (
    <div className="App">
      <div className="app-title">
        <h2>Article List</h2>
        <IconButton aria-label="signout" onClick={handleSignout}>
          <ExitToAppIcon />
        </IconButton>
      </div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
      >
        Add new article
      </Button>
      {articleList?.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Content</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articleList.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    <input
                      disabled={editRow.id !== row.id}
                      defaultValue={row.title}
                      className={styles.inputTable}
                      name="updatedTitle"
                      onChange={handleChangeInput}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <input
                      disabled={editRow.id !== row.id}
                      defaultValue={row.content}
                      className={styles.inputTable}
                      onChange={handleChangeInput}
                      name="updatedContent"
                    />
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        if (isEditMode) {
                          setEditRow((prevState) => ({
                            ...prevState,
                            id: row.id,
                            updatedContent: row.content,
                            updatedTitle: row.title,
                          }));
                          setIsEditMode(false);
                        } else {
                          handleUpdate(row.id);
                        }
                      }}
                    >
                      {!isEditMode && editRow.id === row.id ? (
                        <DoneIcon color="success" />
                      ) : (
                        <EditIcon />
                      )}
                    </IconButton>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNewModal onCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};
