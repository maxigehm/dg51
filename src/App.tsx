import React, { useState } from 'react';
import { Music2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { rooms } from './data/rooms';
import { RoomCard } from './components/RoomCard';
import { BookingForm } from './components/BookingForm';
import type { Room } from './types';

function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Music2 className="text-blue-600" size={24} />
            <h1 className="text-xl font-bold text-gray-900">Rehearsal Room Booking</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Select a Room</h2>
            <div className="grid gap-6">
              {rooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onSelect={setSelectedRoom}
                  isSelected={selectedRoom?.id === room.id}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Book Your Session</h2>
            {selectedRoom ? (
              <BookingForm selectedRoom={selectedRoom} />
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <p className="text-gray-500">Please select a room to start booking</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;