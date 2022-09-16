import { AccountCircle, Close, ShoppingCart } from '@mui/icons-material'
import CodeIcon from '@mui/icons-material/Code'
import { Badge, Menu, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Login from 'features/Auth/components/Login'
import Register from 'features/Auth/components/Register'
import { logout } from 'features/Auth/userSlice'
import { cartItemCountSelector } from 'features/Cart/selectors'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
}))

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
}

export default function Header() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user.current)
  const cartItemCount = useSelector(cartItemCountSelector )
  const isLoggedIn = !!loggedInUser.id 
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(MODE.LOGIN)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogoutClick = () => {
    const action = logout()
    dispatch(action)
  }

  const handleCartClick= () => {
    history.push('/cart')
  }

  const classes = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <CodeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={classes.link} to="/">
              Shop
            </Link>
          </Typography>
          <NavLink className={classes.link} to="/todo">
            <Button color="inherit">TodoList</Button>
          </NavLink>

          <NavLink className={classes.link} to="/albums">
            <Button color="inherit">ALbum</Button>
          </NavLink>

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}

          <IconButton color="inherit">
            <Badge badgeContent={cartItemCount} color="secondary" onClick={handleCartClick}>
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        keepMount
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <IconButton sx={{ position: 'absolute', top: 1, right: 1 }} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here.
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Not have an account. Register here.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}
