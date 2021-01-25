var params;

function define_params(data){
	params = new function() {
        //to hold the data
        this.data = data;
        this.margin_top = 50;
        this.margin_bottom = 65; 
        this.margin_left = 55; 
        this.margin_right = 120;
        this.width = 755 - this.margin_left - this.margin_right;
        this.height = 490 - this.margin_top - this.margin_bottom;
        this.ee = 4;
        this.eemin = d3.extent(data, function(d) { return +d.EE; })[0];
        this.eemax = d3.extent(data, function(d) { return +d.EE; })[1] ;
        this.how_initialized = "BCC"
        this.colorvals = d3.map(this.data, function(d){return d.final_lattice_code;}).keys();
        this.colormap = d3.scaleOrdinal().domain(this.colorvals).range(d3.schemeTableau10);
        this.legendcolors = [];
	};
}