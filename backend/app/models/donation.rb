class Donation < ApplicationRecord
  belongs_to :donor
  belongs_to :designation

  validates :amount, numericality: {greater_than: 0}

  after_create :update_designation_total_amount

  private

  def update_designation_total_amount = designation.update_total_amount(amount)
end
