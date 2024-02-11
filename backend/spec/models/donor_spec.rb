require "rails_helper"

RSpec.describe Donor, type: :model do
  describe "associations" do
    it { should have_many(:donations).dependent(:nullify) }
  end

  describe "validations" do
    subject { build(:donor) }

    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
  end
end
