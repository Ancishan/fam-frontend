"use client";
import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const register = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const login = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      {!user ? (
        <>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login} className="bg-blue-500 text-white p-2 mr-2">
            Login
          </button>
          <button onClick={register} className="bg-green-500 text-white p-2">
            Register
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </>
      ) : (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={logout} className="bg-red-500 text-white p-2 mt-2">
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
