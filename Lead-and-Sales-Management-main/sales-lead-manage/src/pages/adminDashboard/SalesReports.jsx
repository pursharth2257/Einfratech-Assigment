import React, { useEffect, useState } from "react";
import API from "../../api/axios"; // Importing the centralized API instance
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { Download, Filter } from "lucide-react";

const SalesReports = () => {
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState("30days");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Sales Reports Data from API
  useEffect(() => {
    const fetchSalesReports = async () => {
      try {
        const response = await API.get("/sales-reports"); // Using centralized API instance
        setSalesData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sales data.");
        setLoading(false);
      }
    };
    fetchSalesReports();
  }, []);

  // ✅ Process data for charts
  const salesByDate = salesData.reduce((acc, sale) => {
    acc[sale.transactionDate] = (acc[sale.transactionDate] || 0) + sale.totalAmount;
    return acc;
  }, {});

  const lineChartData = Object.entries(salesByDate)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const salesByCategory = salesData.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.totalAmount;
    return acc;
  }, {});

  const pieChartData = Object.entries(salesByCategory).map(([name, value]) => ({ name, value }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // ✅ Total Sales Calculation
  const totalSales = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);

  // ✅ Recent Sales for Table
  const recentSales = [...salesData]
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Sales Reports</h1>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading sales data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Sales Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesReports;
