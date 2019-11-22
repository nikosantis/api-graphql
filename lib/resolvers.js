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
    _id: 'anyid',
    title: 'Mi título 2',
    teacher: 'Mi profesor',
    description: 'Descripción',
    topic: 'Programación'
  },
  {
    _id: 'anyid',
    title: 'Mi título 3',
    teacher: 'Mi profesor',
    description: 'Descripción',
    topic: 'Programación'
  }
]

module.exports = {
  getCourses: () => {
    return courses
  }
}