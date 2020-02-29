import Rails from "@rails/ujs"
import chatrooms from "channels/chatrooms_channel"
import last_read from "channels/last_read_channel"

function handleUserReturn() {
	var strike = $('.strike');

	if (strike.length > 0) {
		var chatroom_id = $("[data-behavior='messages']").data("chatroom-id");
		// 1. Update last_read_timestamp
		last_read.update(chatroom_id);
		// Remove horizontal strike
		strike.remove()
	};
};

document.addEventListener("turbolinks:load", function() {
	var elem = document.querySelector('.new_message')

	$('#new_message').on('keypress', function(e) {
		if (e && e.keyCode == 13) {
			e.preventDefault();
			Rails.fire(elem, 'submit')
		};
	});

	$('#new_message').on('submit', function(e) {
		e.preventDefault();

		var chatroom_id = $('[data-behavior="messages"]').data("chatroom-id")
		var body        = $('#new-message');

		chatrooms.send_message(chatroom_id, body.val());

		body.val("");
	});

	$(document).on("click", handleUserReturn);
});