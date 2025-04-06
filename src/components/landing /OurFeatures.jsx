import React from 'react';

const FeaturesSection = () => {
  // Feature data for easier mapping
  const features = [
    {
      icon: "fas fa-users",
      title: "Group Management",
      description: "Create new savings groups, invite members, or join existing groups with ease. Set group goals, rules, and contribution schedules."
    },
    {
      icon: "fas fa-chart-line",
      title: "Contribution Tracking",
      description: "Monitor individual and group contributions in real-time. Set reminders for due dates and view detailed reports on group progress."
    },
    {
      icon: "fas fa-hand-holding-usd",
      title: "Withdrawal Requests",
      description: "Request withdrawals whenever you need them. Track the status of your withdrawal requests with full transparency."
    },
    {
      icon: "fas fa-user-shield",
      title: "Admin Approval",
      description: "Group administrators can approve or decline withdrawal requests, manage members, and oversee group activities."
    },
    {
      icon: "fas fa-bell",
      title: "Notifications & Reminders",
      description: "Receive timely notifications about contribution deadlines, withdrawal approvals, and other important group activities."
    },
    {
      icon: "fas fa-lock",
      title: "Secure Transactions",
      description: "All financial transactions are encrypted and secure. Your financial information is always protected with KikapuKash."
    }
  ];

  return (
    <section id="features" className="bg-white mx-4 sm:mx-6 md:mx-8 lg:mx-auto w-full rounded-xl shadow-md py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12 lg:mb-16 text-green-600">Our Features</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-100 p-6 sm:p-8 rounded-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="text-5xl text-amber-500 mb-5">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;