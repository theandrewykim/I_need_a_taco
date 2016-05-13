class WelcomeController < ApplicationController
  def index
  end

  def search
    coordinates = { latitude: params[:latitude] , longitude: params[:longitude] }
    search_params = {term: "Mexican", radius_filter: 10000, sort: 0}
    bounding_box = { sw_latitude: coordinates[:latitude].to_i - 5, sw_longitude: coordinates[:longitude].to_i - 5, ne_latitude: coordinates[:longitude].to_i + 5, n_longitude: coordinates[:longitude].to_i + 5 }
    render json: Yelp.client.search_by_coordinates(coordinates, search_params)
  end
end
