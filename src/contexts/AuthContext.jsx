import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../database/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// إنشاء السياق
const AuthContext = createContext();

// to know user info and be able to ge out 
export function useAuth() {
  return useContext(AuthContext);
}

 
export function AuthProvider({ children }) { // logic

  const [currentUser, setCurrentUser] = useState(null); //To store user and upload status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);  // يخزن المستخدم الحالي
      setLoading(false);     // عند انتهاء الفحص
    });
  
    return unsubscribe; // يوقف الاستماع عند إغلاق الصفحة
  }, []);
  

  const logout = () => signOut(auth);

  const value = {
    currentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
