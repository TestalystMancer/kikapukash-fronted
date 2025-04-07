import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Heading,
  Alert,
  AlertIcon,
  Avatar,
  Divider,
  Spinner,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UserProfile = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Custom colors from your signup form
  const forestGreen = "#228B22";
  const amber = "#FFBF00";
  const bronze = "#CD7F32";
  const white = "#FFFFFF";
  const dark = "#333333";
  const lightGray = "#f5f5f5";

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:8000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        setUserProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
        });
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

    fetchUserProfile();
  }, [toast]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userProfile?.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUserProfile(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/api/users/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      
      toast({
        title: 'Success',
        description: 'Password updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userProfile) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg={`linear-gradient(to bottom right, ${forestGreen}, ${amber}, ${bronze})`}>
        <Spinner size="xl" color={white} thickness="4px" />
      </Flex>
    );
  }

  const getInitials = () => {
    if (!userProfile) return "U";
    return `${userProfile.first_name?.[0] || ''}${userProfile.last_name?.[0] || ''}`;
  };

  return (
    <DashboardLayout className="flex items-center justify-center p-4" >
      <Box
        w="full"
        maxW="4xl"
        position="relative"
        overflow="hidden"
      >
        <Box
          bg={white}
          borderRadius="2xl"
          boxShadow="2xl"
          p={8}
          position="relative"
        >
          {/* Decorative circles */}
          <Box 
            position="absolute" 
            top="-40px" 
            right="-40px" 
            w="160px" 
            h="160px" 
            borderRadius="full" 
            bg={amber} 
            opacity="0.2" 
          />
          <Box 
            position="absolute" 
            bottom="-40px" 
            left="-40px" 
            w="128px" 
            h="128px" 
            borderRadius="full" 
            bg={bronze} 
            opacity="0.2" 
          />
          
          {/* Content */}
          <Box position="relative" zIndex="1">
            <Flex direction="column" align="center" mb={6}>
              <Avatar 
                size="2xl" 
                name={`${userProfile?.first_name} ${userProfile?.last_name}`} 
                bg={forestGreen}
                color={white}
                mb={4}
              >
                {getInitials()}
              </Avatar>
              <Heading as="h2" size="xl" textAlign="center" color={forestGreen}>
                {userProfile?.first_name} {userProfile?.last_name}
              </Heading>
              <Text color="gray.500" fontSize="md">
                Member since {new Date(userProfile?.created_at || Date.now()).toLocaleDateString()}
              </Text>
            </Flex>

            {error && (
              <Alert status="error" borderRadius="md" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Tabs variant="soft-rounded" colorScheme="green" mt={6}>
              <TabList justifyContent="center" mb={6}>
                <Tab _selected={{ bg: forestGreen, color: white }}>Profile</Tab>
                <Tab _selected={{ bg: forestGreen, color: white }}>Account Activity</Tab>
                <Tab _selected={{ bg: forestGreen, color: white }}>Settings</Tab>
              </TabList>
              
              <TabPanels>
                {/* Profile Tab */}
                <TabPanel>
                  <form onSubmit={handleProfileUpdate}>
                    <Stack spacing={5}>
                      <FormControl id="first_name">
                        <FormLabel color={dark}>First Name</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="gray">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            }
                          />
                          <Input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                            size="lg"
                            background={lightGray}
                            focusBorderColor={forestGreen}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl id="last_name">
                        <FormLabel color={dark}>Last Name</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="gray">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            }
                          />
                          <Input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                            size="lg"
                            background={lightGray}
                            focusBorderColor={forestGreen}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl id="email">
                        <FormLabel color={dark}>Email Address</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<EmailIcon color="gray.400" />}
                          />
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            size="lg"
                            background={lightGray}
                            focusBorderColor={forestGreen}
                          />
                        </InputGroup>
                      </FormControl>

                      <Flex justify="space-between" mt={4}>
                        <Button
                          onClick={onOpen}
                          variant="outline"
                          size="lg"
                          borderColor={forestGreen}
                          color={forestGreen}
                          _hover={{ bg: lightGray }}
                          leftIcon={<LockIcon />}
                        >
                          Change Password
                        </Button>
                        
                        <Button
                          type="submit"
                          bg={forestGreen}
                          color={white}
                          size="lg"
                          _hover={{ bg: amber }}
                          _active={{ bg: bronze }}
                          isLoading={loading}
                          leftIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          }
                        >
                          Save Changes
                        </Button>
                      </Flex>
                    </Stack>
                  </form>
                </TabPanel>

                {/* Account Activity Tab */}
                <TabPanel>
                  <Stack spacing={4}>
                    <Heading as="h3" size="md" mb={4} color={forestGreen}>
                      Recent Account Activity
                    </Heading>
                    
                    {[...Array(5)].map((_, i) => (
                      <Box key={i} p={4} borderRadius="md" bg={lightGray}>
                        <Flex justify="space-between" align="center">
                          <Box>
                            <Text fontWeight="bold" color={dark}>
                              {i === 0 ? "Password changed" : 
                               i === 1 ? "Profile updated" : 
                               i === 2 ? "Logged in from new device" : 
                               i === 3 ? "Email verified" :
                               "Account created"}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {new Date(Date.now() - (i * 86400000)).toLocaleString()}
                            </Text>
                          </Box>
                          <Box>
                            {i <= 1 ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={forestGreen}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="gray">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            )}
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </Stack>
                </TabPanel>

                {/* Settings Tab */}
                <TabPanel>
                  <Stack spacing={6}>
                    <Heading as="h3" size="md" mb={2} color={forestGreen}>
                      Account Settings
                    </Heading>

                    <Box p={5} borderRadius="md" bg={lightGray}>
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="bold" color={dark}>Email Notifications</Text>
                          <Text fontSize="sm" color="gray.500">Receive updates about your account activity</Text>
                        </Box>
                        <Button size="sm" colorScheme="green">Enabled</Button>
                      </Flex>
                    </Box>

                    <Box p={5} borderRadius="md" bg={lightGray}>
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="bold" color={dark}>Two-Factor Authentication</Text>
                          <Text fontSize="sm" color="gray.500">Add an extra layer of security to your account</Text>
                        </Box>
                        <Button size="sm" variant="outline" colorScheme="green">Enable</Button>
                      </Flex>
                    </Box>

                    <Box p={5} borderRadius="md" bg={lightGray}>
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="bold" color={dark}>Data Privacy</Text>
                          <Text fontSize="sm" color="gray.500">Manage how your data is used and shared</Text>
                        </Box>
                        <Button size="sm" colorScheme="green">Manage</Button>
                      </Flex>
                    </Box>

                    <Box p={5} borderRadius="md" bg={lightGray}>
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="bold" color="red.500">Delete Account</Text>
                          <Text fontSize="sm" color="gray.500">Permanently delete your account and all data</Text>
                        </Box>
                        <Button size="sm" colorScheme="red">Delete</Button>
                      </Flex>
                    </Box>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>

      {/* Password Change Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={forestGreen}>Change Password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handlePasswordUpdate}>
            <ModalBody>
              <Stack spacing={4}>
                <FormControl id="currentPassword" isRequired>
                  <FormLabel color={dark}>Current Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<LockIcon color="gray.400" />}
                    />
                    <Input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      background={lightGray}
                      focusBorderColor={forestGreen}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="newPassword" isRequired>
                  <FormLabel color={dark}>New Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<LockIcon color="gray.400" />}
                    />
                    <Input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      background={lightGray}
                      focusBorderColor={forestGreen}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="confirmPassword" isRequired>
                  <FormLabel color={dark}>Confirm New Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<LockIcon color="gray.400" />}
                    />
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      background={lightGray}
                      focusBorderColor={forestGreen}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit"
                colorScheme="green" 
                isLoading={loading}
                bg={forestGreen}
                _hover={{ bg: amber }}
              >
                Update Password
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
};

export default UserProfile;