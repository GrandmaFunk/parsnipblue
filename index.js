function start_game() {
	//load elements
	sprite = document.getElementById("sprite");
	jump = 0;
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
			velocity = Math.abs(velocity) + gravity - jump;
		}else {
			velocity = velocity + gravity - jump;
		}
	} else {
		if (!check_bounds(x, velocity)) {
			velocity = -(velocity) - gravity + jump;
		} else {
			velocity = velocity - gravity + jump;
		}
	}

	//reset any jumps
	if (jump !== 0) {
		jump = 0;
	}
	
	var new_x = x + velocity;	//sets x
	sprite.setAttribute("cx", new_x + "%");
	
	window.requestAnimationFrame( function() {
		move_sprite(velocity, gravity, new_x);
	});
}

function entry() {
	jump = 2;
}
