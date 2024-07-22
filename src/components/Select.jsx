import React , { useId } from 'react'

function Select({
    options,
    label,
    className,  // THIS ADDONnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    ...props   // props => properties jo bhi user ne pass kri hai uppr likhi hue properties ke alawa
}, ref) {

    const id = useId()

  return (
    <div className='w-full'>
        
        {/* nichee waali line ka mtlb hai ki agr label present hai too fiir '&&' ke aage waali value ko show krwado */}
        {label && <label htmlFor= {id} className=''></label>}

        <select
        {...props}
        id= {id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >

            {options?.map((eachOption) => (
                <option key = {eachOption} value={eachOption}>
                    {eachOption}
                </option>
                
            ))}

        </select>
    
    </div>
  )

}

export default React.forwardRef(Select)


// Note : in "input.jsx" file hamne 'React.forwardRef' ko alag tarike sai use kiya tha and iss file mai alag sai use krr rhe hai. BUT dono hee methods correct hai Bss ye wala method ko likhne ka tarika thora easy hai