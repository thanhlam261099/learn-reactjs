import { Box } from '@mui/material'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import DetailPages from './pages/DetailPage'
import ListPage from './pages/ListPage'


ProductFeature.propTypes = {}

function ProductFeature(props) {
const match = useRouteMatch()

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailPages} />
      </Switch>
    </Box>
  )
}

export default ProductFeature
