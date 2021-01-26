// create a tooltip
var tooltip = d3.select("#tilemap")
                .append("div")
                .style("opacity", 0) 
                .attr("class", "tooltip")

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
    tooltip
        .style("opacity", 1)
        .style("display", "block")
        .style("border-color", params.colormap(d.final_lattice_code))
    d3.select(this)
        .style("stroke", function(d) {return params.colormap(d.final_lattice_code);})
        .style("stroke-width", "3px")
        .style("fill-opacity", "0.5")
}

var mousemove = function(d) {
    tooltip
        .html("T*: " + d.kT + 
            "<br> started: " + d.how_initialized +
            "<br> finished: " + d.final_lattice_code) 
        .style("left", (d3.event.pageX-5) + "px") 
        .style("top", (d3.event.pageY-75) + "px")
}

var mouseleave = function(d) {
    tooltip
        .style("opacity", 0)
        .style("display", "none")
    d3.select(this)
        .style("stroke", "none")
        .style("fill-opacity", "1")
}

