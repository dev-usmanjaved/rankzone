module Api
  module V1
    class DonationsController < ApplicationController
      def create
        donor = find_or_create_donor
        donation = donor.donations.new(donation_params)

        if donation.save
          serialized_designation = Api::V1::DesignationLeaderboardSerializer.new(donation.designation).as_json
          ActionCable.server.broadcast 'donations_channel', serialized_designation

          render json: { message: 'Thanks for your donation!' }, status: :created
        else
          render json: donation.errors.full_messages, status: :unprocessable_entity
        end
      end

      private

      def donor_params = params.require(:donation).permit(:email, :first_name, :last_name)

      def donation_params = params.require(:donation).permit(:amount, :designation_id)

      def find_or_create_donor
        Donor.find_or_create_by(email: donor_params[:email]) do |donor|
          donor.first_name = donor_params[:first_name]
          donor.last_name = donor_params[:last_name]
        end
      end
    end
  end
end
