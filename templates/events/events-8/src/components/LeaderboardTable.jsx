import React, { useState } from 'react';
import { Search, Trophy, Medal, Award, Filter } from 'lucide-react';
import { LEADERBOARD_DATA, COLLEGES_FILTER_OPTIONS, MAX_SCORE } from '../data/leaderboardData';
import {
  filterLeaderboard,
  calculateScorePercent,
  formatRank,
  getRankColor,
  getScoreBarColor,
  getStatusBadgeStyle
} from '../utils/leaderboardUtils';

const LeaderboardTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCollege, setFilterCollege] = useState('ALL');

  const filteredData = filterLeaderboard(LEADERBOARD_DATA, searchTerm, filterCollege);

  return (
    <div>
      {/* Top 3 Podium Design */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
          alignItems: 'stretch',
          width: '100%'
        }}
      >
        {/* Rank 2 */}
        <div
          className="cyber-card"
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(0, 240, 255, 0.05)',
            border: '1px solid #00f0ff',
            padding: '1.75rem 1rem'
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 240, 255, 0.2)',
              border: '2px solid #00f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00f0ff',
              margin: '0 auto 0.75rem auto'
            }}
          >
            <Medal size={28} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00f0ff' }}>RANK 02</div>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '0.25rem 0' }}>{LEADERBOARD_DATA[1].team}</h3>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{LEADERBOARD_DATA[1].college}</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#00f0ff', marginTop: '0.75rem' }}>
            {LEADERBOARD_DATA[1].score} PTS
          </div>
        </div>

        {/* Rank 1 (Center Champion) */}
        <div
          className="cyber-card pulse-glow"
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(0, 255, 102, 0.1)',
            border: '2px solid #00ff66',
            padding: '2rem 1rem'
          }}
        >
          <div className="cyber-corner-tl" />
          <div className="cyber-corner-br" />
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 255, 102, 0.25)',
              border: '2px solid #00ff66',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00ff66',
              margin: '0 auto 0.75rem auto',
              boxShadow: '0 0 25px rgba(0, 255, 102, 0.5)'
            }}
          >
            <Trophy size={32} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#00ff66', letterSpacing: '2px' }}>
            GRAND CHAMPION
          </div>
          <h3 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.25rem 0' }}>{LEADERBOARD_DATA[0].team}</h3>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{LEADERBOARD_DATA[0].college}</div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.9rem',
              fontWeight: '900',
              color: '#00ff66',
              marginTop: '0.75rem',
              textShadow: '0 0 15px #00ff66'
            }}
          >
            {LEADERBOARD_DATA[0].score} PTS
          </div>
        </div>

        {/* Rank 3 */}
        <div
          className="cyber-card"
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 183, 0, 0.05)',
            border: '1px solid #ffb700',
            padding: '1.75rem 1rem'
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 183, 0, 0.2)',
              border: '2px solid #ffb700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffb700',
              margin: '0 auto 0.75rem auto'
            }}
          >
            <Award size={28} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#ffb700' }}>RANK 03</div>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '0.25rem 0' }}>{LEADERBOARD_DATA[2].team}</h3>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{LEADERBOARD_DATA[2].college}</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#ffb700', marginTop: '0.75rem' }}>
            {LEADERBOARD_DATA[2].score} PTS
          </div>
        </div>
      </div>

      {/* Controls: Search & College Filter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          width: '100%'
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '0', width: '100%' }}>
          <Search size={18} color="#00ff66" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search team or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cyber-input"
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 200px', width: '100%' }}>
          <Filter size={16} color="#00ff66" />
          <select
            value={filterCollege}
            onChange={(e) => setFilterCollege(e.target.value)}
            className="cyber-input"
            style={{ minWidth: '0', width: '100%', cursor: 'pointer' }}
          >
            {COLLEGES_FILTER_OPTIONS.map((col, idx) => (
              <option key={idx} value={col} style={{ backgroundColor: '#050505', color: '#fff' }}>
                {col === 'ALL' ? 'All Colleges' : col}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leaderboard Data Table */}
      <div className="table-scroll-container" style={{ borderRadius: '8px', border: '1px solid rgba(0, 255, 102, 0.2)' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            textAlign: 'left',
            backgroundColor: 'rgba(5, 8, 6, 0.9)'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'rgba(0, 255, 102, 0.1)',
                borderBottom: '1px solid #00ff66',
                color: '#00ff66'
              }}
            >
              <th style={{ padding: '1rem' }}>RANK</th>
              <th style={{ padding: '1rem' }}>TEAM NAME</th>
              <th style={{ padding: '1rem' }}>COLLEGE</th>
              <th style={{ padding: '1rem' }}>PROJECT</th>
              <th style={{ padding: '1rem' }}>CHALLENGES</th>
              <th style={{ padding: '1rem' }}>SCORE BAR</th>
              <th style={{ padding: '1rem' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => {
              const scorePercent = calculateScorePercent(row.score, MAX_SCORE);
              return (
                <tr
                  key={row.rank}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 255, 102, 0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '1rem', fontWeight: '700', color: getRankColor(row.rank) }}>
                    {formatRank(row.rank)}
                  </td>
                  <td style={{ padding: '1rem', color: '#ffffff', fontWeight: '600' }}>{row.team}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{row.college}</td>
                  <td style={{ padding: '1rem', color: '#00f0ff' }}>{row.project}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{row.challenges} / 5</td>
                  <td style={{ padding: '1rem', minWidth: '180px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ flex: 1, height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${scorePercent}%`,
                            height: '100%',
                            backgroundColor: getScoreBarColor(row.rank),
                            boxShadow: '0 0 8px #00ff66'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '700' }}>{row.score}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={getStatusBadgeStyle(row.status)}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
