designations = [
  "Athletics",
  "Area of Greatest Need",
  "College of Education",
  "Mission and Ministry",
  "College of Veterinary Medicine",
  "Student Financial Aid"
]

puts "Data Seeding Started"
designations.each { |name| Designation.find_or_create_by!(name: name) }
designations = Designation.all
puts "\n========================"
puts "Designations created"

donors = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "testdonor01@example.com"
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    email: "testdonor02@example.com"
  },
  {
    first_name: "John",
    last_name: "Doe",
    email: "testdonor03X@example.com"
  }
]

donors.each { |donor| Donor.find_or_create_by!(donor) }
donors = Donor.all
puts "\n========================"
puts "Donors created"

10.times do |donation|
  Donation.create!(amount: rand(100..1000), donor: donors.sample, designation: designations.sample)
end

puts "\n========================"
puts "Donations created"
puts "Data Seeding Completed"
