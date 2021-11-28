import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { AuthContext } from '../../contexts/AuthContext';
import { useSidebarDrawer } from '../../contexts/SidebarContextDrawer';
import { api } from '../../services/apiClient';
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

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }, [])

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="16"
      px="6"
      align="center"
      borderBottom="1px"
      borderColor="gray.100"
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

      {/* {isWideVersion && <Search />} */}

      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} userEmail={user?.email} />
      </Flex>
    </Flex>
  );
}