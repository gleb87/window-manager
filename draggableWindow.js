function DraggableWindow(options) {
  var self = this;

  var elem;
  var template = _.template(options.template);

  /* ваш код */
  function render() {
    elem = $(template({
      title: options.title,
    }));

    elem.on("mousedown", ".draggable-window-title", onTitleDown)
    .on("mousedown", onWindowDown)
    .on("focus", onWindowFocus)
    .on("blur", onWindowBlur);

    elem.find(".draggable-window-message").add(".draggable-window-submit").on("blur", onMesSubBlur);


    elem.find(".draggable-window-message-form").on("submit", onMessageSubmit);
    elem.find(".draggable-window-title").on("selectstart dragstart", false);

    return elem;
  }

  function onMessageSubmit() {
    sendMessage();

    return false;
  }

  function sendMessage() {
    var messageElem = elem.find(".draggable-window-message");
    var dialogElem = elem.find(".draggable-window-dialog");

    var value = messageElem.val();
    if (value) {
      var mesDiv = $("<div/>", {
        html: value,
      });

      dialogElem.append(mesDiv);
      messageElem.val("");

      var mesDivBottom = mesDiv.offset().top + mesDiv.height();
      var dialogElemBottom = dialogElem.offset().top + dialogElem.innerHeight();
      console.log(dialogElem.height() + ", " + dialogElem.get(0).clientHeight);
      if (mesDivBottom > dialogElemBottom) dialogElem.scrollTop(dialogElem.get(0).scrollHeight - dialogElem.get(0).clientHeight);
    }

  }

  function startDrag(x, y) {
    elem.addClass("dragging");

    var shiftX = x - elem.offset().left;
    var shiftY = y - elem.offset().top;

    $(document).on("mousemove.dragging", onMove)
      .on("mouseup.dragging", onUp);

    function onMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    function onUp() {
      stopDrag();
    }

    function stopDrag() {
      elem.removeClass("dragging");
      $(document).off(".dragging");
    }

    function moveAt(x, y) {
      var newLeft = x - shiftX;
      var newTop = y - shiftY;

      var titleElem = elem.find(".draggable-window-title");
      var newRight = newLeft + titleElem.width();
      var newBottom = newTop + titleElem.height();

      if (newLeft < 0) newLeft = 0;
      if (newRight > $(window).width()) newLeft = $(window).width() - titleElem.width() - 2;
      if (newTop < 0) newTop = 0;
      if (newBottom > $(window).height()) newTop = $(window).height() - titleElem.height();

      elem.css({
        left: newLeft + "px",
        top: newTop + "px",
      });
    }

  }


  function onTitleDown(e) {
    elem.focus();
    startDrag(e.pageX, e.pageY);
    return false;
  }

  function onWindowFocus() {
    elem.addClass("focus");

    triggerFocus();
  }

  function onWindowBlur() {
    elem.removeClass("focus");

    triggerBlur();
  }

  function onWindowDown() {
    triggerFocus();
  }

  function triggerFocus() {
    $(self).triggerHandler({
      type: "focus",
    });
  }

  function triggerBlur() {
    $(self).triggerHandler({
      type: "blur",
    });
  }

  function onMesSubBlur() {
    triggerBlur();
  }


  self.getElement = function() {
    return elem || render();
  }

  self.setTabindex = function(index) {
    self.getElement().attr("tabindex", index);
  }

  self.setZIndex = function(index) {
    self.getElement().css("zIndex", index);
  }
}