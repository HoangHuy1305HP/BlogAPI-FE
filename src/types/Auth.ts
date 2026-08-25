// dữ liệu gửi đi khi gọi API Login
export type LoginPayload = {
    email:string,
    password:string
}

// dữ liệu gửi đi khi gọi API Register
export type RegisterPayload = {
    email:string,
    name:string,
    password:string
}

// dữ liệu nhận về khi login thành công
export type LoginResponse = {
    accessToken:string,
    refreshToken:string
}

// dữ liệu nhận về khi đăng ký thành công
export type RegisterResponse = {
    id:string,
    email:string,
    name:string,
    createdAt:string,
    updatedAt: string
}

// dữ liệu sau khi giải mã accessToken
export type DecodedToken = {
    userId: string,
    name: string,
    email:string,
    iat?:number, // bổ sung để k bị lỗi
    exp?:number, // bổ sung để k bị lỗi type
}