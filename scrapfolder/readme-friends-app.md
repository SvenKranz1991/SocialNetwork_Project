1. Server

    -   - Three routes are needed
          -- route to get the list of friends and wannabes
          -- should do one query to get a combined list of friends and wannabes (easier - just one state to handle)

            ```
              david provides the query
            ```

            -- route for making a wannabe a friend

            -- route for ending a friendship

            -- reuse the stuff you have


            done


            _______________

2. Client

    - start.js
      _ a ton of imports - d
      _ `createStore`, "applyMiddleware" - d
      _ "reduxPromise" (redux-promise) - d
      _ "Provider" (react-redux) - copy paste from docs -- Provider
      _ `composeWithDevTools`(redux-devtools-extension) - d
      _ your reducer (./reducers.js)
        - create the store with the redux promise middleware applied and redux devtools enabled -d
        - wrap your `<App />` in `<Provider>` and pass that to `ReactDOM.render`. Oh yeah, remember to pass the store you created as a prop to `Provider` -d
    - app.js
      -- dont need props -server knows id -- done
    - friends.js
        -   - export a function component
        -   - get a dispatch function by calling the `useDispatch` Hook (exported by react-redux)
        -   - use the `useSelector` hook (exported by react-redux)
        -   - when the function component mounts, it should dispatch the action for getting the array of friends and wannabes
    - actions.js
        -   - Three action creators are needed
                -   - One that creates the action for retrieving the list of friends and wannabes
                    *   - will have to attach the array retrieved from the server to the returned action so the reducer and can put it into state
                -   - One that accepts a friend request
                -   - One that ends a friendship
        -   - All three action creators need to return a promise that is resolved with the appropriate action object.  
               `js export async ajaxThenAction(){ await acios.get('/some-route'); return{ type: 'SOME_ACTION' } }`
    - reducers.js

        -   - export a single function that expects to receive two arguments, a state object and an action - use default argument syntax to make sure the state object is not undefined - make sure this function -always- returns a state object -- (comment David - put it at the bottom)

        -   - the reducer needs three conditionals for three different action types - the action for receiving friends - create a new object that has all the same properties as the old state object except a new property is added


                    if ( action.type == 'RETRIEVE_FRIENDS_WANNABES') {
                        return {
                            ...state,
                            friendsWannabes: action.friendsWannabes
                        }
                    }

                - the action for accepting friend requests

const friends = useSelector()

const wannabes = useSelector()

gist

////////////////////////////

// not sure about the import of the Provider .. really from "redux"?
