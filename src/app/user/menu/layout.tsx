import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const allCookies = cookies()
  const userCookie = allCookies.get('user')

  if (!userCookie) {
    redirect('/user/login')
  }

  return (
    <div>
      {children}
    </div>
  )
}