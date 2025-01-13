import React from 'react';

interface IconProps {
  iconSrc: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ iconSrc, className }) => {
  return <img src={iconSrc} alt="Icon" className={className} />;
};

export default Icon;
