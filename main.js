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


function plot_all(data) {

    // x, y for tilemap
    var x = d3.scaleLinear().range([0, params.tilemargins.width]);
    var y = d3.scaleBand().range([ params.tilemargins.height, 0 ]);

    x.domain(pad_value(d3.extent(data, function(d) { return +d.kT; }),0.05,0.15));
    y.domain(params.linkerdomain).padding(0.075);
    
    // create svg for tilemap
    var svg = plot_axes_tilemap(x, y, "#tilemap", params.tilemargins)

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
 

    // add title to tilemap
    add_title(svg);

    // populate the tilemap plot
    add_rectangles(data, svg, x, y);

};

function add_title(svg) {

    svg.selectAll(".plottitle").remove();

    // add plot title
    svg.append("text")
        .attr("class", "plottitle")
        .attr("x", 0 - (params.tilemargins.margin_left))
        .attr("y", 0)
        .attr("dy", "-1.0em")
        .text("Phase diagram for " + params.ee + ":1 ratio");
}


//runs on load
Promise.all([
    d3.csv("data/db.csv"),
    d3.csv("data/gr_data.csv"),
    ]).then(function(d) {
        define_params(d);
        console.log(params.linkerdomain)
		plot_all(params.data);
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})


