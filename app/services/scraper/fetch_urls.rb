require 'nokogiri'
require 'open-uri'

class Scraper::FetchUrls < ApplicationService

  def initialize(url)
    @url = url
  end

  def call
    fetch_links
  end

  private

  def fetch_links
    begin
      document = Nokogiri::HTML(URI.open(@url)) # Fetch and parse HTML
      links = document.css('a') # Select all anchor tags
      title = document.at('title')&.text
      links = links.map do |link|
        if link['href'].present?
          {
            name: link.text.strip,
            endpoint: get_url(link['href'])
          }
        end
      end.compact.uniq
      save_data(links, title) # save to database
    rescue StandardError => e
      { error: "Failed to fetch links: #{e.message}" }
    end
  end

  def get_url link
    return @url + link if link.start_with?("#")
    return @url[/\Ahttps?:\/\/[^\/]+/] + link if link.start_with?("/")
    return @url
  end

  def save_data links, title
    ActiveRecord::Base.transaction do
      url = Link.create!(name: title, endpoint: @url)
      sub_urls_data = links.map do |link|
        link.merge(link_id: url.id)
      end

      # Bulk insert sub_urls
      SubLink.insert_all(sub_urls_data) if sub_urls_data.any?
      url # Returning to controller to pass it to serializer 
    end 
  end
end