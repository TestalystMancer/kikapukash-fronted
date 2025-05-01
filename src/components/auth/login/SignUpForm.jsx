import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
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
  Link,
  Heading,
  Alert,
  AlertIcon,
  FormHelperText,
  Divider,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    // Custom colors for our savings platform
    const forestGreen = "#228B22"; // Forest Green
    const amber = "#FFBF00"; // Amber
    const bronze = "#CD7F32"; // Bronze
    const white = "#FFFFFF";
    const dark = "#333333";
    const lightGray = "#f5f5f5";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        try {
            // Send signup request
            const response = await axios.post('https://kikapukash-backend-production.up.railway.app/api/users/', {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
            });
            
            if (response.data.success) {
                // Redirect to login page
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="h-full flex items-center justify-center p-4" style={{
            background: `linear-gradient(to bottom right, ${forestGreen}, ${amber}, ${bronze})`
        }}>
            <Box
                w="full"
                maxW="md"
                position="relative"
                overflow="hidden"
            >
                {/* Card with decorative elements */}
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
                        {/* Logo/Header */}
                        <Flex justify="center" mb={6}>
                            <Flex 
                                h="64px" 
                                w="64px" 
                                borderRadius="full" 
                                bg={forestGreen} 
                                color={white} 
                                alignItems="center" 
                                justifyContent="center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Flex>
                        </Flex>

                        <Heading as="h2" size="xl" textAlign="center" color={forestGreen} mb={6}>
                            Create Account
                        </Heading>

                        {error && (
                            <Alert status="error" borderRadius="md" mb={4}>
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={5}>
                                <FormControl id="first_name" isRequired>
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
                                            placeholder="John Doe"
                                            size="lg"
                                            background={lightGray}
                                            focusBorderColor={forestGreen}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl id="last_name" isRequired>
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
                                            placeholder="John Doe"
                                            size="lg"
                                            background={lightGray}
                                            focusBorderColor={forestGreen}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl id="email" isRequired>
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

                                <FormControl id="password" isRequired>
                                    <FormLabel color={dark}>Password</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<LockIcon color="gray.400" />}
                                        />
                                        <Input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            size="lg"
                                            background={lightGray}
                                            focusBorderColor={forestGreen}
                                        />
                                    </InputGroup>
                                    <FormHelperText color="gray.500">
                                        Must be at least 8 characters with a mix of letters, numbers, and symbols
                                    </FormHelperText>
                                </FormControl>

                                <FormControl id="confirmPassword" isRequired>
                                    <FormLabel color={dark}>Confirm Password</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<LockIcon color="gray.400" />}
                                        />
                                        <Input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            size="lg"
                                            background={lightGray}
                                            focusBorderColor={forestGreen}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <Button
                                    type="submit"
                                    bg={forestGreen}
                                    color={white}
                                    size="lg"
                                    mt={2}
                                    _hover={{ bg: amber }}
                                    _active={{ bg: bronze }}
                                    leftIcon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    }
                                >
                                    Create Account
                                </Button>
                            </Stack>
                        </form>

                        <Divider my={6} borderColor="gray.200" />

                        <Text textAlign="center" fontSize="sm" color={dark}>
                            Already have an account?{' '}
                            <Link as={RouterLink} to="/login" color={amber} _hover={{ color: bronze }}>
                                Sign in
                            </Link>
                        </Text>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default SignupForm;