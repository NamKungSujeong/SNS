import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { dbService } from "fbase";

const Home = () => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);

  const getSweets = async () => {
    const dbSweets = await getDocs(collection(dbService, "sweets"));
    dbSweets.forEach((doc) => {
      const sweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setSweets((prev) => [sweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getSweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, "sweets"), {
      text: sweet,
      createdAt: Date.now(),
    });
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
      {sweets.reverse().map((sweet) => (
        <div key={sweet.id}>{sweet.sweet}</div>
      ))}
    </div>
  );
};

export default Home;
