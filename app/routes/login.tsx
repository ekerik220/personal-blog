import { ActionFunction, json } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { createUserSession, login } from "server/models/session.server"
import invariant from "tiny-invariant"
import { extractFormData } from "~/utils/remix-utils"

type FormFields = {
  username?: string
  password?: string
}

type Errors = FormFields & { formError?: string }

const baseClass = `w-full rounded border border-gray-500 px-2 py-1 text-lg`

export default function Login() {
  const errors = useActionData() as Errors

  return (
    <Form method="post">
      <label>
        Username{" "}
        {errors?.username ? (
          <em className="text-red-600">{errors.username}</em>
        ) : null}
        <input name="username" type="text" className={baseClass} />
      </label>
      <label>
        Password{" "}
        {errors?.password ? (
          <em className="text-red-600">{errors.password}</em>
        ) : null}
        <input name="password" type="password" className={baseClass} />
      </label>
      {errors?.formError ? (
        <em className="text-red-600">{errors.formError}</em>
      ) : null}
      <button type="submit" className={`${baseClass} mt-4`}>
        Login
      </button>
    </Form>
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const { username, password } = extractFormData<FormFields>(formData)

  const errors: Errors = {
    username: username ? undefined : "Username is required",
    password: username ? undefined : "Password is required",
  }
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
  if (hasErrors) {
    return json<FormFields>(errors)
  }

  invariant(typeof username === "string", "username must be a string")
  invariant(typeof password === "string", "password must be a string")

  const user = await login({ username, password })
  if (!user) {
    return {
      invalidLogin: "Username/Password combination is incorrect",
    }
  }

  return createUserSession(user.id, "/admin")
  //   return redirect("/admin")
}
