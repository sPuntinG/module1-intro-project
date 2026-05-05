import { useMemo } from "react";
import * as d3 from "d3";

export default function Barplot({ data }) {
  const width = 500;
  const height = 400;

  const margin = { top: 20, right: 40, bottom: 20, left: 130 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    const maxStudents = d3.max(data, (d) => d.students) || 0;
    return d3.scaleLinear().domain([0, maxStudents]).range([0, innerWidth]);
  }, [data, innerWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, innerHeight])
      .padding(0.15);
  }, [data, innerHeight]);

  return (
    <svg
      width={width}
      height={height}
      style={{
        backgroundColor: "#fcfcfc",
        border: "1px solid #eee",
        borderRadius: "8px",
      }}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d) => (
          <g key={d.country}>
            <text
              x={-10}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              textAnchor="end"
              dominantBaseline="central"
              fontSize="14px"
              fill="#333"
            >
              {d.country}
            </text>

            <rect
              x={0}
              y={yScale(d.country)}
              width={xScale(d.students)}
              height={yScale.bandwidth()}
              fill="#3b82f6"
              rx={2}
            />

            <text
              x={xScale(d.students) + 8}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              dominantBaseline="central"
              fontSize="10px"
              fill="#666"
            >
              {d.students}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
