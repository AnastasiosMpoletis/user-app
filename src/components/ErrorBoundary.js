import { Component } from "react";

class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }
    /**
     * Will be triggered when child components throw an error.
     * Error parameter is automatically passed by React.
     */
    componentDidCatch(error) {
        console.log('Error: ' + error);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            /**
             * In our local it may not be displayed correctly. It will be though, in a deployed App.
             * We can close the error window to see the result.
             */
            return (<p>Something went wrong</p>);
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;