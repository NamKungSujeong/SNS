import React, { useEffect, useState, useContext } from "react";
import { dbService, authService } from "fbase";
import {
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import Post from "components/Post/Post";
import userInitPhoto from "../asset/user.png";
import * as S from "./Profile.styled";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import ProfileUpdate from "components/Profile/ProfileUpdate";
import { AuthContext } from "contexts/AuthProvider";
import { PostContext } from "contexts/PostProvider";
import Avatar from "@mui/material/Avatar";
import BottomAppBar from "components/common/AppBar";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const authConsumer = useContext(AuthContext);
  const { userObj } = authConsumer;
  const postConsumer = useContext(PostContext);
  const { creator, setCreator } = postConsumer;

  useEffect(() => {
    const q = query(
      collection(dbService, "posts"),
      where("creatorId", "==", creator.id),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const postArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (postArr.length === 0) setPosts(postArr);
    });

    if (creator.id === "") {
      navigate("/");
    }
  }, [
    userObj.uid,
    userObj.displayName,
    userObj.photoURL,
    creator.id,
    creator.url,
    creator.displayName,
    setCreator,
    navigate,
  ]);

  const handleLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      <S.ProfileContainer>
        <S.ProfileBlock>
          <Nav handleLogoutClick={handleLogoutClick} />
          <UserProfile
            userObj={userObj}
            handleEditClick={handleEditClick}
            creator={creator}
            isOwner={creator.id === userObj.uid}
            posts={posts}
          />
        </S.ProfileBlock>
        <S.PostContainer>
          {posts.map((post) => (
            <Post
              key={post.id}
              postObj={post}
              isOwner={post.creatorId === userObj.uid}
            />
          ))}
        </S.PostContainer>
        {isEditing && (
          <ProfileUpdate
            userObj={userObj}
            posts={posts}
            handleEditClick={handleEditClick}
          />
        )}
      </S.ProfileContainer>
      <BottomAppBar />
    </>
  );
};

export default Profile;

const Nav = ({ handleLogoutClick }) => {
  return (
    <S.Nav>
      <li>
        <Link to="/">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="xl"
            style={{ color: "white" }}
          />
        </Link>
      </li>
      <li>
        <button onClick={handleLogoutClick} style={{ color: "white" }}>
          Log Out
        </button>
      </li>
    </S.Nav>
  );
};

const UserProfile = ({ handleEditClick, userObj, creator, isOwner, posts }) => {
  const imgSrc = creator.url || userInitPhoto;
  const ownerSrc = userObj.photoURL || userInitPhoto;
  return (
    <S.UserProfile>
      {isOwner ? (
        <>
          <Avatar
            src={ownerSrc}
            alt="profile"
            sx={{ width: 80, height: 80, backgroundColor: "white" }}
          />
          <div style={{ margin: "10px 0 0 15px" }}>
            <S.UserDisplayName>{userObj.displayName}</S.UserDisplayName>
            <FontAwesomeIcon
              icon={faPen}
              onClick={handleEditClick}
              size="xs"
              style={{ color: "white", cursor: "pointer" }}
            />
          </div>
          <span>게시물 {posts.length}</span>
        </>
      ) : (
        <>
          <Avatar
            src={imgSrc}
            alt="profile"
            sx={{ width: 80, height: 80, backgroundColor: "white" }}
          />
          <S.UserDisplayName>{creator.displayName}</S.UserDisplayName>
          <span>게시물 {posts.length}</span>
        </>
      )}
    </S.UserProfile>
  );
};
