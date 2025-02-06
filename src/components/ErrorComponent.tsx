import { AlertTriangle } from "lucide-react";

interface ErrorComponentProps {
  message: string;
  className?: string;
}

export default function ErrorComponent({ message, className = "" }: ErrorComponentProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <AlertTriangle className="w-12 h-12 text-red-500 mb-2" />
      <p className="text-red-500 text-center font-medium">{message}</p>
    </div>
  );
} 