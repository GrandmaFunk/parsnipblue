function start_game() {
	//load elements
	svg = document.getElementsByTagName("svg")[0];
	sprite = svg.getElementById("sprite");
	highscore = 0;
	jump = false;
	jump_x = 2;
	var x = parseInt(sprite.getAttribute("cx").slice(0,-1));
	var r1 = make_rect(-15, 5);
	var r2 = make_rect(-30, 5);
	var r3 = make_rect(-60,10);
	var r4 = make_rect(-95, 5);
	var r5 = make_rect(-150, 40);
	move_sprite(2, 0.1, x, false, [r1, r2, r3, r4, r5]);
			//velocity, gravity, x, side, rects
}

function reset_score() {
	var score_box = svg.getElementById("score")
	score_box.textContent = 0;
	score_box.style.opacity = 0.7;  
	score_box.setAttributeNS(null, "fill", "#FF0000");
	window.setTimeout(function() {
		score_box.style.opacity = 0.3;
		score_box.setAttributeNS(null, "fill", "#FFFFFF");
	}, 500);
}

function get_ran(min, max) {
	return Math.floor(Math.random() * (max + min + 1) + min);
}

function make_rect(y, h) {
	var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	rect.setAttributeNS(null, "x", "49%");
	rect.setAttributeNS(null, "y", y + "%");
	rect.setAttributeNS(null, "width", "2%");
	rect.setAttributeNS(null, "height", h +"%");
	rect.setAttributeNS(null, "fill", "#FFFFFF");
	svg.appendChild(rect);
	return rect;
}

function move_rects(rects) {
	for (var i = 0; i < rects.length; i++) {
		var cur_y =  parseInt(rects[i].getAttributeNS(null, "y").slice(0, -1));
		rects[i].setAttributeNS(null, "y", cur_y + 1 + "%");
		if (cur_y > 100){
			//give the rectangle that moved off the board a random height and y value above the screen
			var new_height = get_ran(5, 15);
			rects[i].setAttributeNS(null, "height", new_height + "%");
			rects[i].setAttributeNS(null, "y", 0 - get_ran(0, 100) - new_height + "%");
		}
	}
}

function check_bounds(x, velocity) {
	//return true if sprite is in bounds
	if (0 < x + velocity && x + velocity < 100) {
		return true;
	} else {
		return false;
	}
}

function check_collision(rects) {
	//checks rects against the sprite's y coordinate (75)
	//returns true if sprite and rects collided
	for (var i = 0; i < rects.length; i++) {
		var ry = parseInt(rects[i].getAttributeNS(null, "y").slice(0, -1));
		var rh = ry + parseInt(rects[i].getAttributeNS(null, "height").slice(0, -1));
		if (ry <= 75 && rh >= 75) {
			return true;
		}
	}
	return false;
}

function update_highscore(score) {
	var highscore_box = svg.getElementById("highscore");
	highscore_box.textContent = "Highscore: " + score;

}

function apply_score(rects) {
	//if no collision, score + 1
	if (!check_collision(rects)) {
		var score_box = svg.getElementById("score");
		var score = parseInt(score_box.textContent) + 1;
		score_box.textContent = score;
		if (score > highscore) {
			update_highscore(score);
			highscore = score;
		}
	} else {
		reset_score();
	}
}

function move_sprite(velocity, gravity, x, left_side, rects) {
	//moves sprite, requestAnimationFrame calls this function repetedly
	if (x < 50) {
		//sprite is on left side
		if (left_side !== true) {
			//apply score if not yet applied
			left_side = true;
			apply_score(rects);
		}
		//keep in bounds
		if (!check_bounds(x, velocity)) {
			velocity = Math.abs(velocity) + gravity;
		}else {
			velocity += gravity;
		}
		//if jump on left side
		if (velocity > 0 && jump) {
			//if going towards center, move sprite towards bounds
			velocity -= jump_x;
			jump = false;
		}else if (jump) {
			//if going towards bounds, move sprite towards center
			velocity = -jump_x/2;
			jump = false;
		}
	} else {
		//sprite on right side
		if (left_side !== false) {
			//apply score if not yet applied
			left_side = false;
			apply_score(rects);
		}
		//keep in bounds
		if (!check_bounds(x, velocity)) {
			velocity = -(velocity) - gravity;
		} else {
			velocity -= gravity; 
		}
		//if jump on right side
		if (jump && velocity < 0) {
			//if going towards center, move in opposite direction
			velocity += jump_x;
			jump = false;
		} else if (jump) {
			//if going towards bounds, move in opposite direction
			velocity = jump_x/2;
			jump = false;
		}
	}
	
	//set new position
	var new_x = x + velocity;	//sets x
	sprite.setAttribute("cx", new_x + "%");
	
	window.requestAnimationFrame( function() {
		move_sprite(velocity, gravity, new_x, left_side, rects);
		move_rects(rects);
	});
}

function entry() {
	jump = true;
}

document.onkeyup = function(e) {
	//jump on spacebar
	if (e.keyCode == 32) {
		entry();
	}
}
