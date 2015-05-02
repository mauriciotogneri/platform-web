	
	var Input =
	{
		pressing: {},
		pressed:  {},
		
		LEFT:  37,
		UP:    38,
		RIGHT: 39,
		DOWN:  40,
		
		clear: function()
		{
			this.pressed = {};
		},
		
		isPressed: function(keyCode)
		{
			return this.pressed[keyCode];
		},
		
		isPressing: function(keyCode)
		{
			return this.pressing[keyCode];
		},
		
		onKeyDown: function(event)
		{
			this.pressing[event.keyCode] = true;
			this.pressed[event.keyCode]  = true;
		},
		
		onKeyUp: function(event)
		{
			delete this.pressing[event.keyCode];
		}
	};
	
	window.addEventListener('keyup',   function(event) { Input.onKeyUp(event); },   false);
	window.addEventListener('keydown', function(event) { Input.onKeyDown(event); }, false);