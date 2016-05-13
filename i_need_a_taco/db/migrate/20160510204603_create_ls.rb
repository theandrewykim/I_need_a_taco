class CreateLs < ActiveRecord::Migration
  def change
    create_table :ls do |t|

      t.timestamps null: false
    end
  end
end
