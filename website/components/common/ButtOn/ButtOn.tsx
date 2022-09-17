import React from 'react'

export default function ButtOn({
  bgCol,
  textCol,
  type,
  height,
  width,
  children,
  onClick
}: any) {
  return (
    <button
      className="btn"
      type={type}
      style={{height: height, width: width}}
      onClick={onClick}
    >
      {children}

    </button>
  )
}