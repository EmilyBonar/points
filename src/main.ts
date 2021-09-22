import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d");

const radius = 2;
const spacing = 10;

interface Point {
	x: number;
	y: number;
	radius: number;
	r: number;
	g: number;
	b: number;
}

let points: Point[][] = [];

if (ctx) {
	for (let x = -spacing; x <= ctx.canvas.width + spacing; x += spacing) {
		points.push([]);
		for (let y = -spacing; y <= ctx.canvas.height + spacing; y += spacing) {
			points[points.length - 1].push({ x, y, radius, r: 30, g: 30, b: 30 });
		}
	}
}
console.log(points[0]);

resize();
window.addEventListener("resize", resize);

setInterval(draw, 5);

console.log(points);
function draw() {
	if (ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		for (let x = 0; x <= points.length - 1; x++) {
			for (let y = 0; y <= points[0].length - 1; y++) {
				const p = points[x][y];
				const new_p = {
					x: p.x + Math.random() * 2 - Math.min(1, p.x),
					y: p.y + Math.random() * 2 - Math.min(1, p.y),
					radius: p.radius + Math.random() * 0.5 - Math.min(0.25, p.radius),
					r: clamp(p.r + Math.random() * 30 - Math.min(15, p.r), 0, 255),
					g: clamp(p.g + Math.random() * 30 - Math.min(15, p.g), 0, 255),
					b: clamp(p.b + Math.random() * 30 - Math.min(15, p.b), 0, 255),
				};
				points[x][y] = new_p;
				drawPoint(
					ctx,
					new_p.x,
					new_p.y,
					new_p.radius,
					`rgb(${new_p.r},${new_p.g}, ${new_p.b})`,
				);
			}
		}
	}
}

function clamp(number: number, min: number, max: number) {
	return Math.max(min, Math.min(number, max));
}

function drawPoint(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	radius: number,
	color: string,
) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.arc(x, y, radius, 0, 360);
	ctx.fill();
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	if (ctx) {
		points = [];
		for (let x = -spacing; x <= ctx.canvas.width + spacing; x += spacing) {
			points.push([]);
			for (let y = -spacing; y <= ctx.canvas.height + spacing; y += spacing) {
				points[points.length - 1].push({ x, y, radius, r: 30, g: 30, b: 30 });
			}
		}
	}
}
