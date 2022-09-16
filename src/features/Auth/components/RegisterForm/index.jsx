import { yupResolver } from '@hookform/resolvers/yup'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, LinearProgress, Typography } from '@mui/material'
import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
}

function RegisterForm(props) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name')
      .test('should has at least two words', 'Please enter at least two words', (value) => {
        return value.split(' ').length >= 2
      }),

    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email address'),

    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Please enter at least 6 characters'),

    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Password does not match'),
  })
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
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
    <div >
      {isSubmitting && <LinearProgress sx={{mb: 2}} />}
      <Avatar sx={{ margin: '0 auto', bgcolor: 'primary.main' }}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography sx={{ textAlign: 'center' }} component="h3" variant="h5">
        Create an account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button sx={{mt: 2}} disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
          Create an account
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
