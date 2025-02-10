import { Metadata } from "next";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export const metadata: Metadata = {
  title: "CapX - Capacity Exchange",
  description: "Exchange your capacities with other users",
};

export default async function Home() {
  return <ApplicationWrapper />;
}
