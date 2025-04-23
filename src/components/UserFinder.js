import { Fragment, Component } from 'react';

import Users from './Users';
import UsersContext from '../store/users-context';
import classes from './UserFinder.module.css';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
  /**
   * Class component allows only one static context.
   */
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    }
  }

  /**
   * Could be usefull if e.g. we load users from database when this component is first called.
   */
  componentDidMount() {
    // Send http request...
    this.setState({ filteredUsers: this.context.users });
  }

  /**
   * componentDidUpdate has the same functionality as useEffect.
   * We need to add the previousState condition to avoid infinite loop.
   * 
   * @param {*} previousProps 
   * @param {*} previousState 
   */
  componentDidUpdate(previousProps, previousState) {
    if (previousState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        {/* We can use that too: <UsersContext.Consumer></UsersContext.Consumer> */}
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        {/* Of course we can wrap many components with ErrorBoundary. */}
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;