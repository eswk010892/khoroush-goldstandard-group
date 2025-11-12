import { Award, Users, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
const About = () => {
  const storySection = useScrollAnimation();
  const valuesSection = useScrollAnimation();
  const teamSection = useScrollAnimation();
  const missionSection = useScrollAnimation();
  const values = [{
    icon: Award,
    title: "Excellence",
    description: "We set the highest standards in everything we do, from property transactions to construction quality."
  }, {
    icon: Users,
    title: "Integrity",
    description: "Trust is earned through transparency, honesty, and consistent delivery on our promises."
  }, {
    icon: Target,
    title: "Innovation",
    description: "We embrace new technologies and methodologies to stay ahead in a dynamic market."
  }, {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our success. We build lasting relationships, not just transactions."
  }];
  const achievements = [{
    number: "500+",
    label: "Projects Completed"
  }, {
    number: "25+",
    label: "Years Experience"
  }, {
    number: "$500M+",
    label: "Portfolio Value"
  }, {
    number: "98%",
    label: "Client Satisfaction"
  }];
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">About AK Global</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Your integrated property expert across Canada.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storySection.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-700 ${storySection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">AK Global was founded on a simple belief: property services should be seamless, integrated, and built on trust. What started as a small real estate practice has evolved into a full-service property brand serving clients across Canada.</p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we combine real estate expertise, construction excellence, and professional property 
                management under one roof. This integration allows us to deliver unmatched value, coordination, 
                and accountability at every stage of the property lifecycle.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're buying your first home, developing a commercial project, or managing a portfolio 
                of rental properties, Khoroush is your partner for success.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((item, index) => <Card key={index} className={`bg-card border-primary/20 hover:border-primary transition-all duration-700 ${storySection.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{
              transitionDelay: `${index * 100}ms`
            }}>
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{item.number}</div>
                    <div className="text-muted-foreground">{item.label}</div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesSection.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${valuesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision and action we take.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => <Card key={index} className={`bg-card border-primary/20 hover:border-primary transition-all duration-700 hover:shadow-gold group ${valuesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
            transitionDelay: `${index * 100}ms`
          }}>
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamSection.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${teamSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Leadership & Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our team brings decades of combined experience in real estate, construction, and property management.
            </p>
          </div>
          
          <Card className={`bg-card border-primary/20 max-w-4xl mx-auto transition-all duration-700 ${teamSection.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Users size={64} className="text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">Our Team</h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">At AK Globa, our success is driven by a diverse team of licensed real estate professionals, experienced builders, certified property managers, and dedicated support staff. Together, we deliver comprehensive solutions tailored to each client's unique needs.</p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Every team member shares our commitment to excellence, integrity, and client satisfaction — 
                values that have made Khoroush a trusted name in Canadian property services.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionSection.ref} className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className={`bg-card border-primary/20 max-w-4xl mx-auto transition-all duration-700 ${missionSection.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To provide integrated, world-class property services that empower our clients to achieve 
                their real estate goals with confidence, clarity, and peace of mind.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From blueprint to key-turn, we're committed to being your trusted partner at every stage 
                of the property journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;