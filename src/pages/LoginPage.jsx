import React, { useState } from "react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950">
      <div className="w-full sm:max-w-md sm:rounded-2xl bg-gray-900 text-white shadow-lg p-6 sm:p- flex flex-col justify-center sm:h-auto h-screen">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8 sm:mb-4 text-yellow-400">
          Admin Login
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-yellow-400"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-yellow-400"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full p-3 pr-12 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-yellow-400 hover:text-yellow-300 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-950 font-semibold py-3 rounded-lg hover:bg-yellow-300 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
