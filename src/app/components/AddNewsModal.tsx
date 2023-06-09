"use client"

import React, { useEffect } from 'react'
import { Button } from './Button'
import { Toaster, toast } from 'react-hot-toast';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { api } from '@/lib/api';

interface AddNewsModalProps {
  setInfoModal: React.Dispatch<React.SetStateAction<{
    addNews: boolean;
    editNews: boolean;
    info: {
      id: string;
      title: string;
      text: string;
      date: string;
    }
  }>>
  infoModal: {
    addNews: boolean;
    editNews: boolean;
    info: {
      id: string;
      title: string;
      text: string;
      date: string;
    }
  }
}

interface IValuesForm {
  title: string
  text: string
}

const initialValues: IValuesForm = {
  title: '',
  text: ''
}


export const AddNewsModal = ({ infoModal, setInfoModal }: AddNewsModalProps) => {

  const notify = (message: string, bgColor: string) => toast(message, {
    duration: 2000,
    style: {
      backgroundColor: bgColor,
      color: '#fff',
      fontWeight: 'bold',
    }
  });

  const formik = useFormik<IValuesForm>({
    initialValues,
    onSubmit: async (values) => {

      const objTosend = {
        text: values.text,
        title: values.title,
      }

      try {

        if (infoModal.addNews) {
          const response = await api.post('/news/create', objTosend)

          if (response.status === 200) {
              setInfoModal(state => {
                return {
                  info: {
                    id: '',
                    title: '',
                    text: '',
                    date: ''
                  },
                  editNews: false,
                  addNews: false
                }
              })
          }
        }

        if (infoModal.editNews) {
          const response = await api.put(`/news/update/${infoModal.info.id}`, objTosend)

          if (response.status === 200) {
              setInfoModal(state => {
                return {
                  info: {
                    id: '',
                    title: '',
                    text: '',
                    date: ''
                  },
                  editNews: false,
                  addNews: false
                }
              })
          }
        }


      } catch (error) {
        notify('Erro ao criar publicação', '#EF4444')
      }

    },
    validationSchema: yup.object({
      title: yup.string().required('Campo obrigatório'),
      text: yup.string().required('Campo obrigatório'),
    })
  })

  useEffect(() => {

    formik.setValues({
      title: infoModal.info.title,
      text: infoModal.info.text
    })

  }, [])

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return
        setInfoModal(state => {
          return {
            info: {
              id: '',
              title: '',
              text: '',
              date: ''
            },
            editNews: false,
            addNews: false
          }
        })
      }}
      className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'
    >

      <form
        onSubmit={formik.handleSubmit}
        className='w-[33rem] h-[32rem] bg-[#F4F4F4] mx-auto mt-20 rounded flex flex-col gap-5 p-5'
      >

        <div className='flex flex-col'>
          <label className='font-semibold'>Titulo da publicação</label>
          <input
            id='title'
            name='title'
            type='text'
            value={formik.values.title}
            className='w-full h-12 rounded-md bg-white border px-5 py-2 mt-2'
            onChange={formik.handleChange}
          />
          <span className='text-red-500 text-xs'>
            {formik.errors.title}
          </span>
        </div>

        <div className='flex flex-col'>
          <label className='font-semibold'>Descrição da publicação</label>
          <textarea
            id='text'
            name='text'
            value={formik.values.text}
            className='w-full h-60 rounded-md bg-white border px-5 py-2 mt-2'
            onChange={formik.handleChange}
          />

          <span className='text-red-500 text-xs'>
            {
              formik.errors.text
            }
          </span>

        </div>

        <div className='w-64 mx-auto'>
          <Button label={
            infoModal.editNews ? 'Editar publicação' : 'Criar publicação'
          } />
        </div>

      </form>
      <Toaster />
    </div>
  )
}
