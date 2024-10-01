import Footer from "@/components/layout/site-footer"
import Header from "@/components/layout/site-header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-col items-center">{children}</main>
      <Footer />
    </div>
  )
}
