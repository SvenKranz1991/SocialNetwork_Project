export default function(state = {}, action) {
    if (action.type == "GET_DATA_FOR_FRIENDS") {
        state = {
            ...state,
            users: action.users
        };
    }

    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                }
                return {
                    ...user,
                    accepted: true
                };
            })
        };
    }

    if (action.type == "DECLINE_FRIEND") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                }
                return {
                    user: null
                };
            })
        };
    }

    return state;
}
