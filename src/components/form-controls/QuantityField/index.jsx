import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, FormHelperText, IconButton, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
}

function QuantityField(props) {
  const { form, name, label, disabled } = props
  const { errors, setValue } = form
  const hasError = !!errors[name]

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <Box
            sx={{ display: 'flex', flexFlow: 'no wrap', alignItems: 'center', maxWidth: '200px' }}
          >
            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
              }
            >
              <RemoveCircleOutline />
            </IconButton>

            <OutlinedInput
              id={name}
              type="number"
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
              }
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />

      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  )
}

export default QuantityField
