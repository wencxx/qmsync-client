export type UserRole = 'Faculty' | 'Admin' | 'Owner' | 'Controller' | 'Head';

export interface UserData {
    _id: string
    firstName: string
    middleName: string
    lastName: string
    suffix: string
    email: string
    number: string,
    username: string,
    idNumber: string,
    department: string,
    position: string
    password: string,
    role: UserRole
    createdAt: Date
    token: string
    __v: number
}