import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile(name, photoURL).then(() => {
      // Profile updated!
      alert("Profile updated succesfully!")
      navigate(from, {replace: true})
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
     
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center font-bold">Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Put your name here"
              className="input input-bordered"
              {...register("name")}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="text"
              placeholder="photoURL"
              className="file-input w-full mt-1"
              {...register("photoURL")}
              required
            />
            {/* Todo: Uploading image will be later */}
            {/* <input type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <input type="submit" value={"Update"} className="btn bg-success text-white"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
