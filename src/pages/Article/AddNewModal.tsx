import React, { FC, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { userSlice } from "../../store/userSlice";
import api from "../../utils/api";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface AddNewModalProps {
  onCloseModal: () => void;
}

export const AddNewModal: FC<AddNewModalProps> = ({ onCloseModal }) => {
  const dispatch: AppDispatch = useDispatch();

  const [newValue, setNewValue] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, content } = newValue;
    if (title && content) {
      api
        .post("article", {
          title,
          content,
        })
        .then(() => {
          dispatch(userSlice.actions.reloadApp(true));
          onCloseModal();
        });
    }
  };

  return (
    <Box sx={modalStyle}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        align="center"
      >
        Add New Article
      </Typography>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <TextField
          error={!newValue.title}
          label="Title"
          type="title"
          name="title"
          value={newValue.title}
          margin="dense"
          helperText={"Title is required"}
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          error={!newValue.content}
          label="Content"
          type="content"
          name="content"
          value={newValue.content}
          margin="dense"
          variant="standard"
          helperText={"Content is required"}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
      </form>
    </Box>
  );
};
