import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [posts, setPosts] = useState([])
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/posts')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load posts.')
        return response.json()
      })
      .then((data) => {
        if (!cancelled) setPosts(data.posts ?? [])
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!image) {
      setError('Please choose an image before uploading.')
      return
    }

    const formData = new FormData()
    formData.append('image', image)
    formData.append('caption', caption)

    try {
      setUploading(true)
      setError('')
      const response = await fetch('/create-post', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Upload failed. Please try again.')
      const data = await response.json()
      setPosts((currentPosts) => [data.post, ...currentPosts])
      setCaption('')
      setImage(null)
      event.target.reset()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">YOUR IMAGE SPACE</p>
          <h1>Share something beautiful.</h1>
          <p className="intro">Upload a photo and see it appear in your collection instantly.</p>
        </div>
        <div className="post-count"><strong>{posts.length}</strong><span>posts</span></div>
      </header>

      <section className="content">
        <form className="upload-card" onSubmit={handleSubmit}>
          <div>
            <p className="section-label">NEW POST</p>
            <h2>Add to your collection</h2>
          </div>
          <label className="file-picker">
            <span>{image ? image.name : 'Choose an image'}</span>
            <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])} />
          </label>
          <input
            className="caption-input"
            type="text"
            placeholder="Write a caption (optional)"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
          <button type="submit" disabled={uploading}>{uploading ? 'Uploading…' : 'Upload post'}</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        <section className="gallery">
          <div className="gallery-heading"><p className="section-label">COLLECTION</p><h2>Recent posts</h2></div>
          {loading ? <p className="status">Loading your posts…</p> : posts.length === 0 ? (
            <p className="status">No posts yet. Upload your first image above.</p>
          ) : (
            <div className="post-grid">
              {posts.map((post) => (
                <article className="post-card" key={post._id}>
                  <img src={post.image} alt={post.caption || 'Uploaded post'} />
                  {post.caption && <p>{post.caption}</p>}
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default App