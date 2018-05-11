class TransactionsController < ApplicationController
  def index
    @transactions = if params[:near]
                      Transaction.near(params[:near])
                    else
                      Transaction.all
                    end
    @transactions = @transaction.page(params[:page]).per(5)
  end

  def show
    @transaction = Transaction.find(params[:id])
  end
end
