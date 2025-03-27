import React, { useState, useEffect } from 'react';
import API from '../../api/axios';  // Adjust the import path according to your folder structure
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // State to store fetched data
  const [salesData, setSalesData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [referralData, setReferralData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API on component mount
  const fetchData = async () => {
    try {
      const [salesResponse, productResponse, referralResponse] = await Promise.all([
        API.get('/dashboard/dashsales'),  // This is the correct endpoint
        API.get('/dashboard/dashproducts'),
        API.get('/dashboard/referrals'),
      ]);
      
      setSalesData(salesResponse.data);
      setProductData(productResponse.data);
      setReferralData(referralResponse.data);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setError('Error fetching data');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  // If data is still loading or there's an error, show loading or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate total sales
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  
  // Calculate total products sold
  const totalProductsSold = productData.reduce((sum, product) => sum + product.sales, 0);
  
  // Calculate total customers (unique)
  const uniqueCustomers = new Set(salesData.map(sale => sale.customer)).size;
  
  // Calculate total revenue
  const totalRevenue = productData.reduce((sum, product) => sum + product.revenue, 0);

  // Sales by category for pie chart
  const salesByCategory = salesData.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(salesByCategory).map(([name, value]) => ({ name, value }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Sales by date for line chart
  const salesByDate = salesData.reduce((acc, sale) => {
    const dateStr = new Date(sale.date).toLocaleDateString(); // Ensure date is formatted correctly
    acc[dateStr] = (acc[dateStr] || 0) + sale.amount;
    return acc;
  }, {});

  const lineChartData = Object.entries(salesByDate)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-14); // Last 14 days

  // Top products by sales
  const topProducts = [...productData]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex bg-blue-900 p-8 items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{
          title: "Total Sales",
          value: `$${totalSales.toLocaleString()}`,
          icon: <DollarSign className="h-6 w-6 text-green-600" />,
          bg: "bg-green-100",
          growth: "12.5%",
          color: "text-green-500"
        }, {
          title: "Products Sold",
          value: totalProductsSold,
          icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
          bg: "bg-blue-100",
          growth: "8.2%",
          color: "text-green-500"
        }, {
          title: "Customers",
          value: uniqueCustomers,
          icon: <Users className="h-6 w-6 text-purple-600" />,
          bg: "bg-purple-100",
          growth: "5.3%",
          color: "text-green-500"
        }, {
          title: "Total Revenue",
          value: `$${totalRevenue.toLocaleString()}`,
          icon: <TrendingUp className="h-6 w-6 text-yellow-600" />,
          bg: "bg-yellow-100",
          growth: "-2.1%",
          color: "text-red-500"
        }].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold mt-1">{item.value}</p>
              </div>
              <div className={`p-2 ${item.bg} rounded-lg`}>{item.icon}</div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className={`h-4 w-4 ${item.color} mr-1`} />
              <span className={`text-sm font-medium ${item.color}`}>{item.growth}</span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Trend (Last 14 Days)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
