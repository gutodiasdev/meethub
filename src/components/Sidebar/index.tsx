import { Box, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex } from "@chakra-ui/react";
import { BsGear } from "react-icons/bs";
import { useSidebarDrawer } from "../../contexts/SidebarContextDrawer";
import { Logo } from "../Header/Logo";
import { Profile } from "../Header/Profile";
import { WhoCanUse } from "../WhoCanUse";
import { NavLink } from "./NavLink";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent >
            <DrawerCloseButton mt="8" />
            <DrawerHeader><Logo /></DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box
      as="aside"
      h="100%"
      position="fixed"
      pt="4"
      pl={6}
    >
      <Box as="a" href="/app" mb="4">
        <Logo />
      </Box>
      <SidebarNav />
      
      <Flex mt={48} direction="column">
        <WhoCanUse roles={['administrator']}>
          <NavLink icon={BsGear} href="/app/admin">Painel Administrativo</NavLink>
        </WhoCanUse>
      </Flex>
    </Box>
  );
}