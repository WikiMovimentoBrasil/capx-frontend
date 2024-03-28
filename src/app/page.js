import Navbar from "@/components/Navbar";
import Section01 from "@/components/Section01";

export default function Home() {
  return (
    <main className="flex flex-wrap flex-col w-full bg-zinc-50 font-montserrat text-capx-secondary-gray">
      <Navbar></Navbar>
      <Section01></Section01>
    </main>
  );
}
