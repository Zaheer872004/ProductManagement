
// // Define the Supplier model
// model Supplier {
//   supp_id       Int              @id @default(autoincrement())
//   userId        Int @unique // forign key to user table
//   // phone_no      String?
//   // email         String?
//   // feedback      String?
//   addharNo      String  @unique
//   description   String?
//   address       String?

//   user        User      @relation(fields: [userId], references: [user_id]) // Relation to User

//   products      ProductSupplier[] // Relationship with ProductSupplier
// }


class SupplierController { 

  constructor(){}






}


export const supplierController = new SupplierController();