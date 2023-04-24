import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "componetns/Sweet";
import SweetFactory from "componetns/SweetFactory";
import * as S from "./Home.styled";

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
      <SweetFactory userObj={userObj} />
      {sweets.map((sweet) => (
        <Sweet
          key={sweet.id}
          sweetObj={sweet}
          isOwner={sweet.creatorId === userObj.uid}
          userObj={userObj}
        />
      ))}
    </S.HomeContainer>
  );
};

export default Home;
