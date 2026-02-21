import React from 'react';
import { LuArrowRight, LuUtensils, LuTrendingUp, LuTrendingDown } from 'react-icons/lu';
import moment from 'moment';

const RecentTransactions = ({ transactions, onSeeMore }) => {

  // Inline component for each transaction
  const TransactionInfoCard = ({ title, icon, date, amount, type }) => {
    const amountStyles = type === 'income'
      ? 'bg-green-50 text-green-500'
      : 'bg-red-50 text-red-500';

    return (
      <div className='flex items-center justify-between mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
        <div className='flex items-center gap-4'>
          <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
            {icon ? <img src={icon} alt={title} className='w-6 h-6' /> : <LuUtensils />}
          </div>
          <div>
            <p className='text-sm text-gray-700 font-medium'>{title}</p>
            <p className='text-xs text-gray-400 mt-1'>{date}</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${amountStyles}`}>
          <h6 className='text-xs font-medium'>
            {type === 'income' ? '+' : '-'}${amount}
          </h6>
          {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>
      </div>
    );
  };

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Recent Transactions</h5>
        <button className='card-btn' onClick={onSeeMore}>
          See More <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id} // use MongoDB _id
              title={item.type === 'expense' ? item.category : item.source}
              icon={item.icon || ''} // fallback if icon is empty
              date={moment(item.date).format('Do MMM YYYY')}
              amount={item.amount}
              type={item.type}
            />
          ))
        ) : (
          <p className='text-sm text-gray-400 mt-2'>No recent transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;