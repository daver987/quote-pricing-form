import { computed, defineComponent, inject, provide, h, Suspense, Transition, reactive, getCurrentInstance, ref, watch, nextTick, onUpdated, toRaw, isRef, isReactive, toRef, resolveDirective, mergeProps, withCtx, createVNode, unref, withDirectives, vModelText, vShow, useSSRContext, createTextVNode, toDisplayString, resolveComponent, watchEffect, markRaw, shallowRef, createApp, onMounted, effectScope, defineAsyncComponent, onErrorCaptured, onServerPrefetch, onUnmounted, toRefs } from 'vue';
import { $fetch as $fetch$1 } from 'ohmyfetch';
import { joinURL, hasProtocol, isEqual, parseURL } from 'ufo';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { createError as createError$1, sendRedirect } from 'h3';
import defu, { defuFn } from 'defu';
import { isFunction } from '@vue/shared';
import { ssrRenderComponent, ssrRenderAttr, ssrGetDirectiveProps, ssrInterpolate, ssrRenderSuspense } from 'vue/server-renderer';
import { Loader } from '@googlemaps/js-api-loader';
import { VueTelInput } from 'vue-tel-input';
import { createGtm } from '@gtm-support/vue-gtm';
import { a as useRuntimeConfig$1 } from '../nitro/vercel.mjs';
import 'node-fetch-native/polyfill';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d = (_c = options.lazy) != null ? _c : options.defer) != null ? _d : false;
  options.initialCache = (_e = options.initialCache) != null ? _e : true;
  const nuxt = useNuxtApp();
  const useInitialCache = () => (nuxt.isHydrating || options.initialCache) && nuxt.payload.data[key] !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(useInitialCache() ? nuxt.payload.data[key] : (_g = (_f = options.default) == null ? void 0 : _f.call(options)) != null ? _g : null),
      pending: ref(!useInitialCache()),
      error: ref((_h = nuxt.payload._errors[key]) != null ? _h : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      return nuxt._asyncDataPromises[key];
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2, _b2;
      asyncData.error.value = error;
      asyncData.data.value = unref((_b2 = (_a2 = options.default) == null ? void 0 : _a2.call(options)) != null ? _b2 : null);
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer) {
    const promise = initialFetch();
    onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || autoKey;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = "$f" + _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return isRef(r) ? r.value : r;
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watch2,
    initialCache,
    ...fetchOptions
  } = opts;
  const _fetchOptions = {
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  };
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    initialCache,
    watch: [
      _request,
      ...watch2 || []
    ]
  };
  const asyncData = useAsyncData(key, () => {
    return $fetch(_request.value, _fetchOptions);
  }, _asyncDataOptions, "$2Qpjr020wX");
  return asyncData;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options = {}) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !options.external) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  if (!isExternal && isProcessingMiddleware()) {
    return to;
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options.redirectCode || 301));
    }
  }
  if (isExternal) {
    if (options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return options.replace ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              to: to.value,
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$3 = defineNuxtLink({ componentName: "NuxtLink" });
const inlineConfig = {};
defuFn(inlineConfig);
function useHead(meta2) {
  const resolvedMeta = isFunction(meta2) ? computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
const components$1 = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components$1) {
    nuxtApp.vueApp.component(name, components$1[name]);
    nuxtApp.vueApp.component("Lazy" + name, components$1[name]);
  }
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: __spreadValues({ key: "default" }, obj[key]) });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: item });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a, _b;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document2),
      body: (_a2 = tag.props.body) != null ? _a2 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute("content", "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length));
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const titleTemplate = allHeadObjs.map((i) => unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(unref(objs));
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index2 = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index2 = i;
                  break;
                }
              }
              if (index2 !== -1) {
                deduped.splice(index2, 1);
              }
            }
          }
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(titleTemplate, tag.props.children);
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    watchEffect(() => {
      head.updateDOM();
    });
  });
  nuxtApp._useHead = (_meta) => {
    const meta2 = ref(_meta);
    const headObj = computed(() => {
      const overrides = { meta: [] };
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => {
      const meta2 = renderHeadToString(head);
      return {
        ...meta2,
        bodyScripts: meta2.bodyTags
      };
    };
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    fetchpriority: String,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const NoScript = defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
const Link = defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((meta2) => ({
    meta: [meta2]
  }))
});
const Style = defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body$1 = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  NoScript,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body: Body$1
}, Symbol.toStringTag, { value: "Module" }));
const appHead = { "meta": [], "link": [], "style": [], "script": [], "noscript": [], "charset": "utf-8", "viewport": "width=device-width, initial-scale=1" };
const appPageTransition = { "name": "page", "mode": "out-in" };
const appKeepalive = false;
const metaMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2 = defineNuxtPlugin((nuxtApp) => {
  useHead(markRaw({ title: "", ...appHead }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = inject(isNestedKey, false);
    provide(isNestedKey, true);
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const transitionProps = (_a = routeProps.route.meta.pageTransition) != null ? _a : appPageTransition;
          return _wrapIf(
            Transition,
            transitionProps,
            wrapInKeepAlive(
              (_b = routeProps.route.meta.keepalive) != null ? _b : appKeepalive,
              isNested && nuxtApp.isHydrating ? h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) : h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) })
            )
          ).default();
        }
      });
    };
  }
});
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const createComponent = (raw) => markRaw(defineComponent(raw));
const createDirective = (raw) => markRaw(raw);
function hSlot(slot, otherwise) {
  return slot !== void 0 ? slot() || otherwise : otherwise;
}
function hUniqueSlot(slot, otherwise) {
  if (slot !== void 0) {
    const vnode = slot();
    if (vnode !== void 0 && vnode !== null) {
      return vnode.slice();
    }
  }
  return otherwise;
}
function hMergeSlot(slot, source) {
  return slot !== void 0 ? source.concat(slot()) : source;
}
function hMergeSlotSafely(slot, source) {
  if (slot === void 0) {
    return source;
  }
  return source !== void 0 ? source.concat(slot()) : slot();
}
function hDir(tag, data, children, key, condition, getDirsFn) {
  data.key = key + condition;
  const vnode = h(tag, data, children);
  return condition === true ? withDirectives(vnode, getDirsFn()) : vnode;
}
const quasarKey = "_q_";
const timelineKey = "_q_t_";
const layoutKey = "_q_l_";
const pageContainerKey = "_q_pc_";
const formKey = "_q_fo_";
const __nuxt_component_0$2 = createComponent({
  name: "QPage",
  props: {
    padding: Boolean,
    styleFn: Function
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey);
    inject(pageContainerKey, () => {
      console.error("QPage needs to be child of QPageContainer");
    });
    const style = computed(() => {
      const offset = ($layout.header.space === true ? $layout.header.size : 0) + ($layout.footer.space === true ? $layout.footer.size : 0);
      if (typeof props.styleFn === "function") {
        const height = $layout.isContainer.value === true ? $layout.containerHeight.value : $q.screen.height;
        return props.styleFn(offset, height);
      }
      return {
        minHeight: $layout.isContainer.value === true ? $layout.containerHeight.value - offset + "px" : $q.screen.height === 0 ? offset !== 0 ? `calc(100vh - ${offset}px)` : "100vh" : $q.screen.height - offset + "px"
      };
    });
    const classes = computed(
      () => `q-page ${props.padding === true ? " q-layout-padding" : ""}`
    );
    return () => h("main", {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
const listenOpts = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true
};
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(listenOpts, {
        hasPassive: true,
        passive: { passive: true },
        notPassive: { passive: false },
        passiveCapture: { passive: true, capture: true },
        notPassiveCapture: { passive: false, capture: true }
      });
    }
  });
  window.addEventListener("qtest", null, opts);
  window.removeEventListener("qtest", null, opts);
} catch (e) {
}
function noop$1() {
}
function position(e) {
  if (e.touches && e.touches[0]) {
    e = e.touches[0];
  } else if (e.changedTouches && e.changedTouches[0]) {
    e = e.changedTouches[0];
  } else if (e.targetTouches && e.targetTouches[0]) {
    e = e.targetTouches[0];
  }
  return {
    top: e.clientY,
    left: e.clientX
  };
}
function getEventPath(e) {
  if (e.path) {
    return e.path;
  }
  if (e.composedPath) {
    return e.composedPath();
  }
  const path = [];
  let el = e.target;
  while (el) {
    path.push(el);
    if (el.tagName === "HTML") {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
}
function stop(e) {
  e.stopPropagation();
}
function prevent(e) {
  e.cancelable !== false && e.preventDefault();
}
function stopAndPrevent(e) {
  e.cancelable !== false && e.preventDefault();
  e.stopPropagation();
}
function addEvt(ctx, targetName, events) {
  const name = `__q_${targetName}_evt`;
  ctx[name] = ctx[name] !== void 0 ? ctx[name].concat(events) : events;
  events.forEach((evt) => {
    evt[0].addEventListener(evt[1], ctx[evt[2]], listenOpts[evt[3]]);
  });
}
function cleanEvt(ctx, targetName) {
  const name = `__q_${targetName}_evt`;
  if (ctx[name] !== void 0) {
    ctx[name].forEach((evt) => {
      evt[0].removeEventListener(evt[1], ctx[evt[2]], listenOpts[evt[3]]);
    });
    ctx[name] = void 0;
  }
}
let queue = [];
let waitFlags = [];
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry2) => entry2 !== fn);
}
const __nuxt_component_0$1 = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validation-success", "validation-error"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const promises = [];
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      const index2 = ++validateIndex;
      const emitEvent = (res, ref2) => {
        emit("validation-" + (res === true ? "success" : "error"), ref2);
      };
      for (let i = 0; i < registeredComponents.length; i++) {
        const comp = registeredComponents[i];
        const valid = comp.validate();
        if (typeof valid.then === "function") {
          promises.push(
            valid.then(
              (valid2) => ({ valid: valid2, comp }),
              (err) => ({ valid: false, comp, err })
            )
          );
        } else if (valid !== true) {
          if (props.greedy === false) {
            emitEvent(false, comp);
            if (focus2 === true && typeof comp.focus === "function") {
              comp.focus();
            }
            return Promise.resolve(false);
          }
          promises.push({ valid: false, comp });
        }
      }
      if (promises.length === 0) {
        emitEvent(true);
        return Promise.resolve(true);
      }
      return Promise.all(promises).then((res) => {
        const errors = res.filter((r) => r.valid !== true);
        if (errors.length === 0) {
          index2 === validateIndex && emitEvent(true);
          return true;
        }
        const { valid, comp, err } = errors[0];
        if (index2 === validateIndex) {
          err !== void 0 && console.error(err);
          emitEvent(false, comp);
          if (focus2 === true && valid !== true && typeof comp.focus === "function") {
            comp.focus();
          }
        }
        return false;
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      const index2 = validateIndex + 1;
      validate().then((val) => {
        if (index2 === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null) {
          return;
        }
        const target = rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex > -1);
        target !== null && target !== void 0 && target.focus({ preventScroll: true });
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index2 = registeredComponents.indexOf(vmProxy);
        if (index2 > -1) {
          registeredComponents.splice(index2, 1);
        }
      }
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
const QCardSection = createComponent({
  name: "QCardSection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    horizontal: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-card__section q-card__section--${props.horizontal === true ? "horiz row no-wrap" : "vert"}`
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
function injectProp(target, propName, get, set2) {
  Object.defineProperty(target, propName, {
    get,
    set: set2,
    enumerable: true
  });
}
function getMatch(userAgent, platformMatch) {
  const match = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(userAgent) || /(opr)[\/]([\w.]+)/.exec(userAgent) || /(vivaldi)[\/]([\w.]+)/.exec(userAgent) || /(chrome|crios)[\/]([\w.]+)/.exec(userAgent) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) || /(firefox|fxios)[\/]([\w.]+)/.exec(userAgent) || /(webkit)[\/]([\w.]+)/.exec(userAgent) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent) || [];
  return {
    browser: match[5] || match[3] || match[1] || "",
    version: match[2] || match[4] || "0",
    versionNumber: match[4] || match[2] || "0",
    platform: platformMatch[0] || ""
  };
}
function getPlatformMatch(userAgent) {
  return /(ipad)/.exec(userAgent) || /(ipod)/.exec(userAgent) || /(windows phone)/.exec(userAgent) || /(iphone)/.exec(userAgent) || /(kindle)/.exec(userAgent) || /(silk)/.exec(userAgent) || /(android)/.exec(userAgent) || /(win)/.exec(userAgent) || /(mac)/.exec(userAgent) || /(linux)/.exec(userAgent) || /(cros)/.exec(userAgent) || /(playbook)/.exec(userAgent) || /(bb)/.exec(userAgent) || /(blackberry)/.exec(userAgent) || [];
}
function getPlatform(UA) {
  const userAgent = UA.toLowerCase(), platformMatch = getPlatformMatch(userAgent), matched = getMatch(userAgent, platformMatch), browser = {};
  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }
  if (matched.platform) {
    browser[matched.platform] = true;
  }
  const knownMobiles = browser.android || browser.ios || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"];
  if (knownMobiles === true || userAgent.indexOf("mobile") > -1) {
    browser.mobile = true;
    if (browser.edga || browser.edgios) {
      browser.edge = true;
      matched.browser = "edge";
    } else if (browser.crios) {
      browser.chrome = true;
      matched.browser = "chrome";
    } else if (browser.fxios) {
      browser.firefox = true;
      matched.browser = "firefox";
    }
  } else {
    browser.desktop = true;
  }
  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }
  if (browser["windows phone"]) {
    browser.winphone = true;
    delete browser["windows phone"];
  }
  if (browser.chrome || browser.opr || browser.safari || browser.vivaldi || browser.mobile === true && browser.ios !== true && knownMobiles !== true) {
    browser.webkit = true;
  }
  if (browser.edg) {
    matched.browser = "edgechromium";
    browser.edgeChromium = true;
  }
  if (browser.safari && browser.blackberry || browser.bb) {
    matched.browser = "blackberry";
    browser.blackberry = true;
  }
  if (browser.safari && browser.playbook) {
    matched.browser = "playbook";
    browser.playbook = true;
  }
  if (browser.opr) {
    matched.browser = "opera";
    browser.opera = true;
  }
  if (browser.safari && browser.android) {
    matched.browser = "android";
    browser.android = true;
  }
  if (browser.safari && browser.kindle) {
    matched.browser = "kindle";
    browser.kindle = true;
  }
  if (browser.safari && browser.silk) {
    matched.browser = "silk";
    browser.silk = true;
  }
  if (browser.vivaldi) {
    matched.browser = "vivaldi";
    browser.vivaldi = true;
  }
  browser.name = matched.browser;
  browser.platform = matched.platform;
  return browser;
}
const ssrClient = {
  has: {
    touch: false,
    webStorage: false
  },
  within: { iframe: false }
};
const client = ssrClient;
const Platform = {
  install(opts) {
    const { $q } = opts;
    {
      $q.platform = this.parseSSR(opts.ssrContext);
    }
  }
};
{
  Platform.parseSSR = (ssrContext) => {
    const userAgent = ssrContext.req.headers["user-agent"] || ssrContext.req.headers["User-Agent"] || "";
    return {
      ...client,
      userAgent,
      is: getPlatform(userAgent)
    };
  };
}
const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};
const useSizeProps = {
  size: String
};
function useSize(props, sizes = useSizeDefaults) {
  return computed(() => props.size !== void 0 ? { fontSize: props.size in sizes ? `${sizes[props.size]}px` : props.size } : null);
}
const defaultViewBox = "0 0 24 24";
const sameFn = (i) => i;
const ionFn = (i) => `ionicons ${i}`;
const libMap = {
  "mdi-": (i) => `mdi ${i}`,
  "icon-": sameFn,
  "bt-": (i) => `bt ${i}`,
  "eva-": (i) => `eva ${i}`,
  "ion-md": ionFn,
  "ion-ios": ionFn,
  "ion-logo": ionFn,
  "iconfont ": sameFn,
  "ti-": (i) => `themify-icon ${i}`,
  "bi-": (i) => `bootstrap-icons ${i}`
};
const matMap = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
};
const symMap = {
  sym_o_: "-outlined",
  sym_r_: "-rounded",
  sym_s_: "-sharp"
};
const libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")");
const matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")");
const symRE = new RegExp("^(" + Object.keys(symMap).join("|") + ")");
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
const QIcon = createComponent({
  name: "QIcon",
  props: {
    ...useSizeProps,
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-icon" + (props.left === true ? " on-left" : "") + (props.right === true ? " on-right" : "") + (props.color !== void 0 ? ` text-${props.color}` : "")
    );
    const type = computed(() => {
      let cls;
      let icon = props.name;
      if (icon === "none" || !icon) {
        return { none: true };
      }
      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === "none" || !icon) {
              return { none: true };
            }
          } else {
            return {
              cls: res.cls,
              content: res.content !== void 0 ? res.content : " "
            };
          }
        }
      }
      if (mRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svg: true,
          viewBox,
          nodes: def.split("&&").map((path) => {
            const [d, style, transform] = path.split("@@");
            return h("path", { style, d, transform });
          })
        };
      }
      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        };
      }
      if (svgUseRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svguse: true,
          src: def.substring(7),
          viewBox
        };
      }
      let content = " ";
      const matches = icon.match(libRE);
      if (matches !== null) {
        cls = libMap[matches[1]](icon);
      } else if (faRE.test(icon) === true) {
        cls = icon;
      } else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${$q.platform.is.ios === true ? "ios" : "md"}${icon.substring(3)}`;
      } else if (symRE.test(icon) === true) {
        cls = "notranslate material-symbols";
        const matches2 = icon.match(symRE);
        if (matches2 !== null) {
          icon = icon.substring(6);
          cls += symMap[matches2[1]];
        }
        content = icon;
      } else {
        cls = "notranslate material-icons";
        const matches2 = icon.match(matRE);
        if (matches2 !== null) {
          icon = icon.substring(2);
          cls += matMap[matches2[1]];
        }
        content = icon;
      }
      return {
        cls,
        content
      };
    });
    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        "aria-hidden": "true",
        role: "presentation"
      };
      if (type.value.none === true) {
        return h(props.tag, data, hSlot(slots.default));
      }
      if (type.value.img === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("img", { src: type.value.src })
        ]));
      }
      if (type.value.svg === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox || "0 0 24 24"
          }, type.value.nodes)
        ]));
      }
      if (type.value.svguse === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox
          }, [
            h("use", { "xlink:href": type.value.src })
          ])
        ]));
      }
      if (type.value.cls !== void 0) {
        data.class += " " + type.value.cls;
      }
      return h(props.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]));
    };
  }
});
const useSpinnerProps = {
  size: {
    type: [Number, String],
    default: "1em"
  },
  color: String
};
function useSpinner(props) {
  return {
    cSize: computed(() => props.size in useSizeDefaults ? `${useSizeDefaults[props.size]}px` : props.size),
    classes: computed(
      () => "q-spinner" + (props.color ? ` text-${props.color}` : "")
    )
  };
}
const QSpinner = createComponent({
  name: "QSpinner",
  props: {
    ...useSpinnerProps,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value + " q-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props, $q) {
  return computed(() => props.dark === null ? $q.dark.isActive : props.dark);
}
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    props.disable !== true && $form.bindComponent(proxy);
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
"Boolean Number String Function Array Date RegExp Object".split(" ").forEach((name) => {
  name.toLowerCase();
});
function css(element, css2) {
  const style = element.style;
  for (const prop in css2) {
    style[prop] = css2[prop];
  }
}
function getElement(el) {
  if (el === void 0 || el === null) {
    return void 0;
  }
  if (typeof el === "string") {
    try {
      return document.querySelector(el) || void 0;
    } catch (err) {
      return void 0;
    }
  }
  const target = isRef(el) === true ? el.value : el;
  if (target) {
    return target.$el || target;
  }
}
function childHasFocus(el, focusedEl) {
  if (el === void 0 || el === null || el.contains(focusedEl) === true) {
    return true;
  }
  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true;
    }
  }
  return false;
}
function shouldIgnoreKey(evt) {
  return evt !== Object(evt) || evt.isComposing === true || evt.qKeyEvent === true;
}
function isKeyCode(evt, keyCodes2) {
  return shouldIgnoreKey(evt) === true ? false : [].concat(keyCodes2).includes(evt.keyCode);
}
const getSSRProps = () => ({});
const Ripple = createDirective(
  { name: "ripple", getSSRProps }
);
const alignMap = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
  evenly: "evenly",
  stretch: "stretch"
};
const alignValues = Object.keys(alignMap);
const useAlignProps = {
  align: {
    type: String,
    validator: (v) => alignValues.includes(v)
  }
};
function useAlign(props) {
  return computed(() => {
    const align = props.align === void 0 ? props.vertical === true ? "stretch" : "left" : props.align;
    return `${props.vertical === true ? "items" : "justify"}-${alignMap[align]}`;
  });
}
function getParentVm(vm) {
  if (Object(vm.$parent) === vm.$parent) {
    return vm.$parent;
  }
  vm = vm.$.parent;
  while (Object(vm) === vm) {
    if (Object(vm.proxy) === vm.proxy) {
      return vm.proxy;
    }
    vm = vm.parent;
  }
}
function vmHasRouter(vm) {
  return vm.appContext.config.globalProperties.$router !== void 0;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key], outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) {
        return false;
      }
    } else if (Array.isArray(outerValue) === false || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) {
      return false;
    }
  }
  return true;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) === true ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) === true ? isEquivalentArray(a, b) : Array.isArray(b) === true ? isEquivalentArray(b, a) : a === b;
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[key], b[key]) === false) {
      return false;
    }
  }
  return true;
}
const useRouterLinkProps = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: {
    type: String,
    default: "q-router-link--active"
  },
  exactActiveClass: {
    type: String,
    default: "q-router-link--exact-active"
  },
  href: String,
  target: String,
  disable: Boolean
};
function useRouterLink(fallbackTag) {
  const vm = getCurrentInstance();
  const { props, proxy } = vm;
  const hasRouter = vmHasRouter(vm);
  const hasHrefLink = computed(() => props.disable !== true && props.href !== void 0);
  const hasRouterLinkProps = computed(
    () => hasRouter === true && props.disable !== true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  );
  const linkRoute = computed(() => {
    if (hasRouterLinkProps.value === true) {
      try {
        return proxy.$router.resolve(props.to);
      } catch (err) {
      }
    }
    return null;
  });
  const hasRouterLink = computed(() => linkRoute.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);
  const linkTag = computed(() => props.type === "a" || hasLink.value === true ? "a" : props.tag || fallbackTag || "div");
  const linkProps = computed(() => hasHrefLink.value === true ? {
    href: props.href,
    target: props.target
  } : hasRouterLink.value === true ? {
    href: linkRoute.value.href,
    target: props.target
  } : {});
  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return null;
    }
    const { matched } = linkRoute.value, { length } = matched, routeMatched = matched[length - 1];
    if (routeMatched === void 0) {
      return -1;
    }
    const currentMatched = proxy.$route.matched;
    if (currentMatched.length === 0) {
      return -1;
    }
    const index2 = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );
    if (index2 > -1) {
      return index2;
    }
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(
      isSameRouteRecord.bind(null, matched[length - 2])
    ) : index2;
  });
  const linkIsActive = computed(
    () => hasRouterLink.value === true && linkActiveIndex.value > -1 && includesParams(proxy.$route.params, linkRoute.value.params)
  );
  const linkIsExactActive = computed(
    () => linkIsActive.value === true && linkActiveIndex.value === proxy.$route.matched.length - 1 && isSameRouteLocationParams(proxy.$route.params, linkRoute.value.params)
  );
  const linkClass = computed(() => hasRouterLink.value === true ? linkIsExactActive.value === true ? ` ${props.exactActiveClass} ${props.activeClass}` : props.exact === true ? "" : linkIsActive.value === true ? ` ${props.activeClass}` : "" : "");
  function navigateToRouterLink(e) {
    if (props.disable === true || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.__qNavigate !== true && e.defaultPrevented === true || e.button !== void 0 && e.button !== 0 || props.target === "_blank") {
      return false;
    }
    prevent(e);
    return proxy.$router[props.replace === true ? "replace" : "push"](props.to).catch((err) => err);
  }
  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,
    linkTag,
    linkRoute,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkProps,
    navigateToRouterLink
  };
}
const padding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};
const defaultSizes$1 = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const formTypes = ["button", "submit", "reset"];
const mediaTypeRE = /[^\s]\/[^\s]/;
const useBtnProps = {
  ...useSizeProps,
  ...useRouterLinkProps,
  type: {
    type: String,
    default: "button"
  },
  label: [Number, String],
  icon: String,
  iconRight: String,
  round: Boolean,
  square: Boolean,
  outline: Boolean,
  flat: Boolean,
  unelevated: Boolean,
  rounded: Boolean,
  push: Boolean,
  glossy: Boolean,
  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,
  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,
  tabindex: [Number, String],
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  align: {
    ...useAlignProps.align,
    default: "center"
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};
function useBtn(props) {
  const sizeStyle = useSize(props, defaultSizes$1);
  const alignClass = useAlign(props);
  const { hasRouterLink, hasLink, linkTag, linkProps, navigateToRouterLink } = useRouterLink("button");
  const style = computed(() => {
    const obj = props.fab === false && props.fabMini === false ? sizeStyle.value : {};
    return props.padding !== void 0 ? Object.assign({}, obj, {
      padding: props.padding.split(/\s+/).map((v) => v in padding ? padding[v] + "px" : v).join(" "),
      minWidth: "0",
      minHeight: "0"
    }) : obj;
  });
  const isRounded = computed(
    () => props.rounded === true || props.fab === true || props.fabMini === true
  );
  const isActionable = computed(
    () => props.disable !== true && props.loading !== true
  );
  const tabIndex = computed(() => isActionable.value === true ? props.tabindex || 0 : -1);
  const design = computed(() => {
    if (props.flat === true)
      return "flat";
    if (props.outline === true)
      return "outline";
    if (props.push === true)
      return "push";
    if (props.unelevated === true)
      return "unelevated";
    return "standard";
  });
  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };
    if (hasLink.value === true) {
      Object.assign(acc, linkProps.value);
    } else if (formTypes.includes(props.type) === true) {
      acc.type = props.type;
    }
    if (linkTag.value === "a") {
      if (props.disable === true) {
        acc["aria-disabled"] = "true";
      } else if (acc.href === void 0) {
        acc.role = "button";
      }
      if (hasRouterLink.value !== true && mediaTypeRE.test(props.type) === true) {
        acc.type = props.type;
      }
    } else if (props.disable === true) {
      acc.disabled = "";
      acc["aria-disabled"] = "true";
    }
    if (props.loading === true && props.percentage !== void 0) {
      Object.assign(acc, {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": props.percentage
      });
    }
    return acc;
  });
  const classes = computed(() => {
    let colors;
    if (props.color !== void 0) {
      if (props.flat === true || props.outline === true) {
        colors = `text-${props.textColor || props.color}`;
      } else {
        colors = `bg-${props.color} text-${props.textColor || "white"}`;
      }
    } else if (props.textColor) {
      colors = `text-${props.textColor}`;
    }
    const shape = props.round === true ? "round" : `rectangle${isRounded.value === true ? " q-btn--rounded" : props.square === true ? " q-btn--square" : ""}`;
    return `q-btn--${design.value} q-btn--${shape}` + (colors !== void 0 ? " " + colors : "") + (isActionable.value === true ? " q-btn--actionable q-focusable q-hoverable" : props.disable === true ? " disabled" : "") + (props.fab === true ? " q-btn--fab" : props.fabMini === true ? " q-btn--fab-mini" : "") + (props.noCaps === true ? " q-btn--no-uppercase" : "") + (props.dense === true ? " q-btn--dense" : "") + (props.stretch === true ? " no-border-radius self-stretch" : "") + (props.glossy === true ? " glossy" : "") + (props.square ? " q-btn--square" : "");
  });
  const innerClasses = computed(
    () => alignClass.value + (props.stack === true ? " column" : " row") + (props.noWrap === true ? " no-wrap text-no-wrap" : "") + (props.loading === true ? " q-btn__content--hidden" : "")
  );
  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasRouterLink,
    hasLink,
    linkTag,
    navigateToRouterLink,
    isActionable
  };
}
const { passiveCapture } = listenOpts;
let touchTarget = null, keyboardTarget = null, mouseTarget = null;
const QBtn = createComponent({
  name: "QBtn",
  props: {
    ...useBtnProps,
    percentage: Number,
    darkPercentage: Boolean
  },
  emits: ["click", "keydown", "touchstart", "mousedown", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const {
      classes,
      style,
      innerClasses,
      attributes,
      hasRouterLink,
      hasLink,
      linkTag,
      navigateToRouterLink,
      isActionable
    } = useBtn(props);
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer;
    const hasLabel = computed(
      () => props.label !== void 0 && props.label !== null && props.label !== ""
    );
    const ripple = computed(() => props.disable === true || props.ripple === false ? false : {
      keyCodes: hasLink.value === true ? [13, 32] : [13],
      ...props.ripple === true ? {} : props.ripple
    });
    const rippleProps = computed(() => ({ center: props.round }));
    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props.percentage));
      return val > 0 ? { transition: "transform 0.6s", transform: `translateX(${val - 100}%)` } : {};
    });
    const onEvents = computed(() => {
      if (props.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstartPassive: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        };
      }
      if (isActionable.value === true) {
        return {
          onClick,
          onKeydown: onKeydown2,
          onMousedown,
          onTouchstart
        };
      }
      return {
        onClick: stopAndPrevent
      };
    });
    const nodeProps = computed(() => ({
      ref: rootRef,
      class: "q-btn q-btn-item non-selectable no-outline " + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));
    function onClick(e) {
      if (rootRef.value === null) {
        return;
      }
      if (e !== void 0) {
        if (e.defaultPrevented === true) {
          return;
        }
        const el = document.activeElement;
        if (props.type === "submit" && el !== document.body && rootRef.value.contains(el) === false && el.contains(rootRef.value) === false) {
          rootRef.value.focus();
          const onClickCleanup = () => {
            document.removeEventListener("keydown", stopAndPrevent, true);
            document.removeEventListener("keyup", onClickCleanup, passiveCapture);
            rootRef.value !== null && rootRef.value.removeEventListener("blur", onClickCleanup, passiveCapture);
          };
          document.addEventListener("keydown", stopAndPrevent, true);
          document.addEventListener("keyup", onClickCleanup, passiveCapture);
          rootRef.value.addEventListener("blur", onClickCleanup, passiveCapture);
        }
      }
      if (hasRouterLink.value === true) {
        const go = () => {
          e.__qNavigate = true;
          navigateToRouterLink(e);
        };
        emit("click", e, go);
        e.defaultPrevented !== true && go();
      } else {
        emit("click", e);
      }
    }
    function onKeydown2(e) {
      if (rootRef.value === null) {
        return;
      }
      emit("keydown", e);
      if (isKeyCode(e, [13, 32]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();
        if (e.defaultPrevented !== true) {
          rootRef.value.focus();
          keyboardTarget = rootRef.value;
          rootRef.value.classList.add("q-btn--active");
          document.addEventListener("keyup", onPressEnd, true);
          rootRef.value.addEventListener("blur", onPressEnd, passiveCapture);
        }
        stopAndPrevent(e);
      }
    }
    function onTouchstart(e) {
      if (rootRef.value === null) {
        return;
      }
      emit("touchstart", e);
      if (e.defaultPrevented === true) {
        return;
      }
      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;
        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener("touchcancel", onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener("touchend", onPressEnd, passiveCapture);
      }
      avoidMouseRipple = true;
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        avoidMouseRipple = false;
      }, 200);
    }
    function onMousedown(e) {
      if (rootRef.value === null) {
        return;
      }
      e.qSkipRipple = avoidMouseRipple === true;
      emit("mousedown", e);
      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add("q-btn--active");
        document.addEventListener("mouseup", onPressEnd, passiveCapture);
      }
    }
    function onPressEnd(e) {
      if (rootRef.value === null) {
        return;
      }
      if (e !== void 0 && e.type === "blur" && document.activeElement === rootRef.value) {
        return;
      }
      if (e !== void 0 && e.type === "keyup") {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [13, 32]) === true) {
          const evt = new MouseEvent("click", e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);
          stopAndPrevent(e);
          e.qKeyEvent = true;
        }
        emit("keyup", e);
      }
      cleanup();
    }
    function cleanup(destroying) {
      const blurTarget = blurTargetRef.value;
      if (destroying !== true && (touchTarget === rootRef.value || mouseTarget === rootRef.value) && blurTarget !== null && blurTarget !== document.activeElement) {
        blurTarget.setAttribute("tabindex", -1);
        blurTarget.focus();
      }
      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener("touchcancel", onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener("touchend", onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }
      if (mouseTarget === rootRef.value) {
        document.removeEventListener("mouseup", onPressEnd, passiveCapture);
        mouseTarget = null;
      }
      if (keyboardTarget === rootRef.value) {
        document.removeEventListener("keyup", onPressEnd, true);
        rootRef.value !== null && rootRef.value.removeEventListener("blur", onPressEnd, passiveCapture);
        keyboardTarget = null;
      }
      rootRef.value !== null && rootRef.value.classList.remove("q-btn--active");
    }
    function onLoadingEvt(evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }
    Object.assign(proxy, { click: onClick });
    return () => {
      let inner = [];
      props.icon !== void 0 && inner.push(
        h(QIcon, {
          name: props.icon,
          left: props.stack === false && hasLabel.value === true,
          role: "img",
          "aria-hidden": "true"
        })
      );
      hasLabel.value === true && inner.push(
        h("span", { class: "block" }, [props.label])
      );
      inner = hMergeSlot(slots.default, inner);
      if (props.iconRight !== void 0 && props.round === false) {
        inner.push(
          h(QIcon, {
            name: props.iconRight,
            right: props.stack === false && hasLabel.value === true,
            role: "img",
            "aria-hidden": "true"
          })
        );
      }
      const child = [
        h("span", {
          class: "q-focus-helper",
          ref: blurTargetRef
        })
      ];
      if (props.loading === true && props.percentage !== void 0) {
        child.push(
          h("span", {
            class: "q-btn__progress absolute-full overflow-hidden" + (props.darkPercentage === true ? " q-btn__progress--dark" : "")
          }, [
            h("span", {
              class: "q-btn__progress-indicator fit block",
              style: percentageStyle.value
            })
          ])
        );
      }
      child.push(
        h("span", {
          class: "q-btn__content text-center col items-center q-anchor--skip " + innerClasses.value
        }, inner)
      );
      props.loading !== null && child.push(
        h(Transition, {
          name: "q-transition--fade"
        }, () => props.loading === true ? [
          h("span", {
            key: "loading",
            class: "absolute-full flex flex-center"
          }, slots.loading !== void 0 ? slots.loading() : [h(QSpinner)])
        ] : null)
      );
      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [[
          Ripple,
          ripple.value,
          void 0,
          rippleProps.value
        ]]
      );
    };
  }
});
const useCircularCommonProps = {
  ...useSizeProps,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  color: String,
  centerColor: String,
  trackColor: String,
  fontSize: String,
  thickness: {
    type: Number,
    default: 0.2,
    validator: (v) => v >= 0 && v <= 1
  },
  angle: {
    type: Number,
    default: 0
  },
  showValue: Boolean,
  reverse: Boolean,
  instantFeedback: Boolean
};
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v));
}
function normalizeToInterval(v, min, max) {
  if (max <= min) {
    return min;
  }
  const size2 = max - min + 1;
  let index2 = min + (v - min) % size2;
  if (index2 < min) {
    index2 = size2 + index2;
  }
  return index2 === 0 ? 0 : index2;
}
function pad(v, length = 2, char = "0") {
  if (v === void 0 || v === null) {
    return v;
  }
  const val = "" + v;
  return val.length >= length ? val : new Array(length - val.length + 1).join(char) + val;
}
const radius = 50, diameter = 2 * radius, circumference = diameter * Math.PI, strokeDashArray = Math.round(circumference * 1e3) / 1e3;
createComponent({
  name: "QCircularProgress",
  props: {
    ...useCircularCommonProps,
    value: {
      type: Number,
      default: 0
    },
    animationSpeed: {
      type: [String, Number],
      default: 600
    },
    indeterminate: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const svgStyle = computed(() => {
      const angle = ($q.lang.rtl === true ? -1 : 1) * props.angle;
      return {
        transform: props.reverse !== ($q.lang.rtl === true) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - angle}deg)` : `rotate3d(0, 0, 1, ${angle - 90}deg)`
      };
    });
    const circleStyle = computed(() => props.instantFeedback !== true && props.indeterminate !== true ? { transition: `stroke-dashoffset ${props.animationSpeed}ms ease 0s, stroke ${props.animationSpeed}ms ease` } : "");
    const viewBox = computed(() => diameter / (1 - props.thickness / 2));
    const viewBoxAttr = computed(
      () => `${viewBox.value / 2} ${viewBox.value / 2} ${viewBox.value} ${viewBox.value}`
    );
    const normalized = computed(() => between(props.value, props.min, props.max));
    const strokeDashOffset = computed(() => circumference * (1 - (normalized.value - props.min) / (props.max - props.min)));
    const strokeWidth = computed(() => props.thickness / 2 * viewBox.value);
    function getCircle({ thickness, offset, color, cls }) {
      return h("circle", {
        class: "q-circular-progress__" + cls + (color !== void 0 ? ` text-${color}` : ""),
        style: circleStyle.value,
        fill: "transparent",
        stroke: "currentColor",
        "stroke-width": thickness,
        "stroke-dasharray": strokeDashArray,
        "stroke-dashoffset": offset,
        cx: viewBox.value,
        cy: viewBox.value,
        r: radius
      });
    }
    return () => {
      const svgChild = [];
      props.centerColor !== void 0 && props.centerColor !== "transparent" && svgChild.push(
        h("circle", {
          class: `q-circular-progress__center text-${props.centerColor}`,
          fill: "currentColor",
          r: radius - strokeWidth.value / 2,
          cx: viewBox.value,
          cy: viewBox.value
        })
      );
      props.trackColor !== void 0 && props.trackColor !== "transparent" && svgChild.push(
        getCircle({
          cls: "track",
          thickness: strokeWidth.value,
          offset: 0,
          color: props.trackColor
        })
      );
      svgChild.push(
        getCircle({
          cls: "circle",
          thickness: strokeWidth.value,
          offset: strokeDashOffset.value,
          color: props.color
        })
      );
      const child = [
        h("svg", {
          class: "q-circular-progress__svg",
          style: svgStyle.value,
          viewBox: viewBoxAttr.value,
          "aria-hidden": "true"
        }, svgChild)
      ];
      props.showValue === true && child.push(
        h("div", {
          class: "q-circular-progress__text absolute-full row flex-center content-center",
          style: { fontSize: props.fontSize }
        }, slots.default !== void 0 ? slots.default() : [h("div", normalized.value)])
      );
      return h("div", {
        class: `q-circular-progress q-circular-progress--${props.indeterminate === true ? "in" : ""}determinate`,
        style: sizeStyle.value,
        role: "progressbar",
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.indeterminate === true ? void 0 : normalized.value
      }, hMergeSlotSafely(slots.internal, child));
    };
  }
});
const useFileEmits = ["rejected"];
const coreEmits = [
  ...useFileEmits,
  "start",
  "finish",
  "added",
  "removed"
];
const trueFn = () => true;
function getEmitsObject(emitsArray) {
  const emitsObject = {};
  emitsArray.forEach((val) => {
    emitsObject[val] = trueFn;
  });
  return emitsObject;
}
const hasMap = typeof Map === "function", hasSet = typeof Set === "function", hasArrayBuffer = typeof ArrayBuffer === "function";
function isDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) {
      return false;
    }
    let length, i;
    if (a.constructor === Array) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (isDeepEqual(a[i], b[i]) !== true) {
          return false;
        }
      }
      return true;
    }
    if (hasMap === true && a.constructor === Map) {
      if (a.size !== b.size) {
        return false;
      }
      i = a.entries().next();
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false;
        }
        i = i.next();
      }
      i = a.entries().next();
      while (i.done !== true) {
        if (isDeepEqual(i.value[1], b.get(i.value[0])) !== true) {
          return false;
        }
        i = i.next();
      }
      return true;
    }
    if (hasSet === true && a.constructor === Set) {
      if (a.size !== b.size) {
        return false;
      }
      i = a.entries().next();
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false;
        }
        i = i.next();
      }
      return true;
    }
    if (hasArrayBuffer === true && a.buffer != null && a.buffer.constructor === ArrayBuffer) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }
    const keys = Object.keys(a).filter((key) => a[key] !== void 0);
    length = keys.length;
    if (length !== Object.keys(b).filter((key) => b[key] !== void 0).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (isDeepEqual(a[key], b[key]) !== true) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function isObject(v) {
  return v !== null && typeof v === "object" && Array.isArray(v) !== true;
}
getEmitsObject(coreEmits);
const breaks = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function toJalaali(gy, gm, gd) {
  if (Object.prototype.toString.call(gy) === "[object Date]") {
    gd = gy.getDate();
    gm = gy.getMonth() + 1;
    gy = gy.getFullYear();
  }
  return d2j(g2d(gy, gm, gd));
}
function toGregorian(jy, jm, jd) {
  return d2g(j2d(jy, jm, jd));
}
function isLeapJalaaliYear(jy) {
  return jalCalLeap(jy) === 0;
}
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6)
    return 31;
  if (jm <= 11)
    return 30;
  if (isLeapJalaaliYear(jy))
    return 30;
  return 29;
}
function jalCalLeap(jy) {
  const bl = breaks.length;
  let jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    jp = jm;
  }
  n = jy - jp;
  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }
  return leap;
}
function jalCal(jy, withoutLeap) {
  const bl = breaks.length, gy = jy + 621;
  let leapJ = -14, jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;
  if (!withoutLeap) {
    if (jump - n < 6) {
      n = n - jump + div(jump + 4, 33) * 33;
    }
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
      leap = 4;
    }
  }
  return {
    leap,
    gy,
    march
  };
}
function j2d(jy, jm, jd) {
  const r = jalCal(jy, true);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}
function d2j(jdn) {
  const gy = d2g(jdn).gy;
  let jy = gy - 621, jd, jm, k;
  const r = jalCal(jy, false), jdn1f = g2d(gy, 3, r.march);
  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return {
        jy,
        jm,
        jd
      };
    } else {
      k -= 186;
    }
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) {
      k += 1;
    }
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return {
    jy,
    jm,
    jd
  };
}
function g2d(gy, gm, gd) {
  let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}
function d2g(jdn) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308, gd = div(mod(i, 153), 5) + 1, gm = mod(div(i, 153), 12) + 1, gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return {
    gy,
    gm,
    gd
  };
}
function div(a, b) {
  return ~~(a / b);
}
function mod(a, b) {
  return a - ~~(a / b) * b;
}
const defineReactivePlugin = (state, plugin) => {
  Object.assign(plugin, state);
  return plugin;
};
const defaultLang = {
  isoName: "en-US",
  nativeName: "English (US)",
  label: {
    clear: "Clear",
    ok: "OK",
    cancel: "Cancel",
    close: "Close",
    set: "Set",
    select: "Select",
    reset: "Reset",
    remove: "Remove",
    update: "Update",
    create: "Create",
    search: "Search",
    filter: "Filter",
    refresh: "Refresh"
  },
  date: {
    days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    firstDayOfWeek: 0,
    format24h: false,
    pluralDay: "days"
  },
  table: {
    noData: "No data available",
    noResults: "No matching records found",
    loading: "Loading...",
    selectedRecords: (rows) => rows === 1 ? "1 record selected." : (rows === 0 ? "No" : rows) + " records selected.",
    recordsPerPage: "Records per page:",
    allRows: "All",
    pagination: (start, end, total) => start + "-" + end + " of " + total,
    columns: "Columns"
  },
  editor: {
    url: "URL",
    bold: "Bold",
    italic: "Italic",
    strikethrough: "Strikethrough",
    underline: "Underline",
    unorderedList: "Unordered List",
    orderedList: "Ordered List",
    subscript: "Subscript",
    superscript: "Superscript",
    hyperlink: "Hyperlink",
    toggleFullscreen: "Toggle Fullscreen",
    quote: "Quote",
    left: "Left align",
    center: "Center align",
    right: "Right align",
    justify: "Justify align",
    print: "Print",
    outdent: "Decrease indentation",
    indent: "Increase indentation",
    removeFormat: "Remove formatting",
    formatting: "Formatting",
    fontSize: "Font Size",
    align: "Align",
    hr: "Insert Horizontal Rule",
    undo: "Undo",
    redo: "Redo",
    heading1: "Heading 1",
    heading2: "Heading 2",
    heading3: "Heading 3",
    heading4: "Heading 4",
    heading5: "Heading 5",
    heading6: "Heading 6",
    paragraph: "Paragraph",
    code: "Code",
    size1: "Very small",
    size2: "A bit small",
    size3: "Normal",
    size4: "Medium-large",
    size5: "Big",
    size6: "Very big",
    size7: "Maximum",
    defaultFont: "Default Font",
    viewSource: "View Source"
  },
  tree: {
    noNodes: "No nodes available",
    noResults: "No matching nodes found"
  }
};
function getLocale() {
  {
    return;
  }
}
const Plugin$5 = defineReactivePlugin({
  __langPack: {}
}, {
  getLocale,
  set(langObject = defaultLang, ssrContext) {
    const lang = {
      ...langObject,
      rtl: langObject.rtl === true,
      getLocale
    };
    {
      if (ssrContext === void 0) {
        console.error("SSR ERROR: second param required: Quasar.lang.set(lang, ssrContext)");
        return;
      }
      const dir = lang.rtl === true ? "rtl" : "ltr";
      const attrs = `lang=${lang.isoName} dir=${dir}`;
      lang.set = ssrContext.$q.lang.set;
      ssrContext._meta.htmlAttrs = ssrContext.__qPrevLang !== void 0 ? ssrContext._meta.htmlAttrs.replace(ssrContext.__qPrevLang, attrs) : attrs;
      ssrContext.__qPrevLang = attrs;
      ssrContext.$q.lang = lang;
    }
  },
  install({ $q, lang, ssrContext }) {
    {
      const initialLang = lang || defaultLang;
      $q.lang = {};
      $q.lang.set = (langObject) => {
        this.set(langObject, ssrContext);
      };
      $q.lang.set(initialLang);
      if (this.isoName !== initialLang.isoName) {
        this.isoName = initialLang.isoName;
        this.nativeName = initialLang.nativeName;
        this.props = initialLang;
      }
    }
  }
});
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(mask, dateLocale) {
  const days = "(" + dateLocale.days.join("|") + ")", key = mask + days;
  if (regexStore[key] !== void 0) {
    return regexStore[key];
  }
  const daysShort = "(" + dateLocale.daysShort.join("|") + ")", months = "(" + dateLocale.months.join("|") + ")", monthsShort = "(" + dateLocale.monthsShort.join("|") + ")";
  const map = {};
  let index2 = 0;
  const regexText = mask.replace(reverseToken, (match) => {
    index2++;
    switch (match) {
      case "YY":
        map.YY = index2;
        return "(-?\\d{1,2})";
      case "YYYY":
        map.YYYY = index2;
        return "(-?\\d{1,4})";
      case "M":
        map.M = index2;
        return "(\\d{1,2})";
      case "MM":
        map.M = index2;
        return "(\\d{2})";
      case "MMM":
        map.MMM = index2;
        return monthsShort;
      case "MMMM":
        map.MMMM = index2;
        return months;
      case "D":
        map.D = index2;
        return "(\\d{1,2})";
      case "Do":
        map.D = index2++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        map.D = index2;
        return "(\\d{2})";
      case "H":
        map.H = index2;
        return "(\\d{1,2})";
      case "HH":
        map.H = index2;
        return "(\\d{2})";
      case "h":
        map.h = index2;
        return "(\\d{1,2})";
      case "hh":
        map.h = index2;
        return "(\\d{2})";
      case "m":
        map.m = index2;
        return "(\\d{1,2})";
      case "mm":
        map.m = index2;
        return "(\\d{2})";
      case "s":
        map.s = index2;
        return "(\\d{1,2})";
      case "ss":
        map.s = index2;
        return "(\\d{2})";
      case "S":
        map.S = index2;
        return "(\\d{1})";
      case "SS":
        map.S = index2;
        return "(\\d{2})";
      case "SSS":
        map.S = index2;
        return "(\\d{3})";
      case "A":
        map.A = index2;
        return "(AM|PM)";
      case "a":
        map.a = index2;
        return "(am|pm)";
      case "aa":
        map.aa = index2;
        return "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return daysShort;
      case "dddd":
        return days;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "w":
        return "(\\d{1,2})";
      case "ww":
        return "(\\d{2})";
      case "Z":
        map.Z = index2;
        return "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        map.ZZ = index2;
        return "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        map.X = index2;
        return "(-?\\d+)";
      case "x":
        map.x = index2;
        return "(-?\\d{4,})";
      default:
        index2--;
        if (match[0] === "[") {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  });
  const res = { map, regex: new RegExp("^" + regexText) };
  regexStore[key] = res;
  return res;
}
function getDateLocale(paramDateLocale, langProps) {
  return paramDateLocale !== void 0 ? paramDateLocale : langProps !== void 0 ? langProps.date : defaultLang.date;
}
function formatTimezone(offset, delimeter = "") {
  const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.floor(absOffset / 60), minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes);
}
function __splitDate(str, mask, dateLocale, calendar, defaultModel) {
  const date = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  defaultModel !== void 0 && Object.assign(date, defaultModel);
  if (str === void 0 || str === null || str === "" || typeof str !== "string") {
    return date;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const langOpts = getDateLocale(dateLocale, Plugin$5.props), months = langOpts.months, monthsShort = langOpts.monthsShort;
  const { regex, map } = getRegexData(mask, langOpts);
  const match = str.match(regex);
  if (match === null) {
    return date;
  }
  let tzString = "";
  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[map.X !== void 0 ? map.X : map.x], 10);
    if (isNaN(stamp) === true || stamp < 0) {
      return date;
    }
    const d = new Date(stamp * (map.X !== void 0 ? 1e3 : 1));
    date.year = d.getFullYear();
    date.month = d.getMonth() + 1;
    date.day = d.getDate();
    date.hour = d.getHours();
    date.minute = d.getMinutes();
    date.second = d.getSeconds();
    date.millisecond = d.getMilliseconds();
  } else {
    if (map.YYYY !== void 0) {
      date.year = parseInt(match[map.YYYY], 10);
    } else if (map.YY !== void 0) {
      const y = parseInt(match[map.YY], 10);
      date.year = y < 0 ? y : 2e3 + y;
    }
    if (map.M !== void 0) {
      date.month = parseInt(match[map.M], 10);
      if (date.month < 1 || date.month > 12) {
        return date;
      }
    } else if (map.MMM !== void 0) {
      date.month = monthsShort.indexOf(match[map.MMM]) + 1;
    } else if (map.MMMM !== void 0) {
      date.month = months.indexOf(match[map.MMMM]) + 1;
    }
    if (map.D !== void 0) {
      date.day = parseInt(match[map.D], 10);
      if (date.year === null || date.month === null || date.day < 1) {
        return date;
      }
      const maxDay = calendar !== "persian" ? new Date(date.year, date.month, 0).getDate() : jalaaliMonthLength(date.year, date.month);
      if (date.day > maxDay) {
        return date;
      }
    }
    if (map.H !== void 0) {
      date.hour = parseInt(match[map.H], 10) % 24;
    } else if (map.h !== void 0) {
      date.hour = parseInt(match[map.h], 10) % 12;
      if (map.A && match[map.A] === "PM" || map.a && match[map.a] === "pm" || map.aa && match[map.aa] === "p.m.") {
        date.hour += 12;
      }
      date.hour = date.hour % 24;
    }
    if (map.m !== void 0) {
      date.minute = parseInt(match[map.m], 10) % 60;
    }
    if (map.s !== void 0) {
      date.second = parseInt(match[map.s], 10) % 60;
    }
    if (map.S !== void 0) {
      date.millisecond = parseInt(match[map.S], 10) * 10 ** (3 - match[map.S].length);
    }
    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = map.Z !== void 0 ? match[map.Z].replace(":", "") : match[map.ZZ];
      date.timezoneOffset = (tzString[0] === "+" ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }
  date.dateHash = pad(date.year, 6) + "/" + pad(date.month) + "/" + pad(date.day);
  date.timeHash = pad(date.hour) + ":" + pad(date.minute) + ":" + pad(date.second) + tzString;
  return date;
}
function getWeekOfYear(date) {
  const thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  thursday.setDate(thursday.getDate() - (thursday.getDay() + 6) % 7 + 3);
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff);
}
function startOfDate(date, unit, utc) {
  const t = new Date(date), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
function getDiff(t, sub, interval) {
  return (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / interval;
}
function getDateDiff(date, subtract, unit = "days") {
  const t = new Date(date), sub = new Date(subtract);
  switch (unit) {
    case "years":
    case "year":
      return t.getFullYear() - sub.getFullYear();
    case "months":
    case "month":
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(t, "day"), startOfDate(sub, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(t, "hour"), startOfDate(sub, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(t, "minute"), startOfDate(sub, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(t, "second"), startOfDate(sub, "second"), 1e3);
  }
}
function getDayOfYear(date) {
  return getDateDiff(date, startOfDate(date, "year"), "days") + 1;
}
function getOrdinal(n) {
  if (n >= 11 && n <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
  }
  return `${n}th`;
}
const formatter = {
  YY(date, dateLocale, forcedYear) {
    const y = this.YYYY(date, dateLocale, forcedYear) % 100;
    return y >= 0 ? pad(y) : "-" + pad(Math.abs(y));
  },
  YYYY(date, _dateLocale, forcedYear) {
    return forcedYear !== void 0 && forcedYear !== null ? forcedYear : date.getFullYear();
  },
  M(date) {
    return date.getMonth() + 1;
  },
  MM(date) {
    return pad(date.getMonth() + 1);
  },
  MMM(date, dateLocale) {
    return dateLocale.monthsShort[date.getMonth()];
  },
  MMMM(date, dateLocale) {
    return dateLocale.months[date.getMonth()];
  },
  Q(date) {
    return Math.ceil((date.getMonth() + 1) / 3);
  },
  Qo(date) {
    return getOrdinal(this.Q(date));
  },
  D(date) {
    return date.getDate();
  },
  Do(date) {
    return getOrdinal(date.getDate());
  },
  DD(date) {
    return pad(date.getDate());
  },
  DDD(date) {
    return getDayOfYear(date);
  },
  DDDD(date) {
    return pad(getDayOfYear(date), 3);
  },
  d(date) {
    return date.getDay();
  },
  dd(date, dateLocale) {
    return this.dddd(date, dateLocale).slice(0, 2);
  },
  ddd(date, dateLocale) {
    return dateLocale.daysShort[date.getDay()];
  },
  dddd(date, dateLocale) {
    return dateLocale.days[date.getDay()];
  },
  E(date) {
    return date.getDay() || 7;
  },
  w(date) {
    return getWeekOfYear(date);
  },
  ww(date) {
    return pad(getWeekOfYear(date));
  },
  H(date) {
    return date.getHours();
  },
  HH(date) {
    return pad(date.getHours());
  },
  h(date) {
    const hours = date.getHours();
    return hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
  },
  hh(date) {
    return pad(this.h(date));
  },
  m(date) {
    return date.getMinutes();
  },
  mm(date) {
    return pad(date.getMinutes());
  },
  s(date) {
    return date.getSeconds();
  },
  ss(date) {
    return pad(date.getSeconds());
  },
  S(date) {
    return Math.floor(date.getMilliseconds() / 100);
  },
  SS(date) {
    return pad(Math.floor(date.getMilliseconds() / 10));
  },
  SSS(date) {
    return pad(date.getMilliseconds(), 3);
  },
  A(date) {
    return this.H(date) < 12 ? "AM" : "PM";
  },
  a(date) {
    return this.H(date) < 12 ? "am" : "pm";
  },
  aa(date) {
    return this.H(date) < 12 ? "a.m." : "p.m.";
  },
  Z(date, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset, ":");
  },
  ZZ(date, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset);
  },
  X(date) {
    return Math.floor(date.getTime() / 1e3);
  },
  x(date) {
    return date.getTime();
  }
};
function formatDate(val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (val !== 0 && !val || val === Infinity || val === -Infinity) {
    return;
  }
  const date = new Date(val);
  if (isNaN(date)) {
    return;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const locale = getDateLocale(dateLocale, Plugin$5.props);
  return mask.replace(
    token,
    (match, text) => match in formatter ? formatter[match](date, locale, __forcedYear, __forcedTimezoneOffset) : text === void 0 ? match : text.split("\\]").join("]")
  );
}
function debounce(fn, wait = 250, immediate) {
  let timeout;
  function debounced() {
    const args = arguments;
    const later = () => {
      timeout = void 0;
      if (immediate !== true) {
        fn.apply(this, args);
      }
    };
    clearTimeout(timeout);
    if (immediate === true && timeout === void 0) {
      fn.apply(this, args);
    }
    timeout = setTimeout(later, wait);
  }
  debounced.cancel = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
const scrollTargets = [];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length > 0
  );
  const hasActiveRules = computed(
    () => props.disable !== true && hasRules.value === true
  );
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length > 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index2 = ++validateIndex;
    if (innerLoading.value !== true && props.lazyRules !== true) {
      isDirtyModel.value = true;
    }
    const update2 = (err, msg) => {
      if (innerError.value !== err) {
        innerError.value = err;
      }
      const m = msg || void 0;
      if (innerErrorMessage.value !== m) {
        innerErrorMessage.value = m;
      }
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update2(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update2(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index2 === validateIndex && update2(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index2 === validateIndex && update2(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index2 === validateIndex) {
          console.error(e);
          update2(true);
        }
        return false;
      }
    );
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && (isDirtyModel.value === true || props.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update2() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  update2();
  return acc;
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length > 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popup-show", "popup-hide"];
function useFieldState() {
  const { props, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  return {
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length > 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    clearTimeout(focusoutTimer);
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale")
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size2) {
    if (size2 < maskMarked.length) {
      return maskMarked.slice(-size2);
    }
    let pad2 = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size2 - localMaskMarked.length; i > 0; i--) {
        pad2 += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad2 + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length > 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length > 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token2, char2) => {
      if (token2 !== void 0) {
        const c = TOKENS[token2];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index2) => {
      if (index2 === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index2 === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(val);
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length > 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const cursor = end - 1;
        moveCursor.right(inp, cursor, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, start, end, selection) {
      const noMarkBefore = maskMarked.slice(start - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          start = i;
          noMarkBefore === true && start++;
          break;
        }
      }
      if (i < 0 && maskMarked[start] !== void 0 && maskMarked[start] !== MARKER) {
        return moveCursor.right(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(
        start,
        selection === true ? end : start,
        "backward"
      );
    },
    right(inp, start, end, selection) {
      const limit = inp.value.length;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          end = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          end = i;
        }
      }
      if (i > limit && maskMarked[end - 1] !== void 0 && maskMarked[end - 1] !== MARKER) {
        return moveCursor.left(inp, limit, limit);
      }
      inp.setSelectionRange(selection ? start : end, end, "forward");
    },
    leftReverse(inp, start, end, selection) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          start = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          start = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[start] !== void 0 && localMaskMarked[start] !== MARKER) {
        return moveCursor.rightReverse(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(
        start,
        selection === true ? end : start,
        "backward"
      );
    },
    rightReverse(inp, start, end, selection) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, end + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          end = i;
          end > 0 && noMarkBefore === true && end--;
          break;
        }
      }
      if (i > limit && localMaskMarked[end - 1] !== void 0 && localMaskMarked[end - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit, limit);
      }
      inp.setSelectionRange(selection === true ? start : end, end, "forward");
    }
  };
  function onMaskedKeydown(e) {
    if (shouldIgnoreKey(e) === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (e.keyCode === 37 || e.keyCode === 39) {
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, start, end, e.shiftKey);
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start, end, true);
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, start, end, true);
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length > 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown
  };
}
const useFormProps = {
  name: String
};
function useFormAttrs(props) {
  return computed(() => ({
    type: "hidden",
    name: props.name,
    value: props.modelValue
  }));
}
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
const QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change"
  ],
  setup(props, { emit, attrs }) {
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = adjustHeight;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      const inp = inputRef.value;
      if (inp !== null) {
        const parentStyle = inp.parentNode.style;
        const { overflow } = inp.style;
        parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
        inp.style.height = "1px";
        inp.style.overflow = "hidden";
        inp.style.height = inp.scrollHeight + "px";
        inp.style.overflow = overflow;
        parentStyle.marginBottom = "";
      }
    }
    function onChange(e) {
      onComposition(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length > 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    const vm = getCurrentInstance();
    Object.assign(vm.proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    return renderFn;
  }
});
const History = {
  __history: [],
  add: noop$1,
  remove: noop$1,
  install({ $q }) {
    {
      return;
    }
  }
};
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
function useTimeout() {
  let timer2;
  return {
    registerTimeout(fn, delay) {
      clearTimeout(timer2);
      timer2 = setTimeout(fn, delay);
    },
    removeTimeout() {
      clearTimeout(timer2);
    }
  };
}
function useTick() {
  let tickFn;
  return {
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          tickFn();
          tickFn = void 0;
        }
      });
    },
    removeTick() {
      tickFn = void 0;
    }
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "before-show",
  "show",
  "before-hide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true)
      ;
    else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && false) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || true) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit("before-show", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    {
      return;
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit("before-hide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true)
        ;
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, showing) {
  const transitionState = ref(showing.value);
  watch(showing, (val) => {
    nextTick(() => {
      transitionState.value = val;
    });
  });
  return {
    transition: computed(() => "q-transition--" + (transitionState.value === true ? props.transitionHide : props.transitionShow)),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
const portalList = [];
function closePortalMenus(vm, evt) {
  do {
    if (vm.$options.name === "QMenu") {
      vm.hide(evt);
      if (vm.$props.separateClosePopup === true) {
        return getParentVm(vm);
      }
    } else if (vm.__qPortalInnerRef !== void 0) {
      const parent = getParentVm(vm);
      if (parent !== void 0 && parent.$options.name === "QPopupProxy") {
        vm.hide(evt);
        return parent;
      } else {
        return vm;
      }
    }
    vm = getParentVm(vm);
  } while (vm !== void 0 && vm !== null);
}
function usePortal(vm, innerRef, renderPortalContent, checkGlobalDialog) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  {
    return {
      portalIsActive,
      portalIsAccessible,
      showPortal: noop$1,
      hidePortal: noop$1,
      renderPortal: noop$1
    };
  }
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, closeTimer;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index2 = 0; index2 < path.length; index2++) {
    const el = path[index2];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    window.scrollTo(scrollPositionX, scrollPositionY);
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== void 0) {
      clearTimeout(closeTimer);
      closeTimer = void 0;
      return;
    }
    if (registered > 1) {
      return;
    }
  } else {
    if (registered === 0) {
      return;
    }
    registered--;
    if (registered > 0) {
      return;
    }
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = void 0;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index2 = handlers$1.indexOf(fn);
  if (index2 > -1) {
    handlers$1.splice(index2, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index2 = handlers.indexOf(fn);
  if (index2 > -1) {
    handlers.splice(index2, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const transitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
const QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useTransitionProps,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (val) => val === "standard" || ["top", "bottom", "left", "right"].includes(val)
    }
  },
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escape-key"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const transitionState = ref(false);
    const animating = ref(false);
    let shakeTimeout, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true && props.seamless !== true
    );
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();
    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal();
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    computed(
      () => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props.square === true ? " q-dialog__inner--square" : "")
    );
    const transitionShow = computed(
      () => "q-transition--" + (props.transitionShow === void 0 ? transitions[props.position][0] : props.transitionShow)
    );
    const transitionHide = computed(
      () => "q-transition--" + (props.transitionHide === void 0 ? transitions[props.position][1] : props.transitionHide)
    );
    computed(() => transitionState.value === true ? transitionHide.value : transitionShow.value);
    computed(
      () => `--q-transition-duration: ${props.transitionDuration}ms`
    );
    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);
    computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(showing, (val) => {
      nextTick(() => {
        transitionState.value = val;
      });
    });
    watch(() => props.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      removeTimeout();
      removeTick();
      addToHistory();
      refocusTarget = props.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;
      if (props.noFocus !== true) {
        document.activeElement !== null && document.activeElement.blur();
        registerTick(focus);
      }
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height,
                bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2)
              );
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTimeout();
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();
      if (refocusTarget !== null) {
        refocusTarget.focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        animating.value = false;
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function focus(selector) {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null || node.contains(document.activeElement) === true) {
          return;
        }
        node = node.querySelector(selector || "[autofocus], [data-autofocus]") || node;
        node.focus({ preventScroll: true });
      });
    }
    function shake() {
      focus();
      emit("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        } else {
          emit("escape-key");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      clearTimeout(shakeTimeout);
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit("click", e);
      }
    }
    function onFocusChange(evt) {
      if (props.allowFocusOutside !== true && portalIsAccessible.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }
    Object.assign(vm.proxy, {
      focus,
      shake,
      __updateRefocusTarget(target) {
        refocusTarget = target || null;
      }
    });
    return renderPortal;
  }
});
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
const useAnchorProps = {
  target: {
    default: true
  },
  noParentEvent: Boolean,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  configureAnchorEl
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) {
          return;
        }
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        clearTimeout(touchTimer);
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) {
        return;
      }
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
let timer;
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  clearTimeout(timer);
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) {
    return;
  }
  let portalIndex = portalList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalList[portalIndex].$;
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) {
      return;
    }
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index2 = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index2 > -1) {
    registeredList.splice(index2, 1);
    if (registeredList.length === 0) {
      clearTimeout(timer);
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    left,
    right,
    bottom,
    width,
    height,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getTargetProps(el) {
  return {
    top: 0,
    center: el.offsetHeight / 2,
    bottom: el.offsetHeight,
    left: 0,
    middle: el.offsetWidth / 2,
    right: el.offsetWidth
  };
}
function setPosition(cfg) {
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  let anchorProps;
  const { scrollLeft, scrollTop } = cfg.el;
  if (cfg.absoluteOffset === void 0) {
    anchorProps = getAnchorProps(cfg.anchorEl, cfg.cover === true ? [0, 0] : cfg.offset);
  } else {
    const { top: anchorTop, left: anchorLeft } = cfg.anchorEl.getBoundingClientRect(), top = anchorTop + cfg.absoluteOffset.top, left = anchorLeft + cfg.absoluteOffset.left;
    anchorProps = { top, left, width: 1, height: 1, right: left + 1, center: top, middle: left, bottom: top + 1 };
  }
  let elStyle = {
    maxHeight: cfg.maxHeight,
    maxWidth: cfg.maxWidth,
    visibility: "visible"
  };
  if (cfg.fit === true || cfg.cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cfg.cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(cfg.el.style, elStyle);
  const targetProps = getTargetProps(cfg.el), props = {
    top: anchorProps[cfg.anchorOrigin.vertical] - targetProps[cfg.selfOrigin.vertical],
    left: anchorProps[cfg.anchorOrigin.horizontal] - targetProps[cfg.selfOrigin.horizontal]
  };
  applyBoundaries(props, anchorProps, targetProps, cfg.anchorOrigin, cfg.selfOrigin);
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(cfg.el.style, elStyle);
  if (cfg.el.scrollTop !== scrollTop) {
    cfg.el.scrollTop = scrollTop;
  }
  if (cfg.el.scrollLeft !== scrollLeft) {
    cfg.el.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
const QMenu = createComponent({
  name: "QMenu",
  inheritAttrs: false,
  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },
    scrollTarget: {
      default: void 0
    },
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "escape-key"
  ],
  setup(props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;
    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;
    const innerRef = ref(null);
    const showing = ref(false);
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true
    );
    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout, removeTimeout } = useTimeout();
    useTransition(props, showing);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow } = useAnchor({ showing });
    const { hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    const { showPortal, hidePortal, renderPortal } = usePortal();
    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside(e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);
          if (e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      }
    };
    const anchorOrigin = computed(
      () => parsePosition(
        props.anchor || (props.cover === true ? "center middle" : "bottom start"),
        $q.lang.rtl
      )
    );
    const selfOrigin = computed(() => props.cover === true ? anchorOrigin.value : parsePosition(props.self || "top start", $q.lang.rtl));
    computed(
      () => (props.square === true ? " q-menu--square" : "") + (isDark.value === true ? " q-menu--dark q-dark" : "")
    );
    computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const handlesFocus = computed(
      () => showing.value === true && props.persistent !== true
    );
    watch(handlesFocus, (val) => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      } else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });
    function focus() {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function handleShow(evt) {
      removeTick();
      removeTimeout();
      refocusTarget = props.noRefocus === false ? document.activeElement : null;
      addFocusout(onFocusout);
      showPortal();
      configureScrollTarget();
      absoluteOffset = void 0;
      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);
        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      if (props.noFocus !== true) {
        document.activeElement.blur();
      }
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });
      registerTimeout(() => {
        if ($q.platform.is.ios === true) {
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }
        updatePosition();
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      removeTimeout();
      hidePortal();
      anchorCleanup(true);
      if (refocusTarget !== null && (evt === void 0 || evt.qClickOutside !== true)) {
        refocusTarget.focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup(hiding) {
      absoluteOffset = void 0;
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit("click", e);
      } else {
        avoidAutoClose = false;
      }
    }
    function onFocusout(evt) {
      if (handlesFocus.value === true && props.noFocus !== true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus();
      }
    }
    function onEscapeKey(evt) {
      emit("escape-key");
      hide(evt);
    }
    function updatePosition() {
      const el = innerRef.value;
      if (el === null || anchorEl.value === null) {
        return;
      }
      setPosition({
        el,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    Object.assign(proxy, { focus, updatePosition });
    return renderPortal;
  }
});
const __nuxt_component_4 = createComponent({
  name: "QPopupProxy",
  props: {
    ...useAnchorProps,
    breakpoint: {
      type: [String, Number],
      default: 450
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const showing = ref(false);
    const popupRef = ref(null);
    const breakpoint = computed(() => parseInt(props.breakpoint, 10));
    const { canShow } = useAnchor({ showing });
    function getType() {
      return $q.screen.width < breakpoint.value || $q.screen.height < breakpoint.value ? "dialog" : "menu";
    }
    const type = ref(getType());
    const popupProps = computed(
      () => type.value === "menu" ? { maxHeight: "99vh" } : {}
    );
    watch(() => getType(), (val) => {
      if (showing.value !== true) {
        type.value = val;
      }
    });
    Object.assign(proxy, {
      show(evt) {
        canShow(evt) === true && popupRef.value.show(evt);
      },
      hide(evt) {
        popupRef.value.hide(evt);
      },
      toggle(evt) {
        popupRef.value.toggle(evt);
      }
    });
    function onShow(evt) {
      showing.value = true;
      emit("show", evt);
    }
    function onHide(evt) {
      showing.value = false;
      type.value = getType();
      emit("hide", evt);
    }
    return () => {
      const data = {
        ref: popupRef,
        ...popupProps.value,
        ...attrs,
        onShow,
        onHide
      };
      let component;
      if (type.value === "dialog") {
        component = QDialog;
      } else {
        component = QMenu;
        Object.assign(data, {
          target: props.target,
          contextMenu: props.contextMenu,
          noParentEvent: true,
          separateClosePopup: true
        });
      }
      return h(component, data, slots.default);
    };
  }
});
function useCache() {
  return {
    getCache: function(_, obj) {
      return obj;
    },
    getCacheWithFn: function(_, fn) {
      return fn();
    }
  };
}
const calendars = ["gregorian", "persian"];
const useDatetimeProps = {
  modelValue: {
    required: true
  },
  mask: {
    type: String
  },
  locale: Object,
  calendar: {
    type: String,
    validator: (v) => calendars.includes(v),
    default: "gregorian"
  },
  landscape: Boolean,
  color: String,
  textColor: String,
  square: Boolean,
  flat: Boolean,
  bordered: Boolean,
  readonly: Boolean,
  disable: Boolean
};
const useDatetimeEmits = ["update:modelValue"];
function getDayHash(date) {
  return date.year + "/" + pad(date.month) + "/" + pad(date.day);
}
function useDatetime(props, $q) {
  const editable = computed(() => {
    return props.disable !== true && props.readonly !== true;
  });
  const tabindex = computed(() => {
    return props.editable === true ? 0 : -1;
  });
  const headerClass = computed(() => {
    const cls = [];
    props.color !== void 0 && cls.push(`bg-${props.color}`);
    props.textColor !== void 0 && cls.push(`text-${props.textColor}`);
    return cls.join(" ");
  });
  function getLocale2() {
    return props.locale !== void 0 ? { ...$q.lang.date, ...props.locale } : $q.lang.date;
  }
  function getCurrentDate(dateOnly) {
    const d = new Date();
    const timeFill = dateOnly === true ? null : 0;
    if (props.calendar === "persian") {
      const jDate = toJalaali(d);
      return {
        year: jDate.jy,
        month: jDate.jm,
        day: jDate.jd
      };
    }
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hour: timeFill,
      minute: timeFill,
      second: timeFill,
      millisecond: timeFill
    };
  }
  return {
    editable,
    tabindex,
    headerClass,
    getLocale: getLocale2,
    getCurrentDate
  };
}
const yearsInterval = 20;
const views = ["Calendar", "Years", "Months"];
const viewIsValid = (v) => views.includes(v);
const yearMonthValidator = (v) => /^-?[\d]+\/[0-1]\d$/.test(v);
const lineStr = " \u2014 ";
function getMonthHash(date) {
  return date.year + "/" + pad(date.month);
}
const __nuxt_component_5$1 = createComponent({
  name: "QDate",
  props: {
    ...useDatetimeProps,
    ...useFormProps,
    ...useDarkProps,
    multiple: Boolean,
    range: Boolean,
    title: String,
    subtitle: String,
    mask: {
      default: "YYYY/MM/DD"
    },
    defaultYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    yearsInMonthView: Boolean,
    events: [Array, Function],
    eventColor: [String, Function],
    emitImmediately: Boolean,
    options: [Array, Function],
    navigationMinYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    navigationMaxYearMonth: {
      type: String,
      validator: yearMonthValidator
    },
    noUnset: Boolean,
    firstDayOfWeek: [String, Number],
    todayBtn: Boolean,
    minimal: Boolean,
    defaultView: {
      type: String,
      default: "Calendar",
      validator: viewIsValid
    }
  },
  emits: [
    ...useDatetimeEmits,
    "range-start",
    "range-end",
    "navigation"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const { getCache } = useCache();
    const { tabindex, headerClass, getLocale: getLocale2, getCurrentDate } = useDatetime(props, $q);
    let lastEmitValue;
    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);
    const blurTargetRef = ref(null);
    const innerMask = ref(getMask());
    const innerLocale = ref(getLocale2());
    const mask = computed(() => getMask());
    const locale = computed(() => getLocale2());
    const today = computed(() => getCurrentDate());
    const viewModel = ref(getViewModel(innerMask.value, innerLocale.value));
    const view = ref(props.defaultView);
    const direction = $q.lang.rtl === true ? "right" : "left";
    const monthDirection = ref(direction.value);
    const yearDirection = ref(direction.value);
    const year = viewModel.value.year;
    const startYear = ref(year - year % yearsInterval - (year < 0 ? yearsInterval : 0));
    const editRange = ref(null);
    const classes = computed(() => {
      const type = props.landscape === true ? "landscape" : "portrait";
      return `q-date q-date--${type} q-date--${type}-${props.minimal === true ? "minimal" : "standard"}` + (isDark.value === true ? " q-date--dark q-dark" : "") + (props.bordered === true ? " q-date--bordered" : "") + (props.square === true ? " q-date--square no-border-radius" : "") + (props.flat === true ? " q-date--flat no-shadow" : "") + (props.disable === true ? " disabled" : props.readonly === true ? " q-date--readonly" : "");
    });
    const computedColor = computed(() => {
      return props.color || "primary";
    });
    const computedTextColor = computed(() => {
      return props.textColor || "white";
    });
    const isImmediate = computed(
      () => props.emitImmediately === true && props.multiple !== true && props.range !== true
    );
    const normalizedModel = computed(() => Array.isArray(props.modelValue) === true ? props.modelValue : props.modelValue !== null && props.modelValue !== void 0 ? [props.modelValue] : []);
    const daysModel = computed(
      () => normalizedModel.value.filter((date) => typeof date === "string").map((date) => decodeString(date, innerMask.value, innerLocale.value)).filter(
        (date) => date.dateHash !== null && date.day !== null && date.month !== null && date.year !== null
      )
    );
    const rangeModel = computed(() => {
      const fn = (date) => decodeString(date, innerMask.value, innerLocale.value);
      return normalizedModel.value.filter((date) => isObject(date) === true && date.from !== void 0 && date.to !== void 0).map((range) => ({ from: fn(range.from), to: fn(range.to) })).filter((range) => range.from.dateHash !== null && range.to.dateHash !== null && range.from.dateHash < range.to.dateHash);
    });
    const getNativeDateFn = computed(() => props.calendar !== "persian" ? (model) => new Date(model.year, model.month - 1, model.day) : (model) => {
      const gDate = toGregorian(model.year, model.month, model.day);
      return new Date(gDate.gy, gDate.gm - 1, gDate.gd);
    });
    const encodeObjectFn = computed(() => props.calendar === "persian" ? getDayHash : (date, mask2, locale2) => formatDate(
      new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour,
        date.minute,
        date.second,
        date.millisecond
      ),
      mask2 === void 0 ? innerMask.value : mask2,
      locale2 === void 0 ? innerLocale.value : locale2,
      date.year,
      date.timezoneOffset
    ));
    const daysInModel = computed(
      () => daysModel.value.length + rangeModel.value.reduce(
        (acc, range) => acc + 1 + getDateDiff(
          getNativeDateFn.value(range.to),
          getNativeDateFn.value(range.from)
        ),
        0
      )
    );
    const headerTitle = computed(() => {
      if (props.title !== void 0 && props.title !== null && props.title.length > 0) {
        return props.title;
      }
      if (editRange.value !== null) {
        const model2 = editRange.value.init;
        const date2 = getNativeDateFn.value(model2);
        return innerLocale.value.daysShort[date2.getDay()] + ", " + innerLocale.value.monthsShort[model2.month - 1] + " " + model2.day + lineStr + "?";
      }
      if (daysInModel.value === 0) {
        return lineStr;
      }
      if (daysInModel.value > 1) {
        return `${daysInModel.value} ${innerLocale.value.pluralDay}`;
      }
      const model = daysModel.value[0];
      const date = getNativeDateFn.value(model);
      if (isNaN(date.valueOf()) === true) {
        return lineStr;
      }
      if (innerLocale.value.headerTitle !== void 0) {
        return innerLocale.value.headerTitle(date, model);
      }
      return innerLocale.value.daysShort[date.getDay()] + ", " + innerLocale.value.monthsShort[model.month - 1] + " " + model.day;
    });
    const minSelectedModel = computed(() => {
      const model = daysModel.value.concat(rangeModel.value.map((range) => range.from)).sort((a, b) => a.year - b.year || a.month - b.month);
      return model[0];
    });
    const maxSelectedModel = computed(() => {
      const model = daysModel.value.concat(rangeModel.value.map((range) => range.to)).sort((a, b) => b.year - a.year || b.month - a.month);
      return model[0];
    });
    const headerSubtitle = computed(() => {
      if (props.subtitle !== void 0 && props.subtitle !== null && props.subtitle.length > 0) {
        return props.subtitle;
      }
      if (daysInModel.value === 0) {
        return lineStr;
      }
      if (daysInModel.value > 1) {
        const from = minSelectedModel.value;
        const to = maxSelectedModel.value;
        const month = innerLocale.value.monthsShort;
        return month[from.month - 1] + (from.year !== to.year ? " " + from.year + lineStr + month[to.month - 1] + " " : from.month !== to.month ? lineStr + month[to.month - 1] : "") + " " + to.year;
      }
      return daysModel.value[0].year;
    });
    const dateArrow = computed(() => {
      const val = [$q.iconSet.datetime.arrowLeft, $q.iconSet.datetime.arrowRight];
      return $q.lang.rtl === true ? val.reverse() : val;
    });
    const computedFirstDayOfWeek = computed(() => props.firstDayOfWeek !== void 0 ? Number(props.firstDayOfWeek) : innerLocale.value.firstDayOfWeek);
    const daysOfWeek = computed(() => {
      const days2 = innerLocale.value.daysShort, first = computedFirstDayOfWeek.value;
      return first > 0 ? days2.slice(first, 7).concat(days2.slice(0, first)) : days2;
    });
    const daysInMonth = computed(() => {
      const date = viewModel.value;
      return props.calendar !== "persian" ? new Date(date.year, date.month, 0).getDate() : jalaaliMonthLength(date.year, date.month);
    });
    const evtColor = computed(() => typeof props.eventColor === "function" ? props.eventColor : () => props.eventColor);
    const minNav = computed(() => {
      if (props.navigationMinYearMonth === void 0) {
        return null;
      }
      const data = props.navigationMinYearMonth.split("/");
      return { year: parseInt(data[0], 10), month: parseInt(data[1], 10) };
    });
    const maxNav = computed(() => {
      if (props.navigationMaxYearMonth === void 0) {
        return null;
      }
      const data = props.navigationMaxYearMonth.split("/");
      return { year: parseInt(data[0], 10), month: parseInt(data[1], 10) };
    });
    const navBoundaries = computed(() => {
      const data = {
        month: { prev: true, next: true },
        year: { prev: true, next: true }
      };
      if (minNav.value !== null && minNav.value.year >= viewModel.value.year) {
        data.year.prev = false;
        if (minNav.value.year === viewModel.value.year && minNav.value.month >= viewModel.value.month) {
          data.month.prev = false;
        }
      }
      if (maxNav.value !== null && maxNav.value.year <= viewModel.value.year) {
        data.year.next = false;
        if (maxNav.value.year === viewModel.value.year && maxNav.value.month <= viewModel.value.month) {
          data.month.next = false;
        }
      }
      return data;
    });
    const daysMap = computed(() => {
      const map = {};
      daysModel.value.forEach((entry2) => {
        const hash = getMonthHash(entry2);
        if (map[hash] === void 0) {
          map[hash] = [];
        }
        map[hash].push(entry2.day);
      });
      return map;
    });
    const rangeMap = computed(() => {
      const map = {};
      rangeModel.value.forEach((entry2) => {
        const hashFrom = getMonthHash(entry2.from);
        const hashTo = getMonthHash(entry2.to);
        if (map[hashFrom] === void 0) {
          map[hashFrom] = [];
        }
        map[hashFrom].push({
          from: entry2.from.day,
          to: hashFrom === hashTo ? entry2.to.day : void 0,
          range: entry2
        });
        if (hashFrom < hashTo) {
          let hash;
          const { year: year2, month } = entry2.from;
          const cur = month < 12 ? { year: year2, month: month + 1 } : { year: year2 + 1, month: 1 };
          while ((hash = getMonthHash(cur)) <= hashTo) {
            if (map[hash] === void 0) {
              map[hash] = [];
            }
            map[hash].push({
              from: void 0,
              to: hash === hashTo ? entry2.to.day : void 0,
              range: entry2
            });
            cur.month++;
            if (cur.month > 12) {
              cur.year++;
              cur.month = 1;
            }
          }
        }
      });
      return map;
    });
    const rangeView = computed(() => {
      if (editRange.value === null) {
        return;
      }
      const { init, initHash, final, finalHash } = editRange.value;
      const [from, to] = initHash <= finalHash ? [init, final] : [final, init];
      const fromHash = getMonthHash(from);
      const toHash = getMonthHash(to);
      if (fromHash !== viewMonthHash.value && toHash !== viewMonthHash.value) {
        return;
      }
      const view2 = {};
      if (fromHash === viewMonthHash.value) {
        view2.from = from.day;
        view2.includeFrom = true;
      } else {
        view2.from = 1;
      }
      if (toHash === viewMonthHash.value) {
        view2.to = to.day;
        view2.includeTo = true;
      } else {
        view2.to = daysInMonth.value;
      }
      return view2;
    });
    const viewMonthHash = computed(() => getMonthHash(viewModel.value));
    const selectionDaysMap = computed(() => {
      const map = {};
      if (props.options === void 0) {
        for (let i = 1; i <= daysInMonth.value; i++) {
          map[i] = true;
        }
        return map;
      }
      const fn = typeof props.options === "function" ? props.options : (date) => props.options.includes(date);
      for (let i = 1; i <= daysInMonth.value; i++) {
        const dayHash = viewMonthHash.value + "/" + pad(i);
        map[i] = fn(dayHash);
      }
      return map;
    });
    const eventDaysMap = computed(() => {
      const map = {};
      if (props.events === void 0) {
        for (let i = 1; i <= daysInMonth.value; i++) {
          map[i] = false;
        }
      } else {
        const fn = typeof props.events === "function" ? props.events : (date) => props.events.includes(date);
        for (let i = 1; i <= daysInMonth.value; i++) {
          const dayHash = viewMonthHash.value + "/" + pad(i);
          map[i] = fn(dayHash) === true && evtColor.value(dayHash);
        }
      }
      return map;
    });
    const viewDays = computed(() => {
      let date, endDay;
      const { year: year2, month } = viewModel.value;
      if (props.calendar !== "persian") {
        date = new Date(year2, month - 1, 1);
        endDay = new Date(year2, month - 1, 0).getDate();
      } else {
        const gDate = toGregorian(year2, month, 1);
        date = new Date(gDate.gy, gDate.gm - 1, gDate.gd);
        let prevJM = month - 1;
        let prevJY = year2;
        if (prevJM === 0) {
          prevJM = 12;
          prevJY--;
        }
        endDay = jalaaliMonthLength(prevJY, prevJM);
      }
      return {
        days: date.getDay() - computedFirstDayOfWeek.value - 1,
        endDay
      };
    });
    const days = computed(() => {
      const res = [];
      const { days: days2, endDay } = viewDays.value;
      const len = days2 < 0 ? days2 + 7 : days2;
      if (len < 6) {
        for (let i = endDay - len; i <= endDay; i++) {
          res.push({ i, fill: true });
        }
      }
      const index2 = res.length;
      for (let i = 1; i <= daysInMonth.value; i++) {
        const day = { i, event: eventDaysMap.value[i], classes: [] };
        if (selectionDaysMap.value[i] === true) {
          day.in = true;
          day.flat = true;
        }
        res.push(day);
      }
      if (daysMap.value[viewMonthHash.value] !== void 0) {
        daysMap.value[viewMonthHash.value].forEach((day) => {
          const i = index2 + day - 1;
          Object.assign(res[i], {
            selected: true,
            unelevated: true,
            flat: false,
            color: computedColor.value,
            textColor: computedTextColor.value
          });
        });
      }
      if (rangeMap.value[viewMonthHash.value] !== void 0) {
        rangeMap.value[viewMonthHash.value].forEach((entry2) => {
          if (entry2.from !== void 0) {
            const from = index2 + entry2.from - 1;
            const to = index2 + (entry2.to || daysInMonth.value) - 1;
            for (let day = from; day <= to; day++) {
              Object.assign(res[day], {
                range: entry2.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
            Object.assign(res[from], {
              rangeFrom: true,
              flat: false
            });
            entry2.to !== void 0 && Object.assign(res[to], {
              rangeTo: true,
              flat: false
            });
          } else if (entry2.to !== void 0) {
            const to = index2 + entry2.to - 1;
            for (let day = index2; day <= to; day++) {
              Object.assign(res[day], {
                range: entry2.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
            Object.assign(res[to], {
              flat: false,
              rangeTo: true
            });
          } else {
            const to = index2 + daysInMonth.value - 1;
            for (let day = index2; day <= to; day++) {
              Object.assign(res[day], {
                range: entry2.range,
                unelevated: true,
                color: computedColor.value,
                textColor: computedTextColor.value
              });
            }
          }
        });
      }
      if (rangeView.value !== void 0) {
        const from = index2 + rangeView.value.from - 1;
        const to = index2 + rangeView.value.to - 1;
        for (let day = from; day <= to; day++) {
          res[day].color = computedColor.value;
          res[day].editRange = true;
        }
        if (rangeView.value.includeFrom === true) {
          res[from].editRangeFrom = true;
        }
        if (rangeView.value.includeTo === true) {
          res[to].editRangeTo = true;
        }
      }
      if (viewModel.value.year === today.value.year && viewModel.value.month === today.value.month) {
        res[index2 + today.value.day - 1].today = true;
      }
      const left = res.length % 7;
      if (left > 0) {
        const afterDays = 7 - left;
        for (let i = 1; i <= afterDays; i++) {
          res.push({ i, fill: true });
        }
      }
      res.forEach((day) => {
        let cls = "q-date__calendar-item ";
        if (day.fill === true) {
          cls += "q-date__calendar-item--fill";
        } else {
          cls += `q-date__calendar-item--${day.in === true ? "in" : "out"}`;
          if (day.range !== void 0) {
            cls += ` q-date__range${day.rangeTo === true ? "-to" : day.rangeFrom === true ? "-from" : ""}`;
          }
          if (day.editRange === true) {
            cls += ` q-date__edit-range${day.editRangeFrom === true ? "-from" : ""}${day.editRangeTo === true ? "-to" : ""}`;
          }
          if (day.range !== void 0 || day.editRange === true) {
            cls += ` text-${day.color}`;
          }
        }
        day.classes = cls;
      });
      return res;
    });
    const attributes = computed(() => props.disable === true ? { "aria-disabled": "true" } : props.readonly === true ? { "aria-readonly": "true" } : {});
    watch(() => props.modelValue, (v) => {
      if (lastEmitValue === v) {
        lastEmitValue = 0;
      } else {
        const { year: year2, month } = getViewModel(innerMask.value, innerLocale.value);
        updateViewModel(year2, month);
      }
    });
    watch(view, () => {
      blurTargetRef.value !== null && blurTargetRef.value.focus();
    });
    watch(() => viewModel.value.year, (year2) => {
      emit("navigation", { year: year2, month: viewModel.value.month });
    });
    watch(() => viewModel.value.month, (month) => {
      emit("navigation", { year: viewModel.value.year, month });
    });
    watch(mask, (val) => {
      updateValue(val, innerLocale.value, "mask");
      innerMask.value = val;
    });
    watch(locale, (val) => {
      updateValue(innerMask.value, val, "locale");
      innerLocale.value = val;
    });
    function setToday() {
      const date = today.value;
      const month = daysMap.value[getMonthHash(date)];
      if (month === void 0 || month.includes(date.day) === false) {
        addToModel(date);
      }
      setCalendarTo(date.year, date.month);
    }
    function setView(viewMode) {
      if (viewIsValid(viewMode) === true) {
        view.value = viewMode;
      }
    }
    function offsetCalendar(type, descending) {
      if (["month", "year"].includes(type)) {
        const fn = type === "month" ? goToMonth : goToYear;
        fn(descending === true ? -1 : 1);
      }
    }
    function setCalendarTo(year2, month) {
      view.value = "Calendar";
      updateViewModel(year2, month);
    }
    function setEditingRange(from, to) {
      if (props.range === false || !from) {
        editRange.value = null;
        return;
      }
      const init = Object.assign({ ...viewModel.value }, from);
      const final = to !== void 0 ? Object.assign({ ...viewModel.value }, to) : init;
      editRange.value = {
        init,
        initHash: getDayHash(init),
        final,
        finalHash: getDayHash(final)
      };
      setCalendarTo(init.year, init.month);
    }
    function getMask() {
      return props.calendar === "persian" ? "YYYY/MM/DD" : props.mask;
    }
    function decodeString(date, mask2, locale2) {
      return __splitDate(
        date,
        mask2,
        locale2,
        props.calendar,
        {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        }
      );
    }
    function getViewModel(mask2, locale2) {
      const model = Array.isArray(props.modelValue) === true ? props.modelValue : props.modelValue ? [props.modelValue] : [];
      if (model.length === 0) {
        return getDefaultViewModel();
      }
      const target = model[model.length - 1];
      const decoded = decodeString(
        target.from !== void 0 ? target.from : target,
        mask2,
        locale2
      );
      return decoded.dateHash === null ? getDefaultViewModel() : decoded;
    }
    function getDefaultViewModel() {
      let year2, month;
      if (props.defaultYearMonth !== void 0) {
        const d = props.defaultYearMonth.split("/");
        year2 = parseInt(d[0], 10);
        month = parseInt(d[1], 10);
      } else {
        const d = today.value !== void 0 ? today.value : getCurrentDate();
        year2 = d.year;
        month = d.month;
      }
      return {
        year: year2,
        month,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        dateHash: year2 + "/" + pad(month) + "/01"
      };
    }
    function goToMonth(offset) {
      let year2 = viewModel.value.year;
      let month = Number(viewModel.value.month) + offset;
      if (month === 13) {
        month = 1;
        year2++;
      } else if (month === 0) {
        month = 12;
        year2--;
      }
      updateViewModel(year2, month);
      isImmediate.value === true && emitImmediately("month");
    }
    function goToYear(offset) {
      const year2 = Number(viewModel.value.year) + offset;
      updateViewModel(year2, viewModel.value.month);
      isImmediate.value === true && emitImmediately("year");
    }
    function setYear(year2) {
      updateViewModel(year2, viewModel.value.month);
      view.value = props.defaultView === "Years" ? "Months" : "Calendar";
      isImmediate.value === true && emitImmediately("year");
    }
    function setMonth(month) {
      updateViewModel(viewModel.value.year, month);
      view.value = "Calendar";
      isImmediate.value === true && emitImmediately("month");
    }
    function toggleDate(date, monthHash) {
      const month = daysMap.value[monthHash];
      const fn = month !== void 0 && month.includes(date.day) === true ? removeFromModel : addToModel;
      fn(date);
    }
    function getShortDate(date) {
      return { year: date.year, month: date.month, day: date.day };
    }
    function updateViewModel(year2, month) {
      if (minNav.value !== null && year2 <= minNav.value.year) {
        year2 = minNav.value.year;
        if (month < minNav.value.month) {
          month = minNav.value.month;
        }
      }
      if (maxNav.value !== null && year2 >= maxNav.value.year) {
        year2 = maxNav.value.year;
        if (month > maxNav.value.month) {
          month = maxNav.value.month;
        }
      }
      const newHash = year2 + "/" + pad(month) + "/01";
      if (newHash !== viewModel.value.dateHash) {
        monthDirection.value = viewModel.value.dateHash < newHash === ($q.lang.rtl !== true) ? "left" : "right";
        if (year2 !== viewModel.value.year) {
          yearDirection.value = monthDirection.value;
        }
        nextTick(() => {
          startYear.value = year2 - year2 % yearsInterval - (year2 < 0 ? yearsInterval : 0);
          Object.assign(viewModel.value, {
            year: year2,
            month,
            day: 1,
            dateHash: newHash
          });
        });
      }
    }
    function emitValue(val, action, date) {
      const value = val !== null && val.length === 1 && props.multiple === false ? val[0] : val;
      lastEmitValue = value;
      const { reason, details } = getEmitParams(action, date);
      emit("update:modelValue", value, reason, details);
    }
    function emitImmediately(reason) {
      const date = daysModel.value[0] !== void 0 && daysModel.value[0].dateHash !== null ? { ...daysModel.value[0] } : { ...viewModel.value };
      nextTick(() => {
        date.year = viewModel.value.year;
        date.month = viewModel.value.month;
        const maxDay = props.calendar !== "persian" ? new Date(date.year, date.month, 0).getDate() : jalaaliMonthLength(date.year, date.month);
        date.day = Math.min(Math.max(1, date.day), maxDay);
        const value = encodeEntry(date);
        lastEmitValue = value;
        const { details } = getEmitParams("", date);
        emit("update:modelValue", value, reason, details);
      });
    }
    function getEmitParams(action, date) {
      return date.from !== void 0 ? {
        reason: `${action}-range`,
        details: {
          ...getShortDate(date.target),
          from: getShortDate(date.from),
          to: getShortDate(date.to)
        }
      } : {
        reason: `${action}-day`,
        details: getShortDate(date)
      };
    }
    function encodeEntry(date, mask2, locale2) {
      return date.from !== void 0 ? { from: encodeObjectFn.value(date.from, mask2, locale2), to: encodeObjectFn.value(date.to, mask2, locale2) } : encodeObjectFn.value(date, mask2, locale2);
    }
    function addToModel(date) {
      let value;
      if (props.multiple === true) {
        if (date.from !== void 0) {
          const fromHash = getDayHash(date.from);
          const toHash = getDayHash(date.to);
          const days2 = daysModel.value.filter((day) => day.dateHash < fromHash || day.dateHash > toHash);
          const ranges = rangeModel.value.filter(({ from, to }) => to.dateHash < fromHash || from.dateHash > toHash);
          value = days2.concat(ranges).concat(date).map((entry2) => encodeEntry(entry2));
        } else {
          const model = normalizedModel.value.slice();
          model.push(encodeEntry(date));
          value = model;
        }
      } else {
        value = encodeEntry(date);
      }
      emitValue(value, "add", date);
    }
    function removeFromModel(date) {
      if (props.noUnset === true) {
        return;
      }
      let model = null;
      if (props.multiple === true && Array.isArray(props.modelValue) === true) {
        const val = encodeEntry(date);
        if (date.from !== void 0) {
          model = props.modelValue.filter(
            (date2) => date2.from !== void 0 ? date2.from !== val.from && date2.to !== val.to : true
          );
        } else {
          model = props.modelValue.filter((date2) => date2 !== val);
        }
        if (model.length === 0) {
          model = null;
        }
      }
      emitValue(model, "remove", date);
    }
    function updateValue(mask2, locale2, reason) {
      const model = daysModel.value.concat(rangeModel.value).map((entry2) => encodeEntry(entry2, mask2, locale2)).filter((entry2) => {
        return entry2.from !== void 0 ? entry2.from.dateHash !== null && entry2.to.dateHash !== null : entry2.dateHash !== null;
      });
      emit("update:modelValue", (props.multiple === true ? model : model[0]) || null, reason);
    }
    Object.assign(proxy, {
      setToday,
      setView,
      offsetCalendar,
      setCalendarTo,
      setEditingRange
    });
    function getHeader() {
      if (props.minimal === true) {
        return;
      }
      return h("div", {
        class: "q-date__header " + headerClass.value
      }, [
        h("div", {
          class: "relative-position"
        }, [
          h(Transition, {
            name: "q-transition--fade"
          }, () => h("div", {
            key: "h-yr-" + headerSubtitle.value,
            class: "q-date__header-subtitle q-date__header-link " + (view.value === "Years" ? "q-date__header-link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            ...getCache("vY", {
              onClick() {
                view.value = "Years";
              },
              onKeyup(e) {
                e.keyCode === 13 && (view.value = "Years");
              }
            })
          }, [headerSubtitle.value]))
        ]),
        h("div", {
          class: "q-date__header-title relative-position flex no-wrap"
        }, [
          h("div", {
            class: "relative-position col"
          }, [
            h(Transition, {
              name: "q-transition--fade"
            }, () => h("div", {
              key: "h-sub" + headerTitle.value,
              class: "q-date__header-title-label q-date__header-link " + (view.value === "Calendar" ? "q-date__header-link--active" : "cursor-pointer"),
              tabindex: tabindex.value,
              ...getCache("vC", {
                onClick() {
                  view.value = "Calendar";
                },
                onKeyup(e) {
                  e.keyCode === 13 && (view.value = "Calendar");
                }
              })
            }, [headerTitle.value]))
          ]),
          props.todayBtn === true ? h(QBtn, {
            class: "q-date__header-today self-start",
            icon: $q.iconSet.datetime.today,
            flat: true,
            size: "sm",
            round: true,
            tabindex: tabindex.value,
            onClick: setToday
          }) : null
        ])
      ]);
    }
    function getNavigation({ label, type, key, dir, goTo, boundaries, cls }) {
      return [
        h("div", {
          class: "row items-center q-date__arrow"
        }, [
          h(QBtn, {
            round: true,
            dense: true,
            size: "sm",
            flat: true,
            icon: dateArrow.value[0],
            tabindex: tabindex.value,
            disable: boundaries.prev === false,
            ...getCache("go-#" + type, { onClick() {
              goTo(-1);
            } })
          })
        ]),
        h("div", {
          class: "relative-position overflow-hidden flex flex-center" + cls
        }, [
          h(Transition, {
            name: "q-transition--jump-" + dir
          }, () => h("div", { key }, [
            h(QBtn, {
              flat: true,
              dense: true,
              noCaps: true,
              label,
              tabindex: tabindex.value,
              ...getCache("view#" + type, { onClick: () => {
                view.value = type;
              } })
            })
          ]))
        ]),
        h("div", {
          class: "row items-center q-date__arrow"
        }, [
          h(QBtn, {
            round: true,
            dense: true,
            size: "sm",
            flat: true,
            icon: dateArrow.value[1],
            tabindex: tabindex.value,
            disable: boundaries.next === false,
            ...getCache("go+#" + type, { onClick() {
              goTo(1);
            } })
          })
        ])
      ];
    }
    const renderViews = {
      Calendar: () => [
        h("div", {
          key: "calendar-view",
          class: "q-date__view q-date__calendar"
        }, [
          h("div", {
            class: "q-date__navigation row items-center no-wrap"
          }, getNavigation({
            label: innerLocale.value.months[viewModel.value.month - 1],
            type: "Months",
            key: viewModel.value.month,
            dir: monthDirection.value,
            goTo: goToMonth,
            boundaries: navBoundaries.value.month,
            cls: " col"
          }).concat(getNavigation({
            label: viewModel.value.year,
            type: "Years",
            key: viewModel.value.year,
            dir: yearDirection.value,
            goTo: goToYear,
            boundaries: navBoundaries.value.year,
            cls: ""
          }))),
          h("div", {
            class: "q-date__calendar-weekdays row items-center no-wrap"
          }, daysOfWeek.value.map((day) => h("div", { class: "q-date__calendar-item" }, [h("div", day)]))),
          h("div", {
            class: "q-date__calendar-days-container relative-position overflow-hidden"
          }, [
            h(Transition, {
              name: "q-transition--slide-" + monthDirection.value
            }, () => h("div", {
              key: viewMonthHash.value,
              class: "q-date__calendar-days fit"
            }, days.value.map((day) => h("div", { class: day.classes }, [
              day.in === true ? h(
                QBtn,
                {
                  class: day.today === true ? "q-date__today" : "",
                  dense: true,
                  flat: day.flat,
                  unelevated: day.unelevated,
                  color: day.color,
                  textColor: day.textColor,
                  label: day.i,
                  tabindex: tabindex.value,
                  ...getCache("day#" + day.i, {
                    onClick: () => {
                      onDayClick(day.i);
                    },
                    onMouseover: () => {
                      onDayMouseover(day.i);
                    }
                  })
                },
                day.event !== false ? () => h("div", { class: "q-date__event bg-" + day.event }) : null
              ) : h("div", "" + day.i)
            ]))))
          ])
        ])
      ],
      Months() {
        const currentYear = viewModel.value.year === today.value.year;
        const isDisabled = (month) => {
          return minNav.value !== null && viewModel.value.year === minNav.value.year && minNav.value.month > month || maxNav.value !== null && viewModel.value.year === maxNav.value.year && maxNav.value.month < month;
        };
        const content = innerLocale.value.monthsShort.map((month, i) => {
          const active = viewModel.value.month === i + 1;
          return h("div", {
            class: "q-date__months-item flex flex-center"
          }, [
            h(QBtn, {
              class: currentYear === true && today.value.month === i + 1 ? "q-date__today" : null,
              flat: active !== true,
              label: month,
              unelevated: active,
              color: active === true ? computedColor.value : null,
              textColor: active === true ? computedTextColor.value : null,
              tabindex: tabindex.value,
              disable: isDisabled(i + 1),
              ...getCache("month#" + i, { onClick: () => {
                setMonth(i + 1);
              } })
            })
          ]);
        });
        props.yearsInMonthView === true && content.unshift(
          h("div", { class: "row no-wrap full-width" }, [
            getNavigation({
              label: viewModel.value.year,
              type: "Years",
              key: viewModel.value.year,
              dir: yearDirection.value,
              goTo: goToYear,
              boundaries: navBoundaries.value.year,
              cls: " col"
            })
          ])
        );
        return h("div", {
          key: "months-view",
          class: "q-date__view q-date__months flex flex-center"
        }, content);
      },
      Years() {
        const start = startYear.value, stop2 = start + yearsInterval, years = [];
        const isDisabled = (year2) => {
          return minNav.value !== null && minNav.value.year > year2 || maxNav.value !== null && maxNav.value.year < year2;
        };
        for (let i = start; i <= stop2; i++) {
          const active = viewModel.value.year === i;
          years.push(
            h("div", {
              class: "q-date__years-item flex flex-center"
            }, [
              h(QBtn, {
                key: "yr" + i,
                class: today.value.year === i ? "q-date__today" : null,
                flat: !active,
                label: i,
                dense: true,
                unelevated: active,
                color: active === true ? computedColor.value : null,
                textColor: active === true ? computedTextColor.value : null,
                tabindex: tabindex.value,
                disable: isDisabled(i),
                ...getCache("yr#" + i, { onClick: () => {
                  setYear(i);
                } })
              })
            ])
          );
        }
        return h("div", {
          class: "q-date__view q-date__years flex flex-center"
        }, [
          h("div", {
            class: "col-auto"
          }, [
            h(QBtn, {
              round: true,
              dense: true,
              flat: true,
              icon: dateArrow.value[0],
              tabindex: tabindex.value,
              disable: isDisabled(start),
              ...getCache("y-", { onClick: () => {
                startYear.value -= yearsInterval;
              } })
            })
          ]),
          h("div", {
            class: "q-date__years-content col self-stretch row items-center"
          }, years),
          h("div", {
            class: "col-auto"
          }, [
            h(QBtn, {
              round: true,
              dense: true,
              flat: true,
              icon: dateArrow.value[1],
              tabindex: tabindex.value,
              disable: isDisabled(stop2),
              ...getCache("y+", { onClick: () => {
                startYear.value += yearsInterval;
              } })
            })
          ])
        ]);
      }
    };
    function onDayClick(dayIndex) {
      const day = { ...viewModel.value, day: dayIndex };
      if (props.range === false) {
        toggleDate(day, viewMonthHash.value);
        return;
      }
      if (editRange.value === null) {
        const dayProps = days.value.find((day2) => day2.fill !== true && day2.i === dayIndex);
        if (props.noUnset !== true && dayProps.range !== void 0) {
          removeFromModel({ target: day, from: dayProps.range.from, to: dayProps.range.to });
          return;
        }
        if (dayProps.selected === true) {
          removeFromModel(day);
          return;
        }
        const initHash = getDayHash(day);
        editRange.value = {
          init: day,
          initHash,
          final: day,
          finalHash: initHash
        };
        emit("range-start", getShortDate(day));
      } else {
        const initHash = editRange.value.initHash, finalHash = getDayHash(day), payload = initHash <= finalHash ? { from: editRange.value.init, to: day } : { from: day, to: editRange.value.init };
        editRange.value = null;
        addToModel(initHash === finalHash ? day : { target: day, ...payload });
        emit("range-end", {
          from: getShortDate(payload.from),
          to: getShortDate(payload.to)
        });
      }
    }
    function onDayMouseover(dayIndex) {
      if (editRange.value !== null) {
        const final = { ...viewModel.value, day: dayIndex };
        Object.assign(editRange.value, {
          final,
          finalHash: getDayHash(final)
        });
      }
    }
    return () => {
      const content = [
        h("div", {
          class: "q-date__content col relative-position"
        }, [
          h(Transition, {
            name: "q-transition--fade"
          }, renderViews[view.value])
        ])
      ];
      const def = hSlot(slots.default);
      def !== void 0 && content.push(
        h("div", { class: "q-date__actions" }, def)
      );
      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(content, "push");
      }
      return h("div", {
        class: classes.value,
        ...attributes.value
      }, [
        getHeader(),
        h("div", {
          ref: blurTargetRef,
          class: "q-date__main col column",
          tabindex: -1
        }, content)
      ]);
    };
  }
});
const TouchPan = createDirective(
  { name: "touch-pan", getSSRProps }
);
function getViewByModel(model, withSeconds) {
  if (model.hour !== null) {
    if (model.minute === null) {
      return "minute";
    } else if (withSeconds === true && model.second === null) {
      return "second";
    }
  }
  return "hour";
}
function getCurrentTime() {
  const d = new Date();
  return {
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
    millisecond: d.getMilliseconds()
  };
}
const __nuxt_component_7$1 = createComponent({
  name: "QTime",
  props: {
    ...useDarkProps,
    ...useFormProps,
    ...useDatetimeProps,
    mask: {
      default: null
    },
    format24h: {
      type: Boolean,
      default: null
    },
    defaultDate: {
      type: String,
      validator: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v)
    },
    options: Function,
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    withSeconds: Boolean,
    nowBtn: Boolean
  },
  emits: useDatetimeEmits,
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const { tabindex, headerClass, getLocale: getLocale2, getCurrentDate } = useDatetime(props, $q);
    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);
    let draggingClockRect, dragCache;
    const clockRef = ref(null);
    const mask = computed(() => getMask());
    const locale = computed(() => getLocale2());
    const defaultDateModel = computed(() => getDefaultDateModel());
    const model = __splitDate(
      props.modelValue,
      mask.value,
      locale.value,
      props.calendar,
      defaultDateModel.value
    );
    const view = ref(getViewByModel(model));
    const innerModel = ref(model);
    const isAM = ref(model.hour === null || model.hour < 12);
    const classes = computed(
      () => `q-time q-time--${props.landscape === true ? "landscape" : "portrait"}` + (isDark.value === true ? " q-time--dark q-dark" : "") + (props.disable === true ? " disabled" : props.readonly === true ? " q-time--readonly" : "") + (props.bordered === true ? " q-time--bordered" : "") + (props.square === true ? " q-time--square no-border-radius" : "") + (props.flat === true ? " q-time--flat no-shadow" : "")
    );
    const stringModel = computed(() => {
      const time = innerModel.value;
      return {
        hour: time.hour === null ? "--" : computedFormat24h.value === true ? pad(time.hour) : String(
          isAM.value === true ? time.hour === 0 ? 12 : time.hour : time.hour > 12 ? time.hour - 12 : time.hour
        ),
        minute: time.minute === null ? "--" : pad(time.minute),
        second: time.second === null ? "--" : pad(time.second)
      };
    });
    const computedFormat24h = computed(() => props.format24h !== null ? props.format24h : $q.lang.date.format24h);
    const pointerStyle = computed(() => {
      const forHour = view.value === "hour", divider = forHour === true ? 12 : 60, amount = innerModel.value[view.value], degrees = Math.round(amount * (360 / divider)) - 180;
      let transform = `rotate(${degrees}deg) translateX(-50%)`;
      if (forHour === true && computedFormat24h.value === true && innerModel.value.hour >= 12) {
        transform += " scale(.7)";
      }
      return { transform };
    });
    const minLink = computed(() => innerModel.value.hour !== null);
    const secLink = computed(() => minLink.value === true && innerModel.value.minute !== null);
    const hourInSelection = computed(() => props.hourOptions !== void 0 ? (val) => props.hourOptions.includes(val) : props.options !== void 0 ? (val) => props.options(val, null, null) : null);
    const minuteInSelection = computed(() => props.minuteOptions !== void 0 ? (val) => props.minuteOptions.includes(val) : props.options !== void 0 ? (val) => props.options(innerModel.value.hour, val, null) : null);
    const secondInSelection = computed(() => props.secondOptions !== void 0 ? (val) => props.secondOptions.includes(val) : props.options !== void 0 ? (val) => props.options(innerModel.value.hour, innerModel.value.minute, val) : null);
    const validHours = computed(() => {
      if (hourInSelection.value === null) {
        return null;
      }
      const am = getValidValues(0, 11, hourInSelection.value);
      const pm = getValidValues(12, 11, hourInSelection.value);
      return { am, pm, values: am.values.concat(pm.values) };
    });
    const validMinutes = computed(() => minuteInSelection.value !== null ? getValidValues(0, 59, minuteInSelection.value) : null);
    const validSeconds = computed(() => secondInSelection.value !== null ? getValidValues(0, 59, secondInSelection.value) : null);
    const viewValidOptions = computed(() => {
      switch (view.value) {
        case "hour":
          return validHours.value;
        case "minute":
          return validMinutes.value;
        case "second":
          return validSeconds.value;
      }
    });
    const positions = computed(() => {
      let start, end, offset = 0, step = 1;
      const values = viewValidOptions.value !== null ? viewValidOptions.value.values : void 0;
      if (view.value === "hour") {
        if (computedFormat24h.value === true) {
          start = 0;
          end = 23;
        } else {
          start = 0;
          end = 11;
          if (isAM.value === false) {
            offset = 12;
          }
        }
      } else {
        start = 0;
        end = 55;
        step = 5;
      }
      const pos = [];
      for (let val = start, index2 = start; val <= end; val += step, index2++) {
        const actualVal = val + offset, disable = values !== void 0 && values.includes(actualVal) === false, label = view.value === "hour" && val === 0 ? computedFormat24h.value === true ? "00" : "12" : val;
        pos.push({ val: actualVal, index: index2, disable, label });
      }
      return pos;
    });
    const clockDirectives = computed(() => {
      return [[
        TouchPan,
        onPan,
        void 0,
        {
          stop: true,
          prevent: true,
          mouse: true
        }
      ]];
    });
    watch(() => props.modelValue, (v) => {
      const model2 = __splitDate(
        v,
        mask.value,
        locale.value,
        props.calendar,
        defaultDateModel.value
      );
      if (model2.dateHash !== innerModel.value.dateHash || model2.timeHash !== innerModel.value.timeHash) {
        innerModel.value = model2;
        if (model2.hour === null) {
          view.value = "hour";
        } else {
          isAM.value = model2.hour < 12;
        }
      }
    });
    watch([mask, locale], () => {
      nextTick(() => {
        updateValue();
      });
    });
    function setNow() {
      const date = {
        ...getCurrentDate(),
        ...getCurrentTime()
      };
      updateValue(date);
      Object.assign(innerModel.value, date);
      view.value = "hour";
    }
    function getValidValues(start, count, testFn) {
      const values = Array.apply(null, { length: count + 1 }).map((_, index2) => {
        const i = index2 + start;
        return {
          index: i,
          val: testFn(i) === true
        };
      }).filter((v) => v.val === true).map((v) => v.index);
      return {
        min: values[0],
        max: values[values.length - 1],
        values,
        threshold: count + 1
      };
    }
    function getWheelDist(a, b, threshold) {
      const diff = Math.abs(a - b);
      return Math.min(diff, threshold - diff);
    }
    function getNormalizedClockValue(val, { min, max, values, threshold }) {
      if (val === min) {
        return min;
      }
      if (val < min || val > max) {
        return getWheelDist(val, min, threshold) <= getWheelDist(val, max, threshold) ? min : max;
      }
      const index2 = values.findIndex((v) => val <= v), before = values[index2 - 1], after = values[index2];
      return val - before <= after - val ? before : after;
    }
    function getMask() {
      return props.calendar !== "persian" && props.mask !== null ? props.mask : `HH:mm${props.withSeconds === true ? ":ss" : ""}`;
    }
    function getDefaultDateModel() {
      if (typeof props.defaultDate !== "string") {
        const date = getCurrentDate(true);
        date.dateHash = getDayHash(date);
        return date;
      }
      return __splitDate(props.defaultDate, "YYYY/MM/DD", void 0, props.calendar);
    }
    function shouldAbortInteraction() {
      return vm.isDeactivated === true || vm.isUnmounted === true || viewValidOptions.value !== null && (viewValidOptions.value.values.length === 0 || view.value === "hour" && computedFormat24h.value !== true && validHours.value[isAM.value === true ? "am" : "pm"].values.length === 0);
    }
    function getClockRect() {
      const clock = clockRef.value, { top, left, width } = clock.getBoundingClientRect(), dist = width / 2;
      return {
        top: top + dist,
        left: left + dist,
        dist: dist * 0.7
      };
    }
    function onPan(event) {
      if (shouldAbortInteraction() === true) {
        return;
      }
      if (event.isFirst === true) {
        draggingClockRect = getClockRect();
        dragCache = updateClock(event.evt, draggingClockRect);
        return;
      }
      dragCache = updateClock(event.evt, draggingClockRect, dragCache);
      if (event.isFinal === true) {
        draggingClockRect = false;
        dragCache = null;
        goToNextView();
      }
    }
    function goToNextView() {
      if (view.value === "hour") {
        view.value = "minute";
      } else if (props.withSeconds && view.value === "minute") {
        view.value = "second";
      }
    }
    function updateClock(evt, clockRect, cacheVal) {
      const pos = position(evt), height = Math.abs(pos.top - clockRect.top), distance = Math.sqrt(
        Math.pow(Math.abs(pos.top - clockRect.top), 2) + Math.pow(Math.abs(pos.left - clockRect.left), 2)
      );
      let val, angle = Math.asin(height / distance) * (180 / Math.PI);
      if (pos.top < clockRect.top) {
        angle = clockRect.left < pos.left ? 90 - angle : 270 + angle;
      } else {
        angle = clockRect.left < pos.left ? angle + 90 : 270 - angle;
      }
      if (view.value === "hour") {
        val = angle / 30;
        if (validHours.value !== null) {
          const am = computedFormat24h.value !== true ? isAM.value === true : validHours.value.am.values.length > 0 && validHours.value.pm.values.length > 0 ? distance >= clockRect.dist : validHours.value.am.values.length > 0;
          val = getNormalizedClockValue(
            val + (am === true ? 0 : 12),
            validHours.value[am === true ? "am" : "pm"]
          );
        } else {
          val = Math.round(val);
          if (computedFormat24h.value === true) {
            if (distance < clockRect.dist) {
              if (val < 12) {
                val += 12;
              }
            } else if (val === 12) {
              val = 0;
            }
          } else if (isAM.value === true && val === 12) {
            val = 0;
          } else if (isAM.value === false && val !== 12) {
            val += 12;
          }
        }
        if (computedFormat24h.value === true) {
          isAM.value = val < 12;
        }
      } else {
        val = Math.round(angle / 6) % 60;
        if (view.value === "minute" && validMinutes.value !== null) {
          val = getNormalizedClockValue(val, validMinutes.value);
        } else if (view.value === "second" && validSeconds.value !== null) {
          val = getNormalizedClockValue(val, validSeconds.value);
        }
      }
      if (cacheVal !== val) {
        setModel[view.value](val);
      }
      return val;
    }
    const setView = {
      hour() {
        view.value = "hour";
      },
      minute() {
        view.value = "minute";
      },
      second() {
        view.value = "second";
      }
    };
    function setAmOnKey(e) {
      e.keyCode === 13 && setAm();
    }
    function setPmOnKey(e) {
      e.keyCode === 13 && setPm();
    }
    function onClick(evt) {
      if (shouldAbortInteraction() !== true) {
        if ($q.platform.is.desktop !== true) {
          updateClock(evt, getClockRect());
        }
        goToNextView();
      }
    }
    function onMousedown(evt) {
      if (shouldAbortInteraction() !== true) {
        updateClock(evt, getClockRect());
      }
    }
    function onKeyupHour(e) {
      if (e.keyCode === 13) {
        view.value = "hour";
      } else if ([37, 39].includes(e.keyCode)) {
        const payload = e.keyCode === 37 ? -1 : 1;
        if (validHours.value !== null) {
          const values = computedFormat24h.value === true ? validHours.value.values : validHours.value[isAM.value === true ? "am" : "pm"].values;
          if (values.length === 0) {
            return;
          }
          if (innerModel.value.hour === null) {
            setHour(values[0]);
          } else {
            const index2 = (values.length + values.indexOf(innerModel.value.hour) + payload) % values.length;
            setHour(values[index2]);
          }
        } else {
          const wrap = computedFormat24h.value === true ? 24 : 12, offset = computedFormat24h.value !== true && isAM.value === false ? 12 : 0, val = innerModel.value.hour === null ? -payload : innerModel.value.hour;
          setHour(offset + (24 + val + payload) % wrap);
        }
      }
    }
    function onKeyupMinute(e) {
      if (e.keyCode === 13) {
        view.value = "minute";
      } else if ([37, 39].includes(e.keyCode)) {
        const payload = e.keyCode === 37 ? -1 : 1;
        if (validMinutes.value !== null) {
          const values = validMinutes.value.values;
          if (values.length === 0) {
            return;
          }
          if (innerModel.value.minute === null) {
            setMinute(values[0]);
          } else {
            const index2 = (values.length + values.indexOf(innerModel.value.minute) + payload) % values.length;
            setMinute(values[index2]);
          }
        } else {
          const val = innerModel.value.minute === null ? -payload : innerModel.value.minute;
          setMinute((60 + val + payload) % 60);
        }
      }
    }
    function onKeyupSecond(e) {
      if (e.keyCode === 13) {
        view.value = "second";
      } else if ([37, 39].includes(e.keyCode)) {
        const payload = e.keyCode === 37 ? -1 : 1;
        if (validSeconds.value !== null) {
          const values = validSeconds.value.values;
          if (values.length === 0) {
            return;
          }
          if (innerModel.value.seconds === null) {
            setSecond(values[0]);
          } else {
            const index2 = (values.length + values.indexOf(innerModel.value.second) + payload) % values.length;
            setSecond(values[index2]);
          }
        } else {
          const val = innerModel.value.second === null ? -payload : innerModel.value.second;
          setSecond((60 + val + payload) % 60);
        }
      }
    }
    function setHour(hour) {
      if (innerModel.value.hour !== hour) {
        innerModel.value.hour = hour;
        verifyAndUpdate();
      }
    }
    function setMinute(minute) {
      if (innerModel.value.minute !== minute) {
        innerModel.value.minute = minute;
        verifyAndUpdate();
      }
    }
    function setSecond(second) {
      if (innerModel.value.second !== second) {
        innerModel.value.second = second;
        verifyAndUpdate();
      }
    }
    const setModel = {
      hour: setHour,
      minute: setMinute,
      second: setSecond
    };
    function setAm() {
      if (isAM.value === false) {
        isAM.value = true;
        if (innerModel.value.hour !== null) {
          innerModel.value.hour -= 12;
          verifyAndUpdate();
        }
      }
    }
    function setPm() {
      if (isAM.value === true) {
        isAM.value = false;
        if (innerModel.value.hour !== null) {
          innerModel.value.hour += 12;
          verifyAndUpdate();
        }
      }
    }
    function verifyAndUpdate() {
      if (hourInSelection.value !== null && hourInSelection.value(innerModel.value.hour) !== true) {
        innerModel.value = __splitDate();
        view.value = "hour";
        return;
      }
      if (minuteInSelection.value !== null && minuteInSelection.value(innerModel.value.minute) !== true) {
        innerModel.value.minute = null;
        innerModel.value.second = null;
        view.value = "minute";
        return;
      }
      if (props.withSeconds === true && secondInSelection.value !== null && secondInSelection.value(innerModel.value.second) !== true) {
        innerModel.value.second = null;
        view.value = "second";
        return;
      }
      if (innerModel.value.hour === null || innerModel.value.minute === null || props.withSeconds === true && innerModel.value.second === null) {
        return;
      }
      updateValue();
    }
    function updateValue(obj) {
      const date = Object.assign({ ...innerModel.value }, obj);
      const val = props.calendar === "persian" ? pad(date.hour) + ":" + pad(date.minute) + (props.withSeconds === true ? ":" + pad(date.second) : "") : formatDate(
        new Date(
          date.year,
          date.month === null ? null : date.month - 1,
          date.day,
          date.hour,
          date.minute,
          date.second,
          date.millisecond
        ),
        mask.value,
        locale.value,
        date.year,
        date.timezoneOffset
      );
      date.changed = val !== props.modelValue;
      emit("update:modelValue", val, date);
    }
    const vm = getCurrentInstance();
    Object.assign(vm.proxy, { setNow });
    function getHeader() {
      const label = [
        h("div", {
          class: "q-time__link " + (view.value === "hour" ? "q-time__link--active" : "cursor-pointer"),
          tabindex: tabindex.value,
          onClick: setView.hour,
          onKeyup: onKeyupHour
        }, stringModel.value.hour),
        h("div", ":"),
        h(
          "div",
          minLink.value === true ? {
            class: "q-time__link " + (view.value === "minute" ? "q-time__link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            onKeyup: onKeyupMinute,
            onClick: setView.minute
          } : { class: "q-time__link" },
          stringModel.value.minute
        )
      ];
      if (props.withSeconds === true) {
        label.push(
          h("div", ":"),
          h(
            "div",
            secLink.value === true ? {
              class: "q-time__link " + (view.value === "second" ? "q-time__link--active" : "cursor-pointer"),
              tabindex: tabindex.value,
              onKeyup: onKeyupSecond,
              onClick: setView.second
            } : { class: "q-time__link" },
            stringModel.value.second
          )
        );
      }
      const child = [
        h("div", {
          class: "q-time__header-label row items-center no-wrap",
          dir: "ltr"
        }, label)
      ];
      computedFormat24h.value === false && child.push(
        h("div", {
          class: "q-time__header-ampm column items-between no-wrap"
        }, [
          h("div", {
            class: "q-time__link " + (isAM.value === true ? "q-time__link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            onClick: setAm,
            onKeyup: setAmOnKey
          }, "AM"),
          h("div", {
            class: "q-time__link " + (isAM.value !== true ? "q-time__link--active" : "cursor-pointer"),
            tabindex: tabindex.value,
            onClick: setPm,
            onKeyup: setPmOnKey
          }, "PM")
        ])
      );
      return h("div", {
        class: "q-time__header flex flex-center no-wrap " + headerClass.value
      }, child);
    }
    function getClock() {
      const current = innerModel.value[view.value];
      return h("div", {
        class: "q-time__content col relative-position"
      }, [
        h(Transition, {
          name: "q-transition--scale"
        }, () => h("div", {
          key: "clock" + view.value,
          class: "q-time__container-parent absolute-full"
        }, [
          h("div", {
            ref: clockRef,
            class: "q-time__container-child fit overflow-hidden"
          }, [
            withDirectives(
              h("div", {
                class: "q-time__clock cursor-pointer non-selectable",
                onClick,
                onMousedown
              }, [
                h("div", { class: "q-time__clock-circle fit" }, [
                  h("div", {
                    class: "q-time__clock-pointer" + (innerModel.value[view.value] === null ? " hidden" : props.color !== void 0 ? ` text-${props.color}` : ""),
                    style: pointerStyle.value
                  }),
                  positions.value.map((pos) => h("div", {
                    class: `q-time__clock-position row flex-center q-time__clock-pos-${pos.index}` + (pos.val === current ? " q-time__clock-position--active " + headerClass.value : pos.disable === true ? " q-time__clock-position--disable" : "")
                  }, [h("span", pos.label)]))
                ])
              ]),
              clockDirectives.value
            )
          ])
        ])),
        props.nowBtn === true ? h(QBtn, {
          class: "q-time__now-button absolute",
          icon: $q.iconSet.datetime.now,
          unelevated: true,
          size: "sm",
          round: true,
          color: props.color,
          textColor: props.textColor,
          tabindex: tabindex.value,
          onClick: setNow
        }) : null
      ]);
    }
    return () => {
      const child = [getClock()];
      const def = hSlot(slots.default);
      def !== void 0 && child.push(
        h("div", { class: "q-time__actions" }, def)
      );
      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(child, "push");
      }
      return h("div", {
        class: classes.value,
        tabindex: -1
      }, [
        getHeader(),
        h("div", { class: "q-time__main col overflow-auto" }, child)
      ]);
    };
  }
});
const QField = createComponent({
  name: "QField",
  inheritAttrs: false,
  props: useFieldProps,
  emits: useFieldEmits,
  setup() {
    return useField(useFieldState());
  }
});
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null)
    );
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 });
    function onKeyup2(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(
        h("div", { class: "q-focus-helper" })
      );
      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--left",
          name: leftIcon.value
        })
      );
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(
        h("div", {
          class: "q-chip__content col row no-wrap items-center q-anchor--skip"
        }, hMergeSlotSafely(slots.default, label))
      );
      props.iconRight && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--right",
          name: props.iconRight
        })
      );
      props.removable === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--remove cursor-pointer",
          name: removeIcon.value,
          ...attributes.value,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );
      return child;
    }
    return () => {
      if (props.modelValue === false) {
        return;
      }
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(
        data,
        attributes.value,
        { onClick, onKeyup: onKeyup2 }
      );
      return hDir(
        "div",
        data,
        getContent(),
        "ripple",
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]]
      );
    };
  }
});
const QItem = createComponent({
  name: "QItem",
  props: {
    ...useDarkProps,
    ...useRouterLinkProps,
    tag: {
      type: String,
      default: "div"
    },
    active: {
      type: Boolean,
      default: null
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean
  },
  emits: ["click", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const { hasRouterLink, hasLink, linkProps, linkClass, linkTag, navigateToRouterLink } = useRouterLink();
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    const isActionable = computed(
      () => props.clickable === true || hasLink.value === true || props.tag === "label"
    );
    const isClickable = computed(
      () => props.disable !== true && isActionable.value === true
    );
    const classes = computed(
      () => "q-item q-item-type row no-wrap" + (props.dense === true ? " q-item--dense" : "") + (isDark.value === true ? " q-item--dark" : "") + (hasLink.value === true && props.active === null ? linkClass.value : props.active === true ? `${props.activeClass !== void 0 ? ` ${props.activeClass}` : ""} q-item--active` : "") + (props.disable === true ? " disabled" : "") + (isClickable.value === true ? " q-item--clickable q-link cursor-pointer " + (props.manualFocus === true ? "q-manual-focusable" : "q-focusable q-hoverable") + (props.focused === true ? " q-manual-focusable--focused" : "") : "")
    );
    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: 16 + props.insetLevel * 56 + "px"
      };
    });
    function onClick(e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          } else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }
        hasRouterLink.value === true && navigateToRouterLink(e);
        emit("click", e);
      }
    }
    function onKeyup2(e) {
      if (isClickable.value === true && isKeyCode(e, 13) === true) {
        stopAndPrevent(e);
        e.qKeyEvent = true;
        const evt = new MouseEvent("click", e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }
      emit("keyup", e);
    }
    function getContent() {
      const child = hUniqueSlot(slots.default, []);
      isClickable.value === true && child.unshift(
        h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef })
      );
      return child;
    }
    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        onClick,
        onKeyup: onKeyup2
      };
      if (isClickable.value === true) {
        data.tabindex = props.tabindex || "0";
        Object.assign(data, linkProps.value);
      } else if (isActionable.value === true) {
        data["aria-disabled"] = "true";
      }
      return h(
        linkTag.value,
        data,
        getContent()
      );
    };
  }
});
const QItemSection = createComponent({
  name: "QItemSection",
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-item__section column q-item__section--${props.avatar === true || props.side === true || props.thumbnail === true ? "side" : "main"}` + (props.top === true ? " q-item__section--top justify-start" : " justify-center") + (props.avatar === true ? " q-item__section--avatar" : "") + (props.thumbnail === true ? " q-item__section--thumbnail" : "") + (props.noWrap === true ? " q-item__section--nowrap" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const __nuxt_component_5 = createComponent({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));
    const classes = computed(
      () => "q-item__label" + (props.overline === true ? " q-item__label--overline text-overline" : "") + (props.caption === true ? " q-item__label--caption text-caption" : "") + (props.header === true ? " q-item__label--header" : "") + (parsedLines.value === 1 ? " ellipsis" : "")
    );
    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1 ? {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": parsedLines.value
      } : null;
    });
    return () => h("div", {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default));
  }
});
const aggBucketSize = 1e3;
const scrollToEdges = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
];
const filterProto = Array.prototype.filter;
function sumFn(acc, h2) {
  return acc + h2;
}
function getScrollDetails(parent, child, beforeRef, afterRef, horizontal, rtl, stickyStart, stickyEnd) {
  const parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent, propElSize = horizontal === true ? "offsetWidth" : "offsetHeight", details = {
    scrollStart: 0,
    scrollViewSize: -stickyStart - stickyEnd,
    scrollMaxSize: 0,
    offsetStart: -stickyStart,
    offsetEnd: -stickyEnd
  };
  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
      details.scrollViewSize += document.documentElement.clientWidth;
    } else {
      details.scrollStart = parentCalc.scrollLeft;
      details.scrollViewSize += parentCalc.clientWidth;
    }
    details.scrollMaxSize = parentCalc.scrollWidth;
    if (rtl === true) {
      details.scrollStart = 0 - details.scrollStart;
    }
  } else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
      details.scrollViewSize += document.documentElement.clientHeight;
    } else {
      details.scrollStart = parentCalc.scrollTop;
      details.scrollViewSize += parentCalc.clientHeight;
    }
    details.scrollMaxSize = parentCalc.scrollHeight;
  }
  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetStart += el[propElSize];
      }
    }
  }
  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetEnd += el[propElSize];
      }
    }
  }
  if (child !== parent) {
    const parentRect = parentCalc.getBoundingClientRect(), childRect = child.getBoundingClientRect();
    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left;
      details.offsetEnd -= childRect.width;
    } else {
      details.offsetStart += childRect.top - parentRect.top;
      details.offsetEnd -= childRect.height;
    }
    if (parent !== window) {
      details.offsetStart += details.scrollStart;
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart;
  }
  return details;
}
function setScroll(parent, scroll, horizontal, rtl) {
  if (scroll === "end") {
    scroll = (parent === window ? document.body : parent)[horizontal === true ? "scrollWidth" : "scrollHeight"];
  }
  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll = 0 - scroll;
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    } else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
    }
  } else if (horizontal === true) {
    if (rtl === true) {
      scroll = 0 - scroll;
    }
    parent.scrollLeft = scroll;
  } else {
    parent.scrollTop = scroll;
  }
}
function sumSize(sizeAgg, size2, from, to) {
  if (from >= to) {
    return 0;
  }
  const lastTo = size2.length, fromAgg = Math.floor(from / aggBucketSize), toAgg = Math.floor((to - 1) / aggBucketSize) + 1;
  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);
  if (from % aggBucketSize !== 0) {
    total -= size2.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size2.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
  }
  return total;
}
const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: null
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0
  },
  tableColspan: [Number, String]
};
const useVirtualScrollProps = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...commonVirtScrollProps
};
function useVirtualScroll({
  virtualScrollLength,
  getVirtualScrollTarget,
  getVirtualScrollEl,
  virtualScrollItemSizeComputed
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  const { $q } = proxy;
  let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;
  const virtualScrollPaddingBefore = ref(0);
  const virtualScrollPaddingAfter = ref(0);
  const virtualScrollSliceSizeComputed = ref({});
  const beforeRef = ref(null);
  const afterRef = ref(null);
  const contentRef = ref(null);
  const virtualScrollSliceRange = ref({ from: 0, to: 0 });
  const colspanAttr = computed(() => props.tableColspan !== void 0 ? props.tableColspan : 100);
  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
  }
  const needsReset = computed(() => virtualScrollItemSizeComputed.value + ";" + props.virtualScrollHorizontal);
  const needsSliceRecalc = computed(
    () => needsReset.value + ";" + props.virtualScrollSliceRatioBefore + ";" + props.virtualScrollSliceRatioAfter
  );
  watch(needsSliceRecalc, () => {
    setVirtualScrollSize();
  });
  watch(needsReset, reset);
  function reset() {
    localResetVirtualScroll(prevToIndex, true);
  }
  function refresh(toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
  }
  function scrollTo(toIndex, edge) {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return;
    }
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    );
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)),
      0,
      scrollToEdges.indexOf(edge) > -1 ? edge : prevToIndex > -1 && toIndex > prevToIndex ? "end" : "start"
    );
  }
  function localOnVirtualScrollEvt() {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return;
    }
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    ), listLastIndex = virtualScrollLength.value - 1, listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;
    if (prevScrollStart === scrollDetails.scrollStart) {
      return;
    }
    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
      return;
    }
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
    const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) - Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2));
    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(
        scrollEl,
        scrollDetails,
        listLastIndex,
        scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0)
      );
      return;
    }
    let toIndex = 0, listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart, offset = listOffset;
    if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
      listOffset -= virtualScrollPaddingBefore.value;
      toIndex = virtualScrollSliceRange.value.from;
      offset = listOffset;
    } else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[j];
        toIndex += aggBucketSize;
      }
    }
    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[toIndex];
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++;
        offset = listOffset;
      } else {
        offset = virtualScrollSizes[toIndex] + listOffset;
      }
    }
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      toIndex,
      offset
    );
  }
  function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === "string" && align.indexOf("-force") > -1;
    const alignEnd = alignForce === true ? align.replace("-force", "") : align;
    const alignRange = alignEnd !== void 0 ? alignEnd : "start";
    let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]), to = from + virtualScrollSliceSizeComputed.value.total;
    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value;
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
    }
    prevScrollStart = scrollDetails.scrollStart;
    const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;
    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex);
      return;
    }
    const { activeElement } = document;
    const contentEl = contentRef.value;
    if (rangeChanged === true && contentEl !== null && contentEl !== activeElement && contentEl.contains(activeElement) === true) {
      contentEl.addEventListener("focusout", onBlurRefocusFn);
      setTimeout(() => {
        contentEl !== null && contentEl.removeEventListener("focusout", onBlurRefocusFn);
      });
    }
    const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;
    if (rangeChanged === true) {
      const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to ? virtualScrollSliceRange.value.to : to;
      virtualScrollSliceRange.value = { from, to: tempTo };
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
      requestAnimationFrame(() => {
        if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to };
          virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
        }
      });
    }
    requestAnimationFrame(() => {
      if (prevScrollStart !== scrollDetails.scrollStart) {
        return;
      }
      if (rangeChanged === true) {
        updateVirtualScrollSizes(from);
      }
      const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0), posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value, posEnd = posStart + virtualScrollSizes[toIndex];
      let scrollPosition = posStart + offset;
      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore;
        const scrollStart = scrollDetails.scrollStart + sizeDiff;
        scrollPosition = alignForce !== true && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize ? scrollStart : alignEnd === "end" ? posEnd - scrollDetails.scrollViewSize : posStart - (alignEnd === "start" ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2));
      }
      prevScrollStart = scrollPosition;
      setScroll(
        scrollEl,
        scrollPosition,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
      emitScroll(toIndex);
    });
  }
  function updateVirtualScrollSizes(from) {
    const contentEl = contentRef.value;
    if (contentEl) {
      const children = filterProto.call(
        contentEl.children,
        (el) => el.classList && el.classList.contains("q-virtual-scroll--skip") === false
      ), childrenLength = children.length, sizeFn = props.virtualScrollHorizontal === true ? (el) => el.getBoundingClientRect().width : (el) => el.offsetHeight;
      let index2 = from, size2, diff;
      for (let i = 0; i < childrenLength; ) {
        size2 = sizeFn(children[i]);
        i++;
        while (i < childrenLength && children[i].classList.contains("q-virtual-scroll--with-prev") === true) {
          size2 += sizeFn(children[i]);
          i++;
        }
        diff = size2 - virtualScrollSizes[index2];
        if (diff !== 0) {
          virtualScrollSizes[index2] += diff;
          virtualScrollSizesAgg[Math.floor(index2 / aggBucketSize)] += diff;
        }
        index2++;
      }
    }
  }
  function onBlurRefocusFn() {
    contentRef.value !== null && contentRef.value !== void 0 && contentRef.value.focus();
  }
  function localResetVirtualScroll(toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value;
    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = [];
    }
    const oldVirtualScrollSizesLength = virtualScrollSizes.length;
    virtualScrollSizes.length = virtualScrollLength.value;
    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[i] = defaultSize;
    }
    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
    virtualScrollSizesAgg = [];
    for (let j = 0; j <= jMax; j++) {
      let size2 = 0;
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size2 += virtualScrollSizes[i];
      }
      virtualScrollSizesAgg.push(size2);
    }
    prevToIndex = -1;
    prevScrollStart = void 0;
    virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
    virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);
    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
      nextTick(() => {
        scrollTo(toIndex);
      });
    } else {
      onVirtualScrollEvt();
    }
  }
  function setVirtualScrollSize(scrollViewSize) {
    if (scrollViewSize === void 0 && false) {
      const scrollEl = getVirtualScrollTarget();
      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(
          scrollEl,
          getVirtualScrollEl(),
          beforeRef.value,
          afterRef.value,
          props.virtualScrollHorizontal,
          $q.lang.rtl,
          props.virtualScrollStickySizeStart,
          props.virtualScrollStickySizeEnd
        ).scrollViewSize;
      }
    }
    localScrollViewSize = scrollViewSize;
    const virtualScrollSliceRatioBefore = parseFloat(props.virtualScrollSliceRatioBefore) || 0;
    const virtualScrollSliceRatioAfter = parseFloat(props.virtualScrollSliceRatioAfter) || 0;
    const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter;
    const view = scrollViewSize === void 0 || scrollViewSize <= 0 ? 1 : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);
    const baseSize = Math.max(
      1,
      view,
      Math.ceil((props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier)
    );
    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
      view
    };
  }
  function padVirtualScroll(tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? "width" : "height";
    const style = {
      ["--q-virtual-scroll-item-" + paddingSize]: virtualScrollItemSizeComputed.value + "px"
    };
    return [
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef,
        style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style }
      }),
      h(tag, {
        class: "q-virtual-scroll__content",
        key: "content",
        ref: contentRef,
        tabindex: -1
      }, content.flat()),
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef,
        style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style }
      })
    ];
  }
  function emitScroll(index2) {
    if (prevToIndex !== index2) {
      props.onVirtualScroll !== void 0 && emit("virtual-scroll", {
        index: index2,
        from: virtualScrollSliceRange.value.from,
        to: virtualScrollSliceRange.value.to - 1,
        direction: index2 < prevToIndex ? "decrease" : "increase",
        ref: proxy
      });
      prevToIndex = index2;
    }
  }
  setVirtualScrollSize();
  const onVirtualScrollEvt = debounce(
    localOnVirtualScrollEvt,
    $q.platform.is.ios === true ? 120 : 35
  );
  Object.assign(proxy, { scrollTo, reset, refresh });
  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,
    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,
    scrollTo,
    reset,
    refresh
  };
}
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);
const reEscapeList = ".*+?^${}()|[]\\";
const fieldPropsList = Object.keys(useFieldProps);
const __nuxt_component_8$1 = createComponent({
  name: "QSelect",
  inheritAttrs: false,
  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,
    modelValue: {
      required: true
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: String,
    transitionHide: String,
    transitionDuration: [String, Number],
    behavior: {
      type: String,
      validator: (v) => ["default", "menu", "dialog"].includes(v),
      default: "default"
    },
    virtualScrollItemSize: {
      type: [Number, String],
      default: void 0
    },
    onNewValue: Function,
    onFilter: Function
  },
  emits: [
    ...useFieldEmits,
    "add",
    "remove",
    "input-value",
    "new-value",
    "keyup",
    "keypress",
    "keydown",
    "filter-abort"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref("");
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);
    let inputTimer, innerValueCache, hasDialog, userInputValue, filterId, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const onComposition = useKeyComposition(onInput);
    const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
    const virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize === void 0 ? props.optionsDense === true ? 24 : 48 : props.virtualScrollItemSize);
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });
    const state = useFieldState();
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true) ? props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : [];
        const values = val.map((v) => getOption(v, cache));
        return props.modelValue === null && mapNull === true ? values.filter((v) => v !== null) : values;
      }
      return val;
    });
    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach((key) => {
        const val = props[key];
        if (val !== void 0) {
          acc[key] = val;
        }
      });
      return acc;
    });
    const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const computedInputClass = computed(() => {
      let cls = "q-field__input q-placeholder col";
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass];
      }
      cls += " q-field__input--padding";
      return props.inputClass === void 0 ? cls : [cls, props.inputClass];
    });
    const menuContentClass = computed(
      () => (props.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : "")
    );
    const noOptions = computed(() => virtualScrollLength.value === 0);
    const selectedString = computed(
      () => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", ")
    );
    const needsHtmlFn = computed(() => props.optionsHtml === true ? () => true : (opt) => opt !== void 0 && opt !== null && opt.html === true);
    const valueAsHtml = computed(() => props.displayValueHtml === true || props.displayValue === void 0 && (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value)));
    const tabindex = computed(() => state.focused.value === true ? props.tabindex : -1);
    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: "combobox",
        "aria-label": props.label,
        "aria-autocomplete": props.useInput === true ? "list" : "none",
        "aria-expanded": menu.value === true ? "true" : "false",
        "aria-owns": `${state.targetUid.value}_lb`,
        "aria-controls": `${state.targetUid.value}_lb`
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const listboxAttrs = computed(() => {
      const attrs = {
        id: `${state.targetUid.value}_lb`,
        role: "listbox",
        "aria-multiselectable": props.multiple === true ? "true" : "false"
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }));
    });
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const { from, to } = virtualScrollSliceRange.value;
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const index2 = from + i;
        const itemProps = {
          clickable: true,
          active: false,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: "option",
          id: `${state.targetUid.value}_${index2}`,
          onClick: () => {
            toggleOption(opt);
          }
        };
        if (disable !== true) {
          isOptionSelected(opt) === true && (itemProps.active = true);
          optionIndex.value === index2 && (itemProps.focused = true);
          itemProps["aria-selected"] = itemProps.active === true ? "true" : "false";
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              menu.value === true && setOptionIndex(index2);
            };
          }
        }
        return {
          index: index2,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        };
      });
    });
    const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
    const squaredMenu = computed(
      () => props.optionsCover === false && props.outlined !== true && props.standout !== true && props.borderless !== true && props.rounded !== true
    );
    const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
    const innerOptionsValue = computed(() => innerValue.value.map((opt) => getOptionValue.value(opt)));
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e);
        }
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      return evt;
    });
    watch(innerValue, (val) => {
      innerValueCache = val;
      if (props.useInput === true && props.fillInput === true && props.multiple !== true && state.innerLoading.value !== true && (dialog.value !== true && menu.value !== true || hasValue.value !== true)) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter("");
        }
      }
    }, { immediate: true });
    watch(() => props.fillInput, resetInputValue);
    watch(menu, updateMenu);
    watch(virtualScrollLength, rerenderMenu);
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt;
    }
    function removeAtIndex(index2) {
      if (index2 > -1 && index2 < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit("remove", { index: index2, value: model.splice(index2, 1)[0] });
          emit("update:modelValue", model);
        } else {
          emit("update:modelValue", null);
        }
      }
    }
    function removeAtIndexAndFocus(index2) {
      removeAtIndex(index2);
      state.focus();
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt);
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(
          getOptionLabel.value(opt),
          true,
          true
        );
        emit("update:modelValue", val);
        return;
      }
      if (innerValue.value.length === 0) {
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      if (unique === true && isOptionSelected(opt) === true) {
        return;
      }
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) {
        return;
      }
      const model = props.modelValue.slice();
      emit("add", { index: model.length, value: val });
      model.push(val);
      emit("update:modelValue", model);
    }
    function toggleOption(opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) {
        return;
      }
      const optValue = getOptionValue.value(opt);
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(
            props.fillInput === true ? getOptionLabel.value(opt) : "",
            true,
            true
          );
          hidePopup();
        }
        targetRef.value !== null && targetRef.value.focus();
        if (innerValue.value.length === 0 || isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true) {
          emit("update:modelValue", props.emitValue === true ? optValue : opt);
        }
        return;
      }
      (hasDialog !== true || dialogFieldFocused.value === true) && state.focus();
      selectInputText();
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      const model = props.modelValue.slice(), index2 = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
      if (index2 > -1) {
        emit("remove", { index: index2, value: model.splice(index2, 1)[0] });
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) {
          return;
        }
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: model.length, value: val });
        model.push(val);
      }
      emit("update:modelValue", model);
    }
    function setOptionIndex(index2) {
      if ($q.platform.is.desktop !== true) {
        return;
      }
      const val = index2 > -1 && index2 < virtualScrollLength.value ? index2 : -1;
      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index2 = optionIndex.value;
        do {
          index2 = normalizeToInterval(
            index2 + offset,
            -1,
            virtualScrollLength.value - 1
          );
        } while (index2 !== -1 && index2 !== optionIndex.value && isOptionDisabled.value(props.options[index2]) === true);
        if (optionIndex.value !== index2) {
          setOptionIndex(index2);
          scrollTo(index2);
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index2 >= 0 ? getOptionLabel.value(props.options[index2]) : defaultInputValue
            );
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value;
    }
    function getPropValueFn(propValue, defaultVal) {
      const val = propValue !== void 0 ? propValue : defaultVal;
      return typeof val === "function" ? val : (opt) => opt !== null && typeof opt === "object" && val in opt ? opt[val] : opt;
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
    }
    function selectInputText(e) {
      if (props.useInput === true && targetRef.value !== null && (e === void 0 || targetRef.value === e.target && e.target.value === selectedString.value)) {
        targetRef.value.select();
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        hidePopup();
        resetInputValue();
      }
      emit("keyup", e);
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target;
      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return;
      }
      e.target.value = "";
      clearTimeout(inputTimer);
      resetInputValue();
      if (typeof value === "string" && value.length > 0) {
        const needle = value.toLocaleLowerCase();
        const findFn = (extractFn) => {
          const option = props.options.find((opt) => extractFn.value(opt).toLocaleLowerCase() === needle);
          if (option === void 0) {
            return false;
          }
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          } else {
            hidePopup();
          }
          return true;
        };
        const fillFn = (afterFilter) => {
          if (findFn(getOptionValue) === true) {
            return;
          }
          if (findFn(getOptionLabel) === true || afterFilter === true) {
            return;
          }
          filter(value, true, () => fillFn(true));
        };
        fillFn();
      } else {
        state.clearValue(e);
      }
    }
    function onTargetKeypress(e) {
      emit("keypress", e);
    }
    function onTargetKeydown(e) {
      emit("keydown", e);
      if (shouldIgnoreKey(e) === true) {
        return;
      }
      const newValueModeValid = inputValue.value.length > 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
      const tabShouldSelect = e.shiftKey !== true && props.multiple !== true && (optionIndex.value > -1 || newValueModeValid === true);
      if (e.keyCode === 27) {
        prevent(e);
        return;
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return;
      }
      if (e.target === void 0 || e.target.id !== state.targetUid.value) {
        return;
      }
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e);
        showPopup();
        return;
      }
      if (e.keyCode === 8 && props.hideSelected !== true && inputValue.value.length === 0) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit("update:modelValue", null);
        }
        return;
      }
      if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }
      if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view
          )
        );
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }
      const optionsLength = virtualScrollLength.value;
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = "";
      }
      if (optionsLength > 0 && props.useInput !== true && e.key !== void 0 && e.key.length === 1 && e.altKey === e.ctrlKey && (e.keyCode !== 32 || searchBuffer.length > 0)) {
        menu.value !== true && showPopup(e);
        const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }
        const searchRe = new RegExp("^" + searchBuffer.split("").map((l) => reEscapeList.indexOf(l) > -1 ? "\\" + l : l).join(".*"), "i");
        let index2 = optionIndex.value;
        if (keyRepeat === true || index2 < 0 || searchRe.test(getOptionLabel.value(props.options[index2])) !== true) {
          do {
            index2 = normalizeToInterval(index2 + 1, -1, optionsLength - 1);
          } while (index2 !== optionIndex.value && (isOptionDisabled.value(props.options[index2]) === true || searchRe.test(getOptionLabel.value(props.options[index2])) !== true));
        }
        if (optionIndex.value !== index2) {
          nextTick(() => {
            setOptionIndex(index2);
            scrollTo(index2);
            if (index2 >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index2]));
            }
          });
        }
        return;
      }
      if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== "") && (e.keyCode !== 9 || tabShouldSelect === false)) {
        return;
      }
      e.keyCode !== 9 && stopAndPrevent(e);
      if (optionIndex.value > -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value]);
        return;
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode(mode) !== true) {
              return;
            }
          } else {
            mode = props.newValueMode;
          }
          if (val === void 0 || val === null) {
            return;
          }
          updateInputValue("", props.multiple !== true, true);
          const fn = mode === "toggle" ? toggleOption : add;
          fn(val, mode === "add-unique");
          if (props.multiple !== true) {
            targetRef.value !== null && targetRef.value.focus();
            hidePopup();
          }
        };
        if (props.onNewValue !== void 0) {
          emit("new-value", inputValue.value, done);
        } else {
          done(inputValue.value);
        }
        if (props.multiple !== true) {
          return;
        }
      }
      if (menu.value === true) {
        closeMenu();
      } else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true ? menuContentRef.value : menuRef.value !== null && menuRef.value.__qPortalInnerRef.value !== null ? menuRef.value.__qPortalInnerRef.value : void 0;
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl();
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return [];
      }
      if (slots["selected-item"] !== void 0) {
        return selectedScope.value.map((scope) => slots["selected-item"](scope)).slice();
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected());
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: "option-" + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove() {
            scope.removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          [scope.html === true ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
        })));
      }
      return [
        h("span", {
          [valueAsHtml.value === true ? "innerHTML" : "textContent"]: props.displayValue !== void 0 ? props.displayValue : selectedString.value
        })
      ];
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
      }
      const fn = slots.option !== void 0 ? slots.option : (scope) => {
        return h(QItem, {
          key: scope.index,
          ...scope.itemProps
        }, () => {
          return h(
            QItemSection,
            () => h(
              __nuxt_component_5,
              () => h("span", {
                [scope.html === true ? "innerHTML" : "textContent"]: scope.label
              })
            )
          );
        });
      };
      let options = padVirtualScroll("div", optionScope.value.map(fn));
      if (slots["before-options"] !== void 0) {
        options = slots["before-options"]().concat(options);
      }
      return hMergeSlot(slots["after-options"], options);
    }
    function getInput(fromDialog, isTarget) {
      const attrs = isTarget === true ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value } : void 0;
      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: "i_t",
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : "",
        type: "search",
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        "data-autofocus": fromDialog !== true && props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value
      };
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [...data.class, "no-pointer-events"];
        } else {
          data.class += " no-pointer-events";
        }
      }
      return h("input", data);
    }
    function onInput(e) {
      clearTimeout(inputTimer);
      if (e && e.target && e.target.qComposing === true) {
        return;
      }
      setInputValue(e.target.value || "");
      userInputValue = true;
      defaultInputValue = inputValue.value;
      if (state.focused.value !== true && (hasDialog !== true || dialogFieldFocused.value === true)) {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        inputTimer = setTimeout(() => {
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }
    function setInputValue(val) {
      if (inputValue.value !== val) {
        inputValue.value = val;
        emit("input-value", val);
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true;
      if (props.useInput === true) {
        setInputValue(val);
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }
        noFiltering !== true && filter(val);
      }
    }
    function filter(val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || keepClosed !== true && state.focused.value !== true) {
        return;
      }
      if (state.innerLoading.value === true) {
        emit("filter-abort");
      } else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }
      if (val !== "" && props.multiple !== true && innerValue.value.length > 0 && userInputValue !== true && val === getOptionLabel.value(innerValue.value[0])) {
        val = "";
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);
      clearTimeout(filterId);
      filterId = localFilterId;
      emit(
        "filter",
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId);
            typeof fn === "function" && fn();
            innerLoadingIndicator.value = false;
            nextTick(() => {
              state.innerLoading.value = false;
              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup();
                } else if (menu.value === true) {
                  updateMenu(true);
                } else {
                  menu.value = true;
                }
              }
              typeof afterFn === "function" && nextTick(() => {
                afterFn(proxy);
              });
              typeof afterUpdateFn === "function" && nextTick(() => {
                afterUpdateFn(proxy);
              });
            });
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId);
            state.innerLoading.value = false;
            innerLoadingIndicator.value = false;
          }
          menu.value === true && (menu.value = false);
        }
      );
    }
    function getMenu() {
      return h(QMenu, {
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true,
        ...listboxAttrs.value,
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }, getAllOptions);
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e);
      closeMenu();
    }
    function onMenuShow() {
      setVirtualScrollSize();
    }
    function onDialogFieldFocus(e) {
      stop(e);
      targetRef.value !== null && targetRef.value.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function onDialogFieldBlur(e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }
    function getDialog() {
      const content = [
        h(QField, {
          class: `col-auto ${state.fieldClass.value}`,
          ...innerFieldProps.value,
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length > 0,
          ...state.splitAttrs.listeners.value,
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }, {
          ...slots,
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        })
      ];
      menu.value === true && content.push(
        h("div", {
          ref: menuContentRef,
          class: menuContentClass.value + " scroll",
          style: props.popupContentStyle,
          ...listboxAttrs.value,
          onClick: prevent,
          onScrollPassive: onVirtualScrollEvt
        }, getAllOptions())
      );
      return h(QDialog, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? "top" : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h("div", {
        class: "q-select__dialog" + (isOptionsDark.value === true ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value === true ? " q-select__dialog--focused" : "")
      }, content));
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e);
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")
        );
      }
      state.focused.value = false;
    }
    function onDialogHide(e) {
      hidePopup();
      state.focused.value === false && emit("blur", e);
      resetInputValue();
    }
    function onDialogShow() {
      const el = document.activeElement;
      if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) {
        targetRef.value.focus();
      }
      setVirtualScrollSize();
    }
    function closeMenu() {
      if (dialog.value === true) {
        return;
      }
      optionIndex.value = -1;
      if (menu.value === true) {
        menu.value = false;
      }
      if (state.focused.value === false) {
        clearTimeout(filterId);
        filterId = void 0;
        if (state.innerLoading.value === true) {
          emit("filter-abort");
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) {
        return;
      }
      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      } else {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      } else if (noOptions.value !== true || slots["no-option"] !== void 0) {
        menu.value = true;
      }
    }
    function hidePopup() {
      dialog.value = false;
      closeMenu();
    }
    function resetInputValue() {
      props.useInput === true && updateInputValue(
        props.multiple !== true && props.fillInput === true && innerValue.value.length > 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "",
        true,
        true
      );
    }
    function updateMenu(show) {
      let optionIndex2 = -1;
      if (show === true) {
        if (innerValue.value.length > 0) {
          const val = getOptionValue.value(innerValue.value[0]);
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
        }
        localResetVirtualScroll(optionIndex2);
      }
      setOptionIndex(optionIndex2);
    }
    function rerenderMenu(newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true);
        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll();
            } else {
              updateMenu(true);
            }
          }
        });
      }
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e);
      emit("popup-show", e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e);
      emit("popup-hide", e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }
    function updatePreState() {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput === true ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || noOptions.value === false : true);
      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true ? "fade" : props.transitionShow;
    }
    onUpdated(updateMenuPosition);
    updatePreState();
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-select q-field--auto-height q-select--with${props.useInput !== true ? "out" : ""}-input q-select--with${props.useChips !== true ? "out" : ""}-chips q-select--${props.multiple === true ? "multiple" : "single"}`
      ),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(
        () => props.hideSelected !== true && hasValue.value === true || typeof inputValue.value === "number" || inputValue.value.length > 0 || fieldValueIsFilled(props.displayValue)
      ),
      getControlChild: () => {
        if (state.editable.value !== false && (dialog.value === true || noOptions.value !== true || slots["no-option"] !== void 0)) {
          return hasDialog === true ? getDialog() : getMenu();
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false;
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e);
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick(e) {
          prevent(e);
          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            targetRef.value !== null && targetRef.value.focus();
            return;
          }
          showPopup(e);
        }
      },
      getControl: (fromDialog) => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        } else if (state.editable.value === true) {
          const attrs2 = isTarget === true ? comboboxAttrs.value : void 0;
          child.push(
            h("input", {
              ref: isTarget === true ? targetRef : void 0,
              key: "d_t",
              class: "q-select__focus-target",
              id: isTarget === true ? state.targetUid.value : void 0,
              readonly: true,
              "data-autofocus": fromDialog !== true && props.autofocus === true || void 0,
              ...attrs2,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress
            })
          );
          if (isTarget === true && typeof props.autocomplete === "string" && props.autocomplete.length > 0) {
            child.push(
              h("input", {
                class: "q-select__autocomplete-input",
                autocomplete: props.autocomplete,
                onKeyup: onTargetAutocomplete
              })
            );
          }
        }
        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length > 0) {
          const opts = innerOptionsValue.value.map((value) => h("option", { value, selected: true }));
          child.push(
            h("select", {
              class: "hidden",
              name: nameProp.value,
              multiple: props.multiple
            }, opts)
          );
        }
        const attrs = props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value;
        return h("div", {
          class: "q-field__native row items-center",
          ...attrs
        }, child);
      },
      getInnerAppend: () => props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true ? [
        h(QIcon, {
          class: "q-select__dropdown-icon" + (menu.value === true ? " rotate-180" : ""),
          name: dropdownArrowIcon.value
        })
      ] : null
    });
    return useField(state);
  }
});
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
const optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,
  modelValue: {
    required: true,
    default: null
  },
  val: {},
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (v) => v === "tf" || v === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
};
const useCheckboxEmits = ["update:modelValue"];
function useCheckbox(type, getInner) {
  const { props, slots, emit, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const isDark = useDark(props, $q);
  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
  const sizeStyle = useSize(props, optionSizes);
  const modelIsArray = computed(
    () => props.val !== void 0 && Array.isArray(props.modelValue)
  );
  const index2 = computed(() => {
    const val = toRaw(props.val);
    return modelIsArray.value === true ? props.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
  });
  const isTrue = computed(() => modelIsArray.value === true ? index2.value > -1 : toRaw(props.modelValue) === toRaw(props.trueValue));
  const isFalse = computed(() => modelIsArray.value === true ? index2.value === -1 : toRaw(props.modelValue) === toRaw(props.falseValue));
  const isIndeterminate = computed(
    () => isTrue.value === false && isFalse.value === false
  );
  const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
  const classes = computed(
    () => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props.disable === true ? " disabled" : "") + (isDark.value === true ? ` q-${type}--dark` : "") + (props.dense === true ? ` q-${type}--dense` : "") + (props.leftLabel === true ? " reverse" : "")
  );
  const innerClass = computed(() => {
    const state = isTrue.value === true ? "truthy" : isFalse.value === true ? "falsy" : "indet";
    const color = props.color !== void 0 && (props.keepColor === true || (type === "toggle" ? isTrue.value === true : isFalse.value !== true)) ? ` text-${props.color}` : "";
    return `q-${type}__inner relative-position non-selectable q-${type}__inner--${state}${color}`;
  });
  const formAttrs = computed(() => {
    const prop = { type: "checkbox" };
    props.name !== void 0 && Object.assign(prop, {
      "^checked": isTrue.value === true ? "checked" : void 0,
      name: props.name,
      value: modelIsArray.value === true ? props.val : props.trueValue
    });
    return prop;
  });
  const injectFormInput = useFormInject(formAttrs);
  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: "checkbox",
      "aria-label": props.label,
      "aria-checked": isIndeterminate.value === true ? "mixed" : isTrue.value === true ? "true" : "false"
    };
    if (props.disable === true) {
      attrs["aria-disabled"] = "true";
    }
    return attrs;
  });
  function onClick(e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }
    if (props.disable !== true) {
      emit("update:modelValue", getNextValue(), e);
    }
  }
  function getNextValue() {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props.modelValue.slice();
        val.splice(index2.value, 1);
        return val;
      }
      return props.modelValue.concat([props.val]);
    }
    if (isTrue.value === true) {
      if (props.toggleOrder !== "ft" || props.toggleIndeterminate === false) {
        return props.falseValue;
      }
    } else if (isFalse.value === true) {
      if (props.toggleOrder === "ft" || props.toggleIndeterminate === false) {
        return props.trueValue;
      }
    } else {
      return props.toggleOrder !== "ft" ? props.trueValue : props.falseValue;
    }
    return props.indeterminateValue;
  }
  function onKeydown2(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      stopAndPrevent(e);
    }
  }
  function onKeyup2(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  }
  const getInnerContent = getInner(isTrue, isIndeterminate);
  Object.assign(proxy, { toggle: onClick });
  return () => {
    const inner = getInnerContent();
    props.disable !== true && injectFormInput(
      inner,
      "unshift",
      ` q-${type}__native absolute q-ma-none q-pa-none`
    );
    const child = [
      h("div", {
        class: innerClass.value,
        style: sizeStyle.value
      }, inner)
    ];
    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }
    const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
    label !== void 0 && child.push(
      h("div", {
        class: `q-${type}__label q-anchor--skip`
      }, label)
    );
    return h("div", {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown: onKeydown2,
      onKeyup: onKeyup2
    }, child);
  };
}
const bgNode = h("div", {
  key: "svg",
  class: "q-checkbox__bg absolute"
}, [
  h("svg", {
    class: "q-checkbox__svg fit absolute-full",
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, [
    h("path", {
      class: "q-checkbox__truthy",
      fill: "none",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    }),
    h("path", {
      class: "q-checkbox__indet",
      d: "M4,14H20V10H4"
    })
  ])
]);
const QCheckbox = createComponent({
  name: "QCheckbox",
  props: useCheckboxProps,
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || null
      );
      return () => icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-checkbox__icon",
            name: icon.value
          })
        ])
      ] : [bgNode];
    }
    return useCheckbox("checkbox", getInner);
  }
});
const QCardActions = createComponent({
  name: "QCardActions",
  props: {
    ...useAlignProps,
    vertical: Boolean
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(
      () => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical === true ? "vert column" : "horiz row"}`
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const getRateFromId = (id, rates) => {
  return rates.find((rate) => rate.id === id);
};
function getBaseRate(isHourly, numHours, numKms, rate) {
  if (isHourly) {
    if (numHours < rate.min_hours_hourly) {
      return rate.min_rate_hourly;
    } else {
      return round(rate.per_hour * numHours);
    }
  } else {
    if (numKms < rate.min_distance) {
      return rate.min_rate_distance;
    } else {
      return round(
        rate.min_rate_distance + (numKms - rate.min_distance) * rate.per_km
      );
    }
  }
}
const getSurchargeAmounts = (baseRate, surcharges) => {
  return {
    fuelSurcharge: round(baseRate * surcharges.fuelSurcharge),
    gratuity: round(baseRate * surcharges.gratuity),
    HST: round(baseRate * surcharges.HST)
  };
};
const round = (num) => {
  let m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
};
const isVue2 = false;
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function usePrecision(value, digits, options) {
  return computed(() => {
    var _a;
    const _value = resolveUnref(value);
    const _digits = resolveUnref(digits);
    const power = 10 ** _digits;
    return Math[((_a = resolveUnref(options)) == null ? void 0 : _a.math) || "round"](_value * power) / power;
  });
}
/*!
  * pinia v2.0.21
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol();
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentInstance()) {
    onUnmounted(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol();
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  store.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
  };
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = noop;
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign(
    {},
    partialStore
  ));
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance();
    pinia = (pinia) || currentInstance && inject(piniaSymbol);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  {
    store = toRaw(store);
    const refs = {};
    for (const key in store) {
      const value = store[key];
      if (isRef(value) || isReactive(value)) {
        refs[key] = toRef(store, key);
      }
    }
    return refs;
  }
}
const useMapStore = defineStore("useMapStore", {
  state: () => {
    return {
      origin_location: "",
      origin_location_type: "",
      destination_location: "",
      destination_location_type: "",
      distance_traveled: 0,
      duration_traveled: 0,
      origin_address_components: [],
      destination_address_components: [],
      origin_formatted_address: "",
      destination_formatted_address: "",
      origin_place_name: "",
      destination_place_name: "",
      origin_lat: 0,
      origin_lng: 0,
      destination_lat: 0,
      destination_lng: 0,
      base_rate: 0,
      fuel_surcharge: 0,
      gratuity_rate: 0,
      hst: 0,
      total_cost: 0,
      first_name: "",
      last_name: "",
      email_address: "",
      phone_number: "",
      vehicle_image: "",
      pickup_date: "",
      pickup_time: "",
      service_type: void 0,
      vehicle_type: void 0,
      number_of_hours: void 0,
      num_passengers: void 0,
      is_round_trip: false
    };
  },
  actions: {
    async zapTest() {
      const { data } = await useFetch("/api/capture", {
        method: "POST",
        body: {
          origin_address_components: this.origin_address_components,
          destination_address_components: this.destination_address_components,
          origin_formatted_address: this.origin_formatted_address,
          destination_formatted_address: this.destination_formatted_address,
          origin_place_name: this.origin_place_name,
          destination_place_name: this.destination_place_name,
          origin_lat: this.origin_lat,
          origin_lng: this.origin_lng,
          destination_lat: this.destination_lat,
          destination_lng: this.destination_lng,
          firstname: this.first_name,
          lastname: this.last_name,
          email: this.email_address,
          phone: this.phone_number,
          pick_up_date: this.pickup_date,
          pick_up_time: this.pickup_time,
          service_type: this.service_type.label,
          vehicle_type: this.vehicle_type.label,
          number_of_hours: this.number_of_hours.label,
          num_passengers: this.num_passengers,
          is_round_trip: this.is_round_trip,
          vehicle_image: this.vehicle_image,
          total_cost: this.total_cost,
          base_rate: this.base_rate,
          fuel_surcharge: this.fuel_surcharge,
          gratuity_rate: this.gratuity_rate,
          hst: this.hst
        }
      }, "$7DUOts6Zln");
      console.log(data.value);
    }
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "QuasarForm",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    new Loader({
      apiKey: config.public.MAPS_API_KEY,
      libraries: ["places"],
      version: "weekly",
      region: "ca"
    });
    const myMap = ref(null);
    const passengerOptions = [
      {
        label: "1 passenger",
        value: 1
      },
      {
        label: "2 passengers",
        value: 2
      },
      {
        label: "3 passengers",
        value: 3
      },
      {
        label: "4 passengers",
        value: 4
      },
      {
        label: "5 passengers",
        value: 5
      },
      {
        label: "6 passengers",
        value: 6
      },
      {
        label: "7 passengers",
        value: 7
      }
    ];
    const serviceTypeOptions = [
      {
        label: "Point-to-Point",
        value: 1
      },
      {
        label: "To Airport",
        value: 2
      },
      {
        label: "From Airport",
        value: 3
      },
      {
        label: "Hourly/As Directed",
        value: 4
      }
    ];
    const vehicleTypeOptions = [
      {
        label: "Standard Sedan",
        value: 1
      },
      {
        label: "Premium Sedan",
        value: 2
      },
      {
        label: "Standard SUV",
        value: 3
      },
      {
        label: "Premium SUV",
        value: 4
      }
    ];
    const hoursRequiredOptions = [
      {
        label: "2 hrs",
        value: 2
      },
      {
        label: "3 hrs",
        value: 3
      },
      {
        label: "4 hrs",
        value: 4
      },
      {
        label: "5 hrs",
        value: 5
      },
      {
        label: "6 hrs",
        value: 6
      },
      {
        label: "7 hrs",
        value: 7
      },
      {
        label: "8 hrs",
        value: 8
      },
      {
        label: "9 hrs",
        value: 9
      },
      {
        label: "10 hrs",
        value: 10
      },
      {
        label: "11 hrs",
        value: 11
      },
      {
        label: "12 hrs",
        value: 12
      }
    ];
    const mapStore = useMapStore();
    const {
      distance_traveled,
      duration_traveled,
      origin_location,
      origin_location_type,
      destination_location,
      destination_location_type,
      origin_address_components,
      destination_address_components,
      origin_lng,
      origin_lat,
      destination_lng,
      destination_lat,
      origin_formatted_address,
      destination_formatted_address,
      origin_place_name,
      destination_place_name,
      first_name,
      last_name,
      email_address,
      phone_number,
      vehicle_image,
      pickup_date,
      pickup_time,
      service_type,
      vehicle_type,
      number_of_hours,
      num_passengers,
      is_round_trip,
      base_rate,
      fuel_surcharge,
      gratuity_rate,
      hst,
      total_cost
    } = storeToRefs(mapStore);
    const vehicleType = ref(null);
    const numberOfHours = ref(1);
    const showTimePopup = ref(false);
    const showDatePopup = ref(false);
    const isItHourly = ref(false);
    watch(service_type, () => {
      if (service_type.value.value === 4) {
        isItHourly.value = true;
        number_of_hours.value = 2;
      } else {
        isItHourly.value = false;
        number_of_hours.value = null;
      }
      console.log(
        service_type.value.label,
        service_type.value.value,
        number_of_hours.value,
        isItHourly.value
      );
    });
    const loading = ref(false);
    const onSubmit = async (evt) => {
      loading.value = true;
      const rates = await $fetch("/api/rates");
      const surcharges = await $fetch("/api/surcharges");
      console.log(vehicleType.value);
      vehicle_type.value = vehicleType.value;
      number_of_hours.value = numberOfHours.value;
      console.log(isItHourly.value);
      const serviceRate = getRateFromId(vehicleType.value.value, rates);
      console.log(serviceRate);
      const baseRate = getBaseRate(
        isItHourly.value,
        numberOfHours.value,
        distance_traveled.value,
        serviceRate
      );
      console.log(baseRate);
      const { fuelSurcharge, gratuity, HST } = getSurchargeAmounts(
        baseRate,
        surcharges
      );
      const sumOfSurcharges = ref(baseRate + fuelSurcharge + gratuity + HST);
      total_cost.value = usePrecision(sumOfSurcharges, 2);
      console.log(total_cost.value);
      base_rate.value = baseRate;
      fuel_surcharge.value = fuelSurcharge;
      gratuity_rate.value = gratuity;
      hst.value = HST;
      const vehicleImages = () => {
        if (vehicleType.value.label === "Standard Sedan") {
          return "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024";
        } else if (vehicleType.value.label === "Premium Sedan") {
          return "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024";
        } else if (vehicleType.value.label === "Standard SUV") {
          return "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024";
        } else {
          return "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d80107f-4800-45ae-8e20-c4adf2792f00/1024";
        }
      };
      vehicle_image.value = vehicleImages();
      console.log(vehicle_image.value);
      const timestamp = evt.timeStamp;
      const {
        origin_input,
        destination_input,
        pickup_date: pickup_date2,
        pickup_time: pickup_time2,
        service_type: service_type2,
        num_passengers: num_passengers2,
        first_name: first_name2,
        last_name: last_name2,
        email_address: email_address2,
        phone_number: phone_number2
      } = Object.fromEntries(new FormData(evt.target));
      const formBody = {
        fields: [
          {
            objectTypeId: "0-1",
            name: "pick_up_date",
            value: pickup_date2
          },
          {
            objectTypeId: "0-1",
            name: "pick_up_time",
            value: pickup_time2
          },
          {
            objectTypeId: "0-1",
            name: "vehicle_type",
            value: vehicleType.value.label
          },
          {
            objectTypeId: "0-1",
            name: "origin_formatted_address",
            value: origin_input
          },
          {
            objectTypeId: "0-1",
            name: "destination_formatted_address",
            value: destination_input
          },
          {
            objectTypeId: "0-1",
            name: "firstname",
            value: first_name2
          },
          {
            objectTypeId: "0-1",
            name: "lastname",
            value: last_name2
          },
          {
            objectTypeId: "0-1",
            name: "email",
            value: email_address2
          },
          {
            objectTypeId: "0-1",
            name: "phone",
            value: phone_number2
          },
          {
            objectTypeId: "0-1",
            name: "service_type",
            value: service_type2
          },
          {
            objectTypeId: "0-1",
            name: "deal_amount",
            value: total_cost.value
          },
          {
            objectTypeId: "0-1",
            name: "pax_amount",
            value: num_passengers2
          },
          {
            objectTypeId: "0-1",
            name: "hours",
            value: numberOfHours.value
          },
          {
            objectTypeId: "0-1",
            name: "distance",
            value: distance_traveled.value
          },
          {
            objectTypeId: "0-1",
            name: "time",
            value: duration_traveled.value
          },
          {
            objectTypeId: "0-1",
            name: "submission_timestamp",
            value: timestamp
          },
          {
            objectTypeId: "0-1",
            name: "vehicle_image_url",
            value: vehicle_image.value
          },
          {
            objectTypeId: "0-1",
            name: "destination_place_name",
            value: destination_place_name.value
          },
          {
            objectTypeId: "0-1",
            name: "origin_place_name",
            value: origin_place_name.value
          }
        ]
      };
      console.log(formBody);
      console.log(evt);
      const { data, error } = await useFetch("/api/formSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: formBody
      }, "$Io6hFEYpd9");
      const router = useRouter();
      setTimeout(() => {
        router.push("/quoted");
      }, 750);
      loading.value = false;
      return {
        data,
        error
      };
    };
    const onReset = () => ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_QForm = __nuxt_component_0$1;
      const _component_QCardSection = QCardSection;
      const _component_QInput = QInput;
      const _component_QIcon = QIcon;
      const _component_QPopupProxy = __nuxt_component_4;
      const _component_QDate = __nuxt_component_5$1;
      const _component_q_btn = QBtn;
      const _component_QTime = __nuxt_component_7$1;
      const _component_QSelect = __nuxt_component_8$1;
      const _component_QCheckbox = QCheckbox;
      const _component_QCardActions = QCardActions;
      const _component_QBtn = QBtn;
      const _directive_close_popup = resolveDirective("close-popup");
      _push(ssrRenderComponent(_component_QForm, mergeProps({
        "rounded-borders": "",
        "no-error-focus": "",
        "no-reset-focus": "",
        onSubmit,
        onReset,
        id: "lead_form",
        ref: "myForm",
        class: "max-w-xl mx-auto q-px-sm q-pt-md q-pb-lg bg-black overflow-hidden",
        autocomplete: "off"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_QCardSection, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-center text-white uppercase text-h5"${_scopeId2}>Instant Quote</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center text-white uppercase text-h5" }, "Instant Quote")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input type="text" id="origin-input" name="origin_input" placeholder="Enter Pickup Address or Airport Code"${ssrRenderAttr("value", unref(origin_location))} class="w-full px-3 py-2 text-gray-500 placeholder-gray-400 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90" required${_scopeId2}>`);
                } else {
                  return [
                    withDirectives(createVNode("input", {
                      type: "text",
                      id: "origin-input",
                      name: "origin_input",
                      placeholder: "Enter Pickup Address or Airport Code",
                      "onUpdate:modelValue": ($event) => isRef(origin_location) ? origin_location.value = $event : null,
                      ref: "originLocation",
                      class: "w-full px-3 py-2 text-gray-500 placeholder-gray-400 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(origin_location)]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input type="text" required id="destination-input" name="destination_input" placeholder="Enter Pickup Address or Airport Code"${ssrRenderAttr("value", unref(destination_location))} class="w-full px-3 py-2 text-gray-500 placeholder-gray-400 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90"${_scopeId2}>`);
                } else {
                  return [
                    withDirectives(createVNode("input", {
                      type: "text",
                      required: "",
                      id: "destination-input",
                      name: "destination_input",
                      placeholder: "Enter Pickup Address or Airport Code",
                      "onUpdate:modelValue": ($event) => isRef(destination_location) ? destination_location.value = $event : null,
                      ref: "destinationLocation",
                      class: "w-full px-3 py-2 text-gray-500 placeholder-gray-400 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(destination_location)]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QInput, {
                          "hide-bottom-space": "",
                          modelValue: unref(pickup_date),
                          "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                          mask: "date",
                          rules: ["date"],
                          outlined: "",
                          dense: "",
                          square: "",
                          "stack-label": "",
                          label: "Pick Up Date:",
                          "bg-color": "white",
                          "lazy-rules": "ondemand",
                          name: "pickup_date",
                          required: ""
                        }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_QIcon, {
                                name: "event",
                                class: "cursor-pointer"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_QPopupProxy, {
                                      cover: "",
                                      "transition-show": "scale",
                                      "transition-hide": "scale",
                                      modelValue: showDatePopup.value,
                                      "onUpdate:modelValue": ($event) => showDatePopup.value = $event
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_QDate, {
                                            name: "pickup_date",
                                            id: "pickup_date",
                                            modelValue: unref(pickup_date),
                                            "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                                            required: "",
                                            rules: ["date"]
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="items-center justify-end row"${_scopeId7}>`);
                                                _push8(ssrRenderComponent(_component_q_btn, mergeProps({
                                                  label: "Close",
                                                  color: "primary",
                                                  flat: ""
                                                }, ssrGetDirectiveProps(_ctx, _directive_close_popup)), null, _parent8, _scopeId7));
                                                _push8(`</div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "items-center justify-end row" }, [
                                                    withDirectives(createVNode(_component_q_btn, {
                                                      label: "Close",
                                                      color: "primary",
                                                      flat: ""
                                                    }, null, 512), [
                                                      [_directive_close_popup]
                                                    ])
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_QDate, {
                                              name: "pickup_date",
                                              id: "pickup_date",
                                              modelValue: unref(pickup_date),
                                              "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                                              required: "",
                                              rules: ["date"]
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "items-center justify-end row" }, [
                                                  withDirectives(createVNode(_component_q_btn, {
                                                    label: "Close",
                                                    color: "primary",
                                                    flat: ""
                                                  }, null, 512), [
                                                    [_directive_close_popup]
                                                  ])
                                                ])
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_QPopupProxy, {
                                        cover: "",
                                        "transition-show": "scale",
                                        "transition-hide": "scale",
                                        modelValue: showDatePopup.value,
                                        "onUpdate:modelValue": ($event) => showDatePopup.value = $event
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_QDate, {
                                            name: "pickup_date",
                                            id: "pickup_date",
                                            modelValue: unref(pickup_date),
                                            "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                                            required: "",
                                            rules: ["date"]
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "items-center justify-end row" }, [
                                                withDirectives(createVNode(_component_q_btn, {
                                                  label: "Close",
                                                  color: "primary",
                                                  flat: ""
                                                }, null, 512), [
                                                  [_directive_close_popup]
                                                ])
                                              ])
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_QIcon, {
                                  name: "event",
                                  class: "cursor-pointer"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_QPopupProxy, {
                                      cover: "",
                                      "transition-show": "scale",
                                      "transition-hide": "scale",
                                      modelValue: showDatePopup.value,
                                      "onUpdate:modelValue": ($event) => showDatePopup.value = $event
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_QDate, {
                                          name: "pickup_date",
                                          id: "pickup_date",
                                          modelValue: unref(pickup_date),
                                          "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                                          required: "",
                                          rules: ["date"]
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "items-center justify-end row" }, [
                                              withDirectives(createVNode(_component_q_btn, {
                                                label: "Close",
                                                color: "primary",
                                                flat: ""
                                              }, null, 512), [
                                                [_directive_close_popup]
                                              ])
                                            ])
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QInput, {
                            "hide-bottom-space": "",
                            modelValue: unref(pickup_date),
                            "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                            mask: "date",
                            rules: ["date"],
                            outlined: "",
                            dense: "",
                            square: "",
                            "stack-label": "",
                            label: "Pick Up Date:",
                            "bg-color": "white",
                            "lazy-rules": "ondemand",
                            name: "pickup_date",
                            required: ""
                          }, {
                            append: withCtx(() => [
                              createVNode(_component_QIcon, {
                                name: "event",
                                class: "cursor-pointer"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_QPopupProxy, {
                                    cover: "",
                                    "transition-show": "scale",
                                    "transition-hide": "scale",
                                    modelValue: showDatePopup.value,
                                    "onUpdate:modelValue": ($event) => showDatePopup.value = $event
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_QDate, {
                                        name: "pickup_date",
                                        id: "pickup_date",
                                        modelValue: unref(pickup_date),
                                        "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                                        required: "",
                                        rules: ["date"]
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "items-center justify-end row" }, [
                                            withDirectives(createVNode(_component_q_btn, {
                                              label: "Close",
                                              color: "primary",
                                              flat: ""
                                            }, null, 512), [
                                              [_directive_close_popup]
                                            ])
                                          ])
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QInput, {
                          "hide-bottom-space": "",
                          modelValue: unref(pickup_time),
                          "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                          mask: "time",
                          rules: ["time"],
                          label: "Pickup Time:",
                          "lazy-rules": "ondemand",
                          dense: "",
                          square: "",
                          outlined: "",
                          name: "pickup_time",
                          "stack-label": "",
                          "bg-color": "white"
                        }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_QIcon, {
                                name: "access_time",
                                class: "cursor-pointer"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_QPopupProxy, {
                                      modelValue: showTimePopup.value,
                                      "onUpdate:modelValue": ($event) => showTimePopup.value = $event,
                                      cover: "",
                                      "transition-show": "scale",
                                      "transition-hide": "scale"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_QTime, {
                                            modelValue: unref(pickup_time),
                                            "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                                            name: "pickup_date",
                                            id: "pickup_date",
                                            required: "",
                                            rules: ["time"]
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="items-center justify-end row"${_scopeId7}>`);
                                                _push8(ssrRenderComponent(_component_q_btn, mergeProps({
                                                  label: "Close",
                                                  color: "primary",
                                                  flat: ""
                                                }, ssrGetDirectiveProps(_ctx, _directive_close_popup)), null, _parent8, _scopeId7));
                                                _push8(`</div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "items-center justify-end row" }, [
                                                    withDirectives(createVNode(_component_q_btn, {
                                                      label: "Close",
                                                      color: "primary",
                                                      flat: ""
                                                    }, null, 512), [
                                                      [_directive_close_popup]
                                                    ])
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_QTime, {
                                              modelValue: unref(pickup_time),
                                              "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                                              name: "pickup_date",
                                              id: "pickup_date",
                                              required: "",
                                              rules: ["time"]
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "items-center justify-end row" }, [
                                                  withDirectives(createVNode(_component_q_btn, {
                                                    label: "Close",
                                                    color: "primary",
                                                    flat: ""
                                                  }, null, 512), [
                                                    [_directive_close_popup]
                                                  ])
                                                ])
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_QPopupProxy, {
                                        modelValue: showTimePopup.value,
                                        "onUpdate:modelValue": ($event) => showTimePopup.value = $event,
                                        cover: "",
                                        "transition-show": "scale",
                                        "transition-hide": "scale"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_QTime, {
                                            modelValue: unref(pickup_time),
                                            "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                                            name: "pickup_date",
                                            id: "pickup_date",
                                            required: "",
                                            rules: ["time"]
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "items-center justify-end row" }, [
                                                withDirectives(createVNode(_component_q_btn, {
                                                  label: "Close",
                                                  color: "primary",
                                                  flat: ""
                                                }, null, 512), [
                                                  [_directive_close_popup]
                                                ])
                                              ])
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_QIcon, {
                                  name: "access_time",
                                  class: "cursor-pointer"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_QPopupProxy, {
                                      modelValue: showTimePopup.value,
                                      "onUpdate:modelValue": ($event) => showTimePopup.value = $event,
                                      cover: "",
                                      "transition-show": "scale",
                                      "transition-hide": "scale"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_QTime, {
                                          modelValue: unref(pickup_time),
                                          "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                                          name: "pickup_date",
                                          id: "pickup_date",
                                          required: "",
                                          rules: ["time"]
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "items-center justify-end row" }, [
                                              withDirectives(createVNode(_component_q_btn, {
                                                label: "Close",
                                                color: "primary",
                                                flat: ""
                                              }, null, 512), [
                                                [_directive_close_popup]
                                              ])
                                            ])
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QInput, {
                            "hide-bottom-space": "",
                            modelValue: unref(pickup_time),
                            "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                            mask: "time",
                            rules: ["time"],
                            label: "Pickup Time:",
                            "lazy-rules": "ondemand",
                            dense: "",
                            square: "",
                            outlined: "",
                            name: "pickup_time",
                            "stack-label": "",
                            "bg-color": "white"
                          }, {
                            append: withCtx(() => [
                              createVNode(_component_QIcon, {
                                name: "access_time",
                                class: "cursor-pointer"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_QPopupProxy, {
                                    modelValue: showTimePopup.value,
                                    "onUpdate:modelValue": ($event) => showTimePopup.value = $event,
                                    cover: "",
                                    "transition-show": "scale",
                                    "transition-hide": "scale"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_QTime, {
                                        modelValue: unref(pickup_time),
                                        "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                                        name: "pickup_date",
                                        id: "pickup_date",
                                        required: "",
                                        rules: ["time"]
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "items-center justify-end row" }, [
                                            withDirectives(createVNode(_component_q_btn, {
                                              label: "Close",
                                              color: "primary",
                                              flat: ""
                                            }, null, 512), [
                                              [_directive_close_popup]
                                            ])
                                          ])
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QInput, {
                          "hide-bottom-space": "",
                          modelValue: unref(pickup_date),
                          "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                          mask: "date",
                          rules: ["date"],
                          outlined: "",
                          dense: "",
                          square: "",
                          "stack-label": "",
                          label: "Pick Up Date:",
                          "bg-color": "white",
                          "lazy-rules": "ondemand",
                          name: "pickup_date",
                          required: ""
                        }, {
                          append: withCtx(() => [
                            createVNode(_component_QIcon, {
                              name: "event",
                              class: "cursor-pointer"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_QPopupProxy, {
                                  cover: "",
                                  "transition-show": "scale",
                                  "transition-hide": "scale",
                                  modelValue: showDatePopup.value,
                                  "onUpdate:modelValue": ($event) => showDatePopup.value = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_QDate, {
                                      name: "pickup_date",
                                      id: "pickup_date",
                                      modelValue: unref(pickup_date),
                                      "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                                      required: "",
                                      rules: ["date"]
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "items-center justify-end row" }, [
                                          withDirectives(createVNode(_component_q_btn, {
                                            label: "Close",
                                            color: "primary",
                                            flat: ""
                                          }, null, 512), [
                                            [_directive_close_popup]
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QInput, {
                          "hide-bottom-space": "",
                          modelValue: unref(pickup_time),
                          "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                          mask: "time",
                          rules: ["time"],
                          label: "Pickup Time:",
                          "lazy-rules": "ondemand",
                          dense: "",
                          square: "",
                          outlined: "",
                          name: "pickup_time",
                          "stack-label": "",
                          "bg-color": "white"
                        }, {
                          append: withCtx(() => [
                            createVNode(_component_QIcon, {
                              name: "access_time",
                              class: "cursor-pointer"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_QPopupProxy, {
                                  modelValue: showTimePopup.value,
                                  "onUpdate:modelValue": ($event) => showTimePopup.value = $event,
                                  cover: "",
                                  "transition-show": "scale",
                                  "transition-hide": "scale"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_QTime, {
                                      modelValue: unref(pickup_time),
                                      "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                                      name: "pickup_date",
                                      id: "pickup_date",
                                      required: "",
                                      rules: ["time"]
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "items-center justify-end row" }, [
                                          withDirectives(createVNode(_component_q_btn, {
                                            label: "Close",
                                            color: "primary",
                                            flat: ""
                                          }, null, 512), [
                                            [_directive_close_popup]
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QSelect, {
                          "hide-bottom-space": "",
                          modelValue: unref(service_type),
                          "onUpdate:modelValue": ($event) => isRef(service_type) ? service_type.value = $event : null,
                          for: "service-type",
                          id: "service-type",
                          name: "service_type",
                          dense: "",
                          label: "Service Type:",
                          "stack-label": "",
                          outlined: "",
                          square: "",
                          options: unref(serviceTypeOptions),
                          "bg-color": "white",
                          "lazy-rules": "",
                          rules: [(val) => !!val || "* Required"]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QSelect, {
                            "hide-bottom-space": "",
                            modelValue: unref(service_type),
                            "onUpdate:modelValue": ($event) => isRef(service_type) ? service_type.value = $event : null,
                            for: "service-type",
                            id: "service-type",
                            name: "service_type",
                            dense: "",
                            label: "Service Type:",
                            "stack-label": "",
                            outlined: "",
                            square: "",
                            options: unref(serviceTypeOptions),
                            "bg-color": "white",
                            "lazy-rules": "",
                            rules: [(val) => !!val || "* Required"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QSelect, {
                          "hide-bottom-space": "",
                          label: "Passengers:",
                          name: "num_passengers",
                          id: "num_passengers",
                          dense: "",
                          outlined: "",
                          square: "",
                          "stack-label": "",
                          modelValue: unref(num_passengers),
                          "onUpdate:modelValue": ($event) => isRef(num_passengers) ? num_passengers.value = $event : null,
                          options: unref(passengerOptions),
                          "bg-color": "white",
                          "lazy-rules": "",
                          "emit-value": "",
                          rules: [(val) => !!val || "* Required"]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QSelect, {
                            "hide-bottom-space": "",
                            label: "Passengers:",
                            name: "num_passengers",
                            id: "num_passengers",
                            dense: "",
                            outlined: "",
                            square: "",
                            "stack-label": "",
                            modelValue: unref(num_passengers),
                            "onUpdate:modelValue": ($event) => isRef(num_passengers) ? num_passengers.value = $event : null,
                            options: unref(passengerOptions),
                            "bg-color": "white",
                            "lazy-rules": "",
                            "emit-value": "",
                            rules: [(val) => !!val || "* Required"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QSelect, {
                          "hide-bottom-space": "",
                          modelValue: unref(service_type),
                          "onUpdate:modelValue": ($event) => isRef(service_type) ? service_type.value = $event : null,
                          for: "service-type",
                          id: "service-type",
                          name: "service_type",
                          dense: "",
                          label: "Service Type:",
                          "stack-label": "",
                          outlined: "",
                          square: "",
                          options: unref(serviceTypeOptions),
                          "bg-color": "white",
                          "lazy-rules": "",
                          rules: [(val) => !!val || "* Required"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QSelect, {
                          "hide-bottom-space": "",
                          label: "Passengers:",
                          name: "num_passengers",
                          id: "num_passengers",
                          dense: "",
                          outlined: "",
                          square: "",
                          "stack-label": "",
                          modelValue: unref(num_passengers),
                          "onUpdate:modelValue": ($event) => isRef(num_passengers) ? num_passengers.value = $event : null,
                          options: unref(passengerOptions),
                          "bg-color": "white",
                          "lazy-rules": "",
                          "emit-value": "",
                          rules: [(val) => !!val || "* Required"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QSelect, {
                          "hide-bottom-space": "",
                          modelValue: unref(vehicleType),
                          "onUpdate:modelValue": ($event) => isRef(vehicleType) ? vehicleType.value = $event : null,
                          class: "text-gray-500",
                          label: "Vehicle Type",
                          options: unref(vehicleTypeOptions),
                          dense: "",
                          name: "vehicle_type",
                          outlined: "",
                          square: "",
                          "stack-label": "",
                          "bg-color": "white",
                          "lazy-rules": "ondemand",
                          rules: [(val) => !!val || "* Required"]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QSelect, {
                            "hide-bottom-space": "",
                            modelValue: unref(vehicleType),
                            "onUpdate:modelValue": ($event) => isRef(vehicleType) ? vehicleType.value = $event : null,
                            class: "text-gray-500",
                            label: "Vehicle Type",
                            options: unref(vehicleTypeOptions),
                            dense: "",
                            name: "vehicle_type",
                            outlined: "",
                            square: "",
                            "stack-label": "",
                            "bg-color": "white",
                            "lazy-rules": "ondemand",
                            rules: [(val) => !!val || "* Required"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QSelect, {
                          "hide-bottom-space": "",
                          name: "number_of_hours",
                          id: "num_hours",
                          label: "Number Of Hours:",
                          modelValue: unref(numberOfHours),
                          "onUpdate:modelValue": ($event) => isRef(numberOfHours) ? numberOfHours.value = $event : null,
                          options: unref(hoursRequiredOptions),
                          outlined: "",
                          square: "",
                          dense: "",
                          "stack-label": "",
                          disable: !unref(isItHourly),
                          "bg-color": "white",
                          "lazy-rules": "ondemand",
                          "emit-value": "",
                          rules: [(val) => !!val || "* Required"]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QSelect, {
                            "hide-bottom-space": "",
                            name: "number_of_hours",
                            id: "num_hours",
                            label: "Number Of Hours:",
                            modelValue: unref(numberOfHours),
                            "onUpdate:modelValue": ($event) => isRef(numberOfHours) ? numberOfHours.value = $event : null,
                            options: unref(hoursRequiredOptions),
                            outlined: "",
                            square: "",
                            dense: "",
                            "stack-label": "",
                            disable: !unref(isItHourly),
                            "bg-color": "white",
                            "lazy-rules": "ondemand",
                            "emit-value": "",
                            rules: [(val) => !!val || "* Required"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disable", "rules"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QSelect, {
                          "hide-bottom-space": "",
                          modelValue: unref(vehicleType),
                          "onUpdate:modelValue": ($event) => isRef(vehicleType) ? vehicleType.value = $event : null,
                          class: "text-gray-500",
                          label: "Vehicle Type",
                          options: unref(vehicleTypeOptions),
                          dense: "",
                          name: "vehicle_type",
                          outlined: "",
                          square: "",
                          "stack-label": "",
                          "bg-color": "white",
                          "lazy-rules": "ondemand",
                          rules: [(val) => !!val || "* Required"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QSelect, {
                          "hide-bottom-space": "",
                          name: "number_of_hours",
                          id: "num_hours",
                          label: "Number Of Hours:",
                          modelValue: unref(numberOfHours),
                          "onUpdate:modelValue": ($event) => isRef(numberOfHours) ? numberOfHours.value = $event : null,
                          options: unref(hoursRequiredOptions),
                          outlined: "",
                          square: "",
                          dense: "",
                          "stack-label": "",
                          disable: !unref(isItHourly),
                          "bg-color": "white",
                          "lazy-rules": "ondemand",
                          "emit-value": "",
                          rules: [(val) => !!val || "* Required"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disable", "rules"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QInput, {
                          "hide-bottom-space": "",
                          type: "text",
                          name: "first_name",
                          id: "first_name",
                          modelValue: unref(first_name),
                          "onUpdate:modelValue": ($event) => isRef(first_name) ? first_name.value = $event : null,
                          label: "First Name:",
                          outlined: "",
                          square: "",
                          dense: "",
                          "stack-label": "",
                          "lazy-rules": "",
                          "bg-color": "white",
                          rules: [(val) => !!val || "* Required"]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QInput, {
                            "hide-bottom-space": "",
                            type: "text",
                            name: "first_name",
                            id: "first_name",
                            modelValue: unref(first_name),
                            "onUpdate:modelValue": ($event) => isRef(first_name) ? first_name.value = $event : null,
                            label: "First Name:",
                            outlined: "",
                            square: "",
                            dense: "",
                            "stack-label": "",
                            "lazy-rules": "",
                            "bg-color": "white",
                            rules: [(val) => !!val || "* Required"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QInput, {
                          "hide-bottom-space": "",
                          type: "text",
                          name: "last_name",
                          id: "last_name",
                          label: "Last Name:",
                          dense: "",
                          outlined: "",
                          square: "",
                          "stack-label": "",
                          modelValue: unref(last_name),
                          "onUpdate:modelValue": ($event) => isRef(last_name) ? last_name.value = $event : null,
                          "lazy-rules": "",
                          rules: [(val) => !!val || "* Required"],
                          "bg-color": "white"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QInput, {
                            "hide-bottom-space": "",
                            type: "text",
                            name: "last_name",
                            id: "last_name",
                            label: "Last Name:",
                            dense: "",
                            outlined: "",
                            square: "",
                            "stack-label": "",
                            modelValue: unref(last_name),
                            "onUpdate:modelValue": ($event) => isRef(last_name) ? last_name.value = $event : null,
                            "lazy-rules": "",
                            rules: [(val) => !!val || "* Required"],
                            "bg-color": "white"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QInput, {
                          "hide-bottom-space": "",
                          type: "text",
                          name: "first_name",
                          id: "first_name",
                          modelValue: unref(first_name),
                          "onUpdate:modelValue": ($event) => isRef(first_name) ? first_name.value = $event : null,
                          label: "First Name:",
                          outlined: "",
                          square: "",
                          dense: "",
                          "stack-label": "",
                          "lazy-rules": "",
                          "bg-color": "white",
                          rules: [(val) => !!val || "* Required"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QInput, {
                          "hide-bottom-space": "",
                          type: "text",
                          name: "last_name",
                          id: "last_name",
                          label: "Last Name:",
                          dense: "",
                          outlined: "",
                          square: "",
                          "stack-label": "",
                          modelValue: unref(last_name),
                          "onUpdate:modelValue": ($event) => isRef(last_name) ? last_name.value = $event : null,
                          "lazy-rules": "",
                          rules: [(val) => !!val || "* Required"],
                          "bg-color": "white"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_QInput, {
                          "hide-bottom-space": "",
                          type: "email",
                          name: "email_address",
                          id: "email",
                          label: "Email Address:",
                          modelValue: unref(email_address),
                          "onUpdate:modelValue": ($event) => isRef(email_address) ? email_address.value = $event : null,
                          dense: "",
                          outlined: "",
                          square: "",
                          "stack-label": "",
                          "lazy-rules": "",
                          rules: ["email"],
                          "bg-color": "white",
                          required: "",
                          autocomplete: false
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_QInput, {
                            "hide-bottom-space": "",
                            type: "email",
                            name: "email_address",
                            id: "email",
                            label: "Email Address:",
                            modelValue: unref(email_address),
                            "onUpdate:modelValue": ($event) => isRef(email_address) ? email_address.value = $event : null,
                            dense: "",
                            outlined: "",
                            square: "",
                            "stack-label": "",
                            "lazy-rules": "",
                            rules: ["email"],
                            "bg-color": "white",
                            required: "",
                            autocomplete: false
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_QCardSection, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(VueTelInput), {
                          modelValue: unref(phone_number),
                          "onUpdate:modelValue": ($event) => isRef(phone_number) ? phone_number.value = $event : null,
                          mode: "international",
                          inputOptions: {
                            placeholder: "Phone Number",
                            showDialCode: true,
                            required: true,
                            invalidMsg: "Please enter a valid phone number",
                            name: "phone_number"
                          },
                          class: "w-full",
                          required: "",
                          name: "phone_number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(VueTelInput), {
                            modelValue: unref(phone_number),
                            "onUpdate:modelValue": ($event) => isRef(phone_number) ? phone_number.value = $event : null,
                            mode: "international",
                            inputOptions: {
                              placeholder: "Phone Number",
                              showDialCode: true,
                              required: true,
                              invalidMsg: "Please enter a valid phone number",
                              name: "phone_number"
                            },
                            class: "w-full",
                            required: "",
                            name: "phone_number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_QInput, {
                          "hide-bottom-space": "",
                          type: "email",
                          name: "email_address",
                          id: "email",
                          label: "Email Address:",
                          modelValue: unref(email_address),
                          "onUpdate:modelValue": ($event) => isRef(email_address) ? email_address.value = $event : null,
                          dense: "",
                          outlined: "",
                          square: "",
                          "stack-label": "",
                          "lazy-rules": "",
                          rules: ["email"],
                          "bg-color": "white",
                          required: "",
                          autocomplete: false
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_QCardSection, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(unref(VueTelInput), {
                          modelValue: unref(phone_number),
                          "onUpdate:modelValue": ($event) => isRef(phone_number) ? phone_number.value = $event : null,
                          mode: "international",
                          inputOptions: {
                            placeholder: "Phone Number",
                            showDialCode: true,
                            required: true,
                            invalidMsg: "Please enter a valid phone number",
                            name: "phone_number"
                          },
                          class: "w-full",
                          required: "",
                          name: "phone_number"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, {
              style: { display: "none" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_QCheckbox, {
                    name: "round_trip",
                    id: "round_trip",
                    class: "text=white",
                    label: "Round Trip",
                    modelValue: unref(is_round_trip),
                    "onUpdate:modelValue": ($event) => isRef(is_round_trip) ? is_round_trip.value = $event : null,
                    color: "primary"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_QCheckbox, {
                      name: "round_trip",
                      id: "round_trip",
                      class: "text=white",
                      label: "Round Trip",
                      modelValue: unref(is_round_trip),
                      "onUpdate:modelValue": ($event) => isRef(is_round_trip) ? is_round_trip.value = $event : null,
                      color: "primary"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardActions, {
              align: "around",
              id: "submit_button_wrapper"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_QBtn, {
                    id: "submit_button",
                    type: "submit",
                    label: "Get Prices & Availability",
                    color: "red-8",
                    loading: unref(loading)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_QBtn, {
                      id: "submit_button",
                      type: "submit",
                      label: "Get Prices & Availability",
                      color: "red-8",
                      loading: unref(loading)
                    }, null, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QCardSection, {
              flat: "",
              class: "w-full h-full",
              style: { display: "none" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div id="my-map"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      ref_key: "myMap",
                      ref: myMap,
                      id: "my-map"
                    }, null, 512)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_QCardSection, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-center text-white uppercase text-h5" }, "Instant Quote")
                ]),
                _: 1
              }),
              createVNode(_component_QCardSection, null, {
                default: withCtx(() => [
                  withDirectives(createVNode("input", {
                    type: "text",
                    id: "origin-input",
                    name: "origin_input",
                    placeholder: "Enter Pickup Address or Airport Code",
                    "onUpdate:modelValue": ($event) => isRef(origin_location) ? origin_location.value = $event : null,
                    ref: "originLocation",
                    class: "w-full px-3 py-2 text-gray-500 placeholder-gray-400 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(origin_location)]
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_QCardSection, null, {
                default: withCtx(() => [
                  withDirectives(createVNode("input", {
                    type: "text",
                    required: "",
                    id: "destination-input",
                    name: "destination_input",
                    placeholder: "Enter Pickup Address or Airport Code",
                    "onUpdate:modelValue": ($event) => isRef(destination_location) ? destination_location.value = $event : null,
                    ref: "destinationLocation",
                    class: "w-full px-3 py-2 text-gray-500 placeholder-gray-400 bg-white focus:border-primary focus:outline-primary focus:ring-primary/90"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(destination_location)]
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
                default: withCtx(() => [
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QInput, {
                        "hide-bottom-space": "",
                        modelValue: unref(pickup_date),
                        "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                        mask: "date",
                        rules: ["date"],
                        outlined: "",
                        dense: "",
                        square: "",
                        "stack-label": "",
                        label: "Pick Up Date:",
                        "bg-color": "white",
                        "lazy-rules": "ondemand",
                        name: "pickup_date",
                        required: ""
                      }, {
                        append: withCtx(() => [
                          createVNode(_component_QIcon, {
                            name: "event",
                            class: "cursor-pointer"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_QPopupProxy, {
                                cover: "",
                                "transition-show": "scale",
                                "transition-hide": "scale",
                                modelValue: showDatePopup.value,
                                "onUpdate:modelValue": ($event) => showDatePopup.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_QDate, {
                                    name: "pickup_date",
                                    id: "pickup_date",
                                    modelValue: unref(pickup_date),
                                    "onUpdate:modelValue": ($event) => isRef(pickup_date) ? pickup_date.value = $event : null,
                                    required: "",
                                    rules: ["date"]
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "items-center justify-end row" }, [
                                        withDirectives(createVNode(_component_q_btn, {
                                          label: "Close",
                                          color: "primary",
                                          flat: ""
                                        }, null, 512), [
                                          [_directive_close_popup]
                                        ])
                                      ])
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QInput, {
                        "hide-bottom-space": "",
                        modelValue: unref(pickup_time),
                        "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                        mask: "time",
                        rules: ["time"],
                        label: "Pickup Time:",
                        "lazy-rules": "ondemand",
                        dense: "",
                        square: "",
                        outlined: "",
                        name: "pickup_time",
                        "stack-label": "",
                        "bg-color": "white"
                      }, {
                        append: withCtx(() => [
                          createVNode(_component_QIcon, {
                            name: "access_time",
                            class: "cursor-pointer"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_QPopupProxy, {
                                modelValue: showTimePopup.value,
                                "onUpdate:modelValue": ($event) => showTimePopup.value = $event,
                                cover: "",
                                "transition-show": "scale",
                                "transition-hide": "scale"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_QTime, {
                                    modelValue: unref(pickup_time),
                                    "onUpdate:modelValue": ($event) => isRef(pickup_time) ? pickup_time.value = $event : null,
                                    name: "pickup_date",
                                    id: "pickup_date",
                                    required: "",
                                    rules: ["time"]
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "items-center justify-end row" }, [
                                        withDirectives(createVNode(_component_q_btn, {
                                          label: "Close",
                                          color: "primary",
                                          flat: ""
                                        }, null, 512), [
                                          [_directive_close_popup]
                                        ])
                                      ])
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
                default: withCtx(() => [
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QSelect, {
                        "hide-bottom-space": "",
                        modelValue: unref(service_type),
                        "onUpdate:modelValue": ($event) => isRef(service_type) ? service_type.value = $event : null,
                        for: "service-type",
                        id: "service-type",
                        name: "service_type",
                        dense: "",
                        label: "Service Type:",
                        "stack-label": "",
                        outlined: "",
                        square: "",
                        options: unref(serviceTypeOptions),
                        "bg-color": "white",
                        "lazy-rules": "",
                        rules: [(val) => !!val || "* Required"]
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QSelect, {
                        "hide-bottom-space": "",
                        label: "Passengers:",
                        name: "num_passengers",
                        id: "num_passengers",
                        dense: "",
                        outlined: "",
                        square: "",
                        "stack-label": "",
                        modelValue: unref(num_passengers),
                        "onUpdate:modelValue": ($event) => isRef(num_passengers) ? num_passengers.value = $event : null,
                        options: unref(passengerOptions),
                        "bg-color": "white",
                        "lazy-rules": "",
                        "emit-value": "",
                        rules: [(val) => !!val || "* Required"]
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
                default: withCtx(() => [
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QSelect, {
                        "hide-bottom-space": "",
                        modelValue: unref(vehicleType),
                        "onUpdate:modelValue": ($event) => isRef(vehicleType) ? vehicleType.value = $event : null,
                        class: "text-gray-500",
                        label: "Vehicle Type",
                        options: unref(vehicleTypeOptions),
                        dense: "",
                        name: "vehicle_type",
                        outlined: "",
                        square: "",
                        "stack-label": "",
                        "bg-color": "white",
                        "lazy-rules": "ondemand",
                        rules: [(val) => !!val || "* Required"]
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "rules"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QSelect, {
                        "hide-bottom-space": "",
                        name: "number_of_hours",
                        id: "num_hours",
                        label: "Number Of Hours:",
                        modelValue: unref(numberOfHours),
                        "onUpdate:modelValue": ($event) => isRef(numberOfHours) ? numberOfHours.value = $event : null,
                        options: unref(hoursRequiredOptions),
                        outlined: "",
                        square: "",
                        dense: "",
                        "stack-label": "",
                        disable: !unref(isItHourly),
                        "bg-color": "white",
                        "lazy-rules": "ondemand",
                        "emit-value": "",
                        rules: [(val) => !!val || "* Required"]
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disable", "rules"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
                default: withCtx(() => [
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QInput, {
                        "hide-bottom-space": "",
                        type: "text",
                        name: "first_name",
                        id: "first_name",
                        modelValue: unref(first_name),
                        "onUpdate:modelValue": ($event) => isRef(first_name) ? first_name.value = $event : null,
                        label: "First Name:",
                        outlined: "",
                        square: "",
                        dense: "",
                        "stack-label": "",
                        "lazy-rules": "",
                        "bg-color": "white",
                        rules: [(val) => !!val || "* Required"]
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QInput, {
                        "hide-bottom-space": "",
                        type: "text",
                        name: "last_name",
                        id: "last_name",
                        label: "Last Name:",
                        dense: "",
                        outlined: "",
                        square: "",
                        "stack-label": "",
                        modelValue: unref(last_name),
                        "onUpdate:modelValue": ($event) => isRef(last_name) ? last_name.value = $event : null,
                        "lazy-rules": "",
                        rules: [(val) => !!val || "* Required"],
                        "bg-color": "white"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_QCardSection, { class: "flex flex-col xs:flex-row q-pa-none" }, {
                default: withCtx(() => [
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_QInput, {
                        "hide-bottom-space": "",
                        type: "email",
                        name: "email_address",
                        id: "email",
                        label: "Email Address:",
                        modelValue: unref(email_address),
                        "onUpdate:modelValue": ($event) => isRef(email_address) ? email_address.value = $event : null,
                        dense: "",
                        outlined: "",
                        square: "",
                        "stack-label": "",
                        "lazy-rules": "",
                        rules: ["email"],
                        "bg-color": "white",
                        required: "",
                        autocomplete: false
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_QCardSection, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(unref(VueTelInput), {
                        modelValue: unref(phone_number),
                        "onUpdate:modelValue": ($event) => isRef(phone_number) ? phone_number.value = $event : null,
                        mode: "international",
                        inputOptions: {
                          placeholder: "Phone Number",
                          showDialCode: true,
                          required: true,
                          invalidMsg: "Please enter a valid phone number",
                          name: "phone_number"
                        },
                        class: "w-full",
                        required: "",
                        name: "phone_number"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              withDirectives(createVNode(_component_QCardSection, null, {
                default: withCtx(() => [
                  createVNode(_component_QCheckbox, {
                    name: "round_trip",
                    id: "round_trip",
                    class: "text=white",
                    label: "Round Trip",
                    modelValue: unref(is_round_trip),
                    "onUpdate:modelValue": ($event) => isRef(is_round_trip) ? is_round_trip.value = $event : null,
                    color: "primary"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 512), [
                [vShow, false]
              ]),
              createVNode(_component_QCardActions, {
                align: "around",
                id: "submit_button_wrapper"
              }, {
                default: withCtx(() => [
                  createVNode(_component_QBtn, {
                    id: "submit_button",
                    type: "submit",
                    label: "Get Prices & Availability",
                    color: "red-8",
                    loading: unref(loading)
                  }, null, 8, ["loading"])
                ]),
                _: 1
              }),
              withDirectives(createVNode(_component_QCardSection, {
                flat: "",
                class: "w-full h-full"
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    ref_key: "myMap",
                    ref: myMap,
                    id: "my-map"
                  }, null, 512)
                ]),
                _: 1
              }, 512), [
                [vShow, false]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuasarForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const meta$1 = void 0;
const QCard = createComponent({
  name: "QCard",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => "q-card" + (isDark.value === true ? " q-card--dark q-dark" : "") + (props.bordered === true ? " q-card--bordered" : "") + (props.square === true ? " q-card--square no-border-radius" : "") + (props.flat === true ? " q-card--flat no-shadow" : "")
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
const QAvatar = createComponent({
  name: "QAvatar",
  props: {
    ...useSizeProps,
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-avatar" + (props.color ? ` bg-${props.color}` : "") + (props.textColor ? ` text-${props.textColor} q-chip--colored` : "") + (props.square === true ? " q-avatar--square" : props.rounded === true ? " rounded-borders" : "")
    );
    const contentStyle = computed(() => props.fontSize ? { fontSize: props.fontSize } : null);
    return () => {
      const icon = props.icon !== void 0 ? [h(QIcon, { name: props.icon })] : void 0;
      return h("div", {
        class: classes.value,
        style: sizeStyle.value
      }, [
        h("div", {
          class: "q-avatar__content row flex-center overflow-hidden",
          style: contentStyle.value
        }, hMergeSlotSafely(slots.default, icon))
      ]);
    };
  }
});
const insetMap = {
  true: "inset",
  item: "item-inset",
  "item-thumbnail": "item-thumbnail-inset"
};
const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};
const QSeparator = createComponent({
  name: "QSeparator",
  props: {
    ...useDarkProps,
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String
  },
  setup(props) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const orientation = computed(() => props.vertical === true ? "vertical" : "horizontal");
    const orientClass = computed(() => ` q-separator--${orientation.value}`);
    const insetClass = computed(() => props.inset !== false ? `${orientClass.value}-${insetMap[props.inset]}` : "");
    const classes = computed(
      () => `q-separator${orientClass.value}${insetClass.value}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (isDark.value === true ? " q-separator--dark" : "")
    );
    const style = computed(() => {
      const acc = {};
      if (props.size !== void 0) {
        acc[props.vertical === true ? "width" : "height"] = props.size;
      }
      if (props.spaced !== false) {
        const size2 = props.spaced === true ? `${margins.md}px` : props.spaced in margins ? `${margins[props.spaced]}px` : props.spaced;
        const dir = props.vertical === true ? ["Left", "Right"] : ["Top", "Bottom"];
        acc[`margin${dir[0]}`] = acc[`margin${dir[1]}`] = size2;
      }
      return acc;
    });
    return () => h("hr", {
      class: classes.value,
      style: style.value,
      "aria-orientation": orientation.value
    });
  }
});
const __nuxt_component_7 = createComponent({
  name: "QTimeline",
  props: {
    ...useDarkProps,
    color: {
      type: String,
      default: "primary"
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v)
    },
    layout: {
      type: String,
      default: "dense",
      validator: (v) => ["dense", "comfortable", "loose"].includes(v)
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    provide(timelineKey, props);
    const classes = computed(
      () => `q-timeline q-timeline--${props.layout} q-timeline--${props.layout}--${props.side}` + (isDark.value === true ? " q-timeline--dark" : "")
    );
    return () => h("ul", { class: classes.value }, hSlot(slots.default));
  }
});
const __nuxt_component_8 = createComponent({
  name: "QTimelineEntry",
  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: "h3"
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v)
    },
    icon: String,
    avatar: String,
    color: String,
    title: String,
    subtitle: String,
    body: String
  },
  setup(props, { slots }) {
    const $timeline = inject(timelineKey, () => {
      console.error("QTimelineEntry needs to be child of QTimeline");
    });
    const classes = computed(
      () => `q-timeline__entry q-timeline__entry--${props.side}` + (props.icon !== void 0 || props.avatar !== void 0 ? " q-timeline__entry--icon" : "")
    );
    const dotClass = computed(
      () => `q-timeline__dot text-${props.color || $timeline.color}`
    );
    const reverse = computed(
      () => $timeline.layout === "comfortable" && $timeline.side === "left"
    );
    return () => {
      const child = hUniqueSlot(slots.default, []);
      if (props.body !== void 0) {
        child.unshift(props.body);
      }
      if (props.heading === true) {
        const content2 = [
          h("div"),
          h("div"),
          h(
            props.tag,
            { class: "q-timeline__heading-title" },
            child
          )
        ];
        return h("div", {
          class: "q-timeline__heading"
        }, reverse.value === true ? content2.reverse() : content2);
      }
      let dot;
      if (props.icon !== void 0) {
        dot = [
          h(QIcon, {
            class: "row items-center justify-center",
            name: props.icon
          })
        ];
      } else if (props.avatar !== void 0) {
        dot = [
          h("img", {
            class: "q-timeline__dot-img",
            src: props.avatar
          })
        ];
      }
      const content = [
        h("div", { class: "q-timeline__subtitle" }, [
          h("span", {}, hSlot(slots.subtitle, [props.subtitle]))
        ]),
        h("div", { class: dotClass.value }, dot),
        h("div", { class: "q-timeline__content" }, [
          h("h6", { class: "q-timeline__title" }, hSlot(slots.title, [props.title]))
        ].concat(child))
      ];
      return h("li", {
        class: classes.value
      }, reverse.value === true ? content.reverse() : content);
    };
  }
});
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 16 / 9;
const __nuxt_component_9 = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    let loadTimer;
    const images = [
      ref(null),
      ref(props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null)
    ];
    const position2 = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    watch(() => getCurrentSrc(), addImage);
    function getCurrentSrc() {
      return props.src || props.srcset || props.sizes ? {
        src: props.src,
        srcset: props.srcset,
        sizes: props.sizes
      } : null;
    }
    function addImage(imgProps) {
      clearTimeout(loadTimer);
      hasError.value = false;
      if (imgProps === null) {
        isLoading.value = false;
        images[0].value = null;
        images[1].value = null;
        return;
      }
      isLoading.value = true;
      images[position2.value].value = imgProps;
    }
    function onLoad({ target }) {
      if (loadTimer === null) {
        return;
      }
      clearTimeout(loadTimer);
      naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
      waitForCompleteness(target, 1);
    }
    function waitForCompleteness(target, count) {
      if (loadTimer === null || count === 1e3) {
        return;
      }
      if (target.complete === true) {
        onReady(target);
      } else {
        loadTimer = setTimeout(() => {
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(img) {
      if (loadTimer === null) {
        return;
      }
      position2.value = position2.value === 1 ? 0 : 1;
      images[position2.value].value = null;
      isLoading.value = false;
      hasError.value = false;
      emit("load", img.currentSrc || img.src);
    }
    function onError(err) {
      clearTimeout(loadTimer);
      isLoading.value = false;
      hasError.value = true;
      images[0].value = null;
      images[1].value = null;
      emit("error", err);
    }
    function getContainer(key, child) {
      return h(
        "div",
        { class: "q-img__container absolute-full", key },
        child
      );
    }
    function getImage(index2) {
      const img = images[index2].value;
      const data = {
        key: "img_" + index2,
        class: imgClass.value,
        style: imgStyle.value,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position2.value === index2) {
        data.class += " q-img__image--waiting";
        Object.assign(data, { onLoad, onError });
      } else {
        data.class += " q-img__image--loaded";
      }
      return getContainer("img" + index2, h("img", data));
    }
    function getContent() {
      if (isLoading.value !== true) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (hasError.value !== true) {
        if (images[0].value !== null) {
          content.push(getImage(0));
        }
        if (images[1].value !== null) {
          content.push(getImage(1));
        }
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "QuotedCard",
  __ssrInlineRender: true,
  props: {
    serviceType: {
      default: "Point To Point",
      type: String
    },
    vehicleType: {
      default: "Standard Sedan",
      type: String
    },
    totalCost: {
      default: 0,
      type: Number
    },
    fullName: {
      default: "",
      type: String
    },
    vehicleImage: {
      default: "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8c7c6a8d-06ad-4278-1c70-9d497b1cb200/1024",
      type: String
    },
    originLocation: {
      default: "",
      type: String
    },
    destinationLocation: {
      default: "",
      type: String
    },
    pickupDate: {
      default: "",
      type: String
    }
  },
  setup(__props) {
    const router = useRouter();
    const navigateHome = () => {
      router.push("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_card = QCard;
      const _component_q_card_section = QCardSection;
      const _component_q_item = QItem;
      const _component_q_item_section = QItemSection;
      const _component_q_avatar = QAvatar;
      const _component_q_item_label = __nuxt_component_5;
      const _component_q_separator = QSeparator;
      const _component_q_timeline = __nuxt_component_7;
      const _component_q_timeline_entry = __nuxt_component_8;
      const _component_q_img = __nuxt_component_9;
      const _component_q_card_actions = QCardActions;
      const _component_q_btn = QBtn;
      _push(ssrRenderComponent(_component_q_card, mergeProps({ class: "max-w-xl mx-auto q-pa-sm" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card_section, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_avatar, { size: "4rem" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<img src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/041ea32d-630c-4f0c-a2ba-0c0c8f7d5f00/640" alt="Luxury Ride Service"${_scopeId5}>`);
                                  } else {
                                    return [
                                      createVNode("img", {
                                        src: "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/041ea32d-630c-4f0c-a2ba-0c0c8f7d5f00/640",
                                        alt: "Luxury Ride Service"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_avatar, { size: "4rem" }, {
                                  default: withCtx(() => [
                                    createVNode("img", {
                                      src: "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/041ea32d-630c-4f0c-a2ba-0c0c8f7d5f00/640",
                                      alt: "Luxury Ride Service"
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_q_item_section, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_item_label, { class: "text-h6" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Luxury Ride Service Inc.`);
                                  } else {
                                    return [
                                      createTextVNode("Luxury Ride Service Inc.")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_item_label, { class: "text-h6" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Luxury Ride Service Inc.")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_item_section, { avatar: "" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_avatar, { size: "4rem" }, {
                                default: withCtx(() => [
                                  createVNode("img", {
                                    src: "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/041ea32d-630c-4f0c-a2ba-0c0c8f7d5f00/640",
                                    alt: "Luxury Ride Service"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_item_section, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_item_label, { class: "text-h6" }, {
                                default: withCtx(() => [
                                  createTextVNode("Luxury Ride Service Inc.")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_q_item_section, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_avatar, { size: "4rem" }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/041ea32d-630c-4f0c-a2ba-0c0c8f7d5f00/640",
                                  alt: "Luxury Ride Service"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_item_section, null, {
                          default: withCtx(() => [
                            createVNode(_component_q_item_label, { class: "text-h6" }, {
                              default: withCtx(() => [
                                createTextVNode("Luxury Ride Service Inc.")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_separator, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card_section, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-h6"${_scopeId2}> Custom Quote For: <span class="font-bold text-h5"${_scopeId2}>${ssrInterpolate(__props.fullName)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-h6" }, [
                      createTextVNode(" Custom Quote For: "),
                      createVNode("span", { class: "font-bold text-h5" }, toDisplayString(__props.fullName), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card_section, { horizontal: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_timeline, { color: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_timeline_entry, { heading: "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Trip Details`);
                                  } else {
                                    return [
                                      createTextVNode(" Trip Details")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_timeline_entry, {
                                title: "Pickup",
                                subtitle: __props.pickupDate,
                                icon: "mdi-map-marker-radius",
                                body: __props.originLocation
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_q_timeline_entry, {
                                title: "Drop Off",
                                subtitle: __props.pickupDate,
                                icon: "mdi-map-marker-radius-outline",
                                body: __props.destinationLocation
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_timeline_entry, { heading: "" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Trip Details")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_q_timeline_entry, {
                                  title: "Pickup",
                                  subtitle: __props.pickupDate,
                                  icon: "mdi-map-marker-radius",
                                  body: __props.originLocation
                                }, null, 8, ["subtitle", "body"]),
                                createVNode(_component_q_timeline_entry, {
                                  title: "Drop Off",
                                  subtitle: __props.pickupDate,
                                  icon: "mdi-map-marker-radius-outline",
                                  body: __props.destinationLocation
                                }, null, 8, ["subtitle", "body"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_timeline, { color: "primary" }, {
                            default: withCtx(() => [
                              createVNode(_component_q_timeline_entry, { heading: "" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Trip Details")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_timeline_entry, {
                                title: "Pickup",
                                subtitle: __props.pickupDate,
                                icon: "mdi-map-marker-radius",
                                body: __props.originLocation
                              }, null, 8, ["subtitle", "body"]),
                              createVNode(_component_q_timeline_entry, {
                                title: "Drop Off",
                                subtitle: __props.pickupDate,
                                icon: "mdi-map-marker-radius-outline",
                                body: __props.destinationLocation
                              }, null, 8, ["subtitle", "body"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_card_section, { class: "col" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_img, {
                          src: __props.vehicleImage,
                          alt: "Vehicle Image"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="font-bold text-center text-h5"${_scopeId3}>${ssrInterpolate(__props.vehicleType)}</div>`);
                      } else {
                        return [
                          createVNode(_component_q_img, {
                            src: __props.vehicleImage,
                            alt: "Vehicle Image"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "font-bold text-center text-h5" }, toDisplayString(__props.vehicleType), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_q_timeline, { color: "primary" }, {
                          default: withCtx(() => [
                            createVNode(_component_q_timeline_entry, { heading: "" }, {
                              default: withCtx(() => [
                                createTextVNode(" Trip Details")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_timeline_entry, {
                              title: "Pickup",
                              subtitle: __props.pickupDate,
                              icon: "mdi-map-marker-radius",
                              body: __props.originLocation
                            }, null, 8, ["subtitle", "body"]),
                            createVNode(_component_q_timeline_entry, {
                              title: "Drop Off",
                              subtitle: __props.pickupDate,
                              icon: "mdi-map-marker-radius-outline",
                              body: __props.destinationLocation
                            }, null, 8, ["subtitle", "body"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_card_section, { class: "col" }, {
                      default: withCtx(() => [
                        createVNode(_component_q_img, {
                          src: __props.vehicleImage,
                          alt: "Vehicle Image"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "font-bold text-center text-h5" }, toDisplayString(__props.vehicleType), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_separator, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card_section, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="font-bold text-md"${_scopeId2}>Your All Inclusive Price</div><div class="text-lg font-bold"${_scopeId2}>Trip Total: $${ssrInterpolate(__props.totalCost)}</div><div class="subheading2"${_scopeId2}>Please Confirm Trip Details are Accurate</div>`);
                } else {
                  return [
                    createVNode("div", { class: "font-bold text-md" }, "Your All Inclusive Price"),
                    createVNode("div", { class: "text-lg font-bold" }, "Trip Total: $" + toDisplayString(__props.totalCost), 1),
                    createVNode("div", { class: "subheading2" }, "Please Confirm Trip Details are Accurate")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card_actions, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_btn, {
                    color: "primary",
                    label: "Book Now",
                    onClick: navigateHome,
                    href: "https://luxuryrideservice.com/reservations"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_btn, {
                      color: "primary",
                      label: "Book Now",
                      onClick: navigateHome,
                      href: "https://luxuryrideservice.com/reservations"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_q_card_section, null, {
                default: withCtx(() => [
                  createVNode(_component_q_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_q_item_section, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_avatar, { size: "4rem" }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                src: "https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/041ea32d-630c-4f0c-a2ba-0c0c8f7d5f00/640",
                                alt: "Luxury Ride Service"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_item_section, null, {
                        default: withCtx(() => [
                          createVNode(_component_q_item_label, { class: "text-h6" }, {
                            default: withCtx(() => [
                              createTextVNode("Luxury Ride Service Inc.")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_separator),
              createVNode(_component_q_card_section, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-h6" }, [
                    createTextVNode(" Custom Quote For: "),
                    createVNode("span", { class: "font-bold text-h5" }, toDisplayString(__props.fullName), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_q_card_section, { horizontal: "" }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_q_timeline, { color: "primary" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_timeline_entry, { heading: "" }, {
                            default: withCtx(() => [
                              createTextVNode(" Trip Details")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_timeline_entry, {
                            title: "Pickup",
                            subtitle: __props.pickupDate,
                            icon: "mdi-map-marker-radius",
                            body: __props.originLocation
                          }, null, 8, ["subtitle", "body"]),
                          createVNode(_component_q_timeline_entry, {
                            title: "Drop Off",
                            subtitle: __props.pickupDate,
                            icon: "mdi-map-marker-radius-outline",
                            body: __props.destinationLocation
                          }, null, 8, ["subtitle", "body"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_q_card_section, { class: "col" }, {
                    default: withCtx(() => [
                      createVNode(_component_q_img, {
                        src: __props.vehicleImage,
                        alt: "Vehicle Image"
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "font-bold text-center text-h5" }, toDisplayString(__props.vehicleType), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_separator),
              createVNode(_component_q_card_section, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "font-bold text-md" }, "Your All Inclusive Price"),
                  createVNode("div", { class: "text-lg font-bold" }, "Trip Total: $" + toDisplayString(__props.totalCost), 1),
                  createVNode("div", { class: "subheading2" }, "Please Confirm Trip Details are Accurate")
                ]),
                _: 1
              }),
              createVNode(_component_q_card_actions, null, {
                default: withCtx(() => [
                  createVNode(_component_q_btn, {
                    color: "primary",
                    label: "Book Now",
                    onClick: navigateHome,
                    href: "https://luxuryrideservice.com/reservations"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuotedCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const meta = void 0;
const routes = [
  {
    name: "index",
    path: "/",
    file: "/Users/m1mbp/WebstormProjects/quote-pricing-form/pages/index.vue",
    children: [],
    meta: meta$1,
    alias: [],
    component: () => import('./_nuxt/index.abafb433.mjs').then((m) => m.default || m)
  },
  {
    name: "quoted",
    path: "/quoted",
    file: "/Users/m1mbp/WebstormProjects/quote-pricing-form/pages/quoted.vue",
    children: [],
    meta,
    alias: [],
    component: () => import('./_nuxt/quoted.10bdb24e.mjs').then((m) => m.default || m)
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const globalMiddleware = [];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const routerHistory = createMemoryHistory(baseURL2);
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history: routerHistory,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a, _b, _c, _d;
    if (((_b = (_a = to.matched[0]) == null ? void 0 : _a.components) == null ? void 0 : _b.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout", "$0JR5xvAX5a");
  router.beforeEach(async (to, from) => {
    var _a, _b;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a = initialLayout.value) != null ? _a : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b = namedMiddleware[entry2]) == null ? void 0 : _b.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.event.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const Screen = defineReactivePlugin({
  width: 0,
  height: 0,
  name: "xs",
  sizes: {
    sm: 600,
    md: 1024,
    lg: 1440,
    xl: 1920
  },
  lt: {
    sm: true,
    md: true,
    lg: true,
    xl: true
  },
  gt: {
    xs: false,
    sm: false,
    md: false,
    lg: false
  },
  xs: true,
  sm: false,
  md: false,
  lg: false,
  xl: false
}, {
  setSizes: noop$1,
  setDebounce: noop$1,
  install({ $q, onSSRHydrated }) {
    $q.screen = this;
    {
      return;
    }
  }
});
const Plugin$4 = defineReactivePlugin({
  isActive: false,
  mode: false
}, {
  __media: void 0,
  set(val) {
    {
      return;
    }
  },
  toggle() {
  },
  install({ $q, onSSRHydrated, ssrContext }) {
    const { dark } = $q.config;
    {
      this.isActive = dark === true;
      $q.dark = {
        isActive: false,
        mode: false,
        set: (val) => {
          ssrContext._meta.bodyClasses = ssrContext._meta.bodyClasses.replace(" body--light", "").replace(" body--dark", "") + ` body--${val === true ? "dark" : "light"}`;
          $q.dark.isActive = val === true;
          $q.dark.mode = val;
        },
        toggle: () => {
          $q.dark.set($q.dark.isActive === false);
        }
      };
      $q.dark.set(dark);
      return;
    }
  }
});
function getMobilePlatform(is) {
  if (is.ios === true)
    return "ios";
  if (is.android === true)
    return "android";
}
function getBodyClasses({ is, has, within }, cfg) {
  const cls = [
    is.desktop === true ? "desktop" : "mobile",
    `${has.touch === false ? "no-" : ""}touch`
  ];
  if (is.mobile === true) {
    const mobile = getMobilePlatform(is);
    mobile !== void 0 && cls.push("platform-" + mobile);
  }
  if (is.nativeMobile === true) {
    const type = is.nativeMobileWrapper;
    cls.push(type);
    cls.push("native-mobile");
    if (is.ios === true && (cfg[type] === void 0 || cfg[type].iosStatusBarPadding !== false)) {
      cls.push("q-ios-padding");
    }
  } else if (is.electron === true) {
    cls.push("electron");
  } else if (is.bex === true) {
    cls.push("bex");
  }
  within.iframe === true && cls.push("within-iframe");
  return cls;
}
const Body = {
  install(opts) {
    {
      const { $q, ssrContext } = opts;
      const cls = getBodyClasses($q.platform, $q.config);
      if ($q.config.screen !== void 0 && $q.config.screen.bodyClass === true) {
        cls.push("screen--xs");
      }
      ssrContext._meta.bodyClasses += cls.join(" ");
      const brand = $q.config.brand;
      if (brand !== void 0) {
        const vars = Object.keys(brand).map((key) => `--q-${key}:${brand[key]};`).join("");
        ssrContext._meta.endingHeadTags += `<style>:root{${vars}}</style>`;
      }
      return;
    }
  }
};
const materialIcons = {
  name: "material-icons",
  type: {
    positive: "check_circle",
    negative: "warning",
    info: "info",
    warning: "priority_high"
  },
  arrow: {
    up: "arrow_upward",
    right: "arrow_forward",
    down: "arrow_downward",
    left: "arrow_back",
    dropdown: "arrow_drop_down"
  },
  chevron: {
    left: "chevron_left",
    right: "chevron_right"
  },
  colorPicker: {
    spectrum: "gradient",
    tune: "tune",
    palette: "style"
  },
  pullToRefresh: {
    icon: "refresh"
  },
  carousel: {
    left: "chevron_left",
    right: "chevron_right",
    up: "keyboard_arrow_up",
    down: "keyboard_arrow_down",
    navigationIcon: "lens"
  },
  chip: {
    remove: "cancel",
    selected: "check"
  },
  datetime: {
    arrowLeft: "chevron_left",
    arrowRight: "chevron_right",
    now: "access_time",
    today: "today"
  },
  editor: {
    bold: "format_bold",
    italic: "format_italic",
    strikethrough: "strikethrough_s",
    underline: "format_underlined",
    unorderedList: "format_list_bulleted",
    orderedList: "format_list_numbered",
    subscript: "vertical_align_bottom",
    superscript: "vertical_align_top",
    hyperlink: "link",
    toggleFullscreen: "fullscreen",
    quote: "format_quote",
    left: "format_align_left",
    center: "format_align_center",
    right: "format_align_right",
    justify: "format_align_justify",
    print: "print",
    outdent: "format_indent_decrease",
    indent: "format_indent_increase",
    removeFormat: "format_clear",
    formatting: "text_format",
    fontSize: "format_size",
    align: "format_align_left",
    hr: "remove",
    undo: "undo",
    redo: "redo",
    heading: "format_size",
    code: "code",
    size: "format_size",
    font: "font_download",
    viewSource: "code"
  },
  expansionItem: {
    icon: "keyboard_arrow_down",
    denseIcon: "arrow_drop_down"
  },
  fab: {
    icon: "add",
    activeIcon: "close"
  },
  field: {
    clear: "cancel",
    error: "error"
  },
  pagination: {
    first: "first_page",
    prev: "keyboard_arrow_left",
    next: "keyboard_arrow_right",
    last: "last_page"
  },
  rating: {
    icon: "grade"
  },
  stepper: {
    done: "check",
    active: "edit",
    error: "warning"
  },
  tabs: {
    left: "chevron_left",
    right: "chevron_right",
    up: "keyboard_arrow_up",
    down: "keyboard_arrow_down"
  },
  table: {
    arrowUp: "arrow_upward",
    warning: "warning",
    firstPage: "first_page",
    prevPage: "chevron_left",
    nextPage: "chevron_right",
    lastPage: "last_page"
  },
  tree: {
    icon: "play_arrow"
  },
  uploader: {
    done: "done",
    clear: "clear",
    add: "add_box",
    upload: "cloud_upload",
    removeQueue: "clear_all",
    removeUploaded: "done_all"
  }
};
const Plugin$3 = defineReactivePlugin({
  iconMapFn: null,
  __icons: {}
}, {
  set(setObject, ssrContext) {
    const def = { ...setObject, rtl: setObject.rtl === true };
    {
      if (ssrContext === void 0) {
        console.error("SSR ERROR: second param required: Quasar.iconSet.set(iconSet, ssrContext)");
        return;
      }
      def.set = ssrContext.$q.iconSet.set;
      Object.assign(ssrContext.$q.iconSet, def);
    }
  },
  install({ $q, iconSet, ssrContext }) {
    {
      const initialSet = iconSet || materialIcons;
      $q.iconMapFn = ssrContext.$q.config.iconMapFn || this.iconMapFn || null;
      $q.iconSet = {};
      $q.iconSet.set = (setObject) => {
        this.set(setObject, ssrContext);
      };
      $q.iconSet.set(initialSet);
    }
  }
});
const autoInstalledPlugins = [
  Platform,
  Body,
  Plugin$4,
  Screen,
  History,
  Plugin$5,
  Plugin$3
];
function installPlugins(pluginOpts, pluginList) {
  pluginList.forEach((Plugin2) => {
    Plugin2.install(pluginOpts);
    Plugin2.__installed = true;
  });
}
function prepareApp(app, uiOpts, pluginOpts) {
  app.config.globalProperties.$q = pluginOpts.$q;
  app.provide(quasarKey, pluginOpts.$q);
  installPlugins(pluginOpts, autoInstalledPlugins);
  uiOpts.components !== void 0 && Object.values(uiOpts.components).forEach((c) => {
    if (isObject(c) === true && c.name !== void 0) {
      app.component(c.name, c);
    }
  });
  uiOpts.directives !== void 0 && Object.values(uiOpts.directives).forEach((d) => {
    if (isObject(d) === true && d.name !== void 0) {
      app.directive(d.name, d);
    }
  });
  uiOpts.plugins !== void 0 && installPlugins(
    pluginOpts,
    Object.values(uiOpts.plugins).filter(
      (p) => typeof p.install === "function" && autoInstalledPlugins.includes(p) === false
    )
  );
  {
    pluginOpts.$q.onSSRHydrated = () => {
      pluginOpts.onSSRHydrated.forEach((fn) => {
        fn();
      });
      pluginOpts.$q.onSSRHydrated = () => {
      };
    };
  }
}
const installQ = function(parentApp, opts = {}, ssrContext) {
  const $q = {
    version: "2.7.3",
    config: opts.config || {}
  };
  Object.assign(ssrContext, {
    $q,
    _meta: {
      htmlAttrs: "",
      headTags: "",
      endingHeadTags: "",
      bodyClasses: "",
      bodyAttrs: "data-server-rendered",
      bodyTags: ""
    }
  });
  if (ssrContext._modules === void 0) {
    ssrContext._modules = [];
  }
  if (ssrContext.onRendered === void 0) {
    ssrContext.onRendered = () => {
    };
  }
  parentApp.config.globalProperties.ssrContext = ssrContext;
  prepareApp(parentApp, opts, {
    parentApp,
    $q,
    lang: opts.lang,
    iconSet: opts.iconSet,
    ssrContext
  });
};
function assignFn(fn) {
  Object.assign(Plugin$2, {
    request: fn,
    exit: fn,
    toggle: fn
  });
}
const Plugin$2 = defineReactivePlugin({
  isActive: false,
  activeEl: null
}, {
  isCapable: false,
  install({ $q }) {
    $q.fullscreen = this;
  }
});
{
  assignFn(() => Promise.resolve());
}
defineReactivePlugin({
  appVisible: true
}, {
  install({ $q }) {
    {
      this.appVisible = $q.appVisible = true;
      return;
    }
  }
});
createComponent({
  name: "BottomSheetPlugin",
  props: {
    ...useDarkProps,
    title: String,
    message: String,
    actions: Array,
    grid: Boolean,
    cardClass: [String, Array, Object],
    cardStyle: [String, Array, Object]
  },
  emits: ["ok", "hide"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const dialogRef = ref(null);
    function show() {
      dialogRef.value.show();
    }
    function hide() {
      dialogRef.value.hide();
    }
    function onOk(action) {
      emit("ok", action);
      hide();
    }
    function onHide() {
      emit("hide");
    }
    function getGrid() {
      return props.actions.map((action) => {
        const img = action.avatar || action.img;
        return action.label === void 0 ? h(QSeparator, {
          class: "col-all",
          dark: isDark.value
        }) : h("div", {
          class: [
            "q-bottom-sheet__item q-hoverable q-focusable cursor-pointer relative-position",
            action.class
          ],
          tabindex: 0,
          onClick() {
            onOk(action);
          },
          onKeyup(e) {
            e.keyCode === 13 && onOk(action);
          }
        }, [
          h("div", { class: "q-focus-helper" }),
          action.icon ? h(QIcon, { name: action.icon, color: action.color }) : img ? h("img", {
            class: action.avatar ? "q-bottom-sheet__avatar" : "",
            src: img
          }) : h("div", { class: "q-bottom-sheet__empty-icon" }),
          h("div", action.label)
        ]);
      });
    }
    function getList() {
      return props.actions.map((action) => {
        const img = action.avatar || action.img;
        return action.label === void 0 ? h(QSeparator, { spaced: true, dark: isDark.value }) : h(QItem, {
          class: ["q-bottom-sheet__item", action.classes],
          tabindex: 0,
          clickable: true,
          dark: isDark.value,
          onClick() {
            onOk(action);
          },
          onKeyup(e) {
            e.keyCode === 13 && onOk(action);
          }
        }, () => [
          h(
            QItemSection,
            { avatar: true },
            () => action.icon ? h(QIcon, { name: action.icon, color: action.color }) : img ? h("img", {
              class: action.avatar ? "q-bottom-sheet__avatar" : "",
              src: img
            }) : null
          ),
          h(QItemSection, () => action.label)
        ]);
      });
    }
    function getCardContent() {
      const child = [];
      props.title && child.push(
        h(QCardSection, {
          class: "q-dialog__title"
        }, () => props.title)
      );
      props.message && child.push(
        h(QCardSection, {
          class: "q-dialog__message"
        }, () => props.message)
      );
      child.push(
        props.grid === true ? h("div", {
          class: "row items-stretch justify-start"
        }, getGrid()) : h("div", getList())
      );
      return child;
    }
    function getContent() {
      return [
        h(QCard, {
          class: [
            `q-bottom-sheet q-bottom-sheet--${props.grid === true ? "grid" : "list"}` + (isDark.value === true ? " q-bottom-sheet--dark q-dark" : ""),
            props.cardClass
          ],
          style: props.cardStyle
        }, getCardContent)
      ];
    }
    Object.assign(proxy, { show, hide });
    return () => h(QDialog, {
      ref: dialogRef,
      position: "bottom",
      onHide
    }, getContent);
  }
});
const svg = h("svg", {
  key: "svg",
  class: "q-radio__bg absolute non-selectable",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, [
  h("path", {
    d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
  }),
  h("path", {
    class: "q-radio__check",
    d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
  })
]);
const QRadio = createComponent({
  name: "QRadio",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    ...useFormProps,
    modelValue: { required: true },
    val: { required: true },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, optionSizes);
    const rootRef = ref(null);
    const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
    const isTrue = computed(() => toRaw(props.modelValue) === toRaw(props.val));
    const classes = computed(
      () => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (props.disable === true ? " disabled" : "") + (isDark.value === true ? " q-radio--dark" : "") + (props.dense === true ? " q-radio--dense" : "") + (props.leftLabel === true ? " reverse" : "")
    );
    const innerClass = computed(() => {
      const color = props.color !== void 0 && (props.keepColor === true || isTrue.value === true) ? ` text-${props.color}` : "";
      return `q-radio__inner relative-position q-radio__inner--${isTrue.value === true ? "truthy" : "falsy"}${color}`;
    });
    const icon = computed(
      () => (isTrue.value === true ? props.checkedIcon : props.uncheckedIcon) || null
    );
    const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
    const formAttrs = computed(() => {
      const prop = { type: "radio" };
      props.name !== void 0 && Object.assign(prop, {
        "^checked": isTrue.value === true ? "checked" : void 0,
        name: props.name,
        value: props.val
      });
      return prop;
    });
    const injectFormInput = useFormInject(formAttrs);
    function onClick(e) {
      if (e !== void 0) {
        stopAndPrevent(e);
        refocusTarget(e);
      }
      if (props.disable !== true && isTrue.value !== true) {
        emit("update:modelValue", props.val, e);
      }
    }
    function onKeydown2(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        stopAndPrevent(e);
      }
    }
    function onKeyup2(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick(e);
      }
    }
    Object.assign(proxy, { set: onClick });
    return () => {
      const content = icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-radio__icon",
            name: icon.value
          })
        ])
      ] : [svg];
      props.disable !== true && injectFormInput(
        content,
        "unshift",
        " q-radio__native q-ma-none q-pa-none"
      );
      const child = [
        h("div", {
          class: innerClass.value,
          style: sizeStyle.value
        }, content)
      ];
      if (refocusTargetEl.value !== null) {
        child.push(refocusTargetEl.value);
      }
      const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
      label !== void 0 && child.push(
        h("div", {
          class: "q-radio__label q-anchor--skip"
        }, label)
      );
      return h("div", {
        ref: rootRef,
        class: classes.value,
        tabindex: tabindex.value,
        role: "radio",
        "aria-label": props.label,
        "aria-checked": isTrue.value === true ? "true" : "false",
        "aria-disabled": props.disable === true ? "true" : void 0,
        onClick,
        onKeydown: onKeydown2,
        onKeyup: onKeyup2
      }, child);
    };
  }
});
const QToggle = createComponent({
  name: "QToggle",
  props: {
    ...useCheckboxProps,
    icon: String,
    iconColor: String
  },
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || props.icon
      );
      const color = computed(() => isTrue.value === true ? props.iconColor : null);
      return () => [
        h("div", { class: "q-toggle__track" }),
        h(
          "div",
          {
            class: "q-toggle__thumb absolute flex flex-center no-wrap"
          },
          icon.value !== void 0 ? [
            h(QIcon, {
              name: icon.value,
              color: color.value
            })
          ] : void 0
        )
      ];
    }
    return useCheckbox("toggle", getInner);
  }
});
const components = {
  radio: QRadio,
  checkbox: QCheckbox,
  toggle: QToggle
};
const typeValues = Object.keys(components);
const QOptionGroup = createComponent({
  name: "QOptionGroup",
  props: {
    ...useDarkProps,
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      validator: (opts) => opts.every((opt) => "value" in opt && "label" in opt)
    },
    name: String,
    type: {
      default: "radio",
      validator: (v) => typeValues.includes(v)
    },
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    size: String,
    leftLabel: Boolean,
    inline: Boolean,
    disable: Boolean
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const arrayModel = Array.isArray(props.modelValue);
    if (props.type === "radio") {
      if (arrayModel === true) {
        console.error("q-option-group: model should not be array");
      }
    } else if (arrayModel === false) {
      console.error("q-option-group: model should be array in your case");
    }
    const isDark = useDark(props, $q);
    const component = computed(() => components[props.type]);
    const classes = computed(
      () => "q-option-group q-gutter-x-sm" + (props.inline === true ? " q-option-group--inline" : "")
    );
    const attrs = computed(() => {
      const attrs2 = {};
      if (props.type === "radio") {
        attrs2.role = "radiogroup";
        if (props.disable === true) {
          attrs2["aria-disabled"] = "true";
        }
      }
      return attrs2;
    });
    function onUpdateModelValue(value) {
      emit("update:modelValue", value);
    }
    return () => h("div", {
      class: classes.value,
      ...attrs.value
    }, props.options.map((opt, i) => {
      const child = slots["label-" + i] !== void 0 ? () => slots["label-" + i](opt) : slots.label !== void 0 ? () => slots.label(opt) : void 0;
      return h("div", [
        h(component.value, {
          modelValue: props.modelValue,
          val: opt.value,
          name: opt.name === void 0 ? props.name : opt.name,
          disable: props.disable || opt.disable,
          label: child === void 0 ? opt.label : null,
          leftLabel: opt.leftLabel === void 0 ? props.leftLabel : opt.leftLabel,
          color: opt.color === void 0 ? props.color : opt.color,
          checkedIcon: opt.checkedIcon,
          uncheckedIcon: opt.uncheckedIcon,
          dark: opt.dark || isDark.value,
          size: opt.size === void 0 ? props.size : opt.size,
          dense: props.dense,
          keepColor: opt.keepColor === void 0 ? props.keepColor : opt.keepColor,
          "onUpdate:modelValue": onUpdateModelValue
        }, child)
      ]);
    }));
  }
});
createComponent({
  name: "DialogPlugin",
  props: {
    ...useDarkProps,
    title: String,
    message: String,
    prompt: Object,
    options: Object,
    progress: [Boolean, Object],
    html: Boolean,
    ok: {
      type: [String, Object, Boolean],
      default: true
    },
    cancel: [String, Object, Boolean],
    focus: {
      type: String,
      default: "ok",
      validator: (v) => ["ok", "cancel", "none"].includes(v)
    },
    stackButtons: Boolean,
    color: String,
    cardClass: [String, Array, Object],
    cardStyle: [String, Array, Object]
  },
  emits: ["ok", "hide"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const dialogRef = ref(null);
    const model = ref(
      props.prompt !== void 0 ? props.prompt.model : props.options !== void 0 ? props.options.model : void 0
    );
    const classes = computed(
      () => "q-dialog-plugin" + (isDark.value === true ? " q-dialog-plugin--dark q-dark" : "") + (props.progress !== false ? " q-dialog-plugin--progress" : "")
    );
    const vmColor = computed(
      () => props.color || (isDark.value === true ? "amber" : "primary")
    );
    const spinner = computed(() => props.progress === false ? null : isObject(props.progress) === true ? {
      component: props.progress.spinner || QSpinner,
      props: { color: props.progress.color || vmColor.value }
    } : {
      component: QSpinner,
      props: { color: vmColor.value }
    });
    const hasForm = computed(
      () => props.prompt !== void 0 || props.options !== void 0
    );
    const formProps = computed(() => {
      if (hasForm.value !== true) {
        return {};
      }
      const { model: model2, isValid, items, ...formProps2 } = props.prompt !== void 0 ? props.prompt : props.options;
      return formProps2;
    });
    const okLabel = computed(() => isObject(props.ok) === true ? $q.lang.label.ok : props.ok === true ? $q.lang.label.ok : props.ok);
    const cancelLabel = computed(() => isObject(props.cancel) === true ? $q.lang.label.cancel : props.cancel === true ? $q.lang.label.cancel : props.cancel);
    const okDisabled = computed(() => {
      if (props.prompt !== void 0) {
        return props.prompt.isValid !== void 0 && props.prompt.isValid(model.value) !== true;
      }
      if (props.options !== void 0) {
        return props.options.isValid !== void 0 && props.options.isValid(model.value) !== true;
      }
      return false;
    });
    const okProps = computed(() => ({
      color: vmColor.value,
      label: okLabel.value,
      ripple: false,
      disable: okDisabled.value,
      ...isObject(props.ok) === true ? props.ok : { flat: true },
      "data-autofocus": props.focus === "ok" && hasForm.value !== true || void 0,
      onClick: onOk
    }));
    const cancelProps = computed(() => ({
      color: vmColor.value,
      label: cancelLabel.value,
      ripple: false,
      ...isObject(props.cancel) === true ? props.cancel : { flat: true },
      "data-autofocus": props.focus === "cancel" && hasForm.value !== true || void 0,
      onClick: onCancel
    }));
    watch(() => props.prompt && props.prompt.model, onUpdateModel);
    watch(() => props.options && props.options.model, onUpdateModel);
    function show() {
      dialogRef.value.show();
    }
    function hide() {
      dialogRef.value.hide();
    }
    function onOk() {
      emit("ok", toRaw(model.value));
      hide();
    }
    function onCancel() {
      hide();
    }
    function onDialogHide() {
      emit("hide");
    }
    function onUpdateModel(val) {
      model.value = val;
    }
    function onInputKeyup(evt) {
      if (okDisabled.value !== true && props.prompt.type !== "textarea" && isKeyCode(evt, 13) === true) {
        onOk();
      }
    }
    function getSection(classes2, text) {
      return props.html === true ? h(QCardSection, {
        class: classes2,
        innerHTML: text
      }) : h(QCardSection, { class: classes2 }, () => text);
    }
    function getPrompt() {
      return [
        h(QInput, {
          modelValue: model.value,
          ...formProps.value,
          color: vmColor.value,
          dense: true,
          autofocus: true,
          dark: isDark.value,
          "onUpdate:modelValue": onUpdateModel,
          onKeyup: onInputKeyup
        })
      ];
    }
    function getOptions() {
      return [
        h(QOptionGroup, {
          modelValue: model.value,
          ...formProps.value,
          color: vmColor.value,
          options: props.options.items,
          dark: isDark.value,
          "onUpdate:modelValue": onUpdateModel
        })
      ];
    }
    function getButtons() {
      const child = [];
      props.cancel && child.push(
        h(QBtn, cancelProps.value)
      );
      props.ok && child.push(
        h(QBtn, okProps.value)
      );
      return h(QCardActions, {
        class: props.stackButtons === true ? "items-end" : "",
        vertical: props.stackButtons,
        align: "right"
      }, () => child);
    }
    function getCardContent() {
      const child = [];
      props.title && child.push(
        getSection("q-dialog__title", props.title)
      );
      props.progress !== false && child.push(
        h(
          QCardSection,
          { class: "q-dialog__progress" },
          () => h(spinner.value.component, spinner.value.props)
        )
      );
      props.message && child.push(
        getSection("q-dialog__message", props.message)
      );
      if (props.prompt !== void 0) {
        child.push(
          h(
            QCardSection,
            { class: "scroll q-dialog-plugin__form" },
            getPrompt
          )
        );
      } else if (props.options !== void 0) {
        child.push(
          h(QSeparator, { dark: isDark.value }),
          h(
            QCardSection,
            { class: "scroll q-dialog-plugin__form" },
            getOptions
          ),
          h(QSeparator, { dark: isDark.value })
        );
      }
      if (props.ok || props.cancel) {
        child.push(getButtons());
      }
      return child;
    }
    function getContent() {
      return [
        h(QCard, {
          class: [
            classes.value,
            props.cardClass
          ],
          style: props.cardStyle,
          dark: isDark.value
        }, getCardContent)
      ];
    }
    Object.assign(proxy, { show, hide });
    return () => h(QDialog, {
      ref: dialogRef,
      onHide: onDialogHide
    }, getContent);
  }
});
const positionValues = ["top", "right", "bottom", "left"];
function translate({ p, pos, active, horiz, reverse, dir }) {
  let x = 1, y = 1;
  if (horiz === true) {
    if (reverse === true) {
      x = -1;
    }
    if (pos === "bottom") {
      y = -1;
    }
    return { transform: `translate3d(${x * (p - 100)}%,${active ? 0 : y * -200}%,0)` };
  }
  if (reverse === true) {
    y = -1;
  }
  if (pos === "right") {
    x = -1;
  }
  return { transform: `translate3d(${active ? 0 : dir * x * -200}%,${y * (p - 100)}%,0)` };
}
function inc(p, amount) {
  if (typeof amount !== "number") {
    if (p < 25) {
      amount = Math.random() * 3 + 3;
    } else if (p < 65) {
      amount = Math.random() * 3;
    } else if (p < 85) {
      amount = Math.random() * 2;
    } else if (p < 99) {
      amount = 0.6;
    } else {
      amount = 0;
    }
  }
  return between(p + amount, 0, 100);
}
createComponent({
  name: "QAjaxBar",
  props: {
    position: {
      type: String,
      default: "top",
      validator: (val) => positionValues.includes(val)
    },
    size: {
      type: String,
      default: "2px"
    },
    color: String,
    skipHijack: Boolean,
    reverse: Boolean,
    hijackFilter: Function
  },
  emits: ["start", "stop"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const progress = ref(0);
    const onScreen = ref(false);
    const animate = ref(true);
    let sessions = 0, timer2, speed;
    const classes = computed(
      () => `q-loading-bar q-loading-bar--${props.position}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (animate.value === true ? "" : " no-transition")
    );
    const horizontal = computed(() => props.position === "top" || props.position === "bottom");
    const sizeProp = computed(() => horizontal.value === true ? "height" : "width");
    const style = computed(() => {
      const active = onScreen.value;
      const obj = translate({
        p: progress.value,
        pos: props.position,
        active,
        horiz: horizontal.value,
        reverse: proxy.$q.lang.rtl === true && ["top", "bottom"].includes(props.position) ? props.reverse === false : props.reverse,
        dir: proxy.$q.lang.rtl === true ? -1 : 1
      });
      obj[sizeProp.value] = props.size;
      obj.opacity = active ? 1 : 0;
      return obj;
    });
    const attributes = computed(() => onScreen.value === true ? {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": progress.value
    } : { "aria-hidden": "true" });
    function start(newSpeed = 300) {
      const oldSpeed = speed;
      speed = Math.max(0, newSpeed) || 0;
      sessions++;
      if (sessions > 1) {
        if (oldSpeed === 0 && newSpeed > 0) {
          planNextStep();
        } else if (oldSpeed > 0 && newSpeed <= 0) {
          clearTimeout(timer2);
        }
        return sessions;
      }
      clearTimeout(timer2);
      emit("start");
      progress.value = 0;
      timer2 = setTimeout(() => {
        animate.value = true;
        newSpeed > 0 && planNextStep();
      }, onScreen.value === true ? 500 : 1);
      if (onScreen.value !== true) {
        onScreen.value = true;
        animate.value = false;
      }
      return sessions;
    }
    function increment(amount) {
      if (sessions > 0) {
        progress.value = inc(progress.value, amount);
      }
      return sessions;
    }
    function stop2() {
      sessions = Math.max(0, sessions - 1);
      if (sessions > 0) {
        return sessions;
      }
      clearTimeout(timer2);
      emit("stop");
      const end = () => {
        animate.value = true;
        progress.value = 100;
        timer2 = setTimeout(() => {
          onScreen.value = false;
        }, 1e3);
      };
      if (progress.value === 0) {
        timer2 = setTimeout(end, 1);
      } else {
        end();
      }
      return sessions;
    }
    function planNextStep() {
      if (progress.value < 100) {
        timer2 = setTimeout(() => {
          increment();
          planNextStep();
        }, speed);
      }
    }
    Object.assign(proxy, { start, stop: stop2, increment });
    return () => h("div", {
      class: classes.value,
      style: style.value,
      ...attributes.value
    });
  }
});
ref(null);
defineReactivePlugin({
  isActive: false
}, {
  start: noop$1,
  stop: noop$1,
  increment: noop$1,
  setDefaults: noop$1,
  install({ $q, parentApp }) {
    $q.loadingBar = this;
    {
      return;
    }
  }
});
defineReactivePlugin({
  isActive: false
}, {
  show(opts) {
    {
      return;
    }
  },
  hide() {
  },
  setDefaults(opts) {
  },
  install({ $q }) {
    $q.loading = this;
  }
});
const Notify = {
  setDefaults(opts) {
  },
  registerType(typeName, typeOpts) {
  },
  install({ $q, parentApp }) {
    $q.notify = this.create = noop$1;
    $q.notify.setDefaults = this.setDefaults;
    $q.notify.registerType = this.registerType;
    if ($q.config.notify !== void 0) {
      this.setDefaults($q.config.notify);
    }
  }
};
function getEmptyStorage() {
  const getVal = () => null;
  return {
    has: () => false,
    getLength: () => 0,
    getItem: getVal,
    getIndex: getVal,
    getKey: getVal,
    getAll: () => {
    },
    getAllKeys: () => [],
    set: noop$1,
    remove: noop$1,
    clear: noop$1,
    isEmpty: () => true
  };
}
const storage$1 = getEmptyStorage();
const Plugin$1 = {
  install({ $q }) {
    $q.localStorage = storage$1;
  }
};
Object.assign(Plugin$1, storage$1);
const storage = getEmptyStorage();
const Plugin = {
  install({ $q }) {
    $q.sessionStorage = storage;
  }
};
Object.assign(Plugin, storage);
const ClosePopup = createDirective(
  { name: "close-popup", getSSRProps }
);
const Intersection = createDirective(
  { name: "intersection", getSSRProps }
);
const Morph = createDirective(
  {
    name: "morph",
    getSSRProps: (binding) => {
      const name = binding.arg ? binding.arg.split(":")[0] : false;
      return {
        class: name === binding.value ? "" : "q-morph--invisible"
      };
    }
  }
);
const Mutation = createDirective(
  { name: "mutation", getSSRProps }
);
const ScrollFire = createDirective(
  { name: "scroll-fire", getSSRProps }
);
const Scroll = createDirective(
  { name: "scroll", getSSRProps }
);
const TouchHold = createDirective(
  { name: "touch-hold", getSSRProps }
);
const keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46]
};
new RegExp(`^([\\d+]+|${Object.keys(keyCodes).join("|")})$`, "i");
const TouchRepeat = createDirective(
  { name: "touch-repeat", getSSRProps }
);
const TouchSwipe = createDirective(
  { name: "touch-swipe", getSSRProps }
);
const directives = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClosePopup,
  Intersection,
  Morph,
  Mutation,
  Ripple,
  ScrollFire,
  Scroll,
  TouchHold,
  TouchPan,
  TouchRepeat,
  TouchSwipe
}, Symbol.toStringTag, { value: "Module" }));
const _nuxt_plugins_quasarVueUse_ts_R280Bm1i9S = defineNuxtPlugin((nuxtApp) => {
  const includes = {
    directives,
    plugins: { Notify },
    config: {
      dark: false
    }
  };
  nuxtApp.vueApp.use({
    version: "2.7.3",
    install(app, opts) {
      {
        installQ(app, { ...opts, ...includes }, nuxtApp.ssrContext);
      }
    },
    lang: Plugin$5,
    iconSet: Plugin$3
  });
});
const node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq = defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const plugins_tagmanager_ts_CTMC49pKXm = defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const gtmOptions = {
    id: "GTM-MMTCTF5",
    queryParams: {
      gtm_auth: "",
      gtm_preview: "",
      gtm_cookies_win: ""
    },
    defer: false,
    compatibility: false,
    enabled: true,
    debug: true,
    loadScript: true,
    vueRouter: router,
    trackOnNextTick: false
  };
  nuxtApp.vueApp.use(createGtm(gtmOptions));
});
const _plugins = [
  preload,
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  _nuxt_plugins_quasarVueUse_ts_R280Bm1i9S,
  node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq,
  plugins_tagmanager_ts_CTMC49pKXm
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.b4e79a2d.mjs'));
    const nuxtApp = useNuxtApp();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = resolveComponent("App");
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const { passive } = listenOpts;
const axisValues = ["both", "horizontal", "vertical"];
const QScrollObserver = createComponent({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (v) => axisValues.includes(v),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: {
      default: void 0
    }
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: false,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let clearTimer = null, localScrollTarget, parentEl;
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function emitEvent() {
      clearTimer !== null && clearTimer();
      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);
      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };
      if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) {
        return;
      }
      const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;
      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }
      emit("scroll", { ...scroll });
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener("scroll", trigger2, passive);
      trigger2(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger2, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger2(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (clearTimer === null) {
        const [timer2, fn] = props.debounce ? [setTimeout(emitEvent, props.debounce), clearTimeout] : [requestAnimationFrame(emitEvent), cancelAnimationFrame];
        clearTimer = () => {
          fn(timer2);
          clearTimer = null;
        };
      }
    }
    const vm = getCurrentInstance();
    Object.assign(vm.proxy, {
      trigger: trigger2,
      getPosition: () => scroll
    });
    return noop$1;
  }
});
const QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    {
      return noop$1;
    }
  }
});
const __nuxt_component_0 = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(0 );
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scroll-height", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let timer2;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (timer2 !== void 0) {
          clearTimeout(timer2);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        timer2 = setTimeout(() => {
          document.body.classList.remove("q-body--layout-animate");
          timer2 = void 0;
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
const __nuxt_component_1 = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, () => {
      console.error("QPageContainer needs to be child of QLayout");
    });
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css2 = {};
      if ($layout.header.space === true) {
        css2.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css2.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css2;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
const __nuxt_component_2 = createComponent({
  name: "QFooter",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, () => {
      console.error("QFooter needs to be child of QLayout");
    });
    const size2 = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const windowHeight = ref(
      0 
    );
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("F") > -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const containerHeight = computed(() => $layout.isContainer.value === true ? $layout.containerHeight.value : windowHeight.value);
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size2.value : 0;
      }
      const offset2 = $layout.scroll.value.position + containerHeight.value + size2.value - $layout.height.value;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-footer q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-bottom" + (props.bordered === true ? " q-footer--bordered" : "") + (hidden.value === true ? " q-footer--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" + (fixed.value !== true ? " hidden" : "") : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.bottom, css2 = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css2[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css2[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css2;
    });
    function updateLayout(prop, val) {
      $layout.update("footer", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size2, height);
      updateLayout("size", height);
    }
    function updateRevealed() {
      if (props.reveal !== true) {
        return;
      }
      const { direction, position: position2, inflectionPoint } = $layout.scroll.value;
      updateLocal(revealed, direction === "up" || position2 - inflectionPoint < 100 || $layout.height.value - containerHeight.value - position2 - size2.value < 300);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch([size2, $layout.scroll, $layout.height], updateRevealed);
    watch(() => $q.screen.height, (val) => {
      $layout.isContainer.value !== true && updateLocal(windowHeight, val);
    });
    const instance = {};
    $layout.instances.footer = instance;
    props.modelValue === true && updateLayout("size", size2.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    return () => {
      const child = hMergeSlot(slots.default, [
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      ]);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      return h("footer", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_QLayout = __nuxt_component_0;
      const _component_QPageContainer = __nuxt_component_1;
      const _component_NuxtPage = resolveComponent("NuxtPage");
      const _component_QFooter = __nuxt_component_2;
      _push(ssrRenderComponent(_component_QLayout, mergeProps({ view: "hHh lpR fFf" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_QPageContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_QFooter, { hidden: "" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_QPageContainer, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              }),
              createVNode(_component_QFooter, { hidden: "" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main$1);
    vueApp.component("App", _sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { __nuxt_component_0$2 as _, _sfc_main$3 as a, _sfc_main$2 as b, useHead as c, __nuxt_component_0$3 as d, entry$1 as default, storeToRefs as s, useMapStore as u };
//# sourceMappingURL=server.mjs.map
