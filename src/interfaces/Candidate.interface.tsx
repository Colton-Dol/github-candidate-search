// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    id: number,
    avatar_url: string,
    name: string,
    username: string,
    location: string,
    email: string,
    company: string,
    bio: string
}

export default Candidate;