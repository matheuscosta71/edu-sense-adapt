
import { useState, useEffect } from 'react';
import { SensorDashboard } from '../components/SensorDashboard';
import { StudyRecommendations } from '../components/StudyRecommendations';
import { StudyPlanner } from '../components/StudyPlanner';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { Navigation } from '../components/Navigation';
import { WelcomeHeader } from '../components/WelcomeHeader';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sensorData, setSensorData] = useState({
    lightLevel: 350,
    attentionScore: 78,
    environmentQuality: 85,
    studyEfficiency: 72,
    lastUpdate: new Date().toLocaleTimeString()
  });

  // Simula dados do sensor em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        lightLevel: Math.floor(Math.random() * 500) + 200,
        attentionScore: Math.floor(Math.random() * 40) + 60,
        environmentQuality: Math.floor(Math.random() * 30) + 70,
        studyEfficiency: Math.floor(Math.random() * 35) + 65,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SensorDashboard sensorData={sensorData} />;
      case 'recommendations':
        return <StudyRecommendations sensorData={sensorData} />;
      case 'planner':
        return <StudyPlanner sensorData={sensorData} />;
      case 'metrics':
        return <PerformanceMetrics sensorData={sensorData} />;
      default:
        return <SensorDashboard sensorData={sensorData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        <WelcomeHeader />
        
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
