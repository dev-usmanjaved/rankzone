module Api
  module V1
    class DesignationsController < ApplicationController
      def index
        render json: Designation.all, each_serializer: Api::V1::DesignationSerializer
      end

      def create
        designation = Designation.new(designation_params)
        if designation.save
          render json: designation, serializer: Api::V1::DesignationSerializer, status: :created
        else
          render json: designation.errors, status: :unprocessable_entity
        end
      end

      def leaderboard
        designations = Designation.all
        total_count = designations.size
        designations = designations.order(total_amount: :desc).page(params[:page]).per(params[:per_page])

        render json: {designations: designations, total_count: total_count }, each_serializer: Api::V1::DesignationLeaderboardSerializer
      end

      private

      def designation_params = params.require(:designation).permit(:name, :total_amount)
    end
  end
end
