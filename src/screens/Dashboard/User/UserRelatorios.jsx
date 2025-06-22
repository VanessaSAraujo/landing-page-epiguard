import React, { useState } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import capaCard from '../../../assets/capa_card.png';
import { Button } from '../../../components/ui/button';
import { useAuth } from '../../../AuthContext';

const relatorios = [
  {
    titulo: 'Relatório de Taxa de Conformidade por Obra/Turno/Equipe',
    descricao: 'Relatório com o percentual de trabalhadores usando capacete corretamente em cada canteiro, dividido por turno (manhã, tarde, noturno) ou por equipes específicas.',
    img: capaCard,
  },
  {
    titulo: 'Hotspots de Não Conformidade',
    descricao: 'Relatório que mostra os locais e horários com maior incidência de não conformidade.',
    img: capaCard,
  },
  {
    titulo: 'Relatório de Correlação entre Conformidade e Incidentes',
    descricao: 'Analisa a relação entre o uso correto de EPIs e a ocorrência de incidentes.',
    img: capaCard,
  },
  {
    titulo: 'Relatório de Tendência de Ocorrências de Não Conformidade',
    descricao: 'Mostra a evolução das não conformidades ao longo do tempo.',
    img: capaCard,
  },
  {
    titulo: 'Relatório de Previsão de Risco (Análise Preditiva)',
    descricao: 'Utiliza análise preditiva para estimar riscos futuros com base nos dados atuais.',
    img: capaCard,
  },
  {
    titulo: 'Relatório de Otimização de Recursos de Fiscalização',
    descricao: 'Sugere alocação otimizada de recursos de fiscalização com base nos dados coletados.',
    img: capaCard,
  },
];

export default function UserRelatorios() {
  const [popupIdx, setPopupIdx] = useState(null);
  const { user } = useAuth();
  const obra = user?.obraVinculada;

  // Função simulada para download
  const handleDownload = (relatorio) => {
    alert(`Download do relatório: ${relatorio.titulo} da obra ${obra} (simulado)`);
  };

  // Função para abrir/fechar popup
  const handleInfoClick = (idx) => {
    setPopupIdx(idx === popupIdx ? null : idx);
  };

  return (
    <AdminLayout pageTitle="Relatórios">
      <div className="p-7 w-full flex justify-center">
        <div className="w-full max-w-7xl h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden px-4 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[2vw] gap-y-[2vw] justify-items-center w-full">
            {relatorios.map((rel, idx) => (
              <div key={idx} className="bg-white w-full max-w-xs rounded-xl shadow-md p-0 flex flex-col items-center border border-gray-100 relative">
                <img src={rel.img} alt="Capa Relatório" className="w-full h-[9rem] object-contain rounded-t-xl bg-black" />
                <button
                  className="absolute top-[0.5rem] right-[0.5rem] w-[2rem] h-[2rem] flex items-center justify-center bg-white rounded-full shadow text-gray-500 cursor-pointer border border-gray-200 z-20"
                  title="Informações"
                  onClick={() => handleInfoClick(idx)}
                >
                  <span className="font-bold text-lg">i</span>
                </button>
                {/* Popup de descrição */}
                {popupIdx === idx && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[2.5rem] z-30 bg-white rounded-xl shadow-lg p-6 w-full max-w-xs border border-gray-200 flex flex-col items-center animate-fade-in-scale">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#03a650] text-white rounded-full">i</span>
                    </div>
                    <span className="text-gray-700 text-base text-center">{rel.descricao}</span>
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col justify-between w-full">
                  <div className="text-center text-base font-semibold text-gray-700 mb-4 min-h-[60px]">
                    {rel.titulo}
                  </div>
                  <Button
                    className="w-full bg-[#03a650] hover:bg-[#038a42] text-white font-medium rounded-[0.5rem] h-[2.5rem]"
                    onClick={() => handleDownload(rel)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 