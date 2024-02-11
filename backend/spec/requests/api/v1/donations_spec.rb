require "rails_helper"

RSpec.describe "API::V1::Donations", type: :request do
  describe "POST /api/v1/donations" do
    let!(:designation) { create(:designation) }
    let(:valid_attributes) {
      {
        donation: {
          email: "new.donor@example.com",
          first_name: "New",
          last_name: "Donor",
          amount: 50.0,
          designation_id: designation.id
        }
      }
    }

    context "when the request is valid" do
      it "creates a donation and a new donor" do
        expect {
          post api_v1_donations_path, params: valid_attributes
        }.to change(Donation, :count).by(1)
          .and change(Donor, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
        json_response = JSON.parse(response.body)
        expect(json_response["name"]).to eq(designation.name)
        expect(json_response["total_amount"]).to eq("%.1f" % (designation.total_amount + 50.0))
        expect(json_response["donor_count"]).to eq(1)
      end
    end

    context "when the request is invalid" do
      it "does not create a donation" do
        post api_v1_donations_path, params: {donation: {amount: 0}}
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
