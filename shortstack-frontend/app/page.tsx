import Image from "next/image";
import { Navbar } from "./_components/navbar";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <Navbar />
      <Hero />
    </div>
  );
}
