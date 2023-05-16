import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "components/Post/Post";
import { Link } from "react-router-dom";
import * as S from "./Home.styled";

import { AuthContext } from "contexts/AuthProvider";

import BottomAppBar from "components/common/AppBar";

const Home = () => {
  const [sweets, setSweets] = useState([]);

  const authConsumer = useContext(AuthContext);
  const { userObj } = authConsumer;

  useEffect(() => {
    const q = query(
      collection(dbService, "sweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArr);
    });
  }, []);

  return (
    <S.HomeContainer>
      <S.HomeLi>
        <Link to="/">Home</Link>
      </S.HomeLi>
      <div style={{ height: "500px" }}>
        <S.SweetContainer>
          {sweets.map((sweet) => (
            <Sweet
              key={sweet.id}
              sweetObj={sweet}
              isOwner={sweet.creatorId === userObj.uid}
              userObj={userObj}
            />
          ))}
        </S.SweetContainer>
        {/* <WriteBtn /> */}
        <BottomAppBar />
      </div>
    </S.HomeContainer>
  );
};

export default Home;
