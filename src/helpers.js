export function random(max) {
	const colours = ["green", "red", "yellow", "blue"]
  return colours[Math.floor(Math.random() * max)];
}

export function arraysEqual(a, b) {
    for(let i = 0; i < a.length; i++) {
      if(a[i] !== b[i]) {
      	return false;
      }
    }
	return true;
}