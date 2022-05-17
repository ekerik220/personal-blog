import { CVFC } from "~/types/react-types"
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import clsx from "clsx"
import { useMemo } from "react"

type Props = {
  language: Language
  children: string
}

export const CodeBlock: CVFC<Props> = ({ language, className, children }) => {
  const { code, lineStyle } = useMemo(() => {
    const codeAccum: string[] = []
    const lineStyle = children.split("\n").map((line) => {
      if (line.startsWith("+")) {
        codeAccum.push(line.substring(1))
        return "bg-[#2ea04026]"
      }
      if (line.startsWith("-")) {
        codeAccum.push(line.substring(1))
        return "bg-[#f8514926]"
      }
      codeAccum.push(line)
      return "no-diff"
    })
    return { code: codeAccum.join("\n"), lineStyle }
  }, [children])

  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(className, "m-4 p-2 overflow-auto text-left")}
          style={style}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line, key: i })}
              className={`table-row ${lineStyle[i]} w-full`}
            >
              <span className="table-cell pr-4 text-right opacity-50 select-none">
                {i + 1}
              </span>
              <span className="table-cell w-full">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
