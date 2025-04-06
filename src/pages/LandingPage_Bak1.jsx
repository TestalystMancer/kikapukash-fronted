import React, { useState } from 'react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Features data
  const features = [
    {
      id: 'F1',
      title: 'Group Management',
      description: 'Create new savings groups, invite members, or join existing groups with ease. Set group goals, rules, and contribution schedules.',
      icon: 'users'
    },
    {
      id: 'F2',
      title: 'Contribution Tracking',
      description: 'Monitor individual and group contributions in real-time. Set reminders for due dates and view detailed reports on group progress.',
      icon: 'chart-line'
    },
    {
      id: 'F3',
      title: 'Withdrawal Requests',
      description: 'Request withdrawals whenever you need them. Track the status of your withdrawal requests with full transparency.',
      icon: 'money-bill-transfer'
    },
    {
      id: 'F4',
      title: 'Admin Approval',
      description: 'Administrators can review and approve withdrawal requests, manage member roles, and ensure group compliance with rules.',
      icon: 'user-shield'
    },
    {
      id: 'F5',
      title: 'Notifications & Reminders',
      description: 'Get timely alerts for upcoming deadlines, approved requests, and important group activities.',
      icon: 'bell'
    },
    {
      id: 'F6',
      title: 'Secure Transactions',
      description: 'Bank-grade encryption to protect your data. All financial transactions are secured and verified.',
      icon: 'lock'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      initials: 'JM',
      name: 'Jane Mwangi',
      role: 'Group Leader, Nairobi',
      text: 'KikapuKash has revolutionized how our community savings group operates. The transparency and ease of tracking has eliminated all the confusion we used to have.'
    },
    {
      initials: 'DO',
      name: 'David Ochieng',
      role: 'Group Member, Kisumu',
      text: 'I\'ve been part of savings groups for years, but KikapuKash makes everything so much easier. I can see my contributions, track group progress, and request withdrawals all in one place.'
    },
    {
      initials: 'FK',
      name: 'Faith Kamau',
      role: 'Group Admin, Mombasa',
      text: 'As a group administrator, KikapuKash has saved me countless hours of bookkeeping and made managing withdrawal requests much more organized. Highly recommended!'
    }
  ];

  // Social media icons
  const socialIcons = ['facebook', 'twitter', 'instagram', 'linkedin'];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Navigation Bar - Sticky */}
      <header className="bg-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-green-800">Kikapu</span>
            <span className="text-amber-500">Kash</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#features" className="text-gray-700 hover:text-green-800 transition-colors duration-300">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-700 hover:text-green-800 transition-colors duration-300">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-700 hover:text-green-800 transition-colors duration-300">Testimonials</a></li>
              <li><a href="#download" className="text-gray-700 hover:text-green-800 transition-colors duration-300">Download</a></li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4">
              <li><a href="#features" className="text-gray-700 hover:text-green-800 transition-colors duration-300 block" onClick={() => setMobileMenuOpen(false)}>Features</a></li>
              <li><a href="#how-it-works" className="text-gray-700 hover:text-green-800 transition-colors duration-300 block" onClick={() => setMobileMenuOpen(false)}>How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-700 hover:text-green-800 transition-colors duration-300 block" onClick={() => setMobileMenuOpen(false)}>Testimonials</a></li>
              <li><a href="#download" className="text-gray-700 hover:text-green-800 transition-colors duration-300 block" onClick={() => setMobileMenuOpen(false)}>Download</a></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section with Gradient and Dark Overlay */}
      <section className="relative py-32 px-4 text-white text-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-amber-700 to-amber-600"></div>
        
        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-black opacity-25"></div>
        
        {/* Content */}
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Group Savings Made Simple</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-shadow">
            Easily manage your savings groups, track contributions, and withdraw funds safely with 
            KikapuKash. The perfect platform for community-based financial management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg">
              CREATE A GROUP
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg">
              JOIN EXISTING GROUP
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Our Features</h2>
          
          {/* Grid with responsive layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.id} 
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-amber-100 text-amber-600">
                  <i className={`fas fa-${feature.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">{feature.title}</h3>
                <p className="text-gray-700 flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-green-800 text-center mb-16">How It Works</h2>
          
          {/* Steps in three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                1
              </div>
              <div className="h-16 w-16 flex items-center justify-center mb-4 text-amber-600">
                <i className="fas fa-users-gear text-4xl"></i>
              </div>
              <h3 className="text-green-800 font-bold text-xl mb-3 text-center">Create or Join a Group</h3>
              <p className="text-center text-gray-700">
                Set up your own savings group or join an existing one with a simple invitation code.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                2
              </div>
              <div className="h-16 w-16 flex items-center justify-center mb-4 text-amber-600">
                <i className="fas fa-hand-holding-dollar text-4xl"></i>
              </div>
              <h3 className="text-green-800 font-bold text-xl mb-3 text-center">Make Contributions</h3>
              <p className="text-center text-gray-700">
                Contribute to your group according to the set schedule. Track your contributions and group progress.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                3
              </div>
              <div className="h-16 w-16 flex items-center justify-center mb-4 text-amber-600">
                <i className="fas fa-money-bill-transfer text-4xl"></i>
              </div>
              <h3 className="text-green-800 font-bold text-xl mb-3 text-center">Request Withdrawals</h3>
              <p className="text-center text-gray-700">
                When you need funds, submit a withdrawal request that will be reviewed by group admins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-green-800 text-center mb-12">What Our Users Say</h2>
          
          {/* Grid with three columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 relative">
                {/* Quote icon in top-right corner */}
                <div className="absolute top-4 right-4 text-amber-500 opacity-20 text-4xl">
                  <i className="fas fa-quote-right"></i>
                </div>
                
                <p className="text-gray-700 italic mb-8 relative z-10">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-green-800 font-bold">{testimonial.name}</p>
                    <p className="text-amber-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="download" className="py-24 px-8">
        {/* Gradient background */}
        <div className="bg-gradient-to-r from-green-800 via-green-700 to-amber-600 py-16 px-8 text-center text-white rounded-xl shadow-xl max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-shadow">Get Started Today</h2>
          
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            Download our app or create an account online to start managing your savings groups efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <button className="bg-white text-green-800 rounded-full py-3 px-6 flex items-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:bg-gray-100">
              <i className="fab fa-google-play mr-2 text-xl"></i>
              <span>
                <span className="text-sm block text-left">Download on</span>
                <span className="font-bold">Google Play</span>
              </span>
            </button>
            
            <button className="bg-white text-green-800 rounded-full py-3 px-6 flex items-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:bg-gray-100">
              <i className="fab fa-apple mr-2 text-xl"></i>
              <span>
                <span className="text-sm block text-left">Download on</span>
                <span className="font-bold">App Store</span>
              </span>
            </button>
            
            <button className="bg-white text-green-800 rounded-full py-3 px-6 flex items-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:bg-gray-100">
              <i className="fas fa-globe mr-2 text-xl"></i>
              <span>
                <span className="text-sm block text-left">Create Account</span>
                <span className="font-bold">Web Version</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-16 px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* KikapuKash Column */}
          <div>
            <h3 className="text-amber-500 text-xl font-bold mb-4">KikapuKash</h3>
            <p className="text-gray-300 mb-4">
              The ultimate platform for group savings and contribution tracking. Simplify your group finances today.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((icon, index) => (
                <a  
                  key={index} 
                  href="#" 
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                >
                  <i className={`fab fa-${icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-amber-500 text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Testimonials</a></li>
              <li><a href="#download" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Download</a></li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div>
            <h3 className="text-amber-500 text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Security</a></li>
            </ul>
          </div>
          
          {/* Contact Us Column */}
          <div>
            <h3 className="text-amber-500 text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <i className="fas fa-envelope mr-2 text-amber-500"></i>
                info@kikapukash.com
              </li>
              <li className="text-gray-300">
                <i className="fas fa-phone mr-2 text-amber-500"></i>
                +254 700 000 000
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                  <i className="fas fa-headset mr-2"></i>
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
                  <i className="fas fa-circle-question mr-2"></i>
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
      </footer>
    </div>
  );
};

export default LandingPage;