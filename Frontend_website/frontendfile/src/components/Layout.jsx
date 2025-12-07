import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/gerb.png" alt="Герб" className="herb" />
            <h1 className="site-title">Новоусманский вестник</h1>
          </div>
          <nav className="nav">
            <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Главная</Link>
            <Link to="/documents" className={location.pathname === '/documents' ? 'nav-link active' : 'nav-link'}>Документы</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>Полезная информация</Link>
            <Link to="/сontacts" className={location.pathname === '/сontacts' ? 'nav-link active' : 'nav-link'}>Контакты</Link>
            
            
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2025 Новоусманский вестник. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout