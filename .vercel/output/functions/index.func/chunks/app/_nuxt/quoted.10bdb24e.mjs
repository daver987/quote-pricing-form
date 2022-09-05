import { u as useMapStore, s as storeToRefs, _ as __nuxt_component_0$2, b as _sfc_main$2 } from '../server.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
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
  __name: "quoted",
  __ssrInlineRender: true,
  setup(__props) {
    const mapStore = useMapStore();
    const {
      origin_formatted_address,
      destination_formatted_address,
      vehicle_image,
      pickup_date,
      vehicle_type,
      service_type,
      total_cost
    } = storeToRefs(mapStore);
    const { label: vehicleType, value: vehicleTypeValue } = vehicle_type.value;
    const { label: serviceType, value: serviceTypeValue } = service_type.value;
    const vehicleImage = ref(vehicle_image.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_QPage = __nuxt_component_0$2;
      const _component_QuotedCard = _sfc_main$2;
      _push(ssrRenderComponent(_component_QPage, mergeProps({ padding: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_QuotedCard, {
              totalCost: unref(total_cost),
              vehicleType: unref(vehicleType),
              serviceType: unref(serviceType),
              vehicleImage: vehicleImage.value,
              originLocation: unref(origin_formatted_address),
              destinationLocation: unref(destination_formatted_address),
              pickupDate: unref(pickup_date)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_QuotedCard, {
                totalCost: unref(total_cost),
                vehicleType: unref(vehicleType),
                serviceType: unref(serviceType),
                vehicleImage: vehicleImage.value,
                originLocation: unref(origin_formatted_address),
                destinationLocation: unref(destination_formatted_address),
                pickupDate: unref(pickup_date)
              }, null, 8, ["totalCost", "vehicleType", "serviceType", "vehicleImage", "originLocation", "destinationLocation", "pickupDate"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/quoted.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=quoted.10bdb24e.mjs.map
