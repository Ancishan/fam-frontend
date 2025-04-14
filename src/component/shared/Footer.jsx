const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white pt-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-3">FAM</h2>
            <p className="text-gray-400 text-sm">
              Empowering your shopping experience with quality and trust.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>Email: famshoponline2210@gmail.com</li>
              <li>Phone: +8801976404704</li>
              <li>Location: Chittagong, Bangladesh</li>
            </ul>
          </div>
  
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61573054412142" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} FAM. All rights reserved.
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 pb-2 text-center text-sm text-gray-400">
         developed by <span className="via-purple-700">Shanto Deb(shantodev027@gmail.com)</span>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  