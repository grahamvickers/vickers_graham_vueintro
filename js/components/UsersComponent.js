import UserComponent from "./UserComponent.js";

export default {
    template: `
        <div class="container">
            <div class="row">
                <div>
                    <h1 class="user-message"> {{ message }} </h1>
                    // render our users here

                    <user v-for="user in userList" :liveuser="user"></user>
                </div>
            </div>
        </div>
    `,

    data: function() {
        return {
            message: "Who's using roku?",
            userList: []
        }
    },

    created: function() {
        // this will fire when the component get built
        this.fetchAllUsers();
    },


    methods: {
        fetchAllUsers() {
            let url = `./includes/index.php?getUsers=true`;

            fetch(url)
            .then(res => res.json())
            .then(data => {this.userList = data})
            .catch((err) => {console.error(err)})
        }
    },

    components: {
        user: UserComponent
    }
}