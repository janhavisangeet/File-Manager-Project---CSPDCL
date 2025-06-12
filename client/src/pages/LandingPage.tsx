import { Navbar } from "@/landingpg/components/Navbar";
import { Hero } from "@/landingpg/components/Hero";
//import { Sponsors } from "@/landingpg/components/Sponsors";
import { About } from "@/landingpg/components/About";
// import { HowItWorks } from "@/landingpg/components/HowItWorks";
// import { Features } from "@/landingpg/components/Features";
// import { Services } from "@/landingpg/components/Services";
//import { Cta } from "@/landingpg/components/Cta";
// import { Testimonials } from "@/landingpg/components/Testimonials";
// import { Team } from "@/landingpg/components/Team";
// import { Pricing } from "@/landingpg/components/Pricing";
// import { Newsletter } from "@/landingpg/components/Newsletter";
// import { FAQ } from "@/landingpg/components/FAQ";
import { Footer } from "@/landingpg/components/Footer";
import { ScrollToTop } from "@/landingpg/components/ScrollToTop";
function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Sponsors /> */}
      <About />
      {/* <HowItWorks />
       <Features />
     <Services />
      <Cta /> */}
      {/* <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ /> */}
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default LandingPage;
