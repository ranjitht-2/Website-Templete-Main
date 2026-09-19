import React, { useState, useMemo } from 'react';
import { Search, Trophy, Medal, Award, Filter } from 'lucide-react';
import { LEADERBOARD_DATA, MAX_SCORE } from '../data/leaderboardData';
import {
  filterLeaderboard,
  getCollegeFilterOptions,
  calculateScorePercent,
  formatRank,
  getRankColor,
  getScoreBarColor,
  getStatusBadgeStyle
} from '../utils/leaderboardUtils';

/**
 * Reusable Podium Card sub-component for top 3 positions.
 * Preserves exact visual hierarchy and tier styling while accepting dynamic team data safely.
 */
const PodiumCard = ({ data, position }) => {
  if (!data) return null;

  const isChampion = position === 1;
  const isRankTwo = position === 2;

  // Tier specific visual tokens
  const cardClassName = isChampion ? 'cyber-card pulse-glow' : 'cyber-card';
  const accentColor = isChampion ? '#00ff66' : isRankTwo ? '#00f0ff' : '#ffb700';
  const badgeLabel = isChampion ? 'GRAND CHAMPION' : `RANK 0${position}`;
  
  const cardStyle = {
    textAlign: 'center',
    backgroundColor: isChampion
      ? 'rgba(0, 255, 102, 0.1)'
      : isRankTwo
      ? 'rgba(0, 240, 255, 0.05)'
      : 'rgba(255, 183, 0, 0.05)',
    border: `${isChampion ? '2px' : '1px'} solid ${accentColor}`,
    padding: isChampion ? '2rem 1rem' : '1.75rem 1rem'
  };

  const iconCircleStyle = {
    width: isChampion ? '60px' : '50px',
    height: isChampion ? '60px' : '50px',
    borderRadius: '50%',
    backgroundColor: isChampion
      ? 'rgba(0, 255, 102, 0.25)'
      : isRankTwo
      ? 'rgba(0, 240, 255, 0.2)'
      : 'rgba(255, 183, 0, 0.2)',
    border: `2px solid ${accentColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: accentColor,
    margin: '0 auto 0.75rem auto',
    boxShadow: isChampion ? '0 0 25px rgba(0, 255, 102, 0.5)' : 'none'
  };

  const scoreStyle = {
    fontFamily: 'var(--font-heading)',
    fontSize: isChampion ? '1.9rem' : '1.6rem',
    fontWeight: isChampion ? '900' : 'normal',
    color: accentColor,
    marginTop: '0.75rem',
    textShadow: isChampion ? '0 0 15px #00ff66' : 'none'
  };

  return (
    <div className={cardClassName} style={cardStyle}>
      {isChampion && (
        <>
          <div className="cyber-corner-tl" />
          <div className="cyber-corner-br" />
        </>
      )}

      <div style={iconCircleStyle}>
        {isChampion ? (
          <Trophy size={32} />
        ) : isRankTwo ? (
          <Medal size={28} />
        ) : (
          <Award size={28} />
        )}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: isChampion ? '0.85rem' : '0.8rem',
          color: accentColor,
          letterSpacing: isChampion ? '2px' : 'normal'
        }}
      >
        {badgeLabel}
      </div>

      <h3 style={{ fontSize: isChampion ? '1.5rem' : '1.3rem', color: '#fff', margin: '0.25rem 0' }}>
        {data.team || 'N/A'}
      </h3>

      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
        {data.college || 'N/A'}
      </div>

      <div style={scoreStyle}>
        {data.score ?? 0} PTS
      </div>
    </div>
  );
};

const LeaderboardTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCollege, setFilterCollege] = useState('ALL');

  // Dynamic derivation of college filter options from dataset
  const collegeOptions = useMemo(
    () => getCollegeFilterOptions(LEADERBOARD_DATA),
    []
  );

  // Memoized search and filter pipeline
  const filteredData = useMemo(
    () => filterLeaderboard(LEADERBOARD_DATA, searchTerm, filterCollege),
    [searchTerm, filterCollege]
  );

  // Extract top 3 positions dynamically from active filtered dataset
  const topThree = useMemo(() => filteredData.slice(0, 3), [filteredData]);
  const firstPlace = topThree[0];
  const secondPlace = topThree[1];
  const thirdPlace = topThree[2];

  return (
    <div>
      {/* Declarative CSS for row hover states to replace imperative DOM mutations */}
      <style>{`
        .cyber-table-row {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background-color 0.2s ease;
        }
        .cyber-table-row:hover {
          background-color: rgba(0, 255, 102, 0.05) !important;
        }
      `}</style>

      {/* Top 3 Podium Design — Synced dynamically with filtered state */}
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
        {/* Render Order: Rank 2 (Left), Rank 1 (Center Champion), Rank 3 (Right) */}
        {secondPlace && <PodiumCard data={secondPlace} position={2} />}
        {firstPlace && <PodiumCard data={firstPlace} position={1} />}
        {thirdPlace && <PodiumCard data={thirdPlace} position={3} />}
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
            {collegeOptions.map((col, idx) => (
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
                <tr key={row.rank ?? row.team} className="cyber-table-row">
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

