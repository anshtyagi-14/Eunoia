import React from 'react'; // Corrected import
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define our navigation items in an array for easier mapping
const navItems = [
  { path: '/', name: 'Chat' },
  { path: '/journal', name: 'Journal' },
  { path: '/insights', name: 'Insights' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <nav className="w-64 bg-white p-5 border-r border-sky-100 flex flex-col">
      <div>
        <h1 className="text-3xl font-bold mb-10 text-sky-800">Eunoia ✨</h1>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path} className="relative">
              <NavLink
                to={item.path}
                className="block py-2 px-3 text-slate-600 transition-colors relative z-10"
              >
                {item.name}
              </NavLink>
              
              {/* This is the animated bubble, now tied to the active route */}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="active-bubble" // This ID tells Framer Motion to animate between elements
                  className="absolute inset-0 bg-sky-100 rounded-2xl z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;