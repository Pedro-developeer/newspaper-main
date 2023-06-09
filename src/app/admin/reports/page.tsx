"use client"
import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { api } from "@/lib/api";
import Sale from "@/models/Sale";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

export default function Reports() {

  const [sales, setSales] = useState<Sale[]>([])
  const [search, setSearch] = useState('')

  const notify = (message: string) => toast(message, {
    duration: 2000,
    style: {
      //error
      backgroundColor: '#EF4444',
      color: '#fff',
      fontWeight: 'bold',
    }
  });

  async function getSales() {
    try {

      const response = await api.get('/sale/get-all')

      const data = response.data

      setSales(data)
      console.log(data)

    } catch (error) {
      notify('Erro ao carregar as vendas')
    }
  }


  async function downloadReport() {
    try {
      const response = await api.get('/sale/get-report', {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'report.pdf')
      document.body.appendChild(link)

      link.click()

      window.URL.revokeObjectURL(url)
    } catch (error) {
      notify('Erro ao gerar o relatório')
    }
  }

  useEffect(() => {
    getSales()
  }, [])

  const totalAmount = sales.reduce((acc, item) => {
    return acc + item.price
  }, 0)

  return (
    <div className="min-h-screen">

      <Header type="admin" setSearch={setSearch} />

      <div className="h-[calc(100vh-4rem) py-5 px-40">

        <h1 className="text-2xl font-bold text-center">Vendas</h1>

        <div className="w-full mx-auto mt-20 flex flex-col gap-3">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium bg-zinc-400">
              <tr>
                <th scope="col" className="px-6 py-4">Nome</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4">Plano</th>
                <th scope="col" className="px-6 py-4">Tipo do plano</th>
                <th scope="col" className="px-6 py-4">Preço</th>
              </tr>
            </thead>
            <tbody>
              {
                search == '' ? (
                  sales.map(item => (
                    <tr key={item.id} className="border-b bg-white">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.user.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.user.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.user.plan}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.user.typePlan}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {
                          (item.price / 100).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                          })
                        }
                      </td>
                    </tr>
                  ))
                ) : (
                  sales.filter(item => item.user.name.toLowerCase().includes(search.toLowerCase())).map(item => (
                    <tr key={item.id} className="border-b bg-white">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.user.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.user.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.user.plan}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.user.typePlan}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {
                          (item.price / 100).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                          })
                        }
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>

        <div className="w-full mt-10 flex items-center justify-between">

          <div className="w-1/3" />

          <div className="w-1/3 flex justify-center">
            <div className="w-64">
              <Button label="Imprimir relatório" onClick={downloadReport} />
            </div>
          </div>

          <span className="font-bold w-1/3 text-end">
            Total: {
              (totalAmount / 100).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
              })
            }
          </span>

        </div>


      </div>
    </div>
  )
}