require "rails_helper"

RSpec.describe "Api::V1::Designations", type: :request do
  describe "GET /index" do
    it "returns all designations" do
      create_list(:designation, 3)

      get api_v1_designations_path

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response).to be_an(Array)
      expect(json_response.first).to be_a(Hash)
      expect(json_response.size).to eq(3)
      expect(json_response.first.keys).to contain_exactly("id", "name")
    end
  end

  describe "GET /leaderboard" do
    let!(:designations) { create_list(:designation, 2, total_amount: 1000) }
    let!(:donor1) { create(:donor, donations: [create(:donation, designation: designations.first)]) }
    let!(:donor2) { create(:donor, donations: [create(:donation, designation: designations.first)]) }
    let!(:donor3) { create(:donor, donations: [create(:donation, designation: designations.last)]) }

    it "returns correct leaderboard info for all designations" do
      get leaderboard_api_v1_designations_path

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(2)

      json_response.each do |entry|
        designation = designations.find { |d| d.id == entry["id"] }
        expect(entry["name"]).to eq(designation.name)
        expect(entry["total_amount"]).to eq("%.1f" % designation.total_amount)
        expect(entry["donor_count"]).to eq(designation.donors.uniq.count)
      end
    end
  end

  describe "GET /leaderboard when data is greater than page size" do
    let!(:designations) { create_list(:designation, 15) }

    it "returns all designations as default page size is 25" do
      get leaderboard_api_v1_designations_path

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(15)
    end

    it "returns no designations as all the of them are on first page" do
      get leaderboard_api_v1_designations_path, params: {page: 2}

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(0)
    end

    it "returns 10 designations as page_size is 10" do
      get leaderboard_api_v1_designations_path, params: {per_page: 10, page: 1}

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(10)
    end

    it "returns 5 designations as ther is only 5 on the second page_size" do
      get leaderboard_api_v1_designations_path, params: {per_page: 10, page: 2}

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(5)
    end
  end

  describe "POST /create" do
    let(:valid_attributes) { {designation: {name: "New Project", total_amount: 100.00}} }
    let(:invalid_attributes) { {designation: {total_amount: 100.00}} } # Missing name

    context "when the request is valid" do
      it "creates a new designation" do
        designation_params = {designation: {name: "New Cause", total_amount: 100.00}}

        expect {
          post api_v1_designations_path, params: designation_params
        }.to change(Designation, :count).by(1)

        expect(response).to have_http_status(:created)
        json_response = JSON.parse(response.body)
        expect(json_response["name"]).to eq("New Cause")
      end
    end

    context "when the request is invalid" do
      it "returns a status code 422" do
        post api_v1_designations_path, params: invalid_attributes

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)
        expect(json_response["name"]).to include("can't be blank")
      end
    end
  end
end
