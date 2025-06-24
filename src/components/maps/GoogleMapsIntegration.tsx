import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Navigation, 
  Search, 
  Phone, 
  Clock,
  Star,
  Loader2
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  address: string;
  phone: string;
  rating: number;
  distance: number;
  consultationFee: string;
  position: { lat: number; lng: number };
  isOpen: boolean;
  nextAvailable: string;
}

const GoogleMapsIntegration = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyDoctors, setNearbyDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchRadius, setSearchRadius] = useState('5');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const specializations = [
    'General Practice', 'Cardiology', 'Dermatology', 'Endocrinology',
    'Gastroenterology', 'Neurology', 'Oncology', 'Orthopedics',
    'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'Urology'
  ];

  // Mock data for demonstration
  const mockDoctors: Doctor[] = [
    {
      id: 'DOC001',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      hospital: 'Central Medical Center',
      address: '123 Medical Plaza, Downtown',
      phone: '(555) 123-4567',
      rating: 4.8,
      distance: 1.2,
      consultationFee: '0.01',
      position: { lat: 37.7749, lng: -122.4194 },
      isOpen: true,
      nextAvailable: 'Today 2:00 PM'
    },
    {
      id: 'DOC002',
      name: 'Dr. Michael Chen',
      specialization: 'Dermatology',
      hospital: 'Skin Care Clinic',
      address: '456 Health Street, Midtown',
      phone: '(555) 234-5678',
      rating: 4.6,
      distance: 2.1,
      consultationFee: '0.008',
      position: { lat: 37.7849, lng: -122.4094 },
      isOpen: false,
      nextAvailable: 'Tomorrow 9:00 AM'
    },
    {
      id: 'DOC003',
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrics',
      hospital: 'Children\'s Hospital',
      address: '789 Kids Avenue, Uptown',
      phone: '(555) 345-6789',
      rating: 4.9,
      distance: 0.8,
      consultationFee: '0.012',
      position: { lat: 37.7649, lng: -122.4294 },
      isOpen: true,
      nextAvailable: 'Today 4:30 PM'
    }
  ];

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (mapLoaded && userLocation) {
      initializeMap();
    }
  }, [mapLoaded, userLocation]);

  const loadGoogleMaps = () => {
    if (window.google) {
      setMapLoaded(true);
      getCurrentLocation();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setMapLoaded(true);
      getCurrentLocation();
    };
    document.head.appendChild(script);
  };

  const getCurrentLocation = () => {
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
          // Default to San Francisco for demo
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    } else {
      // Default to San Francisco for demo
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
    }
  };

  const initializeMap = useCallback(() => {
    if (!userLocation || !window.google) return;

    const mapElement = document.getElementById('google-map');
    if (!mapElement) return;

    const newMap = new google.maps.Map(mapElement, {
      center: userLocation,
      zoom: 13,
      styles: [
        {
          featureType: 'poi.medical',
          elementType: 'geometry',
          stylers: [{ color: '#ffeaa7' }]
        }
      ]
    });

    // Add user location marker
    new google.maps.Marker({
      position: userLocation,
      map: newMap,
      title: 'Your Location',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#3B82F6"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(24, 24)
      }
    });

    setMap(newMap);
    searchNearbyDoctors();
  }, [userLocation]);

  const searchNearbyDoctors = () => {
    setIsLoading(true);
    
    // Filter mock doctors based on criteria
    let filtered = mockDoctors;
    
    if (selectedSpecialization) {
      filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialization);
    }

    // Filter by radius
    const radiusKm = parseFloat(searchRadius);
    filtered = filtered.filter(doctor => doctor.distance <= radiusKm);

    setNearbyDoctors(filtered);
    addDoctorMarkers(filtered);
    setIsLoading(false);
  };

  const addDoctorMarkers = (doctors: Doctor[]) => {
    if (!map) return;

    doctors.forEach(doctor => {
      const marker = new google.maps.Marker({
        position: doctor.position,
        map: map,
        title: doctor.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="${doctor.isOpen ? '#10B981' : '#EF4444'}"/>
              <path d="M16 8v8l4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32)
        }
      });

      marker.addListener('click', () => {
        setSelectedDoctor(doctor);
        map.panTo(doctor.position);
      });
    });
  };

  const getDirections = (doctor: Doctor) => {
    if (!userLocation) return;
    
    const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${doctor.position.lat},${doctor.position.lng}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (mapLoaded) {
      searchNearbyDoctors();
    }
  }, [selectedSpecialization, searchRadius, mapLoaded]);

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Find Nearby Doctors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Specialization</label>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="All specializations" />
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Search Radius</label>
              <Select value={searchRadius} onValueChange={setSearchRadius}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 km</SelectItem>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="25">25 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={searchNearbyDoctors} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div 
                id="google-map" 
                className="w-full h-96 rounded-lg"
                style={{ minHeight: '400px' }}
              >
                {!mapLoaded && (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="ml-2">Loading map...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctor List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Nearby Doctors ({nearbyDoctors.length})
          </h3>
          
          {nearbyDoctors.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-slate-500">No doctors found in your area</p>
              </CardContent>
            </Card>
          ) : (
            nearbyDoctors.map(doctor => (
              <Card 
                key={doctor.id}
                className={`cursor-pointer transition-all ${
                  selectedDoctor?.id === doctor.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-800">{doctor.name}</h4>
                      <p className="text-sm text-slate-600">{doctor.specialization}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge className={doctor.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {doctor.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-slate-600 mb-3">
                    <p>{doctor.hospital}</p>
                    <p>{doctor.address}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {doctor.distance} km away
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {doctor.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Next: {doctor.nextAvailable}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(doctor);
                      }}
                      className="flex-1"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      Directions
                    </Button>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${doctor.phone}`, '_self');
                      }}
                      className="flex-1"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Selected Doctor Details */}
      {selectedDoctor && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Doctor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">{selectedDoctor.name}</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                  <p><strong>Hospital:</strong> {selectedDoctor.hospital}</p>
                  <p><strong>Address:</strong> {selectedDoctor.address}</p>
                  <p><strong>Phone:</strong> {selectedDoctor.phone}</p>
                  <p><strong>Rating:</strong> {selectedDoctor.rating}/5.0</p>
                  <p><strong>Distance:</strong> {selectedDoctor.distance} km away</p>
                  <p><strong>Consultation Fee:</strong> {selectedDoctor.consultationFee} ETH</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={() => getDirections(selectedDoctor)}
                  className="w-full"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open(`tel:${selectedDoctor.phone}`, '_self')}
                  className="w-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleMapsIntegration;