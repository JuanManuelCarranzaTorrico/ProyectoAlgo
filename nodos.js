// Nodes and Edges counter.
var nodeIdCounter = 0;
var edgesIdCounter = 0;

// Create the network.
var container = document.getElementById("mynetwork");

// Default array with nodes.
var nodes = new vis.DataSet([]);

// Default array with edges.
var edges = new vis.DataSet([]);

// Savew Data.
var data = {
  nodes: nodes,
  edges: edges,
};

var options = {
  interaction: {
    hover: true,
  },
  manipulation: {
    enabled: true,
    initiallyActive: false,
    addNode: function (nodeData, callback) {
      addNode(nodeData, callback);
    },
    addEdge: function (edgeData, callback) {
      addEdge(edgeData, callback);
    },
    editEdge: true,
    deleteNode: false,
    deleteEdge: false,
  },
  nodes: {
    color: "#FFFFFF",
    font: {
      color: "#333333",
      size: 18,
    },
  },
  edges: {
    color: {
      color: "#f5f5f5",
      highlight: "#848484",
      hover: "#848484",
    },
    arrows: {
      to: {
        enabled: true,
        type: "triangle",
      },
    },
    font: {
      color: "#f5f5f5",
      size: 10,
      align: "horizontal",
      background: "none",
      strokeWidth: 0,
      align: "top",
    },
  },
};

// Add new custom Node.
function addNode(nodeData, callback) {

  if (nodes.length === 0) {
    nodeIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Nombre del nodo:");
  }

  nodeData.id = nodeIdCounter++;
  nodeData.label = label;
  nodeData.title = "Node " + label;
  callback(nodeData);
}

// Add new custom Edge.
function addEdge(edgeData, callback) {

  if (edges.length === 0) {
    edgesIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Ingrese el valor:");
  }

  if (edgeData.from === edgeData.to) {
    var sameNode = confirm("¿Conectar asi mismo?");
    if (sameNode === true) {
      edgeData.id = edgesIdCounter++;
      edgeData.label = label;
      callback(edgeData);
    }
  } else {
    edgeData.id = edgesIdCounter++;
    edgeData.label = label;
    callback(edgeData);
  }
}

// Verify if the string is Empty.
function valueIsEmpty(label) {
  return label && label !== "";
}

// Enable the network.
var network = new vis.Network(container, data, options);


//---- Show matrizz.
function SumarMatris() {
  var nodesArray = [];
  var valuesArray = [];
  let c = 0;

  if (edges.length !== null) {
    // ----Get Nodes and Edges Values.
    while (c < edges.length) {
      const nodes =
        edges.get(c).from.toString() + "-" + edges.get(c).to.toString();
      const values = edges.get(c).label;
      nodesArray.push(nodes);
      valuesArray.push(values);
      c++;
    }
    // ----Construct matrizz.
    c = 0;
    var matrizz = Array(nodes.length)
      .fill(0)
      .map(() => Array(nodes.length).fill(0));
    while (c < nodesArray.length) {
      var split = nodesArray[c].split("-");
      matrizz[parseInt(split[1])][parseInt(split[0])] = valuesArray[c];
      c++;
    }

    var matr="";
    var matr1="";
    var matr2="";
    for(var i = 0; i < matrizz.length; i++){
      for(var j = 0; j < matrizz.length; j++){
        matr+=matrizz[j][i]+" ";
      }
      matr+="\n";
    }
    var sum1=0,sum2=0;
    for(var i = 0; i < matrizz.length; i++){
      sum1=0;
      for(var j = 0; j < matrizz.length; j++){
        sum1+=parseFloat( matrizz[j][i]);
      }
      matr1+=sum1+"\n";
    }

    for(var i = 0; i < matrizz.length; i++){
      sum2=0;
      for(var j = 0; j < matrizz.length; j++){
        sum2+=parseFloat( matrizz[i][j]);
      }
      matr2+=sum2+" ";
    }

    alert(matr);
    alert(matr1);
    alert(matr2);
  }}

  


 