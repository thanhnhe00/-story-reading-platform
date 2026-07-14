import { useState, useEffect } from 'react';
import { Flame, TrendingUp, Clock } from 'lucide-react';
import StoryGrid from '../../components/common/StoryGrid';
import storyService from '../../api/storyService';
import './Home.css';

export default function Home() {
  const [latestStories, setLatestStories] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const latest = await storyService.getLatestStories(12);
        setLatestStories(latest);
        
        // Giả sử BE có endpoint trending
        // const trending = await storyService.getTrendingStories(12);
        // setTrendingStories(trending);
        setTrendingStories(latest.slice(0, 6)); // Tạm thời dùng latest làm trending
      } catch (err) {
        setError(err.message);
        console.error('Error fetching stories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <p>Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Banner */}
      <section className="home-banner">
        <div className="banner-content">
          <h1>Chào mừng đến Nền tảng Truyện Tranh</h1>
          <p>Khám phá những câu chuyện tuyệt vời từ khắp nơi</p>
        </div>
      </section>

      {/* Trending Section */}
      <section className="home-section">
        <div className="section-header">
          <div className="section-title">
            <Flame size={24} className="icon-hot" />
            <h2>🔥 Đang Hot</h2>
          </div>
          <a href="/hot" className="view-all">Xem tất cả →</a>
        </div>
        <StoryGrid stories={trendingStories} isLoading={loading} />
      </section>

      {/* Latest Section */}
      <section className="home-section">
        <div className="section-header">
          <div className="section-title">
            <Clock size={24} />
            <h2>⏰ Cập nhật gần đây</h2>
          </div>
          <a href="/hot" className="view-all">Xem tất cả →</a>
        </div>
        <StoryGrid stories={latestStories} isLoading={loading} />
      </section>
    </div>
  );
}
