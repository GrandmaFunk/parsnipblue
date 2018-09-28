/*
 I made several changes here, 
 	first I eliminated the left_side varriable and replaced it with an on the fly calculation,
	second, I removed the or statements for detecting when the ball hits the edges in favor of a single deviation from center value,
	third, I replaced the duplicate If statements for modifying the velocity with a single statement that calculates how to modify the velocity on the fly
*/

function start() {
	sprite = document.getElementById("sprite");
	score_box = document.getElementById("score");
	highscore = 0;
	jump = false;
	moveSprite(2, -0.1, 50, [makeRect(-15, 5), makeRect(-30, 5), makeRect(-60, 10), makeRect(-95, 5), makeRect(-150, 40)], 0);
			//velocity, gravity, x, [[rect, y, h]], score
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
	return [rect, y, h];
}

function moveRects(rects) {
	for (var i = 0; i < rects.length; i++) {
		if (rects[i][1] > 100){
			rects[i][1] = 0 - getRandom(20, 70);
			rects[i][0].setAttributeNS(null, "y", rects[i][1] + "%");
			rects[i][2] = getRandom(5, 20);
			rects[i][0].setAttributeNS(null, "height", rects[i][2] + "%");
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

function setScore(rects, score) {
	if (didCollide(rects)) {
		score = 0;
	} else {
		score += 1;
		if (score > highscore) {
			document.getElementById("highscore").textContent = "Highscore: " + score;
			highscore = score;
		}
	}
	score_box.textContent = score;
	return score;
}

function moveSprite(velocity, gravity, x, rects, score) {
	// if the ball crosses from one side of the board to the other
	if (gravity * (x-50) > 0){
		gravity = -gravity;
		score = setScore(rects, score);
	
	}
	
	// if the ball reaches the edge of the game board
	if (Math.abs(x + velocity - 50) > 50) { 
		velocity = -velocity;
		score = 0;
		score_box.textContent = score;
	} else {
		velocity += gravity;
	}

	if (jump) {
		if (velocity*gravity > 0) {
			velocity -= 2 * (gravity/Math.abs(gravity));
		} else {
			velocity = -gravity * 20;
		}
		jump = false;
	}
	
	sprite.setAttribute("cx", (x + velocity) + "%");
	window.requestAnimationFrame( function() {
		moveSprite(velocity, gravity, (x + velocity), moveRects(rects), score);
	});
}

function entry() {
	jump = true;
	return false;
}

document.onkeyup = function(e) {
	if (e.keyCode == 32) {
		entry()
	}
}
