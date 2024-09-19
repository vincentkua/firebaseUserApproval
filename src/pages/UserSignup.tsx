import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import useAuthNavigator from "../utils/useAuthNavigator";

const UserSignup = () => {
  useAuthNavigator("/", "/signup");

  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const addUser = async () => {
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        newPassword
      );
      const uid = userCredential.user.uid;

      // Store user data in Firestore with UID as document ID
      await setDoc(doc(db, "users", uid), {
        uid: uid,
        email: userCredential.user.email,
        approved: false,
      });

      alert("New User Created!!!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <h4>User Signup</h4>
      <p>Note: Will navigate to Home page after user created or logged in</p>

      <input
        type="text"
        placeholder="new email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <button onClick={addUser}>Add User</button>
    </>
  );
};

export default UserSignup;
