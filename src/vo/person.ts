export interface PersonVO {
  readonly id: number;
  readonly name: string;
  readonly popularity: number;
  readonly keyword: string;
  readonly imageUrl: string;
  readonly story: string;
  readonly isActive: boolean;
}