import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Star, ArrowLeft, Download } from 'lucide-react';
import storyService from '../../api/storyService';
import readerService from '../../api/readerService';
import { useAuth } from '../../context/AuthContext';
import './StoryDetail.css';

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true);
        const storyData = await storyService.getStoryDetail(id);
        setStory(storyData);
        
        const chaptersData = await storyService.getChapters(id);
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [id]);

  const handleFollow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (isFollowed) {
        await readerService.unfollowStory(id);
      } else {
        await readerService.followStory(id);
      }
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!story) {
    return <div className="error">Không tìm thấy truyện</div>;
  }

  return (
    <div className="story-detail">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Quay lại
      </button>

      {/* Story Header */}
      <div className="story-header">
        <div className="story-cover">
          <img src={story.coverImage || 'https://via.placeholder.com/280x400'} alt={story.title} />
        </div>

        <div className="story-meta">
          <h1 className="story-title">{story.title}</h1>
          <p className="story-author">Tác giả: {story.author}</p>
          
          <div className="story-stats">
            <div className="stat">
              <Star size={18} />
              <span>{story.rating || 0} / 5</span>
            </div>
            <div className="stat">
              <span>👁️ {story.views?.toLocaleString() || 0} lượt xem</span>
            </div>
          </div>

          <p className="story-description">{story.description}</p>

          <div className="story-info-grid">
            <div className="info-item">
              <span className="label">Trạng thái:</span>
              <span className="value">{story.status || 'Đang cập nhật'}</span>
            </div>
            <div className="info-item">
              <span className="label">Thể loại:</span>
              <span className="value">
                {story.categories?.map(c => c.name).join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Chương:</span>
              <span className="value">{chapters.length}</span>
            </div>
          </div>

          <div className="story-actions">
            <button className="action-btn primary" onClick={() => {
              if (chapters.length > 0) {
                navigate(`/read/${id}/${chapters[0].number}`);
              }
            }}>
              📖 Đọc Ngay
            </button>
            <button className={`action-btn ${isFollowed ? 'following' : ''}`} onClick={handleFollow}>
              <Heart size={18} fill={isFollowed ? 'currentColor' : 'none'} />
              {isFollowed ? 'Đã theo dõi' : 'Theo dõi'}
            </button>
            <button className="action-btn">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="chapters-section">
        <h2>Danh sách chương ({chapters.length})</h2>
        <div className="chapters-list">
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <div key={chapter.id} className="chapter-item">
                <a href={`/read/${id}/${chapter.number}`} className="chapter-link">
                  <span className="chapter-number">Chương {chapter.number}</span>
                  <span className="chapter-title">{chapter.title}</span>
                  <span className="chapter-date">{new Date(chapter.createdAt).toLocaleDateString('vi-VN')}</span>
                </a>
              </div>
            ))
          ) : (
            <p className="no-chapters">Chưa có chương nào</p>
          )}
        </div>
      </div>
    </div>
  );
}
