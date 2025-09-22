import React from 'react';
import { icons } from './icons';

export type IconName = keyof typeof icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const iconData = icons[name];
  if (!iconData) {
    return null; // Or render a fallback icon
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={iconData.viewBox} 
      {...props}
    >
      {iconData.paths.map((path, index) => (
        <path key={index} {...path} />
      ))}
    </svg>
  );
};