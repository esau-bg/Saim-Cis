import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CheckBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full"
        htmlFor="checkbox-8"
        data-ripple-dark="true"
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
          id="checkbox-8"
          ref={ref}
          {...props}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
          >
            <path
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            ></path>
          </svg>
        </div>
      </label>
    </div>
    )
  }
)
CheckBox.displayName = 'CheckBox'

export { CheckBox }
