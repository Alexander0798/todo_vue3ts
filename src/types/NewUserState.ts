interface NewUser {
    name: string,
    login: string,
    password: string
}
export default interface NewUserState {
    newUser: NewUser
}