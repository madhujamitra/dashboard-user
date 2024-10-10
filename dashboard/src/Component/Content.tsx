import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faChartBar } from '@fortawesome/free-solid-svg-icons';

interface ContentProps {
  title: string;
  description: string;
  icon: 'database' | 'chart';
}

const Content: React.FC<ContentProps> = ({ title, description, icon }) => {
  const selectedIcon = icon === 'database' ? faDatabase : faChartBar;

  return (
    <div className="content-box">
      <FontAwesomeIcon icon={selectedIcon} className="content-icon" /> 
      <div>
      <h3>{title}</h3>
      <p>{description}</p>
      </div>

    </div>
  );
};

export default Content;
