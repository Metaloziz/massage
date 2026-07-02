import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Locations } from "@/components/sections/Locations";
import { Testimonials } from "@/components/sections/Testimonials";
import { Booking } from "@/components/sections/Booking";

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Services />
      <Process />
      <Gallery />
      <Locations />
      <Testimonials />
      <Booking />
    </main>
  );
}
