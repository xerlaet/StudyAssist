"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "@/app/firebase";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (formData.rememberMe) {
        localStorage.setItem("currentUser", JSON.stringify(userCredential.user));
      } else {
        sessionStorage.setItem("currentUser", JSON.stringify(userCredential.user));
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("User not found");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  const handleSubmitForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      setSuccess("Password reset link sent to your email.");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPassword || !resetCode) {
      setError("Please enter a new password.");
      return;
    }

    try {
      await confirmPasswordReset(auth, resetCode, newPassword);
      setSuccess("Password has been reset. You can now log in.");
      setForgotPassword(false);
      setNewPassword("");
      setResetCode("");
    } catch (err: any) {
      if (err.code === "auth/expired-action-code") {
        setError("Reset link has expired.");
      } else if (err.code === "auth/invalid-action-code") {
        setError("Invalid reset code.");
      } else {
        setError("Failed to reset password.");
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    const code = urlParams.get("oobCode");

    if (mode === "resetPassword" && code) {
      setForgotPassword(true);
      setResetCode(code);
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-12 py-4 border-b border-[#e5e2e2]">
        <div className="flex items-center gap-2">
          <Image
            src="https://s3-alpha-sig.figma.com/img/ba1c/1331/9adcf160a889c79ae06b8dd8f362c903?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ESkkii95SBXWtfpIQu9KLoTGPLsULeJFtl2k1oE4sVHg~P19SNchjaEv9TpicFTt0jKqONpCK9al9ufJFUYmA91v9ld0O84Oen2Q~l6XSb8wjnNQUqHUksfB6p5eMmO3Gpp-3kx7WHkJ6qSxbPhqPVpFGWKRCXKidQs3WNLwc5B~d-YuURRLmw3GfzZSr1-2a~W3P7w5S1WEtBsT41az-JA53hAwPJcR4uG2Ut~kH9ESDJSSiQzS5B3sCbMYmJCnJ118yCAFESD6dqPDIc28CGE4CLgUel5EM-9tglbxvs8yCMz-yBlT8Hujo0QHlF6eVyOZJgLF8e~Ouvznab8lmg__"
            alt="App Logo"
            width={70}
            height={50}
            className="h-10 w-10"
          />
          <span className="text-2xl font-bold">StudyBuddy</span>
        </div>
        <Link href="/" className="flex items-center gap-2 text-[#7f7b7b]">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <div className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {resetCode
                ? "Set New Password"
                : forgotPassword
                ? "Reset Your Password"
                : "Welcome Back"}
            </h1>
            <p className="text-[#7f7b7b]">
              {resetCode
                ? "Enter your new password below"
                : forgotPassword
                ? "Enter your email to receive a password reset link"
                : "Log in to your StudyBuddy account"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          <form
            onSubmit={
              resetCode
                ? handleResetPassword
                : forgotPassword
                ? handleSubmitForgotPassword
                : handleSubmitLogin
            }
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e2e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23AFB6]"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {resetCode && (
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-[#e5e2e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23AFB6]"
                    placeholder="Enter new password"
                    required
                  />
                </div>
              )}

              {!forgotPassword && !resetCode && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e5e2e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23AFB6]"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7f7b7b]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {!forgotPassword && !resetCode && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#23AFB6] focus:ring-[#23AFB6] border-[#e5e2e2] rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button
                      type="button"
                      className="text-[#23AFB6] hover:underline"
                      onClick={() => setForgotPassword(true)}
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#e3c5c3] rounded-lg font-medium hover:bg-[#d9b5b3] transition-colors"
            >
              {resetCode
                ? "Reset Password"
                : forgotPassword
                ? "Send Reset Link"
                : "Log In"}
            </button>

            {(forgotPassword || resetCode) && (
              <button
                type="button"
                className="w-full py-2 text-[#7f7b7b] font-medium hover:underline"
                onClick={() => {
                  setForgotPassword(false);
                  setResetCode("");
                  setSuccess("");
                  setError("");
                }}
              >
                Back to Login
              </button>
            )}

            {!forgotPassword && !resetCode && (
              <div className="text-center text-sm">
                <p className="text-[#7f7b7b]">
                  Don’t have an account?{" "}
                  <Link href="/create-account" className="text-[#23AFB6] font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
