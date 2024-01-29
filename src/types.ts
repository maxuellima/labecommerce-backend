export type TUser = {
    id: string | number,
    name: string,
    email: string,
    password: string | number,
    createdAt: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}

export type TPurchase = {
id: string,
buyer: string,
total_price: string,
created_at: string
}