import React, { useState } from "react";
import { auth } from "./../firebase.js"
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const Login = () => {

  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`)
      });
  }

  function doSignOut(event) {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have logged out")
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return(
    <div>
    <h3>Login</h3>
    {signInSuccess}
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <button type='submit'>Sign in</button>
      </form>

      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      <button onClick={doSignOut}>Sign out</button>
      </div>
  );
}

export default Login;