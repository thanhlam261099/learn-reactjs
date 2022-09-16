import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
}

function FilterByPrice({ onChange }) {
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    if (onChange) onChange(values)

    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    })
  }

  return (
    <Box sx={{p: 2, borderTop: '1px solid #e0e0e0'}}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ:</Typography>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'nowrap',
          alignItems: 'center',
          mt: 1,
          mb: 1,
          '& > span': { ml: 1, mr: 1 },
        }}
      >
        <TextField variant="standard" name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
        <span>-</span>
        <TextField variant="standard" name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
      </Box>

      <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  )
}

export default FilterByPrice
