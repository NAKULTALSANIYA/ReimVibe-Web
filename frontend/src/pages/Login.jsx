import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("info@reimvibetechnologies.com");
  const [password, setPassword] = useState("admin123");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-md"
              placeholder="info@reimvibetechnologies.com"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-md"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 px-6 py-2 rounded-md font-semibold hover:bg-yellow-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
