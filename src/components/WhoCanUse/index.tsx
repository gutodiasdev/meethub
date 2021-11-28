import { ReactNode } from "react";
import { useCan } from "../../services/hooks/users/useCan";

interface CanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function WhoCanUse({ children, permissions, roles }: CanProps) {
  const userCanUseComponent = useCan({ permissions, roles });

  if (!userCanUseComponent) {
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}