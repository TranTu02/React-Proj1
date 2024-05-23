import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Tính toán miền giá trị của trục y
    const yDomain = [
      Math.min(
        0,
        d3.min(data, (d) => d.revenue)
      ),
      d3.max(data, (d) => d.revenue),
    ];

    const y = d3.scaleLinear().domain(yDomain).nice().range([height, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, width])
      .padding(0.1);

    const xAxis = (g) => g.attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    const yAxis = (g) =>
      g.call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => {
            let label = d.toString();
            if (label.length > 10) {
              label = label.slice(0, 10) + "...";
            }
            return label;
          })
      );

    svg.selectAll("g").remove();
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").attr("class", "x-axis").call(xAxis);

    g.append("g").attr("class", "y-axis").call(yAxis);

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.month))
      .attr("y", (d) => (d.revenue >= 0 ? y(d.revenue) : y(0))) // Điều chỉnh vị trí y của các cột
      .attr("width", x.bandwidth())
      .attr("height", (d) => Math.abs(y(0) - y(d.revenue))) // Điều chỉnh chiều cao của các cột
      .attr("fill", "steelblue");
  }, [data]);

  return <svg ref={svgRef} width={1000} height={400}></svg>;
};

export default BarChart;
