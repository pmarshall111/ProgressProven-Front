import React, { Component } from "react";
import * as d3 from "d3";

import Cloud from "d3.layout.cloud";

var data = [
  "Hello",
  "world",
  "normally",
  "you",
  "want",
  "more",
  "words",
  "than",
  "this"
].map(function(d) {
  return { text: d, size: 10 + Math.random() * 90 };
});

export default class WordCloud extends Component {
  componentDidMount() {
    var svg = d3.select("#word-cloud");

    var padding = 50;
    var width = +svg.attr("width") - 2 * padding;
    var height = +svg.attr("height") - 2 * padding;

    var g = d3.select("svg").append("g");
    // .style("transform", `translate(${padding}px, ${padding}px)`);

    var color = d3.scaleOrdinal(d3.schemeCategory20);
    // var fontSize = d3
    //   .scalePow()
    //   .exponent(5)
    //   .domain(d3.extent(data, d => d.size))
    //   .range([40, 80]);

    var layout = Cloud()
      .size([width, height])
      .timeInterval(20)
      .words(data)
      .rotate(function(d) {
        return Math.floor(Math.random() * 180) - 90;
      })
      .font("impact")
      .fontSize(function(d, i) {
        return d.size;
      })
      .fontWeight("bold")
      .text(function(d) {
        return d.text.toUpperCase();
      })
      .spiral("rectangular") // "archimedean" or "rectangular"
      .on("end", draw)
      .start();

    var wordcloud = g
      .append("g")
      .attr("class", "wordcloud")
      .style(
        "transform",
        `translate(${width / 2 + padding}px, ${height / 2 + padding}px)`
      );

    function draw(words) {
      var words = wordcloud.selectAll("text").data(words);

      words
        .exit()
        .transition()
        .duration(200)
        .style("font-size", "0px")
        .attr("transform", "translate(0, 500px)")
        .remove();

      words
        .enter()
        .append("text")
        .attr("class", "word")
        .style("fill", function(d, i) {
          return color(i);
        })
        .style("font-size", function(d) {
          return d.size + "px";
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + d.x + ")rotate(" + 0 + ")";
        })
        .text(function(d) {
          return d.text;
        })
        .merge(words)
        .transition()
        .duration(300)
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        });
    }
  }
  render() {
    return <svg id="word-cloud" width="960" height="500" />;
  }
}
