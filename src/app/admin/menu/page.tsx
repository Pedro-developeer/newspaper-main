"use client"
import { AddNewsModal } from "@/app/components/AddNewsModal";
import { Button } from "@/app/components/Button";
import { DeleteNewsModal } from "@/app/components/DeleteNewsModal";
import { Header } from "@/app/components/Header";
import { NewsCard } from "@/app/components/NewsCard";
import { api } from "@/lib/api";
import News from "@/models/News";
import { useEffect, useState } from "react";


export default function Page() {

  const [news, setNews] = useState<News[]>([])
  const [search, setSearch] = useState('')
  const [infoModal, setInfoModal] = useState({
    addNews: false,
    editNews: false,
    info: {
      id: '',
      title: '',
      text: '',
      date: '',
    }
  })
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: ''
  })

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

  useEffect(() => {

    if (deleteModal.open == false) {
      getNewsFromApi()
    }

    if (infoModal.addNews == false || infoModal.editNews == false) {
      getNewsFromApi()
    }

  }, [infoModal, deleteModal])

  return (
    <div className="min-h-screen">

      <Header type="admin" setSearch={setSearch} />

      <div className="h-[calc(100vh-4rem) p-5">

        <h1 className="text-2xl font-bold text-center">Notícias publicadas</h1>

        <div className="w-[44rem] mt-10 mx-auto">
          <Button label="Nova publicação" onClick={() => {
            setInfoModal(state => {
              return {
                ...state,
                editNews: false,
                addNews: true
              }
            })
          }} />
        </div>

        <div className="w-[44rem] mx-auto mt-5 flex flex-col gap-3">
          {
            search == '' ? (
              news.map(item => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  text={item.text}
                  date={item.date}
                  permissionToEdit={true}
                  setInfoModal={setInfoModal}
                  setDeleteModal={setDeleteModal}
                />
              ))
            )
              :
              (
                news.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map(item => (
                  <NewsCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    text={item.text}
                    date={item.date}
                    permissionToEdit={true}
                    setInfoModal={setInfoModal}
                    setDeleteModal={setDeleteModal}
                  />
                ))
              )
          }
        </div>


      </div>
      {
        infoModal.addNews && (
          <AddNewsModal
            infoModal={infoModal}
            setInfoModal={setInfoModal}
          />
        )
      }
      {
        infoModal.editNews && (
          <AddNewsModal
            infoModal={infoModal}
            setInfoModal={setInfoModal}
          />
        )
      }

      {
        deleteModal.open && (
          <DeleteNewsModal
            id={deleteModal.id}
            open={deleteModal.open}
            setOpen={setDeleteModal}
          />
        )
      }
    </div>
  )
}