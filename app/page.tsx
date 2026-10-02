import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClubReviews from "@/components/ClubReviews";
import Flow from "@/components/Flow";
import Activities from "@/components/Activities";
import EventGallery from "@/components/EventGallery";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import RunQuestions from "@/components/RunQuestions";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <EventGallery />
      <Events />
      <Activities />
      <RunQuestions />
      <Flow />
      <ClubReviews />
      <Footer />
    </main>
  );
}