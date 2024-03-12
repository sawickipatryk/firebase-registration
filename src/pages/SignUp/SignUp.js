import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { useForm, FormProvider } from 'react-hook-form'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../firebase'

import SignUpForm from '../../components/SignUpForm'

export const SignUp = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()

  const methods = useForm()
  const { handleSubmit } = methods

  const onClickLogin = React.useCallback(() => navigate('/login'), [navigate])

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        console.log('Created Account Sucessfully. You are logged In!')
      }).catch((error) => {
        console.log(error)
      })
  }

  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
      {...otherProps}
    >
      <FormProvider
        {...methods}
      >
        <SignUpForm
          onSubmit= {handleSubmit((data) => signUp(data.email, data.password))}
          onClickLogin={onClickLogin}
        />
      </FormProvider>
    </Box>
  )
}

SignUp.propTypes = {
  sx: PropTypes.object
}

export default SignUp
