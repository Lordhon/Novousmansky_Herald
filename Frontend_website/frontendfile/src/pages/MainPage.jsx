import { useState, useEffect } from 'react'

function MainPage() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [downloadCounts, setDownloadCounts] = useState({})

  useEffect(() => {
    fetchFiles()
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
      
      setDownloadCounts(prev => ({
        ...prev,
        [fileId]: (prev[fileId] || 0) + 1
      }))
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error)
      alert('Не удалось скачать файл')
    }
  }

  const styles = {
    mainPage: { width: '100%' },
    header: { marginBottom: '2rem' },
    title: { color: '#028dbf', margin: 0, fontSize: '2.4rem', fontWeight: 600 },
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

      {files.length === 0 ? (
        <div style={styles.noFiles}>Файлы не найдены</div>
      ) : (
        <div style={styles.filesList}>
          {files.map((file) => (
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
                      {downloadCounts[item.id] > 0 && (
                        <span style={styles.downloadCount}>
                          (загружено {downloadCounts[item.id]} {downloadCounts[item.id] === 1 ? 'раз' : downloadCounts[item.id] < 5 ? 'раза' : 'раз'})
                        </span>
                      )}
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
