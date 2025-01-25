
interface DeleteIconProps {
  className?: string;
  onClick?: () => void;
}

export const DeleteIcon = (
  (
    { className = "", onClick }: DeleteIconProps,

  ) => (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`cursor-pointer text-red-500 hover:text-red-700 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  )
);
