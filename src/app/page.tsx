import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { WhyUs } from "@/components/WhyUs";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WebSiteJsonLd, CatalogueJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <WebSiteJsonLd />
      <CatalogueJsonLd />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedCategories />
        <WhyUs />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
