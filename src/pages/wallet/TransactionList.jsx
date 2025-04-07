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
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, DownloadIcon, CalendarIcon } from '@chakra-ui/icons';
import DashboardLayout from '../../components/layout/DashboardLayout';

const TransactionList = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Custom colors from your application
  const forestGreen = "#228B22";
  const amber = "#FFBF00";
  const bronze = "#CD7F32";
  const white = "#FFFFFF";
  const dark = "#333333";
  const lightGray = "#f5f5f5";

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:8000/api/transactions/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data);
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

    fetchTransactions();
  }, [toast]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
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

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg={`linear-gradient(to bottom right, ${forestGreen}, ${amber}, ${bronze})`}>
        <Spinner size="xl" color={white} thickness="4px" />
      </Flex>
    );
  }

  return (
    <DashboardLayout className=" flex items-center justify-center p-4" >
      <Box
        w="full"
        maxW="6xl"
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
            <Flex direction="column" mb={6}>
              <Heading as="h2" size="xl" color={forestGreen} mb={2}>
                Transaction History
              </Heading>
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
                    You don't have any transactions yet. When you make deposits or withdrawals, they will appear here.
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
                              colorScheme={transaction.transaction_type === 'deposit' ? 'green' : 'red'}
                              borderRadius="full"
                              px={3}
                              py={1}
                            >
                              {transaction.transaction_type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                            </Badge>
                          </Td>
                          <Td fontWeight="semibold" color={transaction.transaction_type === 'deposit' ? 'green.500' : 'red.500'}>
                            {transaction.transaction_type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </Td>
                          <Td>
                            <Tooltip label={`Wallet ID: ${transaction.from_wallet}`}>
                              <Text>
                                {transaction.from_wallet ? `Wallet #${transaction.from_wallet}` : '—'}
                              </Text>
                            </Tooltip>
                          </Td>
                          <Td>
                            <Tooltip label={`Wallet ID: ${transaction.to_wallet}`}>
                              <Text>
                                {transaction.to_wallet ? `Wallet #${transaction.to_wallet}` : '—'}
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
                </HStack>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default TransactionList;