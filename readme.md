# SkyAnalytics Vue-2
SkyAnalytics Vue-2 is an adapter for [SkyAnalytics](https://github.com/carum98/skyanalytics) that allows you to track your website's traffic and user behavior.

## Installation
```bash
npm install https://github.com/carum98/skyanalytics-vue2.git
```

## Usage
```javascript
import Vue from 'vue'
import SkyAnalytics from '@skyanalytics/vue2'

Vue.use(SkyAnalytics, {
    key: 'source_key',
    host: 'http://localhost:3000'
})
```

### Directives
```html
<button v-sk-analytics="{ event: 'click', data: { key: 'value' } }">Click me</button>
```

### Methods
```javascript
this.$skyAnalytics.event('event', { key: 'value' })
```

### Composable
```javascript
import { useAnalytics } from 'skyanalytics-vue2'

useAnalytics.event('event', { key: 'value' })
useAnalytics.navigate('page', { key: 'value' })
```

## Vue-Router
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import SkyAnalytics from 'skyanalytics-vue2'

Vue.use(VueRouter)
Vue.use(SkyAnalytics, {
    key: 'source_key',
    host: 'http://localhost:3000'
})

const router = new VueRouter({
    routes: []
})

router.beforeEach((to, from, next) => {
    Vue.prototype.$skyAnalytics.navigation({ name: to.name })
    next()
})