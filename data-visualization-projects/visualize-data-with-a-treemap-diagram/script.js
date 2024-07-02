const DATASET_URL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const WIDTH = 1000;
const HEIGHT = 600;
const PADDING = { top: 50, right: 0, bottom: 0, left: 0 };
const COLOR_SCHEME = d3.schemeCategory10;

const svg = d3
  .select("#treemap")
  .attr("width", WIDTH + PADDING.left + PADDING.right)
  .attr("height", HEIGHT + PADDING.top + PADDING.bottom)
  .append("g")
  .attr("transform", `translate(${PADDING.left},${PADDING.top})`);

const tooltip = d3.select("#tooltip");

d3.json(DATASET_URL).then((data) => {
  const root = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  d3.treemap().size([WIDTH, HEIGHT]).padding(1)(root);

  const colorScale = d3.scaleOrdinal(COLOR_SCHEME);

  const tile = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`);

  tile
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => colorScale(d.data.category))
    .on("mouseover", function (event, d) {
      tooltip
        .style("visibility", "visible")
        .attr("data-value", d.data.value)
        .html(
          `Name: ${d.data.name}<br>Category: ${
            d.data.category
          }<br>Value: $${d3.format(",d")(d.data.value)}`
        );
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", event.pageY + 15 + "px")
        .style("left", event.pageX + 15 + "px");
    })
    .on("mouseout", () => tooltip.style("visibility", "hidden"));

  tile
    .append("text")
    .selectAll("tspan")
    .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    .enter()
    .append("tspan")
    .attr("x", 4)
    .attr("y", (d, i) => 14 + i * 10)
    .text((d) => d);

  const categories = Array.from(
    new Set(root.leaves().map((d) => d.data.category))
  );

  const legend = d3.select("#legend");

  const legendItem = legend
    .selectAll(".legend-item")
    .data(categories)
    .enter()
    .append("rect")
    .attr("class", "legend-item")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", (d) => colorScale(d));

  legend
    .selectAll("text")
    .data(categories)
    .enter()
    .append("text")
    .attr("x", (d, i) => i * 100 + 24)
    .attr("y", 15)
    .text((d) => d);
});
