const remark = require('remark')
const fs = require('fs')
const plugin = require('../src/index')

const processMarkdown = async (md) => {
  return remark().use(plugin).process(md)
}

test('it adds an error when headings need inline code', async () => {
  markdown = fs.readFileSync('./test/heading_no_inline_code.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(2)
  expect(lint.messages[0].message).toBe('Command heading without inline code')
  expect(lint.messages[1].message).toBe('Command heading without inline code')
})
test('it does not add error messages when one is present', async () => {
  markdown = fs.readFileSync('./test/heading_with_inline_code.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(0)
})

test('it does not mistake overview heading for command headings', async () => {
  markdown = fs.readFileSync('./test/topic_overview_heading.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(0)

})
