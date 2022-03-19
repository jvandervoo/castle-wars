export interface ICard {
  id: string;
  name: string;
  cost?: {
    crystals?: number;
    bricks?: number;
    weapons?: number;
  };
  description: string;
}
