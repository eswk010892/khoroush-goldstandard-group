import { Hammer, Building, Wrench, ClipboardCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import ConstructionProjectCard from "@/components/ConstructionProjectCard";
import heroImage from "@/assets/hero-construction.jpg";

const Construction = () => {
  const servicesSection = useScrollAnimation();
  const projectsSection = useScrollAnimation();
  const timelineSection = useScrollAnimation();
  const whyChoose = useScrollAnimation();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['construction-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('construction_projects')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
  
  const services = [
    {
      icon: Building,
      title: "Custom Builds",
      description: "Bespoke residential and commercial construction from ground up.",
    },
    {
      icon: Hammer,
      title: "Commercial Projects",
      description: "Large-scale developments with meticulous planning and execution.",
    },
    {
      icon: Wrench,
      title: "Renovations",
      description: "Transform existing spaces with modern design and functionality.",
    },
    {
      icon: ClipboardCheck,
      title: "Project Management",
      description: "End-to-end oversight ensuring quality, budget, and timeline adherence.",
    },
  ];

  const timeline = [
    { phase: "Concept", description: "Vision alignment and feasibility studies" },
    { phase: "Design", description: "Architectural planning and permit acquisition" },
    { phase: "Build", description: "Construction with rigorous quality control" },
    { phase: "Deliver", description: "Final inspection and key handover" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Built on Precision. Delivered with Integrity.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Transforming architectural visions into stunning reality across Canada.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
              Request a Quote
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesSection.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${servicesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Construction Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to completion, we build with uncompromising standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`bg-card border-primary/20 hover:border-primary transition-all duration-700 hover:shadow-gold group ${servicesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsSection.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${projectsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcasing our commitment to quality and excellence.
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading projects...</div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`transition-all duration-700 ${projectsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ConstructionProjectCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    projectType={project.project_type}
                    location={project.location}
                    completionDate={project.completion_date}
                    budgetRange={project.budget_range}
                    squareFeet={project.square_feet}
                    imageUrls={(project as any).image_urls}
                    status={project.status}
                    featured={project.featured}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No projects available at the moment. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineSection.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${timelineSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Construction Process
            </h2>
            <p className="text-xl text-muted-foreground">
              A proven methodology that ensures excellence at every stage.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {timeline.map((item, index) => (
                <div key={index} className={`relative transition-all duration-700 ${timelineSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <Card className="bg-card border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-gold">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{item.phase}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyChoose.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-700 ${whyChoose.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Why Choose Khoroush Construction?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We bring decades of construction expertise, cutting-edge techniques, and unwavering attention to detail. 
                Every project is a testament to our commitment to quality and client satisfaction.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Licensed and fully insured contractors",
                  "On-time, on-budget delivery",
                  "Sustainable building practices",
                  "Premium materials and workmanship",
                  "Comprehensive warranty coverage",
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={24} />
                    <span className="text-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className={`bg-card border-primary/20 transition-all duration-700 ${whyChoose.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <CardContent className="p-12 space-y-6">
                <h3 className="text-3xl font-bold text-foreground">Ready to Build Your Vision?</h3>
                <p className="text-muted-foreground text-lg">
                  Share your project details and let's create something extraordinary together.
                </p>
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Construction;
