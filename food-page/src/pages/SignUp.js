import React from "react";

function SignUp() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "url('your-image.jpg')", backgroundSize: "cover", backdropFilter: "blur(10px)" }}>
      <div className="bg-white p-5 rounded shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-black">Sign Up</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirm-password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
