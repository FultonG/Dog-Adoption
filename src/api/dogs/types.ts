export interface DogSearchResponse {
  resultIds: string[];  // array of dog IDs (strings)
  total: number;
  next: string | null;
  prev: string | null;
}

export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}