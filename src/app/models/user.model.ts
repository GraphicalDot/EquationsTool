

export interface LoginData{
        username: string,
        password: string

}

export interface UserModel{
    username: string,
    first_name: string,
    last_name: string,
    user_email: string,
    user_id: string,
    phone_number: string,
    user_type: string,
    token?: string
}