import React from 'react';

interface ContentProps {
  title: string;
  description: string;
}

const Content: React.FC<ContentProps> = ({ title, description }) => {
  return (
    <div className="content-box">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Content;