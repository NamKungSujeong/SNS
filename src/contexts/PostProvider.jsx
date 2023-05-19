import React, { useEffect, useState, createContext } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";

import { AuthContext } from "contexts/AuthProvider";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [creator, setCreator] = useState({
    id: "",
    url: "",
    displayName: "",
  });

  useEffect(() => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <PostContext.Provider value={{ posts, creator, setCreator }}>
      {children}
    </PostContext.Provider>
  );
};

const PostConsumer = AuthContext.Consumer;

export { PostConsumer, PostContext, PostProvider };
