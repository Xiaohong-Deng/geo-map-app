class TransactionsController < ApplicationController
  def index
    @transactions = if params[:l] # l is the upper left and lower right coordinates for map box
                      sw_lat, sw_lng, ne_lat, ne_lng = params[:l].split(",")
                      Transaction.search("*", fields: [:_all], page: params[:page], per_page: 5, where: {
                        location: {
                          top_left: {
                            lat: ne_lat,
                            lon: sw_lng
                          },
                          bottom_right: {
                            lat: sw_lat,
                            lon: ne_lng
                          }
                        }
                      })
                    elsif params[:near]
                      location = Geocoder.search(params[:near]).first
                      Transaction.search "*", fields: [:_all], page: params[:page], per_page: 5,
                        boost_by_distance: { location: { origin: { lat: location.latitude, lon: location.longitude } } },
                        where: {
                          location: {
                            near: {
                              lat: location.latitude,
                              lon: location.longitude
                            },
                            within: "5mi"
                          }
                        }
                    else
                      Transaction.page(params[:page]).per(5)
                    end
  end

  # hek
  #
  def show
    @transaction = nil
  end
end
