class Editor {
	constructor(source, width, height, scale, canvas1, canvas2) {
		height *= scale;
		width *= scale;
		this.source = source;
		this.width = width;
		this.height = height;
		this.canvas1 = canvas1;
		this.canvas2 = canvas2;
		this.realWidth = width*4;
		this.realLength = this.realWidth * this.height;

		this.canvas1.width = width;
		this.canvas1.height = height;
		this.canvas2.width = width;
		this.canvas2.height = height;
		this.parser = parser.getContext("2d");
		this.result = result.getContext("2d");
	}

	updateSize(scale) {
		this.width /= scale;
		this.height /= scale;
		this.realWidth = width*4;
		this.realLength = this.realWidth * this.height;

		this.canvas1.width = this.width;
		this.canvas1.height = this.height;
		this.canvas2.width = this.width;
		this.canvas2.height = this.height;
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
			temp.data[i + 3] = 255;
		}

		this.updateFrame(temp);
	}
}