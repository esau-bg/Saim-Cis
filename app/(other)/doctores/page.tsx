import Footer from '@/app/components/footer'
import NavbarIndex from '@/components/navbar-index'
import SaimDoctores from './saim-doctor'
// import NavbarIndexClient from '@/components/navbar-index-client'

export default function PageDoctores ({ user }: { user: UserType }) {
  return (
    <>
    <NavbarIndex />
    <SaimDoctores />
    <Footer />
    </>
  )
}
