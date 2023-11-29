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


export const createUser = (
  id: string | number,
  name: string,
  email: string,
  password: string | number
): string => {
  const newUser: TUser = {
    id: id,
    name: name,
    email: email,
    password: password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return "Cadastro realizado com sucesso"
};

export const getAllUsers = (): TUser[] => {
  return users;
};

export const createProduct = (
  id: string | number,
  name: string,
  price: number,
  description: string,
  imageUrl: string
): string => {
  const product: TProduct = {
    id: id,
    name: name,
    price: price,
    description: description,
    imageUrl: imageUrl,
  };
  products.push(product);
  return "Produto criado com sucesso";
};

export const getAllProducts = (): TProduct[] => {
  return products ;
};

export const searchProdutcsByName = (name: string): TProduct[] => {
  return products.filter((product) =>{
    return product.name.toLowerCase().includes(name.toLowerCase())
    })
  };

