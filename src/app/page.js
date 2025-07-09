import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import UpcomingEvents from "@/components/UpcomingEvents";


export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Skills />
        <Testimonials />
        <UpcomingEvents />
        <ContactForm />
      </main>
    
    </>
  );
}
