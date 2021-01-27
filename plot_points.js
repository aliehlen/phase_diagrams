function add_points(data, svg, x, y, runname) {
    
    var this_run_lattice = params.data.filter(function(d) {return d.run == runname})[0].final_lattice_code;

    // add the lines
    svg.append("g")
        .append("path")  
        .attr("class", "gpath")
        .attr("clip-path", "url(#clip)")
        .datum(data.filter(function(d) { return d.run == runname }))
        .attr("fill", "none")
        .attr("stroke", "#b6b6b6")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(+d.r) })
        .y(function(d) { return y(+d.g) })
        );

	//add all the points
    svg.append('g')
        .attr("clip-path", "url(#clip)")
        .attr("class", "gcirc")
        .selectAll(".circ")
		.data(data).enter()
		.filter(function(d) { return d.run == runname })
            .append("circle")
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
    plots.gr.svg.selectAll(".gcirc").remove();
    plots.gr.svg.selectAll(".gpath").remove();

    // reset the y axis
    plots.gr.y_zoomed = plots.gr.y;
    plots.gr.svg.selectAll(".yaxis").call(d3.axisLeft(plots.gr.y_zoomed));
    
};