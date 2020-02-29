import consumer from "./consumer"

export default consumer.subscriptions.create("ChatroomsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
  	var active_chatroom = $(`[data-behavior="messages"][data-chatroom-id="${data.chatroom_id}"]`);
  	if (active_chatroom.length > 0) {
  		active_chatroom.append(`<div><strong>${data.username}: </strong>${data.body}</div>`);

      if (document.hidden && Notification.permission == 'granted') {
        new Notification(data.username, { body: data.body });
      };

	  } else {
	  	$(`[data-behavior='chatroom-link'][data-chatroom-id='${data.chatroom_id}']`).css("font-weight", 'bold');
	  };
  },

  send_message(chatroom_id, message) {
    this.perform("send_message", {chatroom_id: chatroom_id, message: message})
  }
});
