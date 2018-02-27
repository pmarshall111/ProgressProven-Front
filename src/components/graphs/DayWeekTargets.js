import React, { Component } from "react";
import * as d3 from "d3";
import moment from "moment";

var improvementArea = {
  targets: [],
  time: []
};

for (var i = 0; i < 3; i++) {
  var randomMonth = Math.floor(Math.random() * 12) + 1;
  var randomDay = Math.floor(Math.random() * 28) + 1;
  var randomInterval = ["day", "week"][Math.floor(Math.random() * 2)];
  var startDate = moment(`2017-${randomMonth}-${randomDay}`, "YYYY-MM-DD");
  //setting the startdate to sunday. need to differentiate whether its a week or day
  if (randomInterval == "week") startDate.day(-7);
  improvementArea.targets.push({
    title: `${i + 2} hours per ${randomInterval}`,
    startDate: moment(`2017-${randomMonth}-${randomDay}`, "YYYY-MM-DD"),
    targetTime: i + 2,
    timePeriod: { day: 1, week: 7 }[randomInterval]
  });
}

var minStartDate = improvementArea.targets.sort((a, b) => {
  return b.startDate.isBefore(a.startDate);
})[0].startDate;

var weekDay = minStartDate.day();
minStartDate.subtract(weekDay, "days");

console.log(improvementArea.targets, minStartDate);

for (var j = 0; j < 200; j++) {
  var randomMonth = Math.floor(Math.random() * 12) + 1;
  var randomDay = Math.floor(Math.random() * 28) + 1;
  if (new Date(minStartDate).getMonth() >= randomMonth) continue;

  var randomHour = Math.floor(Math.random() * 6) + 1;

  var createdDate = moment(`2017-${randomMonth}-${randomDay}`, "YYYY-MM-DD");
  var finishDate = moment(
    `2017-${randomMonth}-${randomDay}`,
    "YYYY-MM-DD"
  ).hours(randomHour);

  improvementArea.time.push({
    startDate: createdDate,
    finishDate: finishDate,
    currentTime: randomHour
  });
}

console.log(improvementArea.time);

var lastTime = improvementArea.time.sort((a, b) => {
  a = a.startDate;
  b = b.startDate;
  return b - a;
})[0];
console.log({ lastTime });
lastTime = lastTime.finishDate;

export default class DayWeekTargets extends Component {
  componentDidMount() {
    var dummyData = improvementArea;

    console.log({ minStartDate, lastTime });

    var daysBetween = lastTime.diff(minStartDate, "days");
    var numbTargets = dummyData.targets.length;

    var svg = d3.select("#day-week-targets");

    var blockHeight = 30;

    var padding = 50;
    var height = numbTargets * blockHeight + padding * 2;
    var width = daysBetween * 10 + padding * 2;

    console.log({ height, width });

    svg.attr("width", width);
    svg.attr("height", height);

    var g = svg
      .append("g")
      .style("transform", `translate(${padding}px, ${padding}px)`);

    var xAxis = d3
      .scaleTime()
      .domain([minStartDate, lastTime])
      .range([padding, width]);

    //next step is to add ordinal scale to map y axis point

    improvementArea.targets.sort((a, b) => a.timePeriod - b.timePeriod);

    console.log(improvementArea.targets.map(x => x.title));

    var yAxisRange = [];
    for (let i = 0; i < improvementArea.targets.length; i++) {
      yAxisRange.push(padding + i * 30);
    }

    var yAxis = d3
      .scaleOrdinal()
      .domain(improvementArea.targets.map(x => x.title))
      .range(yAxisRange);

    var xAxisLine = g
      .append("g")
      .style(
        "transform",
        `translate(0px, ${height - padding - blockHeight / 2 + 5}px)`
      )
      .call(d3.axisBottom(xAxis));

    var yAxisLine = g
      .append("g")
      .style("transform", `translate(${padding - 5}px, 0)`)
      .call(d3.axisLeft(yAxis));

    var data = [];

    for (let i = improvementArea.time.length - 1; i >= 0; i--) {
      for (let j = 0; j < improvementArea.targets.length; j++) {
        var currentTime = improvementArea.time[i],
          currentTarget = improvementArea.targets[j];

        var inData = data.filter(
          x =>
            x.targetTime == currentTarget.targetTime &&
            x.timePeriod == currentTarget.timePeriod &&
            currentTime.startDate.isBetween(
              x.startDate,
              x.finishDate,
              null,
              "[)"
            )
        );

        if (inData.length) {
          inData[0].currentTime += +currentTime.currentTime;
        } else {
          if (currentTime.startDate.isBefore(currentTarget.startDate)) continue;

          // console.log(currentTime.startDate);

          var workingStartDate = moment(currentTime.startDate);
          //if day, we can just add a thing for that day. if week, we can add starting at the nearest Sunday
          var dayOfWeek = workingStartDate.day();
          if (currentTarget.timePeriod == 7) {
            //dont need to check which day it is as the day method gives us the number of days from last sunday
            workingStartDate.subtract(dayOfWeek, "days");
          }
          data.push({
            title: currentTarget.title,
            startDate: workingStartDate,
            finishDate: moment(
              moment(workingStartDate).add(currentTarget.timePeriod, "days")
            ),
            currentTime: currentTime.currentTime,
            targetTime: currentTarget.targetTime,
            timePeriod: currentTarget.timePeriod
          });
        }
      }
    }

    console.log(data);

    //selection
    var rect = g.selectAll("rect").data(data);

    rect
      .enter()
      .append("rect")
      .attr("x", d => {
        var begin = d.startDate.toDate();
        return xAxis(begin);
      })
      .attr("width", d => {
        var begin = d.startDate.toDate();
        var end = d.finishDate.toDate();
        return xAxis(end) - xAxis(begin);
      })
      .attr("y", d => yAxis(d.title) - blockHeight / 2)
      .attr("height", blockHeight)
      .attr("fill", "red");
  }
  render() {
    return (
      <div>
        <svg id="day-week-targets" height="300" width="900" />
      </div>
    );
  }
}
