import { z } from 'zod'

export const registerUserSchema = z.object({
  username: z.string({
    required_error: 'El nombre de usuario es requerido',
    invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
  }),
  email: z.string({
    required_error: 'El email es requerido',
    invalid_type_error: 'El email debe ser una cadena de texto'
  }).email({
    message: 'El email es invalido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida',
    invalid_type_error: 'La contraseña debe ser una cadena de texto'
  }).min(6, {
    message: 'La contraseña debe tener minimo 6 caracteres'
  })
})

export const loginSchema = z.object({
  email: z.string({
    required_error: 'El email es requerido',
    invalid_type_error: 'El email debe ser una cadena de texto'
  }).email({
    message: 'El email es invalido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida',
    invalid_type_error: 'La contraseña debe ser una cadena de texto'
  }).min(6, {
    message: 'La contraseña debe tener minimo 6 caracteres'
  })
})
