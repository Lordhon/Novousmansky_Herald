import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/documents', label: 'Документы' },
    { path: '/about', label: 'Полезная информация' },
    { path: '/contacts', label: 'Контакты' }
  ]

  return (
    <div className="layout">
      <header className="header">
        <div className="header-top">
          <div className="logo-section">
            <img src="/gerb.png" alt="Герб" className="herb" />
          </div>
          <div className="header-text">
            <p className="header-subtitle">Официальный архив</p>
            <p className="header-subtitle">правовой документации</p>
            <p className="header-subtitle">Новоусманского муниципального района</p>
          </div>
        </div>

        <div className="header-bottom">
          <h1 className="site-title">Новоусманский вестник</h1>
        </div>

        <div style={{ flex: 1 }} />

        <div className="header-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
          <nav className="nav">
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'nav-link active' : 'nav-link'}
              >
                {item.label}
              </Link>
            ))}
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
          <p className="footer-copyright">
            &copy; 2025 Новоусманский вестник. Все права защищены.
          </p>
          <p className="footer-developer">
            Разработано <a href="https://rfqbit.ru/" target="_blank" rel="noopener noreferrer">ООО "КУБИТ"</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout