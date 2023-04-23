import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import {
  collection,
  where,
  query,
  orderBy,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { signOut, updateProfile } from "firebase/auth";

const Profile = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      sweets.forEach((item) => {
        const nameRef = doc(dbService, "sweets", `${item.id}`);
        updateDoc(nameRef, {
          displayName: newDisplayName,
        });
      });
    }
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "sweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArr);
    });
  }, [userObj.uid, userObj.displayName]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>{userObj.displayName}'s Profile</div>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <button type="submit">Update Profile</button>
      </form>
      {sweets.map((item) => (
        <div key={item.id}>
          <div>{item.text}</div>
          {item.attachmentURL && (
            <img src={item.attachmentURL} alt="img" style={{ width: "50px" }} />
          )}
        </div>
      ))}
      <button onClick={onLogoutClick}>log out</button>
    </>
  );
};

export default Profile;
