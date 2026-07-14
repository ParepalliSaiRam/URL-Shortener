import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { saveToken } from "../utils/auth";

function LoginPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const response = await loginUser(form);

            saveToken(response.data.token);

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed."
            );

        }

    }

    return (

        <form onSubmit={handleSubmit}>

            <h2>Login</h2>

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
            />

            <br /><br />

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
            />

            <br /><br />

            <button type="submit">
                Login
            </button>

        </form>

    );

}

export default LoginPage;