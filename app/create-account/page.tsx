"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Field-specific validation
    switch (name) {
      case "username":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            username: "Username must contain only letters and spaces",
          }));
        } else {
          setErrors((prev) => ({ ...prev, username: "" }));
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email address",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;

      case "password":
        if (value.length > 15) {
          setErrors((prev) => ({
            ...prev,
            password: "Password must be less than 15 characters",
          }));
        } else if (value.length < 8) {
          setErrors((prev) => ({
            ...prev,
            password: "Password must be at least 8 characters",
          }));
        } else {
          setErrors((prev) => ({ ...prev, password: "" }));
        }

        // Also check if confirmPassword matches (on every password change)
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }

        break;

      case "confirmPassword":
        if (value !== formData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });

    try {
      const res = await fetch(
        "http://localhost:8000/api/account_manage/create/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // Based on backend error message, update specific error field
        if (data.message.includes("Username")) {
          setErrors((prev) => ({ ...prev, username: data.message }));
        } else if (
          data.message.includes("Email required") ||
          data.message.includes("Email already exists")
        ) {
          setErrors((prev) => ({ ...prev, email: data.message }));
        } else if (data.message.includes("Password must be less than")) {
          setErrors((prev) => ({ ...prev, password: data.message }));
        } else if (data.message.includes("Passwords do not match")) {
          setErrors((prev) => ({ ...prev, confirmPassword: data.message }));
        } else {
          setErrors((prev) => ({ ...prev, general: data.message }));
        }
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: "Something went wrong. Please try again.",
      }));
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
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

      {/* Create Account Form */}
      <div className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-sm text-[#7f7b7b]">
              Join StudyBuddy and start organizing your academic life with AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e5e2e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23AFB6]"
                  placeholder="Enter your Username"
                  required
                />
              </div>

              {errors.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username}</p>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
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

              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
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
                    placeholder="Create a password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7f7b7b]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#7f7b7b] mt-1">
                Password must be at least 8 characters long
              </p>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e5e2e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23AFB6]"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7f7b7b]"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}

            {errors.general && (
              <div className="text-center text-red-600 text-sm mb-4">
                {errors.general}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#e3c5c3] rounded-lg font-medium hover:bg-[#d9b5b3] transition-colors"
              >
                Create Account
              </button>
            </div>

            <div className="text-center text-sm">
              <p className="text-[#7f7b7b]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#23AFB6] font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
