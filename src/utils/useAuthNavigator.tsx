import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const useAuthNavigator = (pathvalid: string, pathfailed: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        alert("Welcome back!!!");
        navigate(pathvalid);
      } else {
        alert("Please Login to Continue!!!");
        navigate(pathfailed);
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, [navigate, pathvalid, pathfailed]);
};

export default useAuthNavigator;
