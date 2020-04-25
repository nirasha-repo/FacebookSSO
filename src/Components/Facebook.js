import React, { Component, Fragment } from 'react';
import FacebookLogin from 'react-facebook-login';
import './css/main.css';

export default class Facebook extends Component {

    state = {
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: '',
        hasError: false,
        errorMessage: ''
    }

    componetClicked = () =>  {}

    responseFacebook = response => {
        if(response.error) {
            this.setState({ hasError: true, errorMessage: response.error.message});            
        }
        else {
            if(response.status !== "unknown") {
                this.setState( {
                    isLoggedIn: true,
                    userId: response.userId,
                    name: response.name,
                    email: response.email,
                    picture: response.picture.data.url
                })
            }
        }  
    }

    componentDidCatch(error, info) {        
        this.setState({ hasError: true, errorMessage: "Something went wrong." });
        // error logging
        console.log(error);
    }

    handleError(e) {
        // check different e.status to handle errors

        if(e && e.status !== "unknown") {
            this.setState({ hasError: true, errorMessage: "Error connecting to Facebook" });  
        }              
    }

    render() {
        let fbContent;

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h4>{this.state.errorMessage}</h4>;
        }
        
        if(this.state.isLoggedIn){
            fbContent = (
                <div className="fb-content">
                    <img src={this.state.picture} alt={this.state.name}></img>
                    <h4>Welcome {this.state.name}</h4>
                    <p>Email: {this.state.email}</p>
                </div>
            );
        } else {
            fbContent = (
                <FacebookLogin appId="513952542846256"
                autoLoad={false}
                reAuthenticate={true}
                fields="name,email,picture" 
                onClick={this.componetClicked}
                callback={this.responseFacebook}
                onFailure={this.handleError}
                ></FacebookLogin>

                //scope="user_posts" 
            );
        }

        return (
            <Fragment>
                {fbContent}
            </Fragment>
        )
    }
}
