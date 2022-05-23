import { marked } from "marked"
import ReactDOMServer from "react-dom/server"
import { CodeBlock } from "~/components/code-block"
import { Language } from "prism-react-renderer"

function createRenderer() {
  const renderer = new marked.Renderer()

  renderer.code = (code, language) => {
    return ReactDOMServer.renderToString(
      <CodeBlock language={language as Language}>{code}</CodeBlock>
    )
  }

  return renderer
}

export function parseMarkdown(markdown: string) {
  return marked(markdown, { renderer: createRenderer() })
}
