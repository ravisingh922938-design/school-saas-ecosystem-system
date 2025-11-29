import { Users, CheckCircle2, Wallet, AlertCircle, MessageSquareText } from 'lucide-react';
import { useTerminology } from '../../contexts/TerminologyContext';

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`p-3 rounded-full ${colorClasses[color]} mr-4`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

const BirthdayCard = ({ name, className, date }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
    <div className="flex items-center">
      <img 
        src={`https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`} 
        alt={name}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{className}</p>
      </div>
    </div>
    <button className="text-green-600 hover:bg-green-50 p-2 rounded-full">
      <MessageSquareText size={18} />
    </button>
  </div>
);

const FeeDefaulterRow = ({ name, className, amount }) => (
  <div className="grid grid-cols-3 py-3 border-b border-gray-100 last:border-0">
    <span className="font-medium">{name}</span>
    <span className="text-gray-600">{className}</span>
    <span className="text-right font-medium text-red-600">₹{amount}</span>
  </div>
);

const SchoolDashboard = () => {
  const { terms } = useTerminology();

  // Sample data
  const birthdays = [
    { id: 1, name: 'Rahul Sharma', className: 'Class 10 A' },
    { id: 2, name: 'Priya Patel', className: 'Class 9 B' },
    { id: 3, name: 'Amit Kumar', className: 'Class 8 A' },
  ];

  const defaulters = [
    { id: 1, name: 'Rahul Sharma', className: '10 A', amount: '12,500' },
    { id: 2, name: 'Priya Patel', className: '9 B', amount: '8,750' },
    { id: 3, name: 'Amit Kumar', className: '8 A', amount: '15,000' },
    { id: 4, name: 'Sneha Gupta', className: '11 C', amount: '10,200' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={`Total ${terms.student}s`} 
          value="1,240" 
          icon={Users} 
          color="blue" 
        />
        <StatCard 
          title="Present Today" 
          value="92%" 
          icon={CheckCircle2} 
          color="green" 
        />
        <StatCard 
          title="Fees Collected" 
          value="₹ 45,000" 
          icon={Wallet} 
          color="purple" 
        />
        <StatCard 
          title="Pending Dues" 
          value="₹ 8.2 Lakhs" 
          icon={AlertCircle} 
          color="red" 
        />
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Birthdays */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Today's Birthdays</h2>
            <button className="text-sm text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {birthdays.map((student) => (
              <BirthdayCard 
                key={student.id}
                name={student.name}
                className={student.className}
              />
            ))}
          </div>
        </div>

        {/* Fee Defaulters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Fee Defaulters</h2>
            <button className="text-sm text-blue-600 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-3 text-sm font-medium text-gray-500 pb-2 border-b">
                <span>Name</span>
                <span>Class</span>
                <span className="text-right">Pending</span>
              </div>
              <div className="divide-y divide-gray-100">
                {defaulters.map((defaulter) => (
                  <FeeDefaulterRow 
                    key={defaulter.id}
                    name={defaulter.name}
                    className={defaulter.className}
                    amount={defaulter.amount}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
