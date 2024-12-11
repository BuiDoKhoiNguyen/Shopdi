import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '@/routes/AuthProvider';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { GET } from '../../../api/GET';

export default function AccountMenu() {
    const useauth = useAuth();
    // console.log("useauth :",useauth);
    // console.log(useauth.user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        // console.log("logout");
        useauth.logOut();
    }
    const navigate = useNavigate();
    const [avatar, setAvatar] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    React.useEffect(() => {
        GET(`users/my-info`).then((data) => {
            setAvatar(data.result.profileImage)
            setUsername(data.result.username)
        })
    })

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={useauth.user}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar src={avatar} sx={{ width: 40, height: 40 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 25,
                                height: 25,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to={"/profile"}>
                        <ListItemIcon>
                            <Avatar /> {username}
                        </ListItemIcon>

                    </Link>
                </MenuItem>

                <Divider />
                <MenuItem onClick={handleClose}>
                        <div onClick={() => navigate('/orderhistory')}>
                            <LocalMallIcon className={`mb-1`} fontSize="small"/>
                            <span className={`ml-1`}> My Order </span>
                        </div>
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                    <Logout fontSize="small" />
                   <span className={`ml-2`}> Logout </span>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}