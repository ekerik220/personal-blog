import { Post } from "@prisma/client"
import { Link } from "@remix-run/react"
import { Heading } from "~/components/heading"
import { PostMetaData } from "~/components/post-meta-data"
import { Text } from "~/components/text"
import { CVFC } from "~/types/react-types"

type Props = {
  post: Post
}

export const PostPreviewCard: CVFC<Props> = ({ post, className }) => {
  return (
    <div className={className}>
      <PostMetaData post={post} />
      <Heading>
        <Link to={`posts/${post.slug}`}>{post.title}</Link>
      </Heading>
      <Link to={`posts/${post.slug}`}>
        <div className="relative mt-4">
          <img
            alt="post banner"
            src={post.bannerImg}
            className="object-cover w-full"
          />
          <div className="absolute top-0 w-full h-full transition duration-300 ease-linear bg-white opacity-0 hover:opacity-20" />
        </div>
      </Link>
      <Text>{post.excerpt}</Text>
      <Link to={`posts/${post.slug}`} className="block text-blue-500 mt-7">
        Continue reading →
      </Link>
    </div>
  )
}
