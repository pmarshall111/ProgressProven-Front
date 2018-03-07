import React, { Component } from "react";
import * as d3 from "d3";
import moment from "moment";

export default class LineGraph extends Component {
  componentDidMount() {
    const { times } = this.props;
    // data will be array of times, sorted by timeStarted.

    //we should now have an array of points of all goals. we can then filter this to get
    //our individual lines. SHOULD already be sorted as we requested that from the db

    //from here we can start making d3 line graph.

    //check to make sure that we have time info...
    if (!times.length) return;

    this.initializeChart();

    //below would need to be done in the stats time spent file
    // //adding in earliest point plus latest point to all lines
    // areas.forEach(area => {
    //   if (area.points[0].isAfter(earliestDate))
    //     area.points.unshift({ date: earliestDate, hours: 0 });
    //   var endingDate = latestDate.isBefore(moment()) ? latestDate : moment();
    //   area.points.push({
    //     date: endingDate,
    //     hours: area.points[area.points.length - 1].hours
    //   });
    // });
  }

  componentDidUpdate() {
    const { goals, period, times, filter } = this.props;
    console.log("updating");
    if (!times.length) return;
    if (!document.querySelector(`.line-graph-${period} .x-axis-line`))
      return this.initializeChart();

    console.log("go go go");

    var earliestDate = moment(times[0].time, moment.ISO_8601),
      latestDate = moment();

    this.xAxis.domain([earliestDate, latestDate]);
    this.yAxis.domain([
      0,
      d3.max(times, d => (filter == "all" ? d.hours : d.goalHours))
    ]);

    var svg = d3.select(`.line-graph-${period}`);

    svg
      .select(".x-axis-line")
      .transition()
      .duration(1000)
      .call(d3.axisBottom(this.xAxis));
    svg
      .select(".y-axis-line")
      .transition()
      .duration(1000)
      .call(d3.axisLeft(this.yAxis));

    this.paths.forEach(path => {
      d3
        .select(path.node())
        .transition()
        .duration(1000)
        .attr("stroke-dashoffset", function(d) {
          return -this.getTotalLength();
        })
        .remove();
    });
    this.paths = [];
    setTimeout(() => this.createPaths(filter), 500);
  }

  createPaths(filter) {
    const { goals, period, times } = this.props;
    var svg = d3.select(`.line-graph-${period}`);
    var areas = filter === "all" ? [...goals, "all"] : [filter];
    console.log(times);
    for (var i = 0; i < areas.length; i++) {
      var path = svg
        .append("path")
        .attr(
          "d",
          this.line(
            areas[i] == "all"
              ? times
              : times.filter(x => x.goal.subject == areas[i]).map(y => {
                  return { time: y.time, hours: y.goalHours };
                })
          )
        )
        .attr("stroke", "red")
        .attr("fill", "transparent")
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
      this.paths.push(path);
    }
  }

  initializeChart() {
    const { times, period, filter, goals } = this.props;
    var svg = d3.select(`.line-graph-${period}`);

    var padding = 50;
    var width = +svg.attr("width");
    var height = +svg.attr("height");

    var g = svg.append("g");

    var earliestDate = moment(times[0].time, moment.ISO_8601),
      latestDate = moment();

    console.log({ earliestDate, latestDate });

    this.xAxis = d3
      .scaleTime()
      .range([padding, width - padding])
      .domain([earliestDate, latestDate]);

    this.yAxis = d3
      .scaleLinear()
      .range([height - padding, padding])
      .domain([0, d3.max(times, d => d.hours)]);

    this.line = d3
      .line()
      .x(d => this.xAxis(moment(d.time, moment.ISO_8601)))
      .y(d => this.yAxis(d.hours));

    var xAxisLine = g
      .append("g")
      .call(d3.axisBottom(this.xAxis))
      .classed("x-axis-line", true)
      .style("transform", `translate(0, ${height - padding}px)`);

    var yAxisLine = g
      .append("g")
      .call(d3.axisLeft(this.yAxis))
      .classed("y-axis-line", true)
      .style("transform", `translate(${padding}px, 0)`);

    this.paths = [];
    this.createPaths(filter);
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
