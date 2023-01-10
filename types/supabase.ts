export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      quote_number: {
        Row: {
          id: number
          created_at: string | null
          latest_quote_number: number | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          latest_quote_number?: number | null
        }
        Update: {
          id?: number
          created_at?: string | null
          latest_quote_number?: number | null
        }
      }
      quotes: {
        Row: {
          createdAt: string
          updatedAt: string
          pickupDate: string
          pickupTime: string
          isRoundTrip: boolean | null
          returnDate: string | null
          returnTime: string | null
          originFormattedAddress: string
          originName: string
          originPlaceId: string
          startLat: number
          startLng: number
          destinationFormattedAddress: string
          destinationName: string
          destinationPlaceId: string
          endLat: number
          endLng: number
          vehicleTypeLabel: string
          vehicleTypeValue: number
          serviceTypeLabel: string
          serviceTypeValue: number
          passengersLabel: string | null
          passengersValue: number | null
          isItHourly: boolean | null
          hoursLabel: string | null
          hoursValue: number | null
          distanceText: string | null
          distanceValue: number | null
          durationText: string | null
          durationValue: number | null
          calculatedDistance: number | null
          baseRate: number | null
          fuelSurcharge: number | null
          gratuity: number | null
          HST: number | null
          id: string
          totalFare: number | null
          firstName: string | null
          lastName: string | null
          userId: string | null
          quote_number: number | null
          isPearsonAirportPickup: boolean | null
          isPearsonAirportDropoff: boolean | null
          isBooked: boolean
          userEmail: string | null
        }
        Insert: {
          createdAt?: string
          updatedAt?: string
          pickupDate: string
          pickupTime: string
          isRoundTrip?: boolean | null
          returnDate?: string | null
          returnTime?: string | null
          originFormattedAddress: string
          originName: string
          originPlaceId: string
          startLat: number
          startLng: number
          destinationFormattedAddress: string
          destinationName: string
          destinationPlaceId: string
          endLat: number
          endLng: number
          vehicleTypeLabel: string
          vehicleTypeValue: number
          serviceTypeLabel: string
          serviceTypeValue: number
          passengersLabel?: string | null
          passengersValue?: number | null
          isItHourly?: boolean | null
          hoursLabel?: string | null
          hoursValue?: number | null
          distanceText?: string | null
          distanceValue?: number | null
          durationText?: string | null
          durationValue?: number | null
          calculatedDistance?: number | null
          baseRate?: number | null
          fuelSurcharge?: number | null
          gratuity?: number | null
          HST?: number | null
          id?: string
          totalFare?: number | null
          firstName?: string | null
          lastName?: string | null
          userId?: string | null
          quote_number?: number | null
          isPearsonAirportPickup?: boolean | null
          isPearsonAirportDropoff?: boolean | null
          isBooked?: boolean
          userEmail?: string | null
        }
        Update: {
          createdAt?: string
          updatedAt?: string
          pickupDate?: string
          pickupTime?: string
          isRoundTrip?: boolean | null
          returnDate?: string | null
          returnTime?: string | null
          originFormattedAddress?: string
          originName?: string
          originPlaceId?: string
          startLat?: number
          startLng?: number
          destinationFormattedAddress?: string
          destinationName?: string
          destinationPlaceId?: string
          endLat?: number
          endLng?: number
          vehicleTypeLabel?: string
          vehicleTypeValue?: number
          serviceTypeLabel?: string
          serviceTypeValue?: number
          passengersLabel?: string | null
          passengersValue?: number | null
          isItHourly?: boolean | null
          hoursLabel?: string | null
          hoursValue?: number | null
          distanceText?: string | null
          distanceValue?: number | null
          durationText?: string | null
          durationValue?: number | null
          calculatedDistance?: number | null
          baseRate?: number | null
          fuelSurcharge?: number | null
          gratuity?: number | null
          HST?: number | null
          id?: string
          totalFare?: number | null
          firstName?: string | null
          lastName?: string | null
          userId?: string | null
          quote_number?: number | null
          isPearsonAirportPickup?: boolean | null
          isPearsonAirportDropoff?: boolean | null
          isBooked?: boolean
          userEmail?: string | null
        }
      }
      service_type: {
        Row: {
          id: number
          created_at: string | null
          label: string | null
          value: number | null
          isDisabled: boolean | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          label?: string | null
          value?: number | null
          isDisabled?: boolean | null
        }
        Update: {
          id?: number
          created_at?: string | null
          label?: string | null
          value?: number | null
          isDisabled?: boolean | null
        }
      }
      surcharges: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
          is_percentage: boolean | null
          is_flat: boolean | null
          is_taxable: boolean | null
          amount: number | null
          is_active: boolean | null
          description: string | null
          is_tax: boolean | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
          is_percentage?: boolean | null
          is_flat?: boolean | null
          is_taxable?: boolean | null
          amount?: number | null
          is_active?: boolean | null
          description?: string | null
          is_tax?: boolean | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
          is_percentage?: boolean | null
          is_flat?: boolean | null
          is_taxable?: boolean | null
          amount?: number | null
          is_active?: boolean | null
          description?: string | null
          is_tax?: boolean | null
        }
      }
      user: {
        Row: {
          createdAt: string
          updatedAt: string
          firstName: string
          lastName: string
          emailAddress: string
          phoneNumber: string
          id: string
        }
        Insert: {
          createdAt?: string
          updatedAt?: string
          firstName: string
          lastName: string
          emailAddress: string
          phoneNumber: string
          id?: string
        }
        Update: {
          createdAt?: string
          updatedAt?: string
          firstName?: string
          lastName?: string
          emailAddress?: string
          phoneNumber?: string
          id?: string
        }
      }
      vehicle_type: {
        Row: {
          id: number
          created_at: string | null
          max_passengers: number | null
          max_luggage: number | null
          per_km: number | null
          per_hour: number | null
          min_hours_hourly: number | null
          min_rate_distance: number | null
          min_distance: number | null
          min_rate_hourly: number | null
          is_active: boolean | null
          name: string | null
          value: number | null
          isDisabled: boolean | null
          label: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          max_passengers?: number | null
          max_luggage?: number | null
          per_km?: number | null
          per_hour?: number | null
          min_hours_hourly?: number | null
          min_rate_distance?: number | null
          min_distance?: number | null
          min_rate_hourly?: number | null
          is_active?: boolean | null
          name?: string | null
          value?: number | null
          isDisabled?: boolean | null
          label?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          max_passengers?: number | null
          max_luggage?: number | null
          per_km?: number | null
          per_hour?: number | null
          min_hours_hourly?: number | null
          min_rate_distance?: number | null
          min_distance?: number | null
          min_rate_hourly?: number | null
          is_active?: boolean | null
          name?: string | null
          value?: number | null
          isDisabled?: boolean | null
          label?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_new_quote_number: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      increment_quote_number: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
