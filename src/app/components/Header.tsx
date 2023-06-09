"use client"
import { Search } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import { LogOutIcon } from 'lucide-react'
import { destroyCookie } from 'nookies'

interface IHeaderProps {
  type: 'login' | 'admin' | 'user'
  setSearch?: React.Dispatch<React.SetStateAction<string>>
}

export const Header = ({ type, setSearch }: IHeaderProps) => {

  const { push } = useRouter()
  const pathname = usePathname()

  const currentPage = pathname.split('/')[2]

  function logOut(type: 'admin' | 'user') {
    localStorage.removeItem(type)

    destroyCookie(undefined, type, {
      path: '/'
    })

    push('user/signature/plans')
  }

  return (
    <div className='h-16 bg-primary text-white flex items-center px-10'>

      <div className='w-1/3'>
        <h1 className='text-xl font-bold'>Jornal em alta</h1>
      </div>

      <div className='w-1/3 flex justify-center relative'>
        {
          type !== 'login' &&
          <>
            <input
              type="text"
              className='w-80 h-10 rounded bg-secondary focus:outline-none p-2'
              onChange={(e) => {
                if (setSearch) {
                  setSearch(e.target.value)
                }
              }}
            />
            <Search size={22} className='absolute right-16 top-2' />
          </>
        }
      </div>

      <div className='w-1/3 flex justify-center gap-5'>
        {
          type === 'admin' &&
          <div className='h-full flex items-center justify-center gap-5'>
            <span className={`cursor-pointer ${currentPage === 'menu' ? 'font-semibold' : ''
              }`} onClick={() => push('/admin/menu')} >
              Publicar
            </span>
            <span className={`cursor-pointer ${currentPage === 'reports' ? 'font-semibold' : ''
              }`} onClick={() => push('/admin/reports')}>
              Painel
            </span>
            <button className='h-10 w-10 text-white' onClick={() => {
              logOut('admin')
            }}>
              <LogOutIcon />
            </button>
          </div>
        }

        {
          type === 'user' &&
          <div className='h-full flex items-center justify-center'>
            <button className='h-10 w-10 text-white' onClick={() => {
              logOut('user')
            }}>
              <LogOutIcon />
            </button>
          </div>

        }
      </div>

    </div>
  )
}
