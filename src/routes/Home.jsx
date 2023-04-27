import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "components/Sweet/Sweet";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./Home.styled";
import userInitPhoto from "../asset/user.png";
import WriteBtn from "components/WriteBtn";

const Home = ({ userObj, test4 }) => {
  const [sweets, setSweets] = useState([]);
  const navigate = useNavigate();

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
    // console.log(testId);
  }, []);

  const test3 = (dataId, dataProfile, dataName) => {
    test4(dataId, dataProfile, dataName);
  };

  const moveProfile = () => {
    test4(userObj.uid, userObj.photoURL, userObj.displayName);
    navigate("/profile");
  };
  return (
    <S.HomeContainer>
      <Nav userObj={userObj} moveProfile={moveProfile} />
      <S.SweetContainer>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
            userObj={userObj}
            test3={test3}
          />
        ))}
      </S.SweetContainer>
      <WriteBtn />
    </S.HomeContainer>
  );
};

export default Home;

const Nav = ({ userObj, moveProfile }) => {
  const imgSrc = userObj.photoURL || userInitPhoto;
  return (
    <S.Nav>
      <S.Ul>
        <S.ProfileLi>
          <div onClick={moveProfile}>
            <img src={imgSrc} alt="profile" />
          </div>
        </S.ProfileLi>
        <S.HomeLi>
          <Link to="/">Home</Link>
        </S.HomeLi>
      </S.Ul>
    </S.Nav>
  );
};
