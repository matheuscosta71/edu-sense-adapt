
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
    if (value >= thresholds[1]) return 'text-green-600 bg-green-50';
    if (value >= thresholds[0]) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusIcon = (value: number, thresholds: [number, number]) => {
    if (value >= thresholds[1]) return <CheckCircle className="h-5 w-5 text-green-600" />;
    return <AlertCircle className="h-5 w-5 text-yellow-600" />;
  };

  const metrics = [
    {
      label: 'Nível de Luz',
      value: sensorData.lightLevel,
      unit: 'lux',
      icon: Sun,
      thresholds: [250, 400],
      recommendation: sensorData.lightLevel > 400 ? 'Ideal para leitura' : 'Considere mais iluminação'
    },
    {
      label: 'Score de Atenção',
      value: sensorData.attentionScore,
      unit: '%',
      icon: Brain,
      thresholds: [60, 80],
      recommendation: sensorData.attentionScore > 80 ? 'Concentração excelente' : 'Faça uma pausa de 5min'
    },
    {
      label: 'Qualidade Ambiental',
      value: sensorData.environmentQuality,
      unit: '%',
      icon: Eye,
      thresholds: [70, 85],
      recommendation: sensorData.environmentQuality > 85 ? 'Ambiente otimizado' : 'Ajuste a posição'
    },
    {
      label: 'Eficiência de Estudo',
      value: sensorData.studyEfficiency,
      unit: '%',
      icon: TrendingUp,
      thresholds: [65, 80],
      recommendation: sensorData.studyEfficiency > 80 ? 'Performance excelente' : 'Revise sua estratégia'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Monitoramento em Tempo Real</h3>
        <div className="text-sm text-gray-500">
          Última atualização: {sensorData.lastUpdate}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
                {getStatusIcon(metric.value, metric.thresholds)}
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">{metric.label}</h4>
                <div className="text-3xl font-bold text-gray-800">
                  {metric.value}
                  <span className="text-lg text-gray-500 ml-1">{metric.unit}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(metric.value, 100)}%` }}
                  ></div>
                </div>
                
                <p className={`text-xs px-2 py-1 rounded-md ${getStatusColor(metric.value, metric.thresholds)}`}>
                  {metric.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Análise Inteligente do Ambiente</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">💡 Iluminação</h5>
            <p className="text-sm text-blue-700">
              {sensorData.lightLevel > 400 
                ? "Ambiente com iluminação ideal para estudos prolongados"
                : "Recomendamos aumentar a iluminação para melhor concentração"
              }
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <h5 className="font-semibold text-green-800 mb-2">🧠 Concentração</h5>
            <p className="text-sm text-green-700">
              {sensorData.attentionScore > 75
                ? "Seu nível de atenção está excelente para conteúdos complexos"
                : "Considere técnicas de respiração para melhorar o foco"
              }
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-800 mb-2">📊 Performance</h5>
            <p className="text-sm text-purple-700">
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
