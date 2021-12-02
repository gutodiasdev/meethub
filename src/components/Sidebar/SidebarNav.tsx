import { Stack, } from "@chakra-ui/react";
import { RiAddLine, RiCalendarTodoLine, RiContactsLine, RiDashboardLine, RiTeamLine, RiVideoChatLine } from "react-icons/ri";
import { CgProfile } from 'react-icons/cg';
import { WhoCanUse } from "../WhoCanUse";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack
      spacing="6"
    >
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/app/meets">Meets</NavLink>
        <NavLink icon={RiContactsLine} href="/app/usuarios">Usuários</NavLink>
        <NavLink icon={RiTeamLine} href="/app/mentores">Mentores</NavLink>
      </NavSection>
      <NavSection title="MEETS">
        <NavLink icon={RiAddLine} href="/app/meets/novo">Adicionar novo</NavLink>
        <NavLink icon={RiVideoChatLine} href="/app/meets/meus">Meus meets</NavLink>
      </NavSection>
      <NavSection title="PERFIL">
        <NavLink icon={RiCalendarTodoLine} href="/app/mentores/agenda">Minha agenda</NavLink>
        <NavLink icon={CgProfile} href="/app/usuarios/perfil">Meu perfil</NavLink>
      </NavSection>
    </Stack>
  );
}