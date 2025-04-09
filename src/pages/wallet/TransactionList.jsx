import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Heading,
  Alert,
  AlertIcon,
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
  Divider,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  Tag,
  TagLabel,
  Center,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, DownloadIcon, CalendarIcon, AddIcon } from '@chakra-ui/icons';
import DashboardLayout from '../../components/layout/DashboardLayout';

const TransactionList = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [walletNotFoundAlert, setWalletNotFoundAlert] = useState(false);
  
  // New transaction form state
  const [transactionType, setTransactionType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [toWallet, setToWallet] = useState('');
  const [fromWallet, setFromWallet] = useState('');
  const [formError, setFormError] = useState('');

  // Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Custom colors from your application
  const forestGreen = "#228B22";
  const amber = "#FFBF00";
  const bronze = "#CD7F32";
  const white = "#FFFFFF";
  const dark = "#333333";
  const lightGray = "#f5f5f5";

  useEffect(() => {
    // Get the current user from local storage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        // Fetch transactions
        const transactionsResponse = await fetch('http://localhost:8000/api/transactions/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!transactionsResponse.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);

        // Fetch wallets
        const walletsResponse = await fetch('http://localhost:8000/api/wallets/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!walletsResponse.ok) {
          throw new Error('Failed to fetch wallets');
        }

        const walletsData = await walletsResponse.json();
        setWallets(walletsData);
        
        // Find the user's wallet if we have the current user
        if (currentUser && currentUser.id) {
          const userWalletFound = walletsData.find(wallet => 
            wallet.owner_type === 'user' && wallet.owner_id === currentUser.id
          );
          
          if (userWalletFound) {
            setUserWallet(userWalletFound);
            setFromWallet(userWalletFound.id.toString());
            setToWallet(userWalletFound.id.toString()); // Set user's wallet as default for deposits
          } else {
            // Alert if user wallet is not found
            setWalletNotFoundAlert(true);
            toast({
              title: 'Wallet Not Found',
              description: 'Your personal wallet could not be found. Please contact support.',
              status: 'warning',
              duration: 7000,
              isClosable: true,
            });
          }
        }
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
  }, [toast, currentUser]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const handleCreateTransaction = async () => {
    setFormError('');
    
    // Validate form
    if (!amount || parseFloat(amount) <= 0) {
      setFormError('Please enter a valid amount');
      return;
    }

    if (transactionType === 'deposit' && !toWallet) {
      setFormError('Please select a destination wallet');
      return;
    }

    if (transactionType === 'withdrawal' && !fromWallet) {
      setFormError('Please select a source wallet');
      return;
    }

    if (transactionType === 'transfer') {
      if (!fromWallet) {
        setFormError('Please select a source wallet');
        return;
      }
      if (!toWallet) {
        setFormError('Please select a destination wallet');
        return;
      }
      if (fromWallet === toWallet) {
        setFormError('Source and destination wallets cannot be the same');
        return;
      }
    }

    setTransactionLoading(true);
    const token = localStorage.getItem('token');

    try {
      // Prepare transaction data
      const transactionData = {
        transaction_type: transactionType,
        amount: amount,
        from_wallet: ['withdrawal', 'transfer'].includes(transactionType) ? parseInt(fromWallet) : null,
        to_wallet: ['deposit', 'transfer'].includes(transactionType) ? parseInt(toWallet) : null,
      };

      const response = await fetch('http://localhost:8000/api/transactions/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create transaction');
      }

      const newTransaction = await response.json();
      
      // Update transactions list with the new transaction
      setTransactions([newTransaction, ...transactions]);
      
      toast({
        title: 'Success',
        description: `${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} created successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form and close modal
      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setTransactionLoading(false);
    }
  };

  const resetForm = () => {
    setTransactionType('deposit');
    setAmount('');
    // Reset wallets to user wallet if available
    if (userWallet) {
      setFromWallet(userWallet.id.toString());
      setToWallet(userWallet.id.toString());
    } else {
      setFromWallet('');
      setToWallet('');
    }
    setFormError('');
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  const handleTransactionTypeChange = (e) => {
    const newType = e.target.value;
    setTransactionType(newType);
    
    // Auto-select user's wallet as appropriate for the transaction type
    if (userWallet) {
      if (newType === 'withdrawal' || newType === 'transfer') {
        setFromWallet(userWallet.id.toString());
      }
      if (newType === 'deposit') {
        setToWallet(userWallet.id.toString());
      }
      // For transfer, reset the to wallet if it's the same as from wallet
      if (newType === 'transfer' && toWallet === userWallet.id.toString()) {
        setToWallet('');
      }
    }
  };

  const getOtherWallets = () => {
    if (!userWallet) return wallets;
    return wallets.filter(wallet => wallet.id !== userWallet.id);
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (filterType !== 'all' && transaction.transaction_type !== filterType) {
      return false;
    }
    
    // Filter by search query (ID or amount)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const idMatch = transaction.id.toString().includes(query);
      const amountMatch = transaction.amount.toString().includes(query);
      
      if (!idMatch && !amountMatch) {
        return false;
      }
    }
    
    // Filter by date range
    if (dateRange !== 'all') {
      const transactionDate = new Date(transaction.created_at);
      const today = new Date();
      
      if (dateRange === 'today') {
        const isToday = 
          transactionDate.getDate() === today.getDate() &&
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getFullYear() === today.getFullYear();
        
        if (!isToday) return false;
      } else if (dateRange === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        
        if (transactionDate < oneWeekAgo) return false;
      } else if (dateRange === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        
        if (transactionDate < oneMonthAgo) return false;
      }
    }
    
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getWalletLabel = (walletId) => {
    const wallet = wallets.find(w => w.id === walletId);
    if (wallet && wallet.owner_object) {
      return `${wallet.owner_object.first_name} ${wallet.owner_object.last_name}'s Wallet ($${wallet.balance})`;
    }
    return `Wallet #${walletId}`;
  };

  const getTransactionTypeColor = (type) => {
    switch(type) {
      case 'deposit':
        return 'green';
      case 'withdrawal':
        return 'red';
      case 'transfer':
        return 'blue';
      default:
        return 'gray';
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
    <DashboardLayout className="flex items-center justify-center">
      <Box
        w="full"
        position="relative"
        overflow="hidden"
      >
        {walletNotFoundAlert && (
          <Alert status="warning" mb={4}>
            <AlertIcon />
            Your personal wallet could not be found. Some transaction functions may be limited.
          </Alert>
        )}
        
        <Box
          p={8}
          position="relative"
        >  
          {/* Content */}
          <Box position="relative" zIndex="1">
            <Flex direction="column" mb={6}>
              <Flex justify="space-between" align="center" wrap="wrap">
                <Heading as="h2" size="xl" color={forestGreen} mb={2}>
                  Transaction History
                </Heading>
                <Button
                  leftIcon={<AddIcon />}
                  bg={forestGreen}
                  color={white}
                  _hover={{ bg: amber }}
                  _active={{ bg: bronze }}
                  onClick={onOpen}
                  mt={{ base: 2, md: 0 }}
                >
                  New Transaction
                </Button>
              </Flex>
              <Text color="gray.600" fontSize="md">
                View and manage all your financial transactions
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
                    placeholder="Search by ID or amount" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    background={lightGray}
                    focusBorderColor={forestGreen}
                  />
                </InputGroup>

                <Select 
                  value={filterType} 
                  onChange={handleFilterChange}
                  bg={lightGray}
                  focusBorderColor={forestGreen}
                  w={{ base: "full", md: "auto" }}
                >
                  <option value="all">All Types</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                  <option value="transfer">Transfers</option>
                </Select>

                <Select 
                  value={dateRange} 
                  onChange={handleDateRangeChange}
                  bg={lightGray}
                  focusBorderColor={forestGreen}
                  w={{ base: "full", md: "auto" }}
                  icon={<CalendarIcon />}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
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
                </MenuList>
              </Menu>
            </Flex>

            {/* Transaction Table */}
            <Box 
              borderRadius="lg" 
              overflow="hidden" 
              boxShadow="md"
              bg={white}
            >
              {transactions.length === 0 ? (
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </Box>
                  <Heading as="h3" size="md" color={dark} mb={2} textAlign="center">
                    No Transactions Found
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    You don't have any transactions yet. When you make deposits, withdrawals, or transfers, they will appear here.
                  </Text>
                  <Button
                    mt={6}
                    bg={forestGreen}
                    color={white}
                    _hover={{ bg: amber }}
                    _active={{ bg: bronze }}
                    leftIcon={<AddIcon />}
                    onClick={onOpen}
                  >
                    Make Your First Transaction
                  </Button>
                </Center>
              ) : filteredTransactions.length === 0 ? (
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
                    No Matching Transactions
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    No transactions match your current filters. Try changing your search criteria or filter options.
                  </Text>
                  <Button
                    mt={6}
                    variant="outline"
                    colorScheme="green"
                    onClick={() => {
                      setFilterType('all');
                      setSearchQuery('');
                      setDateRange('all');
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
                        <Th color={dark}>Type</Th>
                        <Th color={dark}>Amount</Th>
                        <Th color={dark}>From</Th>
                        <Th color={dark}>To</Th>
                        <Th color={dark}>Date</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredTransactions.map((transaction) => (
                        <Tr key={transaction.id} _hover={{ bg: lightGray }}>
                          <Td fontWeight="medium">{transaction.id}</Td>
                          <Td>
                            <Badge
                              colorScheme={getTransactionTypeColor(transaction.transaction_type)}
                              borderRadius="full"
                              px={3}
                              py={1}
                            >
                              {transaction.transaction_type.charAt(0).toUpperCase() + transaction.transaction_type.slice(1)}
                            </Badge>
                          </Td>
                          <Td fontWeight="semibold" color={transaction.transaction_type === 'withdrawal' ? 'red.500' : 'green.500'}>
                            {transaction.transaction_type === 'withdrawal' ? '-' : (transaction.transaction_type === 'transfer' ? '±' : '+')}{formatCurrency(transaction.amount)}
                          </Td>
                          <Td>
                            <Tooltip label={transaction.from_wallet ? `Wallet ID: ${transaction.from_wallet}` : 'N/A'}>
                              <Text>
                                {transaction.from_wallet ? 
                                  getWalletLabel(transaction.from_wallet) : '—'}
                              </Text>
                            </Tooltip>
                          </Td>
                          <Td>
                            <Tooltip label={transaction.to_wallet ? `Wallet ID: ${transaction.to_wallet}` : 'N/A'}>
                              <Text>
                                {transaction.to_wallet ? 
                                  getWalletLabel(transaction.to_wallet) : '—'}
                              </Text>
                            </Tooltip>
                          </Td>
                          <Td>
                            <Tooltip label={formatDate(transaction.created_at)}>
                              <Text>{formatDate(transaction.created_at)}</Text>
                            </Tooltip>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </Box>

            {/* Summary Footer */}
            {transactions.length > 0 && (
              <Flex 
                justify="space-between" 
                align="center" 
                mt={6} 
                flexWrap="wrap"
                gap={4}
              >
                <Text color="gray.600">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </Text>
                <HStack spacing={4}>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.500">Total Deposits</Text>
                    <Text fontWeight="bold" color="green.500">
                      {formatCurrency(
                        transactions
                          .filter(t => t.transaction_type === 'deposit')
                          .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                      )}
                    </Text>
                  </Box>
                  <Divider orientation="vertical" h="40px" />
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.500">Total Withdrawals</Text>
                    <Text fontWeight="bold" color="red.500">
                      {formatCurrency(
                        transactions
                          .filter(t => t.transaction_type === 'withdrawal')
                          .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                      )}
                    </Text>
                  </Box>
                  <Divider orientation="vertical" h="40px" />
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.500">Total Transfers</Text>
                    <Text fontWeight="bold" color="blue.500">
                      {formatCurrency(
                        transactions
                          .filter(t => t.transaction_type === 'transfer')
                          .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                      )}
                    </Text>
                  </Box>
                </HStack>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>

      {/* Create Transaction Modal */}
      <Modal isOpen={isOpen} onClose={handleModalClose} size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="lg">
          <ModalHeader 
            bg={forestGreen} 
            color={white} 
            borderTopRadius="lg"
            py={4}
          >
            Create New Transaction
          </ModalHeader>
          <ModalCloseButton color={white} />
          
          <ModalBody py={6}>
            {formError && (
              <Alert status="error" mb={4} borderRadius="md">
                <AlertIcon />
                {formError}
              </Alert>
            )}
            
            {walletNotFoundAlert && (transactionType === 'withdrawal' || transactionType === 'transfer') && (
              <Alert status="warning" mb={4} borderRadius="md">
                <AlertIcon />
                Your personal wallet could not be found. You cannot make {transactionType}s at this time.
              </Alert>
            )}
            
            <FormControl mb={4}>
              <FormLabel fontWeight="medium">Transaction Type</FormLabel>
              <Select 
                value={transactionType} 
                onChange={handleTransactionTypeChange}
                bg={lightGray}
                focusBorderColor={forestGreen}
              >
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="transfer">Transfer</option>
              </Select>
            </FormControl>
            
            <FormControl mb={4}>
              <FormLabel fontWeight="medium">Amount (USD)</FormLabel>
              <NumberInput min={0.01} precision={2}>
                <NumberInputField 
                  placeholder="Enter amount" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  bg={lightGray}
                  focusBorderColor={forestGreen}
                />
              </NumberInput>
            </FormControl>
            
            {/* For deposit, show user wallet info */}
            {transactionType === 'deposit' && (
              <FormControl mb={4}>
                <FormLabel fontWeight="medium">Destination Wallet</FormLabel>
                {userWallet ? (
                  <Box 
                    p={3} 
                    bg={lightGray} 
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Flex align="center" justify="space-between">
                      <Text fontWeight="medium">
                        {userWallet.owner_object ? 
                          `${userWallet.owner_object.first_name} ${userWallet.owner_object.last_name}'s Wallet` : 
                          `Your Wallet`}
                      </Text>
                      <Badge colorScheme="green">Balance: ${userWallet.balance}</Badge>
                    </Flex>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      Funds will be deposited to your personal wallet
                    </Text>
                  </Box>
                ) : (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    Your personal wallet could not be found. Please contact support.
                  </Alert>
                )}
              </FormControl>
            )}
            
            {/* For withdrawal, show user wallet info */}
            {transactionType === 'withdrawal' && (
              <FormControl mb={4}>
                <FormLabel fontWeight="medium">Source Wallet</FormLabel>
                {userWallet ? (
                  <Box 
                    p={3} 
                    bg={lightGray} 
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Flex align="center" justify="space-between">
                      <Text fontWeight="medium">
                        {userWallet.owner_object ? 
                          `${userWallet.owner_object.first_name} ${userWallet.owner_object.last_name}'s Wallet` : 
                          `Your Wallet`}
                      </Text>
                      <Badge colorScheme="green">Balance: ${userWallet.balance}</Badge>
                    </Flex>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      Funds will be withdrawn from your personal wallet
                    </Text>
                  </Box>
                ) : (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    Your personal wallet could not be found. Please contact support.
                  </Alert>
                )}
              </FormControl>
            )}
            
            {/* For transfer, show both source and destination wallets */}
            {transactionType === 'transfer' && (
              <>
                <FormControl mb={4}>
                  <FormLabel fontWeight="medium">Source Wallet</FormLabel>
                  {userWallet ? (
                    <Box 
                      p={3} 
                      bg={lightGray} 
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor="gray.200"
                    >
                      <Flex align="center" justify="space-between">
                        <Text fontWeight="medium">
                          {userWallet.owner_object ? 
                            `${userWallet.owner_object.first_name} ${userWallet.owner_object.last_name}'s Wallet` : 
                            `Your Wallet`}
                        </Text>
                        <Badge colorScheme="green">Balance: ${userWallet.balance}</Badge>
                      </Flex>
                      <Text fontSize="sm" color="gray.500" mt={1}>
                        Funds will be transferred from your personal wallet
                      </Text>
                    </Box>
                  ) : (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      Your personal wallet could not be found. Please contact support.
                    </Alert>
                  )}
                </FormControl>
                
                <FormControl mb={4}>
                  <FormLabel fontWeight="medium">Destination Wallet</FormLabel>
                  <Select 
                    placeholder="Select destination wallet"
                    value={toWallet}
                    onChange={(e) => setToWallet(e.target.value)}
                    bg={lightGray}
                    focusBorderColor={forestGreen}
                  >
                    {getOtherWallets().map(wallet => (
                      <option key={wallet.id} value={wallet.id}>
                        {wallet.owner_object ? 
                          `${wallet.owner_object.first_name} ${wallet.owner_object.last_name}'s Wallet ($${wallet.balance})` : 
                          `Wallet #${wallet.id}`}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </ModalBody>

          <ModalFooter bg={lightGray} borderBottomRadius="lg">
            <Button 
              variant="outline" 
              mr={3} 
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button 
              bg={forestGreen}
              color={white}
              _hover={{ bg: amber }}
              _active={{ bg: bronze }}
              onClick={handleCreateTransaction}
              isLoading={transactionLoading}
              loadingText="Processing"
              isDisabled={(transactionType === 'withdrawal' || transactionType === 'transfer') && !userWallet}
            >
              Create Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
};

export default TransactionList;