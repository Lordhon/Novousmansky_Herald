import { useState, useEffect } from 'react'

function HomePage() {
  const [latestFiles, setLatestFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [downloadCounts, setDownloadCounts] = useState({})

  useEffect(() => {
    fetchLatestFiles()
  }, [])

  const fetchLatestFiles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/latest-files/')
      if (!response.ok) throw new Error('Ошибка при загрузке файлов')
      const data = await response.json()
      setLatestFiles(data)
    } catch (err) {
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
      const url = fileUrl.startsWith('http') ? fileUrl : `${window.location.origin}${fileUrl}`
      const response = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/octet-stream' } })
      if (!response.ok) throw new Error('Ошибка при загрузке файла')
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      const fileExtension = fileUrl.split('.').pop()
      const fileName = title.includes('.') ? title : `${title}.${fileExtension}`
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
    homePage: { width: '100%' },
    sectionTitle: { color: '#028dbf', fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.5rem' },
    filesList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    fileItem: { background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #028dbf' },
    fileTitle: { color: '#1a2b4d', fontSize: '1.3rem', fontWeight: 600, margin: '0 0 0.5rem 0', lineHeight: '1.4' },
    fileMeta: { color: '#666', fontSize: '1em', marginBottom: '0.5rem' },
    downloadLink: { color: '#028dbf', textDecoration: 'none', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' },
    downloadLinkHover: { textDecoration: 'underline' },
    downloadIcon: { fontSize: '0.85rem', color: '#999' },
    downloadCount: { color: '#999', marginLeft: '0.25rem' },
    loading: { textAlign: 'center', padding: '2rem', color: '#666' },
  }

  return (
    <div style={styles.homePage}>
      <h2 style={styles.sectionTitle}>Последние опубликованные документы</h2>
      {loading ? (
        <div style={styles.loading}>Загрузка...</div>
      ) : latestFiles.length === 0 ? (
        <div style={styles.loading}>Документы не найдены</div>
      ) : (
        <div style={styles.filesList}>
          {latestFiles.map((file) => (
            <div key={file.id} style={styles.fileItem}>
              <div style={styles.fileTitle}>{file.title}</div>
              <div style={styles.fileMeta}>
                Тип: {file.category} • Дата: {formatDate(file.uploaded_at)}
              </div>

              {file.files && file.files.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {file.files.map((item) => (
                    <a
                      key={item.id}
                      href={item.file}
                      onClick={(e) => { e.preventDefault(); downloadFile(item.file, file.title, item.id) }}
                      style={{ ...styles.downloadLink, ...(hoveredCard === item.id ? styles.downloadLinkHover : {}) }}
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

export default HomePage