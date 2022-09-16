import { Box, Chip, List, ListItem } from '@mui/material'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Miễn phí ship',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters }
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip
      } else {
        newFilters.isFreeShip = true
      }

      return newFilters
    },
  },
  {
    id: 2,
    getLabel: () => 'Có khuyễn mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }
      delete newFilters.isPromotion
      return newFilters
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }
      delete newFilters.salePrice_gte
      delete newFilters.salePrice_lte
      return newFilters
    },
    onToggle: () => {},
  },
  // {
  //   id: 4,
  //   getLabel: (filters) => 'Danh mục',
  //   isActive: (filters) => true,
  //   isVisible: (filters) => true,
  //   isRemovable: true,
  //   onRemove: (filters) => {},
  //   onToggle: (filters) => {},
  // },
]

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
}

function FilterViewer({ filters = {}, onChange = null }) {
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])
  return (
    <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', m: (2, 0) }}>
      {visibleFilters.map((x) => (
      <List>
        <ListItem sx={{ p: 0.5 }} key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            size="small"
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return
                    const newFilters = x.onToggle(filters)
                    onChange(newFilters)
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return
                    const newFilters = x.onRemove(filters)
                    onChange(newFilters)
                  }
                : null
            }
          />
        </ListItem>
      </List>
      ))}
    </Box>
  )
}

export default FilterViewer
