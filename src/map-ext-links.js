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

	function removeTargetBlankToSpecificLinks() {
		var linksData = [
			{
				pageKey: "id=8866",
				containerSelector: "#region-bs-main-and-pre",
				linkKeysByIdParam: ["187", "220", "231", "230", "229", "228"],
			},
		];

		function buildSelector(containerSelector, linkKey) {
			//#container a[href*='id=187']
			return containerSelector + " a[href*='id=" + linkKey + "']";
		}

		function processLinkData(linkData) {
			if (!window.location.search || !window.location.search.includes(linkData.pageKey)) {
				console.debug("page key not found");
				return;
			}

			var mergedSelectors = linkData.linkKeysByIdParam
				.map((linkKey) => buildSelector(linkData.containerSelector, linkKey))
				.join(", ");

			if (!mergedSelectors) {
				console.debug("null merged selectors");
				return;
			}
			var linksToTreat = Array.from(document.querySelectorAll(mergedSelectors));
			linksToTreat
				.filter((link) => link.hasAttribute("target"))
				.forEach((link) => {
					link.removeAttribute("target");
				});
		}

		linksData.forEach((linkData) => processLinkData(linkData));
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
		removeTargetBlankToSpecificLinks();
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
