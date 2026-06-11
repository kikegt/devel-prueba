const path = require('path');
const fs = require('fs');
const { sanitizeLogs } = require('./domain/entities/Logs');
const logs = sanitizeLogs(loadJsonFile('logs.json'));

function loadJsonFile(fileName) {
  const filePath = path.join(__dirname, 'data', fileName);
  const rawContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawContent);
}

function getMembersWithMostDenials(topN = 3) {

    const denialCount = logs.reduce((acc, log) => {
        if (log.result === 'denied') {
            if(!acc[log.member]) {
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

    formattedJson.sort((a, b) => b.denials - a.denials).slice(0, 3);
  return {
    denials: formattedJson
  };
}

function getHourlyBreakdown() {

    const accessByHour = logs.reduce((acc, log) => {
  
       const hour = log.timestamp == 'not-a-date' ? 'not-a-date' : new Date(log.timestamp).getHours();
       if(!acc[hour]) {
           acc[hour] = 0;
       }
        acc[hour] += 1;
        return acc;
    }, {});


  return {
    hours: accessByHour
  };
}

function getSuspiciousActivity(maxAttempts = 3, windowMinutes = 5) {

  let attempsTimestamps = logs.reduce((acc, log) => {
    if(!acc[log.member]) {
        acc[log.member] = [];
    }
    acc[log.member].push(log.timestamp);
    return acc;
}, {});

  for(const member in attempsTimestamps) {
    const timestamps = attempsTimestamps[member];
    let rangesByMember = [];
    timestamps.map((timestamp) => {
      if(rangesByMember.length === 0) {
        rangesByMember.push({
          start: timestamp,
          end: timestamp,
          attempts: 1
        });
      } else {
        const lastRange = rangesByMember[rangesByMember.length - 1];
        const timeDiff = (new Date(timestamp) - new Date(lastRange.start)) / 60000;
        if(Math.abs(timeDiff) <= windowMinutes) {
          lastRange.end = timestamp;
          lastRange.attempts += 1;
        } else {
          rangesByMember.push({
            start: timestamp,
            end: timestamp,
            attempts: 1
          });
        }
      }
    });
    rangesByMember = rangesByMember.filter(range => range.attempts >= maxAttempts);
    if(rangesByMember.length > 0) {
      attempsTimestamps[member] = rangesByMember;
    } else {
      delete attempsTimestamps[member];
    }
  }
  


  return {
    attempts: attempsTimestamps
  };
}

module.exports = {
  loadJsonFile,
  getMembersWithMostDenials,
  getHourlyBreakdown,
  getSuspiciousActivity
};
