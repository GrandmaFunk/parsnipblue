function start_game() {
	//load elements
	sprite = document.getElementById("sprite");

	var x = parseInt(sprite.getAttribute("cx").slice(0,-1));
	move_sprite(4, .5, x );
}

function move_sprite(velocity, gravity, x) {
	var new_x = x + velocity;
	if (new_x < 50) {
		velocity = velocity + gravity;
	} else {
		velocity = velocity - gravity;
	}
	sprite.setAttribute("cx", new_x + "%");
	window.setTimeout(move_sprite, 100, velocity, gravity, new_x);
}
