import React from 'react'

function Container({children}) {

  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
  
}

export default Container


// Note : 1. function parameter mai jo 'children' hai wo bss ekk parameter hai jiska name ham kuch bhi rkh skte hai bss Hamne Fancy Banane ke liye children likha hai or kuch nhi... 
// Agr single line hee hai return ke baad too fiir curly braces lagane ki koi jrurat nhi hai ye too hame 'C++' mai bhi padh hee hai
