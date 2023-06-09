import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const allCookies = cookies()
  const adminCookie = allCookies.get('admin')

  if (!adminCookie) {
    redirect('/admin/login')
  }

  return (
    <div>
      {children}
    </div>
  )
}