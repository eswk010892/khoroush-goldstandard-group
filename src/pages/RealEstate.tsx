import { Building2, TrendingUp, FileText, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import RealEstateCard from "@/components/RealEstateCard";
import heroImage from "@/assets/hero-realestate.jpg";

const RealEstate = () => {
  const servicesSection = useScrollAnimation();
  const listingsSection = useScrollAnimation();
  const processSection = useScrollAnimation();
  const whyChoose = useScrollAnimation();

  const { data: listings, isLoading } = useQuery({
    queryKey: ['real-estate-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('real_estate_listings')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
  
  const services = [
    {
      icon: Building2,
      title: "Residential Sales",
      description: "From condos to luxury estates, we connect you with your ideal property.",
    },
    {
      icon: TrendingUp,
      title: "Investment Consulting",
      description: "Strategic guidance to maximize returns and build wealth through real estate.",
    },
    {
      icon: FileText,
      title: "Market Analysis",
      description: "Data-driven insights to make informed buying and selling decisions.",
    },
    {
      icon: Users,
      title: "Commercial Properties",
      description: "Expert representation for office spaces, retail, and industrial properties.",
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Partner in Property Growth
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Navigate the Canadian real estate market with confidence and expertise.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
              Schedule a Consultation
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
              Comprehensive Real Estate Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're buying, selling, or investing, we provide the expertise you need.
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

      {/* Listings Section */}
      <section ref={listingsSection.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${listingsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Listings
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our current property offerings across Canada.
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading listings...</div>
          ) : listings && listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing, index) => (
                <div
                  key={listing.id}
                  className={`transition-all duration-700 ${listingsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <RealEstateCard
                    id={listing.id}
                    title={listing.title}
                    description={listing.description}
                    price={listing.price}
                    location={listing.location}
                    propertyType={listing.property_type}
                    bedrooms={listing.bedrooms}
                    bathrooms={listing.bathrooms}
                    squareFeet={listing.square_feet}
                    imageUrls={(listing as any).image_urls}
                    status={listing.status}
                    featured={listing.featured}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No listings available at the moment. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section ref={processSection.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${processSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground">
              A streamlined approach to achieving your real estate goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", description: "Understand your needs and objectives" },
              { step: "02", title: "Market Research", description: "Analyze opportunities and trends" },
              { step: "03", title: "Strategic Action", description: "Execute with precision and care" },
              { step: "04", title: "Close & Support", description: "Seamless transactions and ongoing guidance" },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`text-center space-y-4 transition-all duration-700 ${processSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-6xl font-bold text-primary/20">{item.step}</div>
                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyChoose.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-700 ${whyChoose.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Why Choose Our Real Estate Services?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With deep market knowledge and a client-first philosophy, we deliver results that exceed expectations. 
                Our integrated approach means we understand both the buying and development side of real estate.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Exclusive access to off-market properties",
                  "Proven negotiation strategies",
                  "Comprehensive market analytics",
                  "End-to-end transaction support",
                  "Investment portfolio optimization",
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
                <h3 className="text-3xl font-bold text-foreground">Ready to Find Your Perfect Property?</h3>
                <p className="text-muted-foreground text-lg">
                  Let's discuss your real estate goals and create a strategy tailored to your needs.
                </p>
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg"
                  >
                    Get Started Today
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

export default RealEstate;
