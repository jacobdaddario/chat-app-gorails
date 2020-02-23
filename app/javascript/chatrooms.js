import Rails from "@rails/ujs"

document.addEventListener("turbolinks:load", function() {
	var elem = document.querySelector('.new_message')

	$('#new_message').on('keypress', function(e) {
		if (e && e.keyCode == 13) {
			e.preventDefault();
			Rails.fire(elem, 'submit')
		};
	});
});