import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signUPWithGmail, login} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  //Redirect to home page function
  const loacation = useLocation();
  const naigate = useNavigate();



  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password).then((result) => {
      const user = result.user;
      alert("Login Successful");
    }).catch((error) => {
      const errorMessage = error.message;
      setErrorMessage("Provide a correct email and password!")
    })
  }

  //Google Signin
  const handleLogin = () =>{
    signUPWithGmail().then((result) => {
      const user = result.user;
      alert("Login Successfully!")
    }).catch ((error) => console.log(error))
  }
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

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
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* Error test */}
            {
              errorMessage ? <p className="text-red-800 text-xs italic">{errorMessage}</p> : ""
            }

            {/* login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-success text-white"
              />
            </div>
            <p className="text-center my-2">
              Do not have an account?{" "}
              <Link to="/signup" className="underline text-red-700 ml-1">
                Signup Here
              </Link>{" "}
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          {/* Social Login */}
          <div className="text-center space-x-3 my-3">
            <button className="btn btn-circle hover:bg-success hover:text-white" onClick={handleLogin}>
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
      </div>
    </dialog>
  );
};

export default Modal;
