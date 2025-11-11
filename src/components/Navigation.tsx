import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "Real Estate",
    path: "/real-estate"
  }, {
    name: "Construction",
    path: "/construction"
  }, {
    name: "Property Management",
    path: "/property-management"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-primary tracking-wider group-hover:text-primary/80 transition-colors">AK Global</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors relative group ${isActive(link.path) ? "text-primary" : "text-foreground hover:text-primary"}`}>
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>)}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="lg:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`text-base font-medium transition-colors px-4 py-2 rounded ${isActive(link.path) ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5"}`}>
                  {link.name}
                </Link>)}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;