import { Box, Checkbox, FormControlLabel, List, ListItem, Typography } from '@mui/material'
import PropTypes from 'prop-types'

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
}

function FilterByService({ filters = {}, onChange }) {
  const handleChange = (e) => {
    if (!onChange) return
    const { name, checked } = e.target
    onChange({ [name]: checked })
  }

  return (
    <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>

      <List sx={{ p: 0, m: 0 }}>
        {[
          { value: 'isPromotion', label: 'Có khuyến mãi' },
          { value: 'isFreeShip', label: 'Miễn phí ship' },
        ].map((service) => (
          <ListItem sx={{ m: 0, mt: 1 }} key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default FilterByService
