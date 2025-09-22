import React from 'react';
import { Icon, IconName } from '../../components/Icon/Icon';
import styles from './HeroSection.module.css';

interface StatCardProps {
  iconName: IconName;
  statNumber: string;
  description: React.ReactNode;
}

const statsData: StatCardProps[] = [
  {
    iconName: 'stat1',
    statNumber: '90%',
    description: <>of companies are using <br/> open source projects</>,
  },
  {
    iconName: 'stat2',
    statNumber: '76%',
    description: <>of code in codebases is <br/> open source</>,
  },
  {
    iconName: 'stat3',
    statNumber: '60%',
    description: <>of maintainers are <br/>not paid for their work</>,
  },
];

const StatCard: React.FC<StatCardProps> = ({ iconName, statNumber, description }) => (
  <div className={styles['stat-card']}>
    <Icon name={iconName} className={styles['stat-icon']} />
    <div className={styles['stat-number']}>{statNumber}</div>
    <div className={styles['stat-description']}>{description}</div>
  </div>
);

const HeroSection: React.FC = () => {
  return (
    <section className="primary-section">
      <div className="title-subtitle-container">
        <div className="primary-title">
          What's The Cost Of Using Open <br /> Source Blindly?
        </div>
        <div className="primary-subtitle">
          Open source is powerful — but it also opens the door to supply chain attacks. <br /> 
          Too often, essential libraries are maintained by just a handful of volunteers 
          without the <br /> resources to keep them secure.
        </div>
      </div>
      
      <div className={styles['stats-cards']}>
        {statsData.map(stat => (
          <StatCard key={stat.iconName} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;