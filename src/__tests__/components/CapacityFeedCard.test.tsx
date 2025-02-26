import { render, screen } from '@testing-library/react';
import { ProfileCard } from '@/app/(auth)/feed/components/Card';
import { ProfileType } from '@/app/(auth)/feed/page';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com'
      }
    },
    status: 'authenticated'
  })
}));

// Mock the contexts
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({ darkMode: false }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

const mockPageContent = {
  "empty-field": "You haven't filled this field yet",
  "navbar-user-profile": "User Profile",
  "body-profile-known-capacities-title": "Known capacities",
  "body-profile-available-capacities-title": "Available capacities",
  "body-profile-wanted-capacities-title": "Wanted capacities",
  "body-profile-languages-title": "Languages",
  "body-profile-section-title-territory": "Territory"
};

jest.mock('@/contexts/AppContext', () => ({
  useApp: () => ({ pageContent: mockPageContent }),
  AppProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('ProfileCard', () => {
  const defaultProps = {
    username: 'Test User',
    pageContent: mockPageContent,
    capacities: []
  };

  describe('Learner Profile', () => {
    const learnerProps = {
      ...defaultProps,
      type: ProfileType.Learner,
      capacities: ['Coding', 'Design'],
      languages: ['English', 'Portuguese'],
      territory: 'Brazil'
    };

    it('should display profile information in the left column', () => {
      render(<ProfileCard {...learnerProps} />);
      
      // Check elements in the left column
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('learner')).toBeInTheDocument();
      expect(screen.getByAltText('User Profile')).toBeInTheDocument();
    });

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

    it('should display profile information in the left column', () => {
      render(<ProfileCard {...sharerProps} />);
      
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('sharer')).toBeInTheDocument();
      expect(screen.getByAltText('User Profile')).toBeInTheDocument();
    });

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
      
      const noDataMessages = screen.getAllByText("You haven't filled this field yet");
      expect(noDataMessages).toHaveLength(3); // One for each empty section
    });
  });

  describe('Layout Structure', () => {
    it('should have a two-column layout on desktop', () => {
      render(<ProfileCard {...defaultProps} type={ProfileType.Learner} />);
      
      const container = screen.getByRole('article');
      expect(container).toHaveClass('md:grid-cols-[350px_1fr]');
    });
  });
});
