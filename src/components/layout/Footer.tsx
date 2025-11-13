import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-orange-600 font-bold text-2xl mb-4">KatWatch</h3>
            <p className="text-white/60 text-sm">
              Stream unlimited movies and series. R89/month.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-center text-white/60 text-sm">
          <p>&copy; 2025 KatWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
