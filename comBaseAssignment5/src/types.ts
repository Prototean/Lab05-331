export interface Event{
    id: number | null
    category: string
    title: string
    description: string
    location:string
    date:string
    time:string
    petsAllowed: boolean
    organizer: Organizer
}

export interface Organizer{
    id: number | null
    name: string
}

export interface Student {
    id: number
    name: string
    surname: string
    StudentId: number
    image: string
    gpa: number
    description: string
    penAmount: number
}

export interface MessageState {
    message: string
}

export interface EventState {
    event: Event | null
}

export interface OrganizerState {
    organizer: Organizer | null
}