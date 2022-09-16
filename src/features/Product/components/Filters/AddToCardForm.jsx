import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import QuantityField from 'components/form-controls/QuantityField'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
AddToCardForm.propTypes = {
  onSubmit: PropTypes.func,
}

function AddToCardForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Min is 1')
      .typeError('Please enter a number'),
  })
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values)
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button sx={{width: '200px'}} type="submit" variant="contained" color="primary" fullWidth size="large">
        Add to cart
      </Button>
    </form>
  )
}

export default AddToCardForm
