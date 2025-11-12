import { MapPin, Home, Square, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ManagedPropertyCardProps {
  title: string;
  description: string;
  propertyType: string;
  location: string;
  units?: number;
  monthlyRent?: number;
  squareFeet?: number;
  imageUrl?: string;
  managementStatus: string;
  featured: boolean;
}

const ManagedPropertyCard = ({
  title,
  description,
  propertyType,
  location,
  units,
  monthlyRent,
  squareFeet,
  imageUrl,
  managementStatus,
  featured,
}: ManagedPropertyCardProps) => {
  return (
    <Card className="group h-full bg-card border-primary/20 hover:border-primary transition-all duration-500 hover:shadow-gold overflow-hidden">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {featured && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          <Badge 
            className="absolute top-4 left-4"
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
  );
};

export default ManagedPropertyCard;