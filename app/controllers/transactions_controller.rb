class TransactionsController < ApplicationController
  def index
    @transactions = if params[:l] # l is the upper left and lower right coordinates for map box
                      sw_lat, sw_lng, ne_lat, ne_lng = params[:l].split(",")
                      center = Geocoder::Calculations.geographic_center([[sw_lat, sw_lng], [ne_lat, ne_lng]])
                      distance = Geocoder::Calculations.distance_between(center, [sw_lat, ne_lng])
                      box      = Geocoder::Calculations.bounding_box(center, distance)
                      Transaction.within_bounding_box(box) # search in a circle with given radius
                    elsif params[:near]
                      Transaction.near(params[:near])
                    else
                      Transaction.all
                    end
    @transactions = @transactions.page(params[:page]).per(5)
  end

  # hek
  #
  def show
    @transaction = nil
  end
end
