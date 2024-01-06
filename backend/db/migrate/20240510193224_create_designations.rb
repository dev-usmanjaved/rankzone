class CreateDesignations < ActiveRecord::Migration[7.1]
  def change
    create_table :designations do |t|
      t.string :name, null: false
      t.decimal :total_amount, default: 0

      t.timestamps
    end
  end
end
