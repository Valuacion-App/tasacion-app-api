import { z } from 'zod'

export const registerUbication = z.object({
  code: z.string({
    required_error: 'El campo código es requerido',
    invalid_type_error: 'El código de ubicación debe ser una cadena de texto'
  }),
  name: z.string({
    required_error: 'El campo nombre es requerido',
    invalid_type_error: 'El nombre de ubicación debe ser una cadena de texto'
  }),
  detail: z.string({
    invalid_type_error: 'El detalle de ubicación debe ser una cadena de texto'
  }).optional()
})
