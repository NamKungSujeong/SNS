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

const Profile = ({ userObj, refreshUser }) => {
  const [sweets, setSweets] = useState([]);
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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
    refreshUser();
  };

  useEffect(() => {
    const getMySweets = async () => {
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
    };
    getMySweets();
  }, [userObj.uid]);
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
        <div key={item.id}>{item.text}</div>
      ))}
      <button onClick={onLogoutClick}>log out</button>
    </>
  );
};

export default Profile;
