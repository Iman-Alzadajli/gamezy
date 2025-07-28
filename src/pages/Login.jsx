import React, { useState } from "react";
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // لإعادة التوجيه بعد الدخول

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // نستخدمه للتنقل بعد تسجيل الدخول

  // تحديث القيم في النموذج
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    // تحقق من البريد
    if (!formData.email.includes("@")) {
      return alert("Please enter a valid email.");
    }

    try {
      // محاولة تسجيل الدخول من Firebase
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      // ننتظر حتى onAuthStateChanged يشتغل
      setTimeout(() => {
        navigate("/");
      }, 500); // ✅ مهلة قصيرة تسمح لـ Navbar بالتحديث
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#1f1e2e" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px", backgroundColor: "#2b2a3f", padding: "2rem", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
        <h2 className="text-center mb-4" style={{ color: "#e0e0f0" }}>Login to Gamezy</h2>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "#ccc" }}>Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "#ccc" }}>Password</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        {/* Submit */}
        <button type="submit" className="btn w-100" style={{ backgroundColor: "#7c4dff", color: "#fff" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
