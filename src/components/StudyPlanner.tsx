
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
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'current':
        return <Play className="h-5 w-5 text-accent" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/10 border-primary/30';
      case 'current':
        return 'bg-accent/10 border-accent/30 ring-2 ring-accent/20';
      default:
        return 'bg-muted/20 border-border';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'high-focus':
        return 'bg-red-400/20 text-red-400 border border-red-400/30';
      case 'review':
        return 'bg-accent/20 text-accent border border-accent/30';
      case 'visual':
        return 'bg-purple-400/20 text-purple-400 border border-purple-400/30';
      default:
        return 'bg-primary/20 text-primary border border-primary/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Planner Adaptativo</h3>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-background px-4 py-2 rounded-lg text-sm">
          <Brain className="h-4 w-4" />
          <span>Otimizado por IA</span>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <h4 className="text-lg font-semibold mb-4 text-foreground">📅 Cronograma de Hoje</h4>
        <div className="space-y-4">
          {studyPlan.map((session) => (
            <div key={session.id} className={`p-4 rounded-lg border-2 transition-all duration-200 ${getStatusStyle(session.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(session.status)}
                  <div>
                    <h5 className="font-semibold text-foreground">{session.subject}</h5>
                    <p className="text-sm text-muted-foreground">{session.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-medium ${getTypeColor(session.type)}`}>
                    {session.type === 'high-focus' ? 'Alta Concentração' : 
                     session.type === 'review' ? 'Revisão' :
                     session.type === 'visual' ? 'Visual' : 'Leve'}
                  </span>
                  
                  {session.efficiency && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{session.efficiency}%</div>
                      <div className="text-xs text-muted-foreground">Eficiência</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-primary">💡 {session.recommendation}</p>
              </div>
              
              {session.status === 'current' && (
                <div className="mt-3 flex items-center space-x-3">
                  <button 
                    onClick={() => setActiveSession(activeSession === session.id ? null : session.id)}
                    className="bg-gradient-to-r from-primary to-accent text-background px-4 py-2 rounded-lg text-sm hover:shadow-md transition-all duration-200 font-medium"
                  >
                    {activeSession === session.id ? 'Pausar' : 'Continuar'} Sessão
                  </button>
                  <div className="text-sm text-muted-foreground">
                    Tempo restante: 45 minutos
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <h4 className="text-lg font-semibold mb-4 text-foreground">⚡ Ajustes Inteligentes</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <p className="text-sm text-yellow-400">
                Sessão de Anatomia movida para 14h devido à melhor iluminação natural
              </p>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <p className="text-sm text-primary">
                Pausa de 15min adicionada entre sessões baseada no seu padrão de atenção
              </p>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <p className="text-sm text-accent">
                Quiz interativo programado para consolidar o aprendizado
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <h4 className="text-lg font-semibold mb-4 text-foreground">📊 Previsão de Performance</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Farmacologia</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-muted rounded-full">
                  <div className="w-full h-3 bg-primary rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-foreground">89%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cardiologia</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-muted rounded-full">
                  <div className="w-4/5 h-3 bg-accent rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-foreground">78%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Anatomia</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-muted rounded-full">
                  <div className="w-3/4 h-3 bg-purple-400 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-foreground">72%</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <p className="text-sm text-card-foreground">
                <strong className="text-primary">Recomendação:</strong> Você está 15% acima da média hoje. 
                Continue seguindo o cronograma adaptativo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
