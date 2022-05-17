import { marked } from "marked"
import { Heading } from "~/components/heading"
import { Text } from "~/components/text"
import ReactDOMServer from "react-dom/server"
import { CodeBlock } from "~/components/code-block"
import { Language } from "prism-react-renderer"
import { BlockQuote } from "~/components/block-quote"
import { List } from "~/components/list"
import { ListItem } from "~/components/list-item"

function createRenderer() {
  const renderer = new marked.Renderer()

  renderer.heading = (text) => {
    return ReactDOMServer.renderToString(
      <Heading as={`h2`} size="subtitle">
        {text}
      </Heading>
    )
  }

  renderer.paragraph = (text) => {
    return ReactDOMServer.renderToString(<Text size="paragaph">{text}</Text>)
  }

  renderer.code = (code, language) => {
    return ReactDOMServer.renderToString(
      <CodeBlock language={language as Language}>{code}</CodeBlock>
    )
  }

  renderer.blockquote = (quote) => {
    return ReactDOMServer.renderToString(
      <BlockQuote>{stripTags(quote)}</BlockQuote>
    )
  }

  renderer.list = (body, _) => {
    return ReactDOMServer.renderToString(<List>{body}</List>)
  }

  renderer.listitem = (text) => {
    return ReactDOMServer.renderToString(<ListItem>{text}</ListItem>)
  }

  renderer.link = (href, title, text) => {
    return ReactDOMServer.renderToString(
      <a title={title ?? undefined} href={href ?? undefined}>
        {stripTags(text)}
      </a>
    )
  }

  return renderer
}

export function parseMarkdown(markdown: string) {
  return marked(markdown, { renderer: createRenderer() })
  // return marked.parse(markdown)
}

function stripTags(markup: string) {
  return markup.replace(/<.*?>/g, "")
}
