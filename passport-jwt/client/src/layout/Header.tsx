import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  return (
    <nav>
      <Button>
        <Link to="/">Home </Link>
      </Button>{" "}
      <Button>
        <Link to="/register">Register </Link>
      </Button>{" "}
      <Button>
        <Link to="/login">Login </Link>
      </Button>{" "}
      <Button>
        <Link to="/profile">Profile </Link>
      </Button>{" "}
    </nav>
  );
};

export default Header;
