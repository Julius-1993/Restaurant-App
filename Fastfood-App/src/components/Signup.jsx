import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, login } = useContext(AuthContext);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password).then((result) => {
      // Signed up 
      const user = result.user;
      alert("Account Created Successfully")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    })
  };
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg text-center">Register Here!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              {...register("password")}
            />
          </div>
          {/* Error test */}

          {/* login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-success text-white"
            />
          </div>
          <p className="text-center my-2">
            Already have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="underline text-red-700 ml-1"
            >
              Login
            </button>{" "}
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 my-20"
          >
            ✕
          </Link>
        </form>
        {/* Social Login */}
        <div className="text-center space-x-3 my-3">
          <button className="btn btn-circle hover:bg-success hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-blue-700 hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-black hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
