import { MapPin, Home, Square, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ManagedPropertyCardProps {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  location: string;
  units?: number;
  monthlyRent?: number;
  squareFeet?: number;
  imageUrls?: string[];
  managementStatus: string;
  featured: boolean;
}

const ManagedPropertyCard = ({
  id,
  title,
  description,
  propertyType,
  location,
  units,
  monthlyRent,
  squareFeet,
  imageUrls,
  managementStatus,
  featured,
}: ManagedPropertyCardProps) => {
  return (
    <Link to={`/property-management/${id}`} className="block h-full">
      <Card className="group h-full bg-card border-primary/20 hover:border-primary transition-all duration-500 hover:shadow-gold overflow-hidden cursor-pointer">
        {imageUrls && imageUrls.length > 0 && (
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {imageUrls.map((imageUrl: string, index: number) => (
                  <CarouselItem key={index}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`${title} - Image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {imageUrls.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
            {featured && (
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground z-10">
                Featured
              </Badge>
            )}
            <Badge 
              className="absolute top-4 left-4 z-10"
              variant={managementStatus === 'active' ? 'default' : 'secondary'}
            >
              {managementStatus}
            </Badge>
          </div>
        )}
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {title}
              </h3>
              <Badge variant="outline">{propertyType}</Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {description}
            </p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="line-clamp-1">{location}</span>
            </div>
            
            {units && (
              <div className="flex items-center gap-2">
                <Home size={16} />
                <span>{units} {units === 1 ? 'unit' : 'units'}</span>
              </div>
            )}
            
            {squareFeet && (
              <div className="flex items-center gap-2">
                <Square size={16} />
                <span>{squareFeet.toLocaleString()} sq ft</span>
              </div>
            )}
          </div>

          {monthlyRent && (
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <DollarSign className="text-primary" size={20} />
              <span className="text-lg font-bold text-primary">
                ${monthlyRent.toLocaleString()}/mo
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ManagedPropertyCard;