"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//Criação do servidor express
const app = (0, express_1.default)();
//Configuração que garante que as respostas estejam sempre em json
app.use(express_1.default.json());
//configuração do middleware que habilita o cors
app.use((0, cors_1.default)());
//servidor escutando porta 3003
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
//get teste
app.get("/ping", (req, res) => {
    res.send("Pong pow!");
});
//getAllUsers
app.get("/users", (req, res) => {
    const userToFind = req.query.name;
    if (userToFind) {
        const result = database_1.users.filter((user) => {
            return user.name.toLowerCase().includes(userToFind.toLowerCase());
        });
        res.send(result);
    }
    res.send(database_1.users);
});
//getAllProducts
app.get("/products", (req, res) => {
    const productToFind = req.query.name;
    if (productToFind) {
        const result = database_1.products.filter((product) => {
            return product.name.toLowerCase().includes(productToFind.toLowerCase());
        });
        res.send(result);
    }
    res.send(database_1.products);
});
//createUser
app.post("/users", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso!");
});
//Criar novos produtos
app.post("/products", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
});
//deleteUser
app.delete("/users/:id", (req, res) => {
    const userToDelete = req.params.id;
    const indexUser = database_1.users.findIndex((user) => {
        return user.id === userToDelete;
    });
    if (indexUser >= 0) {
        database_1.users.splice(indexUser, 1);
    }
    res.status(200).send("User apagado com sucesso!");
});
//deleteProduct
app.delete("/products/:id", (req, res) => {
    const productToDelete = req.params.id;
    const indexProduct = database_1.products.findIndex((product) => {
        return product.id === productToDelete;
    });
    if (indexProduct >= 0) {
        database_1.products.splice(indexProduct, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
});
//editProduct
app.put("/products/:id", (req, res) => {
    const productToEdit = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageUrl = req.body.imageUrl;
    const product = database_1.products.find((product) => product.id === productToEdit);
    if (product) {
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.description = newDescription || product.description;
        product.imageUrl = newImageUrl || product.imageUrl;
        product.price = newPrice || product.price;
    }
    res.status(200).send("Atualização realizada com sucesso!");
});
