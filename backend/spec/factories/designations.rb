FactoryBot.define do
  factory :designation do
    name { Faker::Lorem.words(number: 4).join(" ") }
  end
end
