import { createProduct, createUser, getAllProducts, getAllUsers, products, searchProdutcsByName, users } from "./database"

createUser("u004", "Bebel", "Bebel@gmail.com", 4343);
createUser("u002", "Max", "Max@gmail.com", 4121);
getAllUsers();
createProduct(
    "p001",
    "Playstation5",
    2.5,
    "Playstation branco com 2 controles",
    "https://picsum.photos/seed/Mouse%20gamer/400"
  );
  getAllProducts();
  console.log(searchProdutcsByName("gamer"))