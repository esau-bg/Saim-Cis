import Footer from '@/app/components/footer'
import NavbarIndex from '@/components/navbar-index'
import SaimServicios from './saim-servicios'
// import NavbarIndexClient from '@/components/navbar-index-client'

export default function PageServicios ({ user }: { user: UserType }) {
  return (
    <>
    <NavbarIndex />
    <SaimServicios />
    <Footer />
    </>
  )
}
