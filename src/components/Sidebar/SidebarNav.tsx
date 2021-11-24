import { Stack, } from "@chakra-ui/react";
import { RiAddLine, RiContactsLine, RiDashboardLine, RiTeamLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
        <NavLink icon={RiTeamLine} href="/users/mentors">Mentores</NavLink>
      </NavSection>
      <NavSection title="MEETS">
        <NavLink icon={RiAddLine} href="/meets/create">Adicionar novo</NavLink>
      </NavSection>
    </Stack>
  );
}