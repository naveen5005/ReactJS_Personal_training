import React, { Component, createContext } from 'react'

export const Context = createContext();

export default class AuthContext extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            validation: {
                isLogin: null
            }
        }
    }

    handleLogin = () => {
        this.setState({ isLogin: true });
    }
    handleLogOut = () => {
        this.setState({ isLogin: false });
    }
    render() {
        const {isLogin} = this.state.validation;
        const {handleLogin,handleLogOut} = this;
        const {children} = this.props;
        return (
            <div>
                <Context.Provider value={{isLogin,handleLogin,handleLogOut}}>
                    {
                        children
                    }
                </Context.Provider>
            </div>
        )
    }
}
