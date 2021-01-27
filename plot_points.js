function add_points(data, svg, x, y, runname) {
    
    var this_run_lattice = params.data.filter(function(d) {return d.run == runname})[0].final_lattice_code;

    // add the lines
    svg.append("path")
        .datum(data.filter(function(d) { return d.run == runname }))
        .attr("class", "path")
        .attr("fill", "none")
        .attr("stroke", "#b6b6b6")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(+d.r) })
        .y(function(d) { return y(+d.g) })
        );

	//add all the points
	svg.selectAll(".circ")
		.data(data).enter()
		.filter(function(d) { return d.run == runname })
            .append("circle")
                .attr("class", "circ")
				.attr("cx", function(d) { return x(+d.r); })
                .attr("cy", function(d) {return y(+d.g) ; })
                .attr("r", 2 ) 
				.style("fill", function(d) { 
                    return params.colormap(this_run_lattice);
                })
                .style("stroke", function(d) {return params.colormap(this_run_lattice);}) 
                .style("stroke-width", 0) 
        .on("mouseover", mouseover_pts)
        .on("mousemove", mousemove_pts)
        .on("mouseleave", mouseleave_pts);

};


function clear_points() {

	//remove the dots
    plots.gr.svg.selectAll(".circ").remove();
    plots.gr.svg.selectAll(".path").remove();
    
};