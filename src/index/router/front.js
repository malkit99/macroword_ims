import FrontLayout from '../views/layouts/FrontLayout.vue'
import middleware from '../middleware/index'
const routes = [
    {
        path: '',
        component: FrontLayout,
        meta:{
          middleware:[
            middleware.guest
          ]
        },
        children:[
          {
            path: '',
            name: 'home',
            component: () => import('../views/front/Home.vue'),
            meta:{
              middleware:[
                middleware.guest
              ]
            }
          },
          {
            path: 'about-home',
            name: 'about-home',
            component: () => import('../views/front/About.vue'),
            meta:{
              middleware:[
                middleware.guest
              ]
            }
          },
          {
            path: 'programme',
            name: 'programme',
            component: () => import('../views/front/Programme.vue'),
            meta:{
              middleware:[
                middleware.guest
              ]
            }
          },
          {
            path: 'course-detail',
            name: 'course-detail',
            component: () => import('../views/front/CourseDetail.vue'),
            meta:{
              middleware:[
                middleware.guest
              ]
            }
          },
          {
            path: 'contact-us',
            name: 'contact-us',
            component: () => import('../views/front/ContactUs.vue'),
            meta:{
              middleware:[
                middleware.guest
              ]
            }
          },
        ]
      },
    // front page route link end here 
]

export default routes