-- Active: 1702595685714@@127.0.0.1@3306

--Criando a tabela de usuários
CREATE TABLE IF NOT EXISTS users (
     id TEXT PRIMARY KEY UNIQUE NOT NULL,
     name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     created_at TEXT NOT NULL
);

PRAGMA table_info('users');

--apresentar a tabela com todos os dados
SELECT * FROM users;

INSERT INTO users (id, name, email, password, created_at)
VALUES
('u004', 'Frodo', 'frodobaggins@gmail.com', 'condado123', CURRENT_TIMESTAMP),
('u005', 'Samwise Gamgee', 'samgamgee@hobbitmail.com', 'green1', CURRENT_TIMESTAMP),
('u007', 'Galadriel', 'arainha@gmail.com', 'valfenda123','2023-01-17 12:35:28');

--Para apagar a tabela de usuários
DROP TABLE users;

--Criando tabela de produtos
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

PRAGMA table_info('products');

SELECT * FROM products;
--apresentar a tabela com dados específicos
SELECT  * FROM products WHERE price > 1 AND name LIKE 'Arco%';

--Preenchendo a tabela com dados
INSERT INTO products (id, name, price, description, image_url)
VALUES
('prod004', 'Espada forjada em Mordor', 150.50, 'Este é o melhor arma para combate corpo a corpo', 'https://pm1.aminoapps.com/6734/4c8b1f21f578d9dbaa3ec0becf7e7882bda442e9v2_00.jpg'),
('p004', 'fogo de artifício de dragão', 12.56, 'Esse fogo de artifício demora cerca de 5 minutos no ar em forma de dragão', 'https://pavanifogos.com/wp-content/uploads/2017/12/teste-71.png'); 




