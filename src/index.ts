import {
  products,
  users
} from "./database";
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
  res.send(users);
});

//getAllProducts
app.get("/products", (req: Request, res: Response) => {
  const nameToFind = req.query.name as string;
 if(nameToFind){
  const result: TProduct[] = products.filter((product) => {
    return product.name.toLowerCase().includes(nameToFind.toLowerCase());
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

app.post("/products",(req:Request, res: Response)=>{
  const id = req.body.id as string
  const name = req.body.name as string
  const price = req.body.price as number
  const description = req.body.description as string
  const imageUrl = req.body.imageUrl as string

  const newProduct: TProduct = {
    id,
    name,
    price,
    description,
    imageUrl
  }
  products.push(newProduct)
  res.status(201).send("Produto cadastrado com sucesso!")
})
