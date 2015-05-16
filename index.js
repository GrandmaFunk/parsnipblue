function start_game() {
	//load elements
	sprite = document.getElementById("sprite");
	rects = svg.getElementsByTagName("rect");
	svg = document.getElementsByTagName("svg")[0];
	jump = false;
	jump_x = 2;
	var x = parseInt(sprite.getAttribute("cx").slice(0,-1));
	move_sprite(2, 0.1, x, false);
			//velocity, gravity, x, side
	make_rect(-15, 5);
	make_rect(-30, 5);
	make_rect(-60,10);
	make_rect(-95, 5);
	make_rect(-150, 40);
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
	rect.setAttributeNS(null, "fill", "white");
	svg.appendChild(rect);
}

function move_rects() {
	for (var i = 0; i < rects.length; i++) {
		var cur_y =  parseInt(rects[i].getAttributeNS(null, "y").slice(0, -1));
		rects[i].setAttributeNS(null, "y", cur_y + 1 + "%");
		if (cur_y > 100){
			//give the rectangle that moved off the board a random height and y value above the screen
			var new_height = get_ran(5, 15);
			rects[i].setAttributeNS(null, "height", new_height + "%");
			rects[i].setAttributeNS(null, "y", 0 - get_ran(0, 100) - new_height + "%");
			//rects[i].setAttributeNS(null, "y", 0 - parseInt(rects[i].getAttributeNS(null, "height").slice(0, -1)) + "%");
			
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

function check_collision() {
	
}

function apply_score() {
	//if no collision, score + 1
	if (!check_collision()) {
		var score = document.getElementById("score");
		score.textContent = parseInt(score.textContent) + 1;
	} else {
		//reset_game
	}
}

function move_sprite(velocity, gravity, x, left_side) {
	//moves sprite, requestAnimationFrame calls this function repetedly
	
	if (x < 50) {
		//sprite is on left side
		if (left_side !== true) {
			//apply score if not yet applied
			left_side = true;
			apply_score();
		}
		//keep in bounds
		if (!check_bounds(x, velocity)) {
			velocity = Math.abs(velocity) + gravity;
		}else {
			velocity = velocity + gravity;
		}
		//if jump on left side
		if (velocity > 0 && jump) {
			//if going towards center, move sprite towards bounds
			velocity = velocity - jump_x;
			jump = false;
		}else if (jump) {
			//if going towards bounds, move sprite towards center
			velocity = velocity + jump_x;
			jump = false;
		}
	} else {
		//sprite on right side
		if (left_side !== false) {
			//apply score if not yet applied
			left_side = false;
			apply_score();
		}
		//keep in bounds
		if (!check_bounds(x, velocity)) {
			velocity = -(velocity) - gravity;
		} else {
			velocity = velocity - gravity; 
		}
		//if jump on right side
		if (jump && velocity < 0) {
			//if going towards center, move in opposite direction
			velocity = velocity + jump_x;
			jump = false;
		} else if (jump) {
			//if going towards bounds, move in opposite direction
			velocity = velocity - jump_x;
			jump = false;
		}
	}
	
	//set new position
	var new_x = x + velocity;	//sets x
	sprite.setAttribute("cx", new_x + "%");
	
	window.requestAnimationFrame( function() {
		move_sprite(velocity, gravity, new_x, left_side);
		move_rects();
	});
}

function entry() {
	jump = true;
}
