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
  try {
    const userToFind = req.query.name as string;

    if (userToFind !== undefined) {
      if (userToFind.length < 1) {
        res.status(400);
        throw new Error("A busca deve ter ao menos um caractere.");
      }
      const result: TUser[] = users.filter((user) => {
        return user.name.toLowerCase().includes(userToFind.toLowerCase());
      });
      res.send(result);
    }
    res.send(users);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

//getAllProducts 1. deve possuir pelo menos um caractere
app.get("/products", (req: Request, res: Response) => {
  try {
    const productToFind = req.query.name as string;

    if (productToFind !== undefined) {
      if (productToFind.length < 1) {
        res.status(400);
        throw new Error ("A busca deve ter ao menos um caractere")
      }
      const result: TProduct[] = products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(productToFind.toLowerCase());
      });
      res.send(result);
    }
    res.send(products);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

//createUser - 1. Validar body, 2. Id existe, 3. Email existe
app.post("/users", (req: Request, res: Response) => {
  try {
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

    //validar o body
    if(id === undefined || name === undefined || email === undefined || password === undefined){
      res.status(400);
      throw new Error ("O body precisa ter todos esses atributos: 'id', 'name', 'email' e 'password'")
    }

    //Verificando se o id é igual ao de algum usuário que já existe

    const idExists = users.find((user) => user.id === id);

    if (idExists) {
      res.status(400);
      throw new Error("Já existe um user com esse id. Cadastre com outro id.");
    }

    //Verificando se o id é igual ao de algum usuário que já existe
    const emailExists: TUser | undefined = users.find((user) => user.email === email);

    if (emailExists) {
      res.status(400);
      throw new Error("Email já existente. Cadastre um outro e-mail.");
    }

    users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

//Criar novos produtos
app.post("/products", (req: Request, res: Response) => {
  try {
    const {id, name, price,description, imageUrl} = req.body;

    const newProduct: TProduct = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    if(id === undefined || name === undefined || price === undefined || description === undefined || imageUrl === undefined) {
      res.status(400);
      throw new Error("O body do product precisa ter todos esses atributos: 'id', 'name', 'price', 'description', 'imageUrl'");
    }

    if(id !== undefined){
      if(typeof id !== "string"){
        res.status(400)
        throw new Error ("'Id' precisa ser uma string")
      }

      if(!id.includes("prod")){
        res.status(400)
        throw new Error("O id deve começar com a letra 'p'")
      }
      const idProductsExist = products.find((product) => product.id === id);

    if (idProductsExist) {
      res.status(400);
      throw new Error(
        "Já existe um product com esse id. Cadastre com outro id."
      );
    }
    } 

    if(typeof name !== 'string'){
      res.status(400)
      throw new Error("'name' deve ser do tipo string")
    }

    if(name.length<2) {
      res.status(400);
      throw new Error("Nome deve ter mais de 2 caracteres");
    }

    if(typeof price !== 'number'){
      res.status(400);
      throw new Error("'price' deve ser do tipo number")
    }
    if(typeof description !== 'string'){
      res.status(400);
      throw new Error("'description' deve ser do tipo string")
    }

    if(typeof imageUrl !== 'string'){
      res.status(400);
      throw new Error("'imageUrl' deve ser do tipo string")
    }

    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

//deleteUser
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const userToDelete: string = req.params.id;
    const indexUser = users.findIndex((user) => {
      return user.id === userToDelete;
    });

    const idUserExists = users.find((user) => user.id === userToDelete);

    if (!idUserExists) {
      res.status(404);
      throw new Error("Usuário não encontrado, digite um id válido!");
    }

    if (indexUser >= 0) {
      users.splice(indexUser, 1);
    }
    res.status(200).send("User apagado com sucesso!");

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

//deleteProduct
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const productToDelete: string = req.params.id;

    const indexProduct = products.findIndex((product) => {
      return product.id === productToDelete;
    });

    const idProductsExist = products.find(
      (product) => product.id === productToDelete
    );

    if (!idProductsExist) {
      res.status(404);
      throw new Error(
        "Id do product a deletar é inválido, passe um id válido!"
      );
    }

    if (indexProduct >= 0) {
      products.splice(indexProduct, 1);
    }
    res.status(200).send("Produto apagado com sucesso");

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

//editProduct
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const productToEdit = req.params.id;
    
    //Verificando a existência do usuário
    const product = products.find((product) => product.id === productToEdit);

    if (product === undefined) {
      res.status(404);
      throw new Error("Não foi possível editar o produto, ID não encontrado");
    }

    const {id, name, price, description, imageUrl} = req.body;

    if(id !== undefined){
      if(typeof id !== 'string'){
        res.status(400);
        throw new Error("'id' deve ser do tipo string")
      }
    }
    if(name !== undefined){
      if(typeof name !== 'string'){
        res.status(400);
        throw new Error("'name' deve ser do tipo string")
      }
    }
    if(price !== undefined){
      if(typeof price !== 'number'){
        res.status(400);
        throw new Error("'price' deve ser do tipo number")
      }
    }
    if(description !== undefined){
      if(typeof description !== 'string'){
        res.status(400);
        throw new Error("'description' deve ser do tipo string")
      }
    }
    if(imageUrl !== undefined){
      if(typeof imageUrl !== 'string'){
        res.status(400);
        throw new Error("'imageUrl' deve ser do tipo string")
      }
    }  
    
    if (product) {
      product.id = id || product.id;
      product.name = name || product.name;
      product.description = description || product.description;
      product.imageUrl = imageUrl || product.imageUrl;
      product.price = price || product.price;
    }

    res.status(200).send("Atualização dos dados realizada com sucesso!");

  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});
