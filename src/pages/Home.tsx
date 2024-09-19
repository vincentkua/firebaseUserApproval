import { useEffect, useState } from "react";
import useAuthNavigator from "../utils/useAuthNavigator";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [approved, setApproved] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useAuthNavigator("/", "/login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setApproved(userDoc.data()?.approved || false);
          } else {
            setApproved(false);
          }
        } catch (error: any) {
          console.error("Error getting User Approval Status:", error);
        }

        try {
          const tokenResult = await currentUser.getIdTokenResult();
          setIsAdmin(!!tokenResult.claims.admin);
        } catch (error) {
          console.error("Error getting Admin Status:", error);
          setIsAdmin(false);
        }

        // Listen to to-do items in Firestore
        try {
          const todosRef = collection(db, "users", currentUser.uid, "todos");

          const unsubscribeTodos = onSnapshot(
            todosRef,
            (snapshot) => {
              const todosData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setTodos(todosData as { id: string; text: string }[]);
            },
            (error) => {
              console.error("Error getting TODO data:", error);
            }
          );

          return () => {
            unsubscribeTodos();
          };
        } catch (error) {
          console.error("Error setting up TODO listener:", error);
        }
      } else {
        setApproved(false);
        setIsAdmin(false);
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const todosRef = collection(db, "users", currentUser.uid, "todos");
        await addDoc(todosRef, { text: newTodo });
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const deleteTodo = async (todoId: string) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const todoDocRef = doc(db, "users", currentUser.uid, "todos", todoId);
        await deleteDoc(todoDocRef);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  return (
    <>
      <h4>Home Page</h4>
      <p>Note: Will navigate to login page if user is not logged in!</p>
      <p>
        Account Approval:{" "}
        {approved === null
          ? "Loading..."
          : approved
          ? "Approved"
          : "Not Approved"}
      </p>
      <p>
        Admin Right:{" "}
        {isAdmin === null ? "Loading..." : isAdmin ? "True" : "False"}
      </p>
      <hr />

      <h4>To-Do App</h4>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New to-do item"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {!approved && (
        <p style={{ color: "red" }}>
          Please contact admin for user approval!!!
        </p>
      )}
    </>
  );
};

export default Home;
