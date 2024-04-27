export interface Language {
  name: string;
}

export interface Level {
  name: string;
}

export interface Price {
  value: string;
}

export const languages: Language[] = [
  { name: 'French' },
  { name: 'German' },
  { name: 'Mandarin Chinese' },
  { name: 'English' },
  { name: 'Spanish' },
  { name: 'Italian' },
  { name: 'Korean' },
  { name: 'Vietnamese' },
];

export const levels: Level[] = [
  { name: 'A1 Beginner' },
  { name: 'A2 Elementary' },
  { name: 'B1 Intermediate' },
  { name: 'B2 Upper-Intermediate' },
  { name: 'C1 Advanced' },
  { name: 'C2 Proficient' },
];

export const price: Price[] = [
  { value: '15' },
  { value: '20' },
  { value: '25' },
  { value: '30' },
  { value: '35' },
];
