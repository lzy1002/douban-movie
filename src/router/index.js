import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const MovieShow = () => import("../views/MovieShow/MovieShow.vue");
const Rank = () => import("../views/Rank/Rank.vue");
const Profile = () => import("../views/Profile/Profile.vue");
const MovieInfo = () => import("../views/MovieInfo/MovieInfo.vue");
const Comments = () => import("../views/Comments/Comments.vue");
const Reviews = () => import("../views/Reviews/Reviews.vue");
const Review = () => import("../views/Review/Review.vue");
const Celebrity = () => import("../views/Celebrity/Celebrity.vue");
const Works = () => import("../views/Works/Works.vue");
const Top250 = () => import("../views/Top250/Top250.vue");
const Weekly = () => import("../views/Weekly/Weekly.vue");
const NewMovies = () => import("../views/NewMovies/NewMovies.vue");
const UsBox = () => import("../views/UsBox/UsBox.vue");

const routes = [
  {path: "/", redirect: "/movie-show"},
  {path: "/movie-show", component: MovieShow},
  {path: "/rank", component: Rank,
    children: [
      {path: "top250", component: Top250},
      {path: "weekly", component: Weekly},
      {path: "new-movies", component: NewMovies},
      {path: "us-box", component: UsBox}
    ]
  },
  {path: "/profile", component: Profile},
  {path: "/movie-info/:movieId", component: MovieInfo,
    children: [
      {path: "comments", component: Comments},
      {path: "reviews", component: Reviews},
      {path: "review/:reviewId", component: Review}
    ]
  },
  {path: "/celebrity/:celebrityId", component: Celebrity,
    children: [
      {path: "works", component: Works}
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
