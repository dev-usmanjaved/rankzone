class Api::V1::DesignationLeaderboardSerializer < ActiveModel::Serializer
  attributes :id, :name, :total_amount, :donor_count

  def donor_count = object.donors.uniq.size
end
