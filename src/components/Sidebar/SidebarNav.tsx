import { Stack, } from "@chakra-ui/react";
import { RiAddLine, RiContactsLine, RiDashboardLine, RiTeamLine } from "react-icons/ri";
import { WhoCanUse } from "../WhoCanUse";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack
      spacing="6"
    >
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/app">Dashboard</NavLink>
        <WhoCanUse roles={['administrator']}>
          <NavLink icon={RiContactsLine} href="/app/users">Usuários</NavLink>
        </WhoCanUse>
        <NavLink icon={RiTeamLine} href="/app/mentors">Mentores</NavLink>
      </NavSection>
      <NavSection title="MEETS">
        <NavLink icon={RiAddLine} href="/app/meets/create">Adicionar novo</NavLink>
      </NavSection>
    </Stack>
  );
}