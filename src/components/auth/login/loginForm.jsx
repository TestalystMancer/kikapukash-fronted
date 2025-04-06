import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
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
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', formData);
            
            if (response.data.access) {
                // Store the token in localStorage
                localStorage.setItem('token', response.data.access);
                // Set authorization header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    // Custom colors for our savings platform
    const forestGreen = "#2C5E1A"; // Forest Green
    const amber = "#FFBF00"; // Amber
    // const lightColor = "oklch(0.83 0.17 83.74)"; // The OKLCH color

    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-green-900 to-emerald-800 p-4">
            <Box
                w="full"
                maxW="md"
                position="relative"
                overflow="hidden"
            >
                {/* Card with decorative elements */}
                <Box
                    bg={useColorModeValue('white', 'gray.800')}
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
                        bg={forestGreen} 
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
                                color="white" 
                                alignItems="center" 
                                justifyContent="center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Flex>
                        </Flex>

                        <Heading as="h2" size="xl" textAlign="center" color={forestGreen} mb={6}>
                            Welcome Back
                        </Heading>

                        {error && (
                            <Alert status="error" borderRadius="md" mb={4}>
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={6}>
                                <FormControl id="email">
                                    <FormLabel>Email Address</FormLabel>
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
                                            background="gray.50"
                                            focusBorderColor={forestGreen}
                                            required
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
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
                                            background="gray.50"
                                            focusBorderColor={forestGreen}
                                            required
                                        />
                                    </InputGroup>
                                </FormControl>


                                <Button
                                    type="submit"
                                    bg={forestGreen}
                                    color="white"
                                    size="lg"
                                    _hover={{ bg: 'green.700' }}
                                    _active={{ bg: 'green.800' }}
                                    leftIcon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                    }
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </form>

                        <Text mt={8} textAlign="center" fontSize="sm" color="gray.600">
                            Don't have an account?{' '}
                            <Link color={amber} _hover={{ color: 'amber.500' }}>
                                Sign up now
                            </Link>
                        </Text>
                    </Box>
                </Box>
                
            </Box>
        </div>
    );
};

export default LoginForm;