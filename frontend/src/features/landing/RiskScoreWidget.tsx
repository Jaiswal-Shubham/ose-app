import React from 'react';
import { Icon, IconName } from '../../components/Icon/Icon';
import styles from './RiskScoreWidget.module.css';

interface RiskScoreWidgetProps {
  score?: number;
  riskLevel?: string;
}

interface BulletPointProps {
    iconName?: IconName;
    text: React.ReactNode;
}

const mattersData: BulletPointProps[] = [
    { text: 'Supply chain attacks increased 650% in 2022' },
    { text: '70% of vulnerabilities are in dependencies, not your code' },
    { text: 'Medium risk dependencies need active monitoring' }
];

const analysisData: BulletPointProps[] = [
    { iconName: 'communityHealth', text: 'Community Health' },
    { iconName: 'security', text: 'Security Practices' },
    { iconName: 'supplyChain', text: 'Supply Chain Integrity' }
];

const BulletPoint: React.FC<BulletPointProps> = ({ iconName, text }) => (
    <div className={styles['bullet-item']}>
        {iconName ? <Icon name={iconName} className={styles['analysis-icon']}/> : <div className={styles['bullet-point']}></div>}
        <div className={styles['bullet-text']}>
            <div className={styles['bullet-content']}>{text}</div>
        </div>
    </div>
);

const RiskScoreWidget: React.FC<RiskScoreWidgetProps> = ({ score = 56, riskLevel = 'Medium Risk' }) => {
  return (
    <div className={styles['risk-score-container']}>
        <div className={styles['risk-title-section']}>
            <div className={styles['risk-title']}>RISK SCORE</div>
        </div>
        <div className={styles['risk-chart-section']}>
            <div className={styles['chart-wrapper']}>
              <svg className={styles['chart-background']} width="229" height="180" viewBox="0 0 229 180">
                <path d="M229 0H0V180H229V0Z" fill="#00102A"/>
              </svg>
              <div className={styles['score-label']}>SCORE</div>
              <div className={styles['score-value']}>{score}%</div>
              <svg className={styles['gauge-background']} width="145" height="78" viewBox="0 0 145 78">
                <path d="M5 72.5C5 54.5979 12.1116 37.429 24.7703 24.7703C37.429 12.1116 54.5979 5 72.5 5C90.4021 5 107.571 12.1116 120.23 24.7703C132.888 37.429 140 54.5979 140 72.5H126.5C126.5 58.1783 120.811 44.4432 110.684 34.3162C100.557 24.1893 86.8217 18.5 72.5 18.5C58.1783 18.5 44.4432 24.1893 34.3162 34.3162C24.1893 44.4432 18.5 58.1783 18.5 72.5H5Z" fill="#5473A2" stroke="#5473A2" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className={styles['gauge-progress']} width="179" height="150" viewBox="0 0 179 150">
                  <mask id="mask0_157_1730" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="179" height="150"><path d="M178.5 0.5V149.5H0.5V0.5H178.5Z" fill="white" stroke="white"/></mask>
                  <g mask="url(#mask0_157_1730)"><path d="M22 97.5C22 87.5639 24.1936 77.7503 28.4242 68.7599C32.6548 59.7695 38.818 51.8239 46.4739 45.4904C54.1298 39.1569 63.0895 34.5916 72.7134 32.1206C82.3374 29.6496 92.3881 29.3338 102.148 31.1956L101.516 34.5108C92.2437 32.7421 82.6955 32.0422 73.5528 35.3896C64.41 37.7371 55.8983 42.074 48.6252 48.0908C41.3521 54.1077 35.497 61.656 31.478 70.1969C27.4589 78.7378 25.375 88.0607 25.375 97.5H22Z" fill="#FA4B42" stroke="url(#paint0_linear_157_1730)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/></g>
                  <defs><linearGradient id="paint0_linear_157_1730" x1="62.0741" y1="30" x2="62.0741" y2="97.5" gradientUnits="userSpaceOnUse"><stop stopColor="#F6FF45"/><stop offset="1" stopColor="#FF7E4B"/></linearGradient></defs>
              </svg>
              <div className={styles['gauge-labels']}>
                <div className={styles['gauge-label-start']}>0</div>
                <div className={styles['gauge-label-end']}>100</div>
              </div>
              <div className={styles['risk-badge']}>
                <span>{riskLevel}</span>
              </div>
            </div>
        </div>

        <div className={styles['risk-description-section']}>
            <div className={styles['matters-section']}>
                <div className={styles['section-header']}>
                  <div className={styles['section-title']}>Why This Score Matters</div>
                </div>
                {mattersData.map((item, index) => <BulletPoint key={index} {...item} />)}
            </div>
            <div className={styles['analyze-section']}>
                <div className={styles['section-header']}>
                  <div className={styles['section-title']}>What We Analyze</div>
                </div>
                {analysisData.map((item, index) => <BulletPoint key={index} {...item} />)}
            </div>
        </div>
    </div>
  );
};

export default RiskScoreWidget;