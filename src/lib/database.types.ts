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
          user_name: string
          room_id: string
          start_time: string
          end_time: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_name: string
          room_id: string
          start_time: string
          end_time: string
        }
        Update: {
          id?: string
          created_at?: string
          user_name?: string
          room_id?: string
          start_time?: string
          end_time?: string
        }
      }
    }
  }
}