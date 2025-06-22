import React from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { HardHat } from 'lucide-react';
import {
  employeeSummary,
  complianceSectors,
  compliancePercentage,
  infractionsByWork,
  complianceTrend,
  complianceEvolution,
} from '../../../data/dashboardData';
import DashboardContent from './DashboardContent';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const barChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { display: false } },
      x: { grid: { display: false }, title: { display: true, text: 'Incidência', color: '#6b7280', font: { size: 12, weight: 'normal' } } },
    },
  };

  const doughnutOptions = {
    cutout: '75%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <AdminLayout pageTitle="Dashboard">
      <DashboardContent
        title="Funcionários detectados em todas as obras hoje"
        employeeSummary={employeeSummary}
        complianceSectors={complianceSectors}
        compliancePercentage={compliancePercentage}
        infractionsTitle="Obras com mais infrações esse mês"
        infractionsByWork={infractionsByWork}
        complianceTrend={complianceTrend}
        complianceEvolution={complianceEvolution}
      />
    </AdminLayout>
  );
};

export default AdminDashboard; 