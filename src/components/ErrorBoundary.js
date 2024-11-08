"use client";
import { useState, useEffect } from "react";

function ErrorFallback({ error, resetError }) {
  return (
    <div className="error-container p-4 border border-red-500 rounded-md bg-red-50">
      <h2 className="text-lg font-semibold text-red-700">
        Something went wrong
      </h2>
      <pre className="text-sm text-red-600 mt-2">{error.message}</pre>
      {resetError && (
        <button
          onClick={resetError}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function withErrorBoundary(
  Component,
  FallbackComponent = ErrorFallback
) {
  return function ErrorBoundaryWrapper(props) {
    const [error, setError] = useState(null);

    useEffect(() => {
      const errorHandler = (error) => {
        console.error("Error caught by boundary:", error);
        setError(error);
      };

      window.addEventListener("error", errorHandler);
      window.addEventListener("unhandledrejection", errorHandler);

      return () => {
        window.removeEventListener("error", errorHandler);
        window.removeEventListener("unhandledrejection", errorHandler);
      };
    }, []);

    if (error) {
      return (
        <FallbackComponent error={error} resetError={() => setError(null)} />
      );
    }

    return <Component {...props} />;
  };
}

export function ErrorBoundary({ children, FallbackComponent = ErrorFallback }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (event) => {
      console.error("Error caught by boundary:", event.error || event.reason);
      setError(event.error || event.reason);
      event.preventDefault();
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", errorHandler);
    };
  }, []);

  if (error) {
    return (
      <FallbackComponent error={error} resetError={() => setError(null)} />
    );
  }

  return children;
}

export function useErrorHandler() {
  const [error, setError] = useState(null);

  if (error) {
    throw error;
  }

  return setError;
}
