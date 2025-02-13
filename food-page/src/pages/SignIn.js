import React from "react";

function SignIn() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "url('your-image.jpg')", backgroundSize: "cover", backdropFilter: "blur(10px)" }}>
      <div className="bg-white p-5 rounded shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-black mb-5">Sign In</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
