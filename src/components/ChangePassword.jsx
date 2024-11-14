const ChangePassword = ({
    setNewPassword,
    newPassword,
    handleChangePassword
}) => {
  return (
    <div className="card p-4 mb-4">
      <h3>Change Password</h3>
      <input
        type="password"
        className="form-control mb-3"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword} className="btn btn-primary">
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
