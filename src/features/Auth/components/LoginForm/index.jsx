import { yupResolver } from '@hookform/resolvers/yup'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, LinearProgress, Typography } from '@mui/material'
import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
}

function LoginForm(props) {
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email address'),

    password: yup.string().required('Please enter password'),
  })
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = async (values) => {
    const { onSubmit } = props
    if (onSubmit) {
      await onSubmit(values)
    }
  }

  const { isSubmitting } = form.formState

  return (
    <div>
      {isSubmitting && <LinearProgress sx={{ mb: 2 }} />}
      <Avatar sx={{ margin: '0 auto', bgcolor: 'primary.main' }}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography sx={{ textAlign: 'center' }} component="h3" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button
          sx={{ mt: 2 }}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign in
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
