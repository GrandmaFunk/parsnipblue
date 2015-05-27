function start() {
	sprite = document.getElementById("sprite");
	score_box = document.getElementById("score");
	highscore = 0;
	jump = false;
	var x = parseInt(sprite.getAttribute("cx").slice(0,-1));
	var r1 = makeRect(-15, 5);
	var r2 = makeRect(-30, 5);
	var r3 = makeRect(-60,10);
	var r4 = makeRect(-95, 5);
	var r5 = makeRect(-150, 40);
	moveSprite(2, -0.1, x, false, [[r1, -15, 5], [r2, -30, 5], [r3, -60, 10], [r4, -95, 5], [r5, -150, 40]], 0);
			//velocity, gravity, x, left_side, [rect, y, h], score
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max + min + 1) + min);
}

function makeRect(y, h) {
	var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	svg = document.getElementsByTagName("svg")[0];
	rect.setAttributeNS(null, "x", "49%");
	rect.setAttributeNS(null, "y", y + "%");
	rect.setAttributeNS(null, "width", "2%");
	rect.setAttributeNS(null, "height", h + "%");
	rect.setAttributeNS(null, "fill", "#FFFFFF");
	svg.appendChild(rect);
	return rect;
}

function moveRects(rects) {
	for (var i = 0; i < rects.length; i++) {
		if (rects[i][1] > 100){
			rects[i][2] = getRandom(5, 20);
			rects[i][0].setAttributeNS(null, "height", rects[i][2] + "%");
			rects[i][1] = 0 - getRandom(20, 70);
			rects[i][0].setAttributeNS(null, "y", rects[i][1] + "%");
		} else {
			rects[i][1] += 1;
			rects[i][0].setAttributeNS(null, "y", rects[i][1] + "%");
		}
	}
	return rects;
}

function didCollide(rects) {
	for (var i = 0; i < rects.length; i++) {
		if (rects[i][1] <= 75 && (rects[i][1] + rects[i][2]) >= 75) {
			return true;
		}
	}
	return false;
}

function setHighscore(score) {
	document.getElementById("highscore").textContent = "Highscore: " + score;
	highscore = score;
}

function setScore(rects, score) {
	if (!didCollide(rects)) {
		score += 1;
		if (score > highscore) {
			setHighscore(score);
		}
	} else {
		score = 0;
	}
	score_box.textContent = score;
	return score;
}

function moveSprite(velocity, gravity, x, left_side, rects, score) {
	if (x < 50) {
		if (left_side === false) {
			left_side = true;
			gravity = Math.abs(gravity);
			score = setScore(rects, score);
		}
	} else {
		if (left_side === true) {
			left_side = false;
			gravity = -gravity;
			score = setScore(rects, score);
		}
	}

	if (0 > x + velocity || x + velocity > 100) { 
		velocity = -velocity + gravity;
	} else {
		velocity += gravity;
	}

	if (jump) {
		if (velocity > 0 && gravity > 0) {
			velocity -= 2;
		} else if (velocity < 0 && gravity < 0) {
			velocity += 2;
		} else {
			velocity = (-gravity * 10);
		}
	jump = false;
	}
	
	sprite.setAttribute("cx", (x + velocity) + "%");
	window.requestAnimationFrame( function() {
		moveSprite(velocity, gravity, (x + velocity), left_side, moveRects(rects), score);
	});
}

function entry() {
	jump = true;
	return false;
}

document.onkeyup = function(e) {
	if (e.keyCode == 32) {
		entry();
	}
}
