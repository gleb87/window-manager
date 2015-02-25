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
			win.setZIndex(900);
			$(win).on("focus", onFocus)
			.on("blur", onBlur);

			windows.push(win);

			win.setTabindex(windows.length);
		}
	};

	function onFocus() {
		this.setZIndex(999);
	}

	function onBlur() {
		this.setZIndex(900);
	}
})();