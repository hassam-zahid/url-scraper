class LinkBlueprint < Blueprinter::Base
  identifier :id
  fields :name, :endpoint, :created_at
  field :count do |link|
    link.sub_links.count
  end
  association :sub_links, blueprint: SubLinkBlueprint
end