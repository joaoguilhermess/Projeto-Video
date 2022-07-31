class Editor {
	constructor(source, width, height, parser, result) {
		this.source = source;
		this.width = width;
		this.height = height;
		this.realWidth = width*4;
		this.realLength = this.realWidth * this.height;

		parser.width = width;
		parser.height = height;
		result.width = width;
		result.height = height;
		this.parser = parser.getContext("2d");
		this.result = result.getContext("2d");
	}

	updateSource() {
		this.parser.drawImage(this.source, 0, 0, this.width, this.height);
	}

	getFrame() {
		return this.parser.getImageData(0, 0, this.width, this.height);
	}

	updateFrame(frame) {
		this.result.putImageData(frame, 0, 0);
	}

	draw(equation) {
		this.updateSource();

		var frame = this.getFrame();
		var temp = this.getFrame();

		this.frame = frame.data;

		for (var i = 0; i < frame.data.length; i+= 4) {
			var x = Math.floor(i / this.realWidth);
			var result = equation(
				this,
				i,
				x,
				i - (x * this.realWidth),
				frame.data[i],
				frame.data[i + 1],
				frame.data[i + 2],
			);

			temp.data[i] = result[0];
			temp.data[i + 1] = result[1];
			temp.data[i + 2] = result[2];
		}

		this.updateFrame(temp);
	}
}
