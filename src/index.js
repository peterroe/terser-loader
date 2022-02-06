const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')

module.exports = function loader(source) {
  const { loaders, resource, request, version, webpack } = this;
  const newSource = source
  const ast = parser.parse(source, { sourceType: 'module' })
  traverse(ast, {
    CallExpression(path) {
      if (
        types.isMemberExpression(path.node.callee) &&
        types.isIdentifier(path.node.callee.object, { name: "console" })
      )
        path.remove()
    }
  })
  const output = generator(ast, {}, source)
  return output.code;
}