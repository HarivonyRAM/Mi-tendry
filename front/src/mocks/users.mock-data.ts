interface MockUser {
    id: string
    email: string
    name?: string
    password: string
}

const mockUsers: MockUser[] = [
    {
        id: "1",
        email: "test@gmail.com",
        name: "Test",
        password: "test"
    }
]

export default mockUsers