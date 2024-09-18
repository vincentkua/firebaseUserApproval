import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useEffect, useState } from "react";

const UserLogin = () => {
  const [signinEmail, setSigninEmail] = useState<string>("");
  const [signinPassword, setSigninPassword] = useState<string>("");
  
  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signinEmail,
        signinPassword
      );
      console.log(userCredential);
      alert("Sign In Successful!!!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(()=>{

  },[])


  return (
    <>
      <h4>Login Page</h4>
      <p>Note: Will navigate to home page is user was logged in</p>

      <input
        type="text"
        placeholder="email"
        value={signinEmail}
        onChange={(e) => setSigninEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={signinPassword}
        onChange={(e) => setSigninPassword(e.target.value)}
      />
      <br />
      <button onClick={signIn}>Sign In</button>
      
    </>
  );
};

export default UserLogin;
