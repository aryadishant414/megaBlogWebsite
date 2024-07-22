import React from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'  // Works same as 'Link' so iski jagah ham chaahe too 'Link' bhi use krr skte hai. => Page ko refresh hone nhi dega yeh
import { Link } from 'react-router-dom'
import {Container , Logo , LogoutBtn} from "../index"



function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",   // slug => (mtlb kaha par redirect krega) 'link' ko ham slug keh rhe hai AGr hamara mann hai isko kuch or kehna hai too hamm 'slug' ki jagah koi or name bhi de skte hai like : 'url' ya or bhi kuch bhi
      active:true
    } , 
 
    {
      name: "Login",
      slug : "/login",
      active : !authStatus,  // active -> means ki ye list item tabhi show hoga jab ye authStatus false hoga. initially false hai that means user is not logged in so 'ye wale page par' redirect krwao isko and pehle login krne ka bolo
    } ,

     {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
     } , 

     {
      name: "All Posts",
      slug : "/all-posts",
      active: authStatus,
     } , 

     {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
     },
  ]


  return (
    <header className='py-3 shadow bg-customGray'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}

            {/* ye niche wala ekk special Syntax hai jo ki ham bohot baar use krte hai react mai. ISKA MTLB YE HAI KI : kya 'authStatus' agr true hai mtlb agar uski kuch value hai too parenthesis '()' ke andar ka code show krwado */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>

  )
}

export default Header