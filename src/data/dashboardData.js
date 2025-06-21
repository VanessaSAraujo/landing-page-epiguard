/**
 * @file src/data/dashboardData.js
 * @description Mock data for the admin dashboard.
 */

// Dados para o Card de Resumo de Funcionários
export const employeeSummary = {
  total: 256,
  withHelmet: 230,
  withoutHelmet: 26,
};

// Dados para o Card de Setores com Menor Conformidade
export const complianceSectors = [
  { name: 'Operação de Máquinas', compliance: 83 },
  { name: 'Carpintaria', compliance: 80 },
  { name: 'Terraplanagem', compliance: 75 },
];

// Dados para o Card de Percentual de Conformidade
export const compliancePercentage = {
  value: 89.8,
  get doughnutData() {
    return {
      labels: ['Conformidade', 'Não Conformidade'],
      datasets: [
        {
          data: [this.value, 100 - this.value],
          backgroundColor: ['#22c55e', '#f3f4f6'],
          borderColor: ['#22c55e', '#f3f4f6'],
          borderWidth: 1,
          circumference: 270,
          rotation: 225,
        },
      ],
    };
  },
};

// Dados para o Card de Obras com Mais Infrações
export const infractionsByWork = {
  labels: ['Obra A', 'Obra B', 'Obra C', 'Obra D'],
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

// Dados para o Card de Tendência de Conformidade
export const complianceTrend = {
  change: "+3,44%",
  period: "em relação à semana passada",
  lastMeasurement: "Última medição: Sexta-feira",
};

// Dados para o Card de Média da Evolução da Conformidade
export const complianceEvolution = {
  get lineChartData() {
    return {
      labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      datasets: [
        {
          label: 'Fevereiro',
          data: [75, 78, 80, 77, 82, 85],
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          tension: 0.4,
        },
        {
          label: 'Março',
          data: [70, 72, 75, 78, 80, 79],
          borderColor: 'rgb(249, 115, 22)',
          backgroundColor: 'rgba(249, 115, 22, 0.5)',
          tension: 0.4,
        },
        {
          label: 'Abril',
          data: [78, 81, 83, 85, 88, 90],
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          tension: 0.4,
        },
      ],
    };
  },
}; 