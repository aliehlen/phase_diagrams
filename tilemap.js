
function pad_value([x0, x1], k1, k2) {
    return [x0 - k1, x1 + k2];
  }


function plot_tiles(data) {

    // start by initializing axis, svg, etc
    var x = d3.scaleLinear().range([0, params.width]);
	var y = d3.scaleLinear().range([params.height, 0]);

    x.domain(pad_value(d3.extent(data, function(d) { return +d.kT; }),0.05,0.15));
	y.domain(pad_value(d3.extent(data, function(d) { return +d.linker; }),1,0.1));

    // now create the svg element
    var svg = d3.select("#tilemap")
                .append("svg")
                .attr("class", "plot")
                .attr("width", params.width + params.margin_left + params.margin_right)
                .attr("height", params.height + params.margin_top + params.margin_bottom)
                .append("g")
                    .attr('id','tileSVG')
                    .attr("transform", 
                          "translate(" + params.margin_left + "," + params.margin_top + ")");


    // x axis
    var x_axis = d3.axisBottom(x).tickSizeOuter(0);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + params.height + ")")
		.call(x_axis);
    
    // top axis
    var top_axis = d3.axisBottom(x).ticks(0).tickSizeOuter(0);

    svg.append("g")
        .attr("class", "axis")
        .call(top_axis);

    // y axis
    var y_axis = d3.axisLeft(y)
                   .tickValues(y.ticks().filter(tick => Number.isInteger(tick)))
                   .tickFormat(d3.format("d"))
                   .tickSizeOuter(0);

	svg.append("g")
        .attr("class", "axis")
        .call(y_axis) // TODO remove first label (inker 5)
        .selectAll(".tick text") // position lower and between ticks
            .attr("dy", "26px")
            .attr("dx", "1px")
    
    // right axis
    var right_axis = d3.axisLeft(y).ticks(0).tickSizeOuter(0);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + params.width + ",0)")
        .call(right_axis);

    // add axis labels
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (params.margin_left/2))
        .attr("x", 0 - params.margin_top - (params.height / 2) )
        .attr("dy", "-0.5em")
        .attr("dx", "1em")
        .text("number of linkers");

    svg.append("text")
        .attr("class", "label")
        .attr("x", params.width / 2 )
        .attr("y", params.height + (params.margin_bottom))
        .attr("dy", "-1em")
        .text("reduced temperature T*");

    //add a slider to define the current congress
    var slider = d3.select("#slider")
    
    slider.append('label')
        .attr('for','eenumber')
        .attr('class', "sliderlabel")
        .html('Number of small particles:&nbsp')
	slider.append('input')
		.attr('id','eenumber')
        .attr('type','number')
        // .attr('step', '1')
		.attr('min', 3)
        .attr('max', 12)
        .attr('value', params.ee)
		.on("input", function() {
            params.ee = +this.value;
            add_title(svg);
            add_rectangles(data, svg, x, y);
		})
 

    // add title
    add_title(svg);

    // populate the plot
    add_rectangles(data, svg, x, y);

};

function add_title(svg) {

    svg.selectAll(".plottitle").remove();

    // add plot title
    svg.append("text")
        .attr("class", "plottitle")
        .attr("x", 0 - (params.margin_left))
        .attr("y", 0)
        .attr("dy", "-1.0em")
        .text("Phase diagram for " + params.ee + ":1 ratio");
}

function add_rectangles(data, svg, x, y) {

	// //remove the legend 
	// svg.selectAll(".legend").remove();

	// //remove the dots
	svg.selectAll(".rect").remove();

	// adjust the text on the range slider
	d3.select("#eenumber-value").text(params.ee);
	// d3.select("#congressN").property("value", currentCongress);


	//add all the rectangles
	svg.selectAll(".rects")
		.data(data).enter()
		.filter(function(d) { return d.EE == params.ee })
		.filter(function(d) { return d.how_initialized == params.how_initialized })
            .append("rect")
                .attr("class", "rect")
				.attr("x", function(d) { return x(+d.kT); })
                .attr("y", function(d) {return y(+d.linker-0.05) ; })
                .attr("width", 18 ) //25
                .attr("height", 38 )   
				.style("fill", function(d) { 
					// for the legend
					if(!params.legendcolors.includes(d.final_lattice_code)) {
						params.legendcolors.push(d.final_lattice_code);
					}
					return params.colormap(d.final_lattice_code);
                })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
                

	//add a legend, using the colors array defined above
	var legend = svg.selectAll(".legend")
		.data(params.legendcolors).enter()
		.append("g")
            .attr("class", "legend")
			.attr("transform", function(d, i) { 
                return "translate("+params.margin_right+"," + i*24 + ")"; 
            });

	legend.append("rect")
		.attr("x", params.width - 97)
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", function (d) {return params.colormap(d)});

    legend.append("text")
          .attr("class", "legend")
	      .attr("x", params.width - 69)
		  .attr("y", 9)
          .attr("dy", ".5em")
		  .text(function(d) {return d;});
};


//runs on load
d3.csv('data/db_paper2.csv')
	.then(function(d) {
        define_params(d);
		plot_tiles(params.data);
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})


    // brush zoom changes by version