import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ];

class Users extends Component {
  constructor() {
    super(); // don't forget super() here
    /**
     * In class based components, STATE IS ALWAYS AN OBJECT AND MUST BE NAMED state.
     */
    this.state = {
      showUsers: true,
      // moreState: "Test"
      // nested: {},
      // data: []
    };
  }

  toggleUsersHandler() {
    // this.state.useState = false; NOT ALLOWED

    /**
     * React will merge this state with the initial state. Other properties (e.g. moreState) that are not defined here, are not updated at all.
     * We can set an object directly, or pass a function.
     */
    // this.setState({
    //   showUsers: false
    // });

    this.setState((curState) => {
      return {
        showUsers: !curState.showUsers
      };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/**
         * 'this' is a little tricky in JavaScript. In our case, we have to bind functions to work.
         * For more info @see {@link https://www.youtube.com/watch?v=Pv9flm-80vM&t=2s&ab_channel=Academind}
         */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
