type User = {
  roles?: string[];
  permissions?: string[];
}

type ValidateUserPermissionsParams = {
  user: User;
  roles?: string[];
  permissions?: string[];
}

export function validateUserPermissions({ user, roles, permissions }: ValidateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission);
    })

    if (!hasAllPermissions) {
      return false;
    }
  }
  
  if (roles?.length > 0) {
    const hasAllRoles = roles.every(role => {
      return user.roles.includes(role);
    })

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}