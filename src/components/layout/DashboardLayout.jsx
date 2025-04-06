import React, { useState } from 'react';
import { FiMenu, FiUser, FiBell, FiSettings, FiHome, FiPieChart, FiDollarSign, FiUsers } from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const menuItems = [
        { icon: <FiHome />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FiPieChart />, label: 'Wallet', path: '/wallet' },
        { icon: <FiPieChart />, label: 'Users', path: '/users' },
        { icon: <FiDollarSign />, label: 'Transactions', path: '/transactions' },
        { icon: <FiUsers />, label: 'Customers', path: '/customers' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-white shadow-lg ${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
                <div className="p-4 flex items-center justify-between">
                    {!isSidebarCollapsed && <h2 className="text-xl font-bold">KikapuKash</h2>}
                    <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
                        <FiMenu />
                    </button>
                </div>
                <nav className="mt-4">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.path}
                            className="flex items-center p-4 hover:bg-gray-100"
                        >
                            <span className="text-xl">{item.icon}</span>
                            {!isSidebarCollapsed && <span className="ml-4">{item.label}</span>}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-end p-4 space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <FiBell />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <FiSettings />
                        </button>
                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                            <FiUser />
                            <span>John Doe</span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;