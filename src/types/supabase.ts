export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          created_at: string
          room_id: string
          date: string
          start_time: string
          end_time: string
          user_name: string
        }
        Insert: {
          id?: string
          created_at?: string
          room_id: string
          date: string
          start_time: string
          end_time: string
          user_name: string
        }
        Update: {
          id?: string
          created_at?: string
          room_id?: string
          date?: string
          start_time?: string
          end_time?: string
          user_name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}