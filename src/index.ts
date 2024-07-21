import type { DirectiveBinding, VueConstructor } from 'vue';
import type { SkyAnalyticsOptions } from '@skyanalytics/js/dist/types'

import skyanalytics from '@skyanalytics/js'

type HTMLElementWithRemoveListener = HTMLElement & { $removeListener: Function }

export default {
    install(vue: VueConstructor, options: SkyAnalyticsOptions) {
        skyanalytics.init(options)

        vue.prototype.$skyAnalytics = skyanalytics
        vue.directive('sk-analytics', {
            bind: (el: HTMLElementWithRemoveListener, binding: DirectiveBinding<{ event: string, data?: object }>) => {
                async function send() {
                    await skyanalytics.event({
                        name: binding.value.event,
                    })
                }

                el.addEventListener('click', send)
                el.$removeListener = () => {
                    el.removeEventListener('click', send)
                }
            },
            unbind: (el: HTMLElementWithRemoveListener) => {
                el.$removeListener()
            }
        })
    }
}

export function useAnalytics() {
    function event(name: string, data?: Object) {
        skyanalytics.event({ name }).then()
    }

    function navigate(name: string) {
        skyanalytics.navigation({ name }).then()
    }

    return {
        event,
        navigate
    }
}
