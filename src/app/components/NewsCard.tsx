import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Edit } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface INewsCardProps {
  id: string
  title: string
  text: string
  date: string
  permissionToEdit: boolean
  setInfoModal?: React.Dispatch<React.SetStateAction<{
    addNews: boolean;
    editNews: boolean;
    info: {
      id: string;
      title: string;
      text: string;
      date: string;
    }
  }>> | undefined
  setDeleteModal?: React.Dispatch<React.SetStateAction<{
    open: boolean;
    id: string;
  }>> | undefined
}

export const NewsCard = ({ id, title, text, date, permissionToEdit, setInfoModal, setDeleteModal }: INewsCardProps) => {

  const router = useRouter()

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd MMMM, yyyy', { locale: ptBR })
    const day = format(date, 'd', { locale: ptBR })
    const formattedMonth = format(date, 'MMMM', { locale: ptBR })
    const year = format(date, 'yyyy', { locale: ptBR })

    return `${day} de ${formattedMonth}, ${year}`
  }

  const truncatedText = text.slice(0, 200);
  const displayText = text.length > 284 ? `${truncatedText}...` : text;

  return (
    <div className='flex'>
      <Link href={`/user/news/${id}`}
        className='w-[90%] h-36 rounded-tl-[20px] rounded-bl-[20px] overflow-y-hidden cursor-pointer bg-[#f4f4f4] text-[#8B8B8B] flex flex-col p-3 gap-2'
      >

        <div className='flex items-center justify-between'>

          <h1 className='text-2xl'>
            {
              title
            }
          </h1>

          <div className='flex gap-3 items-center'>
            {
              !permissionToEdit &&
              <>
                <span className=''>
                  {
                    formatDate(date)
                  }
                </span>
              </>
            }
          </div>

        </div>
        <span className=''>
          {
            displayText
          }
        </span>

      </Link>
      <div className='w-[10%] h-36 bg-[#f4f4f4] text-[#8B8B8B] '>
        {
          permissionToEdit &&
          <div className='flex gap-3 items-center pt-3 pr-1'>
            <Trash2 className='text-red-500 cursor-pointer' size={22} onClick={() => {
              setDeleteModal && setDeleteModal(() => {
                return {
                  open: true,
                  id
                }
              })
            }}/>
            <Edit className='text-green-600 cursor-pointer' size={22} onClick={(e) => {

              setInfoModal && setInfoModal(() => {
                return {
                  addNews: false,
                  editNews: true,
                  info: {
                    id,
                    title,
                    text,
                    date
                  }
                }
              })
            }} />
          </div>
        }
      </div>
    </div>
  )
}
