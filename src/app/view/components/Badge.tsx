import React from 'react'

const variant = {
    secondary: "bg-gray-50 text-gray-600 ring-gray-500/10",
    primary: "bg-[var(--icon-color)] text-[var(--primary-1-color)] ring-[var(--icon-color)]",
    danger: "bg-gray-50 text-gray-600 ring-gray-500/10",
}
const size = {
    sm: "text-sm",
    xsm: "text-xsm  font-medium",
    md: "text-md font-medium",
    lg: "text-lg font-medium",
}
interface IBadge{
    variant?: "secondary" | "primary" | "danger",
    size?: "sm" | "md" | "lg" | "xsm",
    children?: React.ReactNode | any
}
export default function Badge(props:IBadge) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 leading-[1.4] ring-1 ring-inset ${variant[props?.variant]} ${size[props?.size]}`}>
        {props?.children}
    </span>
  )
}
