function pad_value([x0, x1], k1, k2) {
    return [x0 - k1, x1 + k2];
  }

function get_num_in_range(minmax) {
    x = minmax[0];
    y = minmax[1];

    var numbers = [];

    for (var i = x; i <= y; i++) {
      numbers.push(String(i));
    }
    return numbers;
  }


function plot_all(data, grdata) {

    // x, y, svg for tilemap
    plots.tile.x = d3.scaleLinear().range([0, params.tilemargins.width]);
    plots.tile.y = d3.scaleBand().range([ params.tilemargins.height, 0 ]);

    plots.tile.x.domain(pad_value(d3.extent(data, function(d) { return +d.kT; }),0.05,0.15));
    plots.tile.y.domain(params.linkerdomain).padding(0.075);

    var tile_axislabels = ["reduced temperature T*", "number of linkers"]
    plots.tile.svg = plot_axes(plots.tile.x, plots.tile.y, tile_axislabels, "#tilemap", params.tilemargins)

    // x, y, svg for g(r)
    plots.gr.x = d3.scaleLinear().range([0, params.grmargins.width]);
    plots.gr.y = d3.scaleLinear().range([ params.grmargins.height, 0 ]);
    
    plots.gr.x.domain(d3.extent(grdata, function(d) { return +d.r; }));
    plots.gr.y.domain(d3.extent(grdata, function(d) { return +d.g; }));
    plots.gr.y_zoomed = plots.gr.y;

    var gr_axislabels = ["r (R)", "g(r)"]
    plots.gr.svg = plot_axes(plots.gr.x, plots.gr.y, gr_axislabels, "#gr", params.grmargins)

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
            add_title(plots.tile.svg);
            add_rectangles(data, plots.tile.svg, plots.tile.x, plots.tile.y);
		})
 

    // add button to clear g(r)
    add_button(plots.gr.svg);

    // add title to tilemap
    add_title(plots.tile.svg);

    // populate the tilemap plot
    add_rectangles(data, plots.tile.svg, plots.tile.x, plots.tile.y);

    // add zoomability
    add_zoom();

};

function add_title(svg) {

    svg.selectAll(".plottitle").remove();

    // add plot title
    svg.append("text")
        .attr("class", "plottitle")
        .attr("x", 0 - (params.tilemargins.margin_left))
        .attr("y", 0 - (params.tilemargins.margin_top/2))
        .text("Phase diagram for " + params.ee + ":1 ratio");
}

function add_button(svg) {

    svg.append("rect")
        .attr("class", "button")
        .attr("x", 0 - (params.grmargins.margin_left/2))
        .attr("y", 0 - (params.grmargins.margin_top));

    svg.append("text")
        .attr("class", "buttontext")
        .attr("x", 0 - (params.grmargins.margin_left/2) + 15)
        .attr("y", 0 - (params.grmargins.margin_top/2) - 4)
        .text("clear g(r) plot");

    // put another invisible rectangle so that a cursor doesn't appear
    svg.append("rect")
        .attr("class", "buttoncover")
        .attr("x", 0 - (params.grmargins.margin_left/2))
        .attr("y", 0 - (params.grmargins.margin_top))
        .on("click", clear_points);
}

//runs on load
Promise.all([
    d3.csv("data/db.csv"),
    d3.csv("data/gr_data.csv"),
    ]).then(function(d) {
        define_params(d);
        define_plots();
		plot_all(params.data, params.grdata);
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})


