import { useQuery } from "react-query";
import { api } from "../../apiClient";

type Category = {
  id: string;
  name: string;
}

type GetCategoriesResponse = {
  categories: Category[];
}

export async function getCategories(): Promise<GetCategoriesResponse> {

  const { data } = await api.get('categories')

  const categories = data.map(category => {
    return {
      id: category.id,
      name: category.name,
    }
  })

  return categories
}

export function useCategories() {
  
  return useQuery('categories', getCategories , {
    staleTime: 1000 * 60 * 10,
  })

}