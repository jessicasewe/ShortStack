"use client";

import { useState } from "react";

const ProtectedPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = "mySecret123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Try again.");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <div>
        <h1>Welcome to the Protected Page! 🎉</h1>
        <p>You have successfully entered the correct password.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔒 Enter Password to Access</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProtectedPage;
