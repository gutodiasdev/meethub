import { Flex, VStack } from "@chakra-ui/react";
import {
  RiAddLine,
  RiCalendarTodoLine,
  RiContactsLine,
  RiDashboardLine,
  RiTeamLine,
  RiVideoChatLine
} from "react-icons/ri";
import { CgProfile } from 'react-icons/cg';

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { WhoCanUse } from "../WhoCanUse";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupAPIClient } from "../../services/api";

export function SidebarNav() {
  return (
    <VStack
      w='100%'
      px='2'
      flex='1'
    >
      <Flex
        direction='column'
      >
        <NavSection
          title="GERAL"
        >
          <NavLink
            icon={RiDashboardLine}
            href="/app/meets"
          >
            Meets
          </NavLink>
          <WhoCanUse
            roles={['administrator']}
          >
            <NavLink
              icon={RiContactsLine}
              href="/app/usuarios"
            >
              Usuários
            </NavLink>
          </WhoCanUse>
          <NavLink
            icon={RiTeamLine}
            href="/app/mentores"
          >
            Mentores
          </NavLink>
        </NavSection>
        <NavSection
          title="MEETS"
        >
          <NavLink
            icon={RiAddLine}
            href="/app/meets/novo"
          >
            Adicionar novo
          </NavLink>
          <NavLink
            icon={RiVideoChatLine}
            href={`/app/meets/meus-meets/`}
          >
            Meus meets
          </NavLink>
        </NavSection>
        <NavSection
          title="PERFIL"
        >
          <NavLink
            icon={RiCalendarTodoLine}
            href="/app/mentores/minha-agenda"
          >
            Minha agenda
          </NavLink>
          <NavLink
            icon={CgProfile}
            href={`/app/meu-perfil/`}
          >
            Meu perfil
          </NavLink>
        </NavSection>
      </Flex>
    </VStack>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  return {
    props: {}
  }
})