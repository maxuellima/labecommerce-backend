# labecommerce-backend

## Api-Labecommerce
Essa API gerencia usuários e produtos.

### GET - getAllUsers
http://localhost:3003/users
Com essa requisição você obterá todos os usuários cadastrados.

Você pode também no query params através da key 'name' buscar o nome do usuário que pretende encontrar. Não precisa colocar o nome completo, conseguimos fazer a busca com trechos do nome.

### GET - getAllProducts
http://localhost:3003/products?=
Com essa requisição você obterá todos os produtos cadastrados.

Você pode também no query params através da key 'name' buscar o nome do produto que pretende encontrar. Não precisa colocar o nome do produto completo, conseguimos fazer a busca com trechos do nome.

### POST - createUser
http://localhost:3003/users
Com esse método você pode criar novos usuários.

Todos os campos precisam ser preenchidos: id, name, email, password.

Body raw (json)
{
        "id": "u003",
        "name": "ciclano",
        "email": "ciclano@gmail.com",
        "password": "ciclano123"
}

### POST - createProduct
http://localhost:3003/products
Com esse método você pode criar novos produtos.

Todos os campos precisam ser preenchidos: id, name, price, description, imageUrl.

Body raw (json)
{
        "id": "prod006",
        "name": "Planner de Hobbit",
        "price": 23.9,
        "description": "PAra planejar e viver a vida sossegado",
        "image_url": "https://m.media-amazon.com/planner/I/514anK-vl5L._AC_SY1000_.jpg"
}

### DELETE - deleteUser
http://localhost:3003/users/:id
Com esse método você poderá deletar o usuário. Para isso se faz importante passar o 'id' correto do seu usuário.

PATH VARIABLES
id  u002

### DELETE - deleteProduct
http://localhost:3003/products/:id
Com esse método você deletará os produtos. Isso será feito através da id do produto.

PATH VARIABLES
id prod002

### PUT - editProduct
http://localhost:3003/products/:id
Com esse método você fará a edição dos produtos já existentes. Você pode alterar todos os campos, ou alterar somente um dos campos, como no exemplo abaixo.

PATH VARIABLES
id  prod001

Body raw (json)
json
{
        "name": "Enxada para batatas",
        "price": 430,
        "description": "Essa enxada não machuca a batata",
        "image_url": "http://Kabum.com/máquina-fotográfica"
}

### PUT - editUser
http://localhost:3003/users/:id

PATH VARIABLES
id - u002

Body raw (json)
json
{
    "name": "Alinio"
}

### GET - all purchases
http://localhost:3003/purchases/:id
PATH VARIABLES
id pur004

### POST - purchases
http://localhost:3003/purchases

### DELETE - purchase by id
http://localhost:3003/purchases/:id