import React from "react";

const DashboardLogin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary-hover font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardLogin;
