import mongoose from 'mongoose'
import State from './state.model.js'
import Ubication from './ubication.model.js'
import SubGroup from './subgroup.model.js'
import Article from './article.model.js'
const { Schema } = mongoose

const appaisalArticleSchema = new Schema(
  {
    appraisalCode: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    code: {
      type: String,
      trim: true
    },
    bullet: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now()
    },
    ubication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ubication',
      validate: {
        validator: async function (value) {
          const ubicationFound = await Ubication.findById(value)
          return Boolean(ubicationFound)
        },
        message: 'La propiedad ubicacion debe ser un ID válido'
      }
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      validate: {
        validator: async function (value) {
          const articleFound = await Article.findById(value)
          return Boolean(articleFound)
        },
        message: 'La propiedad articulo debe ser un ID válido'
      }
    },
    subGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubGroup',
      validate: {
        validator: async function (value) {
          const subGroupFound = await SubGroup.findById(value)
          return Boolean(subGroupFound)
        },
        message: 'La propiedad sub-grupo debe ser un ID válido'
      }
    },
    detail: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    vre: {
      type: Number
    },
    vr: {
      type: Number
    },
    ant: {
      type: Number
    },
    vexp: {
      type: Number
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      validate: {
        validator: async function (value) {
          const stateFound = await State.findById(value)
          return Boolean(stateFound)
        },
        message: 'La propiedad estado debe ser un ID válido'
      }
    },
    urlImage1: {
      type: String,
      trim: true
    },
    urlImage2: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('AppaisalArticle', appaisalArticleSchema)
