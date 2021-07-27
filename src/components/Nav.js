import React from 'react';
import { useState } from 'react';
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { authenticationService } from '../services/authentication-services';


const Nav = () => {
    const [activeItem, setActiveItem] = useState('home')

    const handleItemClick=(e)=>{
        // setActiveItem()
        console.log(e.target.innerText)
        setActiveItem(e.target.innerText)
        }
    

    return (
        <div>
            <Menu pointing secondary>
                <NavLink to="/">
                    <Menu.Item
                        name='home'
                    />
                </NavLink>

                {authenticationService.isAuthenticated ? (
                    <NavLink to="/create">
                        <Menu.Item
                            name='Create Post'
                        />
                    </NavLink>
                ):(
                    <span></span>
                    
                )}
                


                <Menu.Menu position='right'>
                    {authenticationService.isAuthenticated ? (
                        <NavLink to="/" onClick={()=>authenticationService.logout()}>
                            <Menu.Item
                                name='logout'
                            />
                        </NavLink>
                    ) : (
                        <>
                        <NavLink to="/login">
                            <Menu.Item
                                name='login'
                            />
                        </NavLink>
                        

                        <NavLink to="/signup">
                            <Menu.Item
                                name='Signup'
                            />
                        </NavLink>
                        </>
                    )}                   
                    
                </Menu.Menu>

            </Menu>
        </div>
    )
    
}

export default Nav;

