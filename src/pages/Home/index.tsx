import React, { FC } from "react";
import { Link } from "react-router-dom"
import "./style.css";

export const HomePage: FC = () => {

  return (
    <div className="App">
      <Link to="/user">User List</Link>
      <Link to="/article">Article List</Link>
    </div>
  );
};
