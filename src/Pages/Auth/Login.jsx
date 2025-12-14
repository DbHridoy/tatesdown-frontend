import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import brandlogo from "../../assets/Logo.svg";
import { useLoginMutation } from "../../redux/api/authApi";
import { setCredentials } from "../../redux/slice/authSlice";
import { selectIsAuthenticated } from "../../redux/slice/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  // ✅ Redux state (TOP LEVEL)
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const role = useSelector(selectUserRole);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await login(formData).unwrap();

      // ✅ Save auth data in Redux
      dispatch(setCredentials(response.data));
    } catch (err) {
      setError(err?.data?.message || "Login failed");
    }
  };

  // ✅ Redirect AFTER login
  useEffect(() => {
    if (!isAuthenticated) return;

    // switch (role) {
    //   case "admin":
    //     navigate("/admin");
    //     break;
    //   case "sales-rep":
    //     navigate("/sales");
    //     break;
    //   case "production-manager":
    //     navigate("/production");
    //     break;
    //   default:
        navigate("/s");
    // }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <img src={brandlogo} alt="Brand Logo" className="w-40 h-40" />
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <div>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#007CCD] text-white py-2 rounded-lg"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
