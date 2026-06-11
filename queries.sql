SELECT member, COUNT(result) AS denegadas FROM access_logs WHERE result = 'denied' GROUP BY member HAVING denegadas > 3  ORDER BY denegadas DESC;

