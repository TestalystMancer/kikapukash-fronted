import React, { useState, useEffect } from 'react';
import { FiMenu, FiUser, FiBell, FiSettings, FiHome, FiPieChart, FiDollarSign, FiUsers } from 'react-icons/fi';
import { Outlet, Link } from "react-router-dom";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Heading,
    useToast,
  } from '@chakra-ui/react';
import { LuLogOut } from 'react-icons/lu';
import { BiSave } from 'react-icons/bi';
import NotificationBell from '@/pages/notifications/NotificationBell';

const DashboardLayout = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [userProfile, setUserProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');

            try {
            const response = await fetch('http://localhost:8000/api/users/me', {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            setUserProfile(data);
            } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            } finally {
            setLoading(false);
            }
        };

        fetchUsers();
    }, [toast]);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const backG = {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      };

    const menuItems = [
        { icon: <FiHome />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FiPieChart />, label: 'Users', path: '/users' },
        { icon: <FiDollarSign />, label: 'Transactions', path: '/dashboard/transactions' },
        { icon: <BiSave />, label: 'Saving Groups', path: '/dashboard/groups' },
    ];

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-white shadow-lg ${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
                <div className="p-4 flex items-center justify-between">
                    {!isSidebarCollapsed && <Link className='font-bold text-lg' to="/">KikapuKash</Link>}
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
                    <div 
                    className="flex items-center justify-end p-4 gap-4">
                        {/* <button className="p-2 hover:bg-gray-100 rounded-full">
                            <FiBell />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <FiSettings />
                        </button> */}
                        <NotificationBell />

                        <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                            <FiUser />
                            <Link className='font-bold text-lg' to="/dashboard/profile">
                                {userProfile?.first_name || JSON.parse(localStorage.getItem('user'))?.first_name}
                            </Link>
                            <span>
                            </span>

                        </button>

                        <button 
                        onClick={()=>logout()}

                        style={backG} className="bg-red-500 text-white p-1 hover:bg-gray-100 rounded-lg">
                            <LuLogOut />
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