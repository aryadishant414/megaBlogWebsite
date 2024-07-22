// This file is for Creating and Updating(mtlb agar user ne post mai kuch edit kiya hai too) the Post. agr koi post ho rkhi hai already too usko update krne ke liye and agr koi post hee nhyi hue hue hai too post ko create krne ke liye YEH File banayi gayi hai

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        const { title, content, status } = data; // THIS ADDONnnnnn Destructure the necessary fields
        if(post) {

            // iss uppar wali if condition ka mtlb yahi hua ki 'post' empty nahi hai iske andar kuch too data pada hai. it means ki user naya data add nhi kar rha hai balki poorane hee post mai 'update krr rha hai'
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if(file) {
                console.log("Haaaa Bhaii File TOo present hai");
                appwriteService.deleteFile(post.slug);   // 13-07-2024
                console.log("Haa Bhaii ke niche bhi aagye hai");  // this line says ki new file upload ho gyi hai iss file ki jagah too fiir iss poorani file ko delete krdo kyoki nayi waali uploaded file ne isko overwrite krdiya hai
            }

            const dbPost = await appwriteService.updatePost(post.$id, {   // abb update krdo new waali file ko jisko hamne upload kiya tha usko
                title , content ,
                featuredImage: file ? file.$id : undefined,
                status,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);   // abb jaha par ye new uploaded file padi hai vha par leke chale jaao hame
            }
        } 
        
        else {   // iss else ka mtlb hua ki 'post' ke andar koi data nhi hai it means ki post is Empty mtlb abhi tak koi bhi post nhi hue hai
            const file = await appwriteService.uploadFile(data.image[0]);   // upload a file

            if(file) {
                const fileId = file.$id;
                data.featuredImage = fileId;  // THIS ADDONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
                const dbPost = await appwriteService.createPost({...data , userId : userData.$id});   // create the post 

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()  // THIS ADONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
                .replace(/[^a-zA-Z\d\s]+/g, "-")  // iss line ka mtlb hai ki '^' iss cap ke saath jo bhi likha hai inke alawa jitne bhi hai agr wo aaye too unme '-' dash laga dena
                .replace(/\s/g, "-");  // "Regex" => ye line and isse uppar wali line are written in 'regex'(inko CHATGPT SAI liya hai)

                return "";
    }, []);




    React.useEffect(() => {
        const subscription = watch((value , {name}) => {
            if (name === "title") {
                setValue("slug" , slugTransform(value.title), { shouldValidate: true});
            }
        });

        return () => subscription.unsubscribe();

    } , [watch, slugTransform, setValue]);


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}


// NOTE : 
// "slugTransform" -> Its a Method. iska hee too use krke hamm 'spaces' ki jagah '-' (dash) laga paa rhe hai live jab bhi hamm hamare input mai type kar rhe hai tab