"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GridIcon,
  CalenderIcon,
  UserCircleIcon,
  ListIcon,
  ChevronDownIcon,
  HorizontaLDots,
  PieChartIcon,
  BoxCubeIcon,
} from "../icons"

type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  subItems?: { name: string; path: string }[]
}

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Dashboard Masjid", path: "/" }],
  },
  {
    icon: <CalenderIcon />,
    name: "Keuangan",
    subItems: [
      { name: "Transparansi", path: "/finance" },
      { name: "Pemasukan", path: "/finance/income" },
      { name: "Pengeluaran", path: "/finance/expense" },
    ],
  },
  {
    icon: <ListIcon />,
    name: "Program & Kegiatan",
    path: "/programs",
  },
  {
    icon: <CalenderIcon />,
    name: "Kalender",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart" },
      { name: "Bar Chart", path: "/bar-chart" },
      { name: "Comparison Chart", path: "/comparison-chart" },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts" },
      { name: "Buttons", path: "/buttons" },
    ],
  },
]

export default function TopNavbar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toDashboardPath = (path: string) => {
    if (path === "/") return "/dashboard-admin"
    return `/dashboard-admin${path}`
  }

  const isActive = (path: string) => pathname === toDashboardPath(path)

  const isMenuActive = (item: NavItem) => {
    if (item.path && isActive(item.path)) return true
    if (item.subItems) {
      return item.subItems.some((sub) => isActive(sub.path))
    }
    return false
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Hide/Show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Close mobile menu on scroll
      if (window.innerWidth < 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false)
        setOpenDropdown(null)
      }
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setOpenDropdown(null) // Close dropdown when hiding
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, mobileMenuOpen])

  return (
    <div className={`flex items-center justify-between w-full lg:justify-center transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1.5 overflow-x-auto no-scrollbar" ref={dropdownRef}>
        {/* Menu Section Header with Three Dots */}
        <div className="flex items-center mr-2">
          <HorizontaLDots className="w-6 h-6 text-gray-400" />
        </div>
        
        {navItems.map((item) => {
          const menuActive = isMenuActive(item)
          
          return (
            <div key={item.name} className="relative flex-shrink-0">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    className={`group flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      menuActive || openDropdown === item.name
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 dark:bg-blue-500 dark:shadow-blue-500/30"
                        : "text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm border border-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                    }`}
                  >
                    <span className={`w-6 h-6 flex items-center justify-center transition-transform flex-shrink-0 ${
                      menuActive || openDropdown === item.name ? "scale-110" : "group-hover:scale-105"
                    }`}>
                      {item.icon}
                    </span>
                    <span className="hidden xl:inline whitespace-nowrap leading-none">{item.name}</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ml-1 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-2 z-50 animate-in">
                      <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {item.name}
                        </p>
                      </div>
                      <div className="py-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={toDashboardPath(subItem.path)}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center px-4 py-2.5 text-sm transition-all duration-150 ${
                              isActive(subItem.path)
                                ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/30 dark:text-blue-400"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-white"
                            }`}
                          >
                            <span className="flex-1">{subItem.name}</span>
                            {isActive(subItem.path) && (
                              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                item.path && (
                  <Link
                    href={toDashboardPath(item.path)}
                    className={`group flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 dark:bg-blue-500 dark:shadow-blue-500/30"
                        : "text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm border border-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                    }`}
                  >
                    <span className={`w-6 h-6 flex items-center justify-center transition-transform flex-shrink-0 ${
                      isActive(item.path) ? "scale-110" : "group-hover:scale-105"
                    }`}>
                      {item.icon}
                    </span>
                    <span className="hidden xl:inline whitespace-nowrap leading-none">{item.name}</span>
                  </Link>
                )
              )}
            </div>
          )
        })}
      </nav>

      {/* Mobile Menu Button - Right side */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 ml-auto"
      >
        {mobileMenuOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-16 left-0 right-0 z-50 mx-4 mt-2 rounded-2xl border-2 border-gray-100 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900 max-h-[calc(100vh-6rem)] overflow-y-auto">
            {/* Menu Header with Three Dots */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <HorizontaLDots className="w-6 h-6 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Menu Navigasi</h3>
            </div>
            
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const menuActive = isMenuActive(item)
                
                return (
                  <div key={item.name}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                            menuActive
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 bg-gray-50 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            {item.icon}
                          </span>
                          <span className="flex-1 text-left">{item.name}</span>
                          <ChevronDownIcon
                            className={`w-4 h-4 transition-transform ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openDropdown === item.name && (
                          <div className="mt-2 ml-4 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.path}
                                href={toDashboardPath(subItem.path)}
                                onClick={() => {
                                  setOpenDropdown(null)
                                  setMobileMenuOpen(false)
                                }}
                                className={`flex items-center px-4 py-2.5 text-sm rounded-lg transition-all ${
                                  isActive(subItem.path)
                                    ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/30 dark:text-blue-400"
                                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      item.path && (
                        <Link
                          href={toDashboardPath(item.path)}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                            isActive(item.path)
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 bg-gray-50 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      )
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
