import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react';
import { useContext } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { AuthContext } from '../../contexts/AuthContext';
import { useSidebarDrawer } from '../../contexts/SidebarContextDrawer';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { Search } from './Search';

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  const { user } = useContext(AuthContext)

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="32"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}
      {isWideVersion && <Logo />}

      {isWideVersion && <Search />}

      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} userEmail={user.email} />
      </Flex>
    </Flex>
  );
}