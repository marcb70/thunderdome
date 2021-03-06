var width = $("#topContent").width() * .70,
    height = $("#topContent").height();
var color = d3.scale.category10();

var nodes = [],
    links = [];

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-600)
    .linkDistance(170)
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

// 1. Add three nodes and three links.
setTimeout(function() {
    for(var i = 0; i < 31; i=i+3){
      console.log(i);
      nodes.push({id:i});
      nodes.push({id:i+1});
      nodes.push({id:i+2});
      links.push({source: nodes[i], target: nodes[i+1]}, {source:  nodes[i+1], target: nodes[i+2]});   
    }
  start();
}, 0);

function updateRemove() {
  nodes.splice(1, 1); // remove b
  links.shift(); // remove a-b
  links.pop(); // remove b-c
  start();
}


// Add node B back.
function updateAdd() {
  if(nodes.length > 120){
    return clearInterval(timer);
  }
  var aVal; 
  var cVal;
  aVal = Math.floor(Math.random() * nodes.length);
  cVal = Math.floor(Math.random() * nodes.length);
  var a = nodes[nodes.length - aVal - 1], b = {id: nodes.length}, c = nodes[nodes.length - cVal -1];
  nodes.push(b);
  links.push({source: a, target: b}, {source: b, target: c});
  start();
}


var duration2 = 3000,
timer = setInterval(updateAdd, duration2);


function start() {
  link = link.data(force.links(), function(d) { return d.source.id + "-" + d.target.id; });
  link.enter().insert("line", ".node").attr("class", "link");
  link.exit().remove();
  
  node = node.data(force.nodes(), function(d) { return d.id;});
  node.enter().append("circle")
  .attr("class", function(d) { 
    var randColor = Math.floor(Math.random() * 3 + 1);
    return "node " + d.id + " color"+randColor 
  })
  .attr("r", function(){
    return Math.floor(Math.random() * (15-10 +1)) + 10;
  });
  node.exit().remove();

  force.start();
}

function tick() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}
