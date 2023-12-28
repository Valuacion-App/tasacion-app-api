import { z } from 'zod'

export const registerUbication = z.object({
  code: z.string({
    required_error: 'El campo codigo es requerido',
    invalid_type_error: 'El codigo de ubicacion debe ser una cadena de texto'
  }),
  name: z.string({
    required_error: 'El campo nombre es requerido',
    invalid_type_error: 'El nombre de ubicacion debe ser una cadena de texto'
  }),
  detail: z.string({
    invalid_type_error: 'El detalle de ubicacion debe ser una cadena de texto'
  }).optional()
})
