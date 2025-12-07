import { useState, useEffect } from 'react'

function MainPage() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [searchTitle, setSearchTitle] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [categories, setCategories] = useState([])
  const [advancedFilters, setAdvancedFilters] = useState({
    title: '',
    category: '',
    dateFrom: '',
    dateTo: ''
  })

  useEffect(() => {
    fetchFiles()
    fetchCategories()
  }, [])

  const fetchFiles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/look-file/')
      
      if (!response.ok) {
        throw new Error('Ошибка при загрузке файлов')
      }
      
      const data = await response.json()
      setFiles(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Ошибка:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/list-categories/')
      if (response.ok) {
        const data = await response.json()
        let catArray = []
        
        if (Array.isArray(data)) {
          catArray = data.map(cat => typeof cat === 'string' ? cat : cat.name || cat)
        } else if (typeof data === 'object') {
          catArray = Object.values(data).map(cat => typeof cat === 'string' ? cat : cat.name || cat)
        }
        
        setCategories(catArray)
      }
    } catch (err) {
      console.error('Ошибка при загрузке категорий:', err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const downloadFile = async (fileUrl, title, fileId) => {
    try {
      const url = fileUrl.startsWith('http')
        ? fileUrl
        : `${window.location.origin}${fileUrl}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/octet-stream' },
      })
      
      if (!response.ok) throw new Error('Ошибка при загрузке файла')
      
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      
      const fileExt = fileUrl.split('.').pop()
      const fileName = title.includes('.') ? title : `${title}.${fileExt}`
      
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error)
      alert('Не удалось скачать файл')
    }
  }

  const filterFiles = () => {
    return files.filter(file => {
      const titleMatch = file.title.toLowerCase().includes(searchTitle.toLowerCase())
      
      if (!showAdvanced) {
        return titleMatch
      }

      const advTitleMatch = file.title.toLowerCase().includes(advancedFilters.title.toLowerCase())
      const categoryMatch = !advancedFilters.category || file.category === advancedFilters.category
      
      let dateMatch = true
      if (advancedFilters.dateFrom || advancedFilters.dateTo) {
        const fileDate = new Date(file.uploaded_at)
        if (advancedFilters.dateFrom) {
          const dateFrom = new Date(advancedFilters.dateFrom)
          dateMatch = dateMatch && fileDate >= dateFrom
        }
        if (advancedFilters.dateTo) {
          const dateTo = new Date(advancedFilters.dateTo)
          dateMatch = dateMatch && fileDate <= dateTo
        }
      }

      return advTitleMatch && categoryMatch && dateMatch
    })
  }

  const handleAdvancedChange = (field, value) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetFilters = () => {
    setSearchTitle('')
    setAdvancedFilters({
      title: '',
      category: '',
      dateFrom: '',
      dateTo: ''
    })
  }

  const filteredFiles = filterFiles()

  const styles = {
    mainPage: { width: '100%' },
    header: { marginBottom: '2rem' },
    title: { color: '#028dbf', margin: 0, fontSize: '2.4rem', fontWeight: 600 },
    searchContainer: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '1.5rem',
      alignItems: 'center'
    },
    searchInput: {
      flex: 1,
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontFamily: 'inherit'
    },
    searchBtn: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#028dbf',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: 500
    },
    advancedBtn: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: 500
    },
    advancedPanel: {
      background: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #ddd'
    },
    filterRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    filterLabel: {
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#333'
    },
    filterInput: {
      padding: '0.5rem',
      fontSize: '0.9rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontFamily: 'inherit'
    },
    filterButtonGroup: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    resetBtn: {
      padding: '0.5rem 1rem',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.85rem'
    },
    applyBtn: {
      padding: '0.5rem 1rem',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.85rem'
    },
    loading: { textAlign: 'center', padding: '2rem', color: '#666' },
    error: { textAlign: 'center', padding: '2rem', color: '#dc3545' },
    errorBtn: {
      marginTop: '1rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    noFiles: { textAlign: 'center', padding: '2rem', color: '#666' },
    filesList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    fileItem: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderLeft: '4px solid #028dbf',
    },
    fileTitle: {
      color: '#1a2b4d',
      fontSize: '1.3rem',
      fontWeight: 600,
      margin: '0 0 0.5rem 0',
      lineHeight: '1.4',
    },
    fileMeta: {
      color: '#666',
      fontSize: '1rem',
      marginBottom: '0.5rem',
    },
    additionalMeta: {
      color: '#999',
      fontSize: '0.85rem',
      marginBottom: '0.75rem',
      lineHeight: '1.4',
    },
    downloadLink: {
      color: '#028dbf',
      textDecoration: 'none',
      fontSize: '0.95rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      cursor: 'pointer',
    },
    downloadLinkHover: { textDecoration: 'underline' },
    downloadIcon: { fontSize: '0.85rem', color: '#999' },
    downloadCount: { color: '#999', marginLeft: '0.25rem' },
  }

  if (loading) {
    return <div style={styles.loading}>Загрузка...</div>
  }

  if (error) {
    return (
      <div style={styles.error}>
        <p>Ошибка: {error}</p>
        <button onClick={fetchFiles} style={styles.errorBtn}>
          Попробовать снова
        </button>
      </div>
    )
  }

  return (
    <div style={styles.mainPage}>
      <div style={styles.header}>
        <h1 style={styles.title}>Список файлов</h1>
      </div>

      {!showAdvanced && (
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск по заголовку..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.advancedBtn} onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? '✕ Свернуть поиск' : '⚙ Расширенный поиск'}
          </button>
        </div>
      )}

      {showAdvanced && (
        <div style={styles.advancedPanel}>
          <div style={styles.filterRow}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Заголовок</label>
              <input
                type="text"
                placeholder="Введите заголовок..."
                value={advancedFilters.title}
                onChange={(e) => handleAdvancedChange('title', e.target.value)}
                style={styles.filterInput}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Категория</label>
              <select
                value={advancedFilters.category}
                onChange={(e) => handleAdvancedChange('category', e.target.value)}
                style={styles.filterInput}
              >
                <option value="">Все категории</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={String(cat)}>{String(cat)}</option>
                ))}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>От даты</label>
              <input
                type="date"
                value={advancedFilters.dateFrom}
                onChange={(e) => handleAdvancedChange('dateFrom', e.target.value)}
                style={styles.filterInput}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>До даты</label>
              <input
                type="date"
                value={advancedFilters.dateTo}
                onChange={(e) => handleAdvancedChange('dateTo', e.target.value)}
                style={styles.filterInput}
              />
            </div>
          </div>

          <div style={styles.filterButtonGroup}>
            <button style={styles.applyBtn} onClick={() => setShowAdvanced(false)}>
              Применить
            </button>
            <button style={styles.resetBtn} onClick={resetFilters}>
              Сбросить фильтры
            </button>
          </div>
        </div>
      )}

      {filteredFiles.length === 0 ? (
        <div style={styles.noFiles}>
          {files.length === 0 ? 'Файлы не найдены' : 'По вашему запросу файлы не найдены'}
        </div>
      ) : (
        <div style={styles.filesList}>
          {filteredFiles.map((file) => (
            <div key={file.id} style={styles.fileItem}>
              
              <div style={styles.fileTitle}>{file.title}</div>

              <div style={styles.fileMeta}>
                Тип: {file.category} • Дата: {formatDate(file.uploaded_at)}
              </div>

              {(file.number || file.issuing_body) && (
                <div style={styles.additionalMeta}>
                  {file.number && <div>№: {file.number}</div>}
                  {file.issuing_body && <div>Издающий орган: {file.issuing_body}</div>}
                </div>
              )}

              {file.files && file.files.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {file.files.map((item) => (
                    <a
                      key={item.id}
                      href={item.file}
                      onClick={(e) => {
                        e.preventDefault()
                        downloadFile(item.file, file.title, item.id)
                      }}
                      style={{
                        ...styles.downloadLink,
                        ...(hoveredCard === item.id ? styles.downloadLinkHover : {})
                      }}
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <span style={styles.downloadIcon}>↓</span>
                       {item.context} ({item.format})
                    </a>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MainPage