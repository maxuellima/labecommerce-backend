-- Active: 1702595685714@@127.0.0.1@3306

--Criando a tabela de usuários
CREATE TABLE
    IF NOT EXISTS users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

PRAGMA table_info('users');

--apresentar a tabela com todos os dados
SELECT * FROM users;

INSERT INTO
    users(
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Frodo',
        'frodobaggins@gmail.com',
        'condado123',
        CURRENT_TIMESTAMP
    ), (
        'u002',
        'Samwise Gamgee',
        'samgamgee@hobbitmail.com',
        'green1',
        CURRENT_TIMESTAMP
    ), (
        'u003',
        'Galadriel',
        'arainha@gmail.com',
        'valfenda123',
        '2023-01-17 12:35:28'
    );

--Para apagar a tabela de usuários
DROP TABLE users;

--Criando tabela de produtos
CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

PRAGMA table_info('products');

UPDATE users
SET 
id = 'u010'
WHERE id = 'u001';

SELECT * FROM products;
--apresentar a tabela com dados específicos
SELECT * FROM products WHERE name LIKE ('%arco%');

--Preenchendo a tabela com dados
INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod004',
        'Espada forjada em Mordor',
        150.50,
        'Este é o melhor arma para combate corpo a corpo',
        'https://pm1.aminoapps.com/6734/4c8b1f21f578d9dbaa3ec0becf7e7882bda442e9v2_00.jpg'
    ), (
        'prod005',
        'fogo de artifício de dragão',
        12.56,
        'Esse fogo de artifício demora cerca de 5 minutos no ar em forma de dragão',
        'https://pavanifogos.com/wp-content/uploads/2017/12/teste-71.png'
    );

DELETE FROM users WHERE id = 'u004'

DELETE FROM products WHERE id = 'p001';

UPDATE products
SET
    name = 'Mudei nome',
    price = 450,
    description = 'Essa é uma descrição da minha máquina',
    image_url = 'http://Kabum.com/máquina-fotográfica'
WHERE
id = 'prod001';

--Criando tabela de pedidos
CREATE TABLE purchases(
id TEXT PRIMARY KEY UNIQUE NOT NULL,
buyer TEXT NOT NULL,
total_price REAL NOT NULL,
created_at TEXT NOT NULL,
FOREIGN KEY(buyer) REFERENCES users(id)
ON UPDATE CASCADE
ON DELETE CASCADE
);
--DATE NOT NULL DEFAULT TIMESTAMP - outra forma de declarar a data

DROP TABLE purchases;

INSERT INTO purchases(id, buyer, total_price, created_at)
VALUES
('pur004','u001', 190.50,CURRENT_TIMESTAMP),
('pur003','u002', 130.56, CURRENT_TIMESTAMP);

SELECT * FROM purchases;

UPDATE purchases
SET 
total_price=1000
WHERE id = 'pur002';

SELECT
purchases.id,
users.name AS buyer_name,
users.id,
users.email,
purchases.total_price,
purchases.created_at
FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(purchase_id) REFERENCES purchases(id),
    Foreign KEY (product_id) REFERENCES products (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE purchases_products;

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('pur001', 'prod003', 5),
('pur002', 'prod004', 8),
('pur003', 'prod002', 3);


SELECT * FROM purchases_products
INNER JOIN purchases
ON
purchases_products.purchase_id = purchases.id
INNER JOIN products
ON
purchases_products.product_id = products.id
INNER JOIN users
ON users.id = purchases.buyer;

