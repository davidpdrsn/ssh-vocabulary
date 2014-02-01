class WordsController < ApplicationController
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

    respond_to do |format|
      if @word.destroy
        format.json { render json: @word, status: :ok }
      else
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end
end
