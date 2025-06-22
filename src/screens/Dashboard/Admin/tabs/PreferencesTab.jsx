import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import Switch from '../../../../components/ui/Switch';

const PreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    sendWeeklySummary: false,
    notifyCameraFailures: true,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        // TODO: Substituir por chamada de API real
        const mockPreferences = {
          sendWeeklySummary: false,
          notifyCameraFailures: true,
        };
        setTimeout(() => {
          setPreferences(mockPreferences);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erro ao buscar preferências:", error);
        setLoading(false);
      }
    };
    fetchPreferences();
  }, []);

  const handleSave = async () => {
    setSubmitting(true);
    try {
      // TODO: Substituir por chamada de API real
      console.log('Salvando preferências:', preferences);
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Preferências salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Carregando preferências...</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificações</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch
            id="weekly-summary"
            checked={preferences.sendWeeklySummary}
            onChange={() => handleToggle('sendWeeklySummary')}
          />
          <label htmlFor="weekly-summary" className="text-gray-700 cursor-pointer select-none">Enviar resumo semanal por e-mail</label>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="camera-failures"
            checked={preferences.notifyCameraFailures}
            onChange={() => handleToggle('notifyCameraFailures')}
          />
          <label htmlFor="camera-failures" className="text-gray-700 cursor-pointer select-none">Notificar falhas de câmeras</label>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" className="border-gray-400 text-gray-700" disabled={submitting}>
          Cancelar
        </Button>
        <Button className="bg-green-500 hover:bg-green-600" onClick={handleSave} disabled={submitting}>
          {submitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};

export default PreferencesTab; 