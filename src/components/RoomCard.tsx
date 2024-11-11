import React from 'react';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: (room: Room) => void;
}

export function RoomCard({ room, isSelected, onSelect }: RoomCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
          : 'border-gray-200 hover:border-blue-200'
      }`}
      onClick={() => onSelect(room)}
    >
      <div className="aspect-video w-full relative">
        <img
          src={room.imageUrl}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
        <p className="mt-2 text-gray-600">{room.description}</p>
      </div>
    </div>
  );
}