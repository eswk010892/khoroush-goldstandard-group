import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const contactSection = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting Khoroush. We'll respond within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Let's discuss how we can help with your property needs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactSection.ref} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div
              className={`space-y-8 transition-all duration-700 ${contactSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">Contact Information</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Reach out to us through any of the following channels. We're here to help with all your real estate,
                  construction, and property management needs.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-primary/20 hover:border-primary transition-all duration-300">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-lg font-semibold text-foreground">+1 (XXX) XXX-XXXX</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-primary/20 hover:border-primary transition-all duration-300">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-lg font-semibold text-foreground">info@khoroush.ca</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-primary/20 hover:border-primary transition-all duration-300">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-lg font-semibold text-foreground">Toronto, Ontario, Canada</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: By Appointment</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card
              className={`bg-card border-primary/20 transition-all duration-700 ${contactSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-foreground mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="bg-background border-primary/20 focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="bg-background border-primary/20 focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="bg-background border-primary/20 focus:border-primary"
                      placeholder="+1 (XXX) XXX-XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Service Interest *</label>
                    <Select value={formData.service} onValueChange={(value) => handleChange("service", value)} required>
                      <SelectTrigger className="bg-background border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-primary/20">
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="property-management">Property Management</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="bg-background border-primary/20 focus:border-primary min-h-[150px]"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg"
                  >
                    Send Message
                    <Send className="ml-2" size={20} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
