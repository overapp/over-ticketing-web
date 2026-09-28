export type User = {
    id: string
    email: string
    firstName: string
    lastName: string
    initials: string | null
    avatarUrl: string | null
    roles: string[]
    emailConfirmed: boolean
    mustChangePassword: boolean
}
