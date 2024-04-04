'use client'

export default function DataTableSkeleton () {
  return (
    <div className="flex flex-col my-4 animate-pulse">
    <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="border rounded-lg overflow-hidden dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400  uppercase"><div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div></th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase"><div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div></th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase"><div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div></th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase"><div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div></th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase"><div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div></th>
                </tr>
                </thead>
                <tbody>
                <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" ></tr>
                <tr>
                    <td className="whitespace-nowrap py-4 pl-2 pr-3 flex items-center gap-4">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800  rounded-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2 mt-2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-end">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-end">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td>
                    <div className="hs-dropdown w-6 h-6 bg-gray-200 dark:bg-gray-800  rounded"></div>
                    </td>
                </tr>
                <tr>
                    <td className="whitespace-nowrap py-4 pl-2 pr-3 flex items-center gap-4">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800  rounded-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2 mt-2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-end">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-end">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td>
                    <div className="hs-dropdown w-6 h-6 bg-gray-200 dark:bg-gray-800  rounded"></div>
                    </td>
                </tr>
                <tr>
                    <td className="whitespace-nowrap py-4 pl-2 pr-3 flex items-center gap-4">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800  rounded-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2 mt-2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-end">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-end">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800  rounded w-1/2"></div>
                    </td>
                    <td>
                    <div className="hs-dropdown w-6 h-6 bg-gray-200 dark:bg-gray-800  rounded"></div>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
  )
}
