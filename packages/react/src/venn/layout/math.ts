/**
 * @upsetjs/react
 * https://github.com/upsetjs/upsetjs
 *
 * Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
 */

declare type Point = { x: number; y: number };

function len(x: number, y: number) {
  return Math.sqrt(x * x + y * y);
}

function dist(a: Point, b: Point) {
  return len(a.x - b.x, a.y - b.y);
}

export function circleIntersectionPoints(
  c0: { x: number; y: number; r: number },
  c1: { x: number; y: number; r: number }
): [Point, Point] {
  const d = dist(c0, c1);
  // based on http://paulbourke.net/geometry/circlesphere/
  const a = (c0.r * c0.r - c1.r * c1.r + d * d) / (2 * d);

  const x2 = c0.x + (a * (c1.x - c0.x)) / d;
  const y2 = c0.y + (a * (c1.y - c0.y)) / d;
  const h = Math.sqrt(c0.r * c0.r - a * a);

  const x3_1 = x2 - (h * (c1.y - c0.y)) / d;
  const y3_1 = y2 + (h * (c1.x - c0.x)) / d;
  const x3_2 = x2 + (h * (c1.y - c0.y)) / d;
  const y3_2 = y2 - (h * (c1.x - c0.x)) / d;

  return [
    {
      x: x3_1,
      y: y3_1,
    },
    {
      x: x3_2,
      y: y3_2,
    },
  ];
}

export function circleArea(r: number) {
  return r * r * Math.PI;
}

export function lineSegmentArea(p0: Point, p1: Point, r: number) {
  const c = dist(p0, p1);
  //a = b = r;
  // law of cos: a =acos((a^2 + b^2 - c^2) / 2ab)
  const angle = Math.acos((r * r + r * r - c * c) / (2 * r * r));
  // (angle - sin(angle)) / 2 * r^2
  return angle - Math.sin(angle) / (2 * r * r);
}