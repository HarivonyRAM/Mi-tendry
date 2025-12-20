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
    },
    {
        id: "2",
        email: "music@gmail.com",
        name: "music",
        password: "music"
    }
]

export default mockUsers