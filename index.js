function start_game() {
	//load elements
	sprite = document.getElementById("sprite");
	gravity = .5;
	velocity = 5;
//	move_sprite();
}

function move_sprite() {
	var x = parseInt(sprite.getAttribute("cx").slice(0,-1));
	var new_x = x + velocity;
	velocity = velocity - gravity;
	sprite.setAttribute("cx", new_x + "%");
	window.setTimeout(move_sprite, 100);
}
