import { Link } from "@remix-run/react"
import { GiPlanetCore } from "react-icons/gi"
import { CVFC } from "~/types/react-types"

type Props = {}

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
]

export const Header: CVFC<Props> = ({ className }) => {
  return (
    <div className="flex items-end justify-between pb-1 mt-16 border-b mb-14">
      <Link to="/">
        <GiPlanetCore size="60px" className="mb-2 text-primarytext" />
      </Link>
      <ul className={className}>
        {navItems.map((item) => (
          <li key={item.title} className="inline-block px-2">
            <Link to={item.href} className="relative text-sm">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
