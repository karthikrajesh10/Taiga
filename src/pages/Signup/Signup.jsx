import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { signupUser } from "../../services/userService";
import "./Signup.css";
import { useEffect } from "react";


const ROLE_CHOICES = [
  { value: "PM", label: "Project Manager" },
  { value: "DEV", label: "Developer" },
  { value: "QA", label: "QA Tester" },
  { value: "MGR", label: "Manager" },
  { value: "AP", label: "Approver" },
  { value: "TL", label: "Test Lead" },
];

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    employee_id: "",
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const role = user?.role?.toUpperCase();
    const isSuperAdmin = user?.is_superuser === true;

    // Only allow PMs or superusers
    if (!user || (!isSuperAdmin && role !== "PM")) {
        navigate("/dashboard");
    }
    }, [navigate]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signupUser(form);

      alert("User created successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Header variant="dashboard" />

      <main className="signup">
        <h1 className="signup__title">Create Account</h1>

        <form className="signup__form" onSubmit={handleSubmit}>
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Employee ID (optional) */}
          <input
            type="text"
            name="employee_id"
            placeholder="Employee ID (optional)"
            value={form.employee_id}
            onChange={handleChange}
          />

          {/* Role */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {ROLE_CHOICES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>
      </main>
    </>
  );
}