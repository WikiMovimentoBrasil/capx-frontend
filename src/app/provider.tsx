"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AppProvider } from "@/contexts/AppContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>{children}</AppProvider>
    </QueryClientProvider>
  );
}
