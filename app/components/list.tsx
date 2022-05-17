import { CVFC } from "~/types/react-types"

type Props = {
  children: string
}

export const List: CVFC<Props> = ({ children }) => {
  return (
    <ul
      className="mt-5 list-disc"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
