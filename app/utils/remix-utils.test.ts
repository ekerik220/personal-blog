import { extractFormData } from "./remix-utils"

describe("extractFormData", () => {
  it("should extract form fields from the form data", () => {
    document.documentElement.innerHTML =
      "<form><input name='input-1' value='1'/><input name='input-2' value='2' /></form>"

    const formElement = document.querySelector("form")
    const formData: FormData = new FormData(formElement!)
    expect(extractFormData(formData)).toMatchObject({
      "input-1": "1",
      "input-2": "2",
    })
  })
})
