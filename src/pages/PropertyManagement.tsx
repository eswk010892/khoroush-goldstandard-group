import { Users, Wrench, TrendingUp, FileCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-management.jpg";

const PropertyManagement = () => {
  const servicesSection = useScrollAnimation();
  const benefitsSection = useScrollAnimation();
  const processSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();
  
  const services = [
    {
      icon: Users,
      title: "Tenant Services",
      description: "Screening, placement, and ongoing tenant relations management.",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description: "24/7 emergency response and preventive maintenance coordination.",
    },
    {
      icon: TrendingUp,
      title: "Rent Collection",
      description: "Timely collection and financial management with full transparency.",
    },
    {
      icon: FileCheck,
      title: "Owner Reporting",
      description: "Detailed monthly reports and real-time portal access.",
    },
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
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Your Investment, Our Responsibility
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto mb-8">
            Professional property management that protects and grows your assets.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
              Request Management Proposal
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
              Comprehensive Management Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We handle every aspect of property management so you don't have to.
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

      {/* Benefits Section */}
      <section ref={benefitsSection.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-700 ${benefitsSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Peace of Mind for Property Owners
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you live locally or abroad, we ensure your properties are well-maintained, 
                fully occupied, and generating optimal returns. Our proactive approach minimizes issues 
                and maximizes your investment potential.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Rigorous tenant screening process",
                  "24/7 emergency maintenance response",
                  "Legal compliance and lease management",
                  "Monthly financial reporting",
                  "Property inspections and preventive care",
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={24} />
                    <span className="text-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={`space-y-6 transition-all duration-700 ${benefitsSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Card className="bg-card border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Residential Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Single-family homes, condos, townhouses — we manage all residential property types with care.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Tenant placement & retention</li>
                    <li>• Rent collection & accounting</li>
                    <li>• Maintenance coordination</li>
                    <li>• Owner portal access</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Commercial Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Office buildings, retail spaces, industrial properties — professional management at scale.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Lease negotiation & administration</li>
                    <li>• Tenant relationship management</li>
                    <li>• Building operations oversight</li>
                    <li>• Capital improvement planning</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processSection.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${processSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground">
              A transparent process designed for maximum efficiency and owner satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Property Assessment", 
                description: "We evaluate your property and develop a customized management strategy." 
              },
              { 
                step: "02", 
                title: "Marketing & Placement", 
                description: "Professional marketing to attract quality tenants quickly." 
              },
              { 
                step: "03", 
                title: "Ongoing Management", 
                description: "Day-to-day operations, maintenance, and transparent reporting." 
              },
            ].map((item, index) => (
              <Card 
                key={index} 
                className={`bg-card border-primary/20 hover:border-primary transition-all duration-700 hover:shadow-gold ${processSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-10 text-center space-y-4">
                  <div className="text-6xl font-bold text-primary/30">{item.step}</div>
                  <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSection.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className={`bg-gradient-gold border-none transition-all duration-700 ${ctaSection.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <CardContent className="p-12 md:p-16 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Let Us Manage Your Properties
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Focus on growing your portfolio while we handle the day-to-day details.
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-8 py-6 mt-4"
                >
                  Get Your Free Proposal
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

export default PropertyManagement;
