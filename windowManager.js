(function() {
	var template;
	var windows = [];

	window.WindowManager = {
		setTemplate: function(newTemplate) {
			template = newTemplate;
		},

		addWindow: function(options) {
			var win = new DraggableWindow({
				title: options.title,
				template: template,
			});
			win.getElement().appendTo("body");
			
			$(win).on("focus", onFocus);

			windows.push(win);

			win.setTabindex(windows.length);
			win.setZIndex(windows.length);
		}
	};

	function onFocus() {
		var ZIndex = this.getZIndex();
		pullWindowUp(ZIndex);
	}

	function pullWindowUp(ZIndex) {
		for (var i = 0; i < windows.length; i++) {
			var ZIndexI = windows[i].getZIndex();
			if (ZIndexI > ZIndex) {
				windows[i].setZIndex(ZIndexI - 1);
			} else if (ZIndexI == ZIndex) windows[i].setZIndex(windows.length);
		};
	}
})();