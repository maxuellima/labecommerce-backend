import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TPurchase, TUser } from "./types";
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

//GET ALL Users - FUNCIONANDO
app.get("/users", async (req: Request, res: Response) => {
  try {
  const usuarios: Array<TUser> = await db("users");    
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

//POST User - 1. Validar body, 2. Id existe, 3. Email existe - FUNCIONANDO
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

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
      created_at: data
    }

    await db("users").insert(newUser);
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

//DELETE User - FUNCIONANDO
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const userToDelete: string = req.params.id;

    const [user] = await db("users")
    
    if (!user) {
      res.status(404);
      throw new Error("Produto não encontrado, digite um id válido!");
    }

    await db("users").del().where({id: userToDelete}); 
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

//PUT User
app.put("/user/:id", async (req: Request, res: Response)=>{
  try {
    const userToEdit: string = req.params.id;
    
    const newId = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const newCreatedAt = req.body.createdAt;


    if( newId !== undefined) {
      if(typeof newId !== "string"){
        res.statusCode = 400;
        throw new Error("'id' deve ser do tipo string");
      }
    }
    if(newName !== undefined){
      if(typeof newName !== "string"){
        res.statusCode = 400;
        throw new Error("'name' deve ser do tipo string");
      }
      if(newName.length < 2){
        res.statusCode = 400;
        throw new Error("Nome precisa ter mais de 1 caractere.")
      }
    }
    if(newEmail !== undefined){
      if(typeof newEmail !== "string"){
        res.statusCode = 400;
        throw new Error("'email' deve ser do tipo string.");
      }
      if(!newEmail.includes("@")){
        res.statusCode = 400;
        throw new Error("Email inválido.Deve conter o '@'");
      }
    }

    if(newPassword !== undefined){
      if(typeof newPassword !== "string"){
        res.statusCode = 400;
        throw new Error("Senha deve ser do tipo string.");
      }
    }
    if (newCreatedAt !== undefined) {
      if (typeof newCreatedAt !== "string") {
          res.status(400)
          throw new Error("'createdAt' deve ser string")
      }
  }

    const [searchUser] = await db("users").where({id: userToEdit});

    if(searchUser){
      const updatedUser = {
        id: newId || searchUser.id,
        name: newName || searchUser.name,
        email: newEmail || searchUser.email,
        password: newPassword || searchUser.password ,
        created_at: newCreatedAt || searchUser.created_at
      }      
      await db("users").update(updatedUser).where({id: userToEdit})
      res.status(201).send({message:"Informações atualizadas com sucesso!", user: updatedUser})
      
    }else{
      res.statusCode = 404;
      throw new Error("Usuário não encontrado");
    }  

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

// getAllProducts 1. deve possuir pelo menos um caractere - FUNCIONANDO
app.get("/products", async (req: Request, res: Response) => {
  try {
    const productToFind = req.query.name as string;

    if (productToFind !== undefined) {
      if (productToFind.length < 1) {
        res.status(400);
        throw new Error ("A busca deve ter ao menos um caractere")
      }

      const search: Array<TProduct> | undefined = await db(`products`).where("name", "LIKE", `%${productToFind}`);
      
      return res.status(200).send(search);
    }

    const products: Array<TProduct> | undefined = await db("products");
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


//POST products - FUNCIONANDO
app.post("/products", async (req: Request, res: Response) => {
  try {
    const {id, name, price,description, image_url} = req.body;

    if(id === undefined || name === undefined || price === undefined || description === undefined || image_url === undefined) {
      res.status(400);
      throw new Error("O body do product precisa ter todos esses atributos: 'id', 'name', 'price', 'description', 'imageUrl'");
    }

    if(id !== undefined){
      if(typeof id !== "string"){
        res.status(400)
        throw new Error ("'Id' precisa ser uma string")
      }}

      if(!id.includes("prod")){
        res.status(400)
        throw new Error("O id deve começar com a letra 'p'")
      }

    if(typeof name !== 'string'){
      res.status(400)
      throw new Error("'name' deve ser do tipo string")
    }

    if(name.length < 2) {
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

    if(typeof image_url !== 'string'){
      res.status(400);
      throw new Error("'imageUrl' deve ser do tipo string")
    }

    const [idProductsExist]: TProduct[] | undefined[] = await db("products").where({id})

    if (idProductsExist) {
      res.status(400)
      throw new Error(
        "Já existe um product com esse id. Cadastre com outro id."
      )
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      description,
      image_url
    };

    await db("products").insert(newProduct);
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

// //deleteProduct - FUNCIONANDO
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

//editProduct - FUNCIONANDO
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const productToEdit = req.params.id;

    const {id, name, price, description, imageUrl} = req.body;
    
    //Verificando a existência do usuário
    const [product] = await db.raw(`SELECT * FROM products WHERE id ='${productToEdit}'`)

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
    
      const updatedProduct: TProduct = {
      id : id || product.id,
      name : name || product.name,
      description : description || product.description,
      image_url : imageUrl || product.imageUrl,
      price : price || product.price}

    await db.update(updatedProduct).from("products").where({ id: productToEdit });
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

//GET ALL Purchases - FUNCIONANDO
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const [users_products]: TPurchase[] = await db("purchases");
    res.status(200).send(users_products);
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
//GET PurchaseById - Funcionando
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToSearch: string = req.params.id;
    const [purchase] = await db
      .select(
        "purchases.id AS purchaseId",
        "purchases.buyer AS buyerId",
        "users.name AS buyerName",
        "users.email AS buyerEmail",
        "purchases.total_price AS totalPrice",
        "purchases.created_at AS createdAt"
      )
      .from("purchases")
      .join("users", "purchases.buyer", "=", "users.id")
      .where({ "purchases.id": idToSearch });

    const listPurchasesProducts = await db
      .select("*")
      .from("purchases_products")
      .join("products", "purchases_products.product_id", "=", "products.id");

    const listPurchase = {
      purchaseId: purchase.purchaseId,
      buyerId: purchase.buyerId,
      buyerName: purchase.buyerName,
      buyerEmail: purchase.buyerEmail,
      totalPrice: purchase.totalPrice,
      createdAt: purchase.createdAt,
      products: listPurchasesProducts,
    };

    res.status(200).send(listPurchase);
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
//POST purchase - Funcionando
app.post("/purchases", async (req: Request, res: Response) => {
  try{
    const { id, buyer, products } = req.body;

    if(!id || !buyer ){
      res.statusCode = 400;
      throw new Error("'id' - 'buyer' - 'total_price' são obrigatorios, preencha!");
    }
    if(typeof id !== "string"){
      res.statusCode = 400;
      throw new Error("'id' deve ser do tipo string");
    }
    if(typeof buyer !== "string"){
      res.statusCode = 400;
      throw new Error("'buyer' deve ser do tipo string");
    }
    if(!products){
      res.statusCode = 400;
      throw new Error("'products' é obrigatório, preencha!");
    }
    if(!Array.isArray(products)){
      res.statusCode = 400;
      throw new Error("'products', deve ser enviado no formato de array products: [ ],");
    }

    const [idCompra] = await db.select("*").from("purchases").where({id: id})

    if(idCompra){
      res.statusCode = 400;
      throw new Error("'id' ja existe, favor conferir os dados");
    }

    const idProducts = products.map(async (item) => {
      return await db.select("*").from("products").where({id: item.id});
    });
    const prod = await Promise.all(idProducts);   

    const flatProducts = prod.flat();

    const totalPrice = flatProducts.reduce((acc, atual)=> acc + atual.price, 0);

    const insertData = flatProducts.map((prod: TProduct)=>({
      purchases_id: id,
      product_id: prod.id,
      quantity: products.find((item) => item.id === prod.id)?.quantity || 1
    }));

    await db.insert({
      id,
      buyer,
      total_price: totalPrice
    }).from("purchases");    

    await db.transaction(async (tr) => {
      for (const item of insertData) {
        await tr.insert({
          purchase_id: item.purchases_id,
          product_id: item.product_id,
          quantity: item.quantity
        }).into("purchases_products");
      }
    });

    res.status(200).send("Pedido realizado com sucesso");
  }catch (error) {
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

//DELETE purchase - FUNCIONANDO
app.delete("/purchases/:id", async (req: Request, res: Response) =>{
  try{
    const idToDelete:string = req.params.id;
    if(!idToDelete){
      res.statusCode = 404;
      throw new Error("'id' é obrigatório, preencha!");
    }

    const [compra] = await db("purchases").where({id: idToDelete});

    if(!compra){
      res.statusCode = 404;
      throw new Error("'id' - compra não existente, verificar 'id'");
    }

    await db("purchases").del().where({id: idToDelete});

    res.status(200).send("Pedido deletado com sucesso");
  }catch (error) {
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
