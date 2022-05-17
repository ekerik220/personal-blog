import { CFC } from "~/types/react-types"

type Props = {
  children: string
}

export const ListItem: CFC<Props> = ({ children }) => {
  return <li className="mt-2 text-xl">{children}</li>
}
