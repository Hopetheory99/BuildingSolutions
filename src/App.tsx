
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import MaterialsCatalog from './components/MaterialsCatalog';
import MaterialDetail from './components/MaterialDetail';
import BuildingChecklist from './components/BuildingChecklist';
import Gallery from './components/Gallery';
import WhatsAppButton from './components/WhatsAppButton';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);

  const handleNavigate = (page: string, materialId?: number) => {
    if (page === 'material-detail' && materialId) {
      setSelectedMaterialId(materialId);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'materials':
        return <MaterialsCatalog onNavigate={handleNavigate} />;
      case 'material-detail':
        return selectedMaterialId ? (
          <MaterialDetail 
            key={selectedMaterialId}
            materialId={selectedMaterialId} 
            onBack={() => handleNavigate('materials')}
            onNavigateToMaterial={(id) => handleNavigate('material-detail', id)}
          />
        ) : <MaterialsCatalog onNavigate={handleNavigate} />;
      case 'checklist':
        return <BuildingChecklist />;
      case 'gallery':
        return <Gallery />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Services />
            <About />
            <Team />
            <Testimonials />
            <Clients />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={currentPage} onNavigate={(page) => handleNavigate(page)} />
      <main className="flex-grow pt-16">
        {renderContent()}
      </main>
      <Footer onNavigate={(page) => handleNavigate(page)} />
      <BackToTopButton />
      <WhatsAppButton />
    </div>
  );
};

export default App;
