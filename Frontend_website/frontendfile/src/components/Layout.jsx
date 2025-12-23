import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Главная' },
    {
      path: '/documents',
      label: 'Документы',
      subItems: [
        { path: '/documents/council', label: 'Совет народных депутатов' },
        { path: '/documents/administration', label: 'Администрация Новоусманского муниципального района' },
        { path: '/documents/control', label: 'Контрольно-счётная палата Новоусманского муниципального района' },
        { path: '/documents/other', label: 'Иные документы' }
      ]
    },
    { path: '/about', label: 'Полезная информация' },
    { path: '/contacts', label: 'Контакты' }
  ]

  const socialLinks = [
    { icon: '/vk.png', url: 'https://vk.com/publicadmnu', label: 'ВКонтакте', isImg: true },
    { icon: '/telegram.png', url: 'https://t.me/admnusman', label: 'Telegram', isImg: true },
    { icon: '/ok.png', url: 'https://ok.ru/novousman', label: 'Одноклассники', isImg: true },
    { icon: '/max.png', url: 'https://max.ru/publicadmnu', label: 'Max', isImg: true }
  ]

  return (
    <div className="layout">
      <header className="header">
        <div className="header-top">
          <div className="logo-section">
            <img src="/gerb.png" alt="Герб" className="herb" />
          </div>
          <div className="header-text">
            <p className="header-subtitle">Официальный интернет-портал</p>
            <p className="header-subtitle">правовой информации</p>
            <p className="header-subtitle">Новоусманского муниципального района</p>
          </div>
        </div>

        <div className="header-bottom">
          <h1 className="site-title">Новоусманский вестник</h1>
        </div>

        <div style={{ flex: 1 }} />

        <div className="header-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
          <nav className="nav">
            {navItems.map(item => {
              const isActive =
                location.pathname === item.path ||
                (item.subItems && item.subItems.some(sub => location.pathname.startsWith(sub.path)))

              if (item.subItems) {
                return (
                  <div
                    key={item.path}
                    className={`nav-item has-dropdown ${isActive ? 'active' : ''}`}
                  >
                    <button
                      type="button"
                      className={`nav-link nav-link-button ${isActive ? 'active' : ''}`}
                    >
                      {item.label}
                    </button>
                    <div className="nav-dropdown">
                      {item.subItems.map(sub => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={
                            location.pathname.startsWith(sub.path)
                              ? 'nav-dropdown-link active'
                              : 'nav-dropdown-link'
                          }
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={isActive ? 'nav-link active' : 'nav-link'}
                >
                  {item.label}
                </Link>
              )
            })}
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
          <div className="footer-socials">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title={social.label}
              >
                {social.isImg ? (
                  <img src={social.icon} alt={social.label} className="footer-social-icon" />
                ) : (
                  social.icon
                )}
              </a>
            ))}
          </div>
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