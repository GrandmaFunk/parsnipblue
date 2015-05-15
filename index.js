function start_game() {
	//load elements
	sprite = document.getElementById("sprite");
	jump = 0;
	var x = parseInt(sprite.getAttribute("cx").slice(0,-1));
	move_sprite(4, .5, x );
}

function move_sprite(velocity, gravity, x) {
	var new_x = x + velocity;
	if (new_x < 50) {
		velocity = velocity + gravity - jump;
	} else {
		velocity = velocity - gravity + jump;
	}

	//spring motion
	if (velocity - gravity * 2 > 0) {
		velocity -= 0.2;
	}

	//reset any jumps
	if (jump !== 0) {
		jump = 0;
	}

	sprite.setAttribute("cx", new_x + "%");
	window.setTimeout(move_sprite, 100, velocity, gravity, new_x);
}

function entry() {
	jump = 3;
}
