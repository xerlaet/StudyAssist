import Image from "next/image"
import Link from "next/link"
import { Calendar, FileText, Users, Bell, CheckCircle, Search, ArrowRight, ChevronDown } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-12 py-4 border-b border-[#e5e2e2]">
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

        <div className="text-xs flex items-center gap-12">
          <Link href="#" className="font-medium">
            Home
          </Link>
          <Link href="#" className="font-medium">
            Features
          </Link>
          <Link href="#" className="font-medium">
            FAQ
          </Link>
          <Link href="#" className="font-medium">
            Contact Us
          </Link>
        </div>

        <div className="text-xs flex items-center gap-4">
          <button>
            <Search className="h-5 w-5 text-[#7f7b7b]" />
          </button>
          <Link href="/login" className="px-6 py-2 border border-[#a5a4a4] rounded-full font-medium">
          Login
          </Link>
          <Link href="/create-account" className="px-6 py-2 bg-[#e3c5c3] rounded-full font-medium">
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex items-center pt-20 px-12 py-12 relative">
        <div className="w-[80%] bg-[#e3c5c3] bg-opacity-30 p-12 rounded-3xl">
          <h1 className="text-5xl font-bold leading-none mb-4">
            Your AI-powered
            <br />
            Study Companion
          </h1>
          <p className="text-[#7f7b7b] text-base mb-8 max-w-md">
            Plan, track, and optimize your study time with AI-generated schedules and reminders.
          </p>
          <div className="flex gap-4">
            <Link
              href="/create-account"
              className="flex items-center gap-2 px-6 py-3 bg-[#e3c5c3] rounded-full font-medium"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="px-6 py-3 border border-[#a5a4a4] rounded-full font-medium">Learn More</button>
          </div>
        </div>
        <div className="absolute right-12 w-[45%] flex justify-center items-center">
          <Image
            src="https://s3-alpha-sig.figma.com/img/00dd/e3aa/a81168710b1de98ccda2f4a68f0de865?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RKhqSAC7PMuI5X~BWlNjBJ1sdHUUq-OLcYvL9L0ue059FMu2mFYOdcXwtG5kecWFY3BoyDmxdf~zbykC5T4ZAcvpLRxAvTQxcNKUjsNja32x2XgfnKM3qQZD1Pet3A7WdwSQZSEKOu1wx~s9pCMI-ugOUXPhS4TcmUNqW6WzbLG7~lEss~4UUCm5-jkn9JTSQRcDmM6oR7Vf~mP4yGUA6r5xbFGuthotjZqN0xxVl11YNg0drHFTW1nOepVODoF0u2AupvCo7V5KvuaIy66LKPXt2ik-VkorDdVgZ3qEwTt4zpknIDIU1290J-Sc0x0xpu3MPQ1pjEjC8Pf9vZs54w__"
            alt="Student studying with laptop"
            width={600}
            height={700}
            className="w-auto h-auto"
          />
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center items-center px-12 py-4 border-b border-[#e5e2e2]">
        <ChevronDown className="h-6 w-6 text-[#a5a4a4] relative top-7" />
      </div>

      {/* Features Section */}
      <section className="px-12 py-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-1">AI-Powered Features</h2>
          <p className="text-[#7f7b7b] text-base max-w-2xl mx-auto">
            Discover how our intelligent study companion transforms your academic journey
          </p>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {/* Feature 1 */}
          <div className="flex flex-col items-start">
            <div className="bg-[#23AFB6] bg-opacity-30 p-3 rounded-xl flex items-center gap-2 mb-2 w-full h-20">
              <Calendar className="h-8 w-8 flex-shrink-0" />
              <h3 className="text-left leading-tight font-semibold">
                Flexible
                <br />
                Calendar Views
              </h3>
            </div>
            <p className="text-xs text-[#7f7b7b] text-left">Monthly, Daily, Weekly, and List format</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start">
            <div className="bg-[#23AFB6] bg-opacity-30 p-3 rounded-xl flex items-center gap-2 mb-2 w-full h-20">
              <FileText className="h-8 w-8 flex-shrink-0" />
              <h3 className="text-left leading-tight font-semibold">
                Seamless
                <br />
                Integration
              </h3>
            </div>
            <p className="text-xs text-[#7f7b7b] text-left">Sync with Google Calendar and Blackboard</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start">
            <div className="bg-[#23AFB6] bg-opacity-30 p-3 rounded-xl flex items-center gap-2 mb-2 w-full h-20">
              <Users className="h-8 w-8 flex-shrink-0" />
              <h3 className="text-left leading-tight font-semibold">
                Collaboration
                <br />
                with Friends
              </h3>
            </div>
            <p className="text-xs text-[#7f7b7b] text-left">Plan events and share calendars with friends</p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-start">
            <div className="bg-[#23AFB6] bg-opacity-30 p-3 rounded-xl flex items-center gap-2 mb-2 w-full h-20">
              <Bell className="h-8 w-8 flex-shrink-0" />
              <h3 className="text-left leading-tight font-semibold">
                Smart
                <br />
                Notifications
              </h3>
            </div>
            <p className="text-xs text-[#7f7b7b] text-left">Real-time reminders for upcoming events</p>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col items-start">
            <div className="bg-[#23AFB6] bg-opacity-30 p-3 rounded-xl flex items-center gap-2 mb-2 w-full h-20">
              <CheckCircle className="h-8 w-8 flex-shrink-0" />
              <h3 className="text-left leading-tight font-semibold">
                Conflict
                <br />
                Detection
              </h3>
            </div>
            <p className="text-xs text-[#7f7b7b] text-left">AI automatically detects schedule conflicts</p>
          </div>
        </div>
      </section>
    </main>
  )
}
