// Adds className to FC/VFC for convenience with Tailwind
export type CFC<T> = React.FC<T & { className?: string }>
export type CVFC<T> = React.VFC<T & { className?: string }>
