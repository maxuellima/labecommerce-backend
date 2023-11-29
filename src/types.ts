export type TUser = {
    id: string | number,
    name: string,
    email: string,
    password: string | number,
    createdAt: string
}

export type TProduct = {
    id: string | number,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}