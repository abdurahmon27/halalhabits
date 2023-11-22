// UserToDo.js
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import AutoTodo from "./AutoTodo";
import Weather from "./Weather";

const UserToDo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const location = useLocation();
  const userFullName = location.state ? location.state.username : null;

  useEffect(() => {
    const fetchTodos = async () => {
      if (userFullName) {
        console.log("Full Name:", userFullName);
        const userTodosQuery = query(
          collection(db, "todos"),
          where("userId", "==", userFullName),
          orderBy("timestamp")
        );

        const unsubscribe = onSnapshot(userTodosQuery, (querySnapshot) => {
          const todosData = [];
          querySnapshot.forEach((doc) => {
            todosData.push({ id: doc.id, ...doc.data() });
          });
          setTodos(todosData);
        });

        return () => unsubscribe();
      }
    };

    fetchTodos();
  }, [userFullName]);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (userFullName && todo) {
      try {
        await addDoc(collection(db, "todos"), {
          userId: userFullName,
          todo: todo,
          timestamp: new Date(),
        });
        setTodo("");
      } catch (error) {
        console.error("Error adding todo:", error.message);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  const handleEditTodo = async (id, newTodoText) => {
    try {
      await updateDoc(doc(db, "todos", id), {
        todo: newTodoText,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, todo: newTodoText } : todo
        )
      );
      setEditTodo(null);
    } catch (error) {
      console.error("Error editing todo:", error.message);
    }
  };

  const autoTodos = ["Go to work", "Go to school", "Pray", "Exercise"];

  return (
    <div className="absolute bg-white w-full h-screen flex p-5 dark:bg-slate-500">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        {userFullName ? (
          <>
            <span className="text-3xl">Welcome, {userFullName}</span>
            <div className="flex justify-center items-center">
              <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-span-3 p-5 shadow border rounded w-auto h-auto">
                  <form onSubmit={handleAddTodo}>
                    <input
                      type="text"
                      placeholder="Write your todo"
                      value={todo}
                      onChange={(e) => setTodo(e.target.value)}
                    />
                    <button type="submit">Add ToDo</button>
                  </form>
                  {autoTodos.map((autoTodo, index) => (
                    <AutoTodo
                      key={index}
                      userFullName={userFullName}
                      autoTodo={autoTodo}
                    />
                  ))}
                  {todos.length > 0 ? (
                    <ul>
                      {todos.map((todoItem) => (
                        <li key={todoItem.id}>
                          {editTodo === todoItem.id ? (
                            <>
                              <input
                                type="text"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                              />
                              <button
                                onClick={() =>
                                  handleEditTodo(todoItem.id, todo)
                                }
                              >
                                Save
                              </button>
                            </>
                          ) : (
                            <>
                              {todoItem.todo}
                              <button onClick={() => setEditTodo(todoItem.id)}>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTodo(todoItem.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      {todos.length > 0
                        ? "Uploading your todos"
                        : "No todos yet"}
                    </p>
                  )}
                </div>
                <div className="col-span-2 shadow border rounded w-auto h-auto">
                  <div className="flex p-5">
                    <span className="mx-2">Prays:</span>
                    <ul className=" flex items-center justify-center">
                      <ul className=" flex items-center justify-center">
                        <li className="mx-2 flex items-center justify-center flex-col">
                          <span>Fajr</span>
                          <span>5:00 - 6:00 am</span>
                        </li>
                        <li className="mx-2 flex items-center justify-center flex-col">
                          <span>Zuhr</span>
                          <span>5:00 - 6:00 am</span>
                        </li>
                        <li className="mx-2 flex items-center justify-center flex-col">
                          <span>Asr</span>
                          <span>5:00 - 6:00 am</span>
                        </li>
                        <li className="mx-2 flex items-center justify-center flex-col">
                          <span>Maghrib</span>
                          <span>5:00 - 6:00 am</span>
                        </li>
                        <li className="mx-2 flex items-center justify-center flex-col">
                          <span>Isha</span>
                          <span>5:00 - 6:00 am</span>
                        </li>
                      </ul>
                    </ul>
                  </div>
                </div>
                <div className="row-span-2 col-span-2 shadow border">
                  <Weather username={userFullName} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>
              You are not logged in.{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign up
              </Link>{" "}
              to access this page.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserToDo;
