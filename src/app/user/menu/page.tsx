"use client"
import { UserContext } from "@/app/context/UserContext";
import { Header } from "@/app/components/Header";
import { NewsCard } from "@/app/components/NewsCard";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface INews {
  id: string
  title: string
  text: string
  date: string
}

export default function Page() {

  const [news, setNews] = useState<INews[]>([])
  const [search, setSearch] = useState('')
  const { user } = useContext(UserContext)
  const router = useRouter()


  async function getNewsFromApi() {

    try {

      const response = await api.get('/news/get-all')

      const data = response.data

      if (data) {
        setNews(data)
      }

    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    getNewsFromApi()
  }, [])



  return (
    <div className="min-h-screen">

      <Header type="user" setSearch={setSearch} />

      <div className="h-[calc(100vh-4rem) p-5">

        <h1 className="text-2xl font-bold text-center">Notícias publicadas</h1>

        <div className="w-[44rem] mx-auto mt-10 flex flex-col gap-3">
          {
            search == '' ? news.map((item) => {
              return <NewsCard key={item.id} id={item.id} title={item.title} text={item.text} date={item.date} permissionToEdit={false} />
            }
            ) : news.filter((item) => {
              return item.title.toLowerCase().includes(search.toLowerCase())
            }
            ).map((item) => {
              return <NewsCard key={item.id} id={item.id} title={item.title} text={item.text} date={item.date} permissionToEdit={false} />
            }
            )
          }
        </div>


      </div>
    </div>
  )
}

