// todo => use a key to track the current video, or just pass the video in as a ref to the function and grab its source

Vue.component('player', {
  props: ['movie'],
  
  template: `
  <div>
    <h3 class="movie-title">{{ movie.videotitle }}</h3>
    <video :src=" 'video/' + vidsource" controls autoplay></video>
    <div class="movie-details">
      <p>{{ movie.videodescription }}</p>
    </div>
  </div>
  `
})

var vm = new Vue({
  el: "#app",

  data: {

    // mock up the user - this well eventually come from the database UMS (user management system)
    user: {
      isLoggedIn: true,
      settings: {}
    },

    // this data would also come from the database, but we'll just mock it up for now
    videodata: [
      { name: "Star Wars The Force Awakens", thumb: "forceawakens.jpg", vidsource: "forceawakens.mp4", description: "yet another star wars movie" },
      { name: "Stranger Things", thumb: "strangerthings.jpg", vidsource: "strangerthings.mp4", description: "don't get lost in the upside down" },
      { name: "Marvel's The Avengers", thumb: "avengers.jpg", vidsource: "avengers.mp4", description: "will they make black widow action figures this time?" }
    ],

    movie: {
      videotitle: "video title goes here",
      videosource: "",
      videodescription: "video description goes here",
    },

    showDetails: false
  },

  created: function() {
    //run a fetch call and get the user data

    console.log('created lifecycle hook fired here, go get user data');
    this.getUserData();
  },

  methods: {
    getUserData(){
      const url = './includes/index.php?getUser=1';

      fetch(url) //get data from the db
      .then(res => res.json) //translate JSON to plain object
      .then(data => { //use the plain data object (the user)
        console.log(data); //log it to the console (testing)

        this.user.settings = data[0];
      })
      .catch((error) => console.log(error))
    },

    setUserPrefs(){
      // this is the preferences control, hit the api when ready (or use a component)
      console.log('set the user prefs here!')
    },

    userLogin(){
      console.log('show the user login status: ')
      this.user.isLoggedIn = (this.user.isLoggedIn) ? false : true;
    },

    showMovieDetails({ name, vidsource, description}){
      //console.log('show these details: ', movie);

      this.movie.videotitle = name;
      this.movie.vidsource = vidsource;
      this.movie.videodescription = description;

      this.showDetails = true;
    }
  }
})
