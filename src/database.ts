import { TUser, TProduct } from "./types";

export const users: TUser[] = [
  {
    id: "u001",
    name: "fulano",
    email: "fulano@gmail.com",
    password: "fulano123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Beltrana",
    email: "Beltrana@gmail.com",
    password: "beltrana00",
    createdAt: new Date().toISOString(),
  },
];

export const products: TProduct[] = [
  {
    id: "prod001",
    name: "Mouse Gamer",
    price: 250,
    description: "Melhor mouse do mercado",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Monitor gamer",
    price: 900,
    description: "Monitor LED full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];

