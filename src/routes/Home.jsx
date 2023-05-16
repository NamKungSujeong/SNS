import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Post from "components/Post/Post";
import { Link } from "react-router-dom";
import * as S from "./Home.styled";

import { AuthContext } from "contexts/AuthProvider";

import BottomAppBar from "components/common/AppBar";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const authConsumer = useContext(AuthContext);
  const { userObj } = authConsumer;

  useEffect(() => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const postArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArr);
    });
  }, []);

  return (
    <S.HomeContainer>
      <S.HomeLi>
        <Link to="/">Home</Link>
      </S.HomeLi>
      <div style={{ height: "500px" }}>
        <S.PostContainer>
          {posts.map((posts) => (
            <Post
              key={posts.id}
              postObj={posts}
              isOwner={posts.creatorId === userObj.uid}
              userObj={userObj}
            />
          ))}
        </S.PostContainer>
        {/* <WriteBtn /> */}
        <BottomAppBar />
      </div>
    </S.HomeContainer>
  );
};

export default Home;
