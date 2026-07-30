import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import PerformanceView from './components/PerformanceView';
import DocumentsView from './components/DocumentsView';
import ChatView from './components/ChatView';
import CRMView from './components/CRMView';
import FinanceView from './components/FinanceView';
import SettingsView from './components/SettingsView';
import Modals from './components/Modals';
import OnboardingWizard from './components/OnboardingWizard';

import { useCustomers, useInvoices, useDocuments, useStats } from './db/hooks';
import { checkOllamaConnection, listModels, RECOMMENDED_MODELS } from './services/ollama';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ramUsage, setRamUsage] = useState(5.8);
  const [cpuUsage, setCpuUsage] = useState(38);

  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [ollamaModels, setOllamaModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem('onboardingCompleted') !== 'true';
  });

  const stats = useStats();
  const customers = useCustomers() || [];
  const invoices = useInvoices() || [];
  const documents = useDocuments() || [];

  // Modal State
  const [activeModal, setActiveModal] = useState(null);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    async function initOllama() {
      const { connected } = await checkOllamaConnection();
      setOllamaConnected(connected);
      if (connected) {
        const models = await listModels();
        setOllamaModels(models);
        if (models.length > 0) {
          setSelectedModel(models[0].name);
        }
      }
    }
    initOllama();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <OnboardingWizard 
        onComplete={handleOnboardingComplete}
        ollamaConnected={ollamaConnected}
        ollamaModels={ollamaModels}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050811] text-white flex flex-col font-['Inter'] antialiased">
      {/* Top Navbar */}
      <Navbar
        selectedModel={selectedModel}
        ollamaConnected={ollamaConnected}
        ramUsage={ramUsage}
        cpuUsage={cpuUsage}
        onOpenSettings={() => setActiveTab('settings')}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Main Layout Container */}
      <div className="flex flex-1 w-full">
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Workspace Area */}
        <main className="flex-1 bg-[#0A0F1D] overflow-y-auto pb-12">
          {activeTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              onOpenModal={(modalName) => setActiveModal(modalName)}
            />
          )}

          {activeTab === 'performance' && (
            <PerformanceView
              currentModel={selectedModel}
              ramUsage={ramUsage}
              cpuUsage={cpuUsage}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsView
              documents={documents}
              onOpenUploadModal={() => setActiveModal('uploadDoc')}
            />
          )}

          {activeTab === 'chat' && (
            <ChatView
              selectedModel={selectedModel}
              ollamaConnected={ollamaConnected}
              ramUsage={ramUsage}
              cpuUsage={cpuUsage}
            />
          )}

          {activeTab === 'crm' && (
            <CRMView
              customers={customers}
              onOpenAddCustomer={() => setActiveModal('addCustomer')}
            />
          )}

          {activeTab === 'finance' && (
            <FinanceView
              invoices={invoices}
              onOpenCreateInvoice={() => setActiveModal('createInvoice')}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              ollamaModels={ollamaModels}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              ollamaConnected={ollamaConnected}
              ramUsage={ramUsage}
            />
          )}
        </main>
      </div>

      {/* Interactive Dialog Modals */}
      <Modals
        activeModal={activeModal}
        onCloseModal={() => setActiveModal(null)}
      />
    </div>
  );
}
