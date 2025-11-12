-- Create real estate listings table
CREATE TABLE public.real_estate_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  location TEXT NOT NULL,
  property_type TEXT NOT NULL, -- e.g., 'Residential', 'Commercial', 'Condo'
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  square_feet INTEGER,
  image_url TEXT,
  status TEXT DEFAULT 'available', -- 'available', 'pending', 'sold'
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create construction projects table
CREATE TABLE public.construction_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  project_type TEXT NOT NULL, -- e.g., 'Custom Build', 'Commercial', 'Renovation'
  location TEXT NOT NULL,
  completion_date DATE,
  budget_range TEXT,
  square_feet INTEGER,
  image_url TEXT,
  status TEXT DEFAULT 'in_progress', -- 'planning', 'in_progress', 'completed'
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create managed properties table
CREATE TABLE public.managed_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  property_type TEXT NOT NULL, -- e.g., 'Residential', 'Commercial'
  location TEXT NOT NULL,
  units INTEGER,
  monthly_rent DECIMAL(10, 2),
  square_feet INTEGER,
  image_url TEXT,
  management_status TEXT DEFAULT 'active', -- 'active', 'pending'
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.real_estate_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.construction_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.managed_properties ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (showcase properties)
CREATE POLICY "Real estate listings are viewable by everyone"
ON public.real_estate_listings
FOR SELECT
USING (true);

CREATE POLICY "Construction projects are viewable by everyone"
ON public.construction_projects
FOR SELECT
USING (true);

CREATE POLICY "Managed properties are viewable by everyone"
ON public.managed_properties
FOR SELECT
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_real_estate_listings_updated_at
BEFORE UPDATE ON public.real_estate_listings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_construction_projects_updated_at
BEFORE UPDATE ON public.construction_projects
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_managed_properties_updated_at
BEFORE UPDATE ON public.managed_properties
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();