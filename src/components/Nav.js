import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
export default class Nav extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu pointing secondary>
                    <NavLink to="/">
                        <Menu.Item
                            name='home'
                            active={activeItem === 'home'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>

                    <NavLink to="/create">
                        <Menu.Item
                            name='Create Post'
                            active={activeItem === 'Create Post'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>


                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={this.handleItemClick}
                        />

                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}


