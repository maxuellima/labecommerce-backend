"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
(0, database_1.createUser)("u004", "Bebel", "Bebel@gmail.com", 4343);
(0, database_1.createUser)("u002", "Max", "Max@gmail.com", 4121);
(0, database_1.getAllUsers)();
(0, database_1.createProduct)("p001", "Playstation5", 2.5, "Playstation branco com 2 controles", "https://picsum.photos/seed/Mouse%20gamer/400");
(0, database_1.getAllProducts)();
console.log((0, database_1.searchProdutcsByName)("gamer"));
// console.log(users)
// console.log(products)
