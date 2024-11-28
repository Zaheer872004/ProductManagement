Here is my Schema of the ProductManagement Project
![prismaliser(6)](https://github.com/user-attachments/assets/50a9a85f-24ca-4b67-9604-b40de8e25c2e)



// User model
model User {
  user_id      Int      @id @default(autoincrement())
  username     String   @unique   // done
  phoneNumber  String?            // done
  email        String   @unique   // done
  password     String             // done
  role         Role @default(Retailer)    // done
  isVerified   Boolean @default(false)
  otp          Int
  refreshToken String? @db.VarChar(500) // adding when the login controller is created...
  expiryDate   DateTime


  suppliers  Supplier?
  retailer   Retailer?


  products     ProductUser[] // Mapping which users added products
  sales        Sale[]         // Relationship with Sales
}

enum Role {
  Admin
  Retailer
  Supplier
}

// Define the Supplier model
model Supplier {
  supp_id       Int              @id @default(autoincrement())
  userId        Int @unique // forign key to user table
  // phone_no      String?
  // email         String?
  // feedback      String?
  addharNo      String  @unique
  description   String?
  address       String?
  // other details getting from the user table...

  user        User      @relation(fields: [userId], references: [user_id]) // Relation to User

  products      ProductSupplier[] // Relationship with ProductSupplier
}


