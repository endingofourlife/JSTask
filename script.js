// Get the canvas and its context

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the variables for the selected points and their radius
let pointA = null;
let pointB = null;
let pointC = null;
let pointD = null;
let radiusAB = null;
let radiusCD = null;

// Define a function to draw a circle at a given point with a given radius
function drawCircle(point, radius, color) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

// Define a function to draw the intersection points of two circles
function drawIntersectionPoints(point1, radius1, point2, radius2) {
  // Calculate the distance between the two points
  const distance = Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );

  // If the two circles do not intersect - return early
  if (distance > radius1 + radius2 || distance < Math.abs(radius1 - radius2)) {
    return;
  }

  // Calculate the coordinates of the two intersection points
  const a =
    (Math.pow(radius1, 2) - Math.pow(radius2, 2) + Math.pow(distance, 2)) /
    (2 * distance);
  const h = Math.sqrt(Math.pow(radius1, 2) - Math.pow(a, 2));
  const p2x = point1.x + (a * (point2.x - point1.x)) / distance;
  const p2y = point1.y + (a * (point2.y - point1.y)) / distance;
  const int1x = p2x + (h * (point2.y - point1.y)) / distance;
  const int1y = p2y - (h * (point2.x - point1.x)) / distance;
  const int2x = p2x - (h * (point2.y - point1.y)) / distance;
  const int2y = p2y + (h * (point2.x - point1.x)) / distance;

  // Draw the intersection points as red circles
  drawCircle({ x: int1x, y: int1y }, 5, "red");
  drawCircle({ x: int2x, y: int2y }, 5, "red");

  // For the circle created at the point A
  let radiusA = Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );
  ctx.beginPath();
  ctx.arc(pointA.x, pointA.y, radiusA, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.fillText(`Radius A: ${radiusA}px`, pointA.x - 30, pointA.y + 20);

  // For the circle created at the point C
  let radiusC = Math.sqrt(
    Math.pow(pointD.x - pointC.x, 2) + Math.pow(pointD.y - pointC.y, 2)
  );
  ctx.beginPath();
  ctx.arc(pointC.x, pointC.y, radiusC, 0, 2 * Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.fillText(`Radius C: ${radiusC}px`, pointC.x - 30, pointC.y + 20);

  // Print the coordinates of the intersection points to the console
  console.log(
    `Intersection points: (${int1x}, ${int1y}) and (${int2x}, ${int2y})`
  );
}

// Define a function to draw selected points as black circles
function drawSelectedPoints() {
  // Draw a black circle for point A
  if (pointA) {
    drawCircle(pointA, 2.5, "black");
  }
  // Draw a black circle for point B
  if (pointB) {
    drawCircle(pointB, 2.5, "black");
  }
  // Draw a black circle for point C
  if (pointC) {
    drawCircle(pointC, 2.5, "black");
  }
  // Draw a black circle for point D
  if (pointD) {
    drawCircle(pointD, 2.5, "black");
  }
}

// Call the drawSelectedPoints function after each click event to redraw the selected points
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Determine which point was clicked based on the order they were selected
  if (!pointA) {
    pointA = { x: x, y: y };
  } else if (!pointB) {
    pointB = { x: x, y: y };
    radiusAB = Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
    );
    // Draw the blue circle centered at point A
    drawCircle(pointA, radiusAB, "blue");
  } else if (!pointC) {
    pointC = { x: x, y: y };
  } else if (!pointD) {
    pointD = { x: x, y: y };
    radiusCD = Math.sqrt(
      Math.pow(pointD.x - pointC.x, 2) + Math.pow(pointD.y - pointC.y, 2)
    );
    // Draw the blue circle centered at point C
    drawCircle(pointC, radiusCD, "yellow");

    if (radiusAB && radiusCD) {
      drawIntersectionPoints(pointA, radiusAB, pointC, radiusCD);
    }
  }

  // Call the drawSelectedPoints function to redraw the selected points
  drawSelectedPoints();
});

function reset() {
  pointA = null;
  pointB = null;
  pointC = null;
  pointD = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("about-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};