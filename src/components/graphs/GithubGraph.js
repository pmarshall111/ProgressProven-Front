import React, { Component } from "react";
import * as d3 from "d3";
import moment from "moment";

import "../../css/Graphs.css";

export default class GithubGraph extends Component {
  constructor(props) {
    super(props);
    this.setTooltipData = this.setTooltipData.bind(this);
  }
  componentDidMount() {
    var { data, filter, changeState } = this.props;
    console.log(data);
    //creating tooltip
    var div = d3
      .select("body")
      .append("div")
      .classed("tooltip", true)
      .style("opacity", 0);

    var svg = d3.select("#github-graph");

    var height = +svg.attr("height");
    var width = +svg.attr("width");
    var padding = 50;

    var g = svg
      .append("g")
      .style("transform", `translate(${padding}px, ${padding}px)`);

    var today = moment();

    var oneYearAgo = moment()
      .subtract(1, "year")
      .startOf("day");

    var cellSize = (width - padding * 2) / 53;

    //setting positions of the ticks to be halfway between boundaries
    var yAxisRange = [];
    for (let i = 1; i < 7; i += 2) {
      yAxisRange.push(cellSize / 2 + cellSize * i);
    }

    var yAxis = d3
      .scaleOrdinal()
      .range(yAxisRange)
      .domain(["Mon", "Wed", "Fri"]);
    var xAxis = d3
      .scaleTime()
      .range([0, width - padding * 2])
      .domain([oneYearAgo, today]);

    var xAxisLine = g
      .append("g")
      .style("transform", `translate(0px, ${cellSize * 8}px)`)
      .call(d3.axisBottom(xAxis));

    var yAxisLine = g
      .append("g")
      .style("transform", `translate(-${cellSize}px, 0px)`)
      .classed("y-axis", true)
      .call(d3.axisLeft(yAxis));

    //adding extra ticks for Tuesday and Thursday
    for (let y = 0; y < 2; y++) {
      let g = yAxisLine
        .append("g")
        .classed("tick", true)
        .attr(
          "transform",
          `translate(0, ${cellSize * (2 + 2 * y) + cellSize / 2})`
        )
        .attr("opacity", 1);
      g
        .append("line")
        .attr("x2", -4)
        .attr("stroke", "#000");
    }

    console.log(data);

    data = this.formatData(data);
    this.data = data;

    var maxMin = d3.extent(data, d => {
      if (!d.totalHours.all)
        d.totalHours.all = Object.values(d.totalHours).reduce(
          (t, c) => (t += c),
          0
        );
      return d.totalHours[filter] || 0;
    });

    console.log(oneYearAgo, maxMin, data);

    var colours = new Array(5)
      .fill("abc")
      .map((x, i) => `hsl(60, ${100 * (5 - i) / 5}%, 50%)`);

    var colourScale = d3
      .scaleQuantize()
      .domain(maxMin)
      .range(colours);

    var rect = g
      .selectAll("rect")
      .data(data, d => d.day)
      .enter()
      .append("rect")
      .attr("stroke", "black")
      .attr("fill", d => {
        if (filter === "all") return colourScale(d.totalHours[filter] || 0);
      })
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", function(d) {
        //gets num weeks between one year ago and date of current rect
        var weeks = moment(d.day, "YYYY-MM-DDTHH:mm:ss.SSSZ").diff(
          oneYearAgo,
          "weeks"
        );
        if (moment(d.day, "YYYY-MM-DDTHH:mm:ss.SSSZ").day() == 0) weeks++;
        return weeks * cellSize;
      })
      .attr("y", function(d) {
        return moment(d.day, "YYYY-MM-DDTHH:mm:ss.SSSZ").day() * cellSize;
      })
      .attr("data-data", d =>
        JSON.stringify({ date: d.day, time: d.totalHours.all })
      )
      .on("mouseover", this.setTooltipData)
      .on("mouseout", d => {
        div
          .transition()
          .duration(100)
          .style("opacity", 0);
      })
      .on("click", function(d) {
        var prev = document.querySelector(".selected-day");
        if (prev) prev.classList.remove(".selected-day");
        changeState(d);
        this.classList.add(".selected-day");
      });

    //adding colours
    var colours = new Array(5)
      .fill("abc")
      .map((x, i) => `hsl(60, ${100 * (5 - i) / 5}%, 50%)`);
  }

  componentWillUpdate() {
    //update fucntion
    var { filter } = this.props;
    var data = this.data;
    var maxMin = d3.extent(data, d => d.totalHours[filter] || 0);
    console.log("updating");

    var colours = new Array(5)
      .fill("abc")
      .map((x, i) => `hsl(60, ${100 * (5 - i) / 5}%, 50%)`);

    var colourScale = d3
      .scaleQuantize()
      .domain(maxMin)
      .range(colours);

    var rect = d3
      .select("#github-graph g")
      .selectAll("rect")
      .data(data, d => d.day)
      .on("mouseover", this.setTooltipData)
      .transition()
      .duration(2000)
      .attr("fill", d => colourScale(d.totalHours[filter] || 0));
  }

  formatData(data) {
    var today = moment();

    var oneYearAgo = moment()
      .subtract(1, "year")
      .startOf("day");

    var result = [];

    for (var i = 0; i < data.length - 1; i++) {
      var thisDay = moment(data[i].day, "YYYY-MM-DDTHH:mm:ss.SSSZ");

      if (thisDay.isBefore(oneYearAgo)) {
        // data.splice(i, 1);
        // i--;
        continue;
      }
      result.push(data[i]);
      var diff = moment(data[i + 1].day, "YYYY-MM-DDTHH:mm:ss.SSSZ").diff(
        thisDay,
        "days"
      );
      if (diff !== 1) {
        for (let j = 1; j < diff; j++) {
          result.push({
            day: moment(data[i].day, "YYYY-MM-DDTHH:mm:ss.SSSZ").add(j, "days"),
            totalHours: { all: 0 }
          });
        }
      }
    }

    while (
      moment(result[0].day, "YYYY-MM-DDTHH:mm:ss.SSSZ").isAfter(
        oneYearAgo,
        "day"
      )
    ) {
      result.unshift({
        day: moment(result[0].day, "YYYY-MM-DDTHH:mm:ss.SSSZ").subtract(
          1,
          "days"
        ),
        totalHours: { all: 0 }
      });
    }

    while (
      moment(
        result[result.length - 1].day,
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ).isBefore(today, "day")
    ) {
      result.push({
        day: moment(
          result[result.length - 1].day,
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ).add(1, "days"),
        totalHours: { all: 0 }
      });
    }

    return result;
  }

  setTooltipData(d) {
    var { filter } = this.props;
    var div = d3.select(".tooltip");

    var hours = (d.totalHours[filter] || "0") + "";
    var split = hours.split(".");
    if (split[1]) split[1] = split[1][0];
    var text = `${split[0]}hrs, ${((split[1] || 0) * 6).toFixed(0)}mins`;
    if (filter === "all") {
      //adding on percents;
      var keys = Object.keys(d.totalHours);

      var areas = keys.filter(x => x !== "all").map(key => {
        var percent = (d.totalHours[key] / d.totalHours.all * 100).toFixed(1);
        return [key, percent];
      });
      areas.sort((a, b) => b[1] - a[1]);
      areas.forEach(area => (text += `\n ${area[0]}: ${area[1]}%`));
    }
    div
      .html(text)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY - 32 + "px");
    div
      .transition()
      .duration(100)
      .style("opacity", 1);
  }

  render() {
    return (
      <div>
        <svg id="github-graph" height="300" width="900" />
      </div>
    );
  }
}
