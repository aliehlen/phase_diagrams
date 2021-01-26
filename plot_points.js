function add_points(data, svg, x, y, runname) {
    
    var this_run_lattice = params.data.filter(function(d) {return d.run == runname})[0].final_lattice_code;

    // add the lines
    svg.append("path")
        .datum(data.filter(function(d) { return d.run == runname }))
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
					// // for the legend
					// if(!params.legendcolors.includes(d.final_lattice_code)) {
					// 	params.legendcolors.push(d.final_lattice_code);
					// }
                    // return params.colormap(d.final_lattice_code);
                    return params.colormap(this_run_lattice);
                });
                


                

	// //add a legend, using the colors array defined above
	// var legend = svg.selectAll(".legend")
	// 	.data(params.legendcolors).enter()
	// 	.append("g")
    //         .attr("class", "legend")
	// 		.attr("transform", function(d, i) { 
    //             return "translate("+params.tilemargins.margin_right+"," + i*24 + ")"; 
    //         });

	// legend.append("rect")
	// 	.attr("x", params.tilemargins.width - 97)
	// 	.attr("width", 20)
	// 	.attr("height", 20)
	// 	.style("fill", function (d) {return params.colormap(d)});

    // legend.append("text")
    //       .attr("class", "legend")
	//       .attr("x", params.tilemargins.width - 69)
	// 	  .attr("y", 9)
    //       .attr("dy", ".5em")
	// 	  .text(function(d) {return d;});
};


