import { Form } from "@remix-run/react"

export type PostFormFields = {
  id?: string
  title?: string
  slug?: string
  markdown?: string
  excerpt?: string
  bannerImg?: string
}

type Props = {
  action?: "update" | "submit"
  loading?: boolean
  defaults?: PostFormFields
  errors?: PostFormFields
  className?: string
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`

export const PostForm: React.VFC<Props> = ({
  action,
  loading,
  defaults,
  errors,
  className,
}) => {
  const buttonText = () => {
    if (action === "update") {
      return loading ? "Updating..." : "Update Post"
    }
    return loading ? "Creating..." : "Create Post"
  }

  return (
    <Form key={defaults?.id} method="post" className={className}>
      <input hidden name="id" value={defaults?.id} />
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input
            type="text"
            name="title"
            defaultValue={defaults?.title}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input
            type="text"
            name="slug"
            defaultValue={defaults?.slug}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>
          Banner image:{" "}
          {errors?.bannerImg ? (
            <em className="text-red-600">{errors.bannerImg}</em>
          ) : null}
          <input
            type="text"
            name="bannerImg"
            defaultValue={defaults?.bannerImg}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label htmlFor="excerpt">
          Excerpt:{" "}
          {errors?.excerpt ? (
            <em className="text-red-600">{errors.excerpt}</em>
          ) : null}
        </label>
        <br />
        <textarea
          id="excerpt"
          rows={6}
          name="excerpt"
          defaultValue={defaults?.excerpt}
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:{" "}
          {errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}
        </label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          defaultValue={defaults?.markdown}
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          name="_action"
          value={action}
        >
          {buttonText()}
        </button>
      </p>
    </Form>
  )
}
