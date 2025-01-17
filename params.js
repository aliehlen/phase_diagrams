var params;

function define_params(tables){
	params = new function() {

        // data
        this.data = tables[0];
        this.grdata = tables[1];
        // tilemap size params
        this.tilemargins = {};
        this.tilemargins.margin_top = 50;
        this.tilemargins.margin_bottom = 65; 
        this.tilemargins.margin_left = 55; 
        this.tilemargins.margin_right = 150;
        this.tilemargins.width = 755 - this.tilemargins.margin_left - this.tilemargins.margin_right;
        this.tilemargins.height = 490 - this.tilemargins.margin_top - this.tilemargins.margin_bottom;
        // g(r) size params
        this.grmargins = {};
        this.grmargins.margin_top = this.tilemargins.margin_top;
        this.grmargins.margin_bottom = 65; 
        this.grmargins.margin_left = 90; 
        this.grmargins.margin_right = 120;
        this.grmargins.width = 650 - this.grmargins.margin_left - this.grmargins.margin_right;
        this.grmargins.height = 490 - this.grmargins.margin_top - this.grmargins.margin_bottom;
        // data params
        this.ee = 4;
        this.eemin = d3.extent(this.data, function(d) { return +d.EE; })[0];
        this.eemax = d3.extent(this.data, function(d) { return +d.EE; })[1] ;
        this.linkerdomain = get_num_in_range(d3.extent(this.data, function(d) { return +d.linker; }));
        // tilemap colors
        this.colorvals = d3.map(this.data, function(d){return d.final_lattice_code;}).keys();
        this.colormap = d3.scaleOrdinal().domain(this.colorvals).range(d3.schemeTableau10);
        this.colormap = d3.scaleOrdinal(["SC", "SH", "BCC", "FCC", "BCT", "129a", "BCC/FCC coex.", "A20", "Ad", "melted", "jammed", "A20/BCT coex."],
                                        ["#d13917", "#efc000", "#0094f7", "#00c95e", "#8b67e0", "#82a6b1", "#007387", "#c779b2", "#221973", "#d6d6d6", "#6e6e6e", "#83aa8b"]);
        this.legendcolors = [];
	};
}

var plots;

function define_plots(){
	plots = new function() {

        this.tile = {};
        this.gr = {};
        this.gr.offset = 0;
	};
}
