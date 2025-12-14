export type User = {
  email: string;
  fullname?: string;
  phone?: string;
  address?: string;
};

export type profileProps = {
  icons?: React.ReactNode;
};

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type SidebarProps = { initialOpen?: boolean };

export type ClassNameProps = { className?: string };
