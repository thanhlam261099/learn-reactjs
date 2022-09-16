import { Box, List, ListItem, Typography } from '@mui/material'
import categoryApi from 'api/categoryApi'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
}

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const list = await categoryApi.getAll()
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        )
      } catch (error) {
        console.log('Failed to fetch category list', error)
      }
    })()
  }, [])

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id)
    }
  }

  return (
    <Box padding={2}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      <List>
        {categoryList.map((category) => (
          <ListItem
            sx={{ '&:hover': { color: '#3f51b5', cursor: 'pointer' } }}
            key={category.id}
            onClick={() => handleCategoryClick(category)}
          >
            <Typography variant="body2">{category.name}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default FilterByCategory
