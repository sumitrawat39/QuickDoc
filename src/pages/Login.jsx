import React, { useState } from "react";

function Login() {
  const [state, setState] = useState("Sign up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex items-center min-h-[80vh] ">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg ">
        <p className="text-2xl font-semibold ">
          {state === "Sign up" ? "Create account" : "Log in"}
        </p>
        <p>Please {state === "Sign up" ? "Sign up " : "Log in"}</p>
        {state === "Sign up" && (
          <div className="w-full">
            <p>Full name</p>
            <input
              className="border border-zin300 rounded w-full p-2 mt "
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zin300 rounded w-full p-2 mt-1 "
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zin300 rounded w-full p-2 mt-1 "
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base  ">
          {state === "Sign up" ? "Create account" : "Log in"}
        </button>
        {state === "Sign up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-primary underline cursor-pointer"
            >
              click here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
