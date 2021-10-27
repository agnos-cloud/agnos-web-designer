import React from "react";

export default class ErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
    }
    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>An error occured while rendering this component.</h1>
                    <p>See the browser's console window for more info.</p>
                </>
            );
        }
        return this.props.children;
    }  
  }
  