import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
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
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  Textarea,
  useDisclosure,
  Stack,
  Checkbox,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, DownloadIcon, AddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import DashboardLayout from '../../components/layout/DashboardLayout';

const SavingsGroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const toast = useToast();
  
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isAddMemberOpen, onOpen: onAddMemberOpen, onClose: onAddMemberClose } = useDisclosure();
  
  const [currentGroup, setCurrentGroup] = useState(null);
  const [newGroup, setNewGroup] = useState({
    group_name: '',
    target_amount: 0,
    description: '',
  });
  
  const [newMember, setNewMember] = useState({
    user: 0,
    is_admin: false
  });

  // Custom colors matching the other pages
  const forestGreen = "#228B22";
  const amber = "#FFBF00";
  const bronze = "#CD7F32";
  const white = "#FFFFFF";
  const dark = "#333333";
  const lightGray = "#f5f5f5";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      try {
        // Fetch groups
        const groupsResponse = await fetch('https://kikapukash-backend-production.up.railway.app/api/groups/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!groupsResponse.ok) {
          throw new Error('Failed to fetch savings groups');
        }

        const groupsData = await groupsResponse.json();
        setGroups(groupsData);
        
        // Fetch users for adding members
        const usersResponse = await fetch('https://kikapukash-backend-production.up.railway.app/api/users/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData = await usersResponse.json();
        setUsers(usersData);
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

    fetchData();
  }, [toast]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCreateGroup = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('https://kikapukash-backend-production.up.railway.app/api/groups/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newGroup,
        //   created_by: JSON.parse(localStorage.getItem('user')).id || 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create savings group');
      }

      const createdGroup = await response.json();
      
      // Update groups list with the new group
      setGroups([createdGroup, ...groups]);
      
      toast({
        title: 'Success',
        description: 'Savings group created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form and close modal
      setNewGroup({
        group_name: '',
        target_amount: 0,
        description: '',
      });
      onCreateClose();
      
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddMember = async () => {
    const token = localStorage.getItem('token');
    console.log(newMember, 'meeember');
    
    
    try {
      const response = await fetch(`https://kikapukash-backend-production.up.railway.app/api/group-members/add_member/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id:newMember?.user, group_id:currentGroup.id}),
      });

      if (!response.ok) {
        throw new Error('Failed to add member to group');
      }

      toast({
        title: 'Success',
        description: 'Member added to group successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form and close modal
      setNewMember({
        user: 0,
        is_admin: false
      });
      onAddMemberClose();
      
      // Refresh groups to get updated member list
      const updatedGroupsResponse = await fetch('https://kikapukash-backend-production.up.railway.app/api/groups/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (updatedGroupsResponse.ok) {
        const updatedGroups = await updatedGroupsResponse.json();
        setGroups(updatedGroups);
      }
      
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openAddMemberModal = (group) => {
    setCurrentGroup(group);
    onAddMemberOpen();
  };

  const filteredGroups = groups.filter(group => {
    // Filter by search query (name or description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = group.group_name.toLowerCase().includes(query);
      const descMatch = group.description.toLowerCase().includes(query);
      
      if (!nameMatch && !descMatch) {
        return false;
      }
    }
    
    return true;
  });

  // Sort groups based on sort order
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    
    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else if (sortOrder === 'oldest') {
      return dateA - dateB;
    } else if (sortOrder === 'highest') {
      return b.target_amount - a.target_amount;
    } else if (sortOrder === 'lowest') {
      return a.target_amount - b.target_amount;
    }
    return 0;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
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
                Savings Groups
              </Heading>
              <Text color="gray.600" fontSize="md">
                Manage your savings groups and track collective progress
              </Text>
            </Flex>

            {/* Filters and Actions */}
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
                    placeholder="Search by name or description" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    background={lightGray}
                    focusBorderColor={forestGreen}
                  />
                </InputGroup>

                <Select 
                  value={sortOrder} 
                  onChange={handleSortChange}
                  bg={lightGray}
                  focusBorderColor={forestGreen}
                  w={{ base: "full", md: "auto" }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Target</option>
                  <option value="lowest">Lowest Target</option>
                </Select>
              </HStack>

              <Button
                leftIcon={<AddIcon />}
                bg={forestGreen}
                color={white}
                _hover={{ bg: amber }}
                _active={{ bg: bronze }}
                onClick={onCreateOpen}
              >
                Create New Group
              </Button>
            </Flex>

            {/* Groups Table */}
            <Box 
              borderRadius="lg" 
              overflow="hidden" 
              boxShadow="md"
              bg={white}
            >
              {groups.length === 0 ? (
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </Box>
                  <Heading as="h3" size="md" color={dark} mb={2} textAlign="center">
                    No Savings Groups Found
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    You haven't created any savings groups yet. Create a new group to start saving collectively.
                  </Text>
                  <Button
                    mt={6}
                    bg={forestGreen}
                    color={white}
                    _hover={{ bg: amber }}
                    _active={{ bg: bronze }}
                    onClick={onCreateOpen}
                    leftIcon={<AddIcon />}
                  >
                    Create Your First Group
                  </Button>
                </Center>
              ) : filteredGroups.length === 0 ? (
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
                    No Matching Groups
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    No savings groups match your search criteria. Try changing your search.
                  </Text>
                  <Button
                    mt={6}
                    variant="outline"
                    colorScheme="green"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                </Center>
              ) : (
                <TableContainer>
                  <Table variant="simple">
                    <Thead bg={lightGray}>
                      <Tr>
                        <Th color={dark}>Group Name</Th>
                        <Th color={dark}>Target Amount</Th>
                        <Th color={dark}>Members</Th>
                        <Th color={dark}>Created On</Th>
                        <Th color={dark}>Progress</Th>
                        <Th color={dark}>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sortedGroups.map((group) => {
                        // Calculate progress (assuming there's a current_amount field)
                        const progress = (group.current_amount || 0) / group.target_amount * 100;
                        const progressPercentage = Math.min(Math.max(progress, 0), 100).toFixed(1);
                        
                        return (
                          <Tr key={group.id} _hover={{ bg: lightGray }}>
                            <Td>
                              <Flex align="center">
                                <Box 
                                  borderRadius="md" 
                                  bg={forestGreen} 
                                  color={white} 
                                  h="40px" 
                                  w="40px" 
                                  display="flex" 
                                  alignItems="center" 
                                  justifyContent="center"
                                  mr={3}
                                  fontSize="lg"
                                  fontWeight="bold"
                                >
                                  {group.group_name.charAt(0).toUpperCase()}
                                </Box>
                                <Box>
                                  <Text fontWeight="semibold">{group.group_name}</Text>
                                  <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                    {group.description}
                                  </Text>
                                </Box>
                              </Flex>
                            </Td>
                            <Td fontWeight="semibold">{formatCurrency(group.target_amount)}</Td>
                            <Td>
                              <Flex align="center">
                                <Text fontWeight="medium">{group.members?.length || 0}</Text>
                                <Button 
                                  size="xs" 
                                  ml={2} 
                                  colorScheme="green" 
                                  variant="outline"
                                  onClick={() => openAddMemberModal(group)}
                                >
                                  <PlusSquareIcon />
                                </Button>
                              </Flex>
                            </Td>
                            <Td>{formatDate(group.created_at)}</Td>
                            <Td>
                              <Flex align="center" direction="column">
                                <Box w="full" bg="gray.200" rounded="full" h="8px" mb={1}>
                                  <Box
                                    w={`${progressPercentage}%`}
                                    bg={progressPercentage < 30 ? amber : progressPercentage < 70 ? bronze : forestGreen}
                                    h="8px"
                                    rounded="full"
                                  />
                                </Box>
                                <Text fontSize="xs" color="gray.600">
                                  {formatCurrency(group.current_amount || 0)} of {formatCurrency(group.target_amount)} ({progressPercentage}%)
                                </Text>
                              </Flex>
                            </Td>
                            <Td>
                              <HStack spacing={2}>
                                <Button size="sm" colorScheme="blue" variant="outline">
                                  View Details
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
                                    <MenuItem onClick={() => openAddMemberModal(group)}>Add Member</MenuItem>
                                    <MenuItem>Update Target</MenuItem>
                                    <MenuItem>Edit Details</MenuItem>
                                    <MenuItem color="red.500">Delete Group</MenuItem>
                                  </MenuList>
                                </Menu>
                              </HStack>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </Box>

            {/* Summary Footer */}
            {groups.length > 0 && (
              <Flex 
                justify="space-between" 
                align="center" 
                mt={6} 
                flexWrap="wrap"
                gap={4}
              >
                <Text color="gray.600">
                  Showing {filteredGroups.length} of {groups.length} savings groups
                </Text>
                <HStack spacing={4} divider={<Box borderLeft="1px" borderColor="gray.300" h="30px" />}>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.500">Total Groups</Text>
                    <Text fontWeight="bold" color={forestGreen}>
                      {groups.length}
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.500">Total Target Amount</Text>
                    <Text fontWeight="bold" color={forestGreen}>
                      {formatCurrency(
                        groups.reduce((sum, group) => sum + parseFloat(group.target_amount), 0)
                      )}
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.500">Current Savings</Text>
                    <Text fontWeight="bold" color={forestGreen}>
                      {formatCurrency(
                        groups.reduce((sum, group) => sum + parseFloat(group.current_amount || 0), 0)
                      )}
                    </Text>
                  </Box>
                </HStack>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
      
      {/* Create Group Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={forestGreen}>Create New Savings Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Group Name</FormLabel>
                <Input 
                  value={newGroup.group_name}
                  onChange={(e) => setNewGroup({...newGroup, group_name: e.target.value})}
                  placeholder="Enter group name"
                  focusBorderColor={forestGreen}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Target Amount</FormLabel>
                <NumberInput 
                  value={newGroup.target_amount}
                  onChange={(value) => setNewGroup({...newGroup, target_amount: Number(value)})}
                  min={0}
                  focusBorderColor={forestGreen}
                >
                  <NumberInputField placeholder="Enter target amount" />
                </NumberInput>
                <FormHelperText>Total amount the group aims to save</FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  placeholder="Describe the purpose of this savings group"
                  focusBorderColor={forestGreen}
                  resize="vertical"
                  rows={3}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onCreateClose}>
              Cancel
            </Button>
            <Button 
              bg={forestGreen}
              color={white}
              _hover={{ bg: amber }}
              onClick={handleCreateGroup}
            >
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Add Member Modal */}
      <Modal isOpen={isAddMemberOpen} onClose={onAddMemberClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={forestGreen}>
            Add Member to {currentGroup?.group_name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Select User</FormLabel>
                <Select 
                  placeholder="Select user to add" 
                  value={newMember.user}
                  onChange={(e) => setNewMember({...newMember, user: Number(e.target.value)})}
                  focusBorderColor={forestGreen}
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name} ({user.email})
                    </option>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl>
                <Checkbox 
                  isChecked={newMember.is_admin}
                  onChange={(e) => setNewMember({...newMember, is_admin: e.target.checked})}
                  colorScheme="green"
                >
                  Make this user an admin of the group
                </Checkbox>
                <FormHelperText>Admins can add/remove members and update group details</FormHelperText>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onAddMemberClose}>
              Cancel
            </Button>
            <Button 
              bg={forestGreen}
              color={white}
              _hover={{ bg: amber }}
              onClick={handleAddMember}
            >
              Add Member
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
};

export default SavingsGroupPage;