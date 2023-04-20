import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "fbase";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

register("ko", koLocale);

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "sweets"), {
        text: sweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (err) {
      console.log("Error adding document", err);
    }
    setSweet("");
  };
  const onChange = (e) => {
    setSweet(e.target.value);
  };

  console.log(sweets);
  return (
    <div>
      <form>
        <input
          type="text"
          value={sweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="send" onClick={onSubmit} />
      </form>
      {sweets.map((sweet) => (
        <div key={sweet.id}>
          {sweet.text}
          {format(sweet.createdAt, "ko")}
        </div>
      ))}
    </div>
  );
};

export default Home;
