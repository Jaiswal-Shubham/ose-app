import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from './HeroSection';

describe('HeroSection Component', () => {
  it('should render the main title and subtitle', () => {
    render(<HeroSection />);
  
    expect(screen.getByText(/What's The Cost Of Using Open Source Blindly?/i)).toBeInTheDocument();
    expect(screen.getByText(/Open source is powerful — but it also opens the door/i)).toBeInTheDocument();
  });

  it('should render exactly three stat cards with correct data', () => {
    // Arrange
    render(<HeroSection />);
    
    // Act & Assert: Check for the unique content of each card
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText(/of companies are using/i)).toBeInTheDocument();

    expect(screen.getByText('76%')).toBeInTheDocument();
    expect(screen.getByText(/of code in codebases is/i)).toBeInTheDocument();

    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText(/of maintainers are/i)).toBeInTheDocument();
  });
});
