import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Heading,
  Spinner,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, DownloadIcon, EmailIcon } from '@chakra-ui/icons';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  // Custom colors matching the transaction page
  const forestGreen = "#228B22";
  const amber = "#FFBF00";
  const bronze = "#CD7F32";
  const white = "#FFFFFF";
  const dark = "#333333";
  const lightGray = "#f5f5f5";

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

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    // Filter by role
    if (filterRole !== 'all' && user.user_role !== filterRole) {
      return false;
    }
    
    // Filter by search query (name or email)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = `${user.first_name} ${user.last_name}`.toLowerCase().includes(query);
      const emailMatch = user.email.toLowerCase().includes(query);
      
      if (!nameMatch && !emailMatch) {
        return false;
      }
    }
    
    return true;
  });

  const getRoleBadgeColor = (role) => {
    switch(role?.toLowerCase()) {
      case 'admin':
        return 'red';
      case 'manager':
        return 'purple';
      case 'moderator':
        return 'blue';
      default:
        return 'green';
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg={`linear-gradient(to bottom right, ${forestGreen}, ${amber}, ${bronze})`}>
        <Spinner size="xl" color={white} thickness="4px" />
      </Flex>
    );
  }

  return (
    <DashboardLayout>
      <Box
        w="full"
        position="relative"
        overflow="hidden"
      >
        <Box
          p={8}
          position="relative"
        >  
          {/* Content */}
          <Box position="relative" zIndex="1">
            <Flex direction="column" mb={6}>
              <Heading as="h2" size="xl" color={forestGreen} mb={2}>
                User Management
              </Heading>
              <Text color="gray.600" fontSize="md">
                View and manage all registered users in the system
              </Text>
            </Flex>

            {/* Filters */}
            <Flex 
              direction={{ base: "column", md: "row" }} 
              justify="space-between" 
              align={{ base: "flex-start", md: "center" }} 
              mb={6} 
              gap={4}
            >
              <HStack spacing={4} wrap="wrap">
                <InputGroup maxW={{ base: "full", md: "xs" }}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input 
                    placeholder="Search by name or email" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    background={lightGray}
                    focusBorderColor={forestGreen}
                  />
                </InputGroup>

                <Select 
                  value={filterRole} 
                  onChange={handleFilterChange}
                  bg={lightGray}
                  focusBorderColor={forestGreen}
                  w={{ base: "full", md: "auto" }}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="moderator">Moderator</option>
                  <option value="member">Member</option>
                </Select>
              </HStack>

              <Menu>
                <MenuButton 
                  as={Button} 
                  rightIcon={<ChevronDownIcon />}
                  bg={forestGreen}
                  color={white}
                  _hover={{ bg: amber }}
                  _active={{ bg: bronze }}
                >
                  Export
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<DownloadIcon />}>Export as CSV</MenuItem>
                  <MenuItem icon={<DownloadIcon />}>Export as PDF</MenuItem>
                  <MenuItem icon={<EmailIcon />}>Email Users List</MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            {/* Users Table */}
            <Box 
              borderRadius="lg" 
              overflow="hidden" 
              boxShadow="md"
              bg={white}
            >
              {users.length === 0 ? (
                <Center py={16} px={4} flexDirection="column">
                  <Box mb={4}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="70" 
                      height="70" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={forestGreen} 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </Box>
                  <Heading as="h3" size="md" color={dark} mb={2} textAlign="center">
                    No Users Found
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    There are no users in the system yet. Users will appear here once they register.
                  </Text>
                  <Button
                    mt={6}
                    bg={forestGreen}
                    color={white}
                    _hover={{ bg: amber }}
                    _active={{ bg: bronze }}
                    leftIcon={
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    }
                  >
                    Add New User
                  </Button>
                </Center>
              ) : filteredUsers.length === 0 ? (
                <Center py={16} px={4} flexDirection="column">
                  <Box mb={4}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="70" 
                      height="70" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={amber} 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </Box>
                  <Heading as="h3" size="md" color={dark} mb={2} textAlign="center">
                    No Matching Users
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    No users match your current filters. Try changing your search criteria or filter options.
                  </Text>
                  <Button
                    mt={6}
                    variant="outline"
                    colorScheme="green"
                    onClick={() => {
                      setFilterRole('all');
                      setSearchQuery('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </Center>
              ) : (
                <TableContainer>
                  <Table variant="simple">
                    <Thead bg={lightGray}>
                      <Tr>
                        <Th color={dark}>ID</Th>
                        <Th color={dark}>Name</Th>
                        <Th color={dark}>Email</Th>
                        <Th color={dark}>Role</Th>
                        <Th color={dark}>Status</Th>
                        <Th color={dark}>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredUsers.map((user) => (
                        <Tr key={user.id} _hover={{ bg: lightGray }}>
                          <Td fontWeight="medium">{user.id}</Td>
                          <Td>
                            <Flex align="center">
                              <Box 
                                borderRadius="full" 
                                bg={amber} 
                                color={dark} 
                                fontWeight="bold" 
                                h="35px" 
                                w="35px" 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center"
                                mr={3}
                              >
                                {user.first_name?.[0]}{user.last_name?.[0]}
                              </Box>
                              <Box>
                                <Text fontWeight="semibold">{user.first_name} {user.last_name}</Text>
                                <Text fontSize="sm" color="gray.500">User #{user.id}</Text>
                              </Box>
                            </Flex>
                          </Td>
                          <Td>
                            <Tooltip label="Send email">
                              <Text cursor="pointer" color="blue.500" _hover={{ textDecoration: "underline" }}>
                                {user.email}
                              </Text>
                            </Tooltip>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={getRoleBadgeColor(user.user_role)}
                              borderRadius="full"
                              px={3}
                              py={1}
                              textTransform="capitalize"
                            >
                              {user.user_role || 'Member'}
                            </Badge>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={user.is_active ? 'green' : 'gray'}
                              borderRadius="full"
                              px={3}
                              py={1}
                            >
                              {user.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </Td>
                          <Td>
                            <HStack spacing={2}>
                              <Button size="sm" colorScheme="blue" variant="outline">
                                Edit
                              </Button>
                              <Menu>
                                <MenuButton as={Button} size="sm" variant="ghost">
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                  </svg>
                                </MenuButton>
                                <MenuList>
                                  <MenuItem>View Profile</MenuItem>
                                  <MenuItem>Send Message</MenuItem>
                                  <MenuItem>Reset Password</MenuItem>
                                  <MenuItem color="red.500">Deactivate</MenuItem>
                                </MenuList>
                              </Menu>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </Box>

            {/* Summary Footer */}
            {users.length > 0 && (
              <Flex 
                justify="space-between" 
                align="center" 
                mt={6} 
                flexWrap="wrap"
                gap={4}
              >
                <Text color="gray.600">
                  Showing {filteredUsers.length} of {users.length} users
                </Text>
                <HStack spacing={4}>
                  {['admin', 'manager', 'moderator', 'member'].map(role => {
                    const count = users.filter(user => 
                      (user.user_role || 'member').toLowerCase() === role
                    ).length;
                    
                    return count > 0 ? (
                      <Box key={role} textAlign="right">
                        <Text fontSize="sm" color="gray.500" textTransform="capitalize">{role}s</Text>
                        <Text fontWeight="bold" color={`${getRoleBadgeColor(role)}.500`}>
                          {count}
                        </Text>
                      </Box>
                    ) : null;
                  })}
                </HStack>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default UsersPage;