class Util {
	static Container;

	static setContainer(container) {
		this.Container = container;
	}

	static loop(fun) {
		try {
			fun()
		} catch (e) {
			console.log(e);
		}

		var context = this;
		requestAnimationFrame(function() {
			context.loop(fun);
		});
	}

	static Slider(n, sum, sub, max, min, step, callback) {
		var box = document.createElement("div");
		var slider = document.createElement("input");
		var name = document.createElement("div");
		var value = document.createElement("div");

		slider.type = "range";
		slider.max = max;
		slider.min = min;
		slider.step = step;
		slider.className = "slider";
		slider.value = 0;

		box.className = "sliderbox";

		name.className = "text";
		name.textContent = n;

		value.className = "text";
		value.textContent = slider.value;

		slider.oninput = function() {
			callback(slider.value);
			value.textContent = slider.value;
		};

		document.addEventListener("keypress", function(event) {
			if (event.key == sum) {
				if (slider.value < max) {
					slider.value = parseInt(slider.value) + step;
					callback(slider.value);
					value.textContent = slider.value;
				}
			} else if (event.key == sub) {
				if (slider.value > min) {
					slider.value = parseInt(slider.value) - step;
					callback(slider.value);
					value.textContent = slider.value;
				}
			}
		});

		box.appendChild(name);
		box.appendChild(slider);
		box.appendChild(value);

		this.Container.appendChild(box);
	}

	static Button(key, name, callback) {
		var button = document.createElement("div");

		button.textContent = name + " (" + key + ")";
		button.className = "button";

		button.onclick = callback;

		document.addEventListener("keypress", function(event) {
			if (event.key == key) {
				button.style.animationName = "press";
				button.click();
			}
		});

		this.Container.appendChild(button);
	}

	static Video(n, video, constraints, equation, c1, c2) {
		var context = this;
		n.getUserMedia(constraints,
		function(stream) {
			video.srcObject = stream;
			video.onplay = function() {
				var editor = new Editor(video, video.videoWidth, video.videoHeight, c1, c2);

				context.Button("i", "Info", function() {
					console.log(stream);
					var track = stream.getVideoTracks()[0];
					console.log(track);
					var cap = track.getCapabilities();
					console.log(JSON.stringify(cap));
				});

				context.Button("q", "Fullscreen", function() {
					c2.click();
				});

				context.loop(function() {
					editor.draw(equation);
				});

				video.onplay = null;
			}
		}, function(e) {console.log("Error on Video", e)});
	}
}