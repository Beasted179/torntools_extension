"use strict";

(async () => {
	featureManager.registerFeature(
		"Update Notice",
		"global",
		() => settings.updateNotice,
		null,
		showNotice,
		removeNotice,
		{
			storage: ["settings.updateNotice", "version.showNotice"],
		},
		null // TODO - Check for mobile.
	);

	async function showNotice() {
		if (await checkMobile()) return;
		await requireSidebar();

		if (!version.showNotice) {
			removeNotice();
			return;
		}

		if (document.find("#ttUpdateNotice")) return;

		const currentVersion = chrome.runtime.getManifest().version;

		const parent = document.find("h2=Areas").nextElementSibling;
		parent.insertBefore(
			document.newElement({
				type: "div",
				class: "tt-sidebar-area",
				id: "ttUpdateNotice",
				children: [
					document.newElement({
						type: "div",
						children: [
							document.newElement({
								type: "a",
								href: chrome.runtime.getURL("/pages/settings/settings.html"),
								attributes: { target: "_blank" },
								children: [document.newElement({ type: "span", text: `TornTools updated: ${currentVersion}` })],
							}),
						],
					}),
				],
			}),
			parent.firstElementChild
		);
	}

	function removeNotice() {
		const notice = document.find("#ttUpdateNotice");
		if (notice) notice.remove();
	}
})();
