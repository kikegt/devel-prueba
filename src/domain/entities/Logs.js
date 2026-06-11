function fallback(value, replacement, type = 'string') {
  if(type === 'date') {
    try {
      return new Date(value);
    } catch (error) {
      return replacement;
    }
  }
  return value === null || value === undefined || value === '' ? replacement : value;

}

function sanitizeLog(rawLog = {}) {
  const normalized = {
    id: fallback(rawLog.id, 'id desconocido'),
    member: fallback(rawLog.member, 'miembro desconocido'),
    action: fallback(rawLog.action, 'acción desconocida'),
    result: fallback(rawLog.result, 'resultado desconocido').toLowerCase(),
    timestamp: fallback(rawLog.timestamp, 'not-a-date'),
  };

  return normalized;
}

function sanitizeLogs(rawLogs = []) {
  if (Array.isArray(rawLogs)) {
    const sanitized = rawLogs.map((entry) => sanitizeLog(entry));
    sanitized.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    return sanitized;
  }

  if (rawLogs && typeof rawLogs === 'object') {
    return [sanitizeLog(rawLogs)];
  }

  return [];
}

module.exports = {
  sanitizeLog,
  sanitizeLogs,
};
