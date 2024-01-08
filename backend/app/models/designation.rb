class Designation < ApplicationRecord
  has_many :donations, dependent: :nullify
  has_many :donors, through: :donations

  validates :name, presence: true

  def update_total_amount(amount) = update(total_amount: total_amount + amount)
end
