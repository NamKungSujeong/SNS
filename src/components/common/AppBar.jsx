import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthProvider";
import { PostContext } from "contexts/PostProvider";
import userInitPhoto from "../../asset/user.png";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function BottomAppBar() {
  const navigate = useNavigate();

  const authConsumer = useContext(AuthContext);
  const { userObj } = authConsumer;
  const postConsumer = useContext(PostContext);
  const { setCreator } = postConsumer;

  const moveProfile = () => {
    setCreator({
      id: userObj.uid,
      url: userObj.profilePhoto,
      displayName: userObj.displayName,
    });
    navigate("/profile");
  };

  const imgSrc = userObj.photoURL || userInitPhoto;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{
          top: "auto",
          bottom: 0,
          width: "100%",
          backgroundColor: "var(--mainColor)",
          borderRadius: "0 0 10px 10px",
          boxShadow: 0,
        }}
      >
        <Toolbar sx={{ minHeight: "65px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={moveProfile}
          >
            <Avatar alt="profile" src={imgSrc} />
          </IconButton>
          <StyledFab
            color="#ebd5d5"
            aria-label="add"
            component={Link}
            to="/write"
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="xl"
              color="var(--mainColor)"
            />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
