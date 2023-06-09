'use client'
import { Header } from "@/app/components/Header"
import { api } from "@/lib/api"
import News from "@/models/News"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"

export default function page({ params }: {
  params: { id: string }
}) {

  const [news, setNews] = useState<News>({} as News)

 async function getDataNewsFromApi() {
    const url = `http://localhost:8080/news/get-by-id/${params.id}`

    try {
      const response = await api.get(url)
      const news = await response.data
      setNews(news)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataNewsFromApi()
  }, [])

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd MMMM, yyyy', { locale: ptBR })
    const day = format(date, 'd', { locale: ptBR })
    const formattedMonth = format(date, 'MMMM', { locale: ptBR })
    const year = format(date, 'yyyy', { locale: ptBR })

    return `${day} de ${formattedMonth}, ${year}`
  }

  return (
    <div className="min-h-screen">
      <Header type="login" />

      <div className="w-full py-10 px-32">

        <div className="flex flex-col gap-1">
          <h1
            className="text-2xl font-bold"
          >
            {
              news.title
            }
          </h1>

          <span className="text-zinc-600">
            {
              news.date && formatDate(news.date)
            }
          </span>
        </div>

        <div className="mt-10">
          <p className="leading-relaxed">
            {
              news.text
            }
          </p>
        </div>

      </div>

    </div>
  )
}
