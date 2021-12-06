import { Box, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarContextDrawer";
import { Logo } from "../Header/Logo";
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
      px="10"
      pt="4"
    >
      <Box as="a" href="/app" mb="4">
        <Logo />
      </Box>
      <SidebarNav />
    </Box>
  );
}