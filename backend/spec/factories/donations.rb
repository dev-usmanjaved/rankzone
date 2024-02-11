FactoryBot.define do
  factory :donation do
    association :donor
    association :designation
    amount { rand(10..100) }
  end
end
