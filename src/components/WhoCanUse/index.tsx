import { ReactNode } from "react";
import { useCan } from "../../services/hooks/users/useCan";

interface CanProps {
  children: ReactNode;
  roles?: string[];
}

export function WhoCanUse({ children, roles }: CanProps) {
  const userCanUseComponent = useCan({ roles });

  if (!userCanUseComponent) {
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}