import React, { useEffect, useState } from 'react';

interface GitHubStats {
  followers: number;
  publicRepos: number;
  lastActive: string;
}

export default function LiveStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const username = 'jeet2005';
        
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        
        // Fetch recent events to find last activity
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
        const eventsData = await eventsRes.json();
        
        let lastActiveStr = 'Recently';
        if (eventsData && eventsData.length > 0) {
          const lastEventDate = new Date(eventsData[0].created_at);
          const now = new Date();
          const diffHours = Math.floor((now.getTime() - lastEventDate.getTime()) / (1000 * 60 * 60));
          
          if (diffHours < 1) {
            lastActiveStr = 'Just now';
          } else if (diffHours < 24) {
            lastActiveStr = `${diffHours} hours ago`;
          } else {
            const diffDays = Math.floor(diffHours / 24);
            lastActiveStr = `${diffDays} days ago`;
          }
        }

        setStats({
          followers: userData.followers || 0,
          publicRepos: userData.public_repos || 0,
          lastActive: lastActiveStr,
        });
      } catch (err) {
        console.error('Failed to fetch GitHub stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex gap-4 opacity-50 animate-pulse">
        <div className="h-16 w-24 bg-ink-primary/10 border border-ink-faded" />
        <div className="h-16 w-24 bg-ink-primary/10 border border-ink-faded" />
        <div className="h-16 w-24 bg-ink-primary/10 border border-ink-faded" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mt-8 special-elite text-sm text-ink-secondary">
      <div className="flex flex-col border border-ink-faded p-3 bg-paper-base shadow-sm relative group hover:-translate-y-1 transition-transform">
        <span className="uppercase text-[10px] tracking-widest text-ink-accent mb-1">GitHub Repos</span>
        <span className="text-2xl text-ink-primary font-bold">{stats.publicRepos}</span>
        <div className="absolute inset-0 bg-ink-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      </div>
      
      <div className="flex flex-col border border-ink-faded p-3 bg-paper-base shadow-sm relative group hover:-translate-y-1 transition-transform">
        <span className="uppercase text-[10px] tracking-widest text-ink-accent mb-1">GitHub Followers</span>
        <span className="text-2xl text-ink-primary font-bold">{stats.followers}</span>
        <div className="absolute inset-0 bg-ink-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      </div>

      <div className="flex flex-col border border-ink-faded p-3 bg-paper-base shadow-sm relative group hover:-translate-y-1 transition-transform">
        <span className="uppercase text-[10px] tracking-widest text-ink-accent mb-1">Last Active</span>
        <span className="text-lg text-ink-primary font-bold mt-1">{stats.lastActive}</span>
        <div className="absolute inset-0 bg-ink-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      </div>
      
      <div className="flex flex-col border border-ink-faded p-3 bg-paper-base shadow-sm relative group hover:-translate-y-1 transition-transform">
        <span className="uppercase text-[10px] tracking-widest text-ink-accent mb-1">WakaTime</span>
        <span className="text-lg text-ink-primary font-bold mt-1">Actively Coding</span>
        <div className="absolute inset-0 bg-ink-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      </div>
    </div>
  );
}
