// In this file we are creating and setting up our "Database and Storage" By using 'appwrite'

// ISME BHI HAMM SAME HEE tarika use krenge jese hamne authentication file ko banate time kiya tha i.e => Class banake uske object ko hee export krwa denge




import conf from '../conf/conf.js';
import {Client , ID , Databases , Storage , Query} from "appwrite";

export class Service {

    client = new Client();
    databases;
    bucket;  // storage ko hee ham bucket bol rhe hai if we want to change the name from 'bucket' to 'storage' then we can.
    
    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }




    // 'Create Post' Service
    async createPost({title , slug , content , featuredImage , status , userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  // SLUG ko hamari UNIQUE ID JESE TREAT KRR RHE HAI HAM
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }  // in the upper code 'slug' => KO HAMNE 'DOCUMENT_ID' BOLA HAI







    // 'Update Post' Service
    async updatePost(slug , {title , content , featuredImage , status}) {
        console.log("Content:", content, "Type:", typeof content);
        if (content.length > 255) {
            console.error("Content exceeds the maximum length of 255 charactersxx.");
        }

        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title , content , featuredImage , status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }













    // 'Delete any Single/Particular Post' Service

    // yaha niche 'deletePost' ke Parameter mai hamne 'slug' ko hee islie liya hai coz delete krte time hame bss ekk 'id' chahiye ki kis Document/POst ko hamm delete krna chhate hai islie hamne 'slug' (Which is our Target Post Document Id) ko iske paramter mai pass krdiya hai
    async deletePost(slug) {
        try {
         await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug  // This is our Document Id
            )
            return true // agr post successfully delete hogyi hai too 'true' return krdiya
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false; // agr post mai koi Error aa jaata hai too 'false' return krdiya
        }    
    }







    // 'Get a Single/Particular Post' Service
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug  // Our Document ID
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false  // INN sabhi true false ka hamm frontend mai koi conditions mai use krenge
        }
    }







    // 'Get All Posts' Service . 

    // NOTE : HAME SAARI POSTS TOO CHHAIYE BUT ONLLY vhi posts chahiye jinka "Status : Active" ho. SO ISME HAMM Advanced Database Concept use krr rhe hai i.e 'Queries'
    async getPosts(queries = [Query.equal("status","active")]) {

        try {
             return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,  // 'queries' uppr 'getPosts' ke Parameters mai define hai and its just a variable name So we can give any name of our choice in the parameter
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }






    // 'File Upload' Service (Mtlb Add a File in Storage i.e Our 'bucket' kyoki hamne 'storage' ko 'bucket' kaha hai isski class mai)
    async uploadFile(file){

        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
        // This upper file => 'File ki Id' ko return krr rhi hai






    // 'Delete a File' Service
    async deleteFile(fileId) {
        console.log("DLEETE KE ANADAR AAGGYEEEE HAI")

        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
                console.log("Delete ke Tryy KE ANADAR AAGGYEEEE HAI"),
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }







    // 'File Preview' Service
    // NOTE : ye niche wala 'getFilePreview' koi bhi promise wagara return nhi krta hai because isme hamm "async-await" ka use nhi krte hai kyoki "getFilePreview" apne aap mai hee bohot fast hai isme hame ye wait krwaata hee nhi hai
      getFilePreview(fileId){
        
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } 
    }






const service = new Service();  // Object created for 'Service' class
export default service   // Object exported









// NOTE : Uppr class mai hamne jitne bhi methods (ye methods SERVICES hee hai) banaye hai wo sab "Appwrite" ke `documentation(Docs)` ko padhke banaya hai. But hamne hamara code poora modification krke likha hai with in best Optimised Way. SO OUR CODE IS PERFECT
