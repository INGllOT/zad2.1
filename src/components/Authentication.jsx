
const Auth = ({
    setUsername,
    setPassword,
    handleLogin,
    username,
    password
}) => {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2 className="mb-3" >Login</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>

      
    </div>
  );
};

export default Auth;
