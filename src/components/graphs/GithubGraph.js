import React, { Component } from "react";
import * as d3 from "d3";

import "../../css/Graphs.css";

export default class GithubGraph extends Component {
  componentDidMount() {
    var testData = [];

    for (var i = 1; i < 100; i++) {
      var randomMonth = Math.floor(Math.random() * 12) + 1;
      var randomDay = Math.floor(Math.random() * 28) + 1;
      var randomNumb = Math.floor(Math.random() * 10);
      var createdDate = new Date(`2018-${randomMonth}-${randomDay}`);

      if (testData.filter(x => x.date == createdDate).length > 0) continue;

      testData.push({
        date: createdDate,
        numb: randomNumb
      });
    }

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

    var today = new Date();

    var oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

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

    var rect = g
      .selectAll("rect")
      .data(d => d3.timeDays(oneYearAgo, today))
      .enter()
      .append("rect")
      .attr("stroke", "black")
      .attr("fill", "transparent")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", function(d) {
        //gets num weeks between one year ago and date of current rect
        return d3.timeWeek.count(oneYearAgo, d) * cellSize;
      })
      .attr("y", function(d) {
        return d.getDay() * cellSize;
      })
      .on("mouseover", function(d) {
        var text = this.getAttribute("data-info");
        if (!text) text = "0 contributions.";
        div
          .html(text)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 32 + "px");
        div
          .transition()
          .duration(100)
          .style("opacity", 1);
      })
      .on("mouseout", d => {
        div
          .transition()
          .duration(100)
          .style("opacity", 0);
      });

    //adding colours
    var maxMin = d3.extent(testData, x => x.numb);

    var colours = new Array(5)
      .fill("abc")
      .map((x, i) => `hsl(60, ${100 * (5 - i) / 5}%, 50%)`);

    var colourScale = d3
      .scaleQuantize()
      .domain(maxMin)
      .range(colours);

    testData.forEach(entry => {
      var indiv = rect.filter(
        d =>
          d.getDate() == entry.date.getDate() &&
          d.getMonth() == entry.date.getMonth()
      );
      indiv
        .attr("fill", colourScale(entry.numb))
        .attr("data-info", `${entry.numb} contributions.`);
    });
  }
  render() {
    return (
      <div>
        <svg id="github-graph" height="300" width="900" />
      </div>
    );
  }
}
