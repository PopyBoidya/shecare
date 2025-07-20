import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-pink-50 border-t border-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description (2 cols) */}
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
            <p className="mt-4 text-gray-600 font-inter">
              Providing accessible menstrual hygiene <br /> products and education to everyone who needs them.
            </p>
          </div>

          {/* Quick Links and Get Involved side by side */}
          <div className="col-span-2 flex flex-wrap gap-8">
            {/* Quick Links */}
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-lg font-semibold mb-4 text-[#db2777] font-inter">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-[#db2777] font-inter">Home</Link></li>
                <li><Link to="/request-pad" className="text-gray-600 hover:text-[#db2777] font-inter">Request Pad</Link></li>
                <li><Link to="/pad-locations" className="text-gray-600 hover:text-[#db2777] font-inter">Pad Locations</Link></li>
                <li><Link to="/learn" className="text-gray-600 hover:text-[#db2777] font-inter">Learn</Link></li>
              </ul>
            </div>

            {/* Get Involved */}
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-lg font-semibold mb-4 text-[#db2777] font-inter">Get Involved</h3>
              <ul className="space-y-2">
                <li><Link to="/volunteer" className="text-gray-600 hover:text-[#db2777] font-inter">Apply for Volunteer</Link></li>
                <li><Link to="/donation" className="text-gray-600 hover:text-[#db2777] font-inter">Donate</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-[#db2777] font-inter">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#db2777] font-inter">Newsletter</h3>
            <p className="text-gray-600 mb-3">Get our latest updates and educational content.</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 font-inter rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#db2777]"
                required
              />
              <button
                type="submit"
                className="bg-[#db2777] text-white py-2 rounded-md hover:bg-pink-600 transition font-inter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm font-inter">
            &copy; {new Date().getFullYear()} SheCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
