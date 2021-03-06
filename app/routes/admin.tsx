import { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"

import { getPosts } from "server/models/post.server"
import { requireUserId } from "server/models/session.server"

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export default function PostAdmin() {
  const { posts } = useLoaderData() as LoaderData
  return (
    <div className="max-w-4xl px-4 mx-auto">
      <h1 className="my-6 mb-2 text-3xl text-center border-b-2">Blog Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug} className="text-blue-600 underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return json({ posts: await getPosts() })
}
