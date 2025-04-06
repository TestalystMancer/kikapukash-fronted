// Header Component
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import LoginForm from '../auth/login/loginForm';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <header className="bg-white sticky top-0 z-50 shadow-md py-4 md:py-5">
        <div className="container mx-auto px-4 sm:px-5 max-w-7xl">
          <nav className="flex flex-wrap justify-between items-center">
            {/* Logo */}
            <a href="#" className="text-2xl sm:text-4xl font-bold">
              <span className="text-green-600">Kikapu</span>
              <span className="text-amber-500">Kash</span>
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6 text-gray-800" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Navigation Links */}
            <ul className={`${
              isMenuOpen ? 'block' : 'hidden'
              } md:flex flex-wrap items-center md:space-x-8 w-full md:w-auto mt-4 md:mt-0 transition-all duration-300 ease-in-out`}
            >
              <li className="py-2 md:py-0">
                <a 
                  href="#features" 
                  className="block font-medium text-gray-800 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
              </li>
              <li className="py-2 md:py-0">
                <a 
                  href="#how-it-works" 
                  className="block font-medium text-gray-800 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </a>
              </li>
              <li className="py-2 md:py-0">
                <a 
                  href="#testimonials" 
                  className="block font-medium text-gray-800 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </a>
              </li>
              <li className="py-2 md:py-0">
                <a 
                  href="#download" 
                  className="block font-medium text-gray-800 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Download
                </a>
              </li>

              <button 
                onClick={onOpen}
                className='rounded-full border px-6 py-1 cursor-pointer'>
                login
              </button>
            </ul>
          </nav>
        </div>
        <Modal  isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
          className="w-[70%] max-h-[20vh] "
          >
            <LoginForm/>
          </ModalContent>
        </Modal>
      </header>
    );
  };

  export default Header;