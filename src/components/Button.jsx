import React from 'react'

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button className = {`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props} >
        {children}
    </button>
  );
}

// Yaha uppr yeh function ke andar "children , type , bgColor , textColor , className" yeh sab iss function ke andar parameters hai jo ki function calling ke time usme pass ho rhe hai.
// NOTE : suppose user ne 'bgColor' ki jagah par koi or color pass kiya hai ya fiir 'textColor' ki jagah kuch or pass kiya hai too fiir hamari waali values overwrite ho jaaegi and user ne jo values pass kri hai wo inn variables mai aa jaaegi. BUT suppose User ne value pass nhi ki too?? => TOO FIIR by-Default mai yeh values hee rahegi too hamne iss function parameter mai dii hai EX : 'bgcolor : bg-blue-600 , textColor : text-white" .
// 'children' bss ekk fancy word hai or kuch nhi So dont get confuse. hamm iski jagah koi or name bhi de skte hai


// TOO YEH HAMARA Common Button bhi ready ho gaya hai jisko hamm abb kaha par bhi use krr skte hai isko call krwake

