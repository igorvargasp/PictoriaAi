"use client";
import { logout } from "../../actions/auth-actions";
import React from "react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <span
      onClick={handleLogout}
      className="inline-block w-full cursor-pointer text-destructive"
    >
      Logout
    </span>
  );
};

export default LogoutButton;
