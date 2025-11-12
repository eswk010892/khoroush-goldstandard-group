import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Home, Square, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PropertyManagementDetail = () => {
  const { id } = useParams();

  const { data: property, isLoading } = useQuery({
    queryKey: ['managed-property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('managed_properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Property Not Found</h1>
          <Link to="/property-management">
            <Button>Back to Properties</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link to="/property-management">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" size={20} />
            Back to Properties
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Carousel */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {property.image_urls && property.image_urls.length > 0 ? (
                  property.image_urls.map((imageUrl: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[500px] rounded-lg overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={`${property.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <div className="relative h-[500px] rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">No images available</p>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              {property.image_urls && property.image_urls.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-bold text-foreground">{property.title}</h1>
                <Badge
                  variant={property.management_status === 'active' ? 'default' : 'secondary'}
                  className="text-sm"
                >
                  {property.management_status}
                </Badge>
              </div>
              
              {property.featured && (
                <Badge className="bg-primary text-primary-foreground">Featured Property</Badge>
              )}

              {property.monthly_rent && (
                <div className="flex items-center gap-2 text-primary">
                  <DollarSign size={32} />
                  <span className="text-5xl font-bold">${property.monthly_rent.toLocaleString()}<span className="text-2xl">/mo</span></span>
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={20} />
                <span className="text-lg">{property.location}</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Property Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="text-lg font-semibold text-foreground">{property.property_type}</p>
                  </div>
                  {property.units && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Units</p>
                      <div className="flex items-center gap-2">
                        <Home size={20} className="text-primary" />
                        <p className="text-lg font-semibold text-foreground">{property.units}</p>
                      </div>
                    </div>
                  )}
                  {property.square_feet && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Square Feet</p>
                      <div className="flex items-center gap-2">
                        <Square size={20} className="text-primary" />
                        <p className="text-lg font-semibold text-foreground">{property.square_feet.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            <Link to="/contact">
              <Button size="lg" className="w-full">
                Request Management Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyManagementDetail;