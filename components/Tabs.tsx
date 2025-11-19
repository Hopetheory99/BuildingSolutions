import React, { useState, useRef } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = (event: React.KeyboardEvent, tabIndex: number) => {
    let newIndex = tabIndex;
    const tabCount = tabs.length;

    if (event.key === 'ArrowRight') {
      newIndex = (tabIndex + 1) % tabCount;
    } else if (event.key === 'ArrowLeft') {
      newIndex = (tabIndex - 1 + tabCount) % tabCount;
    } else {
      return;
    }
    
    event.preventDefault();
    const nextTab = tabRefs.current[newIndex];
    if (nextTab) {
      nextTab.focus();
      setActiveTab(tabs[newIndex].id);
    }
  };

  return (
    <>
      <div className="border-b border-gray-700/50 px-6 flex-shrink-0">
        <div role="tablist" aria-label="Project details" className="flex -mb-px">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              ref={el => tabRefs.current[index] = el}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={e => handleTabKeyDown(e, index)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-800 ${
                activeTab === tab.id
                  ? 'border-accent text-white'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6 bg-transparent overflow-y-auto flex-1">
        {tabs.map(tab => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            tabIndex={0}
            className={`focus:outline-none ${activeTab === tab.id ? 'animate-fade-in' : ''}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tabs;
