export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface UserGhibli extends User {
  ghibliData: unknown;
}
