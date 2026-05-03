import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  const signup = ({ username, password, role }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }

    const newUser = { username, password, role };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    return { success: true, message: "Signup successful" };
  };

  const login = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid username or password" };
    }

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));

    return { success: true, role: user.role };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        role: currentUser?.role,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);