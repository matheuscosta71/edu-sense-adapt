
import { Brain, Clock, Lightbulb, Target, BookOpen, Coffee } from 'lucide-react';

interface SensorData {
  lightLevel: number;
  attentionScore: number;
  environmentQuality: number;
  studyEfficiency: number;
  lastUpdate: string;
}

interface StudyRecommendationsProps {
  sensorData: SensorData;
}

export const StudyRecommendations = ({ sensorData }: StudyRecommendationsProps) => {
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Recomendações baseadas na atenção
    if (sensorData.attentionScore > 80) {
      recommendations.push({
        type: 'high-focus',
        icon: Brain,
        title: 'Momento Ideal para Conteúdo Complexo',
        description: 'Sua atenção está em pico. Aproveite para estudar Farmacologia ou Anatomia.',
        action: 'Estudar Farmacologia Avançada',
        urgency: 'high',
        timeEstimate: '45-60 min'
      });
    } else if (sensorData.attentionScore < 60) {
      recommendations.push({
        type: 'rest',
        icon: Coffee,
        title: 'Pausa Estratégica Recomendada',
        description: 'Seus níveis de atenção estão baixos. Uma pausa de 10-15 minutos irá otimizar seu aprendizado.',
        action: 'Fazer Pausa Ativa',
        urgency: 'medium',
        timeEstimate: '10-15 min'
      });
    }

    // Recomendações baseadas na luz
    if (sensorData.lightLevel < 250) {
      recommendations.push({
        type: 'environment',
        icon: Lightbulb,
        title: 'Ambiente Precisa de Ajuste',
        description: 'Iluminação insuficiente pode causar fadiga ocular e reduzir a retenção.',
        action: 'Ajustar Iluminação',
        urgency: 'medium',
        timeEstimate: '2 min'
      });
    }

    // Recomendações baseadas na eficiência
    if (sensorData.studyEfficiency > 75) {
      recommendations.push({
        type: 'productivity',
        icon: Target,
        title: 'Alta Performance Detectada',
        description: 'Você está no seu melhor momento. Considere revisar tópicos desafiadores.',
        action: 'Revisar Casos Clínicos',
        urgency: 'high',
        timeEstimate: '30-45 min'
      });
    }

    // Sempre adicionar uma recomendação personalizada
    recommendations.push({
      type: 'personalized',
      icon: BookOpen,
      title: 'Sugestão Personalizada IA',
      description: 'Com base no seu histórico, você aprende melhor Cardiologia neste horário.',
      action: 'Estudar Cardiologia',
      urgency: 'low',
      timeEstimate: '25-30 min'
    });

    return recommendations.slice(0, 4); // Máximo 4 recomendações
  };

  const recommendations = generateRecommendations();

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'border-l-4 border-primary bg-primary/10';
      case 'medium':
        return 'border-l-4 border-yellow-400 bg-yellow-400/10';
      default:
        return 'border-l-4 border-accent bg-accent/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Recomendações Inteligentes</h3>
        <div className="bg-gradient-to-r from-primary to-accent text-background px-4 py-2 rounded-lg text-sm font-medium">
          IA Personalizada
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div key={index} className={`bg-card rounded-xl p-6 shadow-lg ${getUrgencyStyle(rec.urgency)} border border-border hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-background" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <button className="bg-gradient-to-r from-primary to-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200">
                      {rec.action}
                    </button>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{rec.timeEstimate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-xl p-6 text-background">
        <h4 className="text-xl font-bold mb-4">🚀 Insights da IA para Hoje</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/10 rounded-lg p-4 backdrop-blur-sm border border-background/20">
            <h5 className="font-semibold mb-2">📈 Padrão Identificado</h5>
            <p className="text-sm opacity-90">Você tem melhor retenção em ambientes com 350-450 lux de iluminação.</p>
          </div>
          
          <div className="bg-background/10 rounded-lg p-4 backdrop-blur-sm border border-background/20">
            <h5 className="font-semibold mb-2">⏰ Horário Ótimo</h5>
            <p className="text-sm opacity-90">Seus picos de concentração acontecem entre 9h-11h e 14h-16h.</p>
          </div>
          
          <div className="bg-background/10 rounded-lg p-4 backdrop-blur-sm border border-background/20">
            <h5 className="font-semibold mb-2">🎯 Meta da Semana</h5>
            <p className="text-sm opacity-90">Continue assim! Você está 23% acima da média de eficiência.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
