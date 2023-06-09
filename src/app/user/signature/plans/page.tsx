"use client";
import { UserContext } from "@/app/context/UserContext";
import { Header } from "@/app/components/Header";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Page() {

  const [typePlanBasic, setTypePlanBasic] = useState<'Mensal' | 'Anual'>('Mensal')
  const [typePlanPremium, setTypePlanPremium] = useState<'Mensal' | 'Anual'>('Mensal')

  const { saveUser } = useContext(UserContext)
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Header type="login" />
      <div className="h-[calc(100vh-4rem)] py-10 flex flex-col items-center gap-5">

        <div className="flex flex-col ">
          <h1 className="text-xl font-bold">
            Suas melhores decisões dependem de informação de qualidade
          </h1>
          <span className="font-medium text-[#818181]">
            Assine um conteúdo que traz análises e opiniões diferentes.
          </span>
        </div>
        <div className="flex gap-8">

          <div className="h-96 w-64  rounded bg-[#F4F4F4] p-3 
          flex flex-col justify-between">

            <div className="flex flex-col items-center w-full gap-5">

              <div className="h-16 w-full rounded bg-[#B8B8B8] flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-white">Digital Básica</h3>
              </div>

              <span className="text-black font-bold text-xl">
                R$ 1,90/mês
              </span>

              <select
                className="w-full h-9 bg-[#DFDFDF] rounded text-center text-zinc-500"
                onChange={(e) => setTypePlanBasic(e.target.value as 'Mensal' | 'Anual')}
              >
                <option value="Mensal">Plano mensal</option>
                <option value="Anual">Plano anual</option>
              </select>

            </div>

            <div className="flex flex-col items-center w-full gap-5">

              <div className="flex flex-col gap-1">

                <div className="flex gap-1 items-center text-sm text-zinc-500">
                  <Check size={18} className="text-green-400" />
                  <span>Acesso ilimitado ao portal</span>
                </div>
                <div className="flex gap-1 items-center text-sm text-zinc-500 mb-3">
                  <Check size={18} className="text-green-400" />
                  <span>Conteúdo personalizado</span>
                </div>

                <button
                  className="w-52 h-10 rounded-md bg-[#B8B8B8] text-white mx-auto"
                  onClick={() => {
                    saveUser({
                      name: '',
                      email: '',
                      plan: 'Básico',
                      typePlan: typePlanBasic
                    }, false)
                    router.push('/user/signature/confirm')
                  }}
                >
                  Assinar
                </button>

              </div>

            </div>



          </div>

          <div className="h-96 w-64 rounded bg-[#F4F4F4] p-3 
          flex flex-col justify-between">

            <div className="flex flex-col items-center w-full gap-5">

              <div className="h-16 w-full rounded bg-[#FF7E7E] flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-white">Digital Premium</h3>
              </div>

              <span className="text-black font-bold text-xl">
                R$ 3,90/mês
              </span>

              <select
                className="w-full h-9 bg-[#DFDFDF] rounded text-center text-zinc-500"
                onChange={(e) => setTypePlanPremium(e.target.value as 'Mensal' | 'Anual')}
              >
                <option value="Mensal">Plano mensal</option>
                <option value="Anual">Plano anual</option>
              </select>

            </div>

            <div className="flex flex-col items-center w-full gap-5">

              <div className="flex flex-col gap-1">

                <div className="flex gap-1 items-center text-sm text-zinc-500">
                  <Check size={18} className="text-green-400" />
                  <span>Acesso ilimitado ao portal</span>
                </div>
                <div className="flex gap-1 items-center text-sm text-zinc-500">
                  <Check size={18} className="text-green-400" />
                  <span>Conteúdo personalizado</span>
                </div>
                <div className="flex gap-1 items-center text-sm text-zinc-500 mb-3">
                  <Check size={18} className="text-green-400" />
                  <span>Acesso à réplica digital do jornal impresso</span>
                </div>

                <button
                  className="w-52 h-10 rounded-md bg-[#FF7E7E] text-white mx-auto"
                  onClick={() => {
                    saveUser({
                      name: '',
                      email: '',
                      plan: 'Premium',
                      typePlan: typePlanPremium
                    }, false)

                    router.push('/user/signature/confirm')
                  }}
                >
                  Assinar
                </button>

              </div>

            </div>



          </div>

        </div>

        <div className="grid grid-rows-2 text-center">
          <span
            className="text-lg text-gray-400 cursor-pointer"
            onClick={() => router.push('/user/login')}>
            Já sou assinante
          </span>
          <span
            className="text-lg text-gray-400 cursor-pointer"
            onClick={() => router.push('/admin/login')}>
            Sou administrador
          </span>
        </div>
      </div>







    </div>
  )
}