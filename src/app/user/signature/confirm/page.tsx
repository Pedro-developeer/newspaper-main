"use client"
import { Header } from '@/app/components/Header'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import planImg from '../../../../images/plan-image.svg'
import { Input } from '@/app/components/Input'
import { Button } from '@/app/components/Button'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { api } from '@/lib/api'
import toast, { Toaster } from 'react-hot-toast';
import { UserContext, UserType } from '@/app/context/UserContext'

interface IValuesForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: IValuesForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function Page() {

  const [userConfirm, setUserConfirm] = useState<UserType | null>(null)

  const { user, saveUser } = useContext(UserContext)
  const notify = (message: string) => toast(message, {
    icon: '❌',
    duration: 2000,
    style: {
      backgroundColor: '#F87171',
      color: '#fff',
      fontWeight: 'bold',
    }
  });
  const router = useRouter()

  const formik = useFormik<IValuesForm>({
    initialValues,
    onSubmit: async (values) => {

      const userToSend = {
        name: values.name,
        email: values.email,
        password: values.password,
        plan: user?.plan,
        typePlan: user?.typePlan
      }

      try {

        const response = await api.post('/user/register', userToSend)

        const data = response.data

        if (data) {
          saveUser({
            name: data.name,
            email: data.email,
            plan: data.plan,
            typePlan: data.typePlan,
          }, true)

          createSale(data.id)
            .then((data) => {
              if (data) {
                router.push('/user/menu')
              }
            })
            .catch(() => {
              notify('Erro ao cadastrar usuário')
            })

        }

      } catch (error) {
        notify('Erro ao cadastrar usuário')
      }

    },
    validationSchema: yup.object({
      name: yup.string().required('Campo obrigatório'),
      email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
      password: yup.string().required('Campo obrigatório'),
      confirmPassword: yup.string().required('Campo obrigatório').oneOf([yup.ref('password')], 'Senhas não conferem')
    })
  })

  async function createSale(id: string) {

    try {

      const response = await api.post('/sale/create', {
        userId: id,
        plan: user?.plan,
        typePlan: user?.typePlan,
        price: userConfirm?.plan === 'Básico' && userConfirm.typePlan === 'Mensal' ? 1.90 * 100 :
          userConfirm?.plan === 'Básico' && userConfirm.typePlan === 'Anual' ? 22.80 * 100 :
            userConfirm?.plan === 'Premium' && userConfirm.typePlan === 'Mensal' ? 3.90 * 100 :
              userConfirm?.plan === 'Premium' && userConfirm.typePlan === 'Anual' ? 46.80 * 100 : 0
      })

      return response.data
    } catch (error) {
      return error
    }

  }

  useEffect(() => {

    setUserConfirm(user)

  }, [user])

  return (
    <div className="min-h-screen">
      <Header type="login" />
      <div className=" py-10 flex flex-col items-center justify-center gap-5">

        <div className='w-96 h-36 bg-[#F4F4F4] rounded p-3 grid grid-cols-2'>

          <div className='w-full flex flex-col gap-3 justify-center'>
            <span>Plano escolhido</span>
            <Image src={planImg} alt='plan-img' />
          </div>
          <div className='w-full flex flex-col items-center justify-center font-bold'>

            <span className='text-sm'>
              {userConfirm?.plan}
            </span>
            <span className='text-xl'>
              {
                userConfirm?.plan === 'Básico' && userConfirm.typePlan === 'Mensal' ? 'R$ 1,90' :
                  userConfirm?.plan === 'Básico' && userConfirm.typePlan === 'Anual' ? 'R$ 22,80' :
                    userConfirm?.plan === 'Premium' && userConfirm.typePlan === 'Mensal' ? 'R$ 3,90' :
                      userConfirm?.plan === 'Premium' && userConfirm.typePlan === 'Anual' ? 'R$ 46,80' : ''
              }
            </span>
            <span className='text-xs font-normal text-zinc-400'>
              {userConfirm?.typePlan}
            </span>

          </div>

        </div>

        <form
          className='w-96 rounded bg-[#F4F4F4] flex flex-col items-center gap-2 justify-center p-4'
          onSubmit={formik.handleSubmit}>

          <Input
            id='name'
            name='name'
            label='Nome'
            type='text'
            placeholder='Informe seu nome'
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <Input
            id='email'
            name='email'
            label='E-mail'
            type='email'
            placeholder='Informe seu email'
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Input
            id='password'
            name='password'
            label='Senha'
            type='password'
            placeholder='Informe seu senha'
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Input
            id='confirmPassword'
            name='confirmPassword'
            label='Confirmar senha'
            type='password'
            placeholder='Confirme sua senha'
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
          />

          <div className='w-72 mt-5'>
            <Button label='Assinar' />
          </div>

        </form>
        <Toaster />

      </div>
    </div>
  )
}
