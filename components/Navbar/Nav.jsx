import { useState } from 'react'
import Link from 'next/link'

const Nav = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Books', href: '/books' },
    { label: 'Authors', href: '/authors' },
    { label: 'Cart', href: '/cart' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-gray-900/75 fixed top-0 z-10 w-full backdrop-blur-md justify-between min-h-16 flex items-center ">
      <div className="px-4 w-full ">
        <div className="flex justify-between  w-full py-5   ">
          <div className="flex flex-col w-full justify-between  md:flex-row  ">
            <div className="flex  items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white cursor-pointer md:hidden"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 100 2h6a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href="/">
                <div className="ml-2 font-semibold text-white cursor-pointer">
                  <h1>Sujo <span className = {'text-orange-600'} >Book Store</span></h1>
                </div>
              </Link>
            </div>
            <div
              className={`${
                mobileNavOpen ? 'flex ' : 'hidden'
              } md:flex  flex-col md:flex-row md:items-center`}
            >
              {navLinks.map(({ label, href }) => (
                <Link key={label} href={href}>
                  <div
                    onClick={() => setMobileNavOpen(false)}
                    className="cursor-pointer text-white hover:text-gray-300 py-2 md:py-0 md:px-4 border-b-2 md:border-b-0 md:border-r-2 border-gray-800 transition-all duration-300 ease-in-out"
                  >
                    {label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
