'use strict'

const { graphql, buildSchema } = require('graphql')

// definiendo el schema
const schema = buildSchema(`
  type Query {
    hello: String
    saludo: String
  }
`)

// configurar los resolvers
const resolvers = {
  hello: () => {
    return 'Hola Mundo'
  },
  saludo: () => {
    return 'Bienvenido a GraphQL'
  }
}

// ejecutar el query hello
graphql(schema, '{ hello, saludo }', resolvers)
  .then((data) => {
    console.log(data)
  })
