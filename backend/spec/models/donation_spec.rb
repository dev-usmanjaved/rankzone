require "rails_helper"

RSpec.describe Donation, type: :model do
  describe "associations" do
    it { should belong_to(:donor) }
    it { should belong_to(:designation) }
  end

  describe "validations" do
    it { should validate_numericality_of(:amount).is_greater_than(0) }
  end

  describe "callbacks" do
    let(:designation) { create(:designation, total_amount: 1000) }

    it "updates designation total_amount after create" do
      create(:donation, designation: designation, amount: 100)
      expect(designation.reload.total_amount).to eq(1100)
    end
  end
end
