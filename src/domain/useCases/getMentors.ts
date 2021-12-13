export interface GetMentors {
  get: (mentors: Array<GetMentors.Params>) => Promise<void>
}

namespace GetMentors {
  export type Params = {
    id: string
    email: string
    telephone: string
    name: string
    image: string
    position: string
    biography: string
  }
}