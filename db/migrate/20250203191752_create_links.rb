class CreateLinks < ActiveRecord::Migration[8.0]
  def change
    create_table :links do |t|
      t.string :name
      t.string :endpoint, null: false

      t.timestamps
    end
  end
end
