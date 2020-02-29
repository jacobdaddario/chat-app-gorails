import consumer from "./consumer"
import last_read from "./last_read_channel"

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
  		
      // Insert the message

      if (document.hidden) {
        // 1. Check to see if there's a divider on the page
        if ($('.strike').length == 0) {
          active_chatroom.append(`<div class='strike'><span>Unread Messages</span></div>`);
        };
        // 2. If there's no divider on the page, insert one
        if (Notification.permission == 'granted') {
          new Notification(data.username, { body: data.body });
        };
      } else {
        // Update last_read_timestamp 
        last_read.update(data.chatroom_id);
      };

      // Insert the message onto the page
      active_chatroom.append(`<div><strong>${data.username}: </strong>${data.body}</div>`);

	  } else {
	  	$(`[data-behavior='chatroom-link'][data-chatroom-id='${data.chatroom_id}']`).css("font-weight", 'bold');
	  };
  },

  send_message(chatroom_id, message) {
    this.perform("send_message", {chatroom_id: chatroom_id, message: message})
  }
});
