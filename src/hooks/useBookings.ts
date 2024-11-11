import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];

export function useBookings(roomId: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const now = new Date().toISOString().replace('T', ' ').replace('Z', '+00');
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('room_id', roomId)
          .gte('end_time', now)
          .order('start_time');

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();

    const subscription = supabase
      .channel(`bookings_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  return { bookings, loading };
}