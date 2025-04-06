import React from 'react';
import { FaGooglePlay, FaApple, FaGlobe, FaEnvelope, FaPhone, FaHeadset, FaQuestionCircle, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Header from '../components/global/Header';
import FeaturesSection from '../components/landing /OurFeatures';
import HowItWorksSection from '../components/landing /HowItWorks';
import TestimonialsSection from '../components/landing /WhatOurUsersSay';
import GetStartedAndFooter from '../components/landing /GetStartedAndFooter';

// Import components

const Divider = ()=>{
  return (
    <div className='border-b w-full'>
  
    </div>
  )

}
const App = () => {
  return (
    <div className='max-w-screen bg-gradient-to-br from-[#228B22] via-[#FFBF00] to-[#CD7F32] text-[#333333] leading-[1.6]'>
      <Header />
      <main className='flex flex-col w-full gap-6 p-4'>
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>
      <GetStartedAndFooter />
    </div>
  );
};

export default App;