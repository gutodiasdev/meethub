type User = {
  roles: string[];
}

type ValidateUserPermissionsParams = {
  user: User;
  roles?: string[];
}

export function validateUserPermissions({ user, roles }: ValidateUserPermissionsParams) {
  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => {
      return user.roles.includes(role);
    })

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}