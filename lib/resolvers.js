'use strict'

const courses = [
  {
    _id: 'anyid',
    title: 'Mi título',
    teacher: 'Mi profesor',
    description: 'Descripción',
    topic: 'Programación'
  },
  {
    _id: 'anyid2',
    title: 'Mi título 2',
    teacher: 'Mi profesor',
    description: 'Descripción',
    topic: 'Programación'
  },
  {
    _id: 'anyid3',
    title: 'Mi título 3',
    teacher: 'Mi profesor',
    description: 'Descripción',
    topic: 'Programación'
  }
]

module.exports = {
  Query: {
    getCourses: () => {
      return courses
    },
    getCourse: (root, args) => {
      const course = courses.filter(course => course._id === args.id)
      return course.pop()
    }
  }
}