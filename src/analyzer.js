

function getMembersWithMostDenials(logs, topN = 3) {

  const denialCount = logs.reduce((acc, log) => {
    if (log.result === 'denied') {
      if (!acc[log.member]) {
        acc[log.member] = 0;
      }
      acc[log.member] += 1;
    }
    return acc;
  }, {});


  const formattedJson = Object.keys(denialCount).map(member => ({
    "member": member,
    "denials": denialCount[member]
  }));

  formattedJson.sort((a, b) => b.denials - a.denials);

  const topMembers = formattedJson.slice(0, topN);

  return topMembers;
}

function getHourlyBreakdown(logs) {

  const accessByHour = logs.reduce((acc, log) => {

    const hour = log.timestamp == 'not-a-date' ? 'not-a-date' : new Date(log.timestamp).getHours();
    if (!acc[hour]) {
      acc[hour] = 0;
    }
    acc[hour] += 1;
    return acc;
  }, {});


  return {
    hours: accessByHour
  };
}

function getSuspiciousActivity(logs, maxAttempts = 3, windowMinutes = 5) {

  let attempsTimestamps = [];
  let currentWindow = null;
  for (const log of logs) {
    if(currentWindow){
      const diffMinutes = (new Date(log.timestamp) - new Date(currentWindow.end)) / (1000 * 60);
      if(currentWindow.member === log.member && diffMinutes <= windowMinutes) {
        currentWindow.attempts += 1;
      } else {
        if(currentWindow.attempts >= maxAttempts) {
          attempsTimestamps.push(currentWindow);
        }
        currentWindow = null;
      }
    } 

    if(!currentWindow) {
      currentWindow = {
        member: log.member,
        start: log.timestamp,
        end: log.timestamp,
        attempts: 1
      };
    }
  }


  return {
    attempts: attempsTimestamps
  };
}

function detectRapidDenials(logs, threshold, windowMinutes) {
  const sorted = logs.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  const denials = sorted.filter(l => l.result === "denied");
  const flagged = [];
  for (let i = 0; i <= denials.length - threshold; i++) {
    const start = new Date(denials[i].timestamp);
    endDenial = denials[i + threshold - 1];
    if (endDenial.member === denials[i].member) {
      const end = new Date(endDenial.timestamp);
      const diffMinutes = (end - start) / (1000 * 60);
      if (diffMinutes <= windowMinutes) {
        flagged.push(denials[i].member);
      }
    }
  }
  return flagged;
}

module.exports = {
  getMembersWithMostDenials,
  getHourlyBreakdown,
  getSuspiciousActivity,
  detectRapidDenials
};
