import { products, users } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TUser } from "./types";

//Criação do servidor express
const app = express();

//Configuração que garante que as respostas estejam sempre em json
app.use(express.json());

//configuração do middleware que habilita o cors
app.use(cors());

//servidor escutando porta 3003
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//get teste
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong pow!");
});

//getAllUsers
app.get("/users", (req: Request, res: Response) => {
  const userToFind = req.query.name as string;
  if (userToFind) {
    const result: TUser[] = users.filter((user) => {
      return user.name.toLowerCase().includes(userToFind.toLowerCase());
    });
    res.send(result);
  }
  res.send(users);
});

//getAllProducts
app.get("/products", (req: Request, res: Response) => {
  const productToFind = req.query.name as string;
  if (productToFind) {
    const result: TProduct[] = products.filter((product) => {
      return product.name.toLowerCase().includes(productToFind.toLowerCase());
    });
    res.send(result);
  }
  res.send(products);
});

//createUser
app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  const newUser: TUser = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  res.status(201).send("Cadastro realizado com sucesso!");
});

//Criar novos produtos
app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const description = req.body.description as string;
  const imageUrl = req.body.imageUrl as string;

  const newProduct: TProduct = {
    id,
    name,
    price,
    description,
    imageUrl,
  };
  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso!");
});

//deleteUser
app.delete("/users/:id", (req: Request, res: Response) => {
  const userToDelete: string = req.params.id;
  const indexUser = users.findIndex((user) => {
    return user.id === userToDelete;
  });
  if (indexUser >= 0) {
    users.splice(indexUser, 1);
  }
  res.status(200).send("User apagado com sucesso!");
});

//deleteProduct
app.delete("/products/:id", (req: Request, res: Response) => {
  const productToDelete: string = req.params.id;

  const indexProduct = products.findIndex((product) => {
    return product.id === productToDelete;
  });
  if (indexProduct >= 0) {
    products.splice(indexProduct, 1);
  }
  res.status(200).send("Produto apagado com sucesso");
});

//editProduct
app.put("/products/:id", (req: Request, res: Response) => {
  const productToEdit = req.params.id;

  const newId = req.body.id as string | undefined;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imageUrl as string | undefined;

  const product = products.find((product) => product.id === productToEdit);

  if (product) {
    product.id = newId || product.id;
    product.name = newName || product.name;
    product.description = newDescription || product.description;
    product.imageUrl = newImageUrl || product.imageUrl;
    product.price = newPrice || product.price;
  }
  res.status(200).send("Atualização realizada com sucesso!");
});
