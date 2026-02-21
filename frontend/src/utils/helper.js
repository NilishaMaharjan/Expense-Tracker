import moment from "moment";

// Validate email
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Get initials from full name
export const getInitials = (fullName) => {
    if (!fullName) return '';
    const words = fullName.trim().split(' ');
    let initials = '';
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    return initials.toUpperCase();
};

// Format numbers with thousand separators
export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return '';
    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

// Prepare expense data for BarChart (Last 30 Days)
export const prepareExpenseBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedData.map(item => ({
        month: item?.date ? moment(item.date).format('Do MMM') : '',
        amount: item?.amount || 0,
        category: item?.category || '',
    }));
};

// Prepare income data for BarChart (by date)
export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedData.map(item => ({
        month: item?.date ? moment(item.date).format('Do MMM') : '',
        amount: item?.amount || 0,
        source: item?.source || '',
    }));
};

// Prepare expense data for LineChart
export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedData.map(item => ({
        month: item?.date ? moment(item.date).format('Do MMM') : '',
        amount: item?.amount || 0,
        category: item?.category || '',
    }));
};