import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Calendar, Square, Tag } from "lucide-react";
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

const ConstructionDetail = () => {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['construction-project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('construction_projects')
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
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/construction">
            <Button>Back to Projects</Button>
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
        <Link to="/construction">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" size={20} />
            Back to Projects
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Carousel */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {project.image_urls && project.image_urls.length > 0 ? (
                  project.image_urls.map((imageUrl: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[500px] rounded-lg overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={`${project.title} - Image ${index + 1}`}
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
              {project.image_urls && project.image_urls.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>
                <Badge
                  variant={project.status === 'completed' ? 'default' : project.status === 'in_progress' ? 'secondary' : 'outline'}
                  className="text-sm"
                >
                  {project.status.replace('_', ' ')}
                </Badge>
              </div>
              
              {project.featured && (
                <Badge className="bg-primary text-primary-foreground">Featured Project</Badge>
              )}

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={20} />
                <span className="text-lg">{project.location}</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Project Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="text-lg font-semibold text-foreground">{project.project_type}</p>
                  </div>
                  {project.completion_date && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Completion Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-primary" />
                        <p className="text-lg font-semibold text-foreground">
                          {new Date(project.completion_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {project.square_feet && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Square Feet</p>
                      <div className="flex items-center gap-2">
                        <Square size={20} className="text-primary" />
                        <p className="text-lg font-semibold text-foreground">{project.square_feet.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  {project.budget_range && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Budget Range</p>
                      <div className="flex items-center gap-2">
                        <Tag size={20} className="text-primary" />
                        <p className="text-lg font-semibold text-foreground">{project.budget_range}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>

            <Link to="/contact">
              <Button size="lg" className="w-full">
                Inquire About This Project
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConstructionDetail;