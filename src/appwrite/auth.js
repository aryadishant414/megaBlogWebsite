// This is our Authentication file.
// auth yaha hamm authentication ko hee bol rhe hai

import conf from '../conf/conf.js'  //Environment variable waali file ko import karwaya hai yaha
import {Client , Account , ID} from "appwrite"  // ID -> will give us unique ID

export class AuthService {
    client = new Client();  // user CREATED
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // 'URL' of our appwrite jo ki 'conf.js' ke anadar define kiya hua hai hamne
            .setProject(conf.appwriteProjectId); // Project ID of our 'appwrite'
            this.account = new Account(this.client);
          
    }


    // ACCOUNT CREATION
    async createAccount({email , password , name}) {
        try {
            const userAccount = await this.account.create(ID.unique() , email , password , name);
            console.log("HAA BHAI USER ACCOUNT BANN GAYA HAI SUCCESFULLY");
            if (userAccount) {
                // agar iss condition mai aaye hai means account create ho chuka hai too fiir 'call another method' user KO LOGIN BHI KARWA HEE DETE HAI

                return this.login({email,password});
            } 
            else {

                return userAccount;
            }
        }

        catch (error) {
            throw error;
        }
    }


    // LOGIN
    async login({email , password}) {
        try {
            console.log("EMAIL Session mai 1st Time ham TRY BLOCK KE ANDAR AAGYE HAI HAM");
            // return await this.account.createEmailSession(email , password); // yeh tha hamara wala method
            return await this.account.createEmailPasswordSession(email , password);
            console.log("EMAIL Session mai 2nd Time ham TRY BLOCK KE ANDAR AAGYE HAI HAM");
        } catch (error) {
            console.log("EMAIL Session ke CATCH BLOCK KE ANDAR AAGYE HAI HAM");
            throw error;
        }
    }

    // AGR USER ALready Login hai too
    async getCurrentUser() {
        try {
           return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser:: error" , error);
            return null;
        }

        // return null; // ye line isliye likhi hai kyoki => 'try' waali condition mai agr user ka account milta hai and agr usme koi error aata hai too wo error 'catch' block mai jaaega but agr user ka account login hee nhi mila that means error too kuch aaya hee nhi too ye catch block ke andar bhi nhi jaaega. IN SHORT na too try block ke andar ka case true hua so yaha sai return kuch hoga hee nhi and na hee koi error aaya hai means catch block ke andar bhi nhi jaaega that means abb ESEE CONDITION KO YE 'NULL' WAALI LINE HANDLE KREGI KI BHAAISAHAB USER ACCOUNT LOGIN NHI MILA HAI SO MAI YE NULL VALUE RETURN KARR RHA HU
    }


    // Logout
    // 'appwrite' ke andar 'Logout' ko  "deleteSession" kehte hai 
    async logout() {

        try {
             await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        } 
    }
}


const authService = new AuthService(); // Object create kiya hai 'AuthService' class ka and iss object ko hee export krdiya hai. => THIS APPROACH COMES UNDER GOOD PRACTICE

export default authService