import { fireEvent, render, screen } from "@testing-library/react"
import { Header } from "./header"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"

test("navigates to home page when clicking the home icon", async () => {
  const history = createMemoryHistory()
  history.replace("/test")

  render(
    <Router location={history.location} navigator={history}>
      <Header />
    </Router>
  )

  fireEvent.click(screen.getByLabelText("navigate home"))
  expect(history.location.pathname).toBe("/")
})

test("navigates to home page when clicking the Home link", async () => {
  const history = createMemoryHistory()
  history.replace("/test")

  render(
    <Router location={history.location} navigator={history}>
      <Header />
    </Router>
  )

  fireEvent.click(screen.getByText(/home/i))
  expect(history.location.pathname).toBe("/")
})

test("navigates to about page when clicking the About link", async () => {
  const history = createMemoryHistory()
  history.replace("/test")

  render(
    <Router location={history.location} navigator={history}>
      <Header />
    </Router>
  )

  fireEvent.click(screen.getByText(/about/i))
  expect(history.location.pathname).toBe("/about")
})
