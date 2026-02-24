import Link from 'next/link'

export default function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link href="https://larrys-world.github.io" className="hover:text-gray-900">
            Home
          </Link>
        </li>
        <li>
          <span className="mx-2">/</span>
        </li>
        <li>
          <Link href="https://larrys-world.github.io/tools" className="hover:text-gray-900">
            Tools
          </Link>
        </li>
        <li>
          <span className="mx-2">/</span>
        </li>
        <li className="text-gray-900 font-medium">
          Business Loan Calculator
        </li>
      </ol>
    </nav>
  )
}