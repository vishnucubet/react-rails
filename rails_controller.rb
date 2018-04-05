class ClientCasesController < ApplicationController
	before_action :set_client_case, only: [:show, :edit, :update, :destroy]

	load_and_authorize_resource

	# GET /client_cases
	# GET /client_cases.json
	def index
		@client_cases = ClientCase.all
		@client_case = ClientCase.new

	end

	# GET /client_cases/1
	# GET /client_cases/1.json
	def show
		@client = Client.find(params[:client_id]) if params[:client_id].present?
		@advocate = Advocate.find(params[:advocate_id]) if params[:advocate_id].present?


	end

	# GET /client_cases/new
	def new
		@client_case = ClientCase.new
		@client = Client.find(params[:client_id])
	end

	# GET /client_cases/1/edit
	def edit
		@client = Client.find(params[:client_id])
	end

	# POST /client_cases
	# POST /client_cases.json
	def create
		@client = Client.find(params[:client_id])
		@client_case = ClientCase.new(client_case_params)
		respond_to do |format|
			if @client_case.save
				format.html { redirect_to client_client_case_path(@client, @client_case), notice: 'Client case was successfully created.' }
				format.json { render :show, status: :created, location: @client_case }
			else
				format.html { render :new }
				format.json { render json: @client_case.errors, status: :unprocessable_entity }
			end
		end
	end

	# PATCH/PUT /client_cases/1
	# PATCH/PUT /client_cases/1.json
	def update
		@client = Client.find(params[:client_id])
		respond_to do |format|
			if @client_case.update(client_case_params)
				format.html { redirect_to client_client_case_path(@client, @client_case), notice: 'Client case was successfully updated.' }
				format.json { render :show, status: :ok, location: @client_case }
			else
				format.html { render :edit }
				format.json { render json: @client_case.errors, status: :unprocessable_entity }
			end
		end
	end

	# DELETE /client_cases/1
	# DELETE /client_cases/1.json
	def destroy
		@client_case.destroy
		respond_to do |format|
			format.html { redirect_to client_cases_url, notice: 'Client case was successfully destroyed.' }
			format.json { head :no_content }
		end
	end

	private
	# Use callbacks to share common setup or constraints between actions.
	def set_client_case
		@client_case = ClientCase.find(params[:id])
	end

	# Never trust parameters from the scary internet, only allow the white list through.
	def client_case_params
		params.require(:client_case).permit(:name, :client_id, :case_number, :case_type_id, :court_hall, :court_complex_id, :case_year, :advocate_id, :file_no, :state_id, :district_id, :case_status, :nature_of_case, :advocate_for, :rank_of_party, :rank_of_opponent_party, :client_name, :opponent_name)
	end
end
