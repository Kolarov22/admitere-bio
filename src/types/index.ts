
export interface Course {
    id: number,
    title: string, 
    description: string,
    price: number,
    image?: string,
    createdAt?: string,
    users: [
      {
        userId: string,
        courseId: number
      }
    ]
}