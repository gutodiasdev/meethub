import {
  useBreakpointValue,
  Drawer, DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  IconButton,
  Avatar
} from "@chakra-ui/react";
import { RiMenu2Line } from "react-icons/ri";
import NextLink from 'next/link';
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
    <Flex
      pos='sticky'
      bg='white'
      flexDir='column'
      h='95vh'
      marginTop='2.5vh'
      boxShadow='md'
      justifyContent='space-between'
      borderRadius='0  16px 16px 0 '
      as='nav'
    >
      <Flex
        alignItems='center'
        p='5'
      >
        <NextLink
          href='/app'
          passHref
        >
          <IconButton
            as='a'
            mr='4'
            aria-label='navigation'
            _hover={{ bg: 'none' }}
            bg='none'
            icon={<RiMenu2Line />}
          />
        </NextLink>
        <Logo />
      </Flex>
      <SidebarNav />
    </Flex >
  );
}
