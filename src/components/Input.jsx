// This is our 'Common Input' to use it in anywhere


import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){   
    const id = useId()  // this will give us the "Unique Id"
    return (
        <div className='w-full'>

            {/* ye niche waali line ka syntax bohot jyada use hota hai. ISss syntax ka mtlb ye hai ki agar 'label' true hua mean agar 'label' ke andar kuch value present hai too (MTlb ki pehle wale attribute ki value mai agr kuch hai) '&&' ke aage waala jo bhi likha hai usko show krdo*/}
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }

            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input


// v.v.v.Imp NOTE : "React.forwardRef" => isske andar jo function hai and iss function ke andar hamare pass 2 parameters aa rhe hai. 1st parameter mai too vhi hamare normal parameters hai jo ki hamesha sai hamm lete hue aa rhe hai BUT 2nd Parameter is very very Important i.e 'ref' agr reference nhi aaya hamare pass parameter mai too fiir WE CAN'T USE 'React.forwardRef'. SO 'ref' i.e reference is the main thing in this

// Note : To write the javascript Code in '.jsx' file we have to first write 'curly braces {}' and then unn curly braces ke andar 'backticks( "  `` ") and unn backticks ke andar hamara jo bhi code hai wo likhenge . WHY we have used these curly braces and backticks?? => Its because agr hame Javascript use krni hai and uske kuch variables bhi use krne hai Example ke liye hamari upper likhi hue class mai bhi hamm javascript ke varibales ko ham use krr rhe hai SO TO USE THEM we have to write these curly braces and backticks

// " ...props " => iska mtlb hai ki function ke andar hamne jo parameters liye AGR iske alawa bhi user kuch or bhi parameters bhejna chhata hai too wo bhej skta hai and unn parameters ko hamm "...props" ke andar store krwa lenge .
//  "..." => this is a Spread operator jo ki values ko spread krrdeta hai jo bhi uske saath likha hota hai uski values ko  