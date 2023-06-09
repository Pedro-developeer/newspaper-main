import React, { useEffect } from 'react'
import { Button } from './Button';
import { api } from '@/lib/api';
import { Toaster, toast } from 'react-hot-toast'

interface DeleteNewsModalProps {
  id: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<{
    open: boolean;
    id: string;
  }>>
}

export const DeleteNewsModal = ({ id, open, setOpen }: DeleteNewsModalProps) => {

  const notify = (message: string, bgColor: string) => toast(message, {
    duration: 800,
    style: {
      backgroundColor: bgColor,
      color: '#fff',
      fontWeight: 'bold',
    }
  });

  async function deleteNews() {

    try {
      const response = await api.delete(`/news/delete/${id}`)

      if (response.status === 200) {
        setOpen({ open: false, id: '' })
        
        // notify('Publicação excluída com sucesso', '#10B981')

      }

    }
    catch (error) {
      notify('Erro ao excluir publicação', '#EF4444')
    }

  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget)
          setOpen({ open: false, id: '' })
      }}
      className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center'
    >

      <div
        className='w-[33rem] h-52 bg-[#F4F4F4] mx-auto mt-20 rounded flex flex-col 
        items-center justify-center gap-5 p-5'
      >

        <h1 className='text-xl font-bold'>
          Tem certeza que deseja excluir essa publicação?
        </h1>

        <div className='w-full flex items-center justify-center gap-4 mt-4 px-5'>
          <button className='w-2/4 h-12 rounded-md bg-zinc-400 text-white' onClick={() => {
            setOpen({ open: false, id: '' })
          }}>
            Cancelar
          </button>
          <button className='w-2/4 h-12 rounded-md bg-red-500 text-white' onClick={() => {
            deleteNews()
          }}>
            Excluir
          </button>
        </div>

      </div>
      <Toaster />
    </div>
  )
}
