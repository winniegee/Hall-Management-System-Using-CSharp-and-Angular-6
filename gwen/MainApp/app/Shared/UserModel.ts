export class User {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    roles: string;
    IsUser: boolean;
    IsHallOwner: boolean;
    token?: string;
    tokenExpiration: Date;

}