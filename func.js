var textBox_id = document.getElementById('student_id');
var textBox_name = document.getElementById('student_name');
var textBox_birth = document.getElementById('student_birth');
var textBox_gpa = document.getElementById('student_gpa');
var textBox_cre = document.getElementById('student_cre');

var msg = document.getElementById('msg');

var lastName = ['Nguyen', 'Huynh', 'Tran', 'Ly', 'Ngo', 'Hoang', 'Truong', 'Dinh'];
var surName = ['Van', 'Thi', 'Thanh', 'Tan', 'Quoc', 'Tuan', 'Gia'];
var firstName = ['Duy', 'Hoang', 'Dat', 'Duc', 'Trung', 'Tinh', 'Phuc', 'Hoa', 'Tu'];

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while(new Date().getTime() < unixtime_ms + ms) {}
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 != currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function createExampleBSTTree() {
	bst = new BST();

	var n = getRandomInt(5, 15);
	var arr = [];

	// console.log('N = ', n);
	for (i = 0; i < n; i++) arr[i] = i;
	arr = shuffle(arr);

	for (i = 0; i < n; i++) {
		var iLastName = getRandomInt(0, 7);
		var iSurName = getRandomInt(0, 6);
		var iFirstName = getRandomInt(0, 8);
		var name = lastName[iLastName] + ' ' + surName[iSurName] + ' ' + firstName[iFirstName];

		var dayBirth = getRandomInt(1, 29);
		var monthBirth = getRandomInt(1, 12);
		var yearBirth = getRandomInt(1990, 2000);
		var birth = dayBirth + '/' + monthBirth + '/'+ yearBirth;

		var gpa = getRandomInt(50, 100) / 10;
		var cre = getRandomInt(20, 100);

		bst.InsertVal(arr[i], name, birth, gpa, cre);
		drawTree();
	}
}

function createExampleAVLTree() {
	bst = new AVL();

	var n = getRandomInt(5, 15);
	var arr = [];

	// console.log('N = ', n);
	for (i = 0; i < n; i++) arr[i] = i;
	arr = shuffle(arr);

	for (i = 0; i < n; i++) {
		var iLastName = getRandomInt(0, 7);
		var iSurName = getRandomInt(0, 6);
		var iFirstName = getRandomInt(0, 8);
		var name = lastName[iLastName] + ' ' + surName[iSurName] + ' ' + firstName[iFirstName];

		var dayBirth = getRandomInt(1, 29);
		var monthBirth = getRandomInt(1, 12);
		var yearBirth = getRandomInt(1990, 2000);
		var birth = dayBirth + '/' + monthBirth + '/'+ yearBirth;

		var gpa = getRandomInt(50, 100) / 10;
		var cre = getRandomInt(20, 100);

		bst.InsertVal(i, name, birth, gpa, cre);
		drawTree();
	}
}

function InsertNode() {
	var student_id = Number(textBox_id.value);
	var student_name = textBox_name.value;
	var student_birth = textBox_birth.value;
	var student_gpa = Number(textBox_gpa.value);
	var student_cre = Number(textBox_cre.value);

	bst.InsertVal(student_id, student_name, student_birth, student_gpa, student_cre);

	textBox_id.value = '';
	textBox_name.value = '';
	textBox_birth.value = '';
	textBox_gpa.value = '';
	textBox_cre.value = '';

	msg.innerHTML = 'Inserted Node(id = ' + student_id +
					', name = ' + student_name +
					', birth = ' + student_birth +
					', gpa = ' + student_gpa +
					', cre = ' + student_cre + ')';

	textBox_id.focus();

	drawTree();
}

function DeleteNode() {
	if (textBox_id.value != '') {
		var val = Number(textBox_id.value);

		bst.DeleteVal(val);
		textBox_id.value = '';

		msg.innerHTML = 'Deleted Node(id = ' + val + ')<br>';
		drawTree();
	}

	textBox_id.focus();
}

function SearchNode() {
	if (textBox_id.value != '') {
		SearchNodeByID();
		return;
	}

	if (textBox_name.value != '') {
		SearchNodeByName();
		return;
	}

	if (textBox_birth.value != '') {
		SearchNodeByBirth();
		return;
	}

	if (textBox_gpa.value != '') {
		SearchNodeByGPA();
		return;
	}

	if (textBox_cre.value != '') {
		SearchNodeByCredit();
		return;
	}
}

function SearchNodeByID() {
	var val = Number(textBox_id.value);
	var node = bst.Search(val);

	msg.innerHTML = '';

	if (node == -1)
		msg.innerHTML = 'not found';
	else
		msg.innerHTML = 'Found: Node(id = ' + node.value +
						', name = ' + node.fname +
						', birth = ' + node.birthday +
						', gpa = ' + node.gpa +
						', credit = ' + node.credit + ')';

	textBox_id.value = '';
	textBox_id.focus();
}

function SearchNodeByName() {
	var val = textBox_name.value;
	var listName = bst.getAllName();

	msg.innerHTML = '';
	for (let idx in listName) {
		// console.log(listName[idx])
		if (val == listName[idx][1]) {
			msg.innerHTML += listName[idx][0] + ', ' + listName[idx][1] + '<br>';
		}
	}

	textBox_name.value = '';
	textBox_name.focus();
}

function SearchNodeByBirth() {
	var val = textBox_birth.value;
	var listBirth = bst.getAllBirth();

	msg.innerHTML = '';
	for (let idx in listBirth) {
		// console.log(listBirth[idx]);
		if (val == listBirth[idx][2]) {
			// console.log(listBirth[idx]);
			msg.innerHTML += listBirth[idx][0] + ', ' + listBirth[idx][1] + ', ' + listBirth[idx][2] + '<br>';
		}
	}

	textBox_birth.value = '';
	textBox_birth.focus();
}

function SearchNodeByGPA() {
	var val = textBox_gpa.value;
	var listGPA = bst.getAllGPA();

	msg.innerHTML = '';
	for (let idx in listGPA) {
		// console.log(listGPA[idx]);
		if (val == listGPA[idx][2]) {
			msg.innerHTML += listGPA[idx][0] + ', ' + listGPA[idx][1] + ', ' + listGPA[idx][2] + '<br>';
		}
	}

	textBox_gpa.value = '';
	textBox_gpa.focus();
}

function SearchNodeByCredit() {
	var val = textBox_cre.value;
	var listCredit = bst.getAllCredit();

	msg.innerHTML = '';
	for (let idx in listCredit) {
		// console.log(listCredit[idx]);
		if (val == listCredit[idx][2]) {
			msg.innerHTML += listCredit[idx][0] + ', ' + listCredit[idx][1] + ', ' + listCredit[idx][2] + '<br>';
		}
	}

	textBox_cre.value = '';
	textBox_gpa.focus();
}

function getPredecessor() {
	var val = Number(textBox_id.value);
	var listNode = bst.getAllNode();

	msg.innerHTML = '';

	var pos = -1;
	for (idx = 0; idx < listNode.length; idx++) {
		var temp = Number(listNode[idx][0]);
		// console.log(temp, val, temp < val);
		if (temp < val) {
			pos = idx;
		}
	}

	if (pos == -1) {
		msg.innerHTML = 'This node has no predecessor.';
	}

	msg.innerHTML = 'Predecessor Node(id = ' + listNode[pos][0] +
					', name = ' + listNode[pos][1] +
					', birth = ' + listNode[pos][2] +
					', gpa = ' + listNode[pos][3] +
					', credit = ' + listNode[pos][4] +
					')<br>';

	// console.log(msg.innerHTML);
	textBox_id.value = '';
	textBox_id.focus();
}

function getSuccessor() {
	var val = Number(textBox_id.value);
	var listNode = bst.getAllNode();

	msg.innerHTML = '';

	var pos = listNode.length;
	for (idx = listNode.length - 1; idx >= 0; idx--) {
		var temp = Number(listNode[idx][0]);
		// console.log(temp, val, temp > val);
		if (temp > val) {
			pos = idx;
		}
	}

	if (pos == listNode.length) {
		msg.innerHTML = 'This node has no predecessor.';
	}

	msg.innerHTML = 'Successor Node(id = ' + listNode[pos][0] +
					', name = ' + listNode[pos][1] +
					', birth = ' + listNode[pos][2] +
					', gpa = ' + listNode[pos][3] +
					', credit = ' + listNode[pos][4] +
					')<br>';

	// console.log(msg.innerHTML);
	textBox_id.value = '';
	textBox_id.focus();
}

function maxNode() {
	var listNode = bst.getAllNode();
	var pos = listNode.length - 1;

	msg.innerHTML = 'Max Node(id = ' + listNode[pos][0] +
					', name = ' + listNode[pos][1] +
					', birth = ' + listNode[pos][2] +
					', gpa = ' + listNode[pos][3] +
					', credit = ' + listNode[pos][4] +
					')<br>';

	// console.log(msg.innerHTML);
	textBox_id.value = '';
	textBox_id.focus();
}

// traversal is a function
function Print(traversal) {
	var numbers = traversal.call(bst);
	msg.innerHTML = numbers.join(', ');
	textBox_id.focus();
}

function handleKeyPress(e) {
	var key = e.keyCode || e.which;
	msg.innerHTML = '';
	if (key == 13)
		InsertNode();
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Draws the tree in treeData
function drawTree() {

	// Clear the canvas
	d3.select("svg").remove();

	// This json represents the tree
	var treeData;
	// If the tree is not empty
	if (bst.root)
		treeData = bst.root.json;
	else
		return;

	// set the dimensions and margins of the diagram
	var margin = {
			top: 40,
			right: 90,
			bottom: 50,
			left: 90
		},
		width = window.innerWidth - 10 - margin.left - margin.right,
		height = window.innerHeight - 120 - margin.top - margin.bottom;

	// declares a tree layout and assigns the size
	var treemap = d3.tree()
		.size([width, height]);

	//  assigns the data to a hierarchy using parent-child relationships
	var nodes = d3.hierarchy(treeData);

	// maps the node data to the tree layout
	nodes = treemap(nodes);

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom),
		g = svg.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	// adds the links between the nodes
	var link = g.selectAll(".link")
		.data(nodes.descendants().slice(1))
		.enter().append("path")
		.attr("class", "link")
		.attr("d", function(d) {
			// If its child is the only one
			// move it to the right or to the left
			// (the D3.js tree's default will put the node
			// exactly below its parent)
			if (d.parent && d.parent.children.length == 1) {
				if (d.data.direction == 'right') {
					if (d.parent.parent)
						d.x += Math.abs(d.parent.x - d.parent.parent.x) / 2;
					else
						d.x += width / 4;
				} else {
					if (d.parent.parent)
						d.x -= Math.abs(d.parent.x - d.parent.parent.x) / 2;
					else
						d.x -= width / 4;
				}
			}

			return "M" + d.x + "," + d.y +
				"C" + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
				" " + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
				" " + d.parent.x + "," + d.parent.y;
		});

	// adds each node as a group
	var node = g.selectAll(".node")
		.data(nodes.descendants())
		.enter().append("g")
		.attr("class", function(d) {
			return "node" +
				(d.children ? " node--internal" : " node--leaf");
		})
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

	// adds the circle to the node
	node.append("circle")
		.attr("r", 15);

	// adds the text to the node
	node.append("text")
		.attr("dy", ".35em")
		.attr("y", function(d) {
			return 0;
		})
		.style("text-anchor", "middle")
		.text(function(d) {
			return d.data.name;
		});
}
