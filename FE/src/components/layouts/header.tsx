import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@radix-ui/react-navigation-menu';
import { Menu, MenuItem } from '@mui/material';
import viteLogo from '/vite.svg'
import useFetchAll from '../hooks/useFetchAll';
import SearchInput from '../ui/SearchInput';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { IUser } from '../../types/user';
import { useTheme } from '@mui/material/styles';
const Header = () => {
  const muiTheme = useTheme();
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {data: manga, isLoading, isError, error} = useFetchAll('/stories');
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // localStorage.removeItem('user');
    // setUser(null);
    // handleMenuClose();
    // navigate('/login');
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 shadow-md px-[100px] z-40"
    style={{
        backgroundColor: muiTheme.palette.background.paper,
        color: muiTheme.palette.text.primary,
      }}>
      <div className="flex items-center space-x-4">
        <img src={viteLogo} alt="Logo" className="h-8" />
        <NavigationMenu className="list-none flex gap-5">    
          <NavigationMenuItem>
            <NavigationMenuLink className="text-gray-700 hover:text-black font-bold mx-2" href="#">
              Originals
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="text-gray-700 hover:text-black font-bold mx-2" href="#">
              Trending
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="text-gray-700 hover:text-black font-bold mx-2" href="#">
              Discover
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="text-gray-700 hover:text-black font-bold mx-2" href="#">
              Contest
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
      <div className='w-1/2 '>
        <SearchInput data={manga} />
      </div>
      
      <div className="flex items-center space-x-4">
      {user ? (
          <>
            <Avatar
              alt="User Avatar"
              src={user.avatar}
              sx={{ width: 50, height: 50, cursor: 'pointer' }}
              onClick={handleMenuOpen}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                Hồ sơ cá nhân
              </MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <button className="px-4 py-2 bg-black text-white rounded">Publish</button>
            <button
              className="px-4 py-2 border border-black rounded"
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
          </>
        )}
    </div>
    </header>
  );
};

export default Header;
