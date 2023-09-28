interface NewUser {
    name: string,
    email: string,
    password: string
}
export default interface SignUp {
    newUser: NewUser
}