import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import type { Room } from '../types';

interface BookingFormProps {
  selectedRoom: Room;
  onSubmit: (data: { date: string }) => void;
  isLoading: boolean;
}

export function BookingForm({ selectedRoom, onSubmit, isLoading }: BookingFormProps) {
  const [userName, setUserName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

  const formatDateTimeForDB = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toISOString().replace('T', ' ').replace('Z', '+00');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error: bookingError } = await supabase.from('bookings').insert({
        room_id: selectedRoom.id,
        user_name: userName,
        start_time: formatDateTimeForDB(startTime),
        end_time: formatDateTimeForDB(endTime),
      });

      if (bookingError) throw bookingError;

      toast.success('Room booked successfully!');
      setUserName('');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      toast.error('Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-6 shadow-sm">
      <div>
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          min={`${today}T00:00`}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          min={startTime || `${today}T00:00`}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Booking...' : 'Book Room'}
      </button>
    </form>
  );
}

export default BookingForm;