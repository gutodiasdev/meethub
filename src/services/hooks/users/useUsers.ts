import { useQuery } from "react-query";
import { api } from "../../api";

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

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('/users')

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

  return users;

}

export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5,
  });
}