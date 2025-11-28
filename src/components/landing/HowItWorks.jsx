import React from 'react';

const HowItWorksSection = () => {
  // Step data for easier mapping
  const steps = [
    {
      number: 1,
      icon: "fas fa-user-plus",
      title: "Create or Join a Group",
      description: "Set up your own savings group or join an existing one with a simple invitation code."
    },
    {
      number: 2,
      icon: "fas fa-money-bill-wave",
      title: "Make Contributions",
      description: "Contribute to your group according to the set schedule. Track your contributions and group progress."
    },
    {
      number: 3,
      icon: "fas fa-comments-dollar",
      title: "Request Withdrawals",
      description: "When you need funds, submit a withdrawal request that will be reviewed by group admins."
    }
  ];

  return (
    <section id="how-it-works" className="bg-white mx-4 sm:mx-6 md:mx-8 lg:mx-auto  w-full rounded-xl shadow-md py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12 lg:mb-16 text-green-600">How It Works</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connector line between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-6 w-12 h-0.5 bg-amber-500"></div>
              )}
              
              {/* Step number circle */}
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5">
                {step.number}
              </div>
              
              {/* Step icon */}
              <div className="text-4xl text-amber-700 mb-4">
                <i className={step.icon}></i>
              </div>
              
              {/* Step content */}
              <h3 className="text-xl font-semibold mb-3 text-green-600">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;