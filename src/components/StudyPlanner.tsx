
import { Calendar, Clock, Brain, CheckCircle, Play, Pause } from 'lucide-react';
import { useState } from 'react';

interface SensorData {
  lightLevel: number;
  attentionScore: number;
  environmentQuality: number;
  studyEfficiency: number;
  lastUpdate: string;
}

interface StudyPlannerProps {
  sensorData: SensorData;
}

export const StudyPlanner = ({ sensorData }: StudyPlannerProps) => {
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const studyPlan = [
    {
      id: '1',
      time: '09:00 - 10:30',
      subject: 'Farmacologia Clínica',
      type: 'high-focus',
      status: 'completed',
      efficiency: 89,
      recommendation: 'Baseado no seu pico de atenção matinal'
    },
    {
      id: '2',
      time: '10:45 - 11:30',
      subject: 'Casos Clínicos - Cardiologia',
      type: 'review',
      status: 'current',
      efficiency: sensorData.studyEfficiency,
      recommendation: 'Ambiente atual é ideal para este conteúdo'
    },
    {
      id: '3',
      time: '14:00 - 15:00',
      subject: 'Anatomia Patológica',
      type: 'visual',
      status: 'scheduled',
      efficiency: null,
      recommendation: 'Programado para quando sua atenção visual estiver otimizada'
    },
    {
      id: '4',
      time: '15:15 - 16:00',
      subject: 'Revisão Geral + Quiz',
      type: 'light',
      status: 'scheduled',
      efficiency: null,
      recommendation: 'Atividade leve para consolidação'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current':
        return <Play className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'current':
        return 'bg-blue-50 border-blue-200 ring-2 ring-blue-300';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'high-focus':
        return 'bg-red-100 text-red-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'visual':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Planner Adaptativo</h3>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm">
          <Brain className="h-4 w-4" />
          <span>Otimizado por IA</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">📅 Cronograma de Hoje</h4>
        <div className="space-y-4">
          {studyPlan.map((session) => (
            <div key={session.id} className={`p-4 rounded-lg border-2 transition-all duration-200 ${getStatusStyle(session.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(session.status)}
                  <div>
                    <h5 className="font-semibold text-gray-800">{session.subject}</h5>
                    <p className="text-sm text-gray-600">{session.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(session.type)}`}>
                    {session.type === 'high-focus' ? 'Alta Concentração' : 
                     session.type === 'review' ? 'Revisão' :
                     session.type === 'visual' ? 'Visual' : 'Leve'}
                  </span>
                  
                  {session.efficiency && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">{session.efficiency}%</div>
                      <div className="text-xs text-gray-500">Eficiência</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">💡 {session.recommendation}</p>
              </div>
              
              {session.status === 'current' && (
                <div className="mt-3 flex items-center space-x-3">
                  <button 
                    onClick={() => setActiveSession(activeSession === session.id ? null : session.id)}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition-all duration-200"
                  >
                    {activeSession === session.id ? 'Pausar' : 'Continuar'} Sessão
                  </button>
                  <div className="text-sm text-gray-600">
                    Tempo restante: 45 minutos
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">⚡ Ajustes Inteligentes</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-yellow-800">
                Sessão de Anatomia movida para 14h devido à melhor iluminação natural
              </p>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-800">
                Pausa de 15min adicionada entre sessões baseada no seu padrão de atenção
              </p>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-blue-800">
                Quiz interativo programado para consolidar o aprendizado
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">📊 Previsão de Performance</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Farmacologia</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div className="w-full h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs font-medium">89%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cardiologia</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div className="w-4/5 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-xs font-medium">78%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Anatomia</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div className="w-3/4 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-xs font-medium">72%</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Recomendação:</strong> Você está 15% acima da média hoje. 
                Continue seguindo o cronograma adaptativo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
