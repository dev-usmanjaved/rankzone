require "rails_helper"

RSpec.describe Designation, type: :model do
  describe "associations" do
    it { should have_many(:donations).dependent(:nullify) }
  end

  describe "validations" do
    it { should validate_presence_of(:name) }
  end
end
