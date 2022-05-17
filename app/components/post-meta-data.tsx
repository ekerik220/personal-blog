import { Post } from "@prisma/client"
import dayjs from "dayjs"
import { useMemo } from "react"
import { AiOutlineClockCircle, AiOutlineRead } from "react-icons/ai"
import { CVFC } from "~/types/react-types"
import { averageReadingTime } from "~/utils/average-reading-time"

type Props = {
  post: Post
}

export const PostMetaData: CVFC<Props> = ({ post, className }) => {
  const createAtString = dayjs(post.createdAt).format("MMMM D, YYYY")

  const minutesToRead = useMemo(
    () => averageReadingTime(post.excerpt + post.markdown),
    [post.excerpt, post.markdown]
  )

  return (
    <div className={`flex items-center text-gray-500 ${className}`}>
      <AiOutlineClockCircle size="20px" className="mr-1 text-gray-600" />
      <span className="mr-5">{createAtString}</span>
      <AiOutlineRead size="20px" className="mr-1 text-gray-600" />
      <span>
        {minutesToRead} Minute{minutesToRead !== 1 && "s"}
      </span>
    </div>
  )
}
