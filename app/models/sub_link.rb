class SubLink < ApplicationRecord
    belongs_to :link

    default_scope { order(created_at: :desc) }
end
