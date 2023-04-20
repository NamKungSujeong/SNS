import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { dbService, storageService } from "fbase";
import Sweet from "componetns/Sweet";

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const res = await uploadString(attachmentRef, attachment, "data_url");
      attachmentURL = await getDownloadURL(res.ref);
    }
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };
    try {
      await addDoc(collection(dbService, "sweets"), sweetObj);
    } catch (err) {
      console.log("Error adding document", err);
    }
    setSweet("");
    setAttachment("");
  };
  const onChange = (e) => {
    setSweet(e.target.value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="send" onClick={onSubmit} />
        {attachment && (
          <div>
            <img src={attachment} alt="attachment" width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      {sweets.map((sweet) => (
        <Sweet
          key={sweet.id}
          sweetObj={sweet}
          isOwner={sweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default Home;
