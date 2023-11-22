import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AutoTodo = ({ username, autoTodo }) => {
  const handleAddAutoTodo = async () => {
    try {

      await addDoc(collection(db, "todos"), {
        userId: username,
        todo: autoTodo,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error adding auto todo:", error.message);
    }
  };

  return (
    <button onClick={handleAddAutoTodo}>
      + {autoTodo}
    </button>
  );
};

export default AutoTodo;
