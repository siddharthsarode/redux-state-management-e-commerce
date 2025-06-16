import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  console.log(userState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    data.id = nanoid();
    data.isAdmin = false;
    const result = await dispatch(userRegister(data));

    if (userRegister.fulfilled.match(result)) {
      navigate("/login", {
        state: { email: data.email, password: data.password },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-baby p-4">
      <div className="w-full mx-auto max-w-md bg-mindaro shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange]">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-orange-600">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
            />
            {errors.name && (
              <p className="text-red text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-orange-600">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
            />
            {errors.email && (
              <p className="text-red text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-orange-600">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
            />
            {errors.password && (
              <p className="text-red text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            {userState.isLoading ? "Loading..." : "Register"}
          </button>

          <p>{userState.error ? "Something went wrong" : ""}</p>
        </form>
      </div>
    </div>
  );
}
