/* eslint-disable no-undef */
import app from '../src/app'
import request from 'supertest'
import { connectDB } from '../src/config/mongo.js'
import mongoose from 'mongoose'
import SubGroup from '../src/models/mongo/subgroup.model.js'

describe('Test for CRUD from SubGroup', () => {
  beforeAll(async () => {
    await connectDB()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('GET /api/v1/sub-groups', () => {
    let response
    beforeEach(async () => {
      response = await request(app).get('/api/v1/sub-groups').send()
    })

    test('should respond with a 200 status code and json format', async () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should respond with an array', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('POST /api/v1/sub-groups', () => {
    const newSubGroup = { name: 'Test SubGroup' }
    const wrongSubGroup = { nombre: 'Test SubGroup' }

    afterAll(async () => {
      await SubGroup.deleteMany({ name: 'Test SubGroup' })
    })

    test('should respond with a 201 status code and json format', async () => {
      const response = await request(app).post('/api/v1/sub-groups').send(newSubGroup)

      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should respond with a new sub-group created where the name returned is equal to the data sent', async () => {
      const response = await request(app).post('/api/v1/sub-groups').send(newSubGroup)

      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.name).toBe(newSubGroup.name)
    })

    test('should respond with a error when try to insert a wrong data', async () => {
      const response = await request(app).post('/api/v1/sub-groups').send(wrongSubGroup)

      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
    })
  })

  describe('GET /api/v1/sub-groups/:id', () => {
    let subgroup
    let response
    let idNotFound
    beforeEach(async () => {
      subgroup = await SubGroup.create({ name: 'test subgroup' })
      response = await request(app).get(`/api/v1/sub-groups/${subgroup._id}`).send()
      idNotFound = new mongoose.Types.ObjectId()
    })
    afterEach(async () => {
      await SubGroup.findByIdAndDelete(subgroup._id)
    })

    test('should respond with a 200 status code and json format', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should respond with sub-group object when _id and name are the same', () => {
      expect(response.body._id).toBeDefined()
      expect(response.body.name).toBe(subgroup.name)
    })

    test('should respond with a 404 not found response and a message', async () => {
      const responseNotFound = await request(app).get(`/api/v1/sub-groups/${idNotFound}`).send()

      expect(responseNotFound.status).toBe(404)
      expect(responseNotFound.body.error).toBeDefined()
      expect(responseNotFound.body.error).toBe('Sub-grupo no encontrado')
    })
  })

  describe('PUT /api/v1/sub-groups/:id', () => {
    let subgroup
    let idNotFound
    beforeEach(async () => {
      subgroup = await SubGroup.create({ name: 'test subgroup' })
      idNotFound = new mongoose.Types.ObjectId()
    })
    afterEach(async () => {
      await SubGroup.findByIdAndDelete(subgroup._id)
    })

    test('should respond with a 200 status code and json format', async () => {
      const response = await request(app).put(`/api/v1/sub-groups/${subgroup._id}`).send({
        name: 'test subgroup updated'
      })

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should update the data successfully', async () => {
      const response = await request(app).put(`/api/v1/sub-groups/${subgroup._id}`).send({
        name: 'test subgroup updated'
      })

      expect(response.body.data._id).toBeDefined()
      expect(response.body.data.name).toBe('test subgroup updated')
    })

    test('should update the data successfully with a confirm message', async () => {
      const response = await request(app).put(`/api/v1/sub-groups/${subgroup._id}`).send({
        name: 'test subgroup updated'
      })

      expect(response.body.message).toBe('Sub-grupo actualizado correctamente')
    })

    test('should respond with a 404 not found response and a message', async () => {
      const responseNotFound = await request(app).put(`/api/v1/sub-groups/${idNotFound}`).send({
        name: 'test subgroup updated'
      })

      expect(responseNotFound.status).toBe(404)
      expect(responseNotFound.body.error).toBeDefined()
      expect(responseNotFound.body.error).toBe('Sub-grupo no encontrado')
    })
  })

  describe('DELETE /api/v1/sub-groups/:id', () => {
    let subgroup
    let response
    let idNotFound
    beforeEach(async () => {
      subgroup = await SubGroup.create({ name: 'Test Sub-Group' })
      response = await request(app).delete(`/api/v1/sub-groups/${subgroup._id}`).send()
      idNotFound = new mongoose.Types.ObjectId()
    })

    test('should respond with a 200 status code and json format', () => {
      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toContain('json')
    })

    test('should delete a sub-group successfully', async () => {
      expect(response.body.message).toBe('Sub-grupo eliminado correctamente')

      const foundSubGroup = await SubGroup.findById(subgroup._id)
      expect(foundSubGroup).toBeNull()
    })

    test('should respond with a 404 not found response and a message', async () => {
      const responseNotFound = await request(app).delete(`/api/v1/sub-groups/${idNotFound}`).send()

      expect(responseNotFound.status).toBe(404)
      expect(responseNotFound.body.error).toBeDefined()
      expect(responseNotFound.body.error).toBe('Sub-grupo no encontrado')
    })
  })
})
