const datasetUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(datasetUrl)
  .then((response) => response.json())
  .then((data) => renderChart(data.data));

function renderChart(data) {
  const width = 800;
  const height = 400;
  const padding = 40;

  // Define the SVG
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + padding * 2)
    .attr("height", height + padding * 2)
    .append("g")
    .attr("transform", `translate(${padding}, ${padding})`);

  // Parse the date and convert it to a Date object
  const parseTime = d3.timeParse("%Y-%m-%d");
  data.forEach((d) => {
    d[0] = parseTime(d[0]);
  });

  // Define scales
  const xScale = d3
    .scaleTime()
    .domain([d3.min(data, (d) => d[0]), d3.max(data, (d) => d[0])])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([height, 0]);

  // Define axes
  const xAxis = d3.axisBottom(xScale).ticks(10);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g").attr("id", "y-axis").call(yAxis);

  // Draw bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d[0]))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", width / data.length - 1)
    .attr("height", (d) => height - yScale(d[1]))
    .attr("data-date", (d) => d3.timeFormat("%Y-%m-%d")(d[0]))
    .attr("data-gdp", (d) => d[1])
    .on("mouseover", (event, d) => {
      d3.select("#tooltip")
        .style("display", "block")
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px")
        .attr("data-date", d3.timeFormat("%Y-%m-%d")(d[0]))
        .html(
          `<strong>${d[1]}</strong> billion USD<br>${d3.timeFormat("%Y-%m-%d")(
            d[0]
          )}`
        );
    })
    .on("mouseout", () => {
      d3.select("#tooltip").style("display", "none");
    });

  // Add title
  svg
    .append("text")
    .attr("id", "title")
    .attr("x", width / 2)
    .attr("y", -padding / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .text("Gross Domestic Product");
}
