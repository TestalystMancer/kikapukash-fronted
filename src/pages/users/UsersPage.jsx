import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Box,
  Heading,
  useToast,
} from '@chakra-ui/react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:8000/api/users/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
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

  return (
    <DashboardLayout>
        <div className="h-full bg-gray-100 p-8">
        <Box  mx="auto"  p={6} borderRadius="2xl">
            <Heading mb={4} size="lg">Users List</Heading>

            {loading ? (
            <Box textAlign="center" py={10}>
                <Spinner size="xl" />
            </Box>
            ) : (
            <Table variant="striped" colorScheme="teal">
                <Thead>
                <Tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                </Tr>
                </Thead>
                <Tbody>
                {users.map((user) => (
                    <Tr key={user.id}>
                    <Td>{user?.first_name}</Td>
                    <Td>{user?.last_name}</Td>
                    <Td>{user?.email}</Td>
                    <Td className='capitalize'>{user?.user_role || 'Member'}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            )}
        </Box>
        </div>
    </DashboardLayout>

  );
};

export default UsersPage;
