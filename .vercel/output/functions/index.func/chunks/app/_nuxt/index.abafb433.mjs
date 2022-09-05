import { _ as __nuxt_component_0$2, a as _sfc_main$3 } from '../server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'defu';
import '@vue/shared';
import '@googlemaps/js-api-loader';
import 'vue-tel-input';
import '@gtm-support/vue-gtm';
import '../../nitro/vercel.mjs';
import 'node-fetch-native/polyfill';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_QPage = __nuxt_component_0$2;
      const _component_QuasarForm = _sfc_main$3;
      _push(ssrRenderComponent(_component_QPage, mergeProps({ padding: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_QuasarForm, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_QuasarForm)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.abafb433.mjs.map
