import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Request Pad", to: "/request-pad" },
    { name: "Learn", to: "/learn" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#db2777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-hand-heart"
              >
                <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
                <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                <path d="m2 15 6 6" />
                <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
              </svg>
              <span className="font-inter text-xl font-bold text-[#db2777]">SheCare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`font-medium font-inter ${
                  currentPath === item.to
                    ? "text-[#db2777]"
                    : "text-gray-700 hover:text-[#dd91b3]"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/apply-volunteer"
              className={`px-4 py-2 rounded-md text-white font-medium font-inter transition-all ${
                currentPath === "/apply-volunteer"
                  ? "bg-[#db2777] hover:bg-[#c02669]"
                  : "bg-[#db2777]/80 hover:bg-[#db2777]"
              }`}
            >
              Apply for Volunteer
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-[#db2777]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-medium font-inter ${
                  currentPath === item.to
                    ? "text-[#db2777]"
                    : "text-gray-700 hover:text-[#db2777]"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/apply-volunteer"
              onClick={() => setIsMenuOpen(false)}
              className={`block w-fit px-4 py-2 rounded-md text-white font-medium font-inter ${
                currentPath === "/apply-volunteer"
                  ? "bg-[#db2777]"
                  : "bg-[#db2777]/90 hover:bg-[#db2777]"
              }`}
            >
              Apply for Volunteer
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
