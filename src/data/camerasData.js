/**
 * @file src/data/camerasData.js
 * @description Mock data for the cameras management page.
 */

const statuses = ['Ativo', 'Offline', 'Manutenção'];
const obras = ['Alpha', 'Beta', 'Obra B', 'Obra C', 'Delta', 'Gama'];
const setores = ['Área de Concreto', 'Escavação', 'Fundação', 'Alvenaria', 'Acabamento', 'Estrutura Metálica'];

// Gera 96 itens para simular dados de uma API com paginação
export const cameras = Array.from({ length: 96 }, (_, i) => {
  const id = i + 1;
  const status = statuses[id % statuses.length];
  
  // Simula uma data de última atividade nos últimos 10 dias
  const lastActivityDate = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000);
  
  return {
    id,
    obra: obras[id % obras.length],
    setor: setores[id % setores.length],
    nome: `Câmera ${String(id).padStart(2, '0')}`,
    status,
    ultimaAtividade: lastActivityDate.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(',', ''),
  };
});

export default cameras; 
