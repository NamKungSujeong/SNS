import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "components/Sweet/Sweet";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./Home.styled";
import userInitPhoto from "../asset/user.png";
import WriteBtn from "components/WriteBtn";
import { AuthContext } from "contexts/AuthProvider";
import { SweetContext } from "contexts/SweetProvider";

const Home = () => {
  const [sweets, setSweets] = useState([]);
  const navigate = useNavigate();

  const authConsumer = useContext(AuthContext);
  const { userObj } = authConsumer;
  const sweetConsumer = useContext(SweetContext);
  const { setCreator } = sweetConsumer;

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

  const moveProfile = () => {
    setCreator({
      id: userObj.uid,
      url: userObj.profilePhoto,
      displayName: userObj.displayName,
    });
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
