import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Input from '../../components/common/Input.jsx'
import Button from '../../components/common/Button.jsx'
import { login } from '../../api/authApi.js'
import { useAuth } from '../../context/AuthContext.jsx'

function Login() {
  const navigate = useNavigate()
  const { loginUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      const data = await login(formData)
      loginUser(data.user, data.token)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid email or password'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Log in</h2>
      <p className="mt-1.5 text-sm text-graystone-500">
        Welcome back. Enter your details to continue.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        <Button type="submit" fullWidth isLoading={isSubmitting} className="mt-2">
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-graystone-500">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-primary-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default Login
