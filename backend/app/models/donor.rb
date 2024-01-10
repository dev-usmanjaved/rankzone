class Donor < ApplicationRecord
  has_many :donations, dependent: :nullify

  validates :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: true
end
