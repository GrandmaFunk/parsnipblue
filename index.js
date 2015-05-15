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
	var new_x = x + velocity;	//sets x

	//rest of the function gets new variables for next function call

	//swing back and forth
	if (new_x < 50) {
		if (!check_bounds(new_x, velocity)) {
			velocity = Math.abs(velocity) + gravity - jump;
		}else {
			velocity = velocity + gravity - jump;
		}
	} else {
		if (!check_bounds(new_x, velocity)) {
			velocity = -(velocity) - gravity + jump;
		} else {
			velocity = velocity - gravity + jump;
		}
	}

	//reset any jumps
	if (jump !== 0) {
		jump = 0;
	}
	
	sprite.setAttribute("cx", new_x + "%");
	//window.setTimeout(move_sprite, 50, velocity, gravity, new_x);
	window.requestAnimationFrame( function() {
		move_sprite(velocity, gravity, new_x);
	});
}

function entry() {
	jump = 2;
}
