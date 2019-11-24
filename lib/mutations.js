const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const newCourse = Object.assign(input)
    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse
  },
  createPerson: async (root, { input }) => {
    const newPerson = Object.assign(input)
    let db
    let person

    try {
      db = await connectDB()
      person = await db.collection('students').insertOne(newPerson)
      newPerson._id = person.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newPerson
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').findOneAndUpdate(
        {  _id: ObjectID(_id) },
        { $set: input },
        { new: true, returnOriginal: false }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course.value
  },
  editPerson: async (root, { _id, input }) => {
    let db
    let person

    try {
      db = await connectDB()
      person = await db.collection('students').findOneAndUpdate(
        {  _id: ObjectID(_id) },
        { $set: input },
        { new: true, returnOriginal: false }
      )
    } catch (error) {
      errorHandler(error)
    }
    return person.value
  },
  deleteCourse: async (root, { _id, collection }) => {
    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').deleteOne(
        { _id: ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course.deletedCount
    ? `El elemento con id ${_id} fue eliminado exitosamente de la colecion ${collection}.`
    : `No existe el elemento con el id: ${_id} en la colecion ${collection}.`
  },
  deletePerson: async (root, { _id, collection }) => {
    let db
    let person

    try {
      db = await connectDB()
      person = await db.collection('students').deleteOne(
        { _id: ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return person.deletedCount
    ? `El elemento con id ${_id} fue eliminado exitosamente de la colecion ${collection}.`
    : `No existe el elemento con el id: ${_id} en la colecion ${collection}.`
  },
  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne({
        _id: ObjectID(courseID)
      })
      person = await db.collection('students').findOne({
        _id: ObjectID(personID)
      })

      if (!course || !person) throw new Error('La persona o el curso no existe')

      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } }
      )
    } catch (error) {
      errorHandler(error)
    }

    return course
  }

}
