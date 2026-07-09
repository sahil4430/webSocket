import {
    pgTable,
    text, 
    serial,
    timestamp, 
    integer,
    pgEnum
} from "drizzle-orm/pg-core";


export const Users = pgTable("user",
    {
        id: serial("id").primaryKey(),
        user_name: text("user_name").notNull().unique(),
        email: text("email").notNull().unique(),
        created_at: timestamp("created_at").defaultNow(),
        password: text("password").notNull(),
    }
)
//pgEnum is use for creating an enum type in the database. enum is a  
export const outcomeEnum = pgEnum("outcome", [
  "attacker_wins",
  "defender_wins",
  "draw",
]);
export const gesture = pgTable("gesture",
    {
        id: serial("id").primaryKey(),
        ges_name: text("ges_name").unique().notNull(),
        basePower: integer("base_power").notNull(),
        effects: text("efects").notNull(),
        iconUrl: text ("icon_url").notNull(),

    }
)

export const gesture_matchup = pgTable("gesture_matchup",
    {
        id : serial("id").primaryKey(),
        attacker_gesture_id: integer("attacker_gesture_id").references(
            ()=> gesture.id).notNull(),
        defender_gesture_id: integer("defender_gesture_id").references(
            ()=> gesture.id).notNull(),
        damage: integer("damage").notNull().default(0),
        outcome: text("outcome").notNull()
    })