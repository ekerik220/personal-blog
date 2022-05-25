import { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getPost } from "server/models/post.server"
import invariant from "tiny-invariant"
import { Post } from "@prisma/client"
import { PostMetaData } from "~/components/post-meta-data"
import { Heading } from "~/components/heading"
import { parseMarkdown } from "server/utils/markdown-utils"

type LoaderData = { post: Post; html: string }

export default function PostSlug() {
  const { post, html } = useLoaderData() as LoaderData

  return (
    <>
      <PostMetaData post={post} />
      <Heading>{post.title}</Heading>
      <div className="h-4" />
      <article className="prose lg:prose-xl prose-h2:text-[10px]">
        <img alt="post banner" src={post.bannerImg} className="mt-4 mb-8" />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </>
  )
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`)

  const post = await getPost(params.slug)
  invariant(post, `Post not found: ${params.slug}`)

  const html = parseMarkdown(post.excerpt + "\n\n" + post.markdown)

  return json<LoaderData>({ post, html })
}
