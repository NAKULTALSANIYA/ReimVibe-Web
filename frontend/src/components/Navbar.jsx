import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import navlogo from "../assets/images/reimvibes-fav.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bgname shadow-md px-10 py-4 text-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl">
        <div className="flex items-center gap-3 font-semibold">
          <img src={navlogo} alt="Reimvibe Logo" className="h-[50px] w-[50px] object-contain bg-white rounded-full"/>
          ReimVibe Technologies
        </div>
        </Link>
        {/* reimvibes-navbar */}

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-semibold">
          <li><Link to="/" className={`hover:text-[#1abc9c] ${isActive('/') ? 'text-[#1abc9c]' : ''}`}>Home</Link></li>
          <li><Link to="/about" className={`hover:text-[#1abc9c] ${isActive('/about') ? 'text-[#1abc9c]' : ''}`}>About</Link></li>
          <li><Link to="/services" className={`hover:text-[#1abc9c] ${isActive('/services') ? 'text-[#1abc9c]' : ''}`}>Services</Link></li>
          <li><Link to="/portfolio" className={`hover:text-[#1abc9c] ${isActive('/portfolio') ? 'text-[#1abc9c]' : ''}`}>Portfolio</Link></li>
          <li><Link to="/careers" className={`hover:text-[#1abc9c] ${isActive('/careers') ? 'text-[#1abc9c]' : ''}`}>Careers</Link></li>
          <li><Link to="/contact" className={`hover:text-[#1abc9c] ${isActive('/contact') ? 'text-[#1abc9c]' : ''}`}>Contact</Link></li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 bgname text-white p-4 rounded-lg shadow-md">
          <li><Link to="/" onClick={() => setIsOpen(false)} className={`hover:text-[#1abc9c] ${isActive('/') ? 'text-[#1abc9c]' : ''}`}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)} className={`hover:text-[#1abc9c] ${isActive('/about') ? 'text-[#1abc9c]' : ''}`}>About</Link></li>
          <li><Link to="/services" onClick={() => setIsOpen(false)} className={`hover:text-[#1abc9c] ${isActive('/services') ? 'text-[#1abc9c]' : ''}`}>Services</Link></li>
          <li><Link to="/portfolio" onClick={() => setIsOpen(false)} className={`hover:text-[#1abc9c] ${isActive('/portfolio') ? 'text-[#1abc9c]' : ''}`}>Portfolio</Link></li>
          <li><Link to="/careers" onClick={() => setIsOpen(false)} className={`hover:text-[#1abc9c] ${isActive('/careers') ? 'text-[#1abc9c]' : ''}`}>Careers</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)} className={`hover:text-[#1abc9c] ${isActive('/contact') ? 'text-[#1abc9c]' : ''}`}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
}
