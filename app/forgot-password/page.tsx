"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
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
        <Link href="/login" className="flex items-center gap-2 text-[#7f7b7b]">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </header>

      {/* Forgot Password Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
                <p className="text-[#7f7b7b]">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-[#909090]" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-[#e5e2e2] rounded-lg text-[#000000] placeholder-[#a7a6a6] focus:outline-none focus:ring-2 focus:ring-[#23AFB6]"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 bg-[#e3c5c3] rounded-lg font-medium hover:bg-[#d9b5b3] transition-colors ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="text-center text-sm">
                  <p className="text-[#7f7b7b]">
                    Remember your password?{" "}
                    <Link href="/login" className="text-[#23AFB6] font-medium">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-[#e3c5c3] rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-[#23AFB6]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Check your email</h2>
              <p className="text-[#7f7b7b] mb-6">
                We've sent a password reset link to <span className="font-medium text-black">{email}</span>
              </p>
              <p className="text-[#7f7b7b] mb-8">
                Click the link in the email to reset your password. If you don't see the email, check your spam folder.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 border border-[#e5e2e2] rounded-lg font-medium hover:bg-[#f8f8f8] transition-colors"
                >
                  Resend Email
                </button>
                <Link
                  href="/login"
                  className="block w-full py-3 bg-[#e3c5c3] rounded-lg font-medium hover:bg-[#d9b5b3] transition-colors text-center"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
