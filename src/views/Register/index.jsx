import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterLayout from "./Layout";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Correo inválido";
    if (form.password.length < 4) return "Contraseña muy corta (mínimo 4)";
    if (form.password !== form.confirm) return "Las contraseñas no coinciden";
    return null;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === form.email)) {
      setError("El correo ya está registrado");
      return;
    }
    users.push({
      id: Date.now().toString(),
      email: form.email,
      password: form.password,
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("¡Registro exitoso!");
    navigate("/login");
  };

  return (
    <RegisterLayout
      form={form}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;
