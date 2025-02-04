class Link < ApplicationRecord
    has_many :sub_links, dependent: :destroy

    validates :endpoint, presence: true, format: { with: URI::regexp(%w[http https]), message: "must be a valid URL" }

    default_scope { order(created_at: :desc) }
end
