"use client"
import Image from "next/image";
import { Header } from "../../components/Header";
import image from '../../../images/login-image.png'
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { useFormik } from "formik";
import * as yup from 'yup'
import { api } from "@/lib/api";
import { Toaster, toast } from "react-hot-toast";
import { useContext } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import { useRouter } from "next/navigation";

interface IValuesForm {
  email: string
  password: string
}

const initialValues: IValuesForm = {
  email: '',
  password: ''
}

export default function Login() {

  const { saveAdmin } = useContext(AdminContext)
  const router = useRouter()
  
  const notify = (message: string) => toast(message, {
    icon: '❌',
    duration: 2000,
    style: {
      backgroundColor: '#F87171',
      color: '#fff',
      fontWeight: 'bold',
    }
  });

  const formik = useFormik<IValuesForm>({
    initialValues,
    onSubmit: async (values) => {

      const adminToSend = {
        email: values.email,
        password: values.password,
      }

      try {

        const response = await api.post('/admin/login', adminToSend)

        const data = response.data

        if (data) {
          saveAdmin({
            email: data.email,
            name: data.name,
          })
          router.push('/admin/menu')
        }

      } catch (error) {
        notify('Usuário ou senha incorretos')
      }

    },
    validationSchema: yup.object({
      email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
      password: yup.string().required('Campo obrigatório'),
    })
  })

  return (
    <div className="h-screen w-full bg-white">
      <Header type="login" />

      <div className="h-[calc(100vh-4rem)] w-full grid grid-cols-2">

        <div className="w-full flex flex-col pt-28 pl-20">

          <h2>
            <span className="text-3xl font-bold">Login admin</span>
          </h2>

          <form 
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full h-full mt-10 gap-5">

            <Input
              id="email"
              name="email"
              label="Email"
              placeholder="Informe seu email"
              type="email"
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <Input
              id="password"
              name="password"
              label="Senha"
              placeholder="Informe sua senha"
              type="password"
              onChange={formik.handleChange}
              error={formik.errors.password}
            />

            <div className="mt-5 w-72">
              <Button label="Fazer login" />
            </div>

          </form>

        </div>

        <div className="w-full overflow-y-hidden">
          <Image src={image} alt='newspaper-image'

            className="w-full h-full object-cover object-center" />
        </div>

      </div>
      <Toaster />
    </div>
  )
}