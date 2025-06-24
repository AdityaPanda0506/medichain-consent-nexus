import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  DollarSign,
  Star,
  User,
  Stethoscope,
  Building2,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { blockchainService } from '@/lib/blockchain';

interface Doctor {
  doctorId: string;
  walletAddress: string;
  licenseNumber: string;
  specialization: string;
  hospitalName: string;
  isVerified: boolean;
  consultationFee: string;
  country: string;
  state: string;
  distance?: number;
  rating?: number;
  availableSlots?: string[];
}

const DoctorBooking = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const specializations = [
    'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology',
    'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry',
    'Radiology', 'Surgery', 'Urology', 'General Practice'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  useEffect(() => {
    getUserLocation();
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchQuery, selectedSpecialization, selectedLocation]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const loadDoctors = async () => {
    setIsLoading(true);
    try {
      // Mock data for demonstration
      const mockDoctors: Doctor[] = [
        {
          doctorId: 'DOC000001',
          walletAddress: '0x1234...5678',
          licenseNumber: 'MD123456',
          specialization: 'Cardiology',
          hospitalName: 'Central Medical Center',
          isVerified: true,
          consultationFee: '0.01',
          country: 'USA',
          state: 'California',
          distance: 2.5,
          rating: 4.8,
          availableSlots: ['09:00', '10:00', '14:00', '15:00']
        },
        {
          doctorId: 'DOC000002',
          walletAddress: '0x5678...9012',
          licenseNumber: 'MD789012',
          specialization: 'Dermatology',
          hospitalName: 'Skin Care Clinic',
          isVerified: true,
          consultationFee: '0.008',
          country: 'USA',
          state: 'California',
          distance: 1.8,
          rating: 4.6,
          availableSlots: ['09:30', '11:00', '14:30', '16:00']
        },
        {
          doctorId: 'DOC000003',
          walletAddress: '0x9012...3456',
          licenseNumber: 'MD345678',
          specialization: 'Pediatrics',
          hospitalName: 'Children\'s Hospital',
          isVerified: true,
          consultationFee: '0.012',
          country: 'USA',
          state: 'California',
          distance: 3.2,
          rating: 4.9,
          availableSlots: ['10:30', '11:30', '15:30', '17:00']
        }
      ];

      setDoctors(mockDoctors);
    } catch (error) {
      setError('Failed to load doctors');
    } finally {
      setIsLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSpecialization) {
      filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialization);
    }

    if (selectedLocation) {
      filtered = filtered.filter(doctor => doctor.state === selectedLocation);
    }

    // Sort by distance if user location is available
    if (userLocation) {
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    setFilteredDoctors(filtered);
  };

  const bookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setError('Please select a doctor, date, and time');
      return;
    }

    if (!blockchainService.isConnected()) {
      setError('Please connect your wallet first');
      return;
    }

    setIsBooking(true);
    setError('');

    try {
      const appointmentDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));
      
      const scheduledTime = Math.floor(appointmentDateTime.getTime() / 1000);

      const appointmentId = await blockchainService.bookAppointment(
        selectedDoctor.doctorId,
        scheduledTime,
        appointmentNotes,
        selectedDoctor.consultationFee
      );

      setSuccess(`Appointment booked successfully! Appointment ID: ${appointmentId}`);
      setSelectedDoctor(null);
      setSelectedDate(undefined);
      setSelectedTime('');
      setAppointmentNotes('');
    } catch (error: any) {
      setError(error.message || 'Failed to book appointment');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find Doctors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search by specialization or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Specializations</SelectItem>
                  {specializations.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctor List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-slate-500">No doctors found matching your criteria</p>
          </div>
        ) : (
          filteredDoctors.map((doctor) => (
            <Card key={doctor.doctorId} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Dr. {doctor.doctorId}</h3>
                      <p className="text-sm text-slate-600">{doctor.specialization}</p>
                    </div>
                  </div>
                  {doctor.isVerified && (
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Building2 className="w-4 h-4" />
                    <span>{doctor.hospitalName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.state}, {doctor.country}</span>
                    {doctor.distance && (
                      <span className="text-blue-600">({doctor.distance} km away)</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{doctor.consultationFee} ETH</span>
                  </div>
                  {doctor.rating && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{doctor.rating}/5.0</span>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => setSelectedDoctor(doctor)}
                  className="w-full"
                  variant={selectedDoctor?.doctorId === doctor.doctorId ? "default" : "outline"}
                >
                  {selectedDoctor?.doctorId === doctor.doctorId ? 'Selected' : 'Book Appointment'}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Booking Form */}
      {selectedDoctor && (
        <Card>
          <CardHeader>
            <CardTitle>Book Appointment with Dr. {selectedDoctor.doctorId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Time</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem 
                        key={time} 
                        value={time}
                        disabled={!selectedDoctor.availableSlots?.includes(time)}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {time}
                          {!selectedDoctor.availableSlots?.includes(time) && (
                            <span className="text-red-500">(Unavailable)</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes (Optional)</label>
              <Textarea
                placeholder="Describe your symptoms or reason for visit..."
                value={appointmentNotes}
                onChange={(e) => setAppointmentNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Appointment Summary</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <p>Doctor: Dr. {selectedDoctor.doctorId}</p>
                <p>Specialization: {selectedDoctor.specialization}</p>
                <p>Hospital: {selectedDoctor.hospitalName}</p>
                {selectedDate && <p>Date: {format(selectedDate, "PPP")}</p>}
                {selectedTime && <p>Time: {selectedTime}</p>}
                <p>Consultation Fee: {selectedDoctor.consultationFee} ETH</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={bookAppointment}
                disabled={!selectedDate || !selectedTime || isBooking}
                className="flex-1"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Book & Pay ({selectedDoctor.consultationFee} ETH)
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedDoctor(null)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DoctorBooking;