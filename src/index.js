const rule = require('unified-lint-rule')
const visit = require('unist-util-visit')
const Is = require('unist-util-is')

async function commandHeadingsHaveInlineCode (ast, file) {
  const validate = async (node) => {
    if (node.depth !== 3) return
    if(node.children && node.children[0].value.includes('Overview')) return
    let inlineCodeFound = false
    for (let child of node.children) {
      if (Is('inlineCode', child)) inlineCodeFound = true
    }
    if (inlineCodeFound === false) { file.message('Command heading without inline code', node) }
  }

  await visit(ast, 'heading', validate)
}

module.exports = rule('remark-lint:command-headings-inline-code', commandHeadingsHaveInlineCode)
