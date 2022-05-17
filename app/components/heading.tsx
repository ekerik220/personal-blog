import clsx from "clsx"
import React, { useMemo } from "react"
import { CFC } from "~/types/react-types"

export type HeadingSize = "title" | "subtitle"

type Props = {
  as?: React.ElementType
  size?: HeadingSize
}

export const Heading: CFC<Props> = ({
  as: Component = "h1",
  size = "title",
  className,
  children,
}) => {
  const [fontSize, marginTop] = useMemo(() => {
    switch (size) {
      case "title":
        return ["text-[32px]", "mt-[20px]"]
      case "subtitle":
        return ["text-[22px]", "mt-[40px]"]
    }
  }, [size])

  return (
    <Component
      className={clsx(
        "text-primarytext",
        "font-bold",
        "leading-tight",
        fontSize,
        marginTop,
        className
      )}
    >
      {children}
    </Component>
  )
}
