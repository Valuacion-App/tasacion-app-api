import { z } from 'zod'

export const registerState = z.object({
  name: z.string({
    required_error: 'El campo nombre de estado es requerido',
    invalid_type_error: 'El nombre de estado debe ser una cadena de texto'
  }),
  k2: z.number({
    required_error: 'El campo k2 de estado es requerido',
    invalid_type_error: 'El valor de k2 debe ser un numero'
  })
})
