import { Link } from "react-router-dom";
import { Building2, HardHat, KeyRound, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-home.jpg";

const Home = () => {
  const pillars = useScrollAnimation();
  const whyChoose = useScrollAnimation();
  const stats = useScrollAnimation();
  const testimonialsSection = useScrollAnimation();
  const cta = useScrollAnimation();
  
  const services = [
    {
      icon: Building2,
      title: "Real Estate",
      description: "Expert guidance in residential and commercial property sales, investment consulting, and market analysis.",
      link: "/real-estate",
    },
    {
      icon: HardHat,
      title: "Construction",
      description: "Custom builds, commercial projects, and renovations delivered with precision and integrity.",
      link: "/construction",
    },
    {
      icon: KeyRound,
      title: "Property Management",
      description: "Comprehensive tenant services, maintenance coordination, and detailed owner reporting.",
      link: "/property-management",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Property Investor",
      text: "Khoroush transformed our investment strategy. Their integrated approach saved us time and maximized our returns.",
    },
    {
      name: "David Chen",
      role: "Commercial Developer",
      text: "From design to completion, the construction team delivered beyond expectations. True professionals.",
    },
    {
      name: "Emily Rodriguez",
      role: "Property Owner",
      text: "Their management services are exceptional. I travel often and never worry about my properties.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            From Blueprint to Key-Turn
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            We Handle It All.
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Your complete property partner for real estate, construction, and management across Canada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
                Book a Consultation
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-6"
              >
                Learn Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section ref={pillars.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${pillars.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Three Pillars. One Vision.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive property solutions designed around your success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`transition-all duration-700 ${pillars.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChoose.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-700 ${whyChoose.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Why Choose Khoroush?
              </h2>
              <p className="text-lg text-muted-foreground">
                We don't just build properties. We build trust. Our integrated approach means seamless coordination, 
                superior quality, and a single point of accountability.
              </p>
              
              <ul className="space-y-4">
                {[
                  "End-to-end property solutions",
                  "Decades of combined expertise",
                  "Transparent communication",
                  "Client-focused approach",
                  "Proven track record across Canada",
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={24} />
                    <span className="text-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div ref={stats.ref} className="grid grid-cols-2 gap-6">
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "25+", label: "Years Experience" },
                { number: "$500M+", label: "Portfolio Value" },
              ].map((stat, index) => (
                <Card 
                  key={index}
                  className={`bg-card border-primary/20 transition-all duration-700 ${stats.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsSection.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${testimonialsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from those who trusted us with their property journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`bg-card border-primary/20 hover:border-primary transition-all duration-700 hover:shadow-gold ${testimonialsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 space-y-4">
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="pt-4 border-t border-primary/20">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={cta.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className={`bg-gradient-gold border-none transition-all duration-700 ${cta.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <CardContent className="p-12 md:p-16 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Let's discuss how we can bring your property vision to life with our integrated services.
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-8 py-6 mt-4"
                >
                  Book Your Consultation
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
