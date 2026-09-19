/**
 * Leaderboard Domain Utilities
 * Pure helper functions for filtering, calculations, and badge formatting.
 */

/**
 * Dynamically extracts unique college filter options from leaderboard dataset.
 * @param {Array} data - List of leaderboard team objects.
 * @returns {Array<string>} Filter options starting with 'ALL'.
 */
export const getCollegeFilterOptions = (data = []) => {
  if (!Array.isArray(data)) return ['ALL'];
  const uniqueColleges = Array.from(
    new Set(data.map((item) => item?.college).filter(Boolean))
  );
  return ['ALL', ...uniqueColleges];
};

/**
 * Filters leaderboard rows by matching team, project, or college name, and college category.
 * Guarded against null or undefined object fields.
 * @param {Array} data - List of leaderboard team objects.
 * @param {string} searchTerm - Search query.
 * @param {string} filterCollege - Selected college filter ('ALL' or specific name).
 * @returns {Array} Filtered leaderboard rows.
 */
export const filterLeaderboard = (data = [], searchTerm = '', filterCollege = 'ALL') => {
  if (!Array.isArray(data)) return [];
  const normalizedSearch = (searchTerm || '').trim().toLowerCase();

  return data.filter((item) => {
    if (!item) return false;

    const team = (item.team || '').toLowerCase();
    const project = (item.project || '').toLowerCase();
    const college = (item.college || '').toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      team.includes(normalizedSearch) ||
      project.includes(normalizedSearch) ||
      college.includes(normalizedSearch);

    const matchesCollege = filterCollege === 'ALL' || item.college === filterCollege;
    return matchesSearch && matchesCollege;
  });
};

/**
 * Calculates score percentage against the maximum score threshold.
 * @param {number} score - Current team score.
 * @param {number} maxScore - Maximum possible score.
 * @returns {number} Percentage value (0 - 100).
 */
export const calculateScorePercent = (score = 0, maxScore = 10000) => {
  if (!maxScore || maxScore <= 0) return 0;
  const numericScore = Number(score) || 0;
  return Math.min(100, Math.max(0, (numericScore / maxScore) * 100));
};

/**
 * Formats a numerical rank with a leading zero and hash symbol (e.g. #01).
 * @param {number} rank - Numerical rank.
 * @returns {string} Formatted rank string.
 */
export const formatRank = (rank) => `#${String(rank || 0).padStart(2, '0')}`;

/**
 * Returns the text accent color for ranks.
 * Top 3 receive neon green (#00ff66), while others receive slate (#94a3b8).
 * @param {number} rank - Numerical rank.
 * @returns {string} Hex color code.
 */
export const getRankColor = (rank) => (rank <= 3 ? '#00ff66' : '#94a3b8');

/**
 * Returns the fill color for the score bar based on rank.
 * @param {number} rank - Numerical rank.
 * @returns {string} Hex color code.
 */
export const getScoreBarColor = (rank) => (rank === 1 ? '#00ff66' : '#00f0ff');

/**
 * Generates badge styles based on competition evaluation status.
 * @param {string} status - Evaluation status ('EVALUATED', 'LIVE DEMO', 'SUBMITTED').
 * @returns {Object} React inline style object.
 */
export const getStatusBadgeStyle = (status) => {
  const isEvaluated = status === 'EVALUATED';
  return {
    padding: '0.25rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    backgroundColor: isEvaluated ? 'rgba(0, 255, 102, 0.15)' : 'rgba(255, 183, 0, 0.15)',
    border: `1px solid ${isEvaluated ? '#00ff66' : '#ffb700'}`,
    color: isEvaluated ? '#00ff66' : '#ffb700'
  };
};

