import TabTitle from '../TabTitle'
import {useState} from "react";

export default function Index({tabItems = [], children}) {
  const [activeTab, setActiveTab] = useState(tabItems[0]?.id);

  const [tabs, setTabs] = useState(
    tabItems.map((item, index) => ({
      ...item,
      isActive: index === 0,
    }))
  );

  const handleTabClick = (e) => {
    const tabId = e.target.value;

    setTabs(
      tabs.map(tab => ({
        ...tab,
        isActive: tab.id === tabId,
      }))
    );

    setActiveTab(tabId);
  }

  return (
    <div>
      <div className="tab-items" style={{
        display: 'flex',
        gap: '4px'
      }}>
        {tabs.map((tab) => (
          <TabTitle
            id={tab.id}
            key={tab.id}
            title={tab.title}
            isActive={tab.isActive}
            onClick={handleTabClick}

            style={{
              flexGrow: 1,
              borderRadius: '8px',
            }}/>
        ))}
      </div>

      <div className="tab-content" style={{
        borderRadius: '8px',
        marginTop: '8px',
        marginBottom: '32px',
        padding: '32px',
        border: 'black solid 2px'
      }}>
        {children.filter(e => e.key === activeTab)}
      </div>
    </div>
  );
}