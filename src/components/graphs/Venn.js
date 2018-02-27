import React, { Component } from "react";
import * as d3 from "d3";
import { html as chart } from "@redsift/d3-rs-venn";
let eml = chart();

export default class Venn extends Component {
  render() {
    //we can only do the improvement areas and then show the crossover of tags.
    //this is because the new set that we create overwrites the existing set

    //actually, we can do, but we need to specify each dot as a new circle, then specify the overlap between it
    //and each main circle. This would mean that we would'nt have any physical overlap between goal circles.

    //perhaps it would just be easier to have venn diagrams of the big 3 goals, then on click we could transform
    //it to only show 1 goal and show circles of tags within the big goal.

    var goals = [
      {
        tite: "baking",
        sets: ["baking"],
        size: 10
      },
      {
        title: "running",
        sets: ["running"],
        size: 50
      },
      {
        title: "coding",
        sets: ["coding"],
        size: 60
      },
      { title: "improvement", sets: ["coding", "running"], size: 3 }
    ];

    var tags = [
      { title: "improvement", sets: ["coding", "running"], size: 3 },
      { title: "js", sets: ["coding"], size: 2 },
      { title: "goals", sets: ["running"], size: 1 },
      { title: "10k", sets: ["running"], size: 2 },
      { title: "front-end", sets: ["coding"], size: 1 },
      { title: "back-end", sets: ["coding"], size: 1 },
      { title: "chicken", sets: ["baking"], size: 1 }
    ];
    var venn = chart();
    var data = [...goals, ...tags];

    function update(animated) {
      var svg = d3.select("#venn-chart").datum(data);
      if (animated) {
        svg = svg.transition().duration(666);
      }
      svg.call(venn);
    }
    update();
    setTimeout(() => update(), 2);

    return <div id="venn-chart" />;
  }
}
