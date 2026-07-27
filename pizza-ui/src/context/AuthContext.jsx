import { createContext, useEffect, useState } from "react";
import { getAllCustomers } from "../services/customerService";

export const AuthContext = createContext();

// Decode a JWT payload without pulling in an extra library
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // The backend login response only returns { token, message, role }.
  // The customer's id/name/etc. aren't included, so we decode the email
  // out of the JWT and look up the matching customer from /customers.
  const login = async (authResponse) => {
    const { token, role } = authResponse;
    const decoded = decodeToken(token);
    const email = decoded?.sub;

    let customer = null;

    try {
      const res = await getAllCustomers();
      customer = res.data.find((c) => c.email === email) || null;
    } catch (error) {
      console.error("Could not load customer profile", error);
    }

    const userData = {
      token,
      role,
      customerId: customer?.customerId ?? null,
      name: customer?.name ?? "",
      email: customer?.email ?? email ?? "",
      phone: customer?.phone ?? "",
      address: customer?.address ?? "",
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const updateUser = (updated) => {
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
