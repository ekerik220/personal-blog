import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react"
import { deletePost, getPost, updatePost } from "server/models/post.server"
import invariant from "tiny-invariant"
import { Post } from "@prisma/client"
import { PostForm, PostFormFields } from "~/components/post-form"
import { extractFormData } from "~/utils/remix-utils"

type ActionData = PostFormFields | undefined

type LoaderData = { post: Post }

export default function AdminPostSlug() {
  const { post } = useLoaderData() as LoaderData
  const errors = useActionData() as ActionData
  const transition = useTransition()
  const isUpdating = Boolean(transition.submission)

  return (
    <div className="flex-col">
      <Form method="delete">
        <input hidden name="id" value={post.id} />
        <button
          name="_action"
          value="delete"
          className="block px-4 py-2 ml-auto text-white bg-blue-500 rounded"
        >
          Delete
        </button>
      </Form>
      <PostForm
        action="update"
        defaults={post}
        loading={isUpdating}
        errors={errors}
      />
    </div>
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const { id, title, slug, markdown, excerpt, bannerImg, _action } =
    extractFormData<PostFormFields>(formData)

  if (_action === "delete") {
    console.log(id)
    if (!id) return null
    await deletePost(id)
    return redirect("/admin")
  }

  const errors: ActionData = {
    title: title ? undefined : "Title is required",
    slug: slug ? undefined : "Slug is required",
    markdown: markdown ? undefined : "Markdown is required",
    excerpt: excerpt ? undefined : "Excerpt is required",
    bannerImg: bannerImg ? undefined : "Banner image is required",
  }

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
  if (hasErrors) {
    return json<ActionData>(errors)
  }

  invariant(typeof id === "string", "id must be a string")
  invariant(typeof title === "string", "title must be a string")
  invariant(typeof slug === "string", "slug must be a string")
  invariant(typeof markdown === "string", "markdown must be a string")
  invariant(typeof excerpt === "string", "excerpt must be a string")
  invariant(typeof bannerImg === "string", "bannerImg must be a string")

  await updatePost(id, { title, slug, markdown, excerpt, bannerImg })
  return {}
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`)

  const post = await getPost(params.slug)
  invariant(post, `Post not found: ${params.slug}`)

  return json<LoaderData>({ post })
}
