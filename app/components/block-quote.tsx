import { CVFC } from "~/types/react-types"

type Props = {
  children: string
}

export const BlockQuote: CVFC<Props> = ({ children }) => {
  return (
    <blockquote
      className="bg-[#f9f9f9] border-l-[10px] border-[#ccc] my-6 mx-[10px] py-2 px-[10px] italic text-xl"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
