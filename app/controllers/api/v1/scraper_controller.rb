class Api::V1::ScraperController < ApplicationController
    before_action :validate_url, only: [:search]
    
    def search
        response = Scraper::FetchUrls.call(url_params[:url])
        if response[:error].present?
            render json: {error: true, message: response[:error]}, status: 500
        else
            render json: LinkBlueprint.render(response)
        end
    end

    def history
        urls = Link.all
        render json: LinkBlueprint.render(urls)
    end

    private

    def url_params
        params.permit(:url)
    end

    URL_REGEX = /\A(http|https):\/\/[^\s]+/i.freeze

    def validate_url
        if url_params[:url].blank?
            render json: {error: true, message: "URL can't be blank"}, status: 500
        elsif url_params[:url] !~ URL_REGEX
            render json: {error: true, message: "Not a valid URL"}, status: 500
        end
    end
end