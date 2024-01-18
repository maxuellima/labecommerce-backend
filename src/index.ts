import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TUser } from "./types";
import { db } from "./database/knex";

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
app.get("/users", async (req: Request, res: Response) => {
  try {
  const usuarios: Array<TUser> = await db.raw(`SELECT * FROM users`);    
    res.status(200).send(usuarios);
    
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

//createUser - 1. Validar body, 2. Id existe, 3. Email existe
app.post("/users", async (req: Request, res: Response) => {
  try {
    // const id = req.body.id as string;
    // const name = req.body.name as string;
    // const email = req.body.email as string;
    // const password = req.body.password as string;

    const {id, name, email, password} = req.body;
    //Desestruturando

    //validar o body
    if(id === undefined || name === undefined || email === undefined || password === undefined){
      res.status(400);
      throw new Error ("O body precisa ter todos esses atributos: 'id', 'name', 'email' e 'password'")
    }

    if (id !== undefined){
      if(typeof id !== "string"){
        res.statusCode = 400;
        throw new Error('O atributo "id" deve ser uma string');
      }
      if(id[0] !== "u"){
        res.statusCode = 400;
        throw new Error("O 'id' do usuário deve começar com a letra 'u'");
      }
      if(typeof name !== "string"){
        res.statusCode = 400;
        throw new Error ("O 'name' do usuário deve ser uma string");
      }
      if(name.length < 2){
        res.statusCode=400;
        throw new Error("O 'name' do usuário deve conter no mínimo 2 caracteres");
      }
      if(typeof email !== "string"){
        res.statusCode = 400;
        throw new Error ("O 'email' do usuário deve ser uma 'string'");
      }
      if(typeof password !== "string"){
        res.statusCode = 400;
        throw new Error ("O 'password' do usuário deve ser uma 'string'");
      }
    }
    const data = new Date().toISOString();

    await db.raw(`
    INSERT INTO users(id, name, email, password, created_at)
    VALUES
    ("${id}", "${name}", "${email}", "${password}", '${data}');
    `);
    res.status(201).send("Cadastro do usuário realizado com sucesso!");

    //Código anterior
    // const newUser: TUser = {
    //   id,
    //   name,
    //   email,
    //   password,
    //   createdAt: new Date().toISOString(),
    // };

    

    // //Verificando se o id é igual ao de algum usuário que já existe

    // const idExists = .find((user) => user.id === id);

    // if (idExists) {
    //   res.status(400);
    //   throw new Error("Já existe um user com esse id. Cadastre com outro id.");
    // }

    // //Verificando se o id é igual ao de algum usuário que já existe
    // const emailExists: TUser | undefined = .find((user) => user.email === email);

    // if (emailExists) {
    //   res.status(400);
    //   throw new Error("Email já existente. Cadastre um outro e-mail.");
    // }

    // .push(newUser);
    
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
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete: string = req.params.id;

    const [user] = await db.raw(`SELECT * from users;`)
    // const indexUser = .findIndex((user) => {
    //   return user.id === userToDelete;
    // });
    // const idUserExists = .find((user) => user.id === userToDelete);

    if (!user) {
      res.status(404);
      throw new Error("Usuário não encontrado, digite um id válido!");
    }

    await db.raw(`
    DELETE FROM users
    WHERE
    id = '${idToDelete}'
    `);   
    res.status(200).send("Usuário apagado com sucesso!");

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

//edit User - COM PROBLEMAS
app.put("/user/:id", async (req: Request, res: Response)=>{
  try {
    const idToEdit: string = req.params.id;
    const [searchUser] = await db.raw(`SELECT * FROM users WHERE id = '${idToEdit}'`);

    if(!searchUser){
      res.statusCode = 404;
      throw new Error("Usuário não encontrado");
    }

    const {id, name, email, password} = req.body;
    const query: Array<string> = []

    if( id !== undefined) {
      if(typeof id !== "string"){
        res.statusCode = 400;
        throw new Error("'id' deve ser do tipo string");
      }
      query.push(`id = '${id}'`);
    }
    if(name !== undefined){
      if(typeof name !== "string"){
        res.statusCode = 400;
        throw new Error("'name' deve ser do tipo string");
      }
      if(name.length < 2){
        res.statusCode = 400;
        throw new Error("Nome precisa ter mais de 1 caractere.")
      }
      query.push(`name = '${name}'`)
    }
    if(email !== undefined){
      if(typeof email !== "string"){
        res.statusCode = 400;
        throw new Error("'email' deve ser do tipo string.");
      }
      if(!email.includes("@")){
        res.statusCode = 400;
        throw new Error("Email inválido.Deve conter o '@'");
      }
      query.push(`email = '${email}'`);
    }

    if(password !== undefined){
      if(typeof password !== "string"){
        res.statusCode = 400;
        throw new Error("Senha deve ser do tipo string.");
      }
      query.push(`password = '${password}'`);
    }

    const newQuery: string = query.join(", ");
    console.log(newQuery);
    await db.raw(`UPDATE users SET ${newQuery} WHERE id = '${idToEdit}'`);
    res.status(201).send("Informações atualizadas com sucesso!")

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
})

// getAllProducts 1. deve possuir pelo menos um caractere
app.get("/products", async (req: Request, res: Response) => {
  try {
    const productToFind = req.query.name as string;

    if (productToFind !== undefined) {
      if (productToFind.length < 1) {
        res.status(400);
        throw new Error ("A busca deve ter ao menos um caractere")
      }

      const search: Array<TProduct> | undefined = await db.raw(`SELECT * FROM products WHERE name LIKE '%${productToFind}%'`);

       return res.status(200).send(search);
    }

    const products: Array<TProduct> | undefined = await db.raw(`SELECT * FROM products`);
    res.status(200).send(products);
    
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
app.post("/products", async (req: Request, res: Response) => {
  try {
    const {id, name, price,description, imageUrl} = req.body;

    const newProduct: TProduct = {
      id,
      name,
      price,
      description,
      imageUrl
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
      const idProductsExist = await db.raw(`SELECT * FROM products WHERE id = '${id}'`);

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

    await db.raw(`
    INSERT INTO products(id, name, price, description, imageUrl)
    VALUES
    ("${newProduct}');
    `);
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

// //deleteProduct
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const productToDelete: string = req.params.id;

    const [product] = await db.raw(`SELECT * from products;`)
    // const indexUser = .findIndex((user) => {
    //   return user.id === userToDelete;
    // });
    // const idUserExists = .find((user) => user.id === userToDelete);

    if (!product) {
      res.status(404);
      throw new Error("Produto não encontrado, digite um id válido!");
    }

    await db.raw(`
    DELETE FROM products
    WHERE
    id = '${productToDelete}'
    `);   
    res.status(200).send("Produto apagado com sucesso!");

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
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const productToEdit = req.params.id;

    const {id, name, price, description, imageUrl} = req.body;
    
    //Verificando a existência do usuário
    const product = await db.raw(`SELECT * FROM products WHERE id ='${productToEdit}'`)

    if (product === undefined) {
      res.status(404);
      throw new Error("Não foi possível editar o produto, ID não encontrado");
    } 
    
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
