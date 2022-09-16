import { Box, Container, Grid, Paper } from '@mui/material'
import { addToCard } from 'features/Cart/cartSlice'
import { useDispatch } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import AddToCardForm from '../components/Filters/AddToCardForm'
import ProductAdditional from '../components/ProductAdditional'
import ProductDescription from '../components/ProductDescription'
import ProductInfo from '../components/ProductInfo'
import ProductMenu from '../components/ProductMenu'
import ProductReviews from '../components/ProductReviews'
import ProductThumbnail from '../components/ProductThumbnail'
import useProductDetail from '../hooks/useProductDetail'

function DetailPage() {
  const {
    params: { productId },
    url,
  } = useRouteMatch()

  const { product } = useProductDetail(productId)
  const dispatch = useDispatch()

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCard({
      id: product.id,
      product,
      quantity,
    })
    dispatch(action)
  }

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item sx={{ width: '400px', p: 1.5, borderRight: '1px solid #e0e0e0' }}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item sx={{ flex: '1 1 0', p: 1.5 }}>
              <ProductInfo product={product} />
              <AddToCardForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${url}/additional`} component={ProductAdditional} />
          <Route path={`${url}/reviews`} component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  )
}

export default DetailPage
