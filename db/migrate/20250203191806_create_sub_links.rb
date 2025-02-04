class CreateSubLinks < ActiveRecord::Migration[8.0]
  def change
    create_table :sub_links do |t|
      t.string :name
      t.string :endpoint
      t.references :link, null: false, foreign_key: true

      t.timestamps
    end
  end
end
