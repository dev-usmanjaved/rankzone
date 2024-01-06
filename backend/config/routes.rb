Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :designations, only: %i[index create] do
        get :leaderboard, on: :collection
      end
      resources :donations, only: %i[create]
    end
  end

  mount ActionCable.server => '/cable'
end
