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

		requestAnimationFrame(function() {
			this.loop(fun);
		});
	}

	static Slider(max, min, step, callback) {
		var slider = document.createElement("input");

		slider.type = "range";
		slider.max = max;
		slider.min = min;
		slider.step = step;
		slider.className = "slider";

		slider.oninput = function() {
			callback(slider.value);
		};

		this.Container.appendChild(slider);
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

}