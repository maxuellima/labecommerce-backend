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
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
(0, database_1.createUser)("u004", "Bebel", "Bebel@gmail.com", 4343);
(0, database_1.createUser)("u002", "Max", "Max@gmail.com", 4121);
(0, database_1.getAllUsers)();
(0, database_1.createProduct)("p001", "Playstation5", 2.5, "Playstation branco com 2 controles", "https://picsum.photos/seed/Mouse%20gamer/400");
(0, database_1.getAllProducts)();
console.log((0, database_1.searchProdutcsByName)("gamer"));
