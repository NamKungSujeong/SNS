import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "componetns/Sweet";
import SweetFactory from "componetns/SweetFactory";
import styled from "styled-components";

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
    <HomeContainer>
      <SweetFactory userObj={userObj} />
      {sweets.map((sweet) => (
        <Sweet
          key={sweet.id}
          sweetObj={sweet}
          isOwner={sweet.creatorId === userObj.uid}
          userObj={userObj}
        />
      ))}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin: auto;
  margin-top: 100px;
`;
