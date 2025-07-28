import React, { useState } from "react";
import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // للتنقل بعد التسجيل

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // التنقل بعد النجاح

  // تحديث البيانات مع كل تغيير
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // التحقق من صحة البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!email.includes("@")) {
      return alert("Please enter a valid email address.");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters long.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      // تسجيل المستخدم في Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });

      alert("User registered successfully!");
      navigate("/"); // التوجه للصفحة الرئيسية
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#1f1e2e" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px", backgroundColor: "#2b2a3f", padding: "2rem", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
        <h2 className="text-center mb-4" style={{ color: "#e0e0f0" }}>Create Account</h2>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "#ccc" }}>Username</label>
          <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
        </div>

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

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "#ccc" }}>Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        {/* Submit */}
        <button type="submit" className="btn w-100" style={{ backgroundColor: "#7c4dff", color: "#fff" }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
