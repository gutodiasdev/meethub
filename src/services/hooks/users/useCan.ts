import { useContext } from "react"
import { validateUserPermissions } from "../../../utils/validateUserPermissions";
import { AuthContext } from "../../../contexts/AuthContext"

type UseCanParams = {
  roles?: string[];
  permissions?: string[];
}

export function useCan({ roles, permissions }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    roles,
    permissions
  })

  return userHasValidPermissions;
}