export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access_logs: {
        Row: {
          access_type: string
          blockchain_hash: string | null
          created_at: string
          data_accessed: string[] | null
          doctor_id: string
          id: string
          ip_address: unknown | null
          patient_id: string
          user_agent: string | null
        }
        Insert: {
          access_type: string
          blockchain_hash?: string | null
          created_at?: string
          data_accessed?: string[] | null
          doctor_id: string
          id?: string
          ip_address?: unknown | null
          patient_id: string
          user_agent?: string | null
        }
        Update: {
          access_type?: string
          blockchain_hash?: string | null
          created_at?: string
          data_accessed?: string[] | null
          doctor_id?: string
          id?: string
          ip_address?: unknown | null
          patient_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_logs_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      consent_records: {
        Row: {
          blockchain_hash: string | null
          created_at: string
          data_types: string[]
          doctor_id: string
          expiry_date: string
          id: string
          patient_id: string
          purpose: string
          status: string
          updated_at: string
        }
        Insert: {
          blockchain_hash?: string | null
          created_at?: string
          data_types: string[]
          doctor_id: string
          expiry_date: string
          id?: string
          patient_id: string
          purpose: string
          status?: string
          updated_at?: string
        }
        Update: {
          blockchain_hash?: string | null
          created_at?: string
          data_types?: string[]
          doctor_id?: string
          expiry_date?: string
          id?: string
          patient_id?: string
          purpose?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_records_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          created_at: string
          department: string | null
          doctor_id: string
          hospital_name: string | null
          id: string
          license_number: string
          specialization: string
          updated_at: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          doctor_id: string
          hospital_name?: string | null
          id?: string
          license_number: string
          specialization: string
          updated_at?: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          department?: string | null
          doctor_id?: string
          hospital_name?: string | null
          id?: string
          license_number?: string
          specialization?: string
          updated_at?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          content: Json
          created_at: string
          doctor_id: string
          encrypted_data: string | null
          file_urls: string[] | null
          id: string
          patient_id: string
          record_type: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          doctor_id: string
          encrypted_data?: string | null
          file_urls?: string[] | null
          id?: string
          patient_id: string
          record_type: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          doctor_id?: string
          encrypted_data?: string | null
          file_urls?: string[] | null
          id?: string
          patient_id?: string
          record_type?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          allergies: Json | null
          blood_type: string | null
          created_at: string
          current_medications: Json | null
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          gender: string | null
          id: string
          medical_history: Json | null
          patient_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          allergies?: Json | null
          blood_type?: string | null
          created_at?: string
          current_medications?: Json | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id?: string
          medical_history?: Json | null
          patient_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          allergies?: Json | null
          blood_type?: string | null
          created_at?: string
          current_medications?: Json | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id?: string
          medical_history?: Json | null
          patient_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_doctor_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_patient_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
