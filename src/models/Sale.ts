import User from "./User"

type Sale = {
  id: number
  user: User
  plan: string
  typePlan: string
  price: number
}

export default Sale;