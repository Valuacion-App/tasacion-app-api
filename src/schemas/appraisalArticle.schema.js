import { z } from 'zod'
import mongoose from 'mongoose'

export const registerAppraisalArticle = z.object({
  appraisalCode: z.string({
    required_error: 'El campo codigo de tasacion es requerido',
    invalid_type_error: 'El codigo de tasacion es debe ser una cadena de texto'
  }),
  code: z
    .string({
      invalid_type_error: 'El codigo debe ser una cadena de texto'
    })
    .optional(),
  bullet: z
    .string({
      invalid_type_error: 'La viñeta debe ser una cadena de texto'
    })
    .optional(),
  date: z.coerce
    .date({
      invalid_type_error: 'La fecha debe ser un formato de MM/dd/yy'
    })
    .optional(),
  ubication: z
    .string({
      invalid_type_error:
        'La referencia de una ubicacion/ambiente debe ser una cadena de texto'
    })
    .refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val)
      },
      {
        message: 'Invalido ID de referencia de MongoDB'
      }
    )
    .optional(),
  article: z
    .string({
      invalid_type_error:
        'La referencia de un grupo de articulo debe ser una cadena de texto'
    })
    .refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val)
      },
      {
        message: 'Invalido ID de referencia de MongoDB'
      }
    )
    .optional(),
  subGroup: z
    .string({
      invalid_type_error:
        'La referencia de un sub-grupo debe ser una cadena de texto'
    })
    .refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val)
      },
      {
        message: 'Invalido ID de referencia de MongoDB'
      }
    )
    .optional(),
  detail: z
    .string({
      invalid_type_error: 'El detalle debe ser una cadena de texto'
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'La descripcion debe ser una cadena de texto'
    })
    .optional(),
  vre: z
    .number({
      invalid_type_error: 'El valor de vre debe ser un numero'
    })
    .optional(),
  vr: z
    .number({
      invalid_type_error: 'El valor de vr debe ser un numero'
    })
    .optional(),
  ant: z
    .number({
      invalid_type_error: 'El valor de ant debe ser un numero'
    })
    .optional(),
  vexp: z
    .number({
      invalid_type_error: 'El valor de vexp debe ser un numero'
    })
    .optional(),
  state: z
    .string({
      invalid_type_error:
        'La referencia de un estado debe ser una cadena de texto'
    })
    .refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val)
      },
      {
        message: 'Invalido ID de referencia de MongoDB'
      }
    )
    .optional(),
  urlImage1: z
    .string({
      invalid_type_error:
        'El campo url de la imagen 1 debe ser una cadena de texto'
    })
    .url({
      message: 'El campo url de la imagen 1 no correponde a un formato URL'
    })
    .optional(),
  urlImage2: z
    .string({
      invalid_type_error:
        'El campo url de la imagen 2 debe ser una cadena de texto'
    })
    .url({
      message: 'El campo url de la imagen 2 no correponde a un formato URL'
    })
    .optional()
})
