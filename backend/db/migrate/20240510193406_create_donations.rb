class CreateDonations < ActiveRecord::Migration[7.1]
  def change
    create_table :donations do |t|
      t.decimal :amount, null: false
      t.belongs_to :donor
      t.belongs_to :designation

      t.timestamps
    end
  end
end
