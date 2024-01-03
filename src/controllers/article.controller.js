import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'
import Article from '../models/mongo/article.model.js'

export const getArticles = async (req, res) => {
  try {
    const allArticles = await Article.find()
    res.status(200).json(allArticles)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const getArticle = async (req, res) => {
  try {
    const idArticle = req.params.id
    const article = await Article.findById(idArticle)

    if (!article) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Artículo no encontrado'
      })
    }

    res.status(200).json(article)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const createArticle = async (req, res) => {
  try {
    const input = req.body
    const newArticle = new Article(input)
    const articleSaved = await newArticle.save()

    res.status(201).json({
      message: 'Artículo creado correctamente',
      data: {
        id: articleSaved._id,
        code: articleSaved.code,
        name: articleSaved.name
      }
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const updateArticle = async (req, res) => {
  try {
    const idArticle = req.params.id
    const newValues = req.body
    const updatedArticle = await Article.findByIdAndUpdate(
      idArticle,
      newValues,
      { new: true }
    )

    if (!updatedArticle) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Artículo no encontrado'
      })
    }
    res.status(200).send({
      message: 'Artículo actualizado correctamente',
      data: updatedArticle
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteArticle = async (req, res) => {
  try {
    const idArticle = req.params.id
    const article = await Article.findByIdAndDelete(idArticle)

    if (!article) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Artículo no encontrado'
      })
    }
    res.status(200).json({
      message: 'Artículo eliminado correctamente'
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
