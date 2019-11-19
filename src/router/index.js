import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const MovieShow = () => import("../views/MovieShow/MovieShow.vue");
const Rank = () => import("../views/Rank/Rank.vue");
const Profile = () => import("../views/Profile/Profile.vue");
const MovieInfo = () => import("../views/MovieInfo/MovieInfo.vue");
const Comments = () => import("../views/Comments/Comments.vue");
const Review = () => import("../views/Review/Review.vue");

const routes = [
  {path: "/", redirect: "/movie-show"},
  {path: "/movie-show", component: MovieShow},
  {path: "/rank", component: Rank},
  {path: "/profile", component: Profile},
  {path: "/movie-info/:movieId", component: MovieInfo,
    children: [
      {path: "comments", component: Comments},
      {path: "review/:reviewId", component: Review}
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
