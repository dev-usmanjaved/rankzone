# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_10_193406) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "designations", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "total_amount", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "donations", force: :cascade do |t|
    t.decimal "amount", null: false
    t.bigint "donor_id"
    t.bigint "designation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["designation_id"], name: "index_donations_on_designation_id"
    t.index ["donor_id"], name: "index_donations_on_donor_id"
  end

  create_table "donors", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_donors_on_email", unique: true
  end

end
