import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "componetns/Sweet";
// import Navigation from "componetns/Navigation";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// import SweetFactory from "routes/SweetFactory";
import * as S from "./Home.styled";

const Home = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);
  // console.log(isWrite);

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
      {/* <SweetFactory userObj={userObj} /> */}
      <S.Nav>
        <S.Ul>
          <S.ProfileLi>
            <Link to="/profile">
              <img src={userObj.photoURL} alt="profile" />
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
    </S.HomeContainer>
  );
};

export default Home;
