import { render, screen } from '@testing-library/react';

import { ProfileCard } from '@/app/(auth)/feed/components/Card';
import { ProfileType } from '@/app/(auth)/feed/page';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock the contexts
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({ darkMode: false }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

const mockPageContent = {
  "no-data-available": "No data available",
  "navbar-user-profile": "User Profile"
};

jest.mock('@/contexts/AppContext', () => ({
  useApp: () => ({ pageContent: mockPageContent }),
  AppProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('ProfileCard', () => {
  const defaultProps = {
    username: 'Test User',
    pageContent: mockPageContent
  };

  describe('Learner Profile', () => {
    const learnerProps = {
      ...defaultProps,
      type: ProfileType.Learner,
      capacities: ['Coding', 'Design'],
      languages: ['English', 'Portuguese'],
      territory: 'Brazil'
    };

    it('should display wanted capacities section for learner', () => {
      render(<ProfileCard {...learnerProps} />);
      
      expect(screen.getByText('Wanted capacities')).toBeInTheDocument();
      expect(screen.getByText('Coding')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
    });

    it('should display languages for learner', () => {
      render(<ProfileCard {...learnerProps} />);
      
      expect(screen.getByText('Languages')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Portuguese')).toBeInTheDocument();
    });

    it('should display territory for learner', () => {
      render(<ProfileCard {...learnerProps} />);
      
      expect(screen.getByText('Territory')).toBeInTheDocument();
      expect(screen.getByText('Brazil')).toBeInTheDocument();
    });
  });

  describe('Sharer Profile', () => {
    const sharerProps = {
      ...defaultProps,
      type: ProfileType.Sharer,
      capacities: ['Teaching', 'Mentoring'],
      languages: ['Spanish', 'French'],
      territory: 'Argentina'
    };

    it('should display available capacities section for sharer', () => {
      render(<ProfileCard {...sharerProps} />);
      
      expect(screen.getByText('Available capacities')).toBeInTheDocument();
      expect(screen.getByText('Teaching')).toBeInTheDocument();
      expect(screen.getByText('Mentoring')).toBeInTheDocument();
    });

    it('should display languages for sharer', () => {
      render(<ProfileCard {...sharerProps} />);
      
      expect(screen.getByText('Languages')).toBeInTheDocument();
      expect(screen.getByText('Spanish')).toBeInTheDocument();
      expect(screen.getByText('French')).toBeInTheDocument();
    });

    it('should display territory for sharer', () => {
      render(<ProfileCard {...sharerProps} />);
      
      expect(screen.getByText('Territory')).toBeInTheDocument();
      expect(screen.getByText('Argentina')).toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('should display no-data message when arrays are empty', () => {
      render(<ProfileCard {...defaultProps} type={ProfileType.Learner} />);
      
      const noDataMessages = screen.getAllByText('No data available');
      expect(noDataMessages).toHaveLength(3); // One for each empty section
    });
  });
});
