import { Box, Container, Grid, Pagination, Paper } from '@mui/material'
import productApi from 'api/productApi'
import queryString from 'query-string'
import { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import FilterViewer from '../components/Filters/FilterViewer'
import ProductFilters from '../components/ProductFilters'
import ProductList from '../components/ProductList'
import ProductSkeletonList from '../components/ProductSkeletonList'
import ProductSort from '../components/ProductSort'

ListPage.propTypes = {}

function ListPage(props) {
  const history = useHistory()
  const location = useLocation()
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    }
  }, [location.search])

  const [productList, setProductList] = useState([])
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  })
  const [loading, setLoading] = useState(true)
  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 12,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }))

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   })
  // }, [history, filters])

  useEffect(() => {
    ;(async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams)
        setProductList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch product list', error)
      }

      setLoading(false)
    })()
  }, [queryParams])

  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }))

    const filters = {
      ...queryParams,
      _page: page,
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }))

    const filters = {
      ...queryParams,
      _sort: newSortValue,
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const setNewFilter = (newFilters) => {
    // setFilters(newFilters)
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    })
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item sx={{ width: '250px' }}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item sx={{ flex: '1 1 0' }}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilter}></FilterViewer>
              {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productList} />}
              <Box sx={{display:"flex", flexFlow:"no wrap", justifyContent:"center", mt:"40px", pb:"30px"}}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ListPage
