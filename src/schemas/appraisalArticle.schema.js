import { z } from 'zod'
import mongoose from 'mongoose'

export const registerAppraisalArticle = z.object({
  appraisalCode: z.string({
    required_error: 'El campo código de tasación es requerido',
    invalid_type_error: 'El código de tasación es debe ser una cadena de texto'
  }),
  code: z
    .string({
      invalid_type_error: 'El código debe ser una cadena de texto'
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
        'La referencia de una ubicación/ambiente debe ser una cadena de texto'
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
      invalid_type_error: 'La descripción debe ser una cadena de texto'
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
        'El campo URL de la imagen 1 debe ser una cadena de texto'
    })
    .url({
      message: 'El campo URL de la imagen 1 no corresponde a un formato URL'
    })
    .optional(),
  urlImage2: z
    .string({
      invalid_type_error:
        'El campo URL de la imagen 2 debe ser una cadena de texto'
    })
    .url({
      message: 'El campo URL de la imagen 2 no corresponde a un formato URL'
    })
    .optional(),
  isChecked: z
    .boolean({
      invalid_type_error: 'El campo de revisado debe ser un valor booleano'
    })
    .optional(),
  K1a: z
    .number({
      invalid_type_error: 'El valor de K1a debe ser un numero'
    })
    .optional(),
  Va: z
    .number({
      invalid_type_error: 'El valor de Va debe ser un numero'
    })
    .optional(),
  replacementValue: z
    .number({
      invalid_type_error: 'El valor de valor de reposición debe ser un numero'
    })
    .optional(),
  isPC: z
    .boolean({
      invalid_type_error: 'El valor de isPC debe ser un valor booleano'
    })
    .optional(),
  useFormule: z
    .boolean({
      invalid_type_error: 'El valor de isFormule debe ser un valor booleano'
    })
    .optional()
})
