function HorizontalBar(dataFile) {
  var screenWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var screenHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  screenHeight = screenHeight/3;
  console.log(screenWidth);
  console.log(screenHeight);
  //var svg = d3.select("body").append("svg"),
  var  margin = {top: 20, right: 100, bottom: 30, left: 80},
    width = screenWidth - margin.left - margin.right,
    height = screenHeight - margin.top - margin.bottom;

  var tooltip = d3.select("body").append("div").attr("class", "toolTip");

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleBand().range([height, 0]);

  d3.select("body").select("svg").remove();

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var color = d3.scaleOrdinal(["#0B421D", "#66D38C", "#00B53F", "#CCF0D9",  "#177036"]);
    
    

  d3.json(dataFile, function(error, data) {
    if (error) throw error;

    //data.sort(function(a, b) { return a.value - b.value; });
    // console.log(data);
    // color.domain(d3.keys(data[0]).filter(function(key) {
    //   console.log(key);
    //   return key !== "date";
    // }));
    // console.log(color);

    x.domain([0, d3.max(data, function(d) { return d.value; })]);
    y.domain(data.map(function(d) { return d.name; })).padding(0.1);

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("fill", function(d) {
          console.log(d);
          return color(d.name);
        })
        .attr("y", function(d) { return y(d.name); })
        .attr("width", function(d) { return x(d.value); })
        .on("mousemove", function(d){
            tooltip
              .attr('font-size', '8')
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.name) + "<br>" + (d.value));
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");});
        
  });
}
