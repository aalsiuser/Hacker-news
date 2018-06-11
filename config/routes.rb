Rails.application.routes.draw do
  get '*path', to: 'articles#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
