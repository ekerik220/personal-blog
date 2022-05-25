import { CFC } from "~/types/react-types"

type Props = {
  to: string
}

export const ExternalLink: CFC<Props> = ({ to, className, children }) => {
  return (
    <a
      href={to}
      className={`${className} text-blue-500 text-xl`}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
