## What is it ? 

A example of loader of [`webpack`](https://webpack.js.org/), and it's used to remove `console.log()` in code

## Core Code

```js
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')

module.exports = function loader(source) {
  const { loaders, resource, request, version, webpack } = this;
  
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
```