
import { TrendingUp, Award, Target, Clock, BarChart3, Brain } from 'lucide-react';

interface SensorData {
  lightLevel: number;
  attentionScore: number;
  environmentQuality: number;
  studyEfficiency: number;
  lastUpdate: string;
}

interface PerformanceMetricsProps {
  sensorData: SensorData;
}

export const PerformanceMetrics = ({ sensorData }: PerformanceMetricsProps) => {
  const weeklyData = [
    { day: 'Seg', efficiency: 72, hours: 6.5, attention: 78 },
    { day: 'Ter', efficiency: 85, hours: 7.2, attention: 82 },
    { day: 'Qua', efficiency: 79, hours: 6.8, attention: 75 },
    { day: 'Qui', efficiency: 88, hours: 8.1, attention: 85 },
    { day: 'Sex', efficiency: 82, hours: 7.5, attention: 80 },
    { day: 'Sáb', efficiency: 75, hours: 5.2, attention: 73 },
    { day: 'Dom', efficiency: sensorData.studyEfficiency, hours: 4.2, attention: sensorData.attentionScore }
  ];

  const achievements = [
    {
      title: '🔥 Sequência de Estudos',
      description: '7 dias consecutivos',
      progress: 100,
      type: 'streak'
    },
    {
      title: '🎯 Meta Semanal',
      description: '45h de 40h planejadas',
      progress: 112,
      type: 'goal'
    },
    {
      title: '🧠 Concentração Master',
      description: 'Média de atenção > 80%',
      progress: 85,
      type: 'attention'
    },
    {
      title: '⚡ Eficiência Elite',
      description: 'Top 5% da turma',
      progress: 95,
      type: 'efficiency'
    }
  ];

  const subjects = [
    { name: 'Farmacologia', progress: 85, hours: 12.5, lastStudy: '2h atrás' },
    { name: 'Cardiologia', progress: 72, hours: 8.3, lastStudy: '1 dia' },
    { name: 'Anatomia', progress: 68, hours: 9.7, lastStudy: '3h atrás' },
    { name: 'Patologia', progress: 91, hours: 6.2, lastStudy: '5h atrás' },
    { name: 'Neurologia', progress: 45, hours: 4.1, lastStudy: '2 dias' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Métricas de Performance</h3>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-lg text-sm">
          <Award className="h-4 w-4" />
          <span>Nível Expert</span>
        </div>
      </div>

      {/* Cards de métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <BarChart3 className="h-8 w-8" />
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">82%</div>
            <div className="text-blue-100">Eficiência Média</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <Clock className="h-8 w-8" />
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">45.8h</div>
            <div className="text-primary-foreground/70">Horas na Semana</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <Brain className="h-8 w-8" />
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">79%</div>
            <div className="text-purple-100">Atenção Média</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-accent to-primary rounded-xl p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <Target className="h-8 w-8" />
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">7</div>
            <div className="text-primary-foreground/70">Dias Consecutivos</div>
          </div>
        </div>
      </div>

      {/* Gráfico semanal */}
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <h4 className="text-lg font-semibold mb-6 text-foreground">📈 Performance Semanal</h4>
        <div className="flex items-end space-x-4 h-64">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="flex flex-col items-center space-y-2 mb-2">
                <div className="text-xs font-medium text-muted-foreground">{day.efficiency}%</div>
                <div 
                  className="w-8 bg-gradient-to-t from-blue-500 to-primary rounded-t-md transition-all duration-500"
                  style={{ height: `${(day.efficiency / 100) * 200}px` }}
                ></div>
              </div>
              <div className="text-sm font-medium text-foreground">{day.day}</div>
              <div className="text-xs text-muted-foreground">{day.hours}h</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conquistas */}
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <h4 className="text-lg font-semibold mb-4 text-foreground">🏆 Conquistas</h4>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-foreground">{achievement.title}</h5>
                  <span className="text-sm font-medium text-primary">{achievement.progress}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(achievement.progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progresso por matéria */}
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <h4 className="text-lg font-semibold mb-4 text-foreground">📚 Progresso por Matéria</h4>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-foreground">{subject.name}</h5>
                    <span className="text-sm text-muted-foreground">{subject.lastStudy}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-primary h-2 rounded-full"
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">{subject.progress}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{subject.hours}h estudadas</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights da IA */}
      <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-xl p-6 text-primary-foreground">
        <h4 className="text-xl font-bold mb-4">🤖 Insights da IA</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-foreground/20 rounded-lg p-4 backdrop-blur-sm border border-primary-foreground/20">
            <h5 className="font-semibold mb-2">📊 Análise de Padrões</h5>
            <p className="text-sm">
              Sua eficiência aumenta 23% quando você estuda em ambientes com luz natural entre 9h-12h.
            </p>
          </div>
          
          <div className="bg-primary-foreground/20 rounded-lg p-4 backdrop-blur-sm border border-primary-foreground/20">
            <h5 className="font-semibold mb-2">🎯 Próxima Meta</h5>
            <p className="text-sm">
              Foque em Neurologia nos próximos 3 dias para atingir 70% de progresso antes da prova.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
