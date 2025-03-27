import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import API from "../api/axios"; // Import the Axios instance


const SignIn = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await API.post("/auth/login", { email, password });

            if (response.status === 200 ) {
                const { token, user } = response.data;
                console.log(user);

                // Store token and user data in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user)); // Convert object to string

                // localStorage.setItem("user", user);
                localStorage.setItem("userRole", user.role);
                localStorage.setItem("isAuthenticated", "true");

                // Call onLogin function (if used for global auth state)
                onLogin(user.role);

                // Redirect user based on role
                if (user.role === "admin") {
                    navigate("/admin-dashboard");
                } else if (user.role === "user") {
                    navigate("/customer-dashboard");
                } else {
                    navigate("/"); // Default route if role is unknown
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#CAE8E9]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8 text-[#BA60C8] text-center">Sign In</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center border border-[#9747FF] p-2 rounded-md">
                        <FontAwesomeIcon icon={faUser} className="text-[#471AA0]" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full outline-none text-black ml-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center border border-[#9747FF] p-2 rounded-md">
                        <FontAwesomeIcon icon={faLock} className="text-[#471AA0]" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full outline-none text-black ml-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#BB84E8] text-white rounded-md py-2 hover:bg-[#a866df] disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="text-center text-[#BA60C8] mt-4">
                    Don't have an account?
                    <Link to="/register" className="font-bold ml-1">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
