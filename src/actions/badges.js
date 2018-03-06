import moment from "moment";
import { ROOT_URL } from "./index";

export const ALL_BADGES = "ALL_BADGES";

export function getAllBadges(user) {
  return async dispatch => {
    var jsonData = await fetch(`${ROOT_URL}/badges`, {
      method: "GET",
      credentials: "include"
    });
    var badges = await jsonData.json();

    var calcBadgeProgress = calcBadgeProgress(badges, user);

    //altering structure to group into categories.
    var groupedBadges = [];
    for (let i = 0; i < calcBadgeProgress.length; i++) {
      var currentBadge = calcBadgeProgress[i];
      var added = false;
      for (let j = 0; j < groupedBadges.length; j++) {
        if (groupedBadges[j].category == currentBadge.category) {
          groupedBadges[j].badges.push(currentBadge);
          added = true;
          break;
        }
      }
      if (!added)
        groupedBadges.push({
          category: currentBadge.category,
          badges: [currentBadge]
        });
    }

    dispatch({
      type: ALL_BADGES,
      payload: groupedBadges
    });
  };
}

export function calcBadgeProgress(badges, user) {
  //turning session time into sessions from today and this week
  var weeksTime = [],
    daysTime = [];
  user.improvementAreas.forEach(area => {
    var areaTimeThisWeek = area.time.filter(x => {
      //need to check whether startDate is already a moment object
      return moment(x.timeStarted).isSame(Date.now(), "week");
    });
    var timeAndDate = areaTimeThisWeek.map(x => {
      var totalSessionTime = x.sessions.reduce((t, c) => {
        var diff = moment(c.timeFinished).subtract(moment(c.timeStarted));
        t.add(diff);
        return t;
      }, moment(0));
      return {
        totalTime: totalSessionTime,
        timeStarted: x.timeStarted
      };
    });
    weeksTime.concat(timeAndDate);
    var todayTimeAndDate = timeAndDate.filter(x =>
      moment(x.timeStarted).isSame(Date.now(), "day")
    );
    daysTime.concat(todayTimeAndDate);
  });

  var weekTimeTotal = weeksTime.reduce((t, c) => {
    t.add(c.totalTime);
    return t;
  }, moment(0));

  var dayTimeTotal = daysTime.reduce((t, c) => {
    t.add(c.totalTime);
    return t;
  }, moment(0));

  //calcing how close we are to badges.
  //weekbadges
  var weekBadges = badges.filter(x => x.category === "Time over a week");
  for (let i = 0; i < weekBadges.length; i++) {
    //this step probably needs to be before we do all the filtering through users times
    if (
      weekBadges[i].lastEarned &&
      moment(weekBadges[i].lastEarned).isSame(Date.now(), "week")
    ) {
      weekBadges[i].distance = 100;
      continue;
    }

    var target = moment(0).hours(weekBadges[i].target);
    if (weekTimeTotal.isAfter(target)) {
      weekBadges[i].distance = 100;
      continue;
    }

    var diff = weekTimeTotal.diff(target, "hours", true);
    var percentage = diff / weekBadges[i].target * 100;
    weekBadges[i].distance = percentage;
  }

  //dayBadges
  var dayBadges = badges.filter(x => x.category === "Time over a day");
  for (let i = 0; i < dayBadges.length; i++) {
    if (
      dayBadges[i].lastEarned &&
      moment(dayBadges[i].lastEarned).isSame(Date.now(), "day")
    ) {
      dayBadges[i].distance = 100;
      continue;
    }

    var target = moment(0).hours(dayBadges[i].target);
    if (dayTimeTotal.isAfter(target)) {
      dayBadges[i].distance = 100;
      continue;
    }

    var diff = dayTimeTotal.diff(target, "hours", true);
    var percentage = diff / dayBadges[i].target * 100;
    dayBadges[i].distance = percentage;
  }

  //calculating consecutive login days
  var last30Days = [],
    last7Days = [];
  user.improvementAreas.forEach(area => {
    area.time.forEach(entry => {
      if (
        moment(entry.timeStarted).isBetween(
          moment(),
          moment()
            .subtract(30, "days")
            .startOf("day"),
          "day",
          "[]"
        )
      ) {
        last30Days.push(entry.timeStarted);
        if (
          moment(entry.timeStarted).isBetween(
            moment(),
            moment()
              .subtract(7, "days")
              .startOf("day"),
            "day",
            "[]"
          )
        ) {
          last7Days.push(entry.timeStarted);
        }
      }
    });
  });

  //consecutive login days
  var loginBadges = badges.filter(x => x.category === "Days logged in");
  for (let i = 0; i < loginBadges.length; i++) {
    if (loginBadges[i].lastEarned) {
      //we must filter our times from this day
      var lastDays = loginBadges[i].target == 7 ? last7Days : last30Days;
      //sort in descending order
      lastDays.sort((a, b) => b - a);
      //need to make sure that all our started dates are at the beginning of the day
      var lastDay;
      for (var i = 0; i < lastDays.length; i++) {
        if (!lastDay) lastDay = lastDays[i];
        if (moment(lastDays[i]).isBefore(moment(lastDay).subtract(1, "day"))) {
          break;
        }
        lastDay = lastDays[i];
      }

      var streak = moment().diff(lastDay, "days");
      var percentage = streak / loginBadges[i].target * 100;
      loginBadges[i].distance = percentage;
    }
  }

  //we need to create a target for every period up until today.
  //then we need to add the time to that period and mark if it is completed or not.

  //then we need to combine these from every goal into a whole array of all targets.
  //if we have the whole targets to start with, we can filter to those where someone logged
  //in easily
  var totalTargetsCompleted = 0;

  var areaTargets = user.improvementAreas.map(area => {
    //creating targets from target start date;
    var createdTargets = [];
    for (let i = 0; i < area.targets.length; i++) {
      var currentTarget = area.targets[i];
      var startDateCopy = moment(currentTarget.startDate);
      while (startDateCopy.isBefore(moment())) {
        createdTargets.push({
          title: `${currentTarget.targetTime} hours over ${
            currentTarget.timePeriod
          }`,
          startDate: startDateCopy,
          finishDate: moment(
            moment(startDateCopy).add(currentTarget.timePeriod, "days")
          ),
          currentTime: moment(0),
          targetTime: currentTarget.targetTime,
          timePeriod: currentTarget.timePeriod
        });

        startDateCopy.add(currentTarget.timePeriod, "days");
      }
    }

    //adding time to created targets
    for (let j = 0; j < area.time.length; j++) {
      var currentTime = area.time[j];
      var totalFromTimePeriod = currentTime.sessions.reduce((t, c) => {
        var diff = moment(c.timeFinished).subtract(moment(c.timeStarted));
        t.add(diff);
        return t;
      }, moment(0));
      var eligibleTargets = createdTargets.filter(x =>
        currentTime.isBetween(x.startDate, x.finishDate, null, "[)")
      );
      eligibleTargets.forEach(target => {
        target.currentTime.add(totalFromTimePeriod);
      });
    }

    //going through all created targets and flagging if they are completed or not.
    for (let k = 0; k < createdTargets.length; k++) {
      var target = createdTargets[k];
      var diff = target.currentTime.diff(target.targetTime, "hours", true);
      if (target.currentTime.isSameOrAfter(target.targetTime)) {
        //calculating total targets completed
        totalTargetsCompleted++;
        target.hoursOver = diff;
      } else target.hoursOver = -diff;
    }
    return createdTargets;
  });

  //calcing % on total targets completed.
  var totalTargetBadges = badges.filter(x => x.category === "Total targets");
  for (let i = 0; i < totalTargetBadges.length; i++) {
    if (totalTargetBadges[i].lastEarned) {
      totalTargetBadges[i].distance = 100;
      continue;
    }

    var percentage = totalTargetsCompleted / loginBadges[i].target * 100;
    loginBadges[i].distance = Math.min(100, percentage);

    //add some stuff for if percentage is 100, we need to send off AJAX request to unlock badge.
  }

  //calcing total targets streak

  //we will need to exclude todays targets when calculating the percentage UNLESS they are completed.
  var combinedTargets = [];
  for (let i = 0; i < areaTargets.length; i++) {
    combinedTargets.concat(areaTargets[i]);
  }

  combinedTargets.sort((a, b) => b.startDate - a.startDate);

  var streak = 0;
  for (let i = 0; i < combinedTargets.length; i++) {
    if (combinedTargets[i].hoursOver > 0) streak++;
    else if (combinedTargets[i].startDate.isSame(moment(), "day")) continue;
    else break;
  }

  var targetStreakBadges = badges.filter(
    x => x.category === "Consecutive targets"
  );
  for (let j = 0; j < targetStreakBadges.length; j++) {
    var lastAwarded = targetStreakBadges[j].lastEarned.diff(moment(), "days");
    var streakSinceLastBadge = Math.min(lastAwarded, streak);

    var percentage = streakSinceLastBadge / targetStreakBadges[j].target * 100;
    targetStreakBadges[j].distance = Math.min(percentage, 100);
  }
}
