import { useQuery } from "react-query"
import { api } from "../../apiClient"

type Category = {
  name: string;
}

interface UseMentorsProps {
  id: string;
  name: string;
  image?: string;
  position: string;
  categories: Category[];
}

export async function getMentors(): Promise<UseMentorsProps[]> {
  const response = await api.get('/mentors')

  const mentors = response.data.map(mentor => {
    return {
      id: mentor.id,
      name: mentor.name,
      position: mentor.position,
      categories: mentor.categories,
    }
  })

  return mentors
}

export function useMentors() {
  return useQuery('mentors', getMentors, { 
    staleTime: 1000*60*15,
  })
}