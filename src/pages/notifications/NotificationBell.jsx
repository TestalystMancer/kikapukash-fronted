import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, CheckIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { 
  Box, 
  IconButton, 
  Badge, 
  Flex, 
  Text, 
  VStack, 
  Button, 
  Divider, 
  useColorMode, 
  useColorModeValue, 
  Spinner, 
  Alert, 
  AlertIcon,
  useToast
} from '@chakra-ui/react';

/**
 * NotificationBell Component for KikapuKash savings app
 * Displays a bell icon with notification count and dropdown with recent notifications
 */
const NotificationBell = () => {
  // State
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const toast = useToast();
  const { colorMode } = useColorMode();
  
  // Color scheme from original code
  const forestGreen = "#228B22";
  const amber = "#FFBF00";
  const bronze = "#CD7F32";
  const white = "#FFFFFF";
  const dark = "#333333";
  const lightGray = "#f5f5f5";

  // Colors based on theme
  const bgColor = useColorModeValue(white, dark);
  const textColor = useColorModeValue(dark, white);
  const dividerColor = useColorModeValue("gray.200", "gray.700");
  const hoverBgColor = useColorModeValue(lightGray, "gray.700");
  const badgeBg = "red.500";
  const badgeColor = "white";
  const buttonBg = useColorModeValue(forestGreen, forestGreen);
  const buttonHoverBg = useColorModeValue(amber, amber);
  const buttonColor = useColorModeValue(white, white);
  const timeColor = useColorModeValue("gray.500", "gray.400");
  const headerBg = useColorModeValue(forestGreen, forestGreen);
  const headerColor = useColorModeValue(white, white);
  const footerBg = useColorModeValue(lightGray, "gray.700");

  // Fetch notifications from API
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch('https://kikapukash-backend-production.up.railway.app/api/notifications/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      
      const data = await response.json();
      setNotifications(data);
      
      // Calculate unread count
      const unreadNotifications = data.filter(notif => !notif.read);
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`https://kikapukash-backend-production.up.railway.app/api/notifications/${notificationId}/read/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
      
      // Update local state
      const updatedNotifications = notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      
      setNotifications(updatedNotifications);
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      toast({
        title: 'Notification marked as read',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initial fetch on component mount
  useEffect(() => {
    fetchNotifications();
    
    // Placeholder for WebSocket or polling implementation
    // This would be replaced with actual WebSocket connection
    const intervalId = setInterval(() => {
      if (!isOpen) { // Only poll when dropdown is closed
        fetchNotifications();
      }
    }, 60000); // Poll every minute
    
    return () => clearInterval(intervalId);
  }, []);

  // Format relative time
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    }
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    
    // Format as date if older than a week
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined,
    });
  };

  // Get notifications to display in dropdown
  // Shows up to 5 unread notifications first, then most recent read ones if needed
  const getNotificationsToDisplay = () => {
    // Sort by read status (unread first) then by date (newest first)
    const sortedNotifications = [...notifications].sort((a, b) => {
      if (a.read === b.read) {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return a.read ? 1 : -1;
    });
    
    // Limit to 5 notifications
    return sortedNotifications.slice(0, 5);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  // Badge animation
  const badgeVariants = {
    initial: { scale: 0.8 },
    animate: { 
      scale: [1, 1.2, 1],
      transition: { 
        repeat: unreadCount > 0 ? Infinity : 0,
        repeatDelay: 5,
        duration: 0.4
      }
    }
  };

  return (
    <Box position="relative" ref={dropdownRef}>
      {/* Bell Icon with Badge */}
      <IconButton
        aria-label={`${unreadCount} unread notifications`}
        icon={
          <Box position="relative">
            <BellIcon boxSize={6} />
            {unreadCount > 0 && (
              <motion.div
                initial="initial"
                animate="animate"
                variants={badgeVariants}
              >
                <Badge
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  borderRadius="full"
                  bg={badgeBg}
                  color={badgeColor}
                  fontSize="xs"
                  fontWeight="bold"
                  p="2px 6px"
                  boxShadow="sm"
                >
                  {unreadCount}
                </Badge>
              </motion.div>
            )}
          </Box>
        }
        variant="ghost"
        colorScheme="green"
        onClick={toggleDropdown}
        _hover={{ bg: hoverBgColor }}
      />

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            <Box
              position="absolute"
              right="0"
              top="100%"
              zIndex="dropdown"
              mt={2}
              width="320px"
              maxHeight="500px"
              borderRadius="lg"
              boxShadow="xl"
              overflow="hidden"
              bg={bgColor}
              border="1px"
              borderColor={dividerColor}
            >
              {/* Header */}
              <Flex 
                justify="space-between" 
                align="center" 
                p={4} 
                bg={headerBg} 
                color={headerColor}
              >
                <Text fontWeight="bold">Notifications</Text>
                {unreadCount > 0 && (
                  <Badge 
                    colorScheme="red" 
                    borderRadius="full" 
                    px={2}
                  >
                    {unreadCount} new
                  </Badge>
                )}
              </Flex>

              {/* Content */}
              <Box 
                overflowY="auto" 
                maxHeight="350px" 
                bg={bgColor}
              >
                {loading && (
                  <Flex justify="center" align="center" py={6}>
                    <Spinner size="md" color={forestGreen} />
                  </Flex>
                )}

                {error && (
                  <Alert status="error" variant="subtle" my={2} mx={4} borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                {!loading && !error && notifications.length === 0 && (
                  <Flex 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    py={8} 
                    px={4}
                    color={timeColor}
                  >
                    <Box mb={3}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="40" 
                        height="40" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </Box>
                    <Text textAlign="center">No notifications yet</Text>
                  </Flex>
                )}

                {!loading && !error && notifications.length > 0 && (
                  <VStack spacing={0} align="stretch">
                    {getNotificationsToDisplay().map((notification, index) => (
                      <Box key={notification.id}>
                        {index > 0 && <Divider borderColor={dividerColor} />}
                        <Box 
                          p={4} 
                          bg={notification.read ? bgColor : (colorMode === 'light' ? 'green.50' : 'green.900')}
                          _hover={{ bg: hoverBgColor }}
                          transition="background 0.2s"
                        >
                          <Flex justify="space-between" mb={1}>
                            <Text fontSize="xs" color={timeColor}>
                              {formatTimeAgo(notification.created_at)}
                            </Text>
                            {!notification.read && (
                              <Badge 
                                colorScheme="green" 
                                variant="subtle" 
                                fontSize="2xs"
                              >
                                NEW
                              </Badge>
                            )}
                          </Flex>
                          <Text 
                            fontSize="sm" 
                            fontWeight={notification.read ? "normal" : "medium"}
                            color={textColor}
                            mb={2}
                          >
                            {notification.message}
                          </Text>
                          {!notification.read && (
                            <Button
                              size="xs"
                              leftIcon={<CheckIcon />}
                              variant="outline"
                              colorScheme="green"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </VStack>
                )}
              </Box>

              {/* Footer */}
              <Box p={3} bg={footerBg} borderTop="1px" borderColor={dividerColor}>
                <Button
                  as="a"
                  href="/notifications"
                  width="full"
                  size="sm"
                  bg={buttonBg}
                  color={buttonColor}
                  _hover={{ bg: buttonHoverBg }}
                  rightIcon={<ChevronRightIcon />}
                >
                  See all notifications
                </Button>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default NotificationBell;