import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";
import toast from "react-hot-toast";
import { getToken } from "../utils/auth";

function SignupPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await signupUser(form);
            toast.success("Account created successfully!");

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Signup failed."
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
                Create your account
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                    className="w-full border rounded-lg p-3"
                />

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
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

            </form>

            <p className="text-center mt-6 text-gray-600">

                Already have an account?{" "}

                <Link
                    to="/"
                    className="text-blue-600 hover:underline"
                >
                    Login
                </Link>

            </p>

        </div>

    </div>
);
}

export default SignupPage;