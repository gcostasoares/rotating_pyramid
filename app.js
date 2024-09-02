const COLOR_BG = 'orange';
const COLOR_PYRAMID = 'black';
const SPEED_X = 0.02;
const SPEED_Y = 0.04;
const SPEED_Z = 0.03;

const POINT3D = function(x, y, z) { 
    this.x = x; 
    this.y = y; 
    this.z = z; 
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var h = document.documentElement.clientHeight;
var w = document.documentElement.clientWidth;
canvas.height = h;
canvas.width = w;

ctx.fillStyle = COLOR_BG;
ctx.strokeStyle = COLOR_PYRAMID;
ctx.lineWidth = w / 1000;
ctx.lineCap = "round";

// Pyramid parameters
var cx = w / 2;
var cy = h / 2;
var cz = 0;
var size = h / 8;

// Define the vertices of the pyramid
var vertices = [
    new POINT3D(cx, cy - size, cz),           // Apex
    new POINT3D(cx - size, cy + size, cz - size), // Base front-left
    new POINT3D(cx + size, cy + size, cz - size), // Base front-right
    new POINT3D(cx + size, cy + size, cz + size), // Base back-right
    new POINT3D(cx - size, cy + size, cz + size)  // Base back-left
];

// Define the edges of the pyramid (connecting vertices)
var edges = [
    [0, 1], [0, 2], [0, 3], [0, 4],  // Sides
    [1, 2], [2, 3], [3, 4], [4, 1]   // Base
];

// Set up the animation loop
var timeDelta, timeLast = 0;
requestAnimationFrame(loop);

function loop(timeNow) {
    // Calculate the time difference
    timeDelta = timeNow - timeLast;
    timeLast = timeNow;

    // Clear the canvas
    ctx.fillRect(0, 0, w, h);

    // Rotate the pyramid along the Z axis
    let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cx;
        let dy = v.y - cy;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + cx;
        v.y = y + cy;
    }

    // Rotate the pyramid along the X axis
    angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
    for (let v of vertices) {
        let dy = v.y - cy;
        let dz = v.z - cz;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + cy;
        v.z = z + cz;
    }

    // Rotate the pyramid along the Y axis
    angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cx;
        let dz = v.z - cz;
        let x = dz * Math.sin(angle) + dx * Math.cos(angle);
        let z = dz * Math.cos(angle) - dx * Math.sin(angle);
        v.x = x + cx;
        v.z = z + cz;
    }

    // Draw each edge
    for (let edge of edges) {
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
    }

    // Call the next frame
    requestAnimationFrame(loop);
}

 