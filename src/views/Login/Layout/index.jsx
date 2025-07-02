const LoginLayout = ({ form, error, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "2rem auto" }}>
    <h2>Login</h2>
    <input
      type="email"
      name="email"
      placeholder="Correo"
      value={form.email}
      onChange={handleChange}
      required
      style={{ display: "block", width: "100%", marginBottom: 10 }}
    />
    <input
      type="password"
      name="password"
      placeholder="Contraseña"
      value={form.password}
      onChange={handleChange}
      required
      style={{ display: "block", width: "100%", marginBottom: 10 }}
    />
    {error && <p style={{ color: "red" }}>{error}</p>}
    <button type="submit" style={{ width: "100%" }}>Iniciar sesión</button>
  </form>
);

export default LoginLayout;
