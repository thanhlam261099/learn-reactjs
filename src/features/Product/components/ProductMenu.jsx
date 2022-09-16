import { Box, Link } from '@mui/material'
import { NavLink, useRouteMatch } from 'react-router-dom'

ProductMenu.propTypes = {}

function ProductMenu(props) {
  const { url } = useRouteMatch()

  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        flexFlow: 'no wrap',
        justifyContent: 'center',
        alignItems: 'center',
        listStyleType: 'none',     
        p: 0,
        '& > li': {
          padding: 4,     
        },
        '& > li > a': { color: '#616161',textDecoration:'none',},
        '& > li > a.active': { color: 'primary.main', textDecoration: 'underline'},
      }}
    >

      <li>
        <Link component={NavLink} to={url} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  )
}

export default ProductMenu
