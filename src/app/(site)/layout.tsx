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
      <main className="wrapper flex-1">{children}</main>
      <Footer />
    </div>
  )
}
