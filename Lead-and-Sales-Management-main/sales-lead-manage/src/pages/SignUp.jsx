import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios"; // Using configured Axios instance
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle Confirm Password Validation
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError(password !== e.target.value ? "Passwords do not match!" : "");
    };

    // Handle Signup Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const response = await API.post("/auth/register", { 
                name: name.trim(), 
                email: email.trim(), 
                password: password.trim(),
                confirmPassword: confirmPassword.trim()
            });

            if (response.status === 201) {
                toast.success("Registration successful! Please log in."); // Success message using toast
                navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            toast.error(err.response?.data?.message || "Registration failed. Please try again."); // Error message using toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#CAE8E9]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-8 text-[#471AA0] text-center">Sign Up</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div className="flex items-center border border-[#9747FF] p-2 rounded-md">
                        <FontAwesomeIcon icon={faUser} className="text-[#471AA0]" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full outline-none text-black ml-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex items-center border border-[#9747FF] p-2 rounded-md">
                        <FontAwesomeIcon icon={faEnvelope} className="text-[#471AA0]" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full outline-none text-black ml-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
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

                    {/* Confirm Password */}
                    <div className="flex items-center border border-[#9747FF] p-2 rounded-md">
                        <FontAwesomeIcon icon={faLock} className="text-[#471AA0]" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full outline-none text-black ml-2"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#BB84E8] text-white font-bold py-2 rounded-md hover:bg-[#a866df] disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center text-[#471AA0] mt-4">
                        Already have an account?
                        <Link to="/signin" className="font-bold ml-1">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
