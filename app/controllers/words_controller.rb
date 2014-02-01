class WordsController < ApplicationController
  before_filter :set_headers

  def index
    @words = Word.all
    respond_to do |format|
      format.html
      format.json { render json: @words }
    end
  end

  def create
    @word = Word.new(params[:word])

    respond_to do |format|
      if @word.save
        format.json { render json: @word, status: :created, location: @word }
      else
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @word = Word.find(params[:id])
    if @word.destroy
      format.json { render json: @word }
    end
  end

private

  def set_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE'
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, X-CSRF-Token'
  end
end
