"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function ResetPassword() {
  const [activeTab, setActiveTab] = useState<"request" | "set">("request")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission based on active tab
  }

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

      {/* Reset Password Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#000000] mb-2">Reset your password</h1>
            <p className="text-[#909090] text-lg">We&apos;ll help you get back into your account</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="space-y-6">
              <div className="flex mb-6">
                <button
                  className={`flex-1 py-3 text-center ${
                    activeTab === "request"
                      ? "bg-[#ffffff] text-[#000000] font-medium shadow-md"
                      : "bg-[#f1f0f0] text-[#909090]"
                  }`}
                  onClick={() => setActiveTab("request")}
                >
                  Request Reset
                </button>
                <button
                  className={`flex-1 py-3 text-center ${
                    activeTab === "set"
                      ? "bg-[#ffffff] text-[#000000] font-medium shadow-md"
                      : "bg-[#f1f0f0] text-[#909090]"
                  }`}
                  onClick={() => setActiveTab("set")}
                >
                  Set New Password
                </button>
              </div>

              {activeTab === "request" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#000000] mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="w-5 h-5 text-[#909090]" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-[#e5e2e2] rounded-md text-[#000000] placeholder-[#a7a6a6] focus:outline-none focus:ring-1 focus:ring-[#000000]"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#000000] text-white rounded-md hover:bg-[#050505] transition-colors"
                  >
                    Reset Password
                  </button>

                  <div className="text-center text-[#909090]">
                    Remember your Password?{" "}
                    <Link href="/login" className="text-[#000000] font-medium">
                      Log in
                    </Link>
                  </div>
                </form>
              )}
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <div className="flex mb-6">
                <button
                  className={`flex-1 py-3 text-center ${
                    activeTab === "request"
                      ? "bg-[#f1f0f0] text-[#909090]"
                      : "bg-[#ffffff] text-[#000000] font-medium shadow-md"
                  }`}
                  onClick={() => setActiveTab("request")}
                >
                  Request Reset
                </button>
                <button
                  className={`flex-1 py-3 text-center ${
                    activeTab === "set"
                      ? "bg-[#ffffff] text-[#000000] font-medium shadow-md"
                      : "bg-[#f1f0f0] text-[#909090]"
                  }`}
                  onClick={() => setActiveTab("set")}
                >
                  Set New Password
                </button>
              </div>

              {activeTab === "set" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#000000] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-[#909090]" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 border border-[#e5e2e2] rounded-md text-[#000000] placeholder-[#a7a6a6] focus:outline-none focus:ring-1 focus:ring-[#000000]"
                        placeholder="Create a Password"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-[#909090]" />
                        ) : (
                          <Eye className="w-5 h-5 text-[#909090]" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#909090] mt-1">Password must be at least 8 characters long</p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#000000] mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-[#909090]" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 border border-[#e5e2e2] rounded-md text-[#000000] placeholder-[#a7a6a6] focus:outline-none focus:ring-1 focus:ring-[#000000]"
                        placeholder="Confirm your Password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-[#909090]" />
                        ) : (
                          <Eye className="w-5 h-5 text-[#909090]" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#000000] text-white rounded-md hover:bg-[#050505] transition-colors"
                  >
                    Reset Password
                  </button>

                  <div className="text-center text-[#909090]">
                    Remember your Password?{" "}
                    <Link href="/login" className="text-[#000000] font-medium">
                      Log in
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
