import { ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { useActionData, useTransition } from "@remix-run/react"
import { createPost } from "server/models/post.server"
import invariant from "tiny-invariant"
import { PostForm, PostFormFields } from "~/components/post-form"
import { extractFormData } from "~/utils/remix-utils"

type ActionData = PostFormFields | undefined

export default function NewPost() {
  const errors = useActionData() as ActionData
  const transition = useTransition()
  const isCreating = Boolean(transition.submission)

  return <PostForm loading={isCreating} errors={errors} />
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const { title, slug, markdown, excerpt, bannerImg } =
    extractFormData<PostFormFields>(formData)

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

  invariant(typeof title === "string", "title must be a string")
  invariant(typeof slug === "string", "slug must be a string")
  invariant(typeof markdown === "string", "markdown must be a string")
  invariant(typeof excerpt === "string", "excerpt must be a string")
  invariant(typeof bannerImg === "string", "banner image must be a string")

  await createPost({ title, slug, markdown, excerpt, bannerImg })

  return redirect("/admin")
}
