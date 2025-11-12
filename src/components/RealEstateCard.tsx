import { MapPin, Bed, Bath, Square, Tag } from "lucide-react";
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

interface RealEstateCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  imageUrls?: string[];
  status: string;
  featured: boolean;
}

const RealEstateCard = ({
  id,
  title,
  description,
  price,
  location,
  propertyType,
  bedrooms,
  bathrooms,
  squareFeet,
  imageUrls,
  status,
  featured,
}: RealEstateCardProps) => {
  return (
    <Link to={`/real-estate/${id}`} className="block h-full">
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
              variant={status === 'available' ? 'default' : status === 'pending' ? 'secondary' : 'outline'}
            >
              {status}
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

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin size={16} />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {bedrooms && (
            <div className="flex items-center gap-1">
              <Bed size={16} />
              <span>{bedrooms}</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-1">
              <Bath size={16} />
              <span>{bathrooms}</span>
            </div>
          )}
          {squareFeet && (
            <div className="flex items-center gap-1">
              <Square size={16} />
              <span>{squareFeet.toLocaleString()} sq ft</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Tag className="text-primary" size={20} />
          <span className="text-2xl font-bold text-primary">
            ${price.toLocaleString()}
          </span>
        </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RealEstateCard;