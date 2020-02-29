class AddDefaulToLastReadAt < ActiveRecord::Migration[6.0]
  def change
    change_column :chatroom_users, :last_read_at, :datetime, default: Time.at(0)
  end
end
