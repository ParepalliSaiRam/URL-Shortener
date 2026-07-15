import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { getToken, saveToken } from "../utils/auth";
import toast from "react-hot-toast";

function LoginPage() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    async function handleSubmit(event) {

        event.preventDefault();
        setLoading(true);

        try {

            const response = await loginUser(form);

            saveToken(response.data.token);

            toast.success("Welcome back!");

            navigate("/urls");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login failed."
            );

        } finally {
            setLoading(false);
        }

    }

    if (getToken()) {
        return <Navigate to="/urls" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2">
                    URL Shortener
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Welcome back!
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-3"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-3"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;