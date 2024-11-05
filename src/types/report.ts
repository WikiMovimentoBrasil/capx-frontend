export interface ReportMainWrapperProps {
  session: boolean;
  language: string;
  darkMode: string;
  pageContent: Record<string, string>;
  reportId?: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface ReportError {
  message: string;
  status: number;
}
