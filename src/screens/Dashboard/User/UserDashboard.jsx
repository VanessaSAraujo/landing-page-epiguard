import React from 'react';
import { useAuth } from '../../../AuthContext';
import AdminLayout from '../../../components/layouts/AdminLayout';
import DashboardContent from '../Admin/DashboardContent';
import {
  employeeSummary,
  complianceSectors,
  compliancePercentage,
  infractionsByWork,
  complianceTrend,
  complianceEvolution,
} from '../../../data/dashboardData';
// Importe aqui os dados e componentes de gráfico que você já usa no dashboard do admin

const UserDashboard = () => {
  const { user } = useAuth();
  const obra = user?.obraVinculada;

  // Exemplo de filtro de dados (substitua pelos seus dados reais)
  // const funcionariosObra = funcionariosData.filter(f => f.obra === obra);
  // const conformidadeObra = conformidadeData.find(c => c.obra === obra);
  // ...

  // Aqui você pode filtrar os dados mockados pela obra, se desejar
  // Exemplo: const dadosObra = filtrarDadosPorObra(obra)

  // Mock de dados filtrados para a obra do técnico
  const employeeSummaryObra = employeeSummary; // Substitua por filtro real se necessário
  const complianceSectorsObra = complianceSectors;
  const compliancePercentageObra = compliancePercentage;
  const complianceTrendObra = complianceTrend;
  const complianceEvolutionObra = complianceEvolution;

  // Mock de setores com mais infrações para o técnico
  const setoresInfractions = {
    labels: ['Soldagem', 'Elétrica', 'Alvenaria', 'Terraplanagem'],
    data: [28, 22, 20, 15],
    get barChartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Infrações',
            data: this.data,
            backgroundColor: [
              '#b91c1c', // red-800
              '#dc2626', // red-600
              '#ef4444', // red-500
              '#fca5a5', // red-300
            ],
            borderColor: '#fff',
            borderWidth: 1,
          },
        ],
      };
    },
  };

  return (
    <AdminLayout pageTitle={`Dashboard - ${obra}`}> {/* Sidebar e Header padrão */}
      <DashboardContent
        title={`Funcionários detectados na obra ${obra} hoje`}
        employeeSummary={employeeSummaryObra}
        complianceSectors={complianceSectorsObra}
        compliancePercentage={compliancePercentageObra}
        infractionsTitle="Setores com mais infrações esse mês"
        infractionsByWork={setoresInfractions}
        complianceTrend={complianceTrendObra}
        complianceEvolution={complianceEvolutionObra}
      />
    </AdminLayout>
  );
};

export default UserDashboard; 