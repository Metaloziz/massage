import { Hero } from "@/components/sections/Hero";
import { SoftEarthFeatures } from "@/components/sections/SoftEarthFeatures";
import { About } from "@/components/sections/About";
import { School } from "@/components/sections/School";
import { Prep } from "@/components/sections/Prep";
import { HomeServiceCards } from "@/components/sections/HomeServiceCards";
import { Locations } from "@/components/sections/Locations";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <SoftEarthFeatures />
      <About />
      <School />
      <Prep />
      <HomeServiceCards />
      <Locations />
      <Testimonials />
    </main>
  );
}
