function plot_axes_tilemap(x, y, whichdiv, margins) {
        // now create the svg element
    var svg = d3.select(whichdiv)
                .append("svg")
                .attr("class", "plot")
                .attr("width", margins.width + margins.margin_left + margins.margin_right)
                .attr("height", margins.height + margins.margin_top + margins.margin_bottom)
                .append("g")
                    .attr('id','tileSVG')
                    .attr("transform", 
                          "translate(" + margins.margin_left + "," + margins.margin_top + ")");


    // x axis
    var x_axis = d3.axisBottom(x).tickSizeOuter(0);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + margins.height + ")")
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
        .attr("transform", "translate(" + margins.width + ",0)")
        .call(right_axis);

    // add axis labels
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (margins.margin_left/2))
        .attr("x", 0 - margins.margin_top - (margins.height / 2) )
        .attr("dy", "-0.5em")
        .attr("dx", "1em")
        .text("number of linkers");

    svg.append("text")
        .attr("class", "label")
        .attr("x", margins.width / 2 )
        .attr("y", margins.height + (margins.margin_bottom))
        .attr("dy", "-1em")
        .text("reduced temperature T*");

    return svg
}


// function plot_axes_tilemap(x, y, whichdiv) {
//     // now create the svg element
//     var svg = d3.select(whichdiv)
//                 .append("svg")
//                 .attr("class", "plot")
//                 .attr("width", params.width + params.margin_left + params.margin_right)
//                 .attr("height", params.height + params.margin_top + params.margin_bottom)
//                 .append("g")
//                     .attr('id','tileSVG')
//                     .attr("transform", 
//                         "translate(" + params.margin_left + "," + params.margin_top + ")");


//     // x axis
//     var x_axis = d3.axisBottom(x).tickSizeOuter(0);

//     svg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(0," + params.height + ")")
//         .call(x_axis);

//     // top axis
//     var top_axis = d3.axisBottom(x).ticks(0).tickSizeOuter(0);

//     svg.append("g")
//         .attr("class", "axis")
//         .call(top_axis);

//     // y axis
//     var y_axis = d3.axisLeft(y)
//                 .tickValues(y.ticks().filter(tick => Number.isInteger(tick)))
//                 .tickFormat(d3.format("d"))
//                 .tickSizeOuter(0);

//     svg.append("g")
//         .attr("class", "axis")
//         .call(y_axis) // TODO remove first label (inker 5)
//         .selectAll(".tick text") // position lower and between ticks
//             .attr("dy", "26px")
//             .attr("dx", "1px")

//     // right axis
//     var right_axis = d3.axisLeft(y).ticks(0).tickSizeOuter(0);

//     svg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(" + params.width + ",0)")
//         .call(right_axis);

//     // add axis labels
//     svg.append("text")
//         .attr("class", "label")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - (params.margin_left/2))
//         .attr("x", 0 - params.margin_top - (params.height / 2) )
//         .attr("dy", "-0.5em")
//         .attr("dx", "1em")
//         .text("number of linkers");

//     svg.append("text")
//         .attr("class", "label")
//         .attr("x", params.width / 2 )
//         .attr("y", params.height + (params.margin_bottom))
//         .attr("dy", "-1em")
//         .text("reduced temperature T*");

//     return svg
//     }