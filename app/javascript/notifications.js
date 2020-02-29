document.addEventListener("turbolinks:load", function() {
	if (Notification.permission == "default") {
		Notification.requestPermission();
	};
});