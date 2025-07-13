
import { Eye, Sun, Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface SensorData {
  lightLevel: number;
  attentionScore: number;
  environmentQuality: number;
  studyEfficiency: number;
  lastUpdate: string;
}

interface SensorDashboardProps {
  sensorData: SensorData;
}

export const SensorDashboard = ({ sensorData }: SensorDashboardProps) => {
  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value >= thresholds[1]) return 'text-primary bg-primary/10 border border-primary/20';
    if (value >= thresholds[0]) return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border border-red-400/20';
  };

  const getStatusIcon = (value: number, thresholds: [number, number]) => {
    if (value >= thresholds[1]) return <CheckCircle className="h-5 w-5 text-primary" />;
    return <AlertCircle className="h-5 w-5 text-yellow-400" />;
  };

  const metrics = [
    {
      label: 'Nível de Luz',
      value: sensorData.lightLevel,
      unit: 'lux',
      icon: Sun,
      thresholds: [250, 400] as [number, number],
      recommendation: sensorData.lightLevel > 400 ? 'Ideal para leitura' : 'Considere mais iluminação'
    },
    {
      label: 'Score de Atenção',
      value: sensorData.attentionScore,
      unit: '%',
      icon: Brain,
      thresholds: [60, 80] as [number, number],
      recommendation: sensorData.attentionScore > 80 ? 'Concentração excelente' : 'Faça uma pausa de 5min'
    },
    {
      label: 'Qualidade Ambiental',
      value: sensorData.environmentQuality,
      unit: '%',
      icon: Eye,
      thresholds: [70, 85] as [number, number],
      recommendation: sensorData.environmentQuality > 85 ? 'Ambiente otimizado' : 'Ajuste a posição'
    },
    {
      label: 'Eficiência de Estudo',
      value: sensorData.studyEfficiency,
      unit: '%',
      icon: TrendingUp,
      thresholds: [65, 80] as [number, number],
      recommendation: sensorData.studyEfficiency > 80 ? 'Performance excelente' : 'Revise sua estratégia'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Monitoramento em Tempo Real</h3>
        <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-lg">
          Última atualização: {sensorData.lastUpdate}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:border-primary/30">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-8 w-8 text-primary" />
                {getStatusIcon(metric.value, metric.thresholds)}
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">{metric.label}</h4>
                <div className="text-3xl font-bold text-foreground">
                  {metric.value}
                  <span className="text-lg text-muted-foreground ml-1">{metric.unit}</span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(metric.value, 100)}%` }}
                  ></div>
                </div>
                
                <p className={`text-xs px-3 py-2 rounded-md ${getStatusColor(metric.value, metric.thresholds)}`}>
                  {metric.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <h4 className="text-lg font-semibold mb-4 text-foreground">Análise Inteligente do Ambiente</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <h5 className="font-semibold text-primary mb-2">💡 Iluminação</h5>
            <p className="text-sm text-card-foreground">
              {sensorData.lightLevel > 400 
                ? "Ambiente com iluminação ideal para estudos prolongados"
                : "Recomendamos aumentar a iluminação para melhor concentração"
              }
            </p>
          </div>
          
          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
            <h5 className="font-semibold text-accent mb-2">🧠 Concentração</h5>
            <p className="text-sm text-card-foreground">
              {sensorData.attentionScore > 75
                ? "Seu nível de atenção está excelente para conteúdos complexos"
                : "Considere técnicas de respiração para melhorar o foco"
              }
            </p>
          </div>
          
          <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
            <h5 className="font-semibold text-secondary-foreground mb-2">📊 Performance</h5>
            <p className="text-sm text-card-foreground">
              {sensorData.studyEfficiency > 70
                ? "Você está no seu melhor momento para aprender"
                : "Uma pausa estratégica pode otimizar seu desempenho"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
