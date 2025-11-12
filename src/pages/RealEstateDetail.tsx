import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Bed, Bath, Square, Tag } from "lucide-react";
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

const RealEstateDetail = () => {
  const { id } = useParams();

  const { data: listing, isLoading } = useQuery({
    queryKey: ['real-estate-listing', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('real_estate_listings')
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
          <p className="text-muted-foreground">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Listing Not Found</h1>
          <Link to="/real-estate">
            <Button>Back to Listings</Button>
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
        <Link to="/real-estate">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" size={20} />
            Back to Listings
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Carousel */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {listing.image_urls && listing.image_urls.length > 0 ? (
                  listing.image_urls.map((imageUrl: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[500px] rounded-lg overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={`${listing.title} - Image ${index + 1}`}
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
              {listing.image_urls && listing.image_urls.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>

          {/* Listing Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-bold text-foreground">{listing.title}</h1>
                <Badge
                  variant={listing.status === 'available' ? 'default' : listing.status === 'pending' ? 'secondary' : 'outline'}
                  className="text-sm"
                >
                  {listing.status}
                </Badge>
              </div>
              
              {listing.featured && (
                <Badge className="bg-primary text-primary-foreground">Featured Property</Badge>
              )}

              <div className="flex items-center gap-2 text-primary">
                <Tag size={32} />
                <span className="text-5xl font-bold">${listing.price.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={20} />
                <span className="text-lg">{listing.location}</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Property Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="text-lg font-semibold text-foreground">{listing.property_type}</p>
                  </div>
                  {listing.bedrooms && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <div className="flex items-center gap-2">
                        <Bed size={20} className="text-primary" />
                        <p className="text-lg font-semibold text-foreground">{listing.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {listing.bathrooms && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <div className="flex items-center gap-2">
                        <Bath size={20} className="text-primary" />
                        <p className="text-lg font-semibold text-foreground">{listing.bathrooms}</p>
                      </div>
                    </div>
                  )}
                  {listing.square_feet && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Square Feet</p>
                      <div className="flex items-center gap-2">
                        <Square size={20} className="text-primary" />
                        <p className="text-lg font-semibold text-foreground">{listing.square_feet.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>

            <Link to="/contact">
              <Button size="lg" className="w-full">
                Contact Us About This Property
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RealEstateDetail;