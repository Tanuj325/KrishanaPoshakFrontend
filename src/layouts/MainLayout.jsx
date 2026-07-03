import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTransition from '../components/ui/PageTransition'

function MainLayout() {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

