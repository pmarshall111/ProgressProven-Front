import React, { Component } from "react";
import * as d3 from "d3";
import moment from "moment";

export default class LineGraph extends Component {
  componentDidMount() {
    const { data, period } = this.props;
    //we need to go through each of the data points and turn every session into a point. also sort the times
    var areas = data.map(x => {
      var points = [],
        totalTime = moment(0, "HH");
      x.time.sort((a, b) => {
        if (a.timeStarted.isBefore(b.timeStarted)) return -1;
        return 1;
      });
      for (var i = 0; i < x.time.length; i++) {
        x.time[i].sessions.sort((a, b) => {
          if (a.timeStarted.isBefore(b.timeStarted)) return -1;
          return 1;
        });
        for (var j = 0; j < x.time[i].sessions.length; j++) {
          //calc hours
          var session = x.time[i].sessions[j];
          var diff = session.timeStarted.diff(
            session.timeFinished,
            "hours",
            true
          );
          //possible issue if hours bubble over into days
          var hours = moment(diff, "HH").add(totalTime, "hours");
          points.push({ date: session.timeStarted, hours });
        }
      }

      return { area: x.subject, points };
    });

    var earliestDate = areas[0].points[0].startOf(period);
    var latestDate = areas[0].points[0].endOf(period);

    //adding in earliest point plus latest point to all lines
    areas.forEach(area => {
      if (area.points[0].isAfter(earliestDate))
        area.points.unshift({ date: earliestDate, hours: 0 });
      var endingDate = latestDate.isBefore(moment()) ? latestDate : moment();
      area.points.push({
        date: endingDate,
        hours: area.points[area.points.length - 1].hours
      });
    });

    //creating scales
    var xAxis = d3
      .scaleTime()
      .range([padding, width - padding])
      .domain([earliestDate, latestDate]);

    var yAxis = d3
      .scaleLinear()
      .range([height - padding, padding])
      .domain([0, d3.max(data, d => d.size)]);

    var line = d3
      .line()
      .x(d => xAxis(d.createdDate))
      .y(d => yAxis(d.size))
      .curve(d3.curveStepAfter);

    // var colour = d3.scaleOrdinal(d3.schemeSet1);

    //working with dom

    var svg = d3.select(`line-graph-${period}`);

    var padding = 50;
    var width = +svg.attr("width");
    var height = +svg.attr("height");

    var g = svg.append("g");

    var paths = [];

    function init() {
      var xAxisLine = g
        .append("g")
        .call(d3.axisBottom(xAxis))
        .classed("x-axis-line", true)
        .style("transform", `translate(0, ${height - padding}px)`);

      var yAxisLine = g
        .append("g")
        .call(d3.axisLeft(yAxis))
        .classed("y-axis-line", true)
        .style("transform", `translate(${padding}px, 0)`);

      createPaths();
    }

    init();

    function createPaths() {
      for (var i = 0; i < data.length; i++) {
        var path = svg
          .append("path")
          .attr("d", line(data[i].dates))
          .attr("stroke", "red")
          .attr("class", "line")
          .attr("stroke-dasharray", function(d) {
            return this.getTotalLength();
          })
          .attr("stroke-dashoffset", function(d) {
            return this.getTotalLength();
          })
          .transition()
          .duration(1000)
          .attr("stroke-dashoffset", 0);
        paths.push(path);
      }
    }

    function update() {
      xAxis.domain([earliestDate, latestDate]);
      yAxis.domain([0, d3.max(data, d => d.size)]);

      svg
        .select(".x-axis-line")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(xAxis));
      svg
        .select(".y-axis-line")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yAxis));

      paths.forEach(path => {
        d3
          .select(path.node())
          .transition()
          .duration(1000)
          .attr("stroke-dashoffset", function(d) {
            return -this.getTotalLength();
          })
          .remove();
      });

      setTimeout(() => createPaths(), 500);
    }
  }
  render() {
    return (
      <div>
        <svg
          className={`line-graph-${this.props.period}`}
          height="400"
          width="600"
        />
      </div>
    );
  }
}

//input will be an array of improvementAreas

//still needs tooltips + legend

// var svg = d3.select("svg");
//
// var padding = 50;
// var width = +svg.attr("width");
// var height = +svg.attr("height");
//
// var g = svg.append("g");
//
//
// function createData() {var data = ["Hello", "world", "normally", "you", "want"].map(function(d) {
//   var text = d;
//   var size = 2 + Math.random() * 10;
//   var dates = [];
//
//   for (var i = 0; i < size; i++) {
//     var randomMonth = Math.floor(Math.random() * 12) + 1;
//     var randomDay = Math.floor(Math.random() * 28) + 1;
//     var createdDate = moment(`2018-${randomMonth}-${randomDay}`, "YYYY-MM-DD");
//     dates.push({ createdDate });
//   }
//
//   dates.sort((a, b) => {
//     if (a.createdDate.isBefore(b.createdDate)) return -1;
//     return 1;
//   });
//   dates = dates.map((x, idx) => {
//     return { ...x, size: idx + 1 };
//   });
//   return { text, size, dates };
// });
//
// var [latestDate, earliestDate] = data.reduce(
//   (t, c) => {
//     if (c.dates[c.dates.length - 1].createdDate.isAfter(t[0]))
//       t[0] = c.dates[c.dates.length - 1].createdDate;
//     if (c.dates[0].createdDate.isBefore(t[1])) t[1] = c.dates[0].createdDate;
//     return t;
//   },
//   [moment("2018-01-01", "YYYY-MM-DD"), moment("2018-12-31", "YYYY-MM-DD")]
// );
//
// data.forEach(d => {
//   var lastEntry = d.dates[d.dates.length - 1];
//   if (lastEntry.createdDate.isBefore(latestDate))
//     d.dates.push({ createdDate: latestDate, size: lastEntry.size });
//   d.dates.unshift({
//     createdDate: moment(earliestDate).subtract(1, "days"),
//     size: 0
//   });
// });
// return {data, earliestDate, latestDate}}
//
// var {data, earliestDate, latestDate} = createData()
//
// var xAxis = d3
//   .scaleTime()
//   .range([padding, width - padding]).domain([earliestDate, latestDate])
//
// var yAxis = d3
//   .scaleLinear()
// .range([height - padding, padding]).domain([0, d3.max(data, d => d.size)])
//
// var line = d3
//   .line()
//   .x(d => xAxis(d.createdDate))
//   .y(d => yAxis(d.size))
//   .curve(d3.curveStepAfter);
//
// var colour = d3.scaleOrdinal(d3.schemeSet1)
//
// var paths = []
//
// function init() {
// var xAxisLine = g
//    .append("g")
//   .call(d3.axisBottom(xAxis))
// .classed("x-axis-line", true)
//   .style("transform", `translate(0, ${height - padding}px)`);
//
// var yAxisLine = g
//   .append("g")
//   .call(d3.axisLeft(yAxis))
// .classed("y-axis-line", true)
//   .style("transform", `translate(${padding}px, 0)`);
//
//   createPaths()
// }
//
// init()
//
// function createPaths() {
//   for (var i = 0; i<data.length; i++) {
//   var path = svg.append("path").attr("d", line(data[i].dates))
//   .attr("stroke", colour(i))
//   .attr("class", "line")
// .attr("stroke-dasharray", function(d){ return this.getTotalLength()})
// .attr("stroke-dashoffset", function(d){ return this.getTotalLength()}).transition()
//   .duration(1000)
//   .attr("stroke-dashoffset", 0)
//   paths.push(path)
// }
// }
//
// function update() {
//   xAxis.domain([earliestDate, latestDate])
//   yAxis.domain([0, d3.max(data, d => d.size)])
//
//   svg.select(".x-axis-line").transition().duration(1000).call(d3.axisBottom(xAxis))
//   svg.select(".y-axis-line").transition().duration(1000).call(d3.axisLeft(yAxis))
//
//   paths.forEach(path => {
//     d3.select(path.node()).transition().duration(1000).attr("stroke-dashoffset", function(d){ return -this.getTotalLength()}).remove()
//   })
//
//  setTimeout(() => createPaths(), 500)
// }
//
//
// setInterval(() => {
//   var obj = createData()
//   data = obj.data;
//   earliestDate = obj.earliestDate;
//   latestDate = obj.latestDate
//   update()
// }, 5000)
