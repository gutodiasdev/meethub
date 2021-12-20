import { useQuery } from "react-query";
import { api } from "../../apiClient";

type Category = {
  name: string;
}

type Meet = {
  id: string
  name: string
  price: string
  image: string
  mentor: {
    id: string,
  };
  categories: Category[];
}

type UpdateUserData = {
  meetId: string
  image?: string,
  name?: string,
  price?: string,
  categories?: Category[],
  meetDetails?: string,
}

export async function getMeets(): Promise<Meet[]> {
  const { data } = await api.get('/meets')
  const meets = data.map(meet => {
    return {
      id: meet.id,
      name: meet.name,
      price: meet.price,
      mentor: meet.members.map(member => {
        return {
          id: member.userId,
        }
      }),
      categories: meet.categories.map(category => {
        return {
          id: category.id,
          name: category.name,
        }
      }),
    }
  })
  return meets
}

export async function getSingleMeet(meetId: string): Promise<Meet> {
  const { data } = await api.get(`/meets/${meetId}`)
  const meet = {
    id: data.id,
    name: data.name,
    price: data.price,
    image: data.image,
    mentor: data.members.map(member => {
      return {
        id: member.userId,
      }
    }),
    categories: data.categories.map(category => {
      return {
        id: category.id,
        name: category.name,
      }
    }),
  }
  return meet
}

export async function updateMeet({
  meetId,
  image,
  name,
  price,
  categories,
  meetDetails,
}: UpdateUserData) {
  return await api.put('/meets', {
    meetId,
    image,
    name,
    price,
    categories,
    meetDetails,
  })
}

export function useSingleMeet(meetId: string) {
  return useQuery('singleMeet', () => getSingleMeet(meetId), {
    staleTime: 1000 * 60 * 15 // 15 minutes
  })
}

export function useMeets() {
  return useQuery('meets', getMeets, {
    staleTime: 1000 * 60 * 15 // 15 minutes
  })
}