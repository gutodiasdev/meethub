import { useQuery } from "react-query";
import { api } from "../../apiClient";

type Category = {
  name: string;
}

type Meet = {
  id: string
  name: string
  price: string
  mentor: {
    id: string,
  };
  categories: Category[];
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
export function useMeets() {
  return useQuery('meets', getMeets, {
    staleTime: 1000 * 60 * 15 // 15 minutes
  })
}