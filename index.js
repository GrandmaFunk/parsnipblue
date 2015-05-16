function start_game() {
	//load elements
	sprite = document.getElementById("sprite");
	jump = false;
	jump_x = 2;
	var x = parseInt(sprite.getAttribute("cx").slice(0,-1));
	move_sprite(2, 0.1, x );
			//velocity, gravity, x
}

function check_bounds(x, velocity) {
	//return true if sprite is in bounds
	if (0 < x + velocity && x + velocity < 100) {
		return true;
	} else {
		return false;
	}
}

function move_sprite(velocity, gravity, x) {

	//gets new velocity to swing sprite from center
	if (x < 50) {
		if (!check_bounds(x, velocity)) {
			velocity = Math.abs(velocity) + gravity;
		}else {
			velocity = velocity + gravity;
		}
		//if jump on left side
		if (velocity > 0 && jump) {
			//if going towards center, move out
			velocity = velocity - jump_x;
			jump = false;
		}else if (jump) {
			//if going towards bounds, move in
			velocity = velocity + jump_x;
			jump = false;
		}
	} else {
		if (!check_bounds(x, velocity)) {
			velocity = -(velocity) - gravity;
		} else {
			velocity = velocity - gravity; 
		}
		//if jump on right side
		if (jump && velocity < 0) {
			//if going towards center
			velocity = velocity + jump_x;
			jump = false;
		} else if (jump) {
			//if going towards bounds
			velocity = velocity - jump_x;
			jump = false;
		}
	}

	var new_x = x + velocity;	//sets x
	sprite.setAttribute("cx", new_x + "%");
	
	window.requestAnimationFrame( function() {
		move_sprite(velocity, gravity, new_x);
	});
}

function entry() {
	jump = true;
}
