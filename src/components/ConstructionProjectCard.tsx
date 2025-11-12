import { MapPin, Calendar, Square, Tag } from "lucide-react";
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

interface ConstructionProjectCardProps {
  id: string;
  title: string;
  description: string;
  projectType: string;
  location: string;
  completionDate?: string;
  budgetRange?: string;
  squareFeet?: number;
  imageUrls?: string[];
  status: string;
  featured: boolean;
}

const ConstructionProjectCard = ({
  id,
  title,
  description,
  projectType,
  location,
  completionDate,
  budgetRange,
  squareFeet,
  imageUrls,
  status,
  featured,
}: ConstructionProjectCardProps) => {
  const normalizedImageUrls = (imageUrls || []).map((u) => u.replace(/^\/src\/assets\/listings\//, '/listings/'));
  return (
    <Link to={`/construction/${id}`} className="block h-full">
      <Card className="group h-full bg-card border-primary/20 hover:border-primary transition-all duration-500 hover:shadow-gold overflow-hidden cursor-pointer">
        {normalizedImageUrls.length > 0 && (
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {normalizedImageUrls.map((imageUrl: string, index: number) => (
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
              {normalizedImageUrls.length > 1 && (
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
              variant={status === 'completed' ? 'default' : status === 'in_progress' ? 'secondary' : 'outline'}
            >
              {status.replace('_', ' ')}
            </Badge>
          </div>
        )}
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {title}
              </h3>
              <Badge variant="outline">{projectType}</Badge>
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
            
            {completionDate && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Completed: {new Date(completionDate).toLocaleDateString()}</span>
              </div>
            )}
            
            {squareFeet && (
              <div className="flex items-center gap-2">
                <Square size={16} />
                <span>{squareFeet.toLocaleString()} sq ft</span>
              </div>
            )}
          </div>

          {budgetRange && (
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Tag className="text-primary" size={20} />
              <span className="text-lg font-bold text-primary">
                {budgetRange}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ConstructionProjectCard;