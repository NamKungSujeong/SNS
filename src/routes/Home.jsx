import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "componetns/Sweet";
import { Link } from "react-router-dom";
import * as S from "./Home.styled";
import userInitPhoto from "../asset/user.png";
import WriteBtn from "componetns/WriteBtn";

const Home = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);

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
      <S.Nav>
        <S.Ul>
          <S.ProfileLi>
            <Link to="/profile">
              {userObj.photoURL ? (
                <img src={userObj.photoURL} alt="profile" />
              ) : (
                <img src={userInitPhoto} alt="profile" />
              )}
            </Link>
          </S.ProfileLi>
          <S.HomeLi>
            <Link to="/">Home</Link>
          </S.HomeLi>
        </S.Ul>
      </S.Nav>
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
      <WriteBtn />
    </S.HomeContainer>
  );
};

export default Home;
