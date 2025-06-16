import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogin } from "../store/slices/userSlice";

export default function Login() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    // console.log("Login Data:", data);
    const result = await dispatch(userLogin(data));
    // console.log("Login Result:", result);
    if (userLogin.fulfilled.match(result)) {
      if (result.payload.isAdmin === true) navigate("/admin");
      else if (result.payload.isAdmin === false) navigate("/");
      else navigate("/login");
    }
  };

  useEffect(() => {
    if (location.state && location.state.email && location.state.password) {
      setValue("email", location.state.email || "");
      setValue("password", location.state.password || "");
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-baby px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-orange text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange text-white font-semibold rounded-md hover:bg-opacity-90 transition"
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-orange hover:underline">
            Sign up
          </a>
        </p>
        {error && (
          <p className="text-red text-sm mt-4 text-center">
            {error.message || "An error occurred. Invalid credentials."}
          </p>
        )}
      </div>
    </div>
  );
}
