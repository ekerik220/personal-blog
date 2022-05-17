export function extractFormData<FormFields>(formData: FormData) {
  return Object.fromEntries(formData) as { _action?: string } & FormFields
}
