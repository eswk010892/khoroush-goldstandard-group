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

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  botcheck?: string;
};

// Web3Forms configuration
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // 👈 Replace with your key from Web3Forms dashboard
const DESTINATION_EMAIL = "k.eswar.92@gmail.com";

const Contact = () => {
  const { toast } = useToast();
  const contactSection = useScrollAnimation();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    botcheck: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.service) return "Please select a service.";
    if (formData.message.trim().length < 10) return "Please provide a bit more detail in your message.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.botcheck && formData.botcheck.trim().length > 0) return;

    const validationError = validate();
    if (validationError) {
      toast({ title: "Oops!", description: validationError, variant: "destructive" });
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Khoroush Contact — ${formData.name} (${formData.service})`,
        from_name: "Khoroush Website",
        email: formData.email,
        name: formData.name,
        phone: formData.phone || "-",
        service: formData.service,
        message: formData.message,
        to: DESTINATION_EMAIL,
        botcheck: formData.botcheck || "",
      };

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to send. Please try again.");
      }

      toast({
        title: "Message sent!",
        description: "Thank you for contacting Khoroush. We'll respond within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        botcheck: "",
      });
    } catch (err: any) {
      toast({
        title: "Could not send your message",
        description: err?.message || "Please try again or email us directly at k.eswar.92@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Get In Touch
          </h1>
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
              className={`space-y-8 transition-all duration-700 ${
                contactSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">Contact Information</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Reach out to us through any of the following channels. We're here to help with all
                  your real estate, construction, and property management needs.
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

                <Card className="bg-card borde
