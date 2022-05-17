import clsx from "clsx"
import React, { useMemo } from "react"
import { CFC } from "~/types/react-types"

type Props = {
  as?: React.ElementType
  size?: "paragaph"
}

export const Text: CFC<Props> = ({
  as: Component = "p",
  size = "paragaph",
  children,
  className,
}) => {
  const [fontSize, lineSpacing, marginTop] = useMemo(() => {
    switch (size) {
      case "paragaph":
        return ["text-xl", "leading-relaxed", "mt-5"]
    }
  }, [size])

  return (
    <Component
      className={clsx(
        " text-primarytext",
        fontSize,
        lineSpacing,
        marginTop,
        className
      )}
    >
      {children}
    </Component>
  )
}
