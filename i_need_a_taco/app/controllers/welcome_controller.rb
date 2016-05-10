class WelcomeController < ApplicationController
  def index
  end

  def search
    parameters = { term: params[:term], limit: 16 }
    render json: Yelp.client.search('Little Neck', {term:'tacos'})
    # binding.pry
  end
end
