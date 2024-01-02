import { z } from 'zod'

export const registerSubGroup = z.object({
  name: z.string({
    required_error: 'El campo nombre del sub-grupo es requerido',
    invalid_type_error: 'El nombre del sub-grupo debe ser una cadena de texto'
  })
})
