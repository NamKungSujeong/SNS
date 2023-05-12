import React, { useEffect, useState, createContext } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";

import { AuthContext } from "contexts/AuthProvider";

const SweetContext = createContext();

const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [creator, setCreator] = useState({
    id: "",
    url: "",
    displayName: "",
  });

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
    <SweetContext.Provider value={{ sweets, creator, setCreator }}>
      {children}
    </SweetContext.Provider>
  );
};

const SweetConsumer = AuthContext.Consumer;

export { SweetContext, SweetConsumer, SweetProvider };
