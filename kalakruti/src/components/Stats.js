// Stats.jsx
import React from 'react';

const Stats = () => {
  // Dummy data
  const statsData = {
    revenue: { amount: 'Rs. 100,000', change: 5 },
    overdueInvoices: { amount: 5, change: -10 },
    outstandingInvoices: { amount: 10, change: 8 },
    expenses: { amount: 'Rs. 30,000', change: -15 },
  };

  const renderChange = (change) => {
    const arrowStyle = change > 0 ? 'text-green-500' : 'text-red-500';
    return (
      <span className={`${arrowStyle} text-xs font-bold ml-2`}>{change}%</span>
    );
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="mt-10 text-3xl mb-8 text-gray-900">Business Stats</h1>

      <div className="flex w-full max-w-screen-lg">
        <div className="flex-1 p-4 border rounded-md bg-gray-900 text-white">
          <div className="mb-4">
            <div className='row'>
            <div className='col-6'>
            <h3 className="text-xs font-semibold">Revenue</h3>
            </div>
            <div className='col-6 text-right'>
            <h3 className="text-sm font-semibold">{renderChange(statsData.revenue.change)}</h3>
            </div>
            </div>
            <p className="text-3xl">{statsData.revenue.amount}</p>
          </div>
        </div>

        <div className="flex-1 p-4 border rounded-md bg-gray-900 text-white">
          <div className="mb-4">
            <div className='row'>
            <div className='col-8'>
            <h3 className="text-xs font-semibold">Overdue Invoices</h3>
            </div>
            <div className='col-4 text-right'>
            <h3 className="text-sm font-semibold">{renderChange(statsData.overdueInvoices.change)}</h3>
            </div>
            </div>
            
            <p className="text-3xl">{statsData.overdueInvoices.amount}</p>
          </div>
        </div>

        <div className="flex-1 p-4 border rounded-md bg-gray-900 text-white">
          <div className="mb-4">
          <div className='row'>
            <div className='col-8'>
            <h3 className="text-xs font-semibold">Outstanding Invoices</h3>
            </div>
            <div className='col-4 text-right'>
            <h3 className="text-sm font-semibold">{renderChange(statsData.outstandingInvoices.change)}</h3>
            </div>
            </div>
            <p className="text-3xl">{statsData.outstandingInvoices.amount}</p>
          </div>
        </div>

        <div className="flex-1 p-4 border rounded-md bg-gray-900 text-white">
          <div>
            <div className='row'>
            <div className='col-8'>
            <h3 className="text-xs font-semibold"> Expenses</h3>
            </div>
            <div className='col-4 text-right'>
            <h3 className="text-sm font-semibold">{renderChange(statsData.expenses.change)}</h3>
            </div>
            </div>
            <p className="text-3xl">{statsData.expenses.amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;