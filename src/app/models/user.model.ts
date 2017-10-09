

export interface LoginData{
        username: string,
        password: string

}

export interface UserModel{
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    user_id: string,
    phone_number: string,
    user_type: string,
    token?: string
    password: string,
    create_domain?: boolean,
    create_variable?: boolean,
    create_template?: boolean,
   create_variabletemplate?: boolean
}