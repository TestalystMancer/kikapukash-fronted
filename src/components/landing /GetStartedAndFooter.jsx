import React from 'react';
import { FaGooglePlay, FaApple, FaGlobe, FaEnvelope, FaPhone, FaHeadset, FaQuestionCircle, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const GetStartedAndFooter = () => {
  const socialIcons = ['facebook', 'twitter', 'instagram', 'linkedin'];
  
  // Map for converting icon names to React Icons
  const socialIconMap = {
    'facebook': <FaFacebook />,
    'twitter': <FaTwitter />,
    'instagram': <FaInstagram />,
    'linkedin': <FaLinkedin />
  };
  
  return (
    <div className="w-full">
      {/* Get Started Section with gradient background */}
      <div className="bg-gradient-to-r from-green-600 w-full via-lime-500 to-yellow-500 py-16 px-8 text-center text-white">
        <h2 className="text-5xl font-bold mb-8">Get Started Today</h2>
        
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          Download our app or create an account online to start managing your savings groups efficiently.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-green-600 rounded-full py-2 px-5 flex items-center transform hover:scale-105 transition-all duration-300 shadow hover:shadow-md">
            <FaGooglePlay className="mr-2 text-lg" />
            <span>
              <span className="text-xs block text-left">Download on</span>
              <span className="font-bold text-sm">Google Play</span>
            </span>
          </button>
          
          <button className="bg-white text-green-600 rounded-full py-2 px-5 flex items-center transform hover:scale-105 transition-all duration-300 shadow hover:shadow-md">
            <FaApple className="mr-2 text-lg" />
            <span>
              <span className="text-xs block text-left">Download on</span>
              <span className="font-bold text-sm">App Store</span>
            </span>
          </button>
          
          <button className="bg-white text-green-600 rounded-full py-2 px-5 flex items-center transform hover:scale-105 transition-all duration-300 shadow hover:shadow-md">
            <FaGlobe className="mr-2 text-lg" />
            <span>
              <span className="text-xs block text-left">Create Account</span>
              <span className="font-bold text-sm">Web Version</span>
            </span>
          </button>
        </div>
      </div>
      
      {/* Yellow bar */}
      <div className="h-4 bg-yellow-500"></div>
      
      {/* Footer */}
      <div className="bg-gray-800 text-white py-12 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* KikapuKash Column */}
          <div>
            <h3 className="text-yellow-500 text-xl font-bold mb-4">KikapuKash</h3>
            <p className="text-gray-300 mb-4">
              The ultimate platform for group savings and contribution tracking. Simplify your group finances today.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((icon, index) => (
                <a  
                  key={index} 
                  href="#" 
                  className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  {socialIconMap[icon]}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-yellow-500 text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">Testimonials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">Download</a></li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div>
            <h3 className="text-yellow-500 text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">Security</a></li>
            </ul>
          </div>
          
          {/* Contact Us Column */}
          <div>
            <h3 className="text-yellow-500 text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">
                <FaEnvelope className="inline mr-2 text-yellow-500" />
                info@kikapukash.com
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">
                <FaPhone className="inline mr-2 text-yellow-500" />
                +254 700 000 000
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 inline-flex items-center">
                  <FaHeadset className="inline mr-2 text-yellow-500" />
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 inline-flex items-center">
                  <FaQuestionCircle className="inline mr-2 text-yellow-500" />
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm max-w-6xl mx-auto">
          <p>© 2025 KikapuKash. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default GetStartedAndFooter;