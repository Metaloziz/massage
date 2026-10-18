import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { School } from "@/components/sections/School";
import { Prep } from "@/components/sections/Prep";
import { HomeServiceCards } from "@/components/sections/HomeServiceCards";
import { Gallery } from "@/components/sections/Gallery";
import { Locations } from "@/components/sections/Locations";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <School />
      <Prep />
      <HomeServiceCards />
      <Gallery />
      <Locations />
      <Testimonials />
    </main>
  );
}
