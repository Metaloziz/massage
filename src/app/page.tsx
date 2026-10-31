import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SoftEarthFeatures } from "@/components/sections/SoftEarthFeatures";

const About = dynamic(() =>
  import("@/components/sections/About").then((m) => m.About),
);
const School = dynamic(() =>
  import("@/components/sections/School").then((m) => m.School),
);
const Prep = dynamic(() =>
  import("@/components/sections/Prep").then((m) => m.Prep),
);
const HomeServiceCards = dynamic(() =>
  import("@/components/sections/HomeServiceCards").then(
    (m) => m.HomeServiceCards,
  ),
);
const Locations = dynamic(() =>
  import("@/components/sections/Locations").then((m) => m.Locations),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials),
);

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
