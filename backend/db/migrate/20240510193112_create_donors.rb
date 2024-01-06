class CreateDonors < ActiveRecord::Migration[7.1]
  def change
    create_table :donors do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false

      t.timestamps
    end
    add_index :donors, :email, unique: true
  end
end
