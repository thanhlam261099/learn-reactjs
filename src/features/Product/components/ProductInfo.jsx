import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { formatPrice } from 'utils'

ProductInfo.propTypes = {
  product: PropTypes.object,
}

function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product
  return (
    <Box sx={{pb: 2, borderBottom:"1px solid #e0e0e0"}}>
      <Typography component="h2" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
        {shortDescription}
      </Typography>

      <Box sx={{ bgcolor: '#e3f2fd', p: 2 }}>
        <Box component="span" sx={{ mr: 3, fontSize: '30px', fontWeight: 'bold' }}>
          {formatPrice(salePrice)}
        </Box>

        <Box component="span" sx={{ mr: 2, textDecoration: 'line-through' }}>
          {formatPrice(originalPrice)}
        </Box>

        <Box component="span">{`-${promotionPercent}%`}</Box>
      </Box>
    </Box>
  )
}

export default ProductInfo
