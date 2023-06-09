import React from 'react'

interface IButtonProps {
  label: string;
  color?: string;
  textColor?: string
  onClick?: () => void
}

export const Button = ({ label, color = 'primary', textColor, onClick }: IButtonProps) => {

  const bgColor = color == 'primary' ? 'bg-primary' : `bg-[${color}]`
  const textColorSelected = textColor ? textColor : 'white'

  return (
    <div onClick={onClick}>
      <button
        className={`w-full h-12 rounded-md
       ${bgColor} 
        ${textColorSelected}
       text-white`}
      >
        {label}
      </button>
    </div>
  )
}
