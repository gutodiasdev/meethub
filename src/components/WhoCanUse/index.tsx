import { ReactNode } from "react";
import { useCan } from "../../services/hooks/users/useCan";

interface CanProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
}

export function WhoCanUse({ children, roles, permissions }: CanProps) {
  const userCanUseComponent = useCan({ roles, permissions });

  if (!userCanUseComponent) {
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}