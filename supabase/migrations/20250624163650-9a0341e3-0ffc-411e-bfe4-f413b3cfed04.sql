
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_id TEXT NOT NULL UNIQUE, -- PATXXXXXX format
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  blood_type TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  medical_history JSONB DEFAULT '[]',
  allergies JSONB DEFAULT '[]',
  current_medications JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id TEXT NOT NULL UNIQUE, -- DOCXXXXXX format
  license_number TEXT NOT NULL UNIQUE,
  specialization TEXT NOT NULL,
  department TEXT,
  hospital_name TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create consent records table
CREATE TABLE public.consent_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  data_types TEXT[] NOT NULL, -- Array of allowed data types
  purpose TEXT NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  blockchain_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create access logs table
CREATE TABLE public.access_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  access_type TEXT NOT NULL,
  data_accessed TEXT[],
  ip_address INET,
  user_agent TEXT,
  blockchain_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medical records table
CREATE TABLE public.medical_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  encrypted_data TEXT, -- Encrypted medical data
  file_urls TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for patients
CREATE POLICY "Patients can view own data" ON public.patients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Patients can update own data" ON public.patients
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Patients can insert own data" ON public.patients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Doctors can view patient data with consent" ON public.patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctors d
      JOIN public.consent_records c ON d.id = c.doctor_id
      WHERE d.user_id = auth.uid() 
      AND c.patient_id = patients.id 
      AND c.status = 'active' 
      AND c.expiry_date > now()
    )
  );

-- RLS Policies for doctors
CREATE POLICY "Doctors can view own data" ON public.doctors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Doctors can update own data" ON public.doctors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert own data" ON public.doctors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for consent records
CREATE POLICY "Patients can manage own consent" ON public.consent_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.patients p 
      WHERE p.id = consent_records.patient_id 
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can view consent given to them" ON public.consent_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctors d 
      WHERE d.id = consent_records.doctor_id 
      AND d.user_id = auth.uid()
    )
  );

-- RLS Policies for access logs
CREATE POLICY "Patients can view own access logs" ON public.access_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patients p 
      WHERE p.id = access_logs.patient_id 
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can view their access logs" ON public.access_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctors d 
      WHERE d.id = access_logs.doctor_id 
      AND d.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert access logs" ON public.access_logs
  FOR INSERT WITH CHECK (true);

-- RLS Policies for medical records
CREATE POLICY "Patients can view own medical records" ON public.medical_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.patients p 
      WHERE p.id = medical_records.patient_id 
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can view medical records with consent" ON public.medical_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctors d
      JOIN public.consent_records c ON d.id = c.doctor_id
      WHERE d.user_id = auth.uid() 
      AND c.patient_id = medical_records.patient_id 
      AND c.status = 'active' 
      AND c.expiry_date > now()
    )
  );

CREATE POLICY "Doctors can insert medical records" ON public.medical_records
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.doctors d 
      WHERE d.id = medical_records.doctor_id 
      AND d.user_id = auth.uid()
    )
  );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate patient ID
CREATE OR REPLACE FUNCTION generate_patient_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  counter INT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(patient_id FROM 4) AS INTEGER)), 0) + 1
  INTO counter
  FROM public.patients;
  
  new_id := 'PAT' || LPAD(counter::TEXT, 6, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Function to generate doctor ID
CREATE OR REPLACE FUNCTION generate_doctor_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  counter INT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(doctor_id FROM 4) AS INTEGER)), 0) + 1
  INTO counter
  FROM public.doctors;
  
  new_id := 'DOC' || LPAD(counter::TEXT, 6, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;
