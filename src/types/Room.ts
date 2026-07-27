export interface Room {
  id: number;
  name: string;
  description: string;
  base_price: number;
  room_size: number;
  bed_type: string;
  max_adults: number;
  max_children: number;
}