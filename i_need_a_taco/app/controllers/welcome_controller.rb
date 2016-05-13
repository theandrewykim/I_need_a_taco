class WelcomeController < ApplicationController
  def index
  end

  def search
    coordinates = { latitude: params[:latitude] , longitude: params[:longitude] }
    render json: Yelp.client.search_by_coordinates(coordinates, { term: "Mexican"})
  end
end
