import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import StoreIcon from '@mui/icons-material/Store';import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css'
import { Context } from '../Authentication/AuthContext';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearch, handleGetAllProductsAsync, handleSearch } from '../Store/studentSlice';

const NavBar = () => {
    const [inputText,setInputText] = useState("");

    const { handleLogOut } = useContext(Context);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state)=>{
        return state.cart.cart;
    });
    const allProducts = useSelector((state)=>{
        return state.students.products;
    })
    const pages = [
        { name: 'Home', link: '/' },
        { name: 'Courses', link: '/courses' },
        { name: 'Pricing', link: '/pricing' },
        { name: 'Blog', link: '/blog' },
        { name: 'Contact Us', link: '/contact-us' },
        { name: 'About Us', link: '/about-us' }
    ];

    const settings = [
        { name: 'Profile', link: '/profile' },
        { name: 'Account', link: '/account' },
        { name: 'Dashboard', link: '/dashboard' },
        {
            name: 'Logout',
            link: '/login',
            onClick: handleLogOut // Add onClick function for Logout
        },
    ];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCartNavigation = () => {
        navigate("/cart")
    };    
    const handleChange = (itemValue) =>{
        setInputText(itemValue);
        if(itemValue.trim() === ""){
            dispatch(clearSearch());
            dispatch(handleGetAllProductsAsync());
        }
    }
    console.log(allProducts)
    return (
        <div className='navbarContainer'>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <StoreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            ECOMMERCE
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link to={page.link} className='nav-item-toggle'>{page.name}</Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <StoreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            ECOMMERCE
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link to={page.link} className='nav-items'>{page.name}</Link>
                                </Button>
                            ))}
                        </Box>

                        {/* Search Bar */}
                        <div className='headerInputContainer'>
                            <input className='headerInput' type="text" placeholder='search items or products' onChange={(e)=>handleChange(e.target.value)}/>
                            <SearchOutlinedIcon className='search-icon' onClick={()=>dispatch(handleSearch(inputText))}/> {/** onClick={()=>dispatch(handleSearch(inputSearch))} */}
                        </div>

                        {/* Shopping Cart */}
                        <div className='shopping-cart' onClick={handleCartNavigation}>
                            <ShoppingCartOutlinedIcon/>
                            <span className='shopping-cart-span'>{cart.length}</span>
                        </div>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Naveen" src="./Images/Default.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={setting.onClick}>
                                            <Link to={setting.link} className='nav-item-toggle'>{setting.name}</Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default NavBar
