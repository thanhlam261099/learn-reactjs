import { Box, Grid } from '@mui/material'
import PropTypes from 'prop-types'
import Skeleton from '@mui/material/Skeleton'

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
}

ProductSkeletonList.defaultProps = {
  length: 6,
}

function ProductSkeletonList({ length }) {
  return (
    <div>
      <Box>
        <Grid container>
          {Array.from(new Array(length)).map((x, index) => (
            <Grid item key={index} sx={12} sm={6} md={4} lg={3}>
              <Box padding={1}>
                <Skeleton variant="rectangular" width="100%" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default ProductSkeletonList
