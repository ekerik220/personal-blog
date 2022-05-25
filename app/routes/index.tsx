import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getPosts } from "server/models/post.server"
import { Post } from "@prisma/client"
import { PostPreviewCard } from "~/components/post-preview-card"

type LoaderData = {
  posts: Awaited<Array<Post>>
}

export default function Index() {
  const { posts } = useLoaderData() as LoaderData

  return (
    <main>
      {posts.map((post) => (
        <PostPreviewCard key={post.id} post={post} className="mb-12" />
      ))}
    </main>
  )
}

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  })
}
