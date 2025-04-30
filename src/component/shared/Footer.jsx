const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-pink-500 mb-3">DK-GADGET</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering your shopping experience with quality and trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-pink-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-pink-400 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-pink-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>Email: <a href="mailto:gdk29928@gmail.com" className="hover:text-pink-400">gdk29928@gmail.com</a></li>
            <li>Phone: <a href="tel:+8801622980679" className="hover:text-pink-400">+8801622980679</a></li>
            <li>Location: Chittagong, Bangladesh</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://www.facebook.com/share/1BtCW2giM3" target="_blank" className="hover:text-pink-400 transition">Facebook</a>
            <a href="#" className="hover:text-pink-400 transition">Instagram</a>
            <a href="#" className="hover:text-pink-400 transition">Twitter</a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} DK-GADGET. All rights reserved.
      </div>

      <div className="text-center text-sm text-gray-400 mt-2">
        Developed by <span className="text-pink-500 font-semibold">Shanto Deb (shantodev027@gmail.com)</span>
      </div>
    </footer>
  );
};

export default Footer;
