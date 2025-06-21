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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card: Funcionários detectados */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-600 font-semibold">Funcionários detectados em todas as obras hoje</h2>
          <p className="text-4xl font-bold my-2">{employeeSummary.total} <span className="text-xl font-medium text-gray-500">Funcionários</span></p>
          <div className="space-y-2 mt-4">
            <div className="flex items-center text-gray-700">
              <HardHat className="w-5 h-5 mr-2 text-green-500" /> Com capacete <span className="font-semibold ml-auto">{employeeSummary.withHelmet}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <HardHat className="w-5 h-5 mr-2 text-red-500" /> Sem capacete <span className="font-semibold ml-auto">{employeeSummary.withoutHelmet}</span>
            </div>
          </div>
        </div>

        {/* Card: Setores com menor conformidade */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-600 font-semibold">Setores com menor conformidade</h2>
          <div className="space-y-3 mt-4">
            {complianceSectors.map((sector, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700">{sector.name}</span>
                <span className="font-bold text-red-500 text-lg">{sector.compliance}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Percentual de conformidade */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center">
          <h2 className="text-gray-600 font-semibold mb-2">Percentual de conformidade</h2>
          <div className="relative w-40 h-40">
            <Doughnut data={compliancePercentage.doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-green-600">{compliancePercentage.value}%</span>
            </div>
          </div>
        </div>

        {/* Card: Obras com mais infrações */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-gray-600 font-semibold mb-4">Obras com mais infrações esse mês</h2>
          <div className="relative h-64">
            <Bar data={infractionsByWork.barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Wrapper para os cards da direita */}
        <div className="flex flex-col gap-6">
          {/* Card: Tendência de Conformidade */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-600 font-semibold">Tendência de Conformidade</h2>
            <p className="text-4xl font-bold text-green-500 my-2">{complianceTrend.change}</p>
            <p className="text-gray-500">{complianceTrend.period}</p>
            <p className="text-sm text-green-600 mt-4">{complianceTrend.lastMeasurement}</p>
          </div>

          {/* Card: Média da evolução da conformidade */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-600 font-semibold mb-4">Média da evolução da conformidade - Últimos 3 meses</h2>
            <div className="relative h-64">
              <Line data={complianceEvolution.lineChartData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 