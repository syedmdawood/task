import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { toast } from "react-toastify";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Home,
  FileText,
  MessageSquare,
  Bell,
  MapPin,
  PieChart as Graph,
  Menu,
  Pencil,
  Pen,
} from "lucide-react";
import EditProfile from "./EditProfile";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    setToken,
    userData,
    getUserData,
    token,
    toastMessage,
    setToastMessage,
  } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate(<Login />);
  };
  const barData = [
    { name: "JAN", 2019: 30, 2020: 20 },
    { name: "FEB", 2019: 40, 2020: 25 },
    { name: "MAR", 2019: 45, 2020: 30 },
    { name: "APR", 2019: 50, 2020: 35 },
    { name: "MAY", 2019: 55, 2020: 40 },
    { name: "JUN", 2019: 70, 2020: 50 },
    { name: "JUL", 2019: 60, 2020: 45 },
    { name: "AUG", 2019: 75, 2020: 55 },
    { name: "SEP", 2019: 80, 2020: 60 },
  ];

  const pieData = [
    { name: "Completed", value: 45 },
    { name: "Remaining", value: 55 },
  ];
  const COLORS = ["#FF9F40", "#3B82F6"];
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      setToastMessage(null); // Reset message after showing
    }
  }, [toastMessage]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 p-5 text-white flex flex-col">
        <div className="text-center">
          {/* <div className="w-20 h-20 bg-white rounded-full mx-auto mb-2"></div> */}
          <img
            src={userData.image}
            className="w-20 h-20 rounded-full mx-auto mb-2"
            alt=""
          />
          <h2 className="text-lg font-semibold">{userData.name}</h2>
          <p className="text-sm text-gray-300">{userData.email}</p>
        </div>

        <nav className="mt-8 space-y-4">
          <NavItem Icon={Home} text="Home" />
          <NavItem Icon={FileText} text="File" />
          <NavItem Icon={MessageSquare} text="Messages" />
          <NavItem Icon={Bell} text="Notifications" />
          <NavItem Icon={MapPin} text="Location" />
          <NavItem Icon={Graph} text="Graph" />
          <button onClick={() => setShowPopup(true)} className="w-full">
            <NavItem Icon={Pen} text="Edit Info" />
          </button>
          {showPopup && <EditProfile onClose={() => setShowPopup(false)} />}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Dashboard User</h1>

          <button
            onClick={logout}
            className="bg-gradient-to-b from-blue-900 to-blue-700 px-5 py-2 rounded-full ml-2 text-white"
          >
            Logout
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Earning" value="$628" />
          <StatCard title="Share" value="2434" />
          <StatCard title="Likes" value="1259" icon="👍" />
          <StatCard title="Rating" value="8.5" icon="⭐" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Result</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="2019" fill="#3B82F6" />
                <Bar dataKey="2020" fill="#FF9F40" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Progress</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ cx, cy }) => (
                    <text
                      x={cx}
                      y={cy}
                      fill="black"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="16px"
                      fontWeight="bold"
                    >
                      45%
                    </text>
                  )}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ Icon, text }) => (
  <div className="flex items-center space-x-3 p-2 hover:bg-blue-800 rounded cursor-pointer">
    <Icon className="w-5 h-5 text-gray-200" />
    <span>{text}</span>
  </div>
);

// Statistic Card Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold mt-1">{value}</p>
    {icon && <span className="text-xl">{icon}</span>}
  </div>
);

export default Dashboard;
