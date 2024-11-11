export interface BookingSlot {
  id: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  userName: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  capacity: number;
}