import { useQuery } from "react-query";
import { api } from "../../apiClient";


type User = {
  id: string,
  name: string,
  email: string,
  telephone: string,
  password: string,
  role: string,
  position: string,
  biography: string,
  createdAt: string,
  updatedAt: string,
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      telephone: user.telephone,
      password: user.password,
      role: user.role,
      position: user.position,
      biography: user.biography,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      updatedAt: user.updatedAt,
    };
  });

  return {
    users,
    totalCount
  };

}

export function useUsers(page: number) {

  return useQuery(['users', page], () => getUsers(page), {

    staleTime: 1000 * 60 * 10,
  })
}