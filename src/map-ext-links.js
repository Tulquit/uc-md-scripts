(function () {
	function processExternalLinks() {
		var externalAnchors = document.querySelectorAll("a:not([href*='escuelacorporativa.com'])");
		var anchorsWithoutHash = Array.from(externalAnchors).filter((link) => {
			const hrefAttr = link.attributes.getNamedItem("href");
			if (!hrefAttr || !hrefAttr.value) return false;
			return !hrefAttr.value.startsWith("#");
		});
		anchorsWithoutHash.forEach((anchor) => {
			anchor.setAttribute("target", "_blank");
		});
	} 

	function hideUserNotifications() {
		var userWrapper = document.getElementById("loggedin-user");
		if (!userWrapper) return;
		var userControls = userWrapper.querySelectorAll(".popover-region");
		userControls.forEach((control) => {
			control.style.display = "none";
		});
	}

	function init() {
		if (!isInIframe()) {
			return;
		}
		processExternalLinks();
		hideUserNotifications();
	}

	ready(init);

	//src: https://stackoverflow.com/a/326076/6814301
	function isInIframe() {
		try {
			return window.self !== window.top;
		} catch (ex) {
			return true;
		}
	}

	function ready(fn) {
		if (document.readyState != "loading") {
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}
})();
