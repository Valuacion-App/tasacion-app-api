/* eslint-disable no-undef */
import app from '../src/app.js'
import mongoose from 'mongoose'
import request from 'supertest'
import Article from '../src/models/mongo/article.model.js'
import { connectDB } from '../src/config/mongo.js'

describe('Test for CRUD from type of Articles', () => {
  beforeAll(async () => {
    await connectDB()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET /api/v1/articles', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/v1/articles').send()
    })

    test('should respond with a 200 status and json format', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should respond with an array', () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST /api/v1/articles', () => {
    const newArticle = { code: 'code test', name: 'name test', detail: 'detail test' }
    const wrongArticle = { codigo: 'codigo test', nombre: 'name test' }

    afterAll(async () => {
      await Article.deleteMany({ code: 'code test' })
    })

    test('should respond with a 201 status code and json format', async () => {
      const response = await request(app).post('/api/v1/articles').send(newArticle)

      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should respond with a new article created where the code and name returned is equal to the data sent', async () => {
      const response = await request(app).post('/api/v1/articles').send(newArticle)

      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.code).toBe(newArticle.code)
      expect(response.body.data.name).toBe(newArticle.name)
    })

    test('should respond with a error when try to insert a wrong data', async () => {
      const response = await request(app).post('/api/v1/articles').send(wrongArticle)

      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
    })
  })

  describe('GET /api/v1/articles/:id', () => {
    let article
    let response
    let idNotFound

    beforeAll(async () => {
      article = await Article.create({ code: 'code test', name: 'name test' })
      response = await request(app).get(`/api/v1/articles/${article._id}`).send()
      idNotFound = new mongoose.Types.ObjectId()
    })

    afterAll(async () => {
      await Article.findByIdAndDelete(article._id)
    })

    test('should respond with a 200 status code and json format', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should respond with article object when _id, code and name are the same', () => {
      expect(response.body._id).toBeDefined()
      expect(response.body._id).toBe(article._id.toString())
      expect(response.body.code).toBe(article.code)
      expect(response.body.name).toBe(article.name)
    })

    test('should respond whit a 404 not found response and a message', async () => {
      const responseNotFound = await request(app).get(`/api/v1/articles/${idNotFound}`).send()

      expect(responseNotFound.status).toBe(404)
      expect(responseNotFound.body.error).toBeDefined()
      expect(responseNotFound.body.error).toBe('Artículo no encontrado')
    })
  })

  describe('PUT /api/v1/articles/:id', () => {
    let articule
    let response
    let idNotFound

    beforeAll(async () => {
      articule = await Article.create({ code: 'code test', name: 'name test' })
      response = await request(app).put(`/api/v1/articles/${articule._id}`).send({ detail: 'test detail' })
      idNotFound = new mongoose.Types.ObjectId()
    })

    afterAll(async () => {
      await Article.findByIdAndDelete(articule._id)
    })

    test('should respond with a 200 status code and json format', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should respond with the object updated with the new value in detail field', () => {
      expect(response.body.data._id).toBeDefined()
      expect(response.body.data.detail).toBe('test detail')
    })

    test('should update the data successfully with a confirm message', async () => {
      expect(response.body.message).toBeDefined()
      expect(response.body.message).toBe('Artículo actualizado correctamente')
    })

    test('should respond with a 404 not found response and a message', async () => {
      const responseNotFound = await request(app).put(`/api/v1/articles/${idNotFound}`).send({
        name: 'test name updated'
      })

      expect(responseNotFound.status).toBe(404)
      expect(responseNotFound.body.error).toBeDefined()
      expect(responseNotFound.body.error).toBe('Artículo no encontrado')
    })
  })

  describe('DELETE /api/v1/articles/:id', () => {
    let article
    let response
    let idNotFound

    beforeEach(async () => {
      article = await Article.create({ code: 'test code', name: 'test name' })
      response = await request(app).delete(`/api/v1/articles/${article._id}`).send()
      idNotFound = new mongoose.Types.ObjectId()
    })

    test('should respond with a 200 status code and json format', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should delete a article successfully', async () => {
      expect(response.body.message).toBe('Artículo eliminado correctamente')

      const foundArticle = await Article.findById(article._id)
      expect(foundArticle).toBeNull()
    })

    test('should respond with a 404 not found response and a message', async () => {
      const responseNotFound = await request(app).delete(`/api/v1/articles/${idNotFound}`).send()

      expect(responseNotFound.status).toBe(404)
      expect(responseNotFound.body.error).toBeDefined()
      expect(responseNotFound.body.error).toBe('Artículo no encontrado')
    })
  })
})
