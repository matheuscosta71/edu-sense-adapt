
import { Clock, User, Lightbulb } from 'lucide-react';

export const WelcomeHeader = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';
  
  return (
    <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl p-6 text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{greeting}, Dr. Ana! 👩‍⚕️</h2>
            <p className="text-primary-foreground/80 mb-4">
              Seus dados sensoriais indicam que este é um momento ideal para estudos de alta concentração.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Sessão ativa há 2h 15min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4" />
                <span>Ambiente otimizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Nível: Residente R2</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-3xl font-bold">85%</div>
              <div className="text-sm text-primary-foreground/70">Eficiência hoje</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
