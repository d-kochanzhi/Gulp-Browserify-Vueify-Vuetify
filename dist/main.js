(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// shim for using process in browser

var process = module.exports = {};

process.nextTick = function () {
    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

    if (canSetImmediate) {
        return function (f) {
            return window.setImmediate(f);
        };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
}();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOlsicHJvY2VzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJuZXh0VGljayIsImNhblNldEltbWVkaWF0ZSIsIndpbmRvdyIsInNldEltbWVkaWF0ZSIsImNhblBvc3QiLCJwb3N0TWVzc2FnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJmIiwicXVldWUiLCJldiIsInNvdXJjZSIsImRhdGEiLCJzdG9wUHJvcGFnYXRpb24iLCJsZW5ndGgiLCJmbiIsInNoaWZ0IiwicHVzaCIsInNldFRpbWVvdXQiLCJ0aXRsZSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2Iiwibm9vcCIsIm9uIiwiYWRkTGlzdGVuZXIiLCJvbmNlIiwib2ZmIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJlbWl0IiwiYmluZGluZyIsIm5hbWUiLCJFcnJvciIsImN3ZCIsImNoZGlyIiwiZGlyIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQUlBLFVBQVVDLE9BQU9DLE9BQVAsR0FBaUIsRUFBL0I7O0FBRUFGLFFBQVFHLFFBQVIsR0FBb0IsWUFBWTtBQUM1QixRQUFJQyxrQkFBa0IsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUNuQkEsT0FBT0MsWUFEVjtBQUVBLFFBQUlDLFVBQVUsT0FBT0YsTUFBUCxLQUFrQixXQUFsQixJQUNYQSxPQUFPRyxXQURJLElBQ1dILE9BQU9JLGdCQURoQzs7QUFJQSxRQUFJTCxlQUFKLEVBQXFCO0FBQ2pCLGVBQU8sVUFBVU0sQ0FBVixFQUFhO0FBQUUsbUJBQU9MLE9BQU9DLFlBQVAsQ0FBb0JJLENBQXBCLENBQVA7QUFBK0IsU0FBckQ7QUFDSDs7QUFFRCxRQUFJSCxPQUFKLEVBQWE7QUFDVCxZQUFJSSxRQUFRLEVBQVo7QUFDQU4sZUFBT0ksZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsVUFBVUcsRUFBVixFQUFjO0FBQzdDLGdCQUFJQyxTQUFTRCxHQUFHQyxNQUFoQjtBQUNBLGdCQUFJLENBQUNBLFdBQVdSLE1BQVgsSUFBcUJRLFdBQVcsSUFBakMsS0FBMENELEdBQUdFLElBQUgsS0FBWSxjQUExRCxFQUEwRTtBQUN0RUYsbUJBQUdHLGVBQUg7QUFDQSxvQkFBSUosTUFBTUssTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ2xCLHdCQUFJQyxLQUFLTixNQUFNTyxLQUFOLEVBQVQ7QUFDQUQ7QUFDSDtBQUNKO0FBQ0osU0FURCxFQVNHLElBVEg7O0FBV0EsZUFBTyxTQUFTZCxRQUFULENBQWtCYyxFQUFsQixFQUFzQjtBQUN6Qk4sa0JBQU1RLElBQU4sQ0FBV0YsRUFBWDtBQUNBWixtQkFBT0csV0FBUCxDQUFtQixjQUFuQixFQUFtQyxHQUFuQztBQUNILFNBSEQ7QUFJSDs7QUFFRCxXQUFPLFNBQVNMLFFBQVQsQ0FBa0JjLEVBQWxCLEVBQXNCO0FBQ3pCRyxtQkFBV0gsRUFBWCxFQUFlLENBQWY7QUFDSCxLQUZEO0FBR0gsQ0FqQ2tCLEVBQW5COztBQW1DQWpCLFFBQVFxQixLQUFSLEdBQWdCLFNBQWhCO0FBQ0FyQixRQUFRc0IsT0FBUixHQUFrQixJQUFsQjtBQUNBdEIsUUFBUXVCLEdBQVIsR0FBYyxFQUFkO0FBQ0F2QixRQUFRd0IsSUFBUixHQUFlLEVBQWY7O0FBRUEsU0FBU0MsSUFBVCxHQUFnQixDQUFFOztBQUVsQnpCLFFBQVEwQixFQUFSLEdBQWFELElBQWI7QUFDQXpCLFFBQVEyQixXQUFSLEdBQXNCRixJQUF0QjtBQUNBekIsUUFBUTRCLElBQVIsR0FBZUgsSUFBZjtBQUNBekIsUUFBUTZCLEdBQVIsR0FBY0osSUFBZDtBQUNBekIsUUFBUThCLGNBQVIsR0FBeUJMLElBQXpCO0FBQ0F6QixRQUFRK0Isa0JBQVIsR0FBNkJOLElBQTdCO0FBQ0F6QixRQUFRZ0MsSUFBUixHQUFlUCxJQUFmOztBQUVBekIsUUFBUWlDLE9BQVIsR0FBa0IsVUFBVUMsSUFBVixFQUFnQjtBQUM5QixVQUFNLElBQUlDLEtBQUosQ0FBVSxrQ0FBVixDQUFOO0FBQ0gsQ0FGRDs7QUFJQTtBQUNBbkMsUUFBUW9DLEdBQVIsR0FBYyxZQUFZO0FBQUUsV0FBTyxHQUFQO0FBQVksQ0FBeEM7QUFDQXBDLFFBQVFxQyxLQUFSLEdBQWdCLFVBQVVDLEdBQVYsRUFBZTtBQUMzQixVQUFNLElBQUlILEtBQUosQ0FBVSxnQ0FBVixDQUFOO0FBQ0gsQ0FGRCIsImZpbGUiOiJicm93c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iXX0=
},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Vue; // late bind
var map = Object.create(null);
var shimmed = false;
var isBrowserify = false;

/**
 * Determine compatibility and apply patch.
 *
 * @param {Function} vue
 * @param {Boolean} browserify
 */

exports.install = function (vue, browserify) {
  if (shimmed) return;
  shimmed = true;

  Vue = vue;
  isBrowserify = browserify;

  exports.compatible = !!Vue.internalDirectives;
  if (!exports.compatible) {
    console.warn('[HMR] vue-loader hot reload is only compatible with ' + 'Vue.js 1.0.0+.');
    return;
  }

  // patch view directive
  patchView(Vue.internalDirectives.component);
  console.log('[HMR] Vue component hot reload shim applied.');
  // shim router-view if present
  var routerView = Vue.elementDirective('router-view');
  if (routerView) {
    patchView(routerView);
    console.log('[HMR] vue-router <router-view> hot reload shim applied.');
  }
};

/**
 * Shim the view directive (component or router-view).
 *
 * @param {Object} View
 */

function patchView(View) {
  var unbuild = View.unbuild;
  View.unbuild = function (defer) {
    if (!this.hotUpdating) {
      var prevComponent = this.childVM && this.childVM.constructor;
      removeView(prevComponent, this);
      // defer = true means we are transitioning to a new
      // Component. Register this new component to the list.
      if (defer) {
        addView(this.Component, this);
      }
    }
    // call original
    return unbuild.call(this, defer);
  };
}

/**
 * Add a component view to a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function addView(Component, view) {
  var id = Component && Component.options.hotID;
  if (id) {
    if (!map[id]) {
      map[id] = {
        Component: Component,
        views: [],
        instances: []
      };
    }
    map[id].views.push(view);
  }
}

/**
 * Remove a component view from a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function removeView(Component, view) {
  var id = Component && Component.options.hotID;
  if (id) {
    map[id].views.$remove(view);
  }
}

/**
 * Create a record for a hot module, which keeps track of its construcotr,
 * instnaces and views (component directives or router-views).
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if (typeof options === 'function') {
    options = options.options;
  }
  if (typeof options.el !== 'string' && _typeof(options.data) !== 'object') {
    makeOptionsHot(id, options);
    map[id] = {
      Component: null,
      views: [],
      instances: []
    };
  }
};

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  options.hotID = id;
  injectHook(options, 'created', function () {
    var record = map[id];
    if (!record.Component) {
      record.Component = this.constructor;
    }
    record.instances.push(this);
  });
  injectHook(options, 'beforeDestroy', function () {
    map[id].instances.$remove(this);
  });
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name];
  options[name] = existing ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook] : [hook];
}

/**
 * Update a hot component.
 *
 * @param {String} id
 * @param {Object|null} newOptions
 * @param {String|null} newTemplate
 */

exports.update = function (id, newOptions, newTemplate) {
  var record = map[id];
  // force full-reload if an instance of the component is active but is not
  // managed by a view
  if (!record || record.instances.length && !record.views.length) {
    console.log('[HMR] Root or manually-mounted instance modified. Full reload may be required.');
    if (!isBrowserify) {
      window.location.reload();
    } else {
      // browserify-hmr somehow sends incomplete bundle if we reload here
      return;
    }
  }
  if (!isBrowserify) {
    // browserify-hmr already logs this
    console.log('[HMR] Updating component: ' + format(id));
  }
  var Component = record.Component;
  // update constructor
  if (newOptions) {
    // in case the user exports a constructor
    Component = record.Component = typeof newOptions === 'function' ? newOptions : Vue.extend(newOptions);
    makeOptionsHot(id, Component.options);
  }
  if (newTemplate) {
    Component.options.template = newTemplate;
  }
  // handle recursive lookup
  if (Component.options.name) {
    Component.options.components[Component.options.name] = Component;
  }
  // reset constructor cached linker
  Component.linker = null;
  // reload all views
  record.views.forEach(function (view) {
    updateView(view, Component);
  });
  // flush devtools
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush');
  }
};

/**
 * Update a component view instance
 *
 * @param {Directive} view
 * @param {Function} Component
 */

function updateView(view, Component) {
  if (!view._bound) {
    return;
  }
  view.Component = Component;
  view.hotUpdating = true;
  // disable transitions
  view.vm._isCompiled = false;
  // save state
  var state = extractState(view.childVM);
  // remount, make sure to disable keep-alive
  var keepAlive = view.keepAlive;
  view.keepAlive = false;
  view.mountComponent();
  view.keepAlive = keepAlive;
  // restore state
  restoreState(view.childVM, state, true);
  // re-eanble transitions
  view.vm._isCompiled = true;
  view.hotUpdating = false;
}

/**
 * Extract state from a Vue instance.
 *
 * @param {Vue} vm
 * @return {Object}
 */

function extractState(vm) {
  return {
    cid: vm.constructor.cid,
    data: vm.$data,
    children: vm.$children.map(extractState)
  };
}

/**
 * Restore state to a reloaded Vue instance.
 *
 * @param {Vue} vm
 * @param {Object} state
 */

function restoreState(vm, state, isRoot) {
  var oldAsyncConfig;
  if (isRoot) {
    // set Vue into sync mode during state rehydration
    oldAsyncConfig = Vue.config.async;
    Vue.config.async = false;
  }
  // actual restore
  if (isRoot || !vm._props) {
    vm.$data = state.data;
  } else {
    Object.keys(state.data).forEach(function (key) {
      if (!vm._props[key]) {
        // for non-root, only restore non-props fields
        vm.$data[key] = state.data[key];
      }
    });
  }
  // verify child consistency
  var hasSameChildren = vm.$children.every(function (c, i) {
    return state.children[i] && state.children[i].cid === c.constructor.cid;
  });
  if (hasSameChildren) {
    // rehydrate children
    vm.$children.forEach(function (c, i) {
      restoreState(c, state.children[i]);
    });
  }
  if (isRoot) {
    Vue.config.async = oldAsyncConfig;
  }
}

function format(id) {
  var match = id.match(/[^\/]+\.vue$/);
  return match ? match[0] : id;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlZ1ZSIsIm1hcCIsIk9iamVjdCIsImNyZWF0ZSIsInNoaW1tZWQiLCJpc0Jyb3dzZXJpZnkiLCJleHBvcnRzIiwiaW5zdGFsbCIsInZ1ZSIsImJyb3dzZXJpZnkiLCJjb21wYXRpYmxlIiwiaW50ZXJuYWxEaXJlY3RpdmVzIiwiY29uc29sZSIsIndhcm4iLCJwYXRjaFZpZXciLCJjb21wb25lbnQiLCJsb2ciLCJyb3V0ZXJWaWV3IiwiZWxlbWVudERpcmVjdGl2ZSIsIlZpZXciLCJ1bmJ1aWxkIiwiZGVmZXIiLCJob3RVcGRhdGluZyIsInByZXZDb21wb25lbnQiLCJjaGlsZFZNIiwiY29uc3RydWN0b3IiLCJyZW1vdmVWaWV3IiwiYWRkVmlldyIsIkNvbXBvbmVudCIsImNhbGwiLCJ2aWV3IiwiaWQiLCJvcHRpb25zIiwiaG90SUQiLCJ2aWV3cyIsImluc3RhbmNlcyIsInB1c2giLCIkcmVtb3ZlIiwiY3JlYXRlUmVjb3JkIiwiZWwiLCJkYXRhIiwibWFrZU9wdGlvbnNIb3QiLCJpbmplY3RIb29rIiwicmVjb3JkIiwibmFtZSIsImhvb2siLCJleGlzdGluZyIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsInVwZGF0ZSIsIm5ld09wdGlvbnMiLCJuZXdUZW1wbGF0ZSIsImxlbmd0aCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZm9ybWF0IiwiZXh0ZW5kIiwidGVtcGxhdGUiLCJjb21wb25lbnRzIiwibGlua2VyIiwiZm9yRWFjaCIsInVwZGF0ZVZpZXciLCJfX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fIiwiZW1pdCIsIl9ib3VuZCIsInZtIiwiX2lzQ29tcGlsZWQiLCJzdGF0ZSIsImV4dHJhY3RTdGF0ZSIsImtlZXBBbGl2ZSIsIm1vdW50Q29tcG9uZW50IiwicmVzdG9yZVN0YXRlIiwiY2lkIiwiJGRhdGEiLCJjaGlsZHJlbiIsIiRjaGlsZHJlbiIsImlzUm9vdCIsIm9sZEFzeW5jQ29uZmlnIiwiY29uZmlnIiwiYXN5bmMiLCJfcHJvcHMiLCJrZXlzIiwia2V5IiwiaGFzU2FtZUNoaWxkcmVuIiwiZXZlcnkiLCJjIiwiaSIsIm1hdGNoIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSUEsR0FBSixDLENBQVE7QUFDUixJQUFJQyxNQUFNQyxPQUFPQyxNQUFQLENBQWMsSUFBZCxDQUFWO0FBQ0EsSUFBSUMsVUFBVSxLQUFkO0FBQ0EsSUFBSUMsZUFBZSxLQUFuQjs7QUFFQTs7Ozs7OztBQU9BQyxRQUFRQyxPQUFSLEdBQWtCLFVBQVVDLEdBQVYsRUFBZUMsVUFBZixFQUEyQjtBQUMzQyxNQUFJTCxPQUFKLEVBQWE7QUFDYkEsWUFBVSxJQUFWOztBQUVBSixRQUFNUSxHQUFOO0FBQ0FILGlCQUFlSSxVQUFmOztBQUVBSCxVQUFRSSxVQUFSLEdBQXFCLENBQUMsQ0FBQ1YsSUFBSVcsa0JBQTNCO0FBQ0EsTUFBSSxDQUFDTCxRQUFRSSxVQUFiLEVBQXlCO0FBQ3ZCRSxZQUFRQyxJQUFSLENBQ0UseURBQ0EsZ0JBRkY7QUFJQTtBQUNEOztBQUVEO0FBQ0FDLFlBQVVkLElBQUlXLGtCQUFKLENBQXVCSSxTQUFqQztBQUNBSCxVQUFRSSxHQUFSLENBQVksOENBQVo7QUFDQTtBQUNBLE1BQUlDLGFBQWFqQixJQUFJa0IsZ0JBQUosQ0FBcUIsYUFBckIsQ0FBakI7QUFDQSxNQUFJRCxVQUFKLEVBQWdCO0FBQ2RILGNBQVVHLFVBQVY7QUFDQUwsWUFBUUksR0FBUixDQUFZLHlEQUFaO0FBQ0Q7QUFDRixDQXpCRDs7QUEyQkE7Ozs7OztBQU1BLFNBQVNGLFNBQVQsQ0FBb0JLLElBQXBCLEVBQTBCO0FBQ3hCLE1BQUlDLFVBQVVELEtBQUtDLE9BQW5CO0FBQ0FELE9BQUtDLE9BQUwsR0FBZSxVQUFVQyxLQUFWLEVBQWlCO0FBQzlCLFFBQUksQ0FBQyxLQUFLQyxXQUFWLEVBQXVCO0FBQ3JCLFVBQUlDLGdCQUFnQixLQUFLQyxPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYUMsV0FBakQ7QUFDQUMsaUJBQVdI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QUNBLFNBQU9BLFFBQVFBLE1BQU0sQ0FBTixDQUFSLEdBQW1CMUQsRUFBMUI7QUFDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBWdWUgLy8gbGF0ZSBiaW5kXG52YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxudmFyIHNoaW1tZWQgPSBmYWxzZVxudmFyIGlzQnJvd3NlcmlmeSA9IGZhbHNlXG5cbi8qKlxuICogRGV0ZXJtaW5lIGNvbXBhdGliaWxpdHkgYW5kIGFwcGx5IHBhdGNoLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHZ1ZVxuICogQHBhcmFtIHtCb29sZWFufSBicm93c2VyaWZ5XG4gKi9cblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKHZ1ZSwgYnJvd3NlcmlmeSkge1xuICBpZiAoc2hpbW1lZCkgcmV0dXJuXG4gIHNoaW1tZWQgPSB0cnVlXG5cbiAgVnVlID0gdnVlXG4gIGlzQnJvd3NlcmlmeSA9IGJyb3dzZXJpZnlcblxuICBleHBvcnRzLmNvbXBhdGlibGUgPSAhIVZ1ZS5pbnRlcm5hbERpcmVjdGl2ZXNcbiAgaWYgKCFleHBvcnRzLmNvbXBhdGlibGUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnW0hNUl0gdnVlLWxvYWRlciBob3QgcmVsb2FkIGlzIG9ubHkgY29tcGF0aWJsZSB3aXRoICcgK1xuICAgICAgJ1Z1ZS5qcyAxLjAuMCsuJ1xuICAgIClcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIHBhdGNoIHZpZXcgZGlyZWN0aXZlXG4gIHBhdGNoVmlldyhWdWUuaW50ZXJuYWxEaXJlY3RpdmVzLmNvbXBvbmVudClcbiAgY29uc29sZS5sb2coJ1tITVJdIFZ1ZSBjb21wb25lbnQgaG90IHJlbG9hZCBzaGltIGFwcGxpZWQuJylcbiAgLy8gc2hpbSByb3V0ZXItdmlldyBpZiBwcmVzZW50XG4gIHZhciByb3V0ZXJWaWV3ID0gVnVlLmVsZW1lbnREaXJlY3RpdmUoJ3JvdXRlci12aWV3JylcbiAgaWYgKHJvdXRlclZpZXcpIHtcbiAgICBwYXRjaFZpZXcocm91dGVyVmlldylcbiAgICBjb25zb2xlLmxvZygnW0hNUl0gdnVlLXJvdXRlciA8cm91dGVyLXZpZXc+IGhvdCByZWxvYWQgc2hpbSBhcHBsaWVkLicpXG4gIH1cbn1cblxuLyoqXG4gKiBTaGltIHRoZSB2aWV3IGRpcmVjdGl2ZSAoY29tcG9uZW50IG9yIHJvdXRlci12aWV3KS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gVmlld1xuICovXG5cbmZ1bmN0aW9uIHBhdGNoVmlldyAoVmlldykge1xuICB2YXIgdW5idWlsZCA9IFZpZXcudW5idWlsZFxuICBWaWV3LnVuYnVpbGQgPSBmdW5jdGlvbiAoZGVmZXIpIHtcbiAgICBpZiAoIXRoaXMuaG90VXBkYXRpbmcpIHtcbiAgICAgIHZhciBwcmV2Q29tcG9uZW50ID0gdGhpcy5jaGlsZFZNICYmIHRoaXMuY2hpbGRWTS5jb25zdHJ1Y3RvclxuICAgICAgcmVtb3ZlVmlldyhwcmV2Q29tcG9uZW50LCB0aGlzKVxuICAgICAgLy8gZGVmZXIgPSB0cnVlIG1lYW5zIHdlIGFyZSB0cmFuc2l0aW9uaW5nIHRvIGEgbmV3XG4gICAgICAvLyBDb21wb25lbnQuIFJlZ2lzdGVyIHRoaXMgbmV3IGNvbXBvbmVudCB0byB0aGUgbGlzdC5cbiAgICAgIGlmIChkZWZlcikge1xuICAgICAgICBhZGRWaWV3KHRoaXMuQ29tcG9uZW50LCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjYWxsIG9yaWdpbmFsXG4gICAgcmV0dXJuIHVuYnVpbGQuY2FsbCh0aGlzLCBkZWZlcilcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBhIGNvbXBvbmVudCB2aWV3IHRvIGEgQ29tcG9uZW50J3MgaG90IGxpc3RcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBDb21wb25lbnRcbiAqIEBwYXJhbSB7RGlyZWN0aXZlfSB2aWV3IC0gdmlldyBkaXJlY3RpdmUgaW5zdGFuY2VcbiAqL1xuXG5mdW5jdGlvbiBhZGRWaWV3IChDb21wb25lbnQsIHZpZXcpIHtcbiAgdmFyIGlkID0gQ29tcG9uZW50ICYmIENvbXBvbmVudC5vcHRpb25zLmhvdElEXG4gIGlmIChpZCkge1xuICAgIGlmICghbWFwW2lkXSkge1xuICAgICAgbWFwW2lkXSA9IHtcbiAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgICAgIHZpZXdzOiBbXSxcbiAgICAgICAgaW5zdGFuY2VzOiBbXVxuICAgICAgfVxuICAgIH1cbiAgICBtYXBbaWRdLnZpZXdzLnB1c2godmlldylcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGNvbXBvbmVudCB2aWV3IGZyb20gYSBDb21wb25lbnQncyBob3QgbGlzdFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvbXBvbmVudFxuICogQHBhcmFtIHtEaXJlY3RpdmV9IHZpZXcgLSB2aWV3IGRpcmVjdGl2ZSBpbnN0YW5jZVxuICovXG5cbmZ1bmN0aW9uIHJlbW92ZVZpZXcgKENvbXBvbmVudCwgdmlldykge1xuICB2YXIgaWQgPSBDb21wb25lbnQgJiYgQ29tcG9uZW50Lm9wdGlvbnMuaG90SURcbiAgaWYgKGlkKSB7XG4gICAgbWFwW2lkXS52aWV3cy4kcmVtb3ZlKHZpZXcpXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSByZWNvcmQgZm9yIGEgaG90IG1vZHVsZSwgd2hpY2gga2VlcHMgdHJhY2sgb2YgaXRzIGNvbnN0cnVjb3RyLFxuICogaW5zdG5hY2VzIGFuZCB2aWV3cyAoY29tcG9uZW50IGRpcmVjdGl2ZXMgb3Igcm91dGVyLXZpZXdzKS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cblxuZXhwb3J0cy5jcmVhdGVSZWNvcmQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMub3B0aW9uc1xuICB9XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5lbCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIG9wdGlvbnMuZGF0YSAhPT0gJ29iamVjdCcpIHtcbiAgICBtYWtlT3B0aW9uc0hvdChpZCwgb3B0aW9ucylcbiAgICBtYXBbaWRdID0ge1xuICAgICAgQ29tcG9uZW50OiBudWxsLFxuICAgICAgdmlld3M6IFtdLFxuICAgICAgaW5zdGFuY2VzOiBbXVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1ha2UgYSBDb21wb25lbnQgb3B0aW9ucyBvYmplY3QgaG90LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuXG5mdW5jdGlvbiBtYWtlT3B0aW9uc0hvdCAoaWQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucy5ob3RJRCA9IGlkXG4gIGluamVjdEhvb2sob3B0aW9ucywgJ2NyZWF0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlY29yZCA9IG1hcFtpZF1cbiAgICBpZiAoIXJlY29yZC5Db21wb25lbnQpIHtcbiAgICAgIHJlY29yZC5Db21wb25lbnQgPSB0aGlzLmNvbnN0cnVjdG9yXG4gICAgfVxuICAgIHJlY29yZC5pbnN0YW5jZXMucHVzaCh0aGlzKVxuICB9KVxuICBpbmplY3RIb29rKG9wdGlvbnMsICdiZWZvcmVEZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIG1hcFtpZF0uaW5zdGFuY2VzLiRyZW1vdmUodGhpcylcbiAgfSlcbn1cblxuLyoqXG4gKiBJbmplY3QgYSBob29rIHRvIGEgaG90IHJlbG9hZGFibGUgY29tcG9uZW50IHNvIHRoYXRcbiAqIHdlIGNhbiBrZWVwIHRyYWNrIG9mIGl0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va1xuICovXG5cbmZ1bmN0aW9uIGluamVjdEhvb2sgKG9wdGlvbnMsIG5hbWUsIGhvb2spIHtcbiAgdmFyIGV4aXN0aW5nID0gb3B0aW9uc1tuYW1lXVxuICBvcHRpb25zW25hbWVdID0gZXhpc3RpbmdcbiAgICA/IEFycmF5LmlzQXJyYXkoZXhpc3RpbmcpXG4gICAgICA/IGV4aXN0aW5nLmNvbmNhdChob29rKVxuICAgICAgOiBbZXhpc3RpbmcsIGhvb2tdXG4gICAgOiBbaG9va11cbn1cblxuLyoqXG4gKiBVcGRhdGUgYSBob3QgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICogQHBhcmFtIHtPYmplY3R8bnVsbH0gbmV3T3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gbmV3VGVtcGxhdGVcbiAqL1xuXG5leHBvcnRzLnVwZGF0ZSA9IGZ1bmN0aW9uIChpZCwgbmV3T3B0aW9ucywgbmV3VGVtcGxhdGUpIHtcbiAgdmFyIHJlY29yZCA9IG1hcFtpZF1cbiAgLy8gZm9yY2UgZnVsbC1yZWxvYWQgaWYgYW4gaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBpcyBhY3RpdmUgYnV0IGlzIG5vdFxuICAvLyBtYW5hZ2VkIGJ5IGEgdmlld1xuICBpZiAoIXJlY29yZCB8fCAocmVjb3JkLmluc3RhbmNlcy5sZW5ndGggJiYgIXJlY29yZC52aWV3cy5sZW5ndGgpKSB7XG4gICAgY29uc29sZS5sb2coJ1tITVJdIFJvb3Qgb3IgbWFudWFsbHktbW91bnRlZCBpbnN0YW5jZSBtb2RpZmllZC4gRnVsbCByZWxvYWQgbWF5IGJlIHJlcXVpcmVkLicpXG4gICAgaWYgKCFpc0Jyb3dzZXJpZnkpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBicm93c2VyaWZ5LWhtciBzb21laG93IHNlbmRzIGluY29tcGxldGUgYnVuZGxlIGlmIHdlIHJlbG9hZCBoZXJlXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgaWYgKCFpc0Jyb3dzZXJpZnkpIHtcbiAgICAvLyBicm93c2VyaWZ5LWhtciBhbHJlYWR5IGxvZ3MgdGhpc1xuICAgIGNvbnNvbGUubG9nKCdbSE1SXSBVcGRhdGluZyBjb21wb25lbnQ6ICcgKyBmb3JtYXQoaWQpKVxuICB9XG4gIHZhciBDb21wb25lbnQgPSByZWNvcmQuQ29tcG9uZW50XG4gIC8vIHVwZGF0ZSBjb25zdHJ1Y3RvclxuICBpZiAobmV3T3B0aW9ucykge1xuICAgIC8vIGluIGNhc2UgdGhlIHVzZXIgZXhwb3J0cyBhIGNvbnN0cnVjdG9yXG4gICAgQ29tcG9uZW50ID0gcmVjb3JkLkNvbXBvbmVudCA9IHR5cGVvZiBuZXdPcHRpb25zID09PSAnZnVuY3Rpb24nXG4gICAgICA/IG5ld09wdGlvbnNcbiAgICAgIDogVnVlLmV4dGVuZChuZXdPcHRpb25zKVxuICAgIG1ha2VPcHRpb25zSG90KGlkLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBpZiAobmV3VGVtcGxhdGUpIHtcbiAgICBDb21wb25lbnQub3B0aW9ucy50ZW1wbGF0ZSA9IG5ld1RlbXBsYXRlXG4gIH1cbiAgLy8gaGFuZGxlIHJlY3Vyc2l2ZSBsb29rdXBcbiAgaWYgKENvbXBvbmVudC5vcHRpb25zLm5hbWUpIHtcbiAgICBDb21wb25lbnQub3B0aW9ucy5jb21wb25lbnRzW0NvbXBvbmVudC5vcHRpb25zLm5hbWVdID0gQ29tcG9uZW50XG4gIH1cbiAgLy8gcmVzZXQgY29uc3RydWN0b3IgY2FjaGVkIGxpbmtlclxuICBDb21wb25lbnQubGlua2VyID0gbnVsbFxuICAvLyByZWxvYWQgYWxsIHZpZXdzXG4gIHJlY29yZC52aWV3cy5mb3JFYWNoKGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgdXBkYXRlVmlldyh2aWV3LCBDb21wb25lbnQpXG4gIH0pXG4gIC8vIGZsdXNoIGRldnRvb2xzXG4gIGlmICh3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfXykge1xuICAgIHdpbmRvdy5fX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fLmVtaXQoJ2ZsdXNoJylcbiAgfVxufVxuXG4vKipcbiAqIFVwZGF0ZSBhIGNvbXBvbmVudCB2aWV3IGluc3RhbmNlXG4gKlxuICogQHBhcmFtIHtEaXJlY3RpdmV9IHZpZXdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvbXBvbmVudFxuICovXG5cbmZ1bmN0aW9uIHVwZGF0ZVZpZXcgKHZpZXcsIENvbXBvbmVudCkge1xuICBpZiAoIXZpZXcuX2JvdW5kKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmlldy5Db21wb25lbnQgPSBDb21wb25lbnRcbiAgdmlldy5ob3RVcGRhdGluZyA9IHRydWVcbiAgLy8gZGlzYWJsZSB0cmFuc2l0aW9uc1xuICB2aWV3LnZtLl9pc0NvbXBpbGVkID0gZmFsc2VcbiAgLy8gc2F2ZSBzdGF0ZVxuICB2YXIgc3RhdGUgPSBleHRyYWN0U3RhdGUodmlldy5jaGlsZFZNKVxuICAvLyByZW1vdW50LCBtYWtlIHN1cmUgdG8gZGlzYWJsZSBrZWVwLWFsaXZlXG4gIHZhciBrZWVwQWxpdmUgPSB2aWV3LmtlZXBBbGl2ZVxuICB2aWV3LmtlZXBBbGl2ZSA9IGZhbHNlXG4gIHZpZXcubW91bnRDb21wb25lbnQoKVxuICB2aWV3LmtlZXBBbGl2ZSA9IGtlZXBBbGl2ZVxuICAvLyByZXN0b3JlIHN0YXRlXG4gIHJlc3RvcmVTdGF0ZSh2aWV3LmNoaWxkVk0sIHN0YXRlLCB0cnVlKVxuICAvLyByZS1lYW5ibGUgdHJhbnNpdGlvbnNcbiAgdmlldy52bS5faXNDb21waWxlZCA9IHRydWVcbiAgdmlldy5ob3RVcGRhdGluZyA9IGZhbHNlXG59XG5cbi8qKlxuICogRXh0cmFjdCBzdGF0ZSBmcm9tIGEgVnVlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGV4dHJhY3RTdGF0ZSAodm0pIHtcbiAgcmV0dXJuIHtcbiAgICBjaWQ6IHZtLmNvbnN0cnVjdG9yLmNpZCxcbiAgICBkYXRhOiB2bS4kZGF0YSxcbiAgICBjaGlsZHJlbjogdm0uJGNoaWxkcmVuLm1hcChleHRyYWN0U3RhdGUpXG4gIH1cbn1cblxuLyoqXG4gKiBSZXN0b3JlIHN0YXRlIHRvIGEgcmVsb2FkZWQgVnVlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKi9cblxuZnVuY3Rpb24gcmVzdG9yZVN0YXRlICh2bSwgc3RhdGUsIGlzUm9vdCkge1xuICB2YXIgb2xkQXN5bmNDb25maWdcbiAgaWYgKGlzUm9vdCkge1xuICAgIC8vIHNldCBWdWUgaW50byBzeW5jIG1vZGUgZHVyaW5nIHN0YXRlIHJlaHlkcmF0aW9uXG4gICAgb2xkQXN5bmNDb25maWcgPSBWdWUuY29uZmlnLmFzeW5jXG4gICAgVnVlLmNvbmZpZy5hc3luYyA9IGZhbHNlXG4gIH1cbiAgLy8gYWN0dWFsIHJlc3RvcmVcbiAgaWYgKGlzUm9vdCB8fCAhdm0uX3Byb3BzKSB7XG4gICAgdm0uJGRhdGEgPSBzdGF0ZS5kYXRhXG4gIH0gZWxzZSB7XG4gICAgT2JqZWN0LmtleXMoc3RhdGUuZGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoIXZtLl9wcm9wc1trZXldKSB7XG4gICAgICAgIC8vIGZvciBub24tcm9vdCwgb25seSByZXN0b3JlIG5vbi1wcm9wcyBmaWVsZHNcbiAgICAgICAgdm0uJGRhdGFba2V5XSA9IHN0YXRlLmRhdGFba2V5XVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLy8gdmVyaWZ5IGNoaWxkIGNvbnNpc3RlbmN5XG4gIHZhciBoYXNTYW1lQ2hpbGRyZW4gPSB2bS4kY2hpbGRyZW4uZXZlcnkoZnVuY3Rpb24gKGMsIGkpIHtcbiAgICByZXR1cm4gc3RhdGUuY2hpbGRyZW5baV0gJiYgc3RhdGUuY2hpbGRyZW5baV0uY2lkID09PSBjLmNvbnN0cnVjdG9yLmNpZFxuICB9KVxuICBpZiAoaGFzU2FtZUNoaWxkcmVuKSB7XG4gICAgLy8gcmVoeWRyYXRlIGNoaWxkcmVuXG4gICAgdm0uJGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMsIGkpIHtcbiAgICAgIHJlc3RvcmVTdGF0ZShjLCBzdGF0ZS5jaGlsZHJlbltpXSlcbiAgICB9KVxuICB9XG4gIGlmIChpc1Jvb3QpIHtcbiAgICBWdWUuY29uZmlnLmFzeW5jID0gb2xkQXN5bmNDb25maWdcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXQgKGlkKSB7XG4gIHZhciBtYXRjaCA9IGlkLm1hdGNoKC9bXlxcL10rXFwudnVlJC8pXG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdIDogaWRcbn1cbiJdfQ==
},{}],3:[function(require,module,exports){
(function (process,global){
/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' ||
  // $flow-disable-line
  (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' || typeof value === 'boolean';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop(a, b, c) {}

/**
 * Always return false.
 */
var no = function no(a, b, c) {
  return false;
};

/**
 * Return same value
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = {}.watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check
var formatComponentName = noop;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) {
        res += str;
      }
      if (n > 1) {
        str += str;
      }
      n >>= 1;
    }
    return res;
  };

  generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode(text) {
  if (text === void 0) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned;
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject) {
    return;
  }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (process.env.NODE_ENV !== 'production' &&
  // skip validation for weex recycle-list child component props
  !(false && isObject(value) && '@binding' in value)) {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn("Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ') + ", got " + toRawType(value) + ".", vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}

/*  */

function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;
    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) {
              return;
            }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function macroTimerFunc() {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
// PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function macroTimerFunc() {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function macroTimerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function microTimerFunc() {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) {
      setTimeout(noop);
    }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask(fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res;
  });
}

function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };
    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i);
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function forceRender() {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(process.env.NODE_ENV !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break;
        }
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, "event handler for \"" + event + "\"");
        }
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}

function resolveScopedSlots(fns, // see flow/vnode
res) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res;
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  if (process.env.NODE_ENV !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn("Method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }
      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
      /* istanbul ignore next */
      return Object.getOwnPropertyDescriptor(inject, key).enumerable;
    }) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }
    return result;
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    ret._isVList = true;
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes);
  } else {
    return nodes;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function loop(key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) {
        loop(key);
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree;
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}

/*  */

function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    return resolveSlots(children, parent);
  };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }
    if (isDef(data)) {
      registerDeepBindings(data);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (process.env.NODE_ENV !== 'production') {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };
}

/*  */

var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },

  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
      // not included
      include && (!name || !matches(include, name)) ||
      // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive

  /*  */

};function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */
  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }
      res += stringified;
    }
  }
  return res;
}

function stringifyObject(value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }
      res += key;
    }
  }
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (process.env.NODE_ENV !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && !el.__ieph) {
      var blocker = function blocker(e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs

  /*  */

};function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass

  /*  */

  /*  */

  // add a raw attr (use this in preTransforms)


  // note: this only removes the attr from the Array (attrsList) so that it
  // doesn't get processed by processAttrs.
  // By default it does NOT remove it from the map (attrsMap) because the map is
  // needed during codegen.

  /*  */

  /**
   * Cross-platform code generation for component v-model
   */

  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */

  /*  */

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
};var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler(handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}

function add$1(event, handler, once$$1, capture, passive) {
  handler = withMacroTask(handler);
  if (once$$1) {
    handler = createOnceHandler(handler, event, capture);
  }
  target$1.addEventListener(event, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners

  /*  */

};function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}
  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false;
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps

  /*  */

};var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle

  /*  */

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
};function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def === 'undefined' ? 'undefined' : _typeof(def)) === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show

  /*  */

  // Provides transition support for a single element/component.
  // supports transition mode (out-in / in-out)

};var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag || isAsyncPlaceholder(c);
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
    // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }

  /*  */

  // Provides transition support for list items.
  // supports move transitions using the FLIP technique.

  // Because the vdom's children update algorithm is "unstable" - i.e.
  // it doesn't guarantee the relative positioning of removed elements,
  // we force transition-group to update its children into two passes:
  // in the first pass, we remove all nodes that need to be removed,
  // triggering their leaving transition; in the second pass, we insert/move
  // into the final desired state. This way in the second pass removed
  // nodes will remain where they should be.

};var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup

  /*  */

  // install platform specific utils
};Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && isChrome) {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}

/*  */

module.exports = Vue;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZ1ZS5ydW50aW1lLmNvbW1vbi5qcyJdLCJuYW1lcyI6WyJlbXB0eU9iamVjdCIsIk9iamVjdCIsImZyZWV6ZSIsImlzVW5kZWYiLCJ2IiwidW5kZWZpbmVkIiwiaXNEZWYiLCJpc1RydWUiLCJpc0ZhbHNlIiwiaXNQcmltaXRpdmUiLCJ2YWx1ZSIsImlzT2JqZWN0Iiwib2JqIiwiX3RvU3RyaW5nIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJ0b1Jhd1R5cGUiLCJjYWxsIiwic2xpY2UiLCJpc1BsYWluT2JqZWN0IiwiaXNSZWdFeHAiLCJpc1ZhbGlkQXJyYXlJbmRleCIsInZhbCIsIm4iLCJwYXJzZUZsb2F0IiwiU3RyaW5nIiwiTWF0aCIsImZsb29yIiwiaXNGaW5pdGUiLCJKU09OIiwic3RyaW5naWZ5IiwidG9OdW1iZXIiLCJpc05hTiIsIm1ha2VNYXAiLCJzdHIiLCJleHBlY3RzTG93ZXJDYXNlIiwibWFwIiwiY3JlYXRlIiwibGlzdCIsInNwbGl0IiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiaXNCdWlsdEluVGFnIiwiaXNSZXNlcnZlZEF0dHJpYnV0ZSIsInJlbW92ZSIsImFyciIsIml0ZW0iLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc093biIsImtleSIsImNhY2hlZCIsImZuIiwiY2FjaGUiLCJjYWNoZWRGbiIsImhpdCIsImNhbWVsaXplUkUiLCJjYW1lbGl6ZSIsInJlcGxhY2UiLCJfIiwiYyIsInRvVXBwZXJDYXNlIiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsImh5cGhlbmF0ZVJFIiwiaHlwaGVuYXRlIiwicG9seWZpbGxCaW5kIiwiY3R4IiwiYm91bmRGbiIsImEiLCJsIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbGVuZ3RoIiwibmF0aXZlQmluZCIsImJpbmQiLCJGdW5jdGlvbiIsInRvQXJyYXkiLCJzdGFydCIsInJldCIsIkFycmF5IiwiZXh0ZW5kIiwidG8iLCJfZnJvbSIsInRvT2JqZWN0IiwicmVzIiwibm9vcCIsImIiLCJubyIsImlkZW50aXR5IiwibG9vc2VFcXVhbCIsImlzT2JqZWN0QSIsImlzT2JqZWN0QiIsImlzQXJyYXlBIiwiaXNBcnJheSIsImlzQXJyYXlCIiwiZXZlcnkiLCJlIiwia2V5c0EiLCJrZXlzIiwia2V5c0IiLCJsb29zZUluZGV4T2YiLCJvbmNlIiwiY2FsbGVkIiwiU1NSX0FUVFIiLCJBU1NFVF9UWVBFUyIsIkxJRkVDWUNMRV9IT09LUyIsImNvbmZpZyIsIm9wdGlvbk1lcmdlU3RyYXRlZ2llcyIsInNpbGVudCIsInByb2R1Y3Rpb25UaXAiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJkZXZ0b29scyIsInBlcmZvcm1hbmNlIiwiZXJyb3JIYW5kbGVyIiwid2FybkhhbmRsZXIiLCJpZ25vcmVkRWxlbWVudHMiLCJrZXlDb2RlcyIsImlzUmVzZXJ2ZWRUYWciLCJpc1Jlc2VydmVkQXR0ciIsImlzVW5rbm93bkVsZW1lbnQiLCJnZXRUYWdOYW1lc3BhY2UiLCJwYXJzZVBsYXRmb3JtVGFnTmFtZSIsIm11c3RVc2VQcm9wIiwiX2xpZmVjeWNsZUhvb2tzIiwiaXNSZXNlcnZlZCIsImNoYXJDb2RlQXQiLCJkZWYiLCJlbnVtZXJhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJ3cml0YWJsZSIsImNvbmZpZ3VyYWJsZSIsImJhaWxSRSIsInBhcnNlUGF0aCIsInBhdGgiLCJ0ZXN0Iiwic2VnbWVudHMiLCJoYXNQcm90byIsImluQnJvd3NlciIsIndpbmRvdyIsImluV2VleCIsIldYRW52aXJvbm1lbnQiLCJwbGF0Zm9ybSIsIndlZXhQbGF0Zm9ybSIsIlVBIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaXNJRSIsImlzSUU5IiwiaXNFZGdlIiwiaXNBbmRyb2lkIiwiaXNJT1MiLCJpc0Nocm9tZSIsIm5hdGl2ZVdhdGNoIiwid2F0Y2giLCJzdXBwb3J0c1Bhc3NpdmUiLCJvcHRzIiwiZ2V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9pc1NlcnZlciIsImlzU2VydmVyUmVuZGVyaW5nIiwiZ2xvYmFsIiwiVlVFX0VOViIsIl9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX18iLCJpc05hdGl2ZSIsIkN0b3IiLCJoYXNTeW1ib2wiLCJTeW1ib2wiLCJSZWZsZWN0Iiwib3duS2V5cyIsIl9TZXQiLCJTZXQiLCJzZXQiLCJoYXMiLCJhZGQiLCJjbGVhciIsIndhcm4iLCJ0aXAiLCJnZW5lcmF0ZUNvbXBvbmVudFRyYWNlIiwiZm9ybWF0Q29tcG9uZW50TmFtZSIsImhhc0NvbnNvbGUiLCJjb25zb2xlIiwiY2xhc3NpZnlSRSIsImNsYXNzaWZ5IiwibXNnIiwidm0iLCJ0cmFjZSIsImVycm9yIiwiaW5jbHVkZUZpbGUiLCIkcm9vdCIsIm9wdGlvbnMiLCJjaWQiLCJfaXNWdWUiLCIkb3B0aW9ucyIsImNvbnN0cnVjdG9yIiwibmFtZSIsIl9jb21wb25lbnRUYWciLCJmaWxlIiwiX19maWxlIiwibWF0Y2giLCJyZXBlYXQiLCIkcGFyZW50IiwidHJlZSIsImN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSIsImxhc3QiLCJwdXNoIiwiam9pbiIsInVpZCIsIkRlcCIsImlkIiwic3VicyIsImFkZFN1YiIsInN1YiIsInJlbW92ZVN1YiIsImRlcGVuZCIsInRhcmdldCIsImFkZERlcCIsIm5vdGlmeSIsInVwZGF0ZSIsInRhcmdldFN0YWNrIiwicHVzaFRhcmdldCIsIl90YXJnZXQiLCJwb3BUYXJnZXQiLCJwb3AiLCJWTm9kZSIsInRhZyIsImRhdGEiLCJjaGlsZHJlbiIsInRleHQiLCJlbG0iLCJjb250ZXh0IiwiY29tcG9uZW50T3B0aW9ucyIsImFzeW5jRmFjdG9yeSIsIm5zIiwiZm5Db250ZXh0IiwiZm5PcHRpb25zIiwiZm5TY29wZUlkIiwiY29tcG9uZW50SW5zdGFuY2UiLCJwYXJlbnQiLCJyYXciLCJpc1N0YXRpYyIsImlzUm9vdEluc2VydCIsImlzQ29tbWVudCIsImlzQ2xvbmVkIiwiaXNPbmNlIiwiYXN5bmNNZXRhIiwiaXNBc3luY1BsYWNlaG9sZGVyIiwicHJvdG90eXBlQWNjZXNzb3JzIiwiY2hpbGQiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiY3JlYXRlRW1wdHlWTm9kZSIsIm5vZGUiLCJjcmVhdGVUZXh0Vk5vZGUiLCJjbG9uZVZOb2RlIiwidm5vZGUiLCJjbG9uZWQiLCJhcnJheVByb3RvIiwiYXJyYXlNZXRob2RzIiwibWV0aG9kc1RvUGF0Y2giLCJmb3JFYWNoIiwibWV0aG9kIiwib3JpZ2luYWwiLCJtdXRhdG9yIiwiYXJncyIsImxlbiIsInJlc3VsdCIsIm9iIiwiX19vYl9fIiwiaW5zZXJ0ZWQiLCJvYnNlcnZlQXJyYXkiLCJkZXAiLCJhcnJheUtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwic2hvdWxkT2JzZXJ2ZSIsInRvZ2dsZU9ic2VydmluZyIsIk9ic2VydmVyIiwidm1Db3VudCIsImF1Z21lbnQiLCJwcm90b0F1Z21lbnQiLCJjb3B5QXVnbWVudCIsIndhbGsiLCJkZWZpbmVSZWFjdGl2ZSIsIml0ZW1zIiwib2JzZXJ2ZSIsInNyYyIsIl9fcHJvdG9fXyIsImFzUm9vdERhdGEiLCJpc0V4dGVuc2libGUiLCJjdXN0b21TZXR0ZXIiLCJzaGFsbG93IiwicHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXR0ZXIiLCJzZXR0ZXIiLCJjaGlsZE9iIiwicmVhY3RpdmVHZXR0ZXIiLCJkZXBlbmRBcnJheSIsInJlYWN0aXZlU2V0dGVyIiwibmV3VmFsIiwibWF4IiwiZGVsIiwic3RyYXRzIiwiZWwiLCJwcm9wc0RhdGEiLCJkZWZhdWx0U3RyYXQiLCJtZXJnZURhdGEiLCJmcm9tIiwidG9WYWwiLCJmcm9tVmFsIiwibWVyZ2VEYXRhT3JGbiIsInBhcmVudFZhbCIsImNoaWxkVmFsIiwibWVyZ2VkRGF0YUZuIiwibWVyZ2VkSW5zdGFuY2VEYXRhRm4iLCJpbnN0YW5jZURhdGEiLCJkZWZhdWx0RGF0YSIsIm1lcmdlSG9vayIsImNvbmNhdCIsImhvb2siLCJtZXJnZUFzc2V0cyIsImFzc2VydE9iamVjdFR5cGUiLCJ0eXBlIiwia2V5JDEiLCJwcm9wcyIsIm1ldGhvZHMiLCJpbmplY3QiLCJjb21wdXRlZCIsInByb3ZpZGUiLCJjaGVja0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwidmFsaWRhdGVDb21wb25lbnROYW1lIiwibm9ybWFsaXplUHJvcHMiLCJub3JtYWxpemVJbmplY3QiLCJub3JtYWxpemVkIiwibm9ybWFsaXplRGlyZWN0aXZlcyIsImRpcnMiLCJkaXJlY3RpdmVzIiwibWVyZ2VPcHRpb25zIiwiZXh0ZW5kc0Zyb20iLCJleHRlbmRzIiwibWl4aW5zIiwibWVyZ2VGaWVsZCIsInN0cmF0IiwicmVzb2x2ZUFzc2V0Iiwid2Fybk1pc3NpbmciLCJhc3NldHMiLCJjYW1lbGl6ZWRJZCIsIlBhc2NhbENhc2VJZCIsInZhbGlkYXRlUHJvcCIsInByb3BPcHRpb25zIiwicHJvcCIsImFic2VudCIsImJvb2xlYW5JbmRleCIsImdldFR5cGVJbmRleCIsIkJvb2xlYW4iLCJzdHJpbmdJbmRleCIsImdldFByb3BEZWZhdWx0VmFsdWUiLCJwcmV2U2hvdWxkT2JzZXJ2ZSIsImFzc2VydFByb3AiLCJkZWZhdWx0IiwiX3Byb3BzIiwiZ2V0VHlwZSIsInJlcXVpcmVkIiwidmFsaWQiLCJleHBlY3RlZFR5cGVzIiwiYXNzZXJ0ZWRUeXBlIiwiYXNzZXJ0VHlwZSIsImV4cGVjdGVkVHlwZSIsInZhbGlkYXRvciIsInNpbXBsZUNoZWNrUkUiLCJ0IiwiaXNTYW1lVHlwZSIsImhhbmRsZUVycm9yIiwiZXJyIiwiaW5mbyIsImN1ciIsImhvb2tzIiwiZXJyb3JDYXB0dXJlZCIsImNhcHR1cmUiLCJnbG9iYWxIYW5kbGVFcnJvciIsImxvZ0Vycm9yIiwiY2FsbGJhY2tzIiwicGVuZGluZyIsImZsdXNoQ2FsbGJhY2tzIiwiY29waWVzIiwibWljcm9UaW1lckZ1bmMiLCJtYWNyb1RpbWVyRnVuYyIsInVzZU1hY3JvVGFzayIsInNldEltbWVkaWF0ZSIsIk1lc3NhZ2VDaGFubmVsIiwiY2hhbm5lbCIsInBvcnQiLCJwb3J0MiIsInBvcnQxIiwib25tZXNzYWdlIiwicG9zdE1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwiUHJvbWlzZSIsInAiLCJyZXNvbHZlIiwidGhlbiIsIndpdGhNYWNyb1Rhc2siLCJfd2l0aFRhc2siLCJuZXh0VGljayIsImNiIiwiX3Jlc29sdmUiLCJpbml0UHJveHkiLCJhbGxvd2VkR2xvYmFscyIsIndhcm5Ob25QcmVzZW50IiwiaGFzUHJveHkiLCJQcm94eSIsImlzQnVpbHRJbk1vZGlmaWVyIiwiaGFzSGFuZGxlciIsImlzQWxsb3dlZCIsImdldEhhbmRsZXIiLCJoYW5kbGVycyIsInJlbmRlciIsIl93aXRoU3RyaXBwZWQiLCJfcmVuZGVyUHJveHkiLCJzZWVuT2JqZWN0cyIsInRyYXZlcnNlIiwiX3RyYXZlcnNlIiwic2VlbiIsImlzQSIsImlzRnJvemVuIiwiZGVwSWQiLCJtYXJrIiwibWVhc3VyZSIsInBlcmYiLCJjbGVhck1hcmtzIiwiY2xlYXJNZWFzdXJlcyIsInN0YXJ0VGFnIiwiZW5kVGFnIiwibm9ybWFsaXplRXZlbnQiLCJwYXNzaXZlIiwib25jZSQkMSIsImNyZWF0ZUZuSW52b2tlciIsImZucyIsImludm9rZXIiLCJhcmd1bWVudHMkMSIsInVwZGF0ZUxpc3RlbmVycyIsIm9uIiwib2xkT24iLCJyZW1vdmUkJDEiLCJvbGQiLCJldmVudCIsInBhcmFtcyIsIm1lcmdlVk5vZGVIb29rIiwiaG9va0tleSIsIm9sZEhvb2siLCJ3cmFwcGVkSG9vayIsIm1lcmdlZCIsImV4dHJhY3RQcm9wc0Zyb21WTm9kZURhdGEiLCJhdHRycyIsImFsdEtleSIsImtleUluTG93ZXJDYXNlIiwiY2hlY2tQcm9wIiwiaGFzaCIsInByZXNlcnZlIiwic2ltcGxlTm9ybWFsaXplQ2hpbGRyZW4iLCJub3JtYWxpemVDaGlsZHJlbiIsIm5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4iLCJpc1RleHROb2RlIiwibmVzdGVkSW5kZXgiLCJsYXN0SW5kZXgiLCJzaGlmdCIsIl9pc1ZMaXN0IiwiZW5zdXJlQ3RvciIsImNvbXAiLCJiYXNlIiwiX19lc01vZHVsZSIsInRvU3RyaW5nVGFnIiwiY3JlYXRlQXN5bmNQbGFjZWhvbGRlciIsImZhY3RvcnkiLCJyZXNvbHZlQXN5bmNDb21wb25lbnQiLCJiYXNlQ3RvciIsImVycm9yQ29tcCIsInJlc29sdmVkIiwibG9hZGluZyIsImxvYWRpbmdDb21wIiwiY29udGV4dHMiLCJzeW5jIiwiZm9yY2VSZW5kZXIiLCIkZm9yY2VVcGRhdGUiLCJyZWplY3QiLCJyZWFzb24iLCJjb21wb25lbnQiLCJkZWxheSIsInRpbWVvdXQiLCJnZXRGaXJzdENvbXBvbmVudENoaWxkIiwiaW5pdEV2ZW50cyIsIl9ldmVudHMiLCJfaGFzSG9va0V2ZW50IiwibGlzdGVuZXJzIiwiX3BhcmVudExpc3RlbmVycyIsInVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyIsIiRvbmNlIiwiJG9uIiwicmVtb3ZlJDEiLCIkb2ZmIiwib2xkTGlzdGVuZXJzIiwiZXZlbnRzTWl4aW4iLCJWdWUiLCJob29rUkUiLCJ0aGlzJDEiLCJjYnMiLCJpJDEiLCIkZW1pdCIsImxvd2VyQ2FzZUV2ZW50IiwicmVzb2x2ZVNsb3RzIiwic2xvdHMiLCJzbG90IiwibmFtZSQxIiwiaXNXaGl0ZXNwYWNlIiwicmVzb2x2ZVNjb3BlZFNsb3RzIiwiYWN0aXZlSW5zdGFuY2UiLCJpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQiLCJpbml0TGlmZWN5Y2xlIiwiYWJzdHJhY3QiLCIkY2hpbGRyZW4iLCIkcmVmcyIsIl93YXRjaGVyIiwiX2luYWN0aXZlIiwiX2RpcmVjdEluYWN0aXZlIiwiX2lzTW91bnRlZCIsIl9pc0Rlc3Ryb3llZCIsIl9pc0JlaW5nRGVzdHJveWVkIiwibGlmZWN5Y2xlTWl4aW4iLCJfdXBkYXRlIiwiaHlkcmF0aW5nIiwiY2FsbEhvb2siLCJwcmV2RWwiLCIkZWwiLCJwcmV2Vm5vZGUiLCJfdm5vZGUiLCJwcmV2QWN0aXZlSW5zdGFuY2UiLCJfX3BhdGNoX18iLCJfcGFyZW50RWxtIiwiX3JlZkVsbSIsIl9fdnVlX18iLCIkdm5vZGUiLCIkZGVzdHJveSIsInRlYXJkb3duIiwiX3dhdGNoZXJzIiwiX2RhdGEiLCJtb3VudENvbXBvbmVudCIsInRlbXBsYXRlIiwidXBkYXRlQ29tcG9uZW50IiwiX25hbWUiLCJfdWlkIiwiX3JlbmRlciIsIldhdGNoZXIiLCJ1cGRhdGVDaGlsZENvbXBvbmVudCIsInBhcmVudFZub2RlIiwicmVuZGVyQ2hpbGRyZW4iLCJoYXNDaGlsZHJlbiIsIl9yZW5kZXJDaGlsZHJlbiIsInNjb3BlZFNsb3RzIiwiJHNjb3BlZFNsb3RzIiwiX3BhcmVudFZub2RlIiwiJGF0dHJzIiwiJGxpc3RlbmVycyIsInByb3BLZXlzIiwiX3Byb3BLZXlzIiwiJHNsb3RzIiwiaXNJbkluYWN0aXZlVHJlZSIsImFjdGl2YXRlQ2hpbGRDb21wb25lbnQiLCJkaXJlY3QiLCJkZWFjdGl2YXRlQ2hpbGRDb21wb25lbnQiLCJqIiwiTUFYX1VQREFURV9DT1VOVCIsInF1ZXVlIiwiYWN0aXZhdGVkQ2hpbGRyZW4iLCJjaXJjdWxhciIsIndhaXRpbmciLCJmbHVzaGluZyIsInJlc2V0U2NoZWR1bGVyU3RhdGUiLCJmbHVzaFNjaGVkdWxlclF1ZXVlIiwid2F0Y2hlciIsInNvcnQiLCJydW4iLCJ1c2VyIiwiZXhwcmVzc2lvbiIsImFjdGl2YXRlZFF1ZXVlIiwidXBkYXRlZFF1ZXVlIiwiY2FsbEFjdGl2YXRlZEhvb2tzIiwiY2FsbFVwZGF0ZWRIb29rcyIsImVtaXQiLCJxdWV1ZUFjdGl2YXRlZENvbXBvbmVudCIsInF1ZXVlV2F0Y2hlciIsInVpZCQxIiwiZXhwT3JGbiIsImlzUmVuZGVyV2F0Y2hlciIsImRlZXAiLCJsYXp5IiwiYWN0aXZlIiwiZGlydHkiLCJkZXBzIiwibmV3RGVwcyIsImRlcElkcyIsIm5ld0RlcElkcyIsImNsZWFudXBEZXBzIiwidG1wIiwib2xkVmFsdWUiLCJldmFsdWF0ZSIsInNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbiIsInByb3h5Iiwic291cmNlS2V5IiwicHJveHlHZXR0ZXIiLCJwcm94eVNldHRlciIsImluaXRTdGF0ZSIsImluaXRQcm9wcyIsImluaXRNZXRob2RzIiwiaW5pdERhdGEiLCJpbml0Q29tcHV0ZWQiLCJpbml0V2F0Y2giLCJwcm9wc09wdGlvbnMiLCJpc1Jvb3QiLCJsb29wIiwiaHlwaGVuYXRlZEtleSIsImdldERhdGEiLCJjb21wdXRlZFdhdGNoZXJPcHRpb25zIiwid2F0Y2hlcnMiLCJfY29tcHV0ZWRXYXRjaGVycyIsImlzU1NSIiwidXNlckRlZiIsImRlZmluZUNvbXB1dGVkIiwiJGRhdGEiLCJzaG91bGRDYWNoZSIsImNyZWF0ZUNvbXB1dGVkR2V0dGVyIiwiY29tcHV0ZWRHZXR0ZXIiLCJoYW5kbGVyIiwiY3JlYXRlV2F0Y2hlciIsIiR3YXRjaCIsInN0YXRlTWl4aW4iLCJkYXRhRGVmIiwicHJvcHNEZWYiLCJuZXdEYXRhIiwiJHNldCIsIiRkZWxldGUiLCJpbW1lZGlhdGUiLCJ1bndhdGNoRm4iLCJpbml0UHJvdmlkZSIsIl9wcm92aWRlZCIsImluaXRJbmplY3Rpb25zIiwicmVzb2x2ZUluamVjdCIsImZpbHRlciIsInByb3ZpZGVLZXkiLCJzb3VyY2UiLCJwcm92aWRlRGVmYXVsdCIsInJlbmRlckxpc3QiLCJyZW5kZXJTbG90IiwiZmFsbGJhY2siLCJiaW5kT2JqZWN0Iiwic2NvcGVkU2xvdEZuIiwibm9kZXMiLCJzbG90Tm9kZXMiLCJfcmVuZGVyZWQiLCIkY3JlYXRlRWxlbWVudCIsInJlc29sdmVGaWx0ZXIiLCJpc0tleU5vdE1hdGNoIiwiZXhwZWN0IiwiYWN0dWFsIiwiY2hlY2tLZXlDb2RlcyIsImV2ZW50S2V5Q29kZSIsImJ1aWx0SW5LZXlDb2RlIiwiZXZlbnRLZXlOYW1lIiwiYnVpbHRJbktleU5hbWUiLCJtYXBwZWRLZXlDb2RlIiwiYmluZE9iamVjdFByb3BzIiwiYXNQcm9wIiwiaXNTeW5jIiwiZG9tUHJvcHMiLCIkZXZlbnQiLCJyZW5kZXJTdGF0aWMiLCJpc0luRm9yIiwiX3N0YXRpY1RyZWVzIiwic3RhdGljUmVuZGVyRm5zIiwibWFya1N0YXRpYyIsIm1hcmtPbmNlIiwibWFya1N0YXRpY05vZGUiLCJiaW5kT2JqZWN0TGlzdGVuZXJzIiwiZXhpc3RpbmciLCJvdXJzIiwiaW5zdGFsbFJlbmRlckhlbHBlcnMiLCJfbyIsIl9uIiwiX3MiLCJfbCIsIl90IiwiX3EiLCJfaSIsIl9tIiwiX2YiLCJfayIsIl9iIiwiX3YiLCJfZSIsIl91IiwiX2ciLCJGdW5jdGlvbmFsUmVuZGVyQ29udGV4dCIsImNvbnRleHRWbSIsIl9vcmlnaW5hbCIsImlzQ29tcGlsZWQiLCJfY29tcGlsZWQiLCJuZWVkTm9ybWFsaXphdGlvbiIsImluamVjdGlvbnMiLCJfc2NvcGVJZCIsIl9jIiwiZCIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50IiwibWVyZ2VQcm9wcyIsInJlbmRlckNvbnRleHQiLCJjbG9uZUFuZE1hcmtGdW5jdGlvbmFsUmVzdWx0Iiwidm5vZGVzIiwiY2xvbmUiLCJjb21wb25lbnRWTm9kZUhvb2tzIiwiaW5pdCIsInBhcmVudEVsbSIsInJlZkVsbSIsImtlZXBBbGl2ZSIsIm1vdW50ZWROb2RlIiwicHJlcGF0Y2giLCJjcmVhdGVDb21wb25lbnRJbnN0YW5jZUZvclZub2RlIiwiJG1vdW50Iiwib2xkVm5vZGUiLCJpbnNlcnQiLCJkZXN0cm95IiwiaG9va3NUb01lcmdlIiwiY3JlYXRlQ29tcG9uZW50IiwiX2Jhc2UiLCJyZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zIiwibW9kZWwiLCJ0cmFuc2Zvcm1Nb2RlbCIsImZ1bmN0aW9uYWwiLCJuYXRpdmVPbiIsImluc3RhbGxDb21wb25lbnRIb29rcyIsIl9pc0NvbXBvbmVudCIsImlubGluZVRlbXBsYXRlIiwiY2FsbGJhY2siLCJTSU1QTEVfTk9STUFMSVpFIiwiQUxXQVlTX05PUk1BTElaRSIsIm5vcm1hbGl6YXRpb25UeXBlIiwiYWx3YXlzTm9ybWFsaXplIiwiX2NyZWF0ZUVsZW1lbnQiLCJpcyIsImFwcGx5TlMiLCJyZWdpc3RlckRlZXBCaW5kaW5ncyIsImZvcmNlIiwic3R5bGUiLCJjbGFzcyIsImluaXRSZW5kZXIiLCJwYXJlbnREYXRhIiwicmVuZGVyTWl4aW4iLCIkbmV4dFRpY2siLCJyZWYiLCJyZW5kZXJFcnJvciIsInVpZCQzIiwiaW5pdE1peGluIiwiX2luaXQiLCJpbml0SW50ZXJuYWxDb21wb25lbnQiLCJfc2VsZiIsInZub2RlQ29tcG9uZW50T3B0aW9ucyIsInN1cGVyIiwic3VwZXJPcHRpb25zIiwiY2FjaGVkU3VwZXJPcHRpb25zIiwibW9kaWZpZWRPcHRpb25zIiwicmVzb2x2ZU1vZGlmaWVkT3B0aW9ucyIsImV4dGVuZE9wdGlvbnMiLCJtb2RpZmllZCIsImxhdGVzdCIsImV4dGVuZGVkIiwic2VhbGVkIiwic2VhbGVkT3B0aW9ucyIsImRlZHVwZSIsImluaXRVc2UiLCJ1c2UiLCJwbHVnaW4iLCJpbnN0YWxsZWRQbHVnaW5zIiwiX2luc3RhbGxlZFBsdWdpbnMiLCJ1bnNoaWZ0IiwiaW5zdGFsbCIsImluaXRNaXhpbiQxIiwibWl4aW4iLCJpbml0RXh0ZW5kIiwiU3VwZXIiLCJTdXBlcklkIiwiY2FjaGVkQ3RvcnMiLCJfQ3RvciIsIlN1YiIsIlZ1ZUNvbXBvbmVudCIsImluaXRQcm9wcyQxIiwiaW5pdENvbXB1dGVkJDEiLCJDb21wIiwiaW5pdEFzc2V0UmVnaXN0ZXJzIiwiZGVmaW5pdGlvbiIsImdldENvbXBvbmVudE5hbWUiLCJtYXRjaGVzIiwicGF0dGVybiIsInBydW5lQ2FjaGUiLCJrZWVwQWxpdmVJbnN0YW5jZSIsImNhY2hlZE5vZGUiLCJwcnVuZUNhY2hlRW50cnkiLCJjdXJyZW50IiwiY2FjaGVkJCQxIiwicGF0dGVyblR5cGVzIiwiUmVnRXhwIiwiS2VlcEFsaXZlIiwiaW5jbHVkZSIsImV4Y2x1ZGUiLCJOdW1iZXIiLCJjcmVhdGVkIiwiZGVzdHJveWVkIiwibW91bnRlZCIsInJlZiQxIiwicGFyc2VJbnQiLCJidWlsdEluQ29tcG9uZW50cyIsImluaXRHbG9iYWxBUEkiLCJjb25maWdEZWYiLCJ1dGlsIiwiZGVsZXRlIiwic3NyQ29udGV4dCIsInZlcnNpb24iLCJhY2NlcHRWYWx1ZSIsImF0dHIiLCJpc0VudW1lcmF0ZWRBdHRyIiwiaXNCb29sZWFuQXR0ciIsInhsaW5rTlMiLCJpc1hsaW5rIiwiZ2V0WGxpbmtQcm9wIiwiaXNGYWxzeUF0dHJWYWx1ZSIsImdlbkNsYXNzRm9yVm5vZGUiLCJwYXJlbnROb2RlIiwiY2hpbGROb2RlIiwibWVyZ2VDbGFzc0RhdGEiLCJyZW5kZXJDbGFzcyIsInN0YXRpY0NsYXNzIiwiZHluYW1pY0NsYXNzIiwic3RyaW5naWZ5Q2xhc3MiLCJzdHJpbmdpZnlBcnJheSIsInN0cmluZ2lmeU9iamVjdCIsInN0cmluZ2lmaWVkIiwibmFtZXNwYWNlTWFwIiwic3ZnIiwibWF0aCIsImlzSFRNTFRhZyIsImlzU1ZHIiwidW5rbm93bkVsZW1lbnRDYWNoZSIsImRvY3VtZW50IiwiSFRNTFVua25vd25FbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJpc1RleHRJbnB1dFR5cGUiLCJxdWVyeSIsInNlbGVjdGVkIiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnQkMSIsInRhZ05hbWUiLCJtdWx0aXBsZSIsInNldEF0dHJpYnV0ZSIsImNyZWF0ZUVsZW1lbnROUyIsIm5hbWVzcGFjZSIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlQ29tbWVudCIsImluc2VydEJlZm9yZSIsIm5ld05vZGUiLCJyZWZlcmVuY2VOb2RlIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsIm5leHRTaWJsaW5nIiwic2V0VGV4dENvbnRlbnQiLCJ0ZXh0Q29udGVudCIsInNldFN0eWxlU2NvcGUiLCJzY29wZUlkIiwibm9kZU9wcyIsInJlZ2lzdGVyUmVmIiwiaXNSZW1vdmFsIiwicmVmcyIsInJlZkluRm9yIiwiZW1wdHlOb2RlIiwic2FtZVZub2RlIiwic2FtZUlucHV0VHlwZSIsInR5cGVBIiwidHlwZUIiLCJjcmVhdGVLZXlUb09sZElkeCIsImJlZ2luSWR4IiwiZW5kSWR4IiwiY3JlYXRlUGF0Y2hGdW5jdGlvbiIsImJhY2tlbmQiLCJtb2R1bGVzIiwiZW1wdHlOb2RlQXQiLCJjcmVhdGVSbUNiIiwiY2hpbGRFbG0iLCJyZW1vdmVOb2RlIiwiaXNVbmtub3duRWxlbWVudCQkMSIsImluVlByZSIsInNvbWUiLCJpZ25vcmUiLCJjcmVhdGluZ0VsbUluVlByZSIsImNyZWF0ZUVsbSIsImluc2VydGVkVm5vZGVRdWV1ZSIsIm5lc3RlZCIsIm93bmVyQXJyYXkiLCJwcmUiLCJzZXRTY29wZSIsImNyZWF0ZUNoaWxkcmVuIiwiaW52b2tlQ3JlYXRlSG9va3MiLCJpc1JlYWN0aXZhdGVkIiwiaW5pdENvbXBvbmVudCIsInJlYWN0aXZhdGVDb21wb25lbnQiLCJwZW5kaW5nSW5zZXJ0IiwiaXNQYXRjaGFibGUiLCJpbm5lck5vZGUiLCJ0cmFuc2l0aW9uIiwiYWN0aXZhdGUiLCJyZWYkJDEiLCJjaGVja0R1cGxpY2F0ZUtleXMiLCJhbmNlc3RvciIsImFkZFZub2RlcyIsInN0YXJ0SWR4IiwiaW52b2tlRGVzdHJveUhvb2siLCJyZW1vdmVWbm9kZXMiLCJjaCIsInJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2siLCJybSIsInVwZGF0ZUNoaWxkcmVuIiwib2xkQ2giLCJuZXdDaCIsInJlbW92ZU9ubHkiLCJvbGRTdGFydElkeCIsIm5ld1N0YXJ0SWR4Iiwib2xkRW5kSWR4Iiwib2xkU3RhcnRWbm9kZSIsIm9sZEVuZFZub2RlIiwibmV3RW5kSWR4IiwibmV3U3RhcnRWbm9kZSIsIm5ld0VuZFZub2RlIiwib2xkS2V5VG9JZHgiLCJpZHhJbk9sZCIsInZub2RlVG9Nb3ZlIiwiY2FuTW92ZSIsInBhdGNoVm5vZGUiLCJmaW5kSWR4SW5PbGQiLCJzZWVuS2V5cyIsImVuZCIsImh5ZHJhdGUiLCJwb3N0cGF0Y2giLCJpbnZva2VJbnNlcnRIb29rIiwiaW5pdGlhbCIsImh5ZHJhdGlvbkJhaWxlZCIsImlzUmVuZGVyZWRNb2R1bGUiLCJhc3NlcnROb2RlTWF0Y2giLCJoYXNDaGlsZE5vZGVzIiwiaW5uZXJIVE1MIiwiY2hpbGRyZW5NYXRjaCIsImZpcnN0Q2hpbGQiLCJjaGlsZE5vZGVzIiwiZnVsbEludm9rZSIsIm5vZGVUeXBlIiwicGF0Y2giLCJpc0luaXRpYWxQYXRjaCIsImlzUmVhbEVsZW1lbnQiLCJoYXNBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRFbG0iLCJwYXJlbnRFbG0kMSIsIl9sZWF2ZUNiIiwicGF0Y2hhYmxlIiwiaSQyIiwidXBkYXRlRGlyZWN0aXZlcyIsInVuYmluZERpcmVjdGl2ZXMiLCJpc0NyZWF0ZSIsImlzRGVzdHJveSIsIm9sZERpcnMiLCJub3JtYWxpemVEaXJlY3RpdmVzJDEiLCJuZXdEaXJzIiwiZGlyc1dpdGhJbnNlcnQiLCJkaXJzV2l0aFBvc3RwYXRjaCIsIm9sZERpciIsImRpciIsImNhbGxIb29rJDEiLCJjb21wb25lbnRVcGRhdGVkIiwiY2FsbEluc2VydCIsImVtcHR5TW9kaWZpZXJzIiwibW9kaWZpZXJzIiwiZ2V0UmF3RGlyTmFtZSIsInJhd05hbWUiLCJiYXNlTW9kdWxlcyIsInVwZGF0ZUF0dHJzIiwiaW5oZXJpdEF0dHJzIiwib2xkQXR0cnMiLCJzZXRBdHRyIiwicmVtb3ZlQXR0cmlidXRlTlMiLCJiYXNlU2V0QXR0ciIsInNldEF0dHJpYnV0ZU5TIiwiX19pZXBoIiwiYmxvY2tlciIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVDbGFzcyIsIm9sZERhdGEiLCJjbHMiLCJ0cmFuc2l0aW9uQ2xhc3MiLCJfdHJhbnNpdGlvbkNsYXNzZXMiLCJfcHJldkNsYXNzIiwia2xhc3MiLCJSQU5HRV9UT0tFTiIsIkNIRUNLQk9YX1JBRElPX1RPS0VOIiwibm9ybWFsaXplRXZlbnRzIiwiY2hhbmdlIiwidGFyZ2V0JDEiLCJjcmVhdGVPbmNlSGFuZGxlciIsIm9uY2VIYW5kbGVyIiwicmVtb3ZlJDIiLCJhZGQkMSIsInVwZGF0ZURPTUxpc3RlbmVycyIsImV2ZW50cyIsInVwZGF0ZURPTVByb3BzIiwib2xkUHJvcHMiLCJfdmFsdWUiLCJzdHJDdXIiLCJzaG91bGRVcGRhdGVWYWx1ZSIsImNoZWNrVmFsIiwiY29tcG9zaW5nIiwiaXNOb3RJbkZvY3VzQW5kRGlydHkiLCJpc0RpcnR5V2l0aE1vZGlmaWVycyIsIm5vdEluRm9jdXMiLCJhY3RpdmVFbGVtZW50IiwiX3ZNb2RpZmllcnMiLCJudW1iZXIiLCJ0cmltIiwicGFyc2VTdHlsZVRleHQiLCJjc3NUZXh0IiwibGlzdERlbGltaXRlciIsInByb3BlcnR5RGVsaW1pdGVyIiwibm9ybWFsaXplU3R5bGVEYXRhIiwibm9ybWFsaXplU3R5bGVCaW5kaW5nIiwic3RhdGljU3R5bGUiLCJiaW5kaW5nU3R5bGUiLCJnZXRTdHlsZSIsImNoZWNrQ2hpbGQiLCJzdHlsZURhdGEiLCJjc3NWYXJSRSIsImltcG9ydGFudFJFIiwic2V0UHJvcCIsInNldFByb3BlcnR5Iiwibm9ybWFsaXplZE5hbWUiLCJub3JtYWxpemUiLCJ2ZW5kb3JOYW1lcyIsImVtcHR5U3R5bGUiLCJjYXBOYW1lIiwidXBkYXRlU3R5bGUiLCJvbGRTdGF0aWNTdHlsZSIsIm9sZFN0eWxlQmluZGluZyIsIm5vcm1hbGl6ZWRTdHlsZSIsIm9sZFN0eWxlIiwibmV3U3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUNsYXNzIiwidGFyIiwicmVzb2x2ZVRyYW5zaXRpb24iLCJjc3MiLCJhdXRvQ3NzVHJhbnNpdGlvbiIsImVudGVyQ2xhc3MiLCJlbnRlclRvQ2xhc3MiLCJlbnRlckFjdGl2ZUNsYXNzIiwibGVhdmVDbGFzcyIsImxlYXZlVG9DbGFzcyIsImxlYXZlQWN0aXZlQ2xhc3MiLCJoYXNUcmFuc2l0aW9uIiwiVFJBTlNJVElPTiIsIkFOSU1BVElPTiIsInRyYW5zaXRpb25Qcm9wIiwidHJhbnNpdGlvbkVuZEV2ZW50IiwiYW5pbWF0aW9uUHJvcCIsImFuaW1hdGlvbkVuZEV2ZW50Iiwib250cmFuc2l0aW9uZW5kIiwib253ZWJraXR0cmFuc2l0aW9uZW5kIiwib25hbmltYXRpb25lbmQiLCJvbndlYmtpdGFuaW1hdGlvbmVuZCIsInJhZiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm5leHRGcmFtZSIsImFkZFRyYW5zaXRpb25DbGFzcyIsInRyYW5zaXRpb25DbGFzc2VzIiwicmVtb3ZlVHJhbnNpdGlvbkNsYXNzIiwid2hlblRyYW5zaXRpb25FbmRzIiwiZ2V0VHJhbnNpdGlvbkluZm8iLCJwcm9wQ291bnQiLCJlbmRlZCIsIm9uRW5kIiwidHJhbnNmb3JtUkUiLCJzdHlsZXMiLCJnZXRDb21wdXRlZFN0eWxlIiwidHJhbnNpdGlvbkRlbGF5cyIsInRyYW5zaXRpb25EdXJhdGlvbnMiLCJ0cmFuc2l0aW9uVGltZW91dCIsImdldFRpbWVvdXQiLCJhbmltYXRpb25EZWxheXMiLCJhbmltYXRpb25EdXJhdGlvbnMiLCJhbmltYXRpb25UaW1lb3V0IiwiaGFzVHJhbnNmb3JtIiwiZGVsYXlzIiwiZHVyYXRpb25zIiwidG9NcyIsInMiLCJlbnRlciIsInRvZ2dsZURpc3BsYXkiLCJjYW5jZWxsZWQiLCJfZW50ZXJDYiIsImFwcGVhckNsYXNzIiwiYXBwZWFyVG9DbGFzcyIsImFwcGVhckFjdGl2ZUNsYXNzIiwiYmVmb3JlRW50ZXIiLCJhZnRlckVudGVyIiwiZW50ZXJDYW5jZWxsZWQiLCJiZWZvcmVBcHBlYXIiLCJhcHBlYXIiLCJhZnRlckFwcGVhciIsImFwcGVhckNhbmNlbGxlZCIsImR1cmF0aW9uIiwidHJhbnNpdGlvbk5vZGUiLCJpc0FwcGVhciIsInN0YXJ0Q2xhc3MiLCJhY3RpdmVDbGFzcyIsInRvQ2xhc3MiLCJiZWZvcmVFbnRlckhvb2siLCJlbnRlckhvb2siLCJhZnRlckVudGVySG9vayIsImVudGVyQ2FuY2VsbGVkSG9vayIsImV4cGxpY2l0RW50ZXJEdXJhdGlvbiIsImNoZWNrRHVyYXRpb24iLCJleHBlY3RzQ1NTIiwidXNlcldhbnRzQ29udHJvbCIsImdldEhvb2tBcmd1bWVudHNMZW5ndGgiLCJzaG93IiwicGVuZGluZ05vZGUiLCJfcGVuZGluZyIsImlzVmFsaWREdXJhdGlvbiIsImxlYXZlIiwiYmVmb3JlTGVhdmUiLCJhZnRlckxlYXZlIiwibGVhdmVDYW5jZWxsZWQiLCJkZWxheUxlYXZlIiwiZXhwbGljaXRMZWF2ZUR1cmF0aW9uIiwicGVyZm9ybUxlYXZlIiwiaW52b2tlckZucyIsIl9lbnRlciIsInBsYXRmb3JtTW9kdWxlcyIsInZtb2RlbCIsInRyaWdnZXIiLCJkaXJlY3RpdmUiLCJiaW5kaW5nIiwiX3ZPcHRpb25zIiwic2V0U2VsZWN0ZWQiLCJnZXRWYWx1ZSIsIm9uQ29tcG9zaXRpb25TdGFydCIsIm9uQ29tcG9zaXRpb25FbmQiLCJwcmV2T3B0aW9ucyIsImN1ck9wdGlvbnMiLCJvIiwibmVlZFJlc2V0IiwiaGFzTm9NYXRjaGluZ09wdGlvbiIsImFjdHVhbGx5U2V0U2VsZWN0ZWQiLCJpc011bHRpcGxlIiwib3B0aW9uIiwic2VsZWN0ZWRJbmRleCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImxvY2F0ZU5vZGUiLCJ0cmFuc2l0aW9uJCQxIiwib3JpZ2luYWxEaXNwbGF5IiwiX192T3JpZ2luYWxEaXNwbGF5IiwiZGlzcGxheSIsInVuYmluZCIsInBsYXRmb3JtRGlyZWN0aXZlcyIsInRyYW5zaXRpb25Qcm9wcyIsIm1vZGUiLCJnZXRSZWFsQ2hpbGQiLCJjb21wT3B0aW9ucyIsImV4dHJhY3RUcmFuc2l0aW9uRGF0YSIsInBsYWNlaG9sZGVyIiwiaCIsInJhd0NoaWxkIiwiaGFzUGFyZW50VHJhbnNpdGlvbiIsImlzU2FtZUNoaWxkIiwib2xkQ2hpbGQiLCJUcmFuc2l0aW9uIiwiX2xlYXZpbmciLCJvbGRSYXdDaGlsZCIsImRlbGF5ZWRMZWF2ZSIsIm1vdmVDbGFzcyIsIlRyYW5zaXRpb25Hcm91cCIsInByZXZDaGlsZHJlbiIsInJhd0NoaWxkcmVuIiwidHJhbnNpdGlvbkRhdGEiLCJrZXB0IiwicmVtb3ZlZCIsImMkMSIsInBvcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJlZm9yZVVwZGF0ZSIsInVwZGF0ZWQiLCJoYXNNb3ZlIiwiY2FsbFBlbmRpbmdDYnMiLCJyZWNvcmRQb3NpdGlvbiIsImFwcGx5VHJhbnNsYXRpb24iLCJfcmVmbG93IiwiYm9keSIsIm9mZnNldEhlaWdodCIsIm1vdmVkIiwidHJhbnNmb3JtIiwiV2Via2l0VHJhbnNmb3JtIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiX21vdmVDYiIsInByb3BlcnR5TmFtZSIsIl9oYXNNb3ZlIiwiY2xvbmVOb2RlIiwibmV3UG9zIiwib2xkUG9zIiwiZHgiLCJsZWZ0IiwiZHkiLCJ0b3AiLCJwbGF0Zm9ybUNvbXBvbmVudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUFLQTs7QUFFQTs7OztBQUVBLElBQUlBLGNBQWNDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLENBQWxCOztBQUVBO0FBQ0E7QUFDQSxTQUFTQyxPQUFULENBQWtCQyxDQUFsQixFQUFxQjtBQUNuQixTQUFPQSxNQUFNQyxTQUFOLElBQW1CRCxNQUFNLElBQWhDO0FBQ0Q7O0FBRUQsU0FBU0UsS0FBVCxDQUFnQkYsQ0FBaEIsRUFBbUI7QUFDakIsU0FBT0EsTUFBTUMsU0FBTixJQUFtQkQsTUFBTSxJQUFoQztBQUNEOztBQUVELFNBQVNHLE1BQVQsQ0FBaUJILENBQWpCLEVBQW9CO0FBQ2xCLFNBQU9BLE1BQU0sSUFBYjtBQUNEOztBQUVELFNBQVNJLE9BQVQsQ0FBa0JKLENBQWxCLEVBQXFCO0FBQ25CLFNBQU9BLE1BQU0sS0FBYjtBQUNEOztBQUVEOzs7QUFHQSxTQUFTSyxXQUFULENBQXNCQyxLQUF0QixFQUE2QjtBQUMzQixTQUNFLE9BQU9BLEtBQVAsS0FBaUIsUUFBakIsSUFDQSxPQUFPQSxLQUFQLEtBQWlCLFFBRGpCO0FBRUE7QUFDQSxVQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBSGpCLElBSUEsT0FBT0EsS0FBUCxLQUFpQixTQUxuQjtBQU9EOztBQUVEOzs7OztBQUtBLFNBQVNDLFFBQVQsQ0FBbUJDLEdBQW5C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QXdCLEtBQWhDLEVBQ0UsK0NBQ0EsdUVBREEsR0FFQSwwREFIRjtBQUtEO0FBQ0YsR0ExQkQsRUEwQkcsQ0ExQkg7QUEyQkQ7O0FBRUQ7O0FBRUFzMUIsT0FBT0MsT0FBUCxHQUFpQnZ0QixHQUFqQiIsImZpbGUiOiJ2dWUucnVudGltZS5jb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIFZ1ZS5qcyB2Mi41LjE2XG4gKiAoYykgMjAxNC0yMDE4IEV2YW4gWW91XG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLyogICovXG5cbnZhciBlbXB0eU9iamVjdCA9IE9iamVjdC5mcmVlemUoe30pO1xuXG4vLyB0aGVzZSBoZWxwZXJzIHByb2R1Y2VzIGJldHRlciB2bSBjb2RlIGluIEpTIGVuZ2luZXMgZHVlIHRvIHRoZWlyXG4vLyBleHBsaWNpdG5lc3MgYW5kIGZ1bmN0aW9uIGlubGluaW5nXG5mdW5jdGlvbiBpc1VuZGVmICh2KSB7XG4gIHJldHVybiB2ID09PSB1bmRlZmluZWQgfHwgdiA9PT0gbnVsbFxufVxuXG5mdW5jdGlvbiBpc0RlZiAodikge1xuICByZXR1cm4gdiAhPT0gdW5kZWZpbmVkICYmIHYgIT09IG51bGxcbn1cblxuZnVuY3Rpb24gaXNUcnVlICh2KSB7XG4gIHJldHVybiB2ID09PSB0cnVlXG59XG5cbmZ1bmN0aW9uIGlzRmFsc2UgKHYpIHtcbiAgcmV0dXJuIHYgPT09IGZhbHNlXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsdWUgaXMgcHJpbWl0aXZlXG4gKi9cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlICh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHxcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8XG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgdHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJyB8fFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG4gIClcbn1cblxuLyoqXG4gKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcbiAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcbiAqIGlzIGEgSlNPTi1jb21wbGlhbnQgdHlwZS5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG59XG5cbi8qKlxuICogR2V0IHRoZSByYXcgdHlwZSBzdHJpbmcgb2YgYSB2YWx1ZSBlLmcuIFtvYmplY3QgT2JqZWN0XVxuICovXG52YXIgX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gdG9SYXdUeXBlICh2YWx1ZSkge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKVxufVxuXG4vKipcbiAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcbiAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNSZWdFeHAgKHYpIHtcbiAgcmV0dXJuIF90b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBSZWdFeHBdJ1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbCBpcyBhIHZhbGlkIGFycmF5IGluZGV4LlxuICovXG5mdW5jdGlvbiBpc1ZhbGlkQXJyYXlJbmRleCAodmFsKSB7XG4gIHZhciBuID0gcGFyc2VGbG9hdChTdHJpbmcodmFsKSk7XG4gIHJldHVybiBuID49IDAgJiYgTWF0aC5mbG9vcihuKSA9PT0gbiAmJiBpc0Zpbml0ZSh2YWwpXG59XG5cbi8qKlxuICogQ29udmVydCBhIHZhbHVlIHRvIGEgc3RyaW5nIHRoYXQgaXMgYWN0dWFsbHkgcmVuZGVyZWQuXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PSBudWxsXG4gICAgPyAnJ1xuICAgIDogdHlwZW9mIHZhbCA9PT0gJ29iamVjdCdcbiAgICAgID8gSlNPTi5zdHJpbmdpZnkodmFsLCBudWxsLCAyKVxuICAgICAgOiBTdHJpbmcodmFsKVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBpbnB1dCB2YWx1ZSB0byBhIG51bWJlciBmb3IgcGVyc2lzdGVuY2UuXG4gKiBJZiB0aGUgY29udmVyc2lvbiBmYWlscywgcmV0dXJuIG9yaWdpbmFsIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIgKHZhbCkge1xuICB2YXIgbiA9IHBhcnNlRmxvYXQodmFsKTtcbiAgcmV0dXJuIGlzTmFOKG4pID8gdmFsIDogblxufVxuXG4vKipcbiAqIE1ha2UgYSBtYXAgYW5kIHJldHVybiBhIGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhIGtleVxuICogaXMgaW4gdGhhdCBtYXAuXG4gKi9cbmZ1bmN0aW9uIG1ha2VNYXAgKFxuICBzdHIsXG4gIGV4cGVjdHNMb3dlckNhc2Vcbikge1xuICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGxpc3QgPSBzdHIuc3BsaXQoJywnKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbWFwW2xpc3RbaV1dID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZXhwZWN0c0xvd2VyQ2FzZVxuICAgID8gZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gbWFwW3ZhbC50b0xvd2VyQ2FzZSgpXTsgfVxuICAgIDogZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gbWFwW3ZhbF07IH1cbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHRhZyBpcyBhIGJ1aWx0LWluIHRhZy5cbiAqL1xudmFyIGlzQnVpbHRJblRhZyA9IG1ha2VNYXAoJ3Nsb3QsY29tcG9uZW50JywgdHJ1ZSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBhdHRyaWJ1dGUgaXMgYSByZXNlcnZlZCBhdHRyaWJ1dGUuXG4gKi9cbnZhciBpc1Jlc2VydmVkQXR0cmlidXRlID0gbWFrZU1hcCgna2V5LHJlZixzbG90LHNsb3Qtc2NvcGUsaXMnKTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaXRlbSBmcm9tIGFuIGFycmF5XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZSAoYXJyLCBpdGVtKSB7XG4gIGlmIChhcnIubGVuZ3RoKSB7XG4gICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiBhcnIuc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIG9iamVjdCBoYXMgdGhlIHByb3BlcnR5LlxuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuZnVuY3Rpb24gaGFzT3duIChvYmosIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNhY2hlZCAoZm4pIHtcbiAgdmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgcmV0dXJuIChmdW5jdGlvbiBjYWNoZWRGbiAoc3RyKSB7XG4gICAgdmFyIGhpdCA9IGNhY2hlW3N0cl07XG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpXG4gIH0pXG59XG5cbi8qKlxuICogQ2FtZWxpemUgYSBoeXBoZW4tZGVsaW1pdGVkIHN0cmluZy5cbiAqL1xudmFyIGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XG52YXIgY2FtZWxpemUgPSBjYWNoZWQoZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxpemVSRSwgZnVuY3Rpb24gKF8sIGMpIHsgcmV0dXJuIGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJzsgfSlcbn0pO1xuXG4vKipcbiAqIENhcGl0YWxpemUgYSBzdHJpbmcuXG4gKi9cbnZhciBjYXBpdGFsaXplID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufSk7XG5cbi8qKlxuICogSHlwaGVuYXRlIGEgY2FtZWxDYXNlIHN0cmluZy5cbiAqL1xudmFyIGh5cGhlbmF0ZVJFID0gL1xcQihbQS1aXSkvZztcbnZhciBoeXBoZW5hdGUgPSBjYWNoZWQoZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoaHlwaGVuYXRlUkUsICctJDEnKS50b0xvd2VyQ2FzZSgpXG59KTtcblxuLyoqXG4gKiBTaW1wbGUgYmluZCBwb2x5ZmlsbCBmb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IHN1cHBvcnQgaXQuLi4gZS5nLlxuICogUGhhbnRvbUpTIDEueC4gVGVjaG5pY2FsbHkgd2UgZG9uJ3QgbmVlZCB0aGlzIGFueW1vcmUgc2luY2UgbmF0aXZlIGJpbmQgaXNcbiAqIG5vdyBtb3JlIHBlcmZvcm1hbnQgaW4gbW9zdCBicm93c2VycywgYnV0IHJlbW92aW5nIGl0IHdvdWxkIGJlIGJyZWFraW5nIGZvclxuICogY29kZSB0aGF0IHdhcyBhYmxlIHRvIHJ1biBpbiBQaGFudG9tSlMgMS54LCBzbyB0aGlzIG11c3QgYmUga2VwdCBmb3JcbiAqIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBwb2x5ZmlsbEJpbmQgKGZuLCBjdHgpIHtcbiAgZnVuY3Rpb24gYm91bmRGbiAoYSkge1xuICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICByZXR1cm4gbFxuICAgICAgPyBsID4gMVxuICAgICAgICA/IGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKVxuICAgICAgICA6IGZuLmNhbGwoY3R4LCBhKVxuICAgICAgOiBmbi5jYWxsKGN0eClcbiAgfVxuXG4gIGJvdW5kRm4uX2xlbmd0aCA9IGZuLmxlbmd0aDtcbiAgcmV0dXJuIGJvdW5kRm5cbn1cblxuZnVuY3Rpb24gbmF0aXZlQmluZCAoZm4sIGN0eCkge1xuICByZXR1cm4gZm4uYmluZChjdHgpXG59XG5cbnZhciBiaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiAgPyBuYXRpdmVCaW5kXG4gIDogcG9seWZpbGxCaW5kO1xuXG4vKipcbiAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICovXG5mdW5jdGlvbiB0b0FycmF5IChsaXN0LCBzdGFydCkge1xuICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gIHZhciBpID0gbGlzdC5sZW5ndGggLSBzdGFydDtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSkge1xuICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBleHRlbmQgKHRvLCBfZnJvbSkge1xuICBmb3IgKHZhciBrZXkgaW4gX2Zyb20pIHtcbiAgICB0b1trZXldID0gX2Zyb21ba2V5XTtcbiAgfVxuICByZXR1cm4gdG9cbn1cblxuLyoqXG4gKiBNZXJnZSBhbiBBcnJheSBvZiBPYmplY3RzIGludG8gYSBzaW5nbGUgT2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCAoYXJyKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldKSB7XG4gICAgICBleHRlbmQocmVzLCBhcnJbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qKlxuICogUGVyZm9ybSBubyBvcGVyYXRpb24uXG4gKiBTdHViYmluZyBhcmdzIHRvIG1ha2UgRmxvdyBoYXBweSB3aXRob3V0IGxlYXZpbmcgdXNlbGVzcyB0cmFuc3BpbGVkIGNvZGVcbiAqIHdpdGggLi4ucmVzdCAoaHR0cHM6Ly9mbG93Lm9yZy9ibG9nLzIwMTcvMDUvMDcvU3RyaWN0LUZ1bmN0aW9uLUNhbGwtQXJpdHkvKVxuICovXG5mdW5jdGlvbiBub29wIChhLCBiLCBjKSB7fVxuXG4vKipcbiAqIEFsd2F5cyByZXR1cm4gZmFsc2UuXG4gKi9cbnZhciBubyA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7IHJldHVybiBmYWxzZTsgfTtcblxuLyoqXG4gKiBSZXR1cm4gc2FtZSB2YWx1ZVxuICovXG52YXIgaWRlbnRpdHkgPSBmdW5jdGlvbiAoXykgeyByZXR1cm4gXzsgfTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHN0YXRpYyBrZXlzIHN0cmluZyBmcm9tIGNvbXBpbGVyIG1vZHVsZXMuXG4gKi9cblxuXG4vKipcbiAqIENoZWNrIGlmIHR3byB2YWx1ZXMgYXJlIGxvb3NlbHkgZXF1YWwgLSB0aGF0IGlzLFxuICogaWYgdGhleSBhcmUgcGxhaW4gb2JqZWN0cywgZG8gdGhleSBoYXZlIHRoZSBzYW1lIHNoYXBlP1xuICovXG5mdW5jdGlvbiBsb29zZUVxdWFsIChhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7IHJldHVybiB0cnVlIH1cbiAgdmFyIGlzT2JqZWN0QSA9IGlzT2JqZWN0KGEpO1xuICB2YXIgaXNPYmplY3RCID0gaXNPYmplY3QoYik7XG4gIGlmIChpc09iamVjdEEgJiYgaXNPYmplY3RCKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBpc0FycmF5QSA9IEFycmF5LmlzQXJyYXkoYSk7XG4gICAgICB2YXIgaXNBcnJheUIgPSBBcnJheS5pc0FycmF5KGIpO1xuICAgICAgaWYgKGlzQXJyYXlBICYmIGlzQXJyYXlCKSB7XG4gICAgICAgIHJldHVybiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoZSwgaSkge1xuICAgICAgICAgIHJldHVybiBsb29zZUVxdWFsKGUsIGJbaV0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKCFpc0FycmF5QSAmJiAhaXNBcnJheUIpIHtcbiAgICAgICAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMoYSk7XG4gICAgICAgIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKGIpO1xuICAgICAgICByZXR1cm4ga2V5c0EubGVuZ3RoID09PSBrZXlzQi5sZW5ndGggJiYga2V5c0EuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBsb29zZUVxdWFsKGFba2V5XSwgYltrZXldKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfSBlbHNlIGlmICghaXNPYmplY3RBICYmICFpc09iamVjdEIpIHtcbiAgICByZXR1cm4gU3RyaW5nKGEpID09PSBTdHJpbmcoYilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBsb29zZUluZGV4T2YgKGFyciwgdmFsKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGxvb3NlRXF1YWwoYXJyW2ldLCB2YWwpKSB7IHJldHVybiBpIH1cbiAgfVxuICByZXR1cm4gLTFcbn1cblxuLyoqXG4gKiBFbnN1cmUgYSBmdW5jdGlvbiBpcyBjYWxsZWQgb25seSBvbmNlLlxuICovXG5mdW5jdGlvbiBvbmNlIChmbikge1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgU1NSX0FUVFIgPSAnZGF0YS1zZXJ2ZXItcmVuZGVyZWQnO1xuXG52YXIgQVNTRVRfVFlQRVMgPSBbXG4gICdjb21wb25lbnQnLFxuICAnZGlyZWN0aXZlJyxcbiAgJ2ZpbHRlcidcbl07XG5cbnZhciBMSUZFQ1lDTEVfSE9PS1MgPSBbXG4gICdiZWZvcmVDcmVhdGUnLFxuICAnY3JlYXRlZCcsXG4gICdiZWZvcmVNb3VudCcsXG4gICdtb3VudGVkJyxcbiAgJ2JlZm9yZVVwZGF0ZScsXG4gICd1cGRhdGVkJyxcbiAgJ2JlZm9yZURlc3Ryb3knLFxuICAnZGVzdHJveWVkJyxcbiAgJ2FjdGl2YXRlZCcsXG4gICdkZWFjdGl2YXRlZCcsXG4gICdlcnJvckNhcHR1cmVkJ1xuXTtcblxuLyogICovXG5cbnZhciBjb25maWcgPSAoe1xuICAvKipcbiAgICogT3B0aW9uIG1lcmdlIHN0cmF0ZWdpZXMgKHVzZWQgaW4gY29yZS91dGlsL29wdGlvbnMpXG4gICAqL1xuICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgb3B0aW9uTWVyZ2VTdHJhdGVnaWVzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHN1cHByZXNzIHdhcm5pbmdzLlxuICAgKi9cbiAgc2lsZW50OiBmYWxzZSxcblxuICAvKipcbiAgICogU2hvdyBwcm9kdWN0aW9uIG1vZGUgdGlwIG1lc3NhZ2Ugb24gYm9vdD9cbiAgICovXG4gIHByb2R1Y3Rpb25UaXA6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZW5hYmxlIGRldnRvb2xzXG4gICAqL1xuICBkZXZ0b29sczogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyxcblxuICAvKipcbiAgICogV2hldGhlciB0byByZWNvcmQgcGVyZlxuICAgKi9cbiAgcGVyZm9ybWFuY2U6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBFcnJvciBoYW5kbGVyIGZvciB3YXRjaGVyIGVycm9yc1xuICAgKi9cbiAgZXJyb3JIYW5kbGVyOiBudWxsLFxuXG4gIC8qKlxuICAgKiBXYXJuIGhhbmRsZXIgZm9yIHdhdGNoZXIgd2FybnNcbiAgICovXG4gIHdhcm5IYW5kbGVyOiBudWxsLFxuXG4gIC8qKlxuICAgKiBJZ25vcmUgY2VydGFpbiBjdXN0b20gZWxlbWVudHNcbiAgICovXG4gIGlnbm9yZWRFbGVtZW50czogW10sXG5cbiAgLyoqXG4gICAqIEN1c3RvbSB1c2VyIGtleSBhbGlhc2VzIGZvciB2LW9uXG4gICAqL1xuICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAga2V5Q29kZXM6IE9iamVjdC5jcmVhdGUobnVsbCksXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGFnIGlzIHJlc2VydmVkIHNvIHRoYXQgaXQgY2Fubm90IGJlIHJlZ2lzdGVyZWQgYXMgYVxuICAgKiBjb21wb25lbnQuIFRoaXMgaXMgcGxhdGZvcm0tZGVwZW5kZW50IGFuZCBtYXkgYmUgb3ZlcndyaXR0ZW4uXG4gICAqL1xuICBpc1Jlc2VydmVkVGFnOiBubyxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gYXR0cmlidXRlIGlzIHJlc2VydmVkIHNvIHRoYXQgaXQgY2Fubm90IGJlIHVzZWQgYXMgYSBjb21wb25lbnRcbiAgICogcHJvcC4gVGhpcyBpcyBwbGF0Zm9ybS1kZXBlbmRlbnQgYW5kIG1heSBiZSBvdmVyd3JpdHRlbi5cbiAgICovXG4gIGlzUmVzZXJ2ZWRBdHRyOiBubyxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB0YWcgaXMgYW4gdW5rbm93biBlbGVtZW50LlxuICAgKiBQbGF0Zm9ybS1kZXBlbmRlbnQuXG4gICAqL1xuICBpc1Vua25vd25FbGVtZW50OiBubyxcblxuICAvKipcbiAgICogR2V0IHRoZSBuYW1lc3BhY2Ugb2YgYW4gZWxlbWVudFxuICAgKi9cbiAgZ2V0VGFnTmFtZXNwYWNlOiBub29wLFxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgcmVhbCB0YWcgbmFtZSBmb3IgdGhlIHNwZWNpZmljIHBsYXRmb3JtLlxuICAgKi9cbiAgcGFyc2VQbGF0Zm9ybVRhZ05hbWU6IGlkZW50aXR5LFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBhdHRyaWJ1dGUgbXVzdCBiZSBib3VuZCB1c2luZyBwcm9wZXJ0eSwgZS5nLiB2YWx1ZVxuICAgKiBQbGF0Zm9ybS1kZXBlbmRlbnQuXG4gICAqL1xuICBtdXN0VXNlUHJvcDogbm8sXG5cbiAgLyoqXG4gICAqIEV4cG9zZWQgZm9yIGxlZ2FjeSByZWFzb25zXG4gICAqL1xuICBfbGlmZWN5Y2xlSG9va3M6IExJRkVDWUNMRV9IT09LU1xufSlcblxuLyogICovXG5cbi8qKlxuICogQ2hlY2sgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWQgKHN0cikge1xuICB2YXIgYyA9IChzdHIgKyAnJykuY2hhckNvZGVBdCgwKTtcbiAgcmV0dXJuIGMgPT09IDB4MjQgfHwgYyA9PT0gMHg1RlxufVxuXG4vKipcbiAqIERlZmluZSBhIHByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBkZWYgKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgdmFsdWU6IHZhbCxcbiAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIFBhcnNlIHNpbXBsZSBwYXRoLlxuICovXG52YXIgYmFpbFJFID0gL1teXFx3LiRdLztcbmZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xuICBpZiAoYmFpbFJFLnRlc3QocGF0aCkpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgc2VnbWVudHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFvYmopIHsgcmV0dXJuIH1cbiAgICAgIG9iaiA9IG9ialtzZWdtZW50c1tpXV07XG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfVxufVxuXG4vKiAgKi9cblxuLy8gY2FuIHdlIHVzZSBfX3Byb3RvX18/XG52YXIgaGFzUHJvdG8gPSAnX19wcm90b19fJyBpbiB7fTtcblxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xudmFyIGluQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xudmFyIGluV2VleCA9IHR5cGVvZiBXWEVudmlyb25tZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhIVdYRW52aXJvbm1lbnQucGxhdGZvcm07XG52YXIgd2VleFBsYXRmb3JtID0gaW5XZWV4ICYmIFdYRW52aXJvbm1lbnQucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtcbnZhciBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xudmFyIGlzSUUgPSBVQSAmJiAvbXNpZXx0cmlkZW50Ly50ZXN0KFVBKTtcbnZhciBpc0lFOSA9IFVBICYmIFVBLmluZGV4T2YoJ21zaWUgOS4wJykgPiAwO1xudmFyIGlzRWRnZSA9IFVBICYmIFVBLmluZGV4T2YoJ2VkZ2UvJykgPiAwO1xudmFyIGlzQW5kcm9pZCA9IChVQSAmJiBVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAwKSB8fCAod2VleFBsYXRmb3JtID09PSAnYW5kcm9pZCcpO1xudmFyIGlzSU9TID0gKFVBICYmIC9pcGhvbmV8aXBhZHxpcG9kfGlvcy8udGVzdChVQSkpIHx8ICh3ZWV4UGxhdGZvcm0gPT09ICdpb3MnKTtcbnZhciBpc0Nocm9tZSA9IFVBICYmIC9jaHJvbWVcXC9cXGQrLy50ZXN0KFVBKSAmJiAhaXNFZGdlO1xuXG4vLyBGaXJlZm94IGhhcyBhIFwid2F0Y2hcIiBmdW5jdGlvbiBvbiBPYmplY3QucHJvdG90eXBlLi4uXG52YXIgbmF0aXZlV2F0Y2ggPSAoe30pLndhdGNoO1xuXG52YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG5pZiAoaW5Ccm93c2VyKSB7XG4gIHRyeSB7XG4gICAgdmFyIG9wdHMgPSB7fTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob3B0cywgJ3Bhc3NpdmUnLCAoe1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQgKCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pKTsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0LXBhc3NpdmUnLCBudWxsLCBvcHRzKTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuLy8gdGhpcyBuZWVkcyB0byBiZSBsYXp5LWV2YWxlZCBiZWNhdXNlIHZ1ZSBtYXkgYmUgcmVxdWlyZWQgYmVmb3JlXG4vLyB2dWUtc2VydmVyLXJlbmRlcmVyIGNhbiBzZXQgVlVFX0VOVlxudmFyIF9pc1NlcnZlcjtcbnZhciBpc1NlcnZlclJlbmRlcmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKF9pc1NlcnZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFpbkJyb3dzZXIgJiYgIWluV2VleCAmJiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZGV0ZWN0IHByZXNlbmNlIG9mIHZ1ZS1zZXJ2ZXItcmVuZGVyZXIgYW5kIGF2b2lkXG4gICAgICAvLyBXZWJwYWNrIHNoaW1taW5nIHRoZSBwcm9jZXNzXG4gICAgICBfaXNTZXJ2ZXIgPSBnbG9iYWxbJ3Byb2Nlc3MnXS5lbnYuVlVFX0VOViA9PT0gJ3NlcnZlcic7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9pc1NlcnZlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gX2lzU2VydmVyXG59O1xuXG4vLyBkZXRlY3QgZGV2dG9vbHNcbnZhciBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfXztcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGlzTmF0aXZlIChDdG9yKSB7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoQ3Rvci50b1N0cmluZygpKVxufVxuXG52YXIgaGFzU3ltYm9sID1cbiAgdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU3ltYm9sKSAmJlxuICB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUmVmbGVjdC5vd25LZXlzKTtcblxudmFyIF9TZXQ7XG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi8gLy8gJGZsb3ctZGlzYWJsZS1saW5lXG5pZiAodHlwZW9mIFNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU2V0KSkge1xuICAvLyB1c2UgbmF0aXZlIFNldCB3aGVuIGF2YWlsYWJsZS5cbiAgX1NldCA9IFNldDtcbn0gZWxzZSB7XG4gIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cbiAgX1NldCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2V0ICgpIHtcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0W2tleV0gPT09IHRydWVcbiAgICB9O1xuICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkIChrZXkpIHtcbiAgICAgIHRoaXMuc2V0W2tleV0gPSB0cnVlO1xuICAgIH07XG4gICAgU2V0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNldDtcbiAgfSgpKTtcbn1cblxuLyogICovXG5cbnZhciB3YXJuID0gbm9vcDtcbnZhciB0aXAgPSBub29wO1xudmFyIGdlbmVyYXRlQ29tcG9uZW50VHJhY2UgPSAobm9vcCk7IC8vIHdvcmsgYXJvdW5kIGZsb3cgY2hlY2tcbnZhciBmb3JtYXRDb21wb25lbnROYW1lID0gKG5vb3ApO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaGFzQ29uc29sZSA9IHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJztcbiAgdmFyIGNsYXNzaWZ5UkUgPSAvKD86XnxbLV9dKShcXHcpL2c7XG4gIHZhciBjbGFzc2lmeSA9IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0clxuICAgIC5yZXBsYWNlKGNsYXNzaWZ5UkUsIGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnRvVXBwZXJDYXNlKCk7IH0pXG4gICAgLnJlcGxhY2UoL1stX10vZywgJycpOyB9O1xuXG4gIHdhcm4gPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgIHZhciB0cmFjZSA9IHZtID8gZ2VuZXJhdGVDb21wb25lbnRUcmFjZSh2bSkgOiAnJztcblxuICAgIGlmIChjb25maWcud2FybkhhbmRsZXIpIHtcbiAgICAgIGNvbmZpZy53YXJuSGFuZGxlci5jYWxsKG51bGwsIG1zZywgdm0sIHRyYWNlKTtcbiAgICB9IGVsc2UgaWYgKGhhc0NvbnNvbGUgJiYgKCFjb25maWcuc2lsZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcigoXCJbVnVlIHdhcm5dOiBcIiArIG1zZyArIHRyYWNlKSk7XG4gICAgfVxuICB9O1xuXG4gIHRpcCA9IGZ1bmN0aW9uIChtc2csIHZtKSB7XG4gICAgaWYgKGhhc0NvbnNvbGUgJiYgKCFjb25maWcuc2lsZW50KSkge1xuICAgICAgY29uc29sZS53YXJuKFwiW1Z1ZSB0aXBdOiBcIiArIG1zZyArIChcbiAgICAgICAgdm0gPyBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlKHZtKSA6ICcnXG4gICAgICApKTtcbiAgICB9XG4gIH07XG5cbiAgZm9ybWF0Q29tcG9uZW50TmFtZSA9IGZ1bmN0aW9uICh2bSwgaW5jbHVkZUZpbGUpIHtcbiAgICBpZiAodm0uJHJvb3QgPT09IHZtKSB7XG4gICAgICByZXR1cm4gJzxSb290PidcbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygdm0gPT09ICdmdW5jdGlvbicgJiYgdm0uY2lkICE9IG51bGxcbiAgICAgID8gdm0ub3B0aW9uc1xuICAgICAgOiB2bS5faXNWdWVcbiAgICAgICAgPyB2bS4kb3B0aW9ucyB8fCB2bS5jb25zdHJ1Y3Rvci5vcHRpb25zXG4gICAgICAgIDogdm0gfHwge307XG4gICAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5fY29tcG9uZW50VGFnO1xuICAgIHZhciBmaWxlID0gb3B0aW9ucy5fX2ZpbGU7XG4gICAgaWYgKCFuYW1lICYmIGZpbGUpIHtcbiAgICAgIHZhciBtYXRjaCA9IGZpbGUubWF0Y2goLyhbXi9cXFxcXSspXFwudnVlJC8pO1xuICAgICAgbmFtZSA9IG1hdGNoICYmIG1hdGNoWzFdO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAobmFtZSA/IChcIjxcIiArIChjbGFzc2lmeShuYW1lKSkgKyBcIj5cIikgOiBcIjxBbm9ueW1vdXM+XCIpICtcbiAgICAgIChmaWxlICYmIGluY2x1ZGVGaWxlICE9PSBmYWxzZSA/IChcIiBhdCBcIiArIGZpbGUpIDogJycpXG4gICAgKVxuICB9O1xuXG4gIHZhciByZXBlYXQgPSBmdW5jdGlvbiAoc3RyLCBuKSB7XG4gICAgdmFyIHJlcyA9ICcnO1xuICAgIHdoaWxlIChuKSB7XG4gICAgICBpZiAobiAlIDIgPT09IDEpIHsgcmVzICs9IHN0cjsgfVxuICAgICAgaWYgKG4gPiAxKSB7IHN0ciArPSBzdHI7IH1cbiAgICAgIG4gPj49IDE7XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfTtcblxuICBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlID0gZnVuY3Rpb24gKHZtKSB7XG4gICAgaWYgKHZtLl9pc1Z1ZSAmJiB2bS4kcGFyZW50KSB7XG4gICAgICB2YXIgdHJlZSA9IFtdO1xuICAgICAgdmFyIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSA9IDA7XG4gICAgICB3aGlsZSAodm0pIHtcbiAgICAgICAgaWYgKHRyZWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBsYXN0ID0gdHJlZVt0cmVlLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIGlmIChsYXN0LmNvbnN0cnVjdG9yID09PSB2bS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlKys7XG4gICAgICAgICAgICB2bSA9IHZtLiRwYXJlbnQ7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlID4gMCkge1xuICAgICAgICAgICAgdHJlZVt0cmVlLmxlbmd0aCAtIDFdID0gW2xhc3QsIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZV07XG4gICAgICAgICAgICBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmVlLnB1c2godm0pO1xuICAgICAgICB2bSA9IHZtLiRwYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gJ1xcblxcbmZvdW5kIGluXFxuXFxuJyArIHRyZWVcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodm0sIGkpIHsgcmV0dXJuIChcIlwiICsgKGkgPT09IDAgPyAnLS0tPiAnIDogcmVwZWF0KCcgJywgNSArIGkgKiAyKSkgKyAoQXJyYXkuaXNBcnJheSh2bSlcbiAgICAgICAgICAgID8gKChmb3JtYXRDb21wb25lbnROYW1lKHZtWzBdKSkgKyBcIi4uLiAoXCIgKyAodm1bMV0pICsgXCIgcmVjdXJzaXZlIGNhbGxzKVwiKVxuICAgICAgICAgICAgOiBmb3JtYXRDb21wb25lbnROYW1lKHZtKSkpOyB9KVxuICAgICAgICAuam9pbignXFxuJylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcIlxcblxcbihmb3VuZCBpbiBcIiArIChmb3JtYXRDb21wb25lbnROYW1lKHZtKSkgKyBcIilcIilcbiAgICB9XG4gIH07XG59XG5cbi8qICAqL1xuXG5cbnZhciB1aWQgPSAwO1xuXG4vKipcbiAqIEEgZGVwIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cbiAqL1xudmFyIERlcCA9IGZ1bmN0aW9uIERlcCAoKSB7XG4gIHRoaXMuaWQgPSB1aWQrKztcbiAgdGhpcy5zdWJzID0gW107XG59O1xuXG5EZXAucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIGFkZFN1YiAoc3ViKSB7XG4gIHRoaXMuc3Vicy5wdXNoKHN1Yik7XG59O1xuXG5EZXAucHJvdG90eXBlLnJlbW92ZVN1YiA9IGZ1bmN0aW9uIHJlbW92ZVN1YiAoc3ViKSB7XG4gIHJlbW92ZSh0aGlzLnN1YnMsIHN1Yik7XG59O1xuXG5EZXAucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uIGRlcGVuZCAoKSB7XG4gIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgRGVwLnRhcmdldC5hZGREZXAodGhpcyk7XG4gIH1cbn07XG5cbkRlcC5wcm90b3R5cGUubm90aWZ5ID0gZnVuY3Rpb24gbm90aWZ5ICgpIHtcbiAgLy8gc3RhYmlsaXplIHRoZSBzdWJzY3JpYmVyIGxpc3QgZmlyc3RcbiAgdmFyIHN1YnMgPSB0aGlzLnN1YnMuc2xpY2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHN1YnNbaV0udXBkYXRlKCk7XG4gIH1cbn07XG5cbi8vIHRoZSBjdXJyZW50IHRhcmdldCB3YXRjaGVyIGJlaW5nIGV2YWx1YXRlZC5cbi8vIHRoaXMgaXMgZ2xvYmFsbHkgdW5pcXVlIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb25seSBvbmVcbi8vIHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkIGF0IGFueSB0aW1lLlxuRGVwLnRhcmdldCA9IG51bGw7XG52YXIgdGFyZ2V0U3RhY2sgPSBbXTtcblxuZnVuY3Rpb24gcHVzaFRhcmdldCAoX3RhcmdldCkge1xuICBpZiAoRGVwLnRhcmdldCkgeyB0YXJnZXRTdGFjay5wdXNoKERlcC50YXJnZXQpOyB9XG4gIERlcC50YXJnZXQgPSBfdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBwb3BUYXJnZXQgKCkge1xuICBEZXAudGFyZ2V0ID0gdGFyZ2V0U3RhY2sucG9wKCk7XG59XG5cbi8qICAqL1xuXG52YXIgVk5vZGUgPSBmdW5jdGlvbiBWTm9kZSAoXG4gIHRhZyxcbiAgZGF0YSxcbiAgY2hpbGRyZW4sXG4gIHRleHQsXG4gIGVsbSxcbiAgY29udGV4dCxcbiAgY29tcG9uZW50T3B0aW9ucyxcbiAgYXN5bmNGYWN0b3J5XG4pIHtcbiAgdGhpcy50YWcgPSB0YWc7XG4gIHRoaXMuZGF0YSA9IGRhdGE7XG4gIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgdGhpcy5lbG0gPSBlbG07XG4gIHRoaXMubnMgPSB1bmRlZmluZWQ7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMuZm5Db250ZXh0ID0gdW5kZWZpbmVkO1xuICB0aGlzLmZuT3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgdGhpcy5mblNjb3BlSWQgPSB1bmRlZmluZWQ7XG4gIHRoaXMua2V5ID0gZGF0YSAmJiBkYXRhLmtleTtcbiAgdGhpcy5jb21wb25lbnRPcHRpb25zID0gY29tcG9uZW50T3B0aW9ucztcbiAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5wYXJlbnQgPSB1bmRlZmluZWQ7XG4gIHRoaXMucmF3ID0gZmFsc2U7XG4gIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgdGhpcy5pc1Jvb3RJbnNlcnQgPSB0cnVlO1xuICB0aGlzLmlzQ29tbWVudCA9IGZhbHNlO1xuICB0aGlzLmlzQ2xvbmVkID0gZmFsc2U7XG4gIHRoaXMuaXNPbmNlID0gZmFsc2U7XG4gIHRoaXMuYXN5bmNGYWN0b3J5ID0gYXN5bmNGYWN0b3J5O1xuICB0aGlzLmFzeW5jTWV0YSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5pc0FzeW5jUGxhY2Vob2xkZXIgPSBmYWxzZTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMgPSB7IGNoaWxkOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XG5cbi8vIERFUFJFQ0FURUQ6IGFsaWFzIGZvciBjb21wb25lbnRJbnN0YW5jZSBmb3IgYmFja3dhcmRzIGNvbXBhdC5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5wcm90b3R5cGVBY2Nlc3NvcnMuY2hpbGQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5jb21wb25lbnRJbnN0YW5jZVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFZOb2RlLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbnZhciBjcmVhdGVFbXB0eVZOb2RlID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgaWYgKCB0ZXh0ID09PSB2b2lkIDAgKSB0ZXh0ID0gJyc7XG5cbiAgdmFyIG5vZGUgPSBuZXcgVk5vZGUoKTtcbiAgbm9kZS50ZXh0ID0gdGV4dDtcbiAgbm9kZS5pc0NvbW1lbnQgPSB0cnVlO1xuICByZXR1cm4gbm9kZVxufTtcblxuZnVuY3Rpb24gY3JlYXRlVGV4dFZOb2RlICh2YWwpIHtcbiAgcmV0dXJuIG5ldyBWTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBTdHJpbmcodmFsKSlcbn1cblxuLy8gb3B0aW1pemVkIHNoYWxsb3cgY2xvbmVcbi8vIHVzZWQgZm9yIHN0YXRpYyBub2RlcyBhbmQgc2xvdCBub2RlcyBiZWNhdXNlIHRoZXkgbWF5IGJlIHJldXNlZCBhY3Jvc3Ncbi8vIG11bHRpcGxlIHJlbmRlcnMsIGNsb25pbmcgdGhlbSBhdm9pZHMgZXJyb3JzIHdoZW4gRE9NIG1hbmlwdWxhdGlvbnMgcmVseVxuLy8gb24gdGhlaXIgZWxtIHJlZmVyZW5jZS5cbmZ1bmN0aW9uIGNsb25lVk5vZGUgKHZub2RlKSB7XG4gIHZhciBjbG9uZWQgPSBuZXcgVk5vZGUoXG4gICAgdm5vZGUudGFnLFxuICAgIHZub2RlLmRhdGEsXG4gICAgdm5vZGUuY2hpbGRyZW4sXG4gICAgdm5vZGUudGV4dCxcbiAgICB2bm9kZS5lbG0sXG4gICAgdm5vZGUuY29udGV4dCxcbiAgICB2bm9kZS5jb21wb25lbnRPcHRpb25zLFxuICAgIHZub2RlLmFzeW5jRmFjdG9yeVxuICApO1xuICBjbG9uZWQubnMgPSB2bm9kZS5ucztcbiAgY2xvbmVkLmlzU3RhdGljID0gdm5vZGUuaXNTdGF0aWM7XG4gIGNsb25lZC5rZXkgPSB2bm9kZS5rZXk7XG4gIGNsb25lZC5pc0NvbW1lbnQgPSB2bm9kZS5pc0NvbW1lbnQ7XG4gIGNsb25lZC5mbkNvbnRleHQgPSB2bm9kZS5mbkNvbnRleHQ7XG4gIGNsb25lZC5mbk9wdGlvbnMgPSB2bm9kZS5mbk9wdGlvbnM7XG4gIGNsb25lZC5mblNjb3BlSWQgPSB2bm9kZS5mblNjb3BlSWQ7XG4gIGNsb25lZC5pc0Nsb25lZCA9IHRydWU7XG4gIHJldHVybiBjbG9uZWRcbn1cblxuLypcbiAqIG5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBwbGF5IHdlbGwgd2l0aFxuICogZHluYW1pY2FsbHkgYWNjZXNzaW5nIG1ldGhvZHMgb24gQXJyYXkgcHJvdG90eXBlXG4gKi9cblxudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG52YXIgYXJyYXlNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShhcnJheVByb3RvKTtcblxudmFyIG1ldGhvZHNUb1BhdGNoID0gW1xuICAncHVzaCcsXG4gICdwb3AnLFxuICAnc2hpZnQnLFxuICAndW5zaGlmdCcsXG4gICdzcGxpY2UnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJ1xuXTtcblxuLyoqXG4gKiBJbnRlcmNlcHQgbXV0YXRpbmcgbWV0aG9kcyBhbmQgZW1pdCBldmVudHNcbiAqL1xubWV0aG9kc1RvUGF0Y2guZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gIC8vIGNhY2hlIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgb3JpZ2luYWwgPSBhcnJheVByb3RvW21ldGhvZF07XG4gIGRlZihhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvciAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgdmFyIHJlc3VsdCA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIHZhciBvYiA9IHRoaXMuX19vYl9fO1xuICAgIHZhciBpbnNlcnRlZDtcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgY2FzZSAncHVzaCc6XG4gICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzLnNsaWNlKDIpO1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICBpZiAoaW5zZXJ0ZWQpIHsgb2Iub2JzZXJ2ZUFycmF5KGluc2VydGVkKTsgfVxuICAgIC8vIG5vdGlmeSBjaGFuZ2VcbiAgICBvYi5kZXAubm90aWZ5KCk7XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KTtcbn0pO1xuXG4vKiAgKi9cblxudmFyIGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcyk7XG5cbi8qKlxuICogSW4gc29tZSBjYXNlcyB3ZSBtYXkgd2FudCB0byBkaXNhYmxlIG9ic2VydmF0aW9uIGluc2lkZSBhIGNvbXBvbmVudCdzXG4gKiB1cGRhdGUgY29tcHV0YXRpb24uXG4gKi9cbnZhciBzaG91bGRPYnNlcnZlID0gdHJ1ZTtcblxuZnVuY3Rpb24gdG9nZ2xlT2JzZXJ2aW5nICh2YWx1ZSkge1xuICBzaG91bGRPYnNlcnZlID0gdmFsdWU7XG59XG5cbi8qKlxuICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBpcyBhdHRhY2hlZCB0byBlYWNoIG9ic2VydmVkXG4gKiBvYmplY3QuIE9uY2UgYXR0YWNoZWQsIHRoZSBvYnNlcnZlciBjb252ZXJ0cyB0aGUgdGFyZ2V0XG4gKiBvYmplY3QncyBwcm9wZXJ0eSBrZXlzIGludG8gZ2V0dGVyL3NldHRlcnMgdGhhdFxuICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoIHVwZGF0ZXMuXG4gKi9cbnZhciBPYnNlcnZlciA9IGZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSkge1xuICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIHRoaXMuZGVwID0gbmV3IERlcCgpO1xuICB0aGlzLnZtQ291bnQgPSAwO1xuICBkZWYodmFsdWUsICdfX29iX18nLCB0aGlzKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFyIGF1Z21lbnQgPSBoYXNQcm90b1xuICAgICAgPyBwcm90b0F1Z21lbnRcbiAgICAgIDogY29weUF1Z21lbnQ7XG4gICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgIHRoaXMub2JzZXJ2ZUFycmF5KHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhbGsodmFsdWUpO1xuICB9XG59O1xuXG4vKipcbiAqIFdhbGsgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXG4gKiB2YWx1ZSB0eXBlIGlzIE9iamVjdC5cbiAqL1xuT2JzZXJ2ZXIucHJvdG90eXBlLndhbGsgPSBmdW5jdGlvbiB3YWxrIChvYmopIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBkZWZpbmVSZWFjdGl2ZShvYmosIGtleXNbaV0pO1xuICB9XG59O1xuXG4vKipcbiAqIE9ic2VydmUgYSBsaXN0IG9mIEFycmF5IGl0ZW1zLlxuICovXG5PYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZUFycmF5ID0gZnVuY3Rpb24gb2JzZXJ2ZUFycmF5IChpdGVtcykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIG9ic2VydmUoaXRlbXNbaV0pO1xuICB9XG59O1xuXG4vLyBoZWxwZXJzXG5cbi8qKlxuICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGludGVyY2VwdGluZ1xuICogdGhlIHByb3RvdHlwZSBjaGFpbiB1c2luZyBfX3Byb3RvX19cbiAqL1xuZnVuY3Rpb24gcHJvdG9BdWdtZW50ICh0YXJnZXQsIHNyYywga2V5cykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuICB0YXJnZXQuX19wcm90b19fID0gc3JjO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXByb3RvICovXG59XG5cbi8qKlxuICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGRlZmluaW5nXG4gKiBoaWRkZW4gcHJvcGVydGllcy5cbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGNvcHlBdWdtZW50ICh0YXJnZXQsIHNyYywga2V5cykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcbiAqIHJldHVybnMgdGhlIG5ldyBvYnNlcnZlciBpZiBzdWNjZXNzZnVsbHkgb2JzZXJ2ZWQsXG4gKiBvciB0aGUgZXhpc3Rpbmcgb2JzZXJ2ZXIgaWYgdGhlIHZhbHVlIGFscmVhZHkgaGFzIG9uZS5cbiAqL1xuZnVuY3Rpb24gb2JzZXJ2ZSAodmFsdWUsIGFzUm9vdERhdGEpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBvYjtcbiAgaWYgKGhhc093bih2YWx1ZSwgJ19fb2JfXycpICYmIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyKSB7XG4gICAgb2IgPSB2YWx1ZS5fX29iX187XG4gIH0gZWxzZSBpZiAoXG4gICAgc2hvdWxkT2JzZXJ2ZSAmJlxuICAgICFpc1NlcnZlclJlbmRlcmluZygpICYmXG4gICAgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IGlzUGxhaW5PYmplY3QodmFsdWUpKSAmJlxuICAgIE9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpICYmXG4gICAgIXZhbHVlLl9pc1Z1ZVxuICApIHtcbiAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSk7XG4gIH1cbiAgaWYgKGFzUm9vdERhdGEgJiYgb2IpIHtcbiAgICBvYi52bUNvdW50Kys7XG4gIH1cbiAgcmV0dXJuIG9iXG59XG5cbi8qKlxuICogRGVmaW5lIGEgcmVhY3RpdmUgcHJvcGVydHkgb24gYW4gT2JqZWN0LlxuICovXG5mdW5jdGlvbiBkZWZpbmVSZWFjdGl2ZSAoXG4gIG9iaixcbiAga2V5LFxuICB2YWwsXG4gIGN1c3RvbVNldHRlcixcbiAgc2hhbGxvd1xuKSB7XG4gIHZhciBkZXAgPSBuZXcgRGVwKCk7XG5cbiAgdmFyIHByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gIGlmIChwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBjYXRlciBmb3IgcHJlLWRlZmluZWQgZ2V0dGVyL3NldHRlcnNcbiAgdmFyIGdldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LmdldDtcbiAgaWYgKCFnZXR0ZXIgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHZhbCA9IG9ialtrZXldO1xuICB9XG4gIHZhciBzZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5zZXQ7XG5cbiAgdmFyIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKHZhbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIgKCkge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICAgIGRlcC5kZXBlbmQoKTtcbiAgICAgICAgaWYgKGNoaWxkT2IpIHtcbiAgICAgICAgICBjaGlsZE9iLmRlcC5kZXBlbmQoKTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGRlcGVuZEFycmF5KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiByZWFjdGl2ZVNldHRlciAobmV3VmFsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsO1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlICovXG4gICAgICBpZiAobmV3VmFsID09PSB2YWx1ZSB8fCAobmV3VmFsICE9PSBuZXdWYWwgJiYgdmFsdWUgIT09IHZhbHVlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlICovXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjdXN0b21TZXR0ZXIpIHtcbiAgICAgICAgY3VzdG9tU2V0dGVyKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgIHNldHRlci5jYWxsKG9iaiwgbmV3VmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IG5ld1ZhbDtcbiAgICAgIH1cbiAgICAgIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKG5ld1ZhbCk7XG4gICAgICBkZXAubm90aWZ5KCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgYSBwcm9wZXJ0eSBvbiBhbiBvYmplY3QuIEFkZHMgdGhlIG5ldyBwcm9wZXJ0eSBhbmRcbiAqIHRyaWdnZXJzIGNoYW5nZSBub3RpZmljYXRpb24gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3RcbiAqIGFscmVhZHkgZXhpc3QuXG4gKi9cbmZ1bmN0aW9uIHNldCAodGFyZ2V0LCBrZXksIHZhbCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIChpc1VuZGVmKHRhcmdldCkgfHwgaXNQcmltaXRpdmUodGFyZ2V0KSlcbiAgKSB7XG4gICAgd2FybigoXCJDYW5ub3Qgc2V0IHJlYWN0aXZlIHByb3BlcnR5IG9uIHVuZGVmaW5lZCwgbnVsbCwgb3IgcHJpbWl0aXZlIHZhbHVlOiBcIiArICgodGFyZ2V0KSkpKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICB0YXJnZXQubGVuZ3RoID0gTWF0aC5tYXgodGFyZ2V0Lmxlbmd0aCwga2V5KTtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSwgdmFsKTtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgaWYgKGtleSBpbiB0YXJnZXQgJiYgIShrZXkgaW4gT2JqZWN0LnByb3RvdHlwZSkpIHtcbiAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICBpZiAodGFyZ2V0Ll9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnQXZvaWQgYWRkaW5nIHJlYWN0aXZlIHByb3BlcnRpZXMgdG8gYSBWdWUgaW5zdGFuY2Ugb3IgaXRzIHJvb3QgJGRhdGEgJyArXG4gICAgICAnYXQgcnVudGltZSAtIGRlY2xhcmUgaXQgdXBmcm9udCBpbiB0aGUgZGF0YSBvcHRpb24uJ1xuICAgICk7XG4gICAgcmV0dXJuIHZhbFxuICB9XG4gIGlmICghb2IpIHtcbiAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgZGVmaW5lUmVhY3RpdmUob2IudmFsdWUsIGtleSwgdmFsKTtcbiAgb2IuZGVwLm5vdGlmeSgpO1xuICByZXR1cm4gdmFsXG59XG5cbi8qKlxuICogRGVsZXRlIGEgcHJvcGVydHkgYW5kIHRyaWdnZXIgY2hhbmdlIGlmIG5lY2Vzc2FyeS5cbiAqL1xuZnVuY3Rpb24gZGVsICh0YXJnZXQsIGtleSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIChpc1VuZGVmKHRhcmdldCkgfHwgaXNQcmltaXRpdmUodGFyZ2V0KSlcbiAgKSB7XG4gICAgd2FybigoXCJDYW5ub3QgZGVsZXRlIHJlYWN0aXZlIHByb3BlcnR5IG9uIHVuZGVmaW5lZCwgbnVsbCwgb3IgcHJpbWl0aXZlIHZhbHVlOiBcIiArICgodGFyZ2V0KSkpKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICBpZiAodGFyZ2V0Ll9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnQXZvaWQgZGVsZXRpbmcgcHJvcGVydGllcyBvbiBhIFZ1ZSBpbnN0YW5jZSBvciBpdHMgcm9vdCAkZGF0YSAnICtcbiAgICAgICctIGp1c3Qgc2V0IGl0IHRvIG51bGwuJ1xuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKCFoYXNPd24odGFyZ2V0LCBrZXkpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZGVsZXRlIHRhcmdldFtrZXldO1xuICBpZiAoIW9iKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgb2IuZGVwLm5vdGlmeSgpO1xufVxuXG4vKipcbiAqIENvbGxlY3QgZGVwZW5kZW5jaWVzIG9uIGFycmF5IGVsZW1lbnRzIHdoZW4gdGhlIGFycmF5IGlzIHRvdWNoZWQsIHNpbmNlXG4gKiB3ZSBjYW5ub3QgaW50ZXJjZXB0IGFycmF5IGVsZW1lbnQgYWNjZXNzIGxpa2UgcHJvcGVydHkgZ2V0dGVycy5cbiAqL1xuZnVuY3Rpb24gZGVwZW5kQXJyYXkgKHZhbHVlKSB7XG4gIGZvciAodmFyIGUgPSAodm9pZCAwKSwgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBlID0gdmFsdWVbaV07XG4gICAgZSAmJiBlLl9fb2JfXyAmJiBlLl9fb2JfXy5kZXAuZGVwZW5kKCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHtcbiAgICAgIGRlcGVuZEFycmF5KGUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBPcHRpb24gb3ZlcndyaXRpbmcgc3RyYXRlZ2llcyBhcmUgZnVuY3Rpb25zIHRoYXQgaGFuZGxlXG4gKiBob3cgdG8gbWVyZ2UgYSBwYXJlbnQgb3B0aW9uIHZhbHVlIGFuZCBhIGNoaWxkIG9wdGlvblxuICogdmFsdWUgaW50byB0aGUgZmluYWwgdmFsdWUuXG4gKi9cbnZhciBzdHJhdHMgPSBjb25maWcub3B0aW9uTWVyZ2VTdHJhdGVnaWVzO1xuXG4vKipcbiAqIE9wdGlvbnMgd2l0aCByZXN0cmljdGlvbnNcbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgc3RyYXRzLmVsID0gc3RyYXRzLnByb3BzRGF0YSA9IGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkLCB2bSwga2V5KSB7XG4gICAgaWYgKCF2bSkge1xuICAgICAgd2FybihcbiAgICAgICAgXCJvcHRpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiIGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIGluc3RhbmNlIFwiICtcbiAgICAgICAgJ2NyZWF0aW9uIHdpdGggdGhlIGBuZXdgIGtleXdvcmQuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRTdHJhdChwYXJlbnQsIGNoaWxkKVxuICB9O1xufVxuXG4vKipcbiAqIEhlbHBlciB0aGF0IHJlY3Vyc2l2ZWx5IG1lcmdlcyB0d28gZGF0YSBvYmplY3RzIHRvZ2V0aGVyLlxuICovXG5mdW5jdGlvbiBtZXJnZURhdGEgKHRvLCBmcm9tKSB7XG4gIGlmICghZnJvbSkgeyByZXR1cm4gdG8gfVxuICB2YXIga2V5LCB0b1ZhbCwgZnJvbVZhbDtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhmcm9tKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICB0b1ZhbCA9IHRvW2tleV07XG4gICAgZnJvbVZhbCA9IGZyb21ba2V5XTtcbiAgICBpZiAoIWhhc093bih0bywga2V5KSkge1xuICAgICAgc2V0KHRvLCBrZXksIGZyb21WYWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh0b1ZhbCkgJiYgaXNQbGFpbk9iamVjdChmcm9tVmFsKSkge1xuICAgICAgbWVyZ2VEYXRhKHRvVmFsLCBmcm9tVmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvXG59XG5cbi8qKlxuICogRGF0YVxuICovXG5mdW5jdGlvbiBtZXJnZURhdGFPckZuIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm1cbikge1xuICBpZiAoIXZtKSB7XG4gICAgLy8gaW4gYSBWdWUuZXh0ZW5kIG1lcmdlLCBib3RoIHNob3VsZCBiZSBmdW5jdGlvbnNcbiAgICBpZiAoIWNoaWxkVmFsKSB7XG4gICAgICByZXR1cm4gcGFyZW50VmFsXG4gICAgfVxuICAgIGlmICghcGFyZW50VmFsKSB7XG4gICAgICByZXR1cm4gY2hpbGRWYWxcbiAgICB9XG4gICAgLy8gd2hlbiBwYXJlbnRWYWwgJiBjaGlsZFZhbCBhcmUgYm90aCBwcmVzZW50LFxuICAgIC8vIHdlIG5lZWQgdG8gcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAgIC8vIG1lcmdlZCByZXN1bHQgb2YgYm90aCBmdW5jdGlvbnMuLi4gbm8gbmVlZCB0b1xuICAgIC8vIGNoZWNrIGlmIHBhcmVudFZhbCBpcyBhIGZ1bmN0aW9uIGhlcmUgYmVjYXVzZVxuICAgIC8vIGl0IGhhcyB0byBiZSBhIGZ1bmN0aW9uIHRvIHBhc3MgcHJldmlvdXMgbWVyZ2VzLlxuICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWREYXRhRm4gKCkge1xuICAgICAgcmV0dXJuIG1lcmdlRGF0YShcbiAgICAgICAgdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nID8gY2hpbGRWYWwuY2FsbCh0aGlzLCB0aGlzKSA6IGNoaWxkVmFsLFxuICAgICAgICB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nID8gcGFyZW50VmFsLmNhbGwodGhpcywgdGhpcykgOiBwYXJlbnRWYWxcbiAgICAgIClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZEluc3RhbmNlRGF0YUZuICgpIHtcbiAgICAgIC8vIGluc3RhbmNlIG1lcmdlXG4gICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gY2hpbGRWYWwuY2FsbCh2bSwgdm0pXG4gICAgICAgIDogY2hpbGRWYWw7XG4gICAgICB2YXIgZGVmYXVsdERhdGEgPSB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gcGFyZW50VmFsLmNhbGwodm0sIHZtKVxuICAgICAgICA6IHBhcmVudFZhbDtcbiAgICAgIGlmIChpbnN0YW5jZURhdGEpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlRGF0YShpbnN0YW5jZURhdGEsIGRlZmF1bHREYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHREYXRhXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnN0cmF0cy5kYXRhID0gZnVuY3Rpb24gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bVxuKSB7XG4gIGlmICghdm0pIHtcbiAgICBpZiAoY2hpbGRWYWwgJiYgdHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgICdUaGUgXCJkYXRhXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgK1xuICAgICAgICAndGhhdCByZXR1cm5zIGEgcGVyLWluc3RhbmNlIHZhbHVlIGluIGNvbXBvbmVudCAnICtcbiAgICAgICAgJ2RlZmluaXRpb25zLicsXG4gICAgICAgIHZtXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gcGFyZW50VmFsXG4gICAgfVxuICAgIHJldHVybiBtZXJnZURhdGFPckZuKHBhcmVudFZhbCwgY2hpbGRWYWwpXG4gIH1cblxuICByZXR1cm4gbWVyZ2VEYXRhT3JGbihwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSlcbn07XG5cbi8qKlxuICogSG9va3MgYW5kIHByb3BzIGFyZSBtZXJnZWQgYXMgYXJyYXlzLlxuICovXG5mdW5jdGlvbiBtZXJnZUhvb2sgKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsXG4pIHtcbiAgcmV0dXJuIGNoaWxkVmFsXG4gICAgPyBwYXJlbnRWYWxcbiAgICAgID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbClcbiAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZFZhbClcbiAgICAgICAgPyBjaGlsZFZhbFxuICAgICAgICA6IFtjaGlsZFZhbF1cbiAgICA6IHBhcmVudFZhbFxufVxuXG5MSUZFQ1lDTEVfSE9PS1MuZm9yRWFjaChmdW5jdGlvbiAoaG9vaykge1xuICBzdHJhdHNbaG9va10gPSBtZXJnZUhvb2s7XG59KTtcblxuLyoqXG4gKiBBc3NldHNcbiAqXG4gKiBXaGVuIGEgdm0gaXMgcHJlc2VudCAoaW5zdGFuY2UgY3JlYXRpb24pLCB3ZSBuZWVkIHRvIGRvXG4gKiBhIHRocmVlLXdheSBtZXJnZSBiZXR3ZWVuIGNvbnN0cnVjdG9yIG9wdGlvbnMsIGluc3RhbmNlXG4gKiBvcHRpb25zIGFuZCBwYXJlbnQgb3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VBc3NldHMgKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bSxcbiAga2V5XG4pIHtcbiAgdmFyIHJlcyA9IE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpO1xuICBpZiAoY2hpbGRWYWwpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGFzc2VydE9iamVjdFR5cGUoa2V5LCBjaGlsZFZhbCwgdm0pO1xuICAgIHJldHVybiBleHRlbmQocmVzLCBjaGlsZFZhbClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzXG4gIH1cbn1cblxuQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICBzdHJhdHNbdHlwZSArICdzJ10gPSBtZXJnZUFzc2V0cztcbn0pO1xuXG4vKipcbiAqIFdhdGNoZXJzLlxuICpcbiAqIFdhdGNoZXJzIGhhc2hlcyBzaG91bGQgbm90IG92ZXJ3cml0ZSBvbmVcbiAqIGFub3RoZXIsIHNvIHdlIG1lcmdlIHRoZW0gYXMgYXJyYXlzLlxuICovXG5zdHJhdHMud2F0Y2ggPSBmdW5jdGlvbiAoXG4gIHBhcmVudFZhbCxcbiAgY2hpbGRWYWwsXG4gIHZtLFxuICBrZXlcbikge1xuICAvLyB3b3JrIGFyb3VuZCBGaXJlZm94J3MgT2JqZWN0LnByb3RvdHlwZS53YXRjaC4uLlxuICBpZiAocGFyZW50VmFsID09PSBuYXRpdmVXYXRjaCkgeyBwYXJlbnRWYWwgPSB1bmRlZmluZWQ7IH1cbiAgaWYgKGNoaWxkVmFsID09PSBuYXRpdmVXYXRjaCkgeyBjaGlsZFZhbCA9IHVuZGVmaW5lZDsgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKCFjaGlsZFZhbCkgeyByZXR1cm4gT2JqZWN0LmNyZWF0ZShwYXJlbnRWYWwgfHwgbnVsbCkgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydE9iamVjdFR5cGUoa2V5LCBjaGlsZFZhbCwgdm0pO1xuICB9XG4gIGlmICghcGFyZW50VmFsKSB7IHJldHVybiBjaGlsZFZhbCB9XG4gIHZhciByZXQgPSB7fTtcbiAgZXh0ZW5kKHJldCwgcGFyZW50VmFsKTtcbiAgZm9yICh2YXIga2V5JDEgaW4gY2hpbGRWYWwpIHtcbiAgICB2YXIgcGFyZW50ID0gcmV0W2tleSQxXTtcbiAgICB2YXIgY2hpbGQgPSBjaGlsZFZhbFtrZXkkMV07XG4gICAgaWYgKHBhcmVudCAmJiAhQXJyYXkuaXNBcnJheShwYXJlbnQpKSB7XG4gICAgICBwYXJlbnQgPSBbcGFyZW50XTtcbiAgICB9XG4gICAgcmV0W2tleSQxXSA9IHBhcmVudFxuICAgICAgPyBwYXJlbnQuY29uY2F0KGNoaWxkKVxuICAgICAgOiBBcnJheS5pc0FycmF5KGNoaWxkKSA/IGNoaWxkIDogW2NoaWxkXTtcbiAgfVxuICByZXR1cm4gcmV0XG59O1xuXG4vKipcbiAqIE90aGVyIG9iamVjdCBoYXNoZXMuXG4gKi9cbnN0cmF0cy5wcm9wcyA9XG5zdHJhdHMubWV0aG9kcyA9XG5zdHJhdHMuaW5qZWN0ID1cbnN0cmF0cy5jb21wdXRlZCA9IGZ1bmN0aW9uIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm0sXG4gIGtleVxuKSB7XG4gIGlmIChjaGlsZFZhbCAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0T2JqZWN0VHlwZShrZXksIGNoaWxkVmFsLCB2bSk7XG4gIH1cbiAgaWYgKCFwYXJlbnRWYWwpIHsgcmV0dXJuIGNoaWxkVmFsIH1cbiAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGV4dGVuZChyZXQsIHBhcmVudFZhbCk7XG4gIGlmIChjaGlsZFZhbCkgeyBleHRlbmQocmV0LCBjaGlsZFZhbCk7IH1cbiAgcmV0dXJuIHJldFxufTtcbnN0cmF0cy5wcm92aWRlID0gbWVyZ2VEYXRhT3JGbjtcblxuLyoqXG4gKiBEZWZhdWx0IHN0cmF0ZWd5LlxuICovXG52YXIgZGVmYXVsdFN0cmF0ID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgcmV0dXJuIGNoaWxkVmFsID09PSB1bmRlZmluZWRcbiAgICA/IHBhcmVudFZhbFxuICAgIDogY2hpbGRWYWxcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgY29tcG9uZW50IG5hbWVzXG4gKi9cbmZ1bmN0aW9uIGNoZWNrQ29tcG9uZW50cyAob3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucy5jb21wb25lbnRzKSB7XG4gICAgdmFsaWRhdGVDb21wb25lbnROYW1lKGtleSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb21wb25lbnROYW1lIChuYW1lKSB7XG4gIGlmICghL15bYS16QS1aXVtcXHctXSokLy50ZXN0KG5hbWUpKSB7XG4gICAgd2FybihcbiAgICAgICdJbnZhbGlkIGNvbXBvbmVudCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiLiBDb21wb25lbnQgbmFtZXMgJyArXG4gICAgICAnY2FuIG9ubHkgY29udGFpbiBhbHBoYW51bWVyaWMgY2hhcmFjdGVycyBhbmQgdGhlIGh5cGhlbiwgJyArXG4gICAgICAnYW5kIG11c3Qgc3RhcnQgd2l0aCBhIGxldHRlci4nXG4gICAgKTtcbiAgfVxuICBpZiAoaXNCdWlsdEluVGFnKG5hbWUpIHx8IGNvbmZpZy5pc1Jlc2VydmVkVGFnKG5hbWUpKSB7XG4gICAgd2FybihcbiAgICAgICdEbyBub3QgdXNlIGJ1aWx0LWluIG9yIHJlc2VydmVkIEhUTUwgZWxlbWVudHMgYXMgY29tcG9uZW50ICcgK1xuICAgICAgJ2lkOiAnICsgbmFtZVxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmUgYWxsIHByb3BzIG9wdGlvbiBzeW50YXggYXJlIG5vcm1hbGl6ZWQgaW50byB0aGVcbiAqIE9iamVjdC1iYXNlZCBmb3JtYXQuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVByb3BzIChvcHRpb25zLCB2bSkge1xuICB2YXIgcHJvcHMgPSBvcHRpb25zLnByb3BzO1xuICBpZiAoIXByb3BzKSB7IHJldHVybiB9XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGksIHZhbCwgbmFtZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMpKSB7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2YWwgPSBwcm9wc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYW1lID0gY2FtZWxpemUodmFsKTtcbiAgICAgICAgcmVzW25hbWVdID0geyB0eXBlOiBudWxsIH07XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgd2FybigncHJvcHMgbXVzdCBiZSBzdHJpbmdzIHdoZW4gdXNpbmcgYXJyYXkgc3ludGF4LicpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHByb3BzKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgdmFsID0gcHJvcHNba2V5XTtcbiAgICAgIG5hbWUgPSBjYW1lbGl6ZShrZXkpO1xuICAgICAgcmVzW25hbWVdID0gaXNQbGFpbk9iamVjdCh2YWwpXG4gICAgICAgID8gdmFsXG4gICAgICAgIDogeyB0eXBlOiB2YWwgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHdhcm4oXG4gICAgICBcIkludmFsaWQgdmFsdWUgZm9yIG9wdGlvbiBcXFwicHJvcHNcXFwiOiBleHBlY3RlZCBhbiBBcnJheSBvciBhbiBPYmplY3QsIFwiICtcbiAgICAgIFwiYnV0IGdvdCBcIiArICh0b1Jhd1R5cGUocHJvcHMpKSArIFwiLlwiLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIG9wdGlvbnMucHJvcHMgPSByZXM7XG59XG5cbi8qKlxuICogTm9ybWFsaXplIGFsbCBpbmplY3Rpb25zIGludG8gT2JqZWN0LWJhc2VkIGZvcm1hdFxuICovXG5mdW5jdGlvbiBub3JtYWxpemVJbmplY3QgKG9wdGlvbnMsIHZtKSB7XG4gIHZhciBpbmplY3QgPSBvcHRpb25zLmluamVjdDtcbiAgaWYgKCFpbmplY3QpIHsgcmV0dXJuIH1cbiAgdmFyIG5vcm1hbGl6ZWQgPSBvcHRpb25zLmluamVjdCA9IHt9O1xuICBpZiAoQXJyYXkuaXNBcnJheShpbmplY3QpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmplY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5vcm1hbGl6ZWRbaW5qZWN0W2ldXSA9IHsgZnJvbTogaW5qZWN0W2ldIH07XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoaW5qZWN0KSkge1xuICAgIGZvciAodmFyIGtleSBpbiBpbmplY3QpIHtcbiAgICAgIHZhciB2YWwgPSBpbmplY3Rba2V5XTtcbiAgICAgIG5vcm1hbGl6ZWRba2V5XSA9IGlzUGxhaW5PYmplY3QodmFsKVxuICAgICAgICA/IGV4dGVuZCh7IGZyb206IGtleSB9LCB2YWwpXG4gICAgICAgIDogeyBmcm9tOiB2YWwgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHdhcm4oXG4gICAgICBcIkludmFsaWQgdmFsdWUgZm9yIG9wdGlvbiBcXFwiaW5qZWN0XFxcIjogZXhwZWN0ZWQgYW4gQXJyYXkgb3IgYW4gT2JqZWN0LCBcIiArXG4gICAgICBcImJ1dCBnb3QgXCIgKyAodG9SYXdUeXBlKGluamVjdCkpICsgXCIuXCIsXG4gICAgICB2bVxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgcmF3IGZ1bmN0aW9uIGRpcmVjdGl2ZXMgaW50byBvYmplY3QgZm9ybWF0LlxuICovXG5mdW5jdGlvbiBub3JtYWxpemVEaXJlY3RpdmVzIChvcHRpb25zKSB7XG4gIHZhciBkaXJzID0gb3B0aW9ucy5kaXJlY3RpdmVzO1xuICBpZiAoZGlycykge1xuICAgIGZvciAodmFyIGtleSBpbiBkaXJzKSB7XG4gICAgICB2YXIgZGVmID0gZGlyc1trZXldO1xuICAgICAgaWYgKHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZGlyc1trZXldID0geyBiaW5kOiBkZWYsIHVwZGF0ZTogZGVmIH07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydE9iamVjdFR5cGUgKG5hbWUsIHZhbHVlLCB2bSkge1xuICBpZiAoIWlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgd2FybihcbiAgICAgIFwiSW52YWxpZCB2YWx1ZSBmb3Igb3B0aW9uIFxcXCJcIiArIG5hbWUgKyBcIlxcXCI6IGV4cGVjdGVkIGFuIE9iamVjdCwgXCIgK1xuICAgICAgXCJidXQgZ290IFwiICsgKHRvUmF3VHlwZSh2YWx1ZSkpICsgXCIuXCIsXG4gICAgICB2bVxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBNZXJnZSB0d28gb3B0aW9uIG9iamVjdHMgaW50byBhIG5ldyBvbmUuXG4gKiBDb3JlIHV0aWxpdHkgdXNlZCBpbiBib3RoIGluc3RhbnRpYXRpb24gYW5kIGluaGVyaXRhbmNlLlxuICovXG5mdW5jdGlvbiBtZXJnZU9wdGlvbnMgKFxuICBwYXJlbnQsXG4gIGNoaWxkLFxuICB2bVxuKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY2hlY2tDb21wb25lbnRzKGNoaWxkKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY2hpbGQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjaGlsZCA9IGNoaWxkLm9wdGlvbnM7XG4gIH1cblxuICBub3JtYWxpemVQcm9wcyhjaGlsZCwgdm0pO1xuICBub3JtYWxpemVJbmplY3QoY2hpbGQsIHZtKTtcbiAgbm9ybWFsaXplRGlyZWN0aXZlcyhjaGlsZCk7XG4gIHZhciBleHRlbmRzRnJvbSA9IGNoaWxkLmV4dGVuZHM7XG4gIGlmIChleHRlbmRzRnJvbSkge1xuICAgIHBhcmVudCA9IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGV4dGVuZHNGcm9tLCB2bSk7XG4gIH1cbiAgaWYgKGNoaWxkLm1peGlucykge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGQubWl4aW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQubWl4aW5zW2ldLCB2bSk7XG4gICAgfVxuICB9XG4gIHZhciBvcHRpb25zID0ge307XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIHBhcmVudCkge1xuICAgIG1lcmdlRmllbGQoa2V5KTtcbiAgfVxuICBmb3IgKGtleSBpbiBjaGlsZCkge1xuICAgIGlmICghaGFzT3duKHBhcmVudCwga2V5KSkge1xuICAgICAgbWVyZ2VGaWVsZChrZXkpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtZXJnZUZpZWxkIChrZXkpIHtcbiAgICB2YXIgc3RyYXQgPSBzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXQ7XG4gICAgb3B0aW9uc1trZXldID0gc3RyYXQocGFyZW50W2tleV0sIGNoaWxkW2tleV0sIHZtLCBrZXkpO1xuICB9XG4gIHJldHVybiBvcHRpb25zXG59XG5cbi8qKlxuICogUmVzb2x2ZSBhbiBhc3NldC5cbiAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCBiZWNhdXNlIGNoaWxkIGluc3RhbmNlcyBuZWVkIGFjY2Vzc1xuICogdG8gYXNzZXRzIGRlZmluZWQgaW4gaXRzIGFuY2VzdG9yIGNoYWluLlxuICovXG5mdW5jdGlvbiByZXNvbHZlQXNzZXQgKFxuICBvcHRpb25zLFxuICB0eXBlLFxuICBpZCxcbiAgd2Fybk1pc3Npbmdcbikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgYXNzZXRzID0gb3B0aW9uc1t0eXBlXTtcbiAgLy8gY2hlY2sgbG9jYWwgcmVnaXN0cmF0aW9uIHZhcmlhdGlvbnMgZmlyc3RcbiAgaWYgKGhhc093bihhc3NldHMsIGlkKSkgeyByZXR1cm4gYXNzZXRzW2lkXSB9XG4gIHZhciBjYW1lbGl6ZWRJZCA9IGNhbWVsaXplKGlkKTtcbiAgaWYgKGhhc093bihhc3NldHMsIGNhbWVsaXplZElkKSkgeyByZXR1cm4gYXNzZXRzW2NhbWVsaXplZElkXSB9XG4gIHZhciBQYXNjYWxDYXNlSWQgPSBjYXBpdGFsaXplKGNhbWVsaXplZElkKTtcbiAgaWYgKGhhc093bihhc3NldHMsIFBhc2NhbENhc2VJZCkpIHsgcmV0dXJuIGFzc2V0c1tQYXNjYWxDYXNlSWRdIH1cbiAgLy8gZmFsbGJhY2sgdG8gcHJvdG90eXBlIGNoYWluXG4gIHZhciByZXMgPSBhc3NldHNbaWRdIHx8IGFzc2V0c1tjYW1lbGl6ZWRJZF0gfHwgYXNzZXRzW1Bhc2NhbENhc2VJZF07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm5NaXNzaW5nICYmICFyZXMpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ZhaWxlZCB0byByZXNvbHZlICcgKyB0eXBlLnNsaWNlKDAsIC0xKSArICc6ICcgKyBpZCxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcCAoXG4gIGtleSxcbiAgcHJvcE9wdGlvbnMsXG4gIHByb3BzRGF0YSxcbiAgdm1cbikge1xuICB2YXIgcHJvcCA9IHByb3BPcHRpb25zW2tleV07XG4gIHZhciBhYnNlbnQgPSAhaGFzT3duKHByb3BzRGF0YSwga2V5KTtcbiAgdmFyIHZhbHVlID0gcHJvcHNEYXRhW2tleV07XG4gIC8vIGJvb2xlYW4gY2FzdGluZ1xuICB2YXIgYm9vbGVhbkluZGV4ID0gZ2V0VHlwZUluZGV4KEJvb2xlYW4sIHByb3AudHlwZSk7XG4gIGlmIChib29sZWFuSW5kZXggPiAtMSkge1xuICAgIGlmIChhYnNlbnQgJiYgIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgICB2YWx1ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBoeXBoZW5hdGUoa2V5KSkge1xuICAgICAgLy8gb25seSBjYXN0IGVtcHR5IHN0cmluZyAvIHNhbWUgbmFtZSB0byBib29sZWFuIGlmXG4gICAgICAvLyBib29sZWFuIGhhcyBoaWdoZXIgcHJpb3JpdHlcbiAgICAgIHZhciBzdHJpbmdJbmRleCA9IGdldFR5cGVJbmRleChTdHJpbmcsIHByb3AudHlwZSk7XG4gICAgICBpZiAoc3RyaW5nSW5kZXggPCAwIHx8IGJvb2xlYW5JbmRleCA8IHN0cmluZ0luZGV4KSB7XG4gICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gY2hlY2sgZGVmYXVsdCB2YWx1ZVxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhbHVlID0gZ2V0UHJvcERlZmF1bHRWYWx1ZSh2bSwgcHJvcCwga2V5KTtcbiAgICAvLyBzaW5jZSB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBhIGZyZXNoIGNvcHksXG4gICAgLy8gbWFrZSBzdXJlIHRvIG9ic2VydmUgaXQuXG4gICAgdmFyIHByZXZTaG91bGRPYnNlcnZlID0gc2hvdWxkT2JzZXJ2ZTtcbiAgICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG4gICAgb2JzZXJ2ZSh2YWx1ZSk7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKHByZXZTaG91bGRPYnNlcnZlKTtcbiAgfVxuICBpZiAoXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIC8vIHNraXAgdmFsaWRhdGlvbiBmb3Igd2VleCByZWN5Y2xlLWxpc3QgY2hpbGQgY29tcG9uZW50IHByb3BzXG4gICAgIShmYWxzZSAmJiBpc09iamVjdCh2YWx1ZSkgJiYgKCdAYmluZGluZycgaW4gdmFsdWUpKVxuICApIHtcbiAgICBhc3NlcnRQcm9wKHByb3AsIGtleSwgdmFsdWUsIHZtLCBhYnNlbnQpO1xuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG4vKipcbiAqIEdldCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhIHByb3AuXG4gKi9cbmZ1bmN0aW9uIGdldFByb3BEZWZhdWx0VmFsdWUgKHZtLCBwcm9wLCBrZXkpIHtcbiAgLy8gbm8gZGVmYXVsdCwgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG4gIHZhciBkZWYgPSBwcm9wLmRlZmF1bHQ7XG4gIC8vIHdhcm4gYWdhaW5zdCBub24tZmFjdG9yeSBkZWZhdWx0cyBmb3IgT2JqZWN0ICYgQXJyYXlcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaXNPYmplY3QoZGVmKSkge1xuICAgIHdhcm4oXG4gICAgICAnSW52YWxpZCBkZWZhdWx0IHZhbHVlIGZvciBwcm9wIFwiJyArIGtleSArICdcIjogJyArXG4gICAgICAnUHJvcHMgd2l0aCB0eXBlIE9iamVjdC9BcnJheSBtdXN0IHVzZSBhIGZhY3RvcnkgZnVuY3Rpb24gJyArXG4gICAgICAndG8gcmV0dXJuIHRoZSBkZWZhdWx0IHZhbHVlLicsXG4gICAgICB2bVxuICAgICk7XG4gIH1cbiAgLy8gdGhlIHJhdyBwcm9wIHZhbHVlIHdhcyBhbHNvIHVuZGVmaW5lZCBmcm9tIHByZXZpb3VzIHJlbmRlcixcbiAgLy8gcmV0dXJuIHByZXZpb3VzIGRlZmF1bHQgdmFsdWUgdG8gYXZvaWQgdW5uZWNlc3Nhcnkgd2F0Y2hlciB0cmlnZ2VyXG4gIGlmICh2bSAmJiB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgJiZcbiAgICB2bS4kb3B0aW9ucy5wcm9wc0RhdGFba2V5XSA9PT0gdW5kZWZpbmVkICYmXG4gICAgdm0uX3Byb3BzW2tleV0gIT09IHVuZGVmaW5lZFxuICApIHtcbiAgICByZXR1cm4gdm0uX3Byb3BzW2tleV1cbiAgfVxuICAvLyBjYWxsIGZhY3RvcnkgZnVuY3Rpb24gZm9yIG5vbi1GdW5jdGlvbiB0eXBlc1xuICAvLyBhIHZhbHVlIGlzIEZ1bmN0aW9uIGlmIGl0cyBwcm90b3R5cGUgaXMgZnVuY3Rpb24gZXZlbiBhY3Jvc3MgZGlmZmVyZW50IGV4ZWN1dGlvbiBjb250ZXh0XG4gIHJldHVybiB0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nICYmIGdldFR5cGUocHJvcC50eXBlKSAhPT0gJ0Z1bmN0aW9uJ1xuICAgID8gZGVmLmNhbGwodm0pXG4gICAgOiBkZWZcbn1cblxuLyoqXG4gKiBBc3NlcnQgd2hldGhlciBhIHByb3AgaXMgdmFsaWQuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydFByb3AgKFxuICBwcm9wLFxuICBuYW1lLFxuICB2YWx1ZSxcbiAgdm0sXG4gIGFic2VudFxuKSB7XG4gIGlmIChwcm9wLnJlcXVpcmVkICYmIGFic2VudCkge1xuICAgIHdhcm4oXG4gICAgICAnTWlzc2luZyByZXF1aXJlZCBwcm9wOiBcIicgKyBuYW1lICsgJ1wiJyxcbiAgICAgIHZtXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCAmJiAhcHJvcC5yZXF1aXJlZCkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciB0eXBlID0gcHJvcC50eXBlO1xuICB2YXIgdmFsaWQgPSAhdHlwZSB8fCB0eXBlID09PSB0cnVlO1xuICB2YXIgZXhwZWN0ZWRUeXBlcyA9IFtdO1xuICBpZiAodHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgdHlwZSA9IFt0eXBlXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aCAmJiAhdmFsaWQ7IGkrKykge1xuICAgICAgdmFyIGFzc2VydGVkVHlwZSA9IGFzc2VydFR5cGUodmFsdWUsIHR5cGVbaV0pO1xuICAgICAgZXhwZWN0ZWRUeXBlcy5wdXNoKGFzc2VydGVkVHlwZS5leHBlY3RlZFR5cGUgfHwgJycpO1xuICAgICAgdmFsaWQgPSBhc3NlcnRlZFR5cGUudmFsaWQ7XG4gICAgfVxuICB9XG4gIGlmICghdmFsaWQpIHtcbiAgICB3YXJuKFxuICAgICAgXCJJbnZhbGlkIHByb3A6IHR5cGUgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIuXCIgK1xuICAgICAgXCIgRXhwZWN0ZWQgXCIgKyAoZXhwZWN0ZWRUeXBlcy5tYXAoY2FwaXRhbGl6ZSkuam9pbignLCAnKSkgK1xuICAgICAgXCIsIGdvdCBcIiArICh0b1Jhd1R5cGUodmFsdWUpKSArIFwiLlwiLFxuICAgICAgdm1cbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIHZhciB2YWxpZGF0b3IgPSBwcm9wLnZhbGlkYXRvcjtcbiAgaWYgKHZhbGlkYXRvcikge1xuICAgIGlmICghdmFsaWRhdG9yKHZhbHVlKSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0ludmFsaWQgcHJvcDogY3VzdG9tIHZhbGlkYXRvciBjaGVjayBmYWlsZWQgZm9yIHByb3AgXCInICsgbmFtZSArICdcIi4nLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHNpbXBsZUNoZWNrUkUgPSAvXihTdHJpbmd8TnVtYmVyfEJvb2xlYW58RnVuY3Rpb258U3ltYm9sKSQvO1xuXG5mdW5jdGlvbiBhc3NlcnRUeXBlICh2YWx1ZSwgdHlwZSkge1xuICB2YXIgdmFsaWQ7XG4gIHZhciBleHBlY3RlZFR5cGUgPSBnZXRUeXBlKHR5cGUpO1xuICBpZiAoc2ltcGxlQ2hlY2tSRS50ZXN0KGV4cGVjdGVkVHlwZSkpIHtcbiAgICB2YXIgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICB2YWxpZCA9IHQgPT09IGV4cGVjdGVkVHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIGZvciBwcmltaXRpdmUgd3JhcHBlciBvYmplY3RzXG4gICAgaWYgKCF2YWxpZCAmJiB0ID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gICAgfVxuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ09iamVjdCcpIHtcbiAgICB2YWxpZCA9IGlzUGxhaW5PYmplY3QodmFsdWUpO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ0FycmF5Jykge1xuICAgIHZhbGlkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB2YWxpZDogdmFsaWQsXG4gICAgZXhwZWN0ZWRUeXBlOiBleHBlY3RlZFR5cGVcbiAgfVxufVxuXG4vKipcbiAqIFVzZSBmdW5jdGlvbiBzdHJpbmcgbmFtZSB0byBjaGVjayBidWlsdC1pbiB0eXBlcyxcbiAqIGJlY2F1c2UgYSBzaW1wbGUgZXF1YWxpdHkgY2hlY2sgd2lsbCBmYWlsIHdoZW4gcnVubmluZ1xuICogYWNyb3NzIGRpZmZlcmVudCB2bXMgLyBpZnJhbWVzLlxuICovXG5mdW5jdGlvbiBnZXRUeXBlIChmbikge1xuICB2YXIgbWF0Y2ggPSBmbiAmJiBmbi50b1N0cmluZygpLm1hdGNoKC9eXFxzKmZ1bmN0aW9uIChcXHcrKS8pO1xuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnXG59XG5cbmZ1bmN0aW9uIGlzU2FtZVR5cGUgKGEsIGIpIHtcbiAgcmV0dXJuIGdldFR5cGUoYSkgPT09IGdldFR5cGUoYilcbn1cblxuZnVuY3Rpb24gZ2V0VHlwZUluZGV4ICh0eXBlLCBleHBlY3RlZFR5cGVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFR5cGVzKSkge1xuICAgIHJldHVybiBpc1NhbWVUeXBlKGV4cGVjdGVkVHlwZXMsIHR5cGUpID8gMCA6IC0xXG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV4cGVjdGVkVHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoaXNTYW1lVHlwZShleHBlY3RlZFR5cGVzW2ldLCB0eXBlKSkge1xuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBoYW5kbGVFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICBpZiAodm0pIHtcbiAgICB2YXIgY3VyID0gdm07XG4gICAgd2hpbGUgKChjdXIgPSBjdXIuJHBhcmVudCkpIHtcbiAgICAgIHZhciBob29rcyA9IGN1ci4kb3B0aW9ucy5lcnJvckNhcHR1cmVkO1xuICAgICAgaWYgKGhvb2tzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNhcHR1cmUgPSBob29rc1tpXS5jYWxsKGN1ciwgZXJyLCB2bSwgaW5mbykgPT09IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGNhcHR1cmUpIHsgcmV0dXJuIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBnbG9iYWxIYW5kbGVFcnJvcihlLCBjdXIsICdlcnJvckNhcHR1cmVkIGhvb2snKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2xvYmFsSGFuZGxlRXJyb3IoZXJyLCB2bSwgaW5mbyk7XG59XG5cbmZ1bmN0aW9uIGdsb2JhbEhhbmRsZUVycm9yIChlcnIsIHZtLCBpbmZvKSB7XG4gIGlmIChjb25maWcuZXJyb3JIYW5kbGVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBjb25maWcuZXJyb3JIYW5kbGVyLmNhbGwobnVsbCwgZXJyLCB2bSwgaW5mbylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dFcnJvcihlLCBudWxsLCAnY29uZmlnLmVycm9ySGFuZGxlcicpO1xuICAgIH1cbiAgfVxuICBsb2dFcnJvcihlcnIsIHZtLCBpbmZvKTtcbn1cblxuZnVuY3Rpb24gbG9nRXJyb3IgKGVyciwgdm0sIGluZm8pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB3YXJuKChcIkVycm9yIGluIFwiICsgaW5mbyArIFwiOiBcXFwiXCIgKyAoZXJyLnRvU3RyaW5nKCkpICsgXCJcXFwiXCIpLCB2bSk7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKChpbkJyb3dzZXIgfHwgaW5XZWV4KSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgZXJyXG4gIH1cbn1cblxuLyogICovXG4vKiBnbG9iYWxzIE1lc3NhZ2VDaGFubmVsICovXG5cbnZhciBjYWxsYmFja3MgPSBbXTtcbnZhciBwZW5kaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGZsdXNoQ2FsbGJhY2tzICgpIHtcbiAgcGVuZGluZyA9IGZhbHNlO1xuICB2YXIgY29waWVzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICBjYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3BpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb3BpZXNbaV0oKTtcbiAgfVxufVxuXG4vLyBIZXJlIHdlIGhhdmUgYXN5bmMgZGVmZXJyaW5nIHdyYXBwZXJzIHVzaW5nIGJvdGggbWljcm90YXNrcyBhbmQgKG1hY3JvKSB0YXNrcy5cbi8vIEluIDwgMi40IHdlIHVzZWQgbWljcm90YXNrcyBldmVyeXdoZXJlLCBidXQgdGhlcmUgYXJlIHNvbWUgc2NlbmFyaW9zIHdoZXJlXG4vLyBtaWNyb3Rhc2tzIGhhdmUgdG9vIGhpZ2ggYSBwcmlvcml0eSBhbmQgZmlyZSBpbiBiZXR3ZWVuIHN1cHBvc2VkbHlcbi8vIHNlcXVlbnRpYWwgZXZlbnRzIChlLmcuICM0NTIxLCAjNjY5MCkgb3IgZXZlbiBiZXR3ZWVuIGJ1YmJsaW5nIG9mIHRoZSBzYW1lXG4vLyBldmVudCAoIzY1NjYpLiBIb3dldmVyLCB1c2luZyAobWFjcm8pIHRhc2tzIGV2ZXJ5d2hlcmUgYWxzbyBoYXMgc3VidGxlIHByb2JsZW1zXG4vLyB3aGVuIHN0YXRlIGlzIGNoYW5nZWQgcmlnaHQgYmVmb3JlIHJlcGFpbnQgKGUuZy4gIzY4MTMsIG91dC1pbiB0cmFuc2l0aW9ucykuXG4vLyBIZXJlIHdlIHVzZSBtaWNyb3Rhc2sgYnkgZGVmYXVsdCwgYnV0IGV4cG9zZSBhIHdheSB0byBmb3JjZSAobWFjcm8pIHRhc2sgd2hlblxuLy8gbmVlZGVkIChlLmcuIGluIGV2ZW50IGhhbmRsZXJzIGF0dGFjaGVkIGJ5IHYtb24pLlxudmFyIG1pY3JvVGltZXJGdW5jO1xudmFyIG1hY3JvVGltZXJGdW5jO1xudmFyIHVzZU1hY3JvVGFzayA9IGZhbHNlO1xuXG4vLyBEZXRlcm1pbmUgKG1hY3JvKSB0YXNrIGRlZmVyIGltcGxlbWVudGF0aW9uLlxuLy8gVGVjaG5pY2FsbHkgc2V0SW1tZWRpYXRlIHNob3VsZCBiZSB0aGUgaWRlYWwgY2hvaWNlLCBidXQgaXQncyBvbmx5IGF2YWlsYWJsZVxuLy8gaW4gSUUuIFRoZSBvbmx5IHBvbHlmaWxsIHRoYXQgY29uc2lzdGVudGx5IHF1ZXVlcyB0aGUgY2FsbGJhY2sgYWZ0ZXIgYWxsIERPTVxuLy8gZXZlbnRzIHRyaWdnZXJlZCBpbiB0aGUgc2FtZSBsb29wIGlzIGJ5IHVzaW5nIE1lc3NhZ2VDaGFubmVsLlxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAodHlwZW9mIHNldEltbWVkaWF0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoc2V0SW1tZWRpYXRlKSkge1xuICBtYWNyb1RpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZXRJbW1lZGlhdGUoZmx1c2hDYWxsYmFja3MpO1xuICB9O1xufSBlbHNlIGlmICh0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnICYmIChcbiAgaXNOYXRpdmUoTWVzc2FnZUNoYW5uZWwpIHx8XG4gIC8vIFBoYW50b21KU1xuICBNZXNzYWdlQ2hhbm5lbC50b1N0cmluZygpID09PSAnW29iamVjdCBNZXNzYWdlQ2hhbm5lbENvbnN0cnVjdG9yXSdcbikpIHtcbiAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgdmFyIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoQ2FsbGJhY2tzO1xuICBtYWNyb1RpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBwb3J0LnBvc3RNZXNzYWdlKDEpO1xuICB9O1xufSBlbHNlIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgbWFjcm9UaW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dChmbHVzaENhbGxiYWNrcywgMCk7XG4gIH07XG59XG5cbi8vIERldGVybWluZSBtaWNyb3Rhc2sgZGVmZXIgaW1wbGVtZW50YXRpb24uXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCwgJGZsb3ctZGlzYWJsZS1saW5lICovXG5pZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKFByb21pc2UpKSB7XG4gIHZhciBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIG1pY3JvVGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgIHAudGhlbihmbHVzaENhbGxiYWNrcyk7XG4gICAgLy8gaW4gcHJvYmxlbWF0aWMgVUlXZWJWaWV3cywgUHJvbWlzZS50aGVuIGRvZXNuJ3QgY29tcGxldGVseSBicmVhaywgYnV0XG4gICAgLy8gaXQgY2FuIGdldCBzdHVjayBpbiBhIHdlaXJkIHN0YXRlIHdoZXJlIGNhbGxiYWNrcyBhcmUgcHVzaGVkIGludG8gdGhlXG4gICAgLy8gbWljcm90YXNrIHF1ZXVlIGJ1dCB0aGUgcXVldWUgaXNuJ3QgYmVpbmcgZmx1c2hlZCwgdW50aWwgdGhlIGJyb3dzZXJcbiAgICAvLyBuZWVkcyB0byBkbyBzb21lIG90aGVyIHdvcmssIGUuZy4gaGFuZGxlIGEgdGltZXIuIFRoZXJlZm9yZSB3ZSBjYW5cbiAgICAvLyBcImZvcmNlXCIgdGhlIG1pY3JvdGFzayBxdWV1ZSB0byBiZSBmbHVzaGVkIGJ5IGFkZGluZyBhbiBlbXB0eSB0aW1lci5cbiAgICBpZiAoaXNJT1MpIHsgc2V0VGltZW91dChub29wKTsgfVxuICB9O1xufSBlbHNlIHtcbiAgLy8gZmFsbGJhY2sgdG8gbWFjcm9cbiAgbWljcm9UaW1lckZ1bmMgPSBtYWNyb1RpbWVyRnVuYztcbn1cblxuLyoqXG4gKiBXcmFwIGEgZnVuY3Rpb24gc28gdGhhdCBpZiBhbnkgY29kZSBpbnNpZGUgdHJpZ2dlcnMgc3RhdGUgY2hhbmdlLFxuICogdGhlIGNoYW5nZXMgYXJlIHF1ZXVlZCB1c2luZyBhIChtYWNybykgdGFzayBpbnN0ZWFkIG9mIGEgbWljcm90YXNrLlxuICovXG5mdW5jdGlvbiB3aXRoTWFjcm9UYXNrIChmbikge1xuICByZXR1cm4gZm4uX3dpdGhUYXNrIHx8IChmbi5fd2l0aFRhc2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgdXNlTWFjcm9UYXNrID0gdHJ1ZTtcbiAgICB2YXIgcmVzID0gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB1c2VNYWNyb1Rhc2sgPSBmYWxzZTtcbiAgICByZXR1cm4gcmVzXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG5leHRUaWNrIChjYiwgY3R4KSB7XG4gIHZhciBfcmVzb2x2ZTtcbiAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgIGlmIChjYikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2IuY2FsbChjdHgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBoYW5kbGVFcnJvcihlLCBjdHgsICduZXh0VGljaycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoX3Jlc29sdmUpIHtcbiAgICAgIF9yZXNvbHZlKGN0eCk7XG4gICAgfVxuICB9KTtcbiAgaWYgKCFwZW5kaW5nKSB7XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgaWYgKHVzZU1hY3JvVGFzaykge1xuICAgICAgbWFjcm9UaW1lckZ1bmMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWljcm9UaW1lckZ1bmMoKTtcbiAgICB9XG4gIH1cbiAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gIGlmICghY2IgJiYgdHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgfSlcbiAgfVxufVxuXG4vKiAgKi9cblxuLyogbm90IHR5cGUgY2hlY2tpbmcgdGhpcyBmaWxlIGJlY2F1c2UgZmxvdyBkb2Vzbid0IHBsYXkgd2VsbCB3aXRoIFByb3h5ICovXG5cbnZhciBpbml0UHJveHk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBhbGxvd2VkR2xvYmFscyA9IG1ha2VNYXAoXG4gICAgJ0luZmluaXR5LHVuZGVmaW5lZCxOYU4saXNGaW5pdGUsaXNOYU4sJyArXG4gICAgJ3BhcnNlRmxvYXQscGFyc2VJbnQsZGVjb2RlVVJJLGRlY29kZVVSSUNvbXBvbmVudCxlbmNvZGVVUkksZW5jb2RlVVJJQ29tcG9uZW50LCcgK1xuICAgICdNYXRoLE51bWJlcixEYXRlLEFycmF5LE9iamVjdCxCb29sZWFuLFN0cmluZyxSZWdFeHAsTWFwLFNldCxKU09OLEludGwsJyArXG4gICAgJ3JlcXVpcmUnIC8vIGZvciBXZWJwYWNrL0Jyb3dzZXJpZnlcbiAgKTtcblxuICB2YXIgd2Fybk5vblByZXNlbnQgPSBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHtcbiAgICB3YXJuKFxuICAgICAgXCJQcm9wZXJ0eSBvciBtZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIG5vdCBkZWZpbmVkIG9uIHRoZSBpbnN0YW5jZSBidXQgXCIgK1xuICAgICAgJ3JlZmVyZW5jZWQgZHVyaW5nIHJlbmRlci4gTWFrZSBzdXJlIHRoYXQgdGhpcyBwcm9wZXJ0eSBpcyByZWFjdGl2ZSwgJyArXG4gICAgICAnZWl0aGVyIGluIHRoZSBkYXRhIG9wdGlvbiwgb3IgZm9yIGNsYXNzLWJhc2VkIGNvbXBvbmVudHMsIGJ5ICcgK1xuICAgICAgJ2luaXRpYWxpemluZyB0aGUgcHJvcGVydHkuICcgK1xuICAgICAgJ1NlZTogaHR0cHM6Ly92dWVqcy5vcmcvdjIvZ3VpZGUvcmVhY3Rpdml0eS5odG1sI0RlY2xhcmluZy1SZWFjdGl2ZS1Qcm9wZXJ0aWVzLicsXG4gICAgICB0YXJnZXRcbiAgICApO1xuICB9O1xuXG4gIHZhciBoYXNQcm94eSA9XG4gICAgdHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShQcm94eSk7XG5cbiAgaWYgKGhhc1Byb3h5KSB7XG4gICAgdmFyIGlzQnVpbHRJbk1vZGlmaWVyID0gbWFrZU1hcCgnc3RvcCxwcmV2ZW50LHNlbGYsY3RybCxzaGlmdCxhbHQsbWV0YSxleGFjdCcpO1xuICAgIGNvbmZpZy5rZXlDb2RlcyA9IG5ldyBQcm94eShjb25maWcua2V5Q29kZXMsIHtcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0ICh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGlzQnVpbHRJbk1vZGlmaWVyKGtleSkpIHtcbiAgICAgICAgICB3YXJuKChcIkF2b2lkIG92ZXJ3cml0aW5nIGJ1aWx0LWluIG1vZGlmaWVyIGluIGNvbmZpZy5rZXlDb2RlczogLlwiICsga2V5KSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB2YXIgaGFzSGFuZGxlciA9IHtcbiAgICBoYXM6IGZ1bmN0aW9uIGhhcyAodGFyZ2V0LCBrZXkpIHtcbiAgICAgIHZhciBoYXMgPSBrZXkgaW4gdGFyZ2V0O1xuICAgICAgdmFyIGlzQWxsb3dlZCA9IGFsbG93ZWRHbG9iYWxzKGtleSkgfHwga2V5LmNoYXJBdCgwKSA9PT0gJ18nO1xuICAgICAgaWYgKCFoYXMgJiYgIWlzQWxsb3dlZCkge1xuICAgICAgICB3YXJuTm9uUHJlc2VudCh0YXJnZXQsIGtleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzIHx8ICFpc0FsbG93ZWRcbiAgICB9XG4gIH07XG5cbiAgdmFyIGdldEhhbmRsZXIgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQgKHRhcmdldCwga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgIShrZXkgaW4gdGFyZ2V0KSkge1xuICAgICAgICB3YXJuTm9uUHJlc2VudCh0YXJnZXQsIGtleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0W2tleV1cbiAgICB9XG4gIH07XG5cbiAgaW5pdFByb3h5ID0gZnVuY3Rpb24gaW5pdFByb3h5ICh2bSkge1xuICAgIGlmIChoYXNQcm94eSkge1xuICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIHByb3h5IGhhbmRsZXIgdG8gdXNlXG4gICAgICB2YXIgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xuICAgICAgdmFyIGhhbmRsZXJzID0gb3B0aW9ucy5yZW5kZXIgJiYgb3B0aW9ucy5yZW5kZXIuX3dpdGhTdHJpcHBlZFxuICAgICAgICA/IGdldEhhbmRsZXJcbiAgICAgICAgOiBoYXNIYW5kbGVyO1xuICAgICAgdm0uX3JlbmRlclByb3h5ID0gbmV3IFByb3h5KHZtLCBoYW5kbGVycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IHZtO1xuICAgIH1cbiAgfTtcbn1cblxuLyogICovXG5cbnZhciBzZWVuT2JqZWN0cyA9IG5ldyBfU2V0KCk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgdHJhdmVyc2UgYW4gb2JqZWN0IHRvIGV2b2tlIGFsbCBjb252ZXJ0ZWRcbiAqIGdldHRlcnMsIHNvIHRoYXQgZXZlcnkgbmVzdGVkIHByb3BlcnR5IGluc2lkZSB0aGUgb2JqZWN0XG4gKiBpcyBjb2xsZWN0ZWQgYXMgYSBcImRlZXBcIiBkZXBlbmRlbmN5LlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZSAodmFsKSB7XG4gIF90cmF2ZXJzZSh2YWwsIHNlZW5PYmplY3RzKTtcbiAgc2Vlbk9iamVjdHMuY2xlYXIoKTtcbn1cblxuZnVuY3Rpb24gX3RyYXZlcnNlICh2YWwsIHNlZW4pIHtcbiAgdmFyIGksIGtleXM7XG4gIHZhciBpc0EgPSBBcnJheS5pc0FycmF5KHZhbCk7XG4gIGlmICgoIWlzQSAmJiAhaXNPYmplY3QodmFsKSkgfHwgT2JqZWN0LmlzRnJvemVuKHZhbCkgfHwgdmFsIGluc3RhbmNlb2YgVk5vZGUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodmFsLl9fb2JfXykge1xuICAgIHZhciBkZXBJZCA9IHZhbC5fX29iX18uZGVwLmlkO1xuICAgIGlmIChzZWVuLmhhcyhkZXBJZCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzZWVuLmFkZChkZXBJZCk7XG4gIH1cbiAgaWYgKGlzQSkge1xuICAgIGkgPSB2YWwubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHsgX3RyYXZlcnNlKHZhbFtpXSwgc2Vlbik7IH1cbiAgfSBlbHNlIHtcbiAgICBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgeyBfdHJhdmVyc2UodmFsW2tleXNbaV1dLCBzZWVuKTsgfVxuICB9XG59XG5cbnZhciBtYXJrO1xudmFyIG1lYXN1cmU7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwZXJmID0gaW5Ccm93c2VyICYmIHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChcbiAgICBwZXJmICYmXG4gICAgcGVyZi5tYXJrICYmXG4gICAgcGVyZi5tZWFzdXJlICYmXG4gICAgcGVyZi5jbGVhck1hcmtzICYmXG4gICAgcGVyZi5jbGVhck1lYXN1cmVzXG4gICkge1xuICAgIG1hcmsgPSBmdW5jdGlvbiAodGFnKSB7IHJldHVybiBwZXJmLm1hcmsodGFnKTsgfTtcbiAgICBtZWFzdXJlID0gZnVuY3Rpb24gKG5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpIHtcbiAgICAgIHBlcmYubWVhc3VyZShuYW1lLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICAgIHBlcmYuY2xlYXJNYXJrcyhzdGFydFRhZyk7XG4gICAgICBwZXJmLmNsZWFyTWFya3MoZW5kVGFnKTtcbiAgICAgIHBlcmYuY2xlYXJNZWFzdXJlcyhuYW1lKTtcbiAgICB9O1xuICB9XG59XG5cbi8qICAqL1xuXG52YXIgbm9ybWFsaXplRXZlbnQgPSBjYWNoZWQoZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIHBhc3NpdmUgPSBuYW1lLmNoYXJBdCgwKSA9PT0gJyYnO1xuICBuYW1lID0gcGFzc2l2ZSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICB2YXIgb25jZSQkMSA9IG5hbWUuY2hhckF0KDApID09PSAnfic7IC8vIFByZWZpeGVkIGxhc3QsIGNoZWNrZWQgZmlyc3RcbiAgbmFtZSA9IG9uY2UkJDEgPyBuYW1lLnNsaWNlKDEpIDogbmFtZTtcbiAgdmFyIGNhcHR1cmUgPSBuYW1lLmNoYXJBdCgwKSA9PT0gJyEnO1xuICBuYW1lID0gY2FwdHVyZSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgb25jZTogb25jZSQkMSxcbiAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgIHBhc3NpdmU6IHBhc3NpdmVcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZuSW52b2tlciAoZm5zKSB7XG4gIGZ1bmN0aW9uIGludm9rZXIgKCkge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuICAgIHZhciBmbnMgPSBpbnZva2VyLmZucztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmbnMpKSB7XG4gICAgICB2YXIgY2xvbmVkID0gZm5zLnNsaWNlKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsb25lZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjbG9uZWRbaV0uYXBwbHkobnVsbCwgYXJndW1lbnRzJDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZXR1cm4gaGFuZGxlciByZXR1cm4gdmFsdWUgZm9yIHNpbmdsZSBoYW5kbGVyc1xuICAgICAgcmV0dXJuIGZucy5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgfVxuICB9XG4gIGludm9rZXIuZm5zID0gZm5zO1xuICByZXR1cm4gaW52b2tlclxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0ZW5lcnMgKFxuICBvbixcbiAgb2xkT24sXG4gIGFkZCxcbiAgcmVtb3ZlJCQxLFxuICB2bVxuKSB7XG4gIHZhciBuYW1lLCBkZWYsIGN1ciwgb2xkLCBldmVudDtcbiAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgZGVmID0gY3VyID0gb25bbmFtZV07XG4gICAgb2xkID0gb2xkT25bbmFtZV07XG4gICAgZXZlbnQgPSBub3JtYWxpemVFdmVudChuYW1lKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaXNVbmRlZihjdXIpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIFwiSW52YWxpZCBoYW5kbGVyIGZvciBldmVudCBcXFwiXCIgKyAoZXZlbnQubmFtZSkgKyBcIlxcXCI6IGdvdCBcIiArIFN0cmluZyhjdXIpLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzVW5kZWYob2xkKSkge1xuICAgICAgaWYgKGlzVW5kZWYoY3VyLmZucykpIHtcbiAgICAgICAgY3VyID0gb25bbmFtZV0gPSBjcmVhdGVGbkludm9rZXIoY3VyKTtcbiAgICAgIH1cbiAgICAgIGFkZChldmVudC5uYW1lLCBjdXIsIGV2ZW50Lm9uY2UsIGV2ZW50LmNhcHR1cmUsIGV2ZW50LnBhc3NpdmUsIGV2ZW50LnBhcmFtcyk7XG4gICAgfSBlbHNlIGlmIChjdXIgIT09IG9sZCkge1xuICAgICAgb2xkLmZucyA9IGN1cjtcbiAgICAgIG9uW25hbWVdID0gb2xkO1xuICAgIH1cbiAgfVxuICBmb3IgKG5hbWUgaW4gb2xkT24pIHtcbiAgICBpZiAoaXNVbmRlZihvbltuYW1lXSkpIHtcbiAgICAgIGV2ZW50ID0gbm9ybWFsaXplRXZlbnQobmFtZSk7XG4gICAgICByZW1vdmUkJDEoZXZlbnQubmFtZSwgb2xkT25bbmFtZV0sIGV2ZW50LmNhcHR1cmUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gbWVyZ2VWTm9kZUhvb2sgKGRlZiwgaG9va0tleSwgaG9vaykge1xuICBpZiAoZGVmIGluc3RhbmNlb2YgVk5vZGUpIHtcbiAgICBkZWYgPSBkZWYuZGF0YS5ob29rIHx8IChkZWYuZGF0YS5ob29rID0ge30pO1xuICB9XG4gIHZhciBpbnZva2VyO1xuICB2YXIgb2xkSG9vayA9IGRlZltob29rS2V5XTtcblxuICBmdW5jdGlvbiB3cmFwcGVkSG9vayAoKSB7XG4gICAgaG9vay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIC8vIGltcG9ydGFudDogcmVtb3ZlIG1lcmdlZCBob29rIHRvIGVuc3VyZSBpdCdzIGNhbGxlZCBvbmx5IG9uY2VcbiAgICAvLyBhbmQgcHJldmVudCBtZW1vcnkgbGVha1xuICAgIHJlbW92ZShpbnZva2VyLmZucywgd3JhcHBlZEhvb2spO1xuICB9XG5cbiAgaWYgKGlzVW5kZWYob2xkSG9vaykpIHtcbiAgICAvLyBubyBleGlzdGluZyBob29rXG4gICAgaW52b2tlciA9IGNyZWF0ZUZuSW52b2tlcihbd3JhcHBlZEhvb2tdKTtcbiAgfSBlbHNlIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaXNEZWYob2xkSG9vay5mbnMpICYmIGlzVHJ1ZShvbGRIb29rLm1lcmdlZCkpIHtcbiAgICAgIC8vIGFscmVhZHkgYSBtZXJnZWQgaW52b2tlclxuICAgICAgaW52b2tlciA9IG9sZEhvb2s7XG4gICAgICBpbnZva2VyLmZucy5wdXNoKHdyYXBwZWRIb29rKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXhpc3RpbmcgcGxhaW4gaG9va1xuICAgICAgaW52b2tlciA9IGNyZWF0ZUZuSW52b2tlcihbb2xkSG9vaywgd3JhcHBlZEhvb2tdKTtcbiAgICB9XG4gIH1cblxuICBpbnZva2VyLm1lcmdlZCA9IHRydWU7XG4gIGRlZltob29rS2V5XSA9IGludm9rZXI7XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBleHRyYWN0UHJvcHNGcm9tVk5vZGVEYXRhIChcbiAgZGF0YSxcbiAgQ3RvcixcbiAgdGFnXG4pIHtcbiAgLy8gd2UgYXJlIG9ubHkgZXh0cmFjdGluZyByYXcgdmFsdWVzIGhlcmUuXG4gIC8vIHZhbGlkYXRpb24gYW5kIGRlZmF1bHQgdmFsdWVzIGFyZSBoYW5kbGVkIGluIHRoZSBjaGlsZFxuICAvLyBjb21wb25lbnQgaXRzZWxmLlxuICB2YXIgcHJvcE9wdGlvbnMgPSBDdG9yLm9wdGlvbnMucHJvcHM7XG4gIGlmIChpc1VuZGVmKHByb3BPcHRpb25zKSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGF0dHJzID0gZGF0YS5hdHRycztcbiAgdmFyIHByb3BzID0gZGF0YS5wcm9wcztcbiAgaWYgKGlzRGVmKGF0dHJzKSB8fCBpc0RlZihwcm9wcykpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcE9wdGlvbnMpIHtcbiAgICAgIHZhciBhbHRLZXkgPSBoeXBoZW5hdGUoa2V5KTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhciBrZXlJbkxvd2VyQ2FzZSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAga2V5ICE9PSBrZXlJbkxvd2VyQ2FzZSAmJlxuICAgICAgICAgIGF0dHJzICYmIGhhc093bihhdHRycywga2V5SW5Mb3dlckNhc2UpXG4gICAgICAgICkge1xuICAgICAgICAgIHRpcChcbiAgICAgICAgICAgIFwiUHJvcCBcXFwiXCIgKyBrZXlJbkxvd2VyQ2FzZSArIFwiXFxcIiBpcyBwYXNzZWQgdG8gY29tcG9uZW50IFwiICtcbiAgICAgICAgICAgIChmb3JtYXRDb21wb25lbnROYW1lKHRhZyB8fCBDdG9yKSkgKyBcIiwgYnV0IHRoZSBkZWNsYXJlZCBwcm9wIG5hbWUgaXNcIiArXG4gICAgICAgICAgICBcIiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIuIFwiICtcbiAgICAgICAgICAgIFwiTm90ZSB0aGF0IEhUTUwgYXR0cmlidXRlcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZSBhbmQgY2FtZWxDYXNlZCBcIiArXG4gICAgICAgICAgICBcInByb3BzIG5lZWQgdG8gdXNlIHRoZWlyIGtlYmFiLWNhc2UgZXF1aXZhbGVudHMgd2hlbiB1c2luZyBpbi1ET00gXCIgK1xuICAgICAgICAgICAgXCJ0ZW1wbGF0ZXMuIFlvdSBzaG91bGQgcHJvYmFibHkgdXNlIFxcXCJcIiArIGFsdEtleSArIFwiXFxcIiBpbnN0ZWFkIG9mIFxcXCJcIiArIGtleSArIFwiXFxcIi5cIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNoZWNrUHJvcChyZXMsIHByb3BzLCBrZXksIGFsdEtleSwgdHJ1ZSkgfHxcbiAgICAgIGNoZWNrUHJvcChyZXMsIGF0dHJzLCBrZXksIGFsdEtleSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJvcCAoXG4gIHJlcyxcbiAgaGFzaCxcbiAga2V5LFxuICBhbHRLZXksXG4gIHByZXNlcnZlXG4pIHtcbiAgaWYgKGlzRGVmKGhhc2gpKSB7XG4gICAgaWYgKGhhc093bihoYXNoLCBrZXkpKSB7XG4gICAgICByZXNba2V5XSA9IGhhc2hba2V5XTtcbiAgICAgIGlmICghcHJlc2VydmUpIHtcbiAgICAgICAgZGVsZXRlIGhhc2hba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIGlmIChoYXNPd24oaGFzaCwgYWx0S2V5KSkge1xuICAgICAgcmVzW2tleV0gPSBoYXNoW2FsdEtleV07XG4gICAgICBpZiAoIXByZXNlcnZlKSB7XG4gICAgICAgIGRlbGV0ZSBoYXNoW2FsdEtleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyogICovXG5cbi8vIFRoZSB0ZW1wbGF0ZSBjb21waWxlciBhdHRlbXB0cyB0byBtaW5pbWl6ZSB0aGUgbmVlZCBmb3Igbm9ybWFsaXphdGlvbiBieVxuLy8gc3RhdGljYWxseSBhbmFseXppbmcgdGhlIHRlbXBsYXRlIGF0IGNvbXBpbGUgdGltZS5cbi8vXG4vLyBGb3IgcGxhaW4gSFRNTCBtYXJrdXAsIG5vcm1hbGl6YXRpb24gY2FuIGJlIGNvbXBsZXRlbHkgc2tpcHBlZCBiZWNhdXNlIHRoZVxuLy8gZ2VuZXJhdGVkIHJlbmRlciBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIHJldHVybiBBcnJheTxWTm9kZT4uIFRoZXJlIGFyZVxuLy8gdHdvIGNhc2VzIHdoZXJlIGV4dHJhIG5vcm1hbGl6YXRpb24gaXMgbmVlZGVkOlxuXG4vLyAxLiBXaGVuIHRoZSBjaGlsZHJlbiBjb250YWlucyBjb21wb25lbnRzIC0gYmVjYXVzZSBhIGZ1bmN0aW9uYWwgY29tcG9uZW50XG4vLyBtYXkgcmV0dXJuIGFuIEFycmF5IGluc3RlYWQgb2YgYSBzaW5nbGUgcm9vdC4gSW4gdGhpcyBjYXNlLCBqdXN0IGEgc2ltcGxlXG4vLyBub3JtYWxpemF0aW9uIGlzIG5lZWRlZCAtIGlmIGFueSBjaGlsZCBpcyBhbiBBcnJheSwgd2UgZmxhdHRlbiB0aGUgd2hvbGVcbi8vIHRoaW5nIHdpdGggQXJyYXkucHJvdG90eXBlLmNvbmNhdC4gSXQgaXMgZ3VhcmFudGVlZCB0byBiZSBvbmx5IDEtbGV2ZWwgZGVlcFxuLy8gYmVjYXVzZSBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYWxyZWFkeSBub3JtYWxpemUgdGhlaXIgb3duIGNoaWxkcmVuLlxuZnVuY3Rpb24gc2ltcGxlTm9ybWFsaXplQ2hpbGRyZW4gKGNoaWxkcmVuKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbltpXSkpIHtcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBjaGlsZHJlbilcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNoaWxkcmVuXG59XG5cbi8vIDIuIFdoZW4gdGhlIGNoaWxkcmVuIGNvbnRhaW5zIGNvbnN0cnVjdHMgdGhhdCBhbHdheXMgZ2VuZXJhdGVkIG5lc3RlZCBBcnJheXMsXG4vLyBlLmcuIDx0ZW1wbGF0ZT4sIDxzbG90Piwgdi1mb3IsIG9yIHdoZW4gdGhlIGNoaWxkcmVuIGlzIHByb3ZpZGVkIGJ5IHVzZXJcbi8vIHdpdGggaGFuZC13cml0dGVuIHJlbmRlciBmdW5jdGlvbnMgLyBKU1guIEluIHN1Y2ggY2FzZXMgYSBmdWxsIG5vcm1hbGl6YXRpb25cbi8vIGlzIG5lZWRlZCB0byBjYXRlciB0byBhbGwgcG9zc2libGUgdHlwZXMgb2YgY2hpbGRyZW4gdmFsdWVzLlxuZnVuY3Rpb24gbm9ybWFsaXplQ2hpbGRyZW4gKGNoaWxkcmVuKSB7XG4gIHJldHVybiBpc1ByaW1pdGl2ZShjaGlsZHJlbilcbiAgICA/IFtjcmVhdGVUZXh0Vk5vZGUoY2hpbGRyZW4pXVxuICAgIDogQXJyYXkuaXNBcnJheShjaGlsZHJlbilcbiAgICAgID8gbm9ybWFsaXplQXJyYXlDaGlsZHJlbihjaGlsZHJlbilcbiAgICAgIDogdW5kZWZpbmVkXG59XG5cbmZ1bmN0aW9uIGlzVGV4dE5vZGUgKG5vZGUpIHtcbiAgcmV0dXJuIGlzRGVmKG5vZGUpICYmIGlzRGVmKG5vZGUudGV4dCkgJiYgaXNGYWxzZShub2RlLmlzQ29tbWVudClcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXlDaGlsZHJlbiAoY2hpbGRyZW4sIG5lc3RlZEluZGV4KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgdmFyIGksIGMsIGxhc3RJbmRleCwgbGFzdDtcbiAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IGNoaWxkcmVuW2ldO1xuICAgIGlmIChpc1VuZGVmKGMpIHx8IHR5cGVvZiBjID09PSAnYm9vbGVhbicpIHsgY29udGludWUgfVxuICAgIGxhc3RJbmRleCA9IHJlcy5sZW5ndGggLSAxO1xuICAgIGxhc3QgPSByZXNbbGFzdEluZGV4XTtcbiAgICAvLyAgbmVzdGVkXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYykpIHtcbiAgICAgIGlmIChjLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYyA9IG5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4oYywgKChuZXN0ZWRJbmRleCB8fCAnJykgKyBcIl9cIiArIGkpKTtcbiAgICAgICAgLy8gbWVyZ2UgYWRqYWNlbnQgdGV4dCBub2Rlc1xuICAgICAgICBpZiAoaXNUZXh0Tm9kZShjWzBdKSAmJiBpc1RleHROb2RlKGxhc3QpKSB7XG4gICAgICAgICAgcmVzW2xhc3RJbmRleF0gPSBjcmVhdGVUZXh0Vk5vZGUobGFzdC50ZXh0ICsgKGNbMF0pLnRleHQpO1xuICAgICAgICAgIGMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXMucHVzaC5hcHBseShyZXMsIGMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNQcmltaXRpdmUoYykpIHtcbiAgICAgIGlmIChpc1RleHROb2RlKGxhc3QpKSB7XG4gICAgICAgIC8vIG1lcmdlIGFkamFjZW50IHRleHQgbm9kZXNcbiAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3NhcnkgZm9yIFNTUiBoeWRyYXRpb24gYmVjYXVzZSB0ZXh0IG5vZGVzIGFyZVxuICAgICAgICAvLyBlc3NlbnRpYWxseSBtZXJnZWQgd2hlbiByZW5kZXJlZCB0byBIVE1MIHN0cmluZ3NcbiAgICAgICAgcmVzW2xhc3RJbmRleF0gPSBjcmVhdGVUZXh0Vk5vZGUobGFzdC50ZXh0ICsgYyk7XG4gICAgICB9IGVsc2UgaWYgKGMgIT09ICcnKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgcHJpbWl0aXZlIHRvIHZub2RlXG4gICAgICAgIHJlcy5wdXNoKGNyZWF0ZVRleHRWTm9kZShjKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1RleHROb2RlKGMpICYmIGlzVGV4dE5vZGUobGFzdCkpIHtcbiAgICAgICAgLy8gbWVyZ2UgYWRqYWNlbnQgdGV4dCBub2Rlc1xuICAgICAgICByZXNbbGFzdEluZGV4XSA9IGNyZWF0ZVRleHRWTm9kZShsYXN0LnRleHQgKyBjLnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVmYXVsdCBrZXkgZm9yIG5lc3RlZCBhcnJheSBjaGlsZHJlbiAobGlrZWx5IGdlbmVyYXRlZCBieSB2LWZvcilcbiAgICAgICAgaWYgKGlzVHJ1ZShjaGlsZHJlbi5faXNWTGlzdCkgJiZcbiAgICAgICAgICBpc0RlZihjLnRhZykgJiZcbiAgICAgICAgICBpc1VuZGVmKGMua2V5KSAmJlxuICAgICAgICAgIGlzRGVmKG5lc3RlZEluZGV4KSkge1xuICAgICAgICAgIGMua2V5ID0gXCJfX3ZsaXN0XCIgKyBuZXN0ZWRJbmRleCArIFwiX1wiICsgaSArIFwiX19cIjtcbiAgICAgICAgfVxuICAgICAgICByZXMucHVzaChjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gZW5zdXJlQ3RvciAoY29tcCwgYmFzZSkge1xuICBpZiAoXG4gICAgY29tcC5fX2VzTW9kdWxlIHx8XG4gICAgKGhhc1N5bWJvbCAmJiBjb21wW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdNb2R1bGUnKVxuICApIHtcbiAgICBjb21wID0gY29tcC5kZWZhdWx0O1xuICB9XG4gIHJldHVybiBpc09iamVjdChjb21wKVxuICAgID8gYmFzZS5leHRlbmQoY29tcClcbiAgICA6IGNvbXBcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXN5bmNQbGFjZWhvbGRlciAoXG4gIGZhY3RvcnksXG4gIGRhdGEsXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuLFxuICB0YWdcbikge1xuICB2YXIgbm9kZSA9IGNyZWF0ZUVtcHR5Vk5vZGUoKTtcbiAgbm9kZS5hc3luY0ZhY3RvcnkgPSBmYWN0b3J5O1xuICBub2RlLmFzeW5jTWV0YSA9IHsgZGF0YTogZGF0YSwgY29udGV4dDogY29udGV4dCwgY2hpbGRyZW46IGNoaWxkcmVuLCB0YWc6IHRhZyB9O1xuICByZXR1cm4gbm9kZVxufVxuXG5mdW5jdGlvbiByZXNvbHZlQXN5bmNDb21wb25lbnQgKFxuICBmYWN0b3J5LFxuICBiYXNlQ3RvcixcbiAgY29udGV4dFxuKSB7XG4gIGlmIChpc1RydWUoZmFjdG9yeS5lcnJvcikgJiYgaXNEZWYoZmFjdG9yeS5lcnJvckNvbXApKSB7XG4gICAgcmV0dXJuIGZhY3RvcnkuZXJyb3JDb21wXG4gIH1cblxuICBpZiAoaXNEZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICByZXR1cm4gZmFjdG9yeS5yZXNvbHZlZFxuICB9XG5cbiAgaWYgKGlzVHJ1ZShmYWN0b3J5LmxvYWRpbmcpICYmIGlzRGVmKGZhY3RvcnkubG9hZGluZ0NvbXApKSB7XG4gICAgcmV0dXJuIGZhY3RvcnkubG9hZGluZ0NvbXBcbiAgfVxuXG4gIGlmIChpc0RlZihmYWN0b3J5LmNvbnRleHRzKSkge1xuICAgIC8vIGFscmVhZHkgcGVuZGluZ1xuICAgIGZhY3RvcnkuY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udGV4dHMgPSBmYWN0b3J5LmNvbnRleHRzID0gW2NvbnRleHRdO1xuICAgIHZhciBzeW5jID0gdHJ1ZTtcblxuICAgIHZhciBmb3JjZVJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY29udGV4dHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnRleHRzW2ldLiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVzb2x2ZSA9IG9uY2UoZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8gY2FjaGUgcmVzb2x2ZWRcbiAgICAgIGZhY3RvcnkucmVzb2x2ZWQgPSBlbnN1cmVDdG9yKHJlcywgYmFzZUN0b3IpO1xuICAgICAgLy8gaW52b2tlIGNhbGxiYWNrcyBvbmx5IGlmIHRoaXMgaXMgbm90IGEgc3luY2hyb25vdXMgcmVzb2x2ZVxuICAgICAgLy8gKGFzeW5jIHJlc29sdmVzIGFyZSBzaGltbWVkIGFzIHN5bmNocm9ub3VzIGR1cmluZyBTU1IpXG4gICAgICBpZiAoIXN5bmMpIHtcbiAgICAgICAgZm9yY2VSZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciByZWplY3QgPSBvbmNlKGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJGYWlsZWQgdG8gcmVzb2x2ZSBhc3luYyBjb21wb25lbnQ6IFwiICsgKFN0cmluZyhmYWN0b3J5KSkgK1xuICAgICAgICAocmVhc29uID8gKFwiXFxuUmVhc29uOiBcIiArIHJlYXNvbikgOiAnJylcbiAgICAgICk7XG4gICAgICBpZiAoaXNEZWYoZmFjdG9yeS5lcnJvckNvbXApKSB7XG4gICAgICAgIGZhY3RvcnkuZXJyb3IgPSB0cnVlO1xuICAgICAgICBmb3JjZVJlbmRlcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHJlcyA9IGZhY3RvcnkocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgIGlmIChpc09iamVjdChyZXMpKSB7XG4gICAgICBpZiAodHlwZW9mIHJlcy50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vICgpID0+IFByb21pc2VcbiAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICAgICAgICByZXMudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzRGVmKHJlcy5jb21wb25lbnQpICYmIHR5cGVvZiByZXMuY29tcG9uZW50LnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzLmNvbXBvbmVudC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgaWYgKGlzRGVmKHJlcy5lcnJvcikpIHtcbiAgICAgICAgICBmYWN0b3J5LmVycm9yQ29tcCA9IGVuc3VyZUN0b3IocmVzLmVycm9yLCBiYXNlQ3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWYocmVzLmxvYWRpbmcpKSB7XG4gICAgICAgICAgZmFjdG9yeS5sb2FkaW5nQ29tcCA9IGVuc3VyZUN0b3IocmVzLmxvYWRpbmcsIGJhc2VDdG9yKTtcbiAgICAgICAgICBpZiAocmVzLmRlbGF5ID09PSAwKSB7XG4gICAgICAgICAgICBmYWN0b3J5LmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkgJiYgaXNVbmRlZihmYWN0b3J5LmVycm9yKSkge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yY2VSZW5kZXIoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmVzLmRlbGF5IHx8IDIwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGVmKHJlcy50aW1lb3V0KSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbiAgICAgICAgICAgICAgICAgID8gKFwidGltZW91dCAoXCIgKyAocmVzLnRpbWVvdXQpICsgXCJtcylcIilcbiAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHJlcy50aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHN5bmMgPSBmYWxzZTtcbiAgICAvLyByZXR1cm4gaW4gY2FzZSByZXNvbHZlZCBzeW5jaHJvbm91c2x5XG4gICAgcmV0dXJuIGZhY3RvcnkubG9hZGluZ1xuICAgICAgPyBmYWN0b3J5LmxvYWRpbmdDb21wXG4gICAgICA6IGZhY3RvcnkucmVzb2x2ZWRcbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaXNBc3luY1BsYWNlaG9sZGVyIChub2RlKSB7XG4gIHJldHVybiBub2RlLmlzQ29tbWVudCAmJiBub2RlLmFzeW5jRmFjdG9yeVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gZ2V0Rmlyc3RDb21wb25lbnRDaGlsZCAoY2hpbGRyZW4pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjaGlsZHJlbltpXTtcbiAgICAgIGlmIChpc0RlZihjKSAmJiAoaXNEZWYoYy5jb21wb25lbnRPcHRpb25zKSB8fCBpc0FzeW5jUGxhY2Vob2xkZXIoYykpKSB7XG4gICAgICAgIHJldHVybiBjXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qICAqL1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEV2ZW50cyAodm0pIHtcbiAgdm0uX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZtLl9oYXNIb29rRXZlbnQgPSBmYWxzZTtcbiAgLy8gaW5pdCBwYXJlbnQgYXR0YWNoZWQgZXZlbnRzXG4gIHZhciBsaXN0ZW5lcnMgPSB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICBpZiAobGlzdGVuZXJzKSB7XG4gICAgdXBkYXRlQ29tcG9uZW50TGlzdGVuZXJzKHZtLCBsaXN0ZW5lcnMpO1xuICB9XG59XG5cbnZhciB0YXJnZXQ7XG5cbmZ1bmN0aW9uIGFkZCAoZXZlbnQsIGZuLCBvbmNlKSB7XG4gIGlmIChvbmNlKSB7XG4gICAgdGFyZ2V0LiRvbmNlKGV2ZW50LCBmbik7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0LiRvbihldmVudCwgZm4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSQxIChldmVudCwgZm4pIHtcbiAgdGFyZ2V0LiRvZmYoZXZlbnQsIGZuKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50TGlzdGVuZXJzIChcbiAgdm0sXG4gIGxpc3RlbmVycyxcbiAgb2xkTGlzdGVuZXJzXG4pIHtcbiAgdGFyZ2V0ID0gdm07XG4gIHVwZGF0ZUxpc3RlbmVycyhsaXN0ZW5lcnMsIG9sZExpc3RlbmVycyB8fCB7fSwgYWRkLCByZW1vdmUkMSwgdm0pO1xuICB0YXJnZXQgPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGV2ZW50c01peGluIChWdWUpIHtcbiAgdmFyIGhvb2tSRSA9IC9eaG9vazovO1xuICBWdWUucHJvdG90eXBlLiRvbiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGV2ZW50Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzJDEuJG9uKGV2ZW50W2ldLCBmbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICh2bS5fZXZlbnRzW2V2ZW50XSB8fCAodm0uX2V2ZW50c1tldmVudF0gPSBbXSkpLnB1c2goZm4pO1xuICAgICAgLy8gb3B0aW1pemUgaG9vazpldmVudCBjb3N0IGJ5IHVzaW5nIGEgYm9vbGVhbiBmbGFnIG1hcmtlZCBhdCByZWdpc3RyYXRpb25cbiAgICAgIC8vIGluc3RlYWQgb2YgYSBoYXNoIGxvb2t1cFxuICAgICAgaWYgKGhvb2tSRS50ZXN0KGV2ZW50KSkge1xuICAgICAgICB2bS5faGFzSG9va0V2ZW50ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZtXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kb25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGZ1bmN0aW9uIG9uICgpIHtcbiAgICAgIHZtLiRvZmYoZXZlbnQsIG9uKTtcbiAgICAgIGZuLmFwcGx5KHZtLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBvbi5mbiA9IGZuO1xuICAgIHZtLiRvbihldmVudCwgb24pO1xuICAgIHJldHVybiB2bVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJG9mZiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgLy8gYWxsXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2bS5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIHJldHVybiB2bVxuICAgIH1cbiAgICAvLyBhcnJheSBvZiBldmVudHNcbiAgICBpZiAoQXJyYXkuaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMkMS4kb2ZmKGV2ZW50W2ldLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgICB2YXIgY2JzID0gdm0uX2V2ZW50c1tldmVudF07XG4gICAgaWYgKCFjYnMpIHtcbiAgICAgIHJldHVybiB2bVxuICAgIH1cbiAgICBpZiAoIWZuKSB7XG4gICAgICB2bS5fZXZlbnRzW2V2ZW50XSA9IG51bGw7XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgaWYgKGZuKSB7XG4gICAgICAvLyBzcGVjaWZpYyBoYW5kbGVyXG4gICAgICB2YXIgY2I7XG4gICAgICB2YXIgaSQxID0gY2JzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpJDEtLSkge1xuICAgICAgICBjYiA9IGNic1tpJDFdO1xuICAgICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgICAgIGNicy5zcGxpY2UoaSQxLCAxKTtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2bVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbG93ZXJDYXNlRXZlbnQgPSBldmVudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGxvd2VyQ2FzZUV2ZW50ICE9PSBldmVudCAmJiB2bS5fZXZlbnRzW2xvd2VyQ2FzZUV2ZW50XSkge1xuICAgICAgICB0aXAoXG4gICAgICAgICAgXCJFdmVudCBcXFwiXCIgKyBsb3dlckNhc2VFdmVudCArIFwiXFxcIiBpcyBlbWl0dGVkIGluIGNvbXBvbmVudCBcIiArXG4gICAgICAgICAgKGZvcm1hdENvbXBvbmVudE5hbWUodm0pKSArIFwiIGJ1dCB0aGUgaGFuZGxlciBpcyByZWdpc3RlcmVkIGZvciBcXFwiXCIgKyBldmVudCArIFwiXFxcIi4gXCIgK1xuICAgICAgICAgIFwiTm90ZSB0aGF0IEhUTUwgYXR0cmlidXRlcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZSBhbmQgeW91IGNhbm5vdCB1c2UgXCIgK1xuICAgICAgICAgIFwidi1vbiB0byBsaXN0ZW4gdG8gY2FtZWxDYXNlIGV2ZW50cyB3aGVuIHVzaW5nIGluLURPTSB0ZW1wbGF0ZXMuIFwiICtcbiAgICAgICAgICBcIllvdSBzaG91bGQgcHJvYmFibHkgdXNlIFxcXCJcIiArIChoeXBoZW5hdGUoZXZlbnQpKSArIFwiXFxcIiBpbnN0ZWFkIG9mIFxcXCJcIiArIGV2ZW50ICsgXCJcXFwiLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjYnMgPSB2bS5fZXZlbnRzW2V2ZW50XTtcbiAgICBpZiAoY2JzKSB7XG4gICAgICBjYnMgPSBjYnMubGVuZ3RoID4gMSA/IHRvQXJyYXkoY2JzKSA6IGNicztcbiAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY2JzW2ldLmFwcGx5KHZtLCBhcmdzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCAoXCJldmVudCBoYW5kbGVyIGZvciBcXFwiXCIgKyBldmVudCArIFwiXFxcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZtXG4gIH07XG59XG5cbi8qICAqL1xuXG5cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIHJhdyBjaGlsZHJlbiBWTm9kZXMgaW50byBhIHNsb3Qgb2JqZWN0LlxuICovXG5mdW5jdGlvbiByZXNvbHZlU2xvdHMgKFxuICBjaGlsZHJlbixcbiAgY29udGV4dFxuKSB7XG4gIHZhciBzbG90cyA9IHt9O1xuICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHNsb3RzXG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICB2YXIgZGF0YSA9IGNoaWxkLmRhdGE7XG4gICAgLy8gcmVtb3ZlIHNsb3QgYXR0cmlidXRlIGlmIHRoZSBub2RlIGlzIHJlc29sdmVkIGFzIGEgVnVlIHNsb3Qgbm9kZVxuICAgIGlmIChkYXRhICYmIGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy5zbG90KSB7XG4gICAgICBkZWxldGUgZGF0YS5hdHRycy5zbG90O1xuICAgIH1cbiAgICAvLyBuYW1lZCBzbG90cyBzaG91bGQgb25seSBiZSByZXNwZWN0ZWQgaWYgdGhlIHZub2RlIHdhcyByZW5kZXJlZCBpbiB0aGVcbiAgICAvLyBzYW1lIGNvbnRleHQuXG4gICAgaWYgKChjaGlsZC5jb250ZXh0ID09PSBjb250ZXh0IHx8IGNoaWxkLmZuQ29udGV4dCA9PT0gY29udGV4dCkgJiZcbiAgICAgIGRhdGEgJiYgZGF0YS5zbG90ICE9IG51bGxcbiAgICApIHtcbiAgICAgIHZhciBuYW1lID0gZGF0YS5zbG90O1xuICAgICAgdmFyIHNsb3QgPSAoc2xvdHNbbmFtZV0gfHwgKHNsb3RzW25hbWVdID0gW10pKTtcbiAgICAgIGlmIChjaGlsZC50YWcgPT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgc2xvdC5wdXNoLmFwcGx5KHNsb3QsIGNoaWxkLmNoaWxkcmVuIHx8IFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsb3QucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIChzbG90cy5kZWZhdWx0IHx8IChzbG90cy5kZWZhdWx0ID0gW10pKS5wdXNoKGNoaWxkKTtcbiAgICB9XG4gIH1cbiAgLy8gaWdub3JlIHNsb3RzIHRoYXQgY29udGFpbnMgb25seSB3aGl0ZXNwYWNlXG4gIGZvciAodmFyIG5hbWUkMSBpbiBzbG90cykge1xuICAgIGlmIChzbG90c1tuYW1lJDFdLmV2ZXJ5KGlzV2hpdGVzcGFjZSkpIHtcbiAgICAgIGRlbGV0ZSBzbG90c1tuYW1lJDFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2xvdHNcbn1cblxuZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChub2RlKSB7XG4gIHJldHVybiAobm9kZS5pc0NvbW1lbnQgJiYgIW5vZGUuYXN5bmNGYWN0b3J5KSB8fCBub2RlLnRleHQgPT09ICcgJ1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU2NvcGVkU2xvdHMgKFxuICBmbnMsIC8vIHNlZSBmbG93L3Zub2RlXG4gIHJlc1xuKSB7XG4gIHJlcyA9IHJlcyB8fCB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmbnNbaV0pKSB7XG4gICAgICByZXNvbHZlU2NvcGVkU2xvdHMoZm5zW2ldLCByZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNbZm5zW2ldLmtleV0gPSBmbnNbaV0uZm47XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbnZhciBhY3RpdmVJbnN0YW5jZSA9IG51bGw7XG52YXIgaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50ID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGluaXRMaWZlY3ljbGUgKHZtKSB7XG4gIHZhciBvcHRpb25zID0gdm0uJG9wdGlvbnM7XG5cbiAgLy8gbG9jYXRlIGZpcnN0IG5vbi1hYnN0cmFjdCBwYXJlbnRcbiAgdmFyIHBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICBpZiAocGFyZW50ICYmICFvcHRpb25zLmFic3RyYWN0KSB7XG4gICAgd2hpbGUgKHBhcmVudC4kb3B0aW9ucy5hYnN0cmFjdCAmJiBwYXJlbnQuJHBhcmVudCkge1xuICAgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnQ7XG4gICAgfVxuICAgIHBhcmVudC4kY2hpbGRyZW4ucHVzaCh2bSk7XG4gIH1cblxuICB2bS4kcGFyZW50ID0gcGFyZW50O1xuICB2bS4kcm9vdCA9IHBhcmVudCA/IHBhcmVudC4kcm9vdCA6IHZtO1xuXG4gIHZtLiRjaGlsZHJlbiA9IFtdO1xuICB2bS4kcmVmcyA9IHt9O1xuXG4gIHZtLl93YXRjaGVyID0gbnVsbDtcbiAgdm0uX2luYWN0aXZlID0gbnVsbDtcbiAgdm0uX2RpcmVjdEluYWN0aXZlID0gZmFsc2U7XG4gIHZtLl9pc01vdW50ZWQgPSBmYWxzZTtcbiAgdm0uX2lzRGVzdHJveWVkID0gZmFsc2U7XG4gIHZtLl9pc0JlaW5nRGVzdHJveWVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGxpZmVjeWNsZU1peGluIChWdWUpIHtcbiAgVnVlLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gKHZub2RlLCBoeWRyYXRpbmcpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmICh2bS5faXNNb3VudGVkKSB7XG4gICAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZVVwZGF0ZScpO1xuICAgIH1cbiAgICB2YXIgcHJldkVsID0gdm0uJGVsO1xuICAgIHZhciBwcmV2Vm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgdmFyIHByZXZBY3RpdmVJbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlO1xuICAgIGFjdGl2ZUluc3RhbmNlID0gdm07XG4gICAgdm0uX3Zub2RlID0gdm5vZGU7XG4gICAgLy8gVnVlLnByb3RvdHlwZS5fX3BhdGNoX18gaXMgaW5qZWN0ZWQgaW4gZW50cnkgcG9pbnRzXG4gICAgLy8gYmFzZWQgb24gdGhlIHJlbmRlcmluZyBiYWNrZW5kIHVzZWQuXG4gICAgaWYgKCFwcmV2Vm5vZGUpIHtcbiAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICB2bS4kZWwgPSB2bS5fX3BhdGNoX18oXG4gICAgICAgIHZtLiRlbCwgdm5vZGUsIGh5ZHJhdGluZywgZmFsc2UgLyogcmVtb3ZlT25seSAqLyxcbiAgICAgICAgdm0uJG9wdGlvbnMuX3BhcmVudEVsbSxcbiAgICAgICAgdm0uJG9wdGlvbnMuX3JlZkVsbVxuICAgICAgKTtcbiAgICAgIC8vIG5vIG5lZWQgZm9yIHRoZSByZWYgbm9kZXMgYWZ0ZXIgaW5pdGlhbCBwYXRjaFxuICAgICAgLy8gdGhpcyBwcmV2ZW50cyBrZWVwaW5nIGEgZGV0YWNoZWQgRE9NIHRyZWUgaW4gbWVtb3J5ICgjNTg1MSlcbiAgICAgIHZtLiRvcHRpb25zLl9wYXJlbnRFbG0gPSB2bS4kb3B0aW9ucy5fcmVmRWxtID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdXBkYXRlc1xuICAgICAgdm0uJGVsID0gdm0uX19wYXRjaF9fKHByZXZWbm9kZSwgdm5vZGUpO1xuICAgIH1cbiAgICBhY3RpdmVJbnN0YW5jZSA9IHByZXZBY3RpdmVJbnN0YW5jZTtcbiAgICAvLyB1cGRhdGUgX192dWVfXyByZWZlcmVuY2VcbiAgICBpZiAocHJldkVsKSB7XG4gICAgICBwcmV2RWwuX192dWVfXyA9IG51bGw7XG4gICAgfVxuICAgIGlmICh2bS4kZWwpIHtcbiAgICAgIHZtLiRlbC5fX3Z1ZV9fID0gdm07XG4gICAgfVxuICAgIC8vIGlmIHBhcmVudCBpcyBhbiBIT0MsIHVwZGF0ZSBpdHMgJGVsIGFzIHdlbGxcbiAgICBpZiAodm0uJHZub2RlICYmIHZtLiRwYXJlbnQgJiYgdm0uJHZub2RlID09PSB2bS4kcGFyZW50Ll92bm9kZSkge1xuICAgICAgdm0uJHBhcmVudC4kZWwgPSB2bS4kZWw7XG4gICAgfVxuICAgIC8vIHVwZGF0ZWQgaG9vayBpcyBjYWxsZWQgYnkgdGhlIHNjaGVkdWxlciB0byBlbnN1cmUgdGhhdCBjaGlsZHJlbiBhcmVcbiAgICAvLyB1cGRhdGVkIGluIGEgcGFyZW50J3MgdXBkYXRlZCBob29rLlxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHZtLl93YXRjaGVyKSB7XG4gICAgICB2bS5fd2F0Y2hlci51cGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmICh2bS5faXNCZWluZ0Rlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlRGVzdHJveScpO1xuICAgIHZtLl9pc0JlaW5nRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHBhcmVudFxuICAgIHZhciBwYXJlbnQgPSB2bS4kcGFyZW50O1xuICAgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNCZWluZ0Rlc3Ryb3llZCAmJiAhdm0uJG9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICAgIHJlbW92ZShwYXJlbnQuJGNoaWxkcmVuLCB2bSk7XG4gICAgfVxuICAgIC8vIHRlYXJkb3duIHdhdGNoZXJzXG4gICAgaWYgKHZtLl93YXRjaGVyKSB7XG4gICAgICB2bS5fd2F0Y2hlci50ZWFyZG93bigpO1xuICAgIH1cbiAgICB2YXIgaSA9IHZtLl93YXRjaGVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdm0uX3dhdGNoZXJzW2ldLnRlYXJkb3duKCk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZWZlcmVuY2UgZnJvbSBkYXRhIG9iXG4gICAgLy8gZnJvemVuIG9iamVjdCBtYXkgbm90IGhhdmUgb2JzZXJ2ZXIuXG4gICAgaWYgKHZtLl9kYXRhLl9fb2JfXykge1xuICAgICAgdm0uX2RhdGEuX19vYl9fLnZtQ291bnQtLTtcbiAgICB9XG4gICAgLy8gY2FsbCB0aGUgbGFzdCBob29rLi4uXG4gICAgdm0uX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAvLyBpbnZva2UgZGVzdHJveSBob29rcyBvbiBjdXJyZW50IHJlbmRlcmVkIHRyZWVcbiAgICB2bS5fX3BhdGNoX18odm0uX3Zub2RlLCBudWxsKTtcbiAgICAvLyBmaXJlIGRlc3Ryb3llZCBob29rXG4gICAgY2FsbEhvb2sodm0sICdkZXN0cm95ZWQnKTtcbiAgICAvLyB0dXJuIG9mZiBhbGwgaW5zdGFuY2UgbGlzdGVuZXJzLlxuICAgIHZtLiRvZmYoKTtcbiAgICAvLyByZW1vdmUgX192dWVfXyByZWZlcmVuY2VcbiAgICBpZiAodm0uJGVsKSB7XG4gICAgICB2bS4kZWwuX192dWVfXyA9IG51bGw7XG4gICAgfVxuICAgIC8vIHJlbGVhc2UgY2lyY3VsYXIgcmVmZXJlbmNlICgjNjc1OSlcbiAgICBpZiAodm0uJHZub2RlKSB7XG4gICAgICB2bS4kdm5vZGUucGFyZW50ID0gbnVsbDtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIG1vdW50Q29tcG9uZW50IChcbiAgdm0sXG4gIGVsLFxuICBoeWRyYXRpbmdcbikge1xuICB2bS4kZWwgPSBlbDtcbiAgaWYgKCF2bS4kb3B0aW9ucy5yZW5kZXIpIHtcbiAgICB2bS4kb3B0aW9ucy5yZW5kZXIgPSBjcmVhdGVFbXB0eVZOb2RlO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICgodm0uJG9wdGlvbnMudGVtcGxhdGUgJiYgdm0uJG9wdGlvbnMudGVtcGxhdGUuY2hhckF0KDApICE9PSAnIycpIHx8XG4gICAgICAgIHZtLiRvcHRpb25zLmVsIHx8IGVsKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1lvdSBhcmUgdXNpbmcgdGhlIHJ1bnRpbWUtb25seSBidWlsZCBvZiBWdWUgd2hlcmUgdGhlIHRlbXBsYXRlICcgK1xuICAgICAgICAgICdjb21waWxlciBpcyBub3QgYXZhaWxhYmxlLiBFaXRoZXIgcHJlLWNvbXBpbGUgdGhlIHRlbXBsYXRlcyBpbnRvICcgK1xuICAgICAgICAgICdyZW5kZXIgZnVuY3Rpb25zLCBvciB1c2UgdGhlIGNvbXBpbGVyLWluY2x1ZGVkIGJ1aWxkLicsXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ0ZhaWxlZCB0byBtb3VudCBjb21wb25lbnQ6IHRlbXBsYXRlIG9yIHJlbmRlciBmdW5jdGlvbiBub3QgZGVmaW5lZC4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNhbGxIb29rKHZtLCAnYmVmb3JlTW91bnQnKTtcblxuICB2YXIgdXBkYXRlQ29tcG9uZW50O1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLnBlcmZvcm1hbmNlICYmIG1hcmspIHtcbiAgICB1cGRhdGVDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbmFtZSA9IHZtLl9uYW1lO1xuICAgICAgdmFyIGlkID0gdm0uX3VpZDtcbiAgICAgIHZhciBzdGFydFRhZyA9IFwidnVlLXBlcmYtc3RhcnQ6XCIgKyBpZDtcbiAgICAgIHZhciBlbmRUYWcgPSBcInZ1ZS1wZXJmLWVuZDpcIiArIGlkO1xuXG4gICAgICBtYXJrKHN0YXJ0VGFnKTtcbiAgICAgIHZhciB2bm9kZSA9IHZtLl9yZW5kZXIoKTtcbiAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgIG1lYXN1cmUoKFwidnVlIFwiICsgbmFtZSArIFwiIHJlbmRlclwiKSwgc3RhcnRUYWcsIGVuZFRhZyk7XG5cbiAgICAgIG1hcmsoc3RhcnRUYWcpO1xuICAgICAgdm0uX3VwZGF0ZSh2bm9kZSwgaHlkcmF0aW5nKTtcbiAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgIG1lYXN1cmUoKFwidnVlIFwiICsgbmFtZSArIFwiIHBhdGNoXCIpLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZtLl91cGRhdGUodm0uX3JlbmRlcigpLCBoeWRyYXRpbmcpO1xuICAgIH07XG4gIH1cblxuICAvLyB3ZSBzZXQgdGhpcyB0byB2bS5fd2F0Y2hlciBpbnNpZGUgdGhlIHdhdGNoZXIncyBjb25zdHJ1Y3RvclxuICAvLyBzaW5jZSB0aGUgd2F0Y2hlcidzIGluaXRpYWwgcGF0Y2ggbWF5IGNhbGwgJGZvcmNlVXBkYXRlIChlLmcuIGluc2lkZSBjaGlsZFxuICAvLyBjb21wb25lbnQncyBtb3VudGVkIGhvb2spLCB3aGljaCByZWxpZXMgb24gdm0uX3dhdGNoZXIgYmVpbmcgYWxyZWFkeSBkZWZpbmVkXG4gIG5ldyBXYXRjaGVyKHZtLCB1cGRhdGVDb21wb25lbnQsIG5vb3AsIG51bGwsIHRydWUgLyogaXNSZW5kZXJXYXRjaGVyICovKTtcbiAgaHlkcmF0aW5nID0gZmFsc2U7XG5cbiAgLy8gbWFudWFsbHkgbW91bnRlZCBpbnN0YW5jZSwgY2FsbCBtb3VudGVkIG9uIHNlbGZcbiAgLy8gbW91bnRlZCBpcyBjYWxsZWQgZm9yIHJlbmRlci1jcmVhdGVkIGNoaWxkIGNvbXBvbmVudHMgaW4gaXRzIGluc2VydGVkIGhvb2tcbiAgaWYgKHZtLiR2bm9kZSA9PSBudWxsKSB7XG4gICAgdm0uX2lzTW91bnRlZCA9IHRydWU7XG4gICAgY2FsbEhvb2sodm0sICdtb3VudGVkJyk7XG4gIH1cbiAgcmV0dXJuIHZtXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoaWxkQ29tcG9uZW50IChcbiAgdm0sXG4gIHByb3BzRGF0YSxcbiAgbGlzdGVuZXJzLFxuICBwYXJlbnRWbm9kZSxcbiAgcmVuZGVyQ2hpbGRyZW5cbikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCA9IHRydWU7XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgd2hldGhlciBjb21wb25lbnQgaGFzIHNsb3QgY2hpbGRyZW5cbiAgLy8gd2UgbmVlZCB0byBkbyB0aGlzIGJlZm9yZSBvdmVyd3JpdGluZyAkb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW5cbiAgdmFyIGhhc0NoaWxkcmVuID0gISEoXG4gICAgcmVuZGVyQ2hpbGRyZW4gfHwgICAgICAgICAgICAgICAvLyBoYXMgbmV3IHN0YXRpYyBzbG90c1xuICAgIHZtLiRvcHRpb25zLl9yZW5kZXJDaGlsZHJlbiB8fCAgLy8gaGFzIG9sZCBzdGF0aWMgc2xvdHNcbiAgICBwYXJlbnRWbm9kZS5kYXRhLnNjb3BlZFNsb3RzIHx8IC8vIGhhcyBuZXcgc2NvcGVkIHNsb3RzXG4gICAgdm0uJHNjb3BlZFNsb3RzICE9PSBlbXB0eU9iamVjdCAvLyBoYXMgb2xkIHNjb3BlZCBzbG90c1xuICApO1xuXG4gIHZtLiRvcHRpb25zLl9wYXJlbnRWbm9kZSA9IHBhcmVudFZub2RlO1xuICB2bS4kdm5vZGUgPSBwYXJlbnRWbm9kZTsgLy8gdXBkYXRlIHZtJ3MgcGxhY2Vob2xkZXIgbm9kZSB3aXRob3V0IHJlLXJlbmRlclxuXG4gIGlmICh2bS5fdm5vZGUpIHsgLy8gdXBkYXRlIGNoaWxkIHRyZWUncyBwYXJlbnRcbiAgICB2bS5fdm5vZGUucGFyZW50ID0gcGFyZW50Vm5vZGU7XG4gIH1cbiAgdm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuID0gcmVuZGVyQ2hpbGRyZW47XG5cbiAgLy8gdXBkYXRlICRhdHRycyBhbmQgJGxpc3RlbmVycyBoYXNoXG4gIC8vIHRoZXNlIGFyZSBhbHNvIHJlYWN0aXZlIHNvIHRoZXkgbWF5IHRyaWdnZXIgY2hpbGQgdXBkYXRlIGlmIHRoZSBjaGlsZFxuICAvLyB1c2VkIHRoZW0gZHVyaW5nIHJlbmRlclxuICB2bS4kYXR0cnMgPSBwYXJlbnRWbm9kZS5kYXRhLmF0dHJzIHx8IGVtcHR5T2JqZWN0O1xuICB2bS4kbGlzdGVuZXJzID0gbGlzdGVuZXJzIHx8IGVtcHR5T2JqZWN0O1xuXG4gIC8vIHVwZGF0ZSBwcm9wc1xuICBpZiAocHJvcHNEYXRhICYmIHZtLiRvcHRpb25zLnByb3BzKSB7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKGZhbHNlKTtcbiAgICB2YXIgcHJvcHMgPSB2bS5fcHJvcHM7XG4gICAgdmFyIHByb3BLZXlzID0gdm0uJG9wdGlvbnMuX3Byb3BLZXlzIHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wS2V5c1tpXTtcbiAgICAgIHZhciBwcm9wT3B0aW9ucyA9IHZtLiRvcHRpb25zLnByb3BzOyAvLyB3dGYgZmxvdz9cbiAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhLCB2bSk7XG4gICAgfVxuICAgIHRvZ2dsZU9ic2VydmluZyh0cnVlKTtcbiAgICAvLyBrZWVwIGEgY29weSBvZiByYXcgcHJvcHNEYXRhXG4gICAgdm0uJG9wdGlvbnMucHJvcHNEYXRhID0gcHJvcHNEYXRhO1xuICB9XG5cbiAgLy8gdXBkYXRlIGxpc3RlbmVyc1xuICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3Q7XG4gIHZhciBvbGRMaXN0ZW5lcnMgPSB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzID0gbGlzdGVuZXJzO1xuICB1cGRhdGVDb21wb25lbnRMaXN0ZW5lcnModm0sIGxpc3RlbmVycywgb2xkTGlzdGVuZXJzKTtcblxuICAvLyByZXNvbHZlIHNsb3RzICsgZm9yY2UgdXBkYXRlIGlmIGhhcyBjaGlsZHJlblxuICBpZiAoaGFzQ2hpbGRyZW4pIHtcbiAgICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHMocmVuZGVyQ2hpbGRyZW4sIHBhcmVudFZub2RlLmNvbnRleHQpO1xuICAgIHZtLiRmb3JjZVVwZGF0ZSgpO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0luSW5hY3RpdmVUcmVlICh2bSkge1xuICB3aGlsZSAodm0gJiYgKHZtID0gdm0uJHBhcmVudCkpIHtcbiAgICBpZiAodm0uX2luYWN0aXZlKSB7IHJldHVybiB0cnVlIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICBpZiAoZGlyZWN0KSB7XG4gICAgdm0uX2RpcmVjdEluYWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKGlzSW5JbmFjdGl2ZVRyZWUodm0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0gZWxzZSBpZiAodm0uX2RpcmVjdEluYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZtLl9pbmFjdGl2ZSB8fCB2bS5faW5hY3RpdmUgPT09IG51bGwpIHtcbiAgICB2bS5faW5hY3RpdmUgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZtLiRjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bS4kY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2FjdGl2YXRlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICBpZiAoZGlyZWN0KSB7XG4gICAgdm0uX2RpcmVjdEluYWN0aXZlID0gdHJ1ZTtcbiAgICBpZiAoaXNJbkluYWN0aXZlVHJlZSh2bSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuICBpZiAoIXZtLl9pbmFjdGl2ZSkge1xuICAgIHZtLl9pbmFjdGl2ZSA9IHRydWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bS4kY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bS4kY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2RlYWN0aXZhdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEhvb2sgKHZtLCBob29rKSB7XG4gIC8vICM3NTczIGRpc2FibGUgZGVwIGNvbGxlY3Rpb24gd2hlbiBpbnZva2luZyBsaWZlY3ljbGUgaG9va3NcbiAgcHVzaFRhcmdldCgpO1xuICB2YXIgaGFuZGxlcnMgPSB2bS4kb3B0aW9uc1tob29rXTtcbiAgaWYgKGhhbmRsZXJzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhhbmRsZXJzW2ldLmNhbGwodm0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBoYW5kbGVFcnJvcihlLCB2bSwgKGhvb2sgKyBcIiBob29rXCIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHZtLl9oYXNIb29rRXZlbnQpIHtcbiAgICB2bS4kZW1pdCgnaG9vazonICsgaG9vayk7XG4gIH1cbiAgcG9wVGFyZ2V0KCk7XG59XG5cbi8qICAqL1xuXG5cbnZhciBNQVhfVVBEQVRFX0NPVU5UID0gMTAwO1xuXG52YXIgcXVldWUgPSBbXTtcbnZhciBhY3RpdmF0ZWRDaGlsZHJlbiA9IFtdO1xudmFyIGhhcyA9IHt9O1xudmFyIGNpcmN1bGFyID0ge307XG52YXIgd2FpdGluZyA9IGZhbHNlO1xudmFyIGZsdXNoaW5nID0gZmFsc2U7XG52YXIgaW5kZXggPSAwO1xuXG4vKipcbiAqIFJlc2V0IHRoZSBzY2hlZHVsZXIncyBzdGF0ZS5cbiAqL1xuZnVuY3Rpb24gcmVzZXRTY2hlZHVsZXJTdGF0ZSAoKSB7XG4gIGluZGV4ID0gcXVldWUubGVuZ3RoID0gYWN0aXZhdGVkQ2hpbGRyZW4ubGVuZ3RoID0gMDtcbiAgaGFzID0ge307XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY2lyY3VsYXIgPSB7fTtcbiAgfVxuICB3YWl0aW5nID0gZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBGbHVzaCBib3RoIHF1ZXVlcyBhbmQgcnVuIHRoZSB3YXRjaGVycy5cbiAqL1xuZnVuY3Rpb24gZmx1c2hTY2hlZHVsZXJRdWV1ZSAoKSB7XG4gIGZsdXNoaW5nID0gdHJ1ZTtcbiAgdmFyIHdhdGNoZXIsIGlkO1xuXG4gIC8vIFNvcnQgcXVldWUgYmVmb3JlIGZsdXNoLlxuICAvLyBUaGlzIGVuc3VyZXMgdGhhdDpcbiAgLy8gMS4gQ29tcG9uZW50cyBhcmUgdXBkYXRlZCBmcm9tIHBhcmVudCB0byBjaGlsZC4gKGJlY2F1c2UgcGFyZW50IGlzIGFsd2F5c1xuICAvLyAgICBjcmVhdGVkIGJlZm9yZSB0aGUgY2hpbGQpXG4gIC8vIDIuIEEgY29tcG9uZW50J3MgdXNlciB3YXRjaGVycyBhcmUgcnVuIGJlZm9yZSBpdHMgcmVuZGVyIHdhdGNoZXIgKGJlY2F1c2VcbiAgLy8gICAgdXNlciB3YXRjaGVycyBhcmUgY3JlYXRlZCBiZWZvcmUgdGhlIHJlbmRlciB3YXRjaGVyKVxuICAvLyAzLiBJZiBhIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQgZHVyaW5nIGEgcGFyZW50IGNvbXBvbmVudCdzIHdhdGNoZXIgcnVuLFxuICAvLyAgICBpdHMgd2F0Y2hlcnMgY2FuIGJlIHNraXBwZWQuXG4gIHF1ZXVlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuaWQgLSBiLmlkOyB9KTtcblxuICAvLyBkbyBub3QgY2FjaGUgbGVuZ3RoIGJlY2F1c2UgbW9yZSB3YXRjaGVycyBtaWdodCBiZSBwdXNoZWRcbiAgLy8gYXMgd2UgcnVuIGV4aXN0aW5nIHdhdGNoZXJzXG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHF1ZXVlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHdhdGNoZXIgPSBxdWV1ZVtpbmRleF07XG4gICAgaWQgPSB3YXRjaGVyLmlkO1xuICAgIGhhc1tpZF0gPSBudWxsO1xuICAgIHdhdGNoZXIucnVuKCk7XG4gICAgLy8gaW4gZGV2IGJ1aWxkLCBjaGVjayBhbmQgc3RvcCBjaXJjdWxhciB1cGRhdGVzLlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGhhc1tpZF0gIT0gbnVsbCkge1xuICAgICAgY2lyY3VsYXJbaWRdID0gKGNpcmN1bGFyW2lkXSB8fCAwKSArIDE7XG4gICAgICBpZiAoY2lyY3VsYXJbaWRdID4gTUFYX1VQREFURV9DT1VOVCkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdZb3UgbWF5IGhhdmUgYW4gaW5maW5pdGUgdXBkYXRlIGxvb3AgJyArIChcbiAgICAgICAgICAgIHdhdGNoZXIudXNlclxuICAgICAgICAgICAgICA/IChcImluIHdhdGNoZXIgd2l0aCBleHByZXNzaW9uIFxcXCJcIiArICh3YXRjaGVyLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpXG4gICAgICAgICAgICAgIDogXCJpbiBhIGNvbXBvbmVudCByZW5kZXIgZnVuY3Rpb24uXCJcbiAgICAgICAgICApLFxuICAgICAgICAgIHdhdGNoZXIudm1cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBrZWVwIGNvcGllcyBvZiBwb3N0IHF1ZXVlcyBiZWZvcmUgcmVzZXR0aW5nIHN0YXRlXG4gIHZhciBhY3RpdmF0ZWRRdWV1ZSA9IGFjdGl2YXRlZENoaWxkcmVuLnNsaWNlKCk7XG4gIHZhciB1cGRhdGVkUXVldWUgPSBxdWV1ZS5zbGljZSgpO1xuXG4gIHJlc2V0U2NoZWR1bGVyU3RhdGUoKTtcblxuICAvLyBjYWxsIGNvbXBvbmVudCB1cGRhdGVkIGFuZCBhY3RpdmF0ZWQgaG9va3NcbiAgY2FsbEFjdGl2YXRlZEhvb2tzKGFjdGl2YXRlZFF1ZXVlKTtcbiAgY2FsbFVwZGF0ZWRIb29rcyh1cGRhdGVkUXVldWUpO1xuXG4gIC8vIGRldnRvb2wgaG9va1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGRldnRvb2xzICYmIGNvbmZpZy5kZXZ0b29scykge1xuICAgIGRldnRvb2xzLmVtaXQoJ2ZsdXNoJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbFVwZGF0ZWRIb29rcyAocXVldWUpIHtcbiAgdmFyIGkgPSBxdWV1ZS5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgd2F0Y2hlciA9IHF1ZXVlW2ldO1xuICAgIHZhciB2bSA9IHdhdGNoZXIudm07XG4gICAgaWYgKHZtLl93YXRjaGVyID09PSB3YXRjaGVyICYmIHZtLl9pc01vdW50ZWQpIHtcbiAgICAgIGNhbGxIb29rKHZtLCAndXBkYXRlZCcpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFF1ZXVlIGEga2VwdC1hbGl2ZSBjb21wb25lbnQgdGhhdCB3YXMgYWN0aXZhdGVkIGR1cmluZyBwYXRjaC5cbiAqIFRoZSBxdWV1ZSB3aWxsIGJlIHByb2Nlc3NlZCBhZnRlciB0aGUgZW50aXJlIHRyZWUgaGFzIGJlZW4gcGF0Y2hlZC5cbiAqL1xuZnVuY3Rpb24gcXVldWVBY3RpdmF0ZWRDb21wb25lbnQgKHZtKSB7XG4gIC8vIHNldHRpbmcgX2luYWN0aXZlIHRvIGZhbHNlIGhlcmUgc28gdGhhdCBhIHJlbmRlciBmdW5jdGlvbiBjYW5cbiAgLy8gcmVseSBvbiBjaGVja2luZyB3aGV0aGVyIGl0J3MgaW4gYW4gaW5hY3RpdmUgdHJlZSAoZS5nLiByb3V0ZXItdmlldylcbiAgdm0uX2luYWN0aXZlID0gZmFsc2U7XG4gIGFjdGl2YXRlZENoaWxkcmVuLnB1c2godm0pO1xufVxuXG5mdW5jdGlvbiBjYWxsQWN0aXZhdGVkSG9va3MgKHF1ZXVlKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICBxdWV1ZVtpXS5faW5hY3RpdmUgPSB0cnVlO1xuICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQocXVldWVbaV0sIHRydWUgLyogdHJ1ZSAqLyk7XG4gIH1cbn1cblxuLyoqXG4gKiBQdXNoIGEgd2F0Y2hlciBpbnRvIHRoZSB3YXRjaGVyIHF1ZXVlLlxuICogSm9icyB3aXRoIGR1cGxpY2F0ZSBJRHMgd2lsbCBiZSBza2lwcGVkIHVubGVzcyBpdCdzXG4gKiBwdXNoZWQgd2hlbiB0aGUgcXVldWUgaXMgYmVpbmcgZmx1c2hlZC5cbiAqL1xuZnVuY3Rpb24gcXVldWVXYXRjaGVyICh3YXRjaGVyKSB7XG4gIHZhciBpZCA9IHdhdGNoZXIuaWQ7XG4gIGlmIChoYXNbaWRdID09IG51bGwpIHtcbiAgICBoYXNbaWRdID0gdHJ1ZTtcbiAgICBpZiAoIWZsdXNoaW5nKSB7XG4gICAgICBxdWV1ZS5wdXNoKHdhdGNoZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBhbHJlYWR5IGZsdXNoaW5nLCBzcGxpY2UgdGhlIHdhdGNoZXIgYmFzZWQgb24gaXRzIGlkXG4gICAgICAvLyBpZiBhbHJlYWR5IHBhc3QgaXRzIGlkLCBpdCB3aWxsIGJlIHJ1biBuZXh0IGltbWVkaWF0ZWx5LlxuICAgICAgdmFyIGkgPSBxdWV1ZS5sZW5ndGggLSAxO1xuICAgICAgd2hpbGUgKGkgPiBpbmRleCAmJiBxdWV1ZVtpXS5pZCA+IHdhdGNoZXIuaWQpIHtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgICAgcXVldWUuc3BsaWNlKGkgKyAxLCAwLCB3YXRjaGVyKTtcbiAgICB9XG4gICAgLy8gcXVldWUgdGhlIGZsdXNoXG4gICAgaWYgKCF3YWl0aW5nKSB7XG4gICAgICB3YWl0aW5nID0gdHJ1ZTtcbiAgICAgIG5leHRUaWNrKGZsdXNoU2NoZWR1bGVyUXVldWUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIHVpZCQxID0gMDtcblxuLyoqXG4gKiBBIHdhdGNoZXIgcGFyc2VzIGFuIGV4cHJlc3Npb24sIGNvbGxlY3RzIGRlcGVuZGVuY2llcyxcbiAqIGFuZCBmaXJlcyBjYWxsYmFjayB3aGVuIHRoZSBleHByZXNzaW9uIHZhbHVlIGNoYW5nZXMuXG4gKiBUaGlzIGlzIHVzZWQgZm9yIGJvdGggdGhlICR3YXRjaCgpIGFwaSBhbmQgZGlyZWN0aXZlcy5cbiAqL1xudmFyIFdhdGNoZXIgPSBmdW5jdGlvbiBXYXRjaGVyIChcbiAgdm0sXG4gIGV4cE9yRm4sXG4gIGNiLFxuICBvcHRpb25zLFxuICBpc1JlbmRlcldhdGNoZXJcbikge1xuICB0aGlzLnZtID0gdm07XG4gIGlmIChpc1JlbmRlcldhdGNoZXIpIHtcbiAgICB2bS5fd2F0Y2hlciA9IHRoaXM7XG4gIH1cbiAgdm0uX3dhdGNoZXJzLnB1c2godGhpcyk7XG4gIC8vIG9wdGlvbnNcbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRlZXAgPSAhIW9wdGlvbnMuZGVlcDtcbiAgICB0aGlzLnVzZXIgPSAhIW9wdGlvbnMudXNlcjtcbiAgICB0aGlzLmxhenkgPSAhIW9wdGlvbnMubGF6eTtcbiAgICB0aGlzLnN5bmMgPSAhIW9wdGlvbnMuc3luYztcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRlZXAgPSB0aGlzLnVzZXIgPSB0aGlzLmxhenkgPSB0aGlzLnN5bmMgPSBmYWxzZTtcbiAgfVxuICB0aGlzLmNiID0gY2I7XG4gIHRoaXMuaWQgPSArK3VpZCQxOyAvLyB1aWQgZm9yIGJhdGNoaW5nXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgdGhpcy5kaXJ0eSA9IHRoaXMubGF6eTsgLy8gZm9yIGxhenkgd2F0Y2hlcnNcbiAgdGhpcy5kZXBzID0gW107XG4gIHRoaXMubmV3RGVwcyA9IFtdO1xuICB0aGlzLmRlcElkcyA9IG5ldyBfU2V0KCk7XG4gIHRoaXMubmV3RGVwSWRzID0gbmV3IF9TZXQoKTtcbiAgdGhpcy5leHByZXNzaW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuICAgID8gZXhwT3JGbi50b1N0cmluZygpXG4gICAgOiAnJztcbiAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyXG4gIGlmICh0eXBlb2YgZXhwT3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuZ2V0dGVyID0gZXhwT3JGbjtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmdldHRlciA9IHBhcnNlUGF0aChleHBPckZuKTtcbiAgICBpZiAoIXRoaXMuZ2V0dGVyKSB7XG4gICAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIkZhaWxlZCB3YXRjaGluZyBwYXRoOiBcXFwiXCIgKyBleHBPckZuICsgXCJcXFwiIFwiICtcbiAgICAgICAgJ1dhdGNoZXIgb25seSBhY2NlcHRzIHNpbXBsZSBkb3QtZGVsaW1pdGVkIHBhdGhzLiAnICtcbiAgICAgICAgJ0ZvciBmdWxsIGNvbnRyb2wsIHVzZSBhIGZ1bmN0aW9uIGluc3RlYWQuJyxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHRoaXMudmFsdWUgPSB0aGlzLmxhenlcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogdGhpcy5nZXQoKTtcbn07XG5cbi8qKlxuICogRXZhbHVhdGUgdGhlIGdldHRlciwgYW5kIHJlLWNvbGxlY3QgZGVwZW5kZW5jaWVzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKCkge1xuICBwdXNoVGFyZ2V0KHRoaXMpO1xuICB2YXIgdmFsdWU7XG4gIHZhciB2bSA9IHRoaXMudm07XG4gIHRyeSB7XG4gICAgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHZtLCB2bSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICBoYW5kbGVFcnJvcihlLCB2bSwgKFwiZ2V0dGVyIGZvciB3YXRjaGVyIFxcXCJcIiArICh0aGlzLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZVxuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICAvLyBcInRvdWNoXCIgZXZlcnkgcHJvcGVydHkgc28gdGhleSBhcmUgYWxsIHRyYWNrZWQgYXNcbiAgICAvLyBkZXBlbmRlbmNpZXMgZm9yIGRlZXAgd2F0Y2hpbmdcbiAgICBpZiAodGhpcy5kZWVwKSB7XG4gICAgICB0cmF2ZXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIHBvcFRhcmdldCgpO1xuICAgIHRoaXMuY2xlYW51cERlcHMoKTtcbiAgfVxuICByZXR1cm4gdmFsdWVcbn07XG5cbi8qKlxuICogQWRkIGEgZGVwZW5kZW5jeSB0byB0aGlzIGRpcmVjdGl2ZS5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuYWRkRGVwID0gZnVuY3Rpb24gYWRkRGVwIChkZXApIHtcbiAgdmFyIGlkID0gZGVwLmlkO1xuICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhpZCkpIHtcbiAgICB0aGlzLm5ld0RlcElkcy5hZGQoaWQpO1xuICAgIHRoaXMubmV3RGVwcy5wdXNoKGRlcCk7XG4gICAgaWYgKCF0aGlzLmRlcElkcy5oYXMoaWQpKSB7XG4gICAgICBkZXAuYWRkU3ViKHRoaXMpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5jbGVhbnVwRGVwcyA9IGZ1bmN0aW9uIGNsZWFudXBEZXBzICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgZGVwID0gdGhpcyQxLmRlcHNbaV07XG4gICAgaWYgKCF0aGlzJDEubmV3RGVwSWRzLmhhcyhkZXAuaWQpKSB7XG4gICAgICBkZXAucmVtb3ZlU3ViKHRoaXMkMSk7XG4gICAgfVxuICB9XG4gIHZhciB0bXAgPSB0aGlzLmRlcElkcztcbiAgdGhpcy5kZXBJZHMgPSB0aGlzLm5ld0RlcElkcztcbiAgdGhpcy5uZXdEZXBJZHMgPSB0bXA7XG4gIHRoaXMubmV3RGVwSWRzLmNsZWFyKCk7XG4gIHRtcCA9IHRoaXMuZGVwcztcbiAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzO1xuICB0aGlzLm5ld0RlcHMgPSB0bXA7XG4gIHRoaXMubmV3RGVwcy5sZW5ndGggPSAwO1xufTtcblxuLyoqXG4gKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IGNoYW5nZXMuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0aGlzLmxhenkpIHtcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0aGlzLnN5bmMpIHtcbiAgICB0aGlzLnJ1bigpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlV2F0Y2hlcih0aGlzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTY2hlZHVsZXIgam9iIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBzY2hlZHVsZXIuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIHJ1biAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgaWYgKFxuICAgICAgdmFsdWUgIT09IHRoaXMudmFsdWUgfHxcbiAgICAgIC8vIERlZXAgd2F0Y2hlcnMgYW5kIHdhdGNoZXJzIG9uIE9iamVjdC9BcnJheXMgc2hvdWxkIGZpcmUgZXZlblxuICAgICAgLy8gd2hlbiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUsIGJlY2F1c2UgdGhlIHZhbHVlIG1heVxuICAgICAgLy8gaGF2ZSBtdXRhdGVkLlxuICAgICAgaXNPYmplY3QodmFsdWUpIHx8XG4gICAgICB0aGlzLmRlZXBcbiAgICApIHtcbiAgICAgIC8vIHNldCBuZXcgdmFsdWVcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBoYW5kbGVFcnJvcihlLCB0aGlzLnZtLCAoXCJjYWxsYmFjayBmb3Igd2F0Y2hlciBcXFwiXCIgKyAodGhpcy5leHByZXNzaW9uKSArIFwiXFxcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBFdmFsdWF0ZSB0aGUgdmFsdWUgb2YgdGhlIHdhdGNoZXIuXG4gKiBUaGlzIG9ubHkgZ2V0cyBjYWxsZWQgZm9yIGxhenkgd2F0Y2hlcnMuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmV2YWx1YXRlID0gZnVuY3Rpb24gZXZhbHVhdGUgKCkge1xuICB0aGlzLnZhbHVlID0gdGhpcy5nZXQoKTtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBEZXBlbmQgb24gYWxsIGRlcHMgY29sbGVjdGVkIGJ5IHRoaXMgd2F0Y2hlci5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB0aGlzJDEuZGVwc1tpXS5kZXBlbmQoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgc2VsZiBmcm9tIGFsbCBkZXBlbmRlbmNpZXMnIHN1YnNjcmliZXIgbGlzdC5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUudGVhcmRvd24gPSBmdW5jdGlvbiB0ZWFyZG93biAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSB2bSdzIHdhdGNoZXIgbGlzdFxuICAgIC8vIHRoaXMgaXMgYSBzb21ld2hhdCBleHBlbnNpdmUgb3BlcmF0aW9uIHNvIHdlIHNraXAgaXRcbiAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgZGVzdHJveWVkLlxuICAgIGlmICghdGhpcy52bS5faXNCZWluZ0Rlc3Ryb3llZCkge1xuICAgICAgcmVtb3ZlKHRoaXMudm0uX3dhdGNoZXJzLCB0aGlzKTtcbiAgICB9XG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMkMS5kZXBzW2ldLnJlbW92ZVN1Yih0aGlzJDEpO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59O1xuXG4vKiAgKi9cblxudmFyIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbiA9IHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IG5vb3AsXG4gIHNldDogbm9vcFxufTtcblxuZnVuY3Rpb24gcHJveHkgKHRhcmdldCwgc291cmNlS2V5LCBrZXkpIHtcbiAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IGZ1bmN0aW9uIHByb3h5R2V0dGVyICgpIHtcbiAgICByZXR1cm4gdGhpc1tzb3VyY2VLZXldW2tleV1cbiAgfTtcbiAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IGZ1bmN0aW9uIHByb3h5U2V0dGVyICh2YWwpIHtcbiAgICB0aGlzW3NvdXJjZUtleV1ba2V5XSA9IHZhbDtcbiAgfTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24pO1xufVxuXG5mdW5jdGlvbiBpbml0U3RhdGUgKHZtKSB7XG4gIHZtLl93YXRjaGVycyA9IFtdO1xuICB2YXIgb3B0cyA9IHZtLiRvcHRpb25zO1xuICBpZiAob3B0cy5wcm9wcykgeyBpbml0UHJvcHModm0sIG9wdHMucHJvcHMpOyB9XG4gIGlmIChvcHRzLm1ldGhvZHMpIHsgaW5pdE1ldGhvZHModm0sIG9wdHMubWV0aG9kcyk7IH1cbiAgaWYgKG9wdHMuZGF0YSkge1xuICAgIGluaXREYXRhKHZtKTtcbiAgfSBlbHNlIHtcbiAgICBvYnNlcnZlKHZtLl9kYXRhID0ge30sIHRydWUgLyogYXNSb290RGF0YSAqLyk7XG4gIH1cbiAgaWYgKG9wdHMuY29tcHV0ZWQpIHsgaW5pdENvbXB1dGVkKHZtLCBvcHRzLmNvbXB1dGVkKTsgfVxuICBpZiAob3B0cy53YXRjaCAmJiBvcHRzLndhdGNoICE9PSBuYXRpdmVXYXRjaCkge1xuICAgIGluaXRXYXRjaCh2bSwgb3B0cy53YXRjaCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFByb3BzICh2bSwgcHJvcHNPcHRpb25zKSB7XG4gIHZhciBwcm9wc0RhdGEgPSB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgfHwge307XG4gIHZhciBwcm9wcyA9IHZtLl9wcm9wcyA9IHt9O1xuICAvLyBjYWNoZSBwcm9wIGtleXMgc28gdGhhdCBmdXR1cmUgcHJvcHMgdXBkYXRlcyBjYW4gaXRlcmF0ZSB1c2luZyBBcnJheVxuICAvLyBpbnN0ZWFkIG9mIGR5bmFtaWMgb2JqZWN0IGtleSBlbnVtZXJhdGlvbi5cbiAgdmFyIGtleXMgPSB2bS4kb3B0aW9ucy5fcHJvcEtleXMgPSBbXTtcbiAgdmFyIGlzUm9vdCA9ICF2bS4kcGFyZW50O1xuICAvLyByb290IGluc3RhbmNlIHByb3BzIHNob3VsZCBiZSBjb252ZXJ0ZWRcbiAgaWYgKCFpc1Jvb3QpIHtcbiAgICB0b2dnbGVPYnNlcnZpbmcoZmFsc2UpO1xuICB9XG4gIHZhciBsb29wID0gZnVuY3Rpb24gKCBrZXkgKSB7XG4gICAga2V5cy5wdXNoKGtleSk7XG4gICAgdmFyIHZhbHVlID0gdmFsaWRhdGVQcm9wKGtleSwgcHJvcHNPcHRpb25zLCBwcm9wc0RhdGEsIHZtKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgaHlwaGVuYXRlZEtleSA9IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgaWYgKGlzUmVzZXJ2ZWRBdHRyaWJ1dGUoaHlwaGVuYXRlZEtleSkgfHxcbiAgICAgICAgICBjb25maWcuaXNSZXNlcnZlZEF0dHIoaHlwaGVuYXRlZEtleSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAoXCJcXFwiXCIgKyBoeXBoZW5hdGVkS2V5ICsgXCJcXFwiIGlzIGEgcmVzZXJ2ZWQgYXR0cmlidXRlIGFuZCBjYW5ub3QgYmUgdXNlZCBhcyBjb21wb25lbnQgcHJvcC5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmluZVJlYWN0aXZlKHByb3BzLCBrZXksIHZhbHVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh2bS4kcGFyZW50ICYmICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgXCJBdm9pZCBtdXRhdGluZyBhIHByb3AgZGlyZWN0bHkgc2luY2UgdGhlIHZhbHVlIHdpbGwgYmUgXCIgK1xuICAgICAgICAgICAgXCJvdmVyd3JpdHRlbiB3aGVuZXZlciB0aGUgcGFyZW50IGNvbXBvbmVudCByZS1yZW5kZXJzLiBcIiArXG4gICAgICAgICAgICBcIkluc3RlYWQsIHVzZSBhIGRhdGEgb3IgY29tcHV0ZWQgcHJvcGVydHkgYmFzZWQgb24gdGhlIHByb3AncyBcIiArXG4gICAgICAgICAgICBcInZhbHVlLiBQcm9wIGJlaW5nIG11dGF0ZWQ6IFxcXCJcIiArIGtleSArIFwiXFxcIlwiLFxuICAgICAgICAgICAgdm1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5lUmVhY3RpdmUocHJvcHMsIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvLyBzdGF0aWMgcHJvcHMgYXJlIGFscmVhZHkgcHJveGllZCBvbiB0aGUgY29tcG9uZW50J3MgcHJvdG90eXBlXG4gICAgLy8gZHVyaW5nIFZ1ZS5leHRlbmQoKS4gV2Ugb25seSBuZWVkIHRvIHByb3h5IHByb3BzIGRlZmluZWQgYXRcbiAgICAvLyBpbnN0YW50aWF0aW9uIGhlcmUuXG4gICAgaWYgKCEoa2V5IGluIHZtKSkge1xuICAgICAgcHJveHkodm0sIFwiX3Byb3BzXCIsIGtleSk7XG4gICAgfVxuICB9O1xuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wc09wdGlvbnMpIGxvb3AoIGtleSApO1xuICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGluaXREYXRhICh2bSkge1xuICB2YXIgZGF0YSA9IHZtLiRvcHRpb25zLmRhdGE7XG4gIGRhdGEgPSB2bS5fZGF0YSA9IHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nXG4gICAgPyBnZXREYXRhKGRhdGEsIHZtKVxuICAgIDogZGF0YSB8fCB7fTtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgZGF0YSA9IHt9O1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdkYXRhIGZ1bmN0aW9ucyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdDpcXG4nICtcbiAgICAgICdodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9jb21wb25lbnRzLmh0bWwjZGF0YS1NdXN0LUJlLWEtRnVuY3Rpb24nLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgdmFyIHByb3BzID0gdm0uJG9wdGlvbnMucHJvcHM7XG4gIHZhciBtZXRob2RzID0gdm0uJG9wdGlvbnMubWV0aG9kcztcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAobWV0aG9kcyAmJiBoYXNPd24obWV0aG9kcywga2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkIGFzIGEgZGF0YSBwcm9wZXJ0eS5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByb3BzICYmIGhhc093bihwcm9wcywga2V5KSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIlRoZSBkYXRhIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlY2xhcmVkIGFzIGEgcHJvcC4gXCIgK1xuICAgICAgICBcIlVzZSBwcm9wIGRlZmF1bHQgdmFsdWUgaW5zdGVhZC5cIixcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICBwcm94eSh2bSwgXCJfZGF0YVwiLCBrZXkpO1xuICAgIH1cbiAgfVxuICAvLyBvYnNlcnZlIGRhdGFcbiAgb2JzZXJ2ZShkYXRhLCB0cnVlIC8qIGFzUm9vdERhdGEgKi8pO1xufVxuXG5mdW5jdGlvbiBnZXREYXRhIChkYXRhLCB2bSkge1xuICAvLyAjNzU3MyBkaXNhYmxlIGRlcCBjb2xsZWN0aW9uIHdoZW4gaW52b2tpbmcgZGF0YSBnZXR0ZXJzXG4gIHB1c2hUYXJnZXQoKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGF0YS5jYWxsKHZtLCB2bSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGhhbmRsZUVycm9yKGUsIHZtLCBcImRhdGEoKVwiKTtcbiAgICByZXR1cm4ge31cbiAgfSBmaW5hbGx5IHtcbiAgICBwb3BUYXJnZXQoKTtcbiAgfVxufVxuXG52YXIgY29tcHV0ZWRXYXRjaGVyT3B0aW9ucyA9IHsgbGF6eTogdHJ1ZSB9O1xuXG5mdW5jdGlvbiBpbml0Q29tcHV0ZWQgKHZtLCBjb21wdXRlZCkge1xuICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgdmFyIHdhdGNoZXJzID0gdm0uX2NvbXB1dGVkV2F0Y2hlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAvLyBjb21wdXRlZCBwcm9wZXJ0aWVzIGFyZSBqdXN0IGdldHRlcnMgZHVyaW5nIFNTUlxuICB2YXIgaXNTU1IgPSBpc1NlcnZlclJlbmRlcmluZygpO1xuXG4gIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgIHZhciB1c2VyRGVmID0gY29tcHV0ZWRba2V5XTtcbiAgICB2YXIgZ2V0dGVyID0gdHlwZW9mIHVzZXJEZWYgPT09ICdmdW5jdGlvbicgPyB1c2VyRGVmIDogdXNlckRlZi5nZXQ7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgZ2V0dGVyID09IG51bGwpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIChcIkdldHRlciBpcyBtaXNzaW5nIGZvciBjb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIuXCIpLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzU1NSKSB7XG4gICAgICAvLyBjcmVhdGUgaW50ZXJuYWwgd2F0Y2hlciBmb3IgdGhlIGNvbXB1dGVkIHByb3BlcnR5LlxuICAgICAgd2F0Y2hlcnNba2V5XSA9IG5ldyBXYXRjaGVyKFxuICAgICAgICB2bSxcbiAgICAgICAgZ2V0dGVyIHx8IG5vb3AsXG4gICAgICAgIG5vb3AsXG4gICAgICAgIGNvbXB1dGVkV2F0Y2hlck9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY29tcG9uZW50LWRlZmluZWQgY29tcHV0ZWQgcHJvcGVydGllcyBhcmUgYWxyZWFkeSBkZWZpbmVkIG9uIHRoZVxuICAgIC8vIGNvbXBvbmVudCBwcm90b3R5cGUuIFdlIG9ubHkgbmVlZCB0byBkZWZpbmUgY29tcHV0ZWQgcHJvcGVydGllcyBkZWZpbmVkXG4gICAgLy8gYXQgaW5zdGFudGlhdGlvbiBoZXJlLlxuICAgIGlmICghKGtleSBpbiB2bSkpIHtcbiAgICAgIGRlZmluZUNvbXB1dGVkKHZtLCBrZXksIHVzZXJEZWYpO1xuICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGtleSBpbiB2bS4kZGF0YSkge1xuICAgICAgICB3YXJuKChcIlRoZSBjb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgYWxyZWFkeSBkZWZpbmVkIGluIGRhdGEuXCIpLCB2bSk7XG4gICAgICB9IGVsc2UgaWYgKHZtLiRvcHRpb25zLnByb3BzICYmIGtleSBpbiB2bS4kb3B0aW9ucy5wcm9wcykge1xuICAgICAgICB3YXJuKChcIlRoZSBjb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgYWxyZWFkeSBkZWZpbmVkIGFzIGEgcHJvcC5cIiksIHZtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmaW5lQ29tcHV0ZWQgKFxuICB0YXJnZXQsXG4gIGtleSxcbiAgdXNlckRlZlxuKSB7XG4gIHZhciBzaG91bGRDYWNoZSA9ICFpc1NlcnZlclJlbmRlcmluZygpO1xuICBpZiAodHlwZW9mIHVzZXJEZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uZ2V0ID0gc2hvdWxkQ2FjaGVcbiAgICAgID8gY3JlYXRlQ29tcHV0ZWRHZXR0ZXIoa2V5KVxuICAgICAgOiB1c2VyRGVmO1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBub29wO1xuICB9IGVsc2Uge1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5nZXQgPSB1c2VyRGVmLmdldFxuICAgICAgPyBzaG91bGRDYWNoZSAmJiB1c2VyRGVmLmNhY2hlICE9PSBmYWxzZVxuICAgICAgICA/IGNyZWF0ZUNvbXB1dGVkR2V0dGVyKGtleSlcbiAgICAgICAgOiB1c2VyRGVmLmdldFxuICAgICAgOiBub29wO1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSB1c2VyRGVmLnNldFxuICAgICAgPyB1c2VyRGVmLnNldFxuICAgICAgOiBub29wO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID09PSBub29wKSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIChcIkNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgYXNzaWduZWQgdG8gYnV0IGl0IGhhcyBubyBzZXR0ZXIuXCIpLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlZEdldHRlciAoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjb21wdXRlZEdldHRlciAoKSB7XG4gICAgdmFyIHdhdGNoZXIgPSB0aGlzLl9jb21wdXRlZFdhdGNoZXJzICYmIHRoaXMuX2NvbXB1dGVkV2F0Y2hlcnNba2V5XTtcbiAgICBpZiAod2F0Y2hlcikge1xuICAgICAgaWYgKHdhdGNoZXIuZGlydHkpIHtcbiAgICAgICAgd2F0Y2hlci5ldmFsdWF0ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgICAgd2F0Y2hlci5kZXBlbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRjaGVyLnZhbHVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRNZXRob2RzICh2bSwgbWV0aG9kcykge1xuICB2YXIgcHJvcHMgPSB2bS4kb3B0aW9ucy5wcm9wcztcbiAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKG1ldGhvZHNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgXCJNZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGhhcyBhbiB1bmRlZmluZWQgdmFsdWUgaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLiBcIiArXG4gICAgICAgICAgXCJEaWQgeW91IHJlZmVyZW5jZSB0aGUgZnVuY3Rpb24gY29ycmVjdGx5P1wiLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMgJiYgaGFzT3duKHByb3BzLCBrZXkpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYXMgYSBwcm9wLlwiKSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKChrZXkgaW4gdm0pICYmIGlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBjb25mbGljdHMgd2l0aCBhbiBleGlzdGluZyBWdWUgaW5zdGFuY2UgbWV0aG9kLiBcIiArXG4gICAgICAgICAgXCJBdm9pZCBkZWZpbmluZyBjb21wb25lbnQgbWV0aG9kcyB0aGF0IHN0YXJ0IHdpdGggXyBvciAkLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHZtW2tleV0gPSBtZXRob2RzW2tleV0gPT0gbnVsbCA/IG5vb3AgOiBiaW5kKG1ldGhvZHNba2V5XSwgdm0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRXYXRjaCAodm0sIHdhdGNoKSB7XG4gIGZvciAodmFyIGtleSBpbiB3YXRjaCkge1xuICAgIHZhciBoYW5kbGVyID0gd2F0Y2hba2V5XTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShoYW5kbGVyKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVdhdGNoZXIodm0sIGtleSwgaGFuZGxlcltpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVdhdGNoZXIodm0sIGtleSwgaGFuZGxlcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdhdGNoZXIgKFxuICB2bSxcbiAgZXhwT3JGbixcbiAgaGFuZGxlcixcbiAgb3B0aW9uc1xuKSB7XG4gIGlmIChpc1BsYWluT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgb3B0aW9ucyA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IGhhbmRsZXIuaGFuZGxlcjtcbiAgfVxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgaGFuZGxlciA9IHZtW2hhbmRsZXJdO1xuICB9XG4gIHJldHVybiB2bS4kd2F0Y2goZXhwT3JGbiwgaGFuZGxlciwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gc3RhdGVNaXhpbiAoVnVlKSB7XG4gIC8vIGZsb3cgc29tZWhvdyBoYXMgcHJvYmxlbXMgd2l0aCBkaXJlY3RseSBkZWNsYXJlZCBkZWZpbml0aW9uIG9iamVjdFxuICAvLyB3aGVuIHVzaW5nIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSwgc28gd2UgaGF2ZSB0byBwcm9jZWR1cmFsbHkgYnVpbGQgdXBcbiAgLy8gdGhlIG9iamVjdCBoZXJlLlxuICB2YXIgZGF0YURlZiA9IHt9O1xuICBkYXRhRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2RhdGEgfTtcbiAgdmFyIHByb3BzRGVmID0ge307XG4gIHByb3BzRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3Byb3BzIH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZGF0YURlZi5zZXQgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0F2b2lkIHJlcGxhY2luZyBpbnN0YW5jZSByb290ICRkYXRhLiAnICtcbiAgICAgICAgJ1VzZSBuZXN0ZWQgZGF0YSBwcm9wZXJ0aWVzIGluc3RlYWQuJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9O1xuICAgIHByb3BzRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXCIkcHJvcHMgaXMgcmVhZG9ubHkuXCIsIHRoaXMpO1xuICAgIH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckZGF0YScsIGRhdGFEZWYpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRwcm9wcycsIHByb3BzRGVmKTtcblxuICBWdWUucHJvdG90eXBlLiRzZXQgPSBzZXQ7XG4gIFZ1ZS5wcm90b3R5cGUuJGRlbGV0ZSA9IGRlbDtcblxuICBWdWUucHJvdG90eXBlLiR3YXRjaCA9IGZ1bmN0aW9uIChcbiAgICBleHBPckZuLFxuICAgIGNiLFxuICAgIG9wdGlvbnNcbiAgKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAoaXNQbGFpbk9iamVjdChjYikpIHtcbiAgICAgIHJldHVybiBjcmVhdGVXYXRjaGVyKHZtLCBleHBPckZuLCBjYiwgb3B0aW9ucylcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy51c2VyID0gdHJ1ZTtcbiAgICB2YXIgd2F0Y2hlciA9IG5ldyBXYXRjaGVyKHZtLCBleHBPckZuLCBjYiwgb3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMuaW1tZWRpYXRlKSB7XG4gICAgICBjYi5jYWxsKHZtLCB3YXRjaGVyLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVud2F0Y2hGbiAoKSB7XG4gICAgICB3YXRjaGVyLnRlYXJkb3duKCk7XG4gICAgfVxuICB9O1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdFByb3ZpZGUgKHZtKSB7XG4gIHZhciBwcm92aWRlID0gdm0uJG9wdGlvbnMucHJvdmlkZTtcbiAgaWYgKHByb3ZpZGUpIHtcbiAgICB2bS5fcHJvdmlkZWQgPSB0eXBlb2YgcHJvdmlkZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBwcm92aWRlLmNhbGwodm0pXG4gICAgICA6IHByb3ZpZGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdEluamVjdGlvbnMgKHZtKSB7XG4gIHZhciByZXN1bHQgPSByZXNvbHZlSW5qZWN0KHZtLiRvcHRpb25zLmluamVjdCwgdm0pO1xuICBpZiAocmVzdWx0KSB7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKGZhbHNlKTtcbiAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlKHZtLCBrZXksIHJlc3VsdFtrZXldLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICAgIFwiQXZvaWQgbXV0YXRpbmcgYW4gaW5qZWN0ZWQgdmFsdWUgZGlyZWN0bHkgc2luY2UgdGhlIGNoYW5nZXMgd2lsbCBiZSBcIiArXG4gICAgICAgICAgICBcIm92ZXJ3cml0dGVuIHdoZW5ldmVyIHRoZSBwcm92aWRlZCBjb21wb25lbnQgcmUtcmVuZGVycy4gXCIgK1xuICAgICAgICAgICAgXCJpbmplY3Rpb24gYmVpbmcgbXV0YXRlZDogXFxcIlwiICsga2V5ICsgXCJcXFwiXCIsXG4gICAgICAgICAgICB2bVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUodm0sIGtleSwgcmVzdWx0W2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRvZ2dsZU9ic2VydmluZyh0cnVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlSW5qZWN0IChpbmplY3QsIHZtKSB7XG4gIGlmIChpbmplY3QpIHtcbiAgICAvLyBpbmplY3QgaXMgOmFueSBiZWNhdXNlIGZsb3cgaXMgbm90IHNtYXJ0IGVub3VnaCB0byBmaWd1cmUgb3V0IGNhY2hlZFxuICAgIHZhciByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBrZXlzID0gaGFzU3ltYm9sXG4gICAgICA/IFJlZmxlY3Qub3duS2V5cyhpbmplY3QpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGluamVjdCwga2V5KS5lbnVtZXJhYmxlXG4gICAgICB9KVxuICAgICAgOiBPYmplY3Qua2V5cyhpbmplY3QpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhciBwcm92aWRlS2V5ID0gaW5qZWN0W2tleV0uZnJvbTtcbiAgICAgIHZhciBzb3VyY2UgPSB2bTtcbiAgICAgIHdoaWxlIChzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZS5fcHJvdmlkZWQgJiYgaGFzT3duKHNvdXJjZS5fcHJvdmlkZWQsIHByb3ZpZGVLZXkpKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBzb3VyY2UuX3Byb3ZpZGVkW3Byb3ZpZGVLZXldO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgc291cmNlID0gc291cmNlLiRwYXJlbnQ7XG4gICAgICB9XG4gICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICBpZiAoJ2RlZmF1bHQnIGluIGluamVjdFtrZXldKSB7XG4gICAgICAgICAgdmFyIHByb3ZpZGVEZWZhdWx0ID0gaW5qZWN0W2tleV0uZGVmYXVsdDtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHR5cGVvZiBwcm92aWRlRGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBwcm92aWRlRGVmYXVsdC5jYWxsKHZtKVxuICAgICAgICAgICAgOiBwcm92aWRlRGVmYXVsdDtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgd2FybigoXCJJbmplY3Rpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiIG5vdCBmb3VuZFwiKSwgdm0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVuZGVyaW5nIHYtZm9yIGxpc3RzLlxuICovXG5mdW5jdGlvbiByZW5kZXJMaXN0IChcbiAgdmFsLFxuICByZW5kZXJcbikge1xuICB2YXIgcmV0LCBpLCBsLCBrZXlzLCBrZXk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkgfHwgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXQgPSBuZXcgQXJyYXkodmFsLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHJldFtpXSA9IHJlbmRlcih2YWxbaV0sIGkpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHJldCA9IG5ldyBBcnJheSh2YWwpO1xuICAgIGZvciAoaSA9IDA7IGkgPCB2YWw7IGkrKykge1xuICAgICAgcmV0W2ldID0gcmVuZGVyKGkgKyAxLCBpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgIHJldCA9IG5ldyBBcnJheShrZXlzLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgcmV0W2ldID0gcmVuZGVyKHZhbFtrZXldLCBrZXksIGkpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNEZWYocmV0KSkge1xuICAgIChyZXQpLl9pc1ZMaXN0ID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgPHNsb3Q+XG4gKi9cbmZ1bmN0aW9uIHJlbmRlclNsb3QgKFxuICBuYW1lLFxuICBmYWxsYmFjayxcbiAgcHJvcHMsXG4gIGJpbmRPYmplY3Rcbikge1xuICB2YXIgc2NvcGVkU2xvdEZuID0gdGhpcy4kc2NvcGVkU2xvdHNbbmFtZV07XG4gIHZhciBub2RlcztcbiAgaWYgKHNjb3BlZFNsb3RGbikgeyAvLyBzY29wZWQgc2xvdFxuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgaWYgKGJpbmRPYmplY3QpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFpc09iamVjdChiaW5kT2JqZWN0KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdzbG90IHYtYmluZCB3aXRob3V0IGFyZ3VtZW50IGV4cGVjdHMgYW4gT2JqZWN0JyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBwcm9wcyA9IGV4dGVuZChleHRlbmQoe30sIGJpbmRPYmplY3QpLCBwcm9wcyk7XG4gICAgfVxuICAgIG5vZGVzID0gc2NvcGVkU2xvdEZuKHByb3BzKSB8fCBmYWxsYmFjaztcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xvdE5vZGVzID0gdGhpcy4kc2xvdHNbbmFtZV07XG4gICAgLy8gd2FybiBkdXBsaWNhdGUgc2xvdCB1c2FnZVxuICAgIGlmIChzbG90Tm9kZXMpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHNsb3ROb2Rlcy5fcmVuZGVyZWQpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBcIkR1cGxpY2F0ZSBwcmVzZW5jZSBvZiBzbG90IFxcXCJcIiArIG5hbWUgKyBcIlxcXCIgZm91bmQgaW4gdGhlIHNhbWUgcmVuZGVyIHRyZWUgXCIgK1xuICAgICAgICAgIFwiLSB0aGlzIHdpbGwgbGlrZWx5IGNhdXNlIHJlbmRlciBlcnJvcnMuXCIsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgc2xvdE5vZGVzLl9yZW5kZXJlZCA9IHRydWU7XG4gICAgfVxuICAgIG5vZGVzID0gc2xvdE5vZGVzIHx8IGZhbGxiYWNrO1xuICB9XG5cbiAgdmFyIHRhcmdldCA9IHByb3BzICYmIHByb3BzLnNsb3Q7XG4gIGlmICh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnLCB7IHNsb3Q6IHRhcmdldCB9LCBub2RlcylcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbm9kZXNcbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIGZpbHRlcnNcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUZpbHRlciAoaWQpIHtcbiAgcmV0dXJuIHJlc29sdmVBc3NldCh0aGlzLiRvcHRpb25zLCAnZmlsdGVycycsIGlkLCB0cnVlKSB8fCBpZGVudGl0eVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaXNLZXlOb3RNYXRjaCAoZXhwZWN0LCBhY3R1YWwpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXhwZWN0KSkge1xuICAgIHJldHVybiBleHBlY3QuaW5kZXhPZihhY3R1YWwpID09PSAtMVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBleHBlY3QgIT09IGFjdHVhbFxuICB9XG59XG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIGNoZWNraW5nIGtleUNvZGVzIGZyb20gY29uZmlnLlxuICogZXhwb3NlZCBhcyBWdWUucHJvdG90eXBlLl9rXG4gKiBwYXNzaW5nIGluIGV2ZW50S2V5TmFtZSBhcyBsYXN0IGFyZ3VtZW50IHNlcGFyYXRlbHkgZm9yIGJhY2t3YXJkcyBjb21wYXRcbiAqL1xuZnVuY3Rpb24gY2hlY2tLZXlDb2RlcyAoXG4gIGV2ZW50S2V5Q29kZSxcbiAga2V5LFxuICBidWlsdEluS2V5Q29kZSxcbiAgZXZlbnRLZXlOYW1lLFxuICBidWlsdEluS2V5TmFtZVxuKSB7XG4gIHZhciBtYXBwZWRLZXlDb2RlID0gY29uZmlnLmtleUNvZGVzW2tleV0gfHwgYnVpbHRJbktleUNvZGU7XG4gIGlmIChidWlsdEluS2V5TmFtZSAmJiBldmVudEtleU5hbWUgJiYgIWNvbmZpZy5rZXlDb2Rlc1trZXldKSB7XG4gICAgcmV0dXJuIGlzS2V5Tm90TWF0Y2goYnVpbHRJbktleU5hbWUsIGV2ZW50S2V5TmFtZSlcbiAgfSBlbHNlIGlmIChtYXBwZWRLZXlDb2RlKSB7XG4gICAgcmV0dXJuIGlzS2V5Tm90TWF0Y2gobWFwcGVkS2V5Q29kZSwgZXZlbnRLZXlDb2RlKVxuICB9IGVsc2UgaWYgKGV2ZW50S2V5TmFtZSkge1xuICAgIHJldHVybiBoeXBoZW5hdGUoZXZlbnRLZXlOYW1lKSAhPT0ga2V5XG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIG1lcmdpbmcgdi1iaW5kPVwib2JqZWN0XCIgaW50byBhIFZOb2RlJ3MgZGF0YS5cbiAqL1xuZnVuY3Rpb24gYmluZE9iamVjdFByb3BzIChcbiAgZGF0YSxcbiAgdGFnLFxuICB2YWx1ZSxcbiAgYXNQcm9wLFxuICBpc1N5bmNcbikge1xuICBpZiAodmFsdWUpIHtcbiAgICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAndi1iaW5kIHdpdGhvdXQgYXJndW1lbnQgZXhwZWN0cyBhbiBPYmplY3Qgb3IgQXJyYXkgdmFsdWUnLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB0b09iamVjdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgaGFzaDtcbiAgICAgIHZhciBsb29wID0gZnVuY3Rpb24gKCBrZXkgKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBrZXkgPT09ICdjbGFzcycgfHxcbiAgICAgICAgICBrZXkgPT09ICdzdHlsZScgfHxcbiAgICAgICAgICBpc1Jlc2VydmVkQXR0cmlidXRlKGtleSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaGFzaCA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHR5cGUgPSBkYXRhLmF0dHJzICYmIGRhdGEuYXR0cnMudHlwZTtcbiAgICAgICAgICBoYXNoID0gYXNQcm9wIHx8IGNvbmZpZy5tdXN0VXNlUHJvcCh0YWcsIHR5cGUsIGtleSlcbiAgICAgICAgICAgID8gZGF0YS5kb21Qcm9wcyB8fCAoZGF0YS5kb21Qcm9wcyA9IHt9KVxuICAgICAgICAgICAgOiBkYXRhLmF0dHJzIHx8IChkYXRhLmF0dHJzID0ge30pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKGtleSBpbiBoYXNoKSkge1xuICAgICAgICAgIGhhc2hba2V5XSA9IHZhbHVlW2tleV07XG5cbiAgICAgICAgICBpZiAoaXNTeW5jKSB7XG4gICAgICAgICAgICB2YXIgb24gPSBkYXRhLm9uIHx8IChkYXRhLm9uID0ge30pO1xuICAgICAgICAgICAgb25bKFwidXBkYXRlOlwiICsga2V5KV0gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgIHZhbHVlW2tleV0gPSAkZXZlbnQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSBsb29wKCBrZXkgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGFcbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlbmRlcmluZyBzdGF0aWMgdHJlZXMuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclN0YXRpYyAoXG4gIGluZGV4LFxuICBpc0luRm9yXG4pIHtcbiAgdmFyIGNhY2hlZCA9IHRoaXMuX3N0YXRpY1RyZWVzIHx8ICh0aGlzLl9zdGF0aWNUcmVlcyA9IFtdKTtcbiAgdmFyIHRyZWUgPSBjYWNoZWRbaW5kZXhdO1xuICAvLyBpZiBoYXMgYWxyZWFkeS1yZW5kZXJlZCBzdGF0aWMgdHJlZSBhbmQgbm90IGluc2lkZSB2LWZvcixcbiAgLy8gd2UgY2FuIHJldXNlIHRoZSBzYW1lIHRyZWUuXG4gIGlmICh0cmVlICYmICFpc0luRm9yKSB7XG4gICAgcmV0dXJuIHRyZWVcbiAgfVxuICAvLyBvdGhlcndpc2UsIHJlbmRlciBhIGZyZXNoIHRyZWUuXG4gIHRyZWUgPSBjYWNoZWRbaW5kZXhdID0gdGhpcy4kb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNbaW5kZXhdLmNhbGwoXG4gICAgdGhpcy5fcmVuZGVyUHJveHksXG4gICAgbnVsbCxcbiAgICB0aGlzIC8vIGZvciByZW5kZXIgZm5zIGdlbmVyYXRlZCBmb3IgZnVuY3Rpb25hbCBjb21wb25lbnQgdGVtcGxhdGVzXG4gICk7XG4gIG1hcmtTdGF0aWModHJlZSwgKFwiX19zdGF0aWNfX1wiICsgaW5kZXgpLCBmYWxzZSk7XG4gIHJldHVybiB0cmVlXG59XG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHYtb25jZS5cbiAqIEVmZmVjdGl2ZWx5IGl0IG1lYW5zIG1hcmtpbmcgdGhlIG5vZGUgYXMgc3RhdGljIHdpdGggYSB1bmlxdWUga2V5LlxuICovXG5mdW5jdGlvbiBtYXJrT25jZSAoXG4gIHRyZWUsXG4gIGluZGV4LFxuICBrZXlcbikge1xuICBtYXJrU3RhdGljKHRyZWUsIChcIl9fb25jZV9fXCIgKyBpbmRleCArIChrZXkgPyAoXCJfXCIgKyBrZXkpIDogXCJcIikpLCB0cnVlKTtcbiAgcmV0dXJuIHRyZWVcbn1cblxuZnVuY3Rpb24gbWFya1N0YXRpYyAoXG4gIHRyZWUsXG4gIGtleSxcbiAgaXNPbmNlXG4pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHJlZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0cmVlW2ldICYmIHR5cGVvZiB0cmVlW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICBtYXJrU3RhdGljTm9kZSh0cmVlW2ldLCAoa2V5ICsgXCJfXCIgKyBpKSwgaXNPbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbWFya1N0YXRpY05vZGUodHJlZSwga2V5LCBpc09uY2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcmtTdGF0aWNOb2RlIChub2RlLCBrZXksIGlzT25jZSkge1xuICBub2RlLmlzU3RhdGljID0gdHJ1ZTtcbiAgbm9kZS5rZXkgPSBrZXk7XG4gIG5vZGUuaXNPbmNlID0gaXNPbmNlO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gYmluZE9iamVjdExpc3RlbmVycyAoZGF0YSwgdmFsdWUpIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAndi1vbiB3aXRob3V0IGFyZ3VtZW50IGV4cGVjdHMgYW4gT2JqZWN0IHZhbHVlJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9uID0gZGF0YS5vbiA9IGRhdGEub24gPyBleHRlbmQoe30sIGRhdGEub24pIDoge307XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgdmFyIGV4aXN0aW5nID0gb25ba2V5XTtcbiAgICAgICAgdmFyIG91cnMgPSB2YWx1ZVtrZXldO1xuICAgICAgICBvbltrZXldID0gZXhpc3RpbmcgPyBbXS5jb25jYXQoZXhpc3RpbmcsIG91cnMpIDogb3VycztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGFcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluc3RhbGxSZW5kZXJIZWxwZXJzICh0YXJnZXQpIHtcbiAgdGFyZ2V0Ll9vID0gbWFya09uY2U7XG4gIHRhcmdldC5fbiA9IHRvTnVtYmVyO1xuICB0YXJnZXQuX3MgPSB0b1N0cmluZztcbiAgdGFyZ2V0Ll9sID0gcmVuZGVyTGlzdDtcbiAgdGFyZ2V0Ll90ID0gcmVuZGVyU2xvdDtcbiAgdGFyZ2V0Ll9xID0gbG9vc2VFcXVhbDtcbiAgdGFyZ2V0Ll9pID0gbG9vc2VJbmRleE9mO1xuICB0YXJnZXQuX20gPSByZW5kZXJTdGF0aWM7XG4gIHRhcmdldC5fZiA9IHJlc29sdmVGaWx0ZXI7XG4gIHRhcmdldC5fayA9IGNoZWNrS2V5Q29kZXM7XG4gIHRhcmdldC5fYiA9IGJpbmRPYmplY3RQcm9wcztcbiAgdGFyZ2V0Ll92ID0gY3JlYXRlVGV4dFZOb2RlO1xuICB0YXJnZXQuX2UgPSBjcmVhdGVFbXB0eVZOb2RlO1xuICB0YXJnZXQuX3UgPSByZXNvbHZlU2NvcGVkU2xvdHM7XG4gIHRhcmdldC5fZyA9IGJpbmRPYmplY3RMaXN0ZW5lcnM7XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dCAoXG4gIGRhdGEsXG4gIHByb3BzLFxuICBjaGlsZHJlbixcbiAgcGFyZW50LFxuICBDdG9yXG4pIHtcbiAgdmFyIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnM7XG4gIC8vIGVuc3VyZSB0aGUgY3JlYXRlRWxlbWVudCBmdW5jdGlvbiBpbiBmdW5jdGlvbmFsIGNvbXBvbmVudHNcbiAgLy8gZ2V0cyBhIHVuaXF1ZSBjb250ZXh0IC0gdGhpcyBpcyBuZWNlc3NhcnkgZm9yIGNvcnJlY3QgbmFtZWQgc2xvdCBjaGVja1xuICB2YXIgY29udGV4dFZtO1xuICBpZiAoaGFzT3duKHBhcmVudCwgJ191aWQnKSkge1xuICAgIGNvbnRleHRWbSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICBjb250ZXh0Vm0uX29yaWdpbmFsID0gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIC8vIHRoZSBjb250ZXh0IHZtIHBhc3NlZCBpbiBpcyBhIGZ1bmN0aW9uYWwgY29udGV4dCBhcyB3ZWxsLlxuICAgIC8vIGluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBhcmUgYWJsZSB0byBnZXQgYSBob2xkIHRvIHRoZVxuICAgIC8vIHJlYWwgY29udGV4dCBpbnN0YW5jZS5cbiAgICBjb250ZXh0Vm0gPSBwYXJlbnQ7XG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgcGFyZW50ID0gcGFyZW50Ll9vcmlnaW5hbDtcbiAgfVxuICB2YXIgaXNDb21waWxlZCA9IGlzVHJ1ZShvcHRpb25zLl9jb21waWxlZCk7XG4gIHZhciBuZWVkTm9ybWFsaXphdGlvbiA9ICFpc0NvbXBpbGVkO1xuXG4gIHRoaXMuZGF0YSA9IGRhdGE7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5saXN0ZW5lcnMgPSBkYXRhLm9uIHx8IGVtcHR5T2JqZWN0O1xuICB0aGlzLmluamVjdGlvbnMgPSByZXNvbHZlSW5qZWN0KG9wdGlvbnMuaW5qZWN0LCBwYXJlbnQpO1xuICB0aGlzLnNsb3RzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZVNsb3RzKGNoaWxkcmVuLCBwYXJlbnQpOyB9O1xuXG4gIC8vIHN1cHBvcnQgZm9yIGNvbXBpbGVkIGZ1bmN0aW9uYWwgdGVtcGxhdGVcbiAgaWYgKGlzQ29tcGlsZWQpIHtcbiAgICAvLyBleHBvc2luZyAkb3B0aW9ucyBmb3IgcmVuZGVyU3RhdGljKClcbiAgICB0aGlzLiRvcHRpb25zID0gb3B0aW9ucztcbiAgICAvLyBwcmUtcmVzb2x2ZSBzbG90cyBmb3IgcmVuZGVyU2xvdCgpXG4gICAgdGhpcy4kc2xvdHMgPSB0aGlzLnNsb3RzKCk7XG4gICAgdGhpcy4kc2NvcGVkU2xvdHMgPSBkYXRhLnNjb3BlZFNsb3RzIHx8IGVtcHR5T2JqZWN0O1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuX3Njb3BlSWQpIHtcbiAgICB0aGlzLl9jID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHtcbiAgICAgIHZhciB2bm9kZSA9IGNyZWF0ZUVsZW1lbnQoY29udGV4dFZtLCBhLCBiLCBjLCBkLCBuZWVkTm9ybWFsaXphdGlvbik7XG4gICAgICBpZiAodm5vZGUgJiYgIUFycmF5LmlzQXJyYXkodm5vZGUpKSB7XG4gICAgICAgIHZub2RlLmZuU2NvcGVJZCA9IG9wdGlvbnMuX3Njb3BlSWQ7XG4gICAgICAgIHZub2RlLmZuQ29udGV4dCA9IHBhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bm9kZVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KGNvbnRleHRWbSwgYSwgYiwgYywgZCwgbmVlZE5vcm1hbGl6YXRpb24pOyB9O1xuICB9XG59XG5cbmluc3RhbGxSZW5kZXJIZWxwZXJzKEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0LnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQgKFxuICBDdG9yLFxuICBwcm9wc0RhdGEsXG4gIGRhdGEsXG4gIGNvbnRleHRWbSxcbiAgY2hpbGRyZW5cbikge1xuICB2YXIgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucztcbiAgdmFyIHByb3BzID0ge307XG4gIHZhciBwcm9wT3B0aW9ucyA9IG9wdGlvbnMucHJvcHM7XG4gIGlmIChpc0RlZihwcm9wT3B0aW9ucykpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcE9wdGlvbnMpIHtcbiAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhIHx8IGVtcHR5T2JqZWN0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRGVmKGRhdGEuYXR0cnMpKSB7IG1lcmdlUHJvcHMocHJvcHMsIGRhdGEuYXR0cnMpOyB9XG4gICAgaWYgKGlzRGVmKGRhdGEucHJvcHMpKSB7IG1lcmdlUHJvcHMocHJvcHMsIGRhdGEucHJvcHMpOyB9XG4gIH1cblxuICB2YXIgcmVuZGVyQ29udGV4dCA9IG5ldyBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dChcbiAgICBkYXRhLFxuICAgIHByb3BzLFxuICAgIGNoaWxkcmVuLFxuICAgIGNvbnRleHRWbSxcbiAgICBDdG9yXG4gICk7XG5cbiAgdmFyIHZub2RlID0gb3B0aW9ucy5yZW5kZXIuY2FsbChudWxsLCByZW5kZXJDb250ZXh0Ll9jLCByZW5kZXJDb250ZXh0KTtcblxuICBpZiAodm5vZGUgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgIHJldHVybiBjbG9uZUFuZE1hcmtGdW5jdGlvbmFsUmVzdWx0KHZub2RlLCBkYXRhLCByZW5kZXJDb250ZXh0LnBhcmVudCwgb3B0aW9ucylcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZub2RlKSkge1xuICAgIHZhciB2bm9kZXMgPSBub3JtYWxpemVDaGlsZHJlbih2bm9kZSkgfHwgW107XG4gICAgdmFyIHJlcyA9IG5ldyBBcnJheSh2bm9kZXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzW2ldID0gY2xvbmVBbmRNYXJrRnVuY3Rpb25hbFJlc3VsdCh2bm9kZXNbaV0sIGRhdGEsIHJlbmRlckNvbnRleHQucGFyZW50LCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lQW5kTWFya0Z1bmN0aW9uYWxSZXN1bHQgKHZub2RlLCBkYXRhLCBjb250ZXh0Vm0sIG9wdGlvbnMpIHtcbiAgLy8gIzc4MTcgY2xvbmUgbm9kZSBiZWZvcmUgc2V0dGluZyBmbkNvbnRleHQsIG90aGVyd2lzZSBpZiB0aGUgbm9kZSBpcyByZXVzZWRcbiAgLy8gKGUuZy4gaXQgd2FzIGZyb20gYSBjYWNoZWQgbm9ybWFsIHNsb3QpIHRoZSBmbkNvbnRleHQgY2F1c2VzIG5hbWVkIHNsb3RzXG4gIC8vIHRoYXQgc2hvdWxkIG5vdCBiZSBtYXRjaGVkIHRvIG1hdGNoLlxuICB2YXIgY2xvbmUgPSBjbG9uZVZOb2RlKHZub2RlKTtcbiAgY2xvbmUuZm5Db250ZXh0ID0gY29udGV4dFZtO1xuICBjbG9uZS5mbk9wdGlvbnMgPSBvcHRpb25zO1xuICBpZiAoZGF0YS5zbG90KSB7XG4gICAgKGNsb25lLmRhdGEgfHwgKGNsb25lLmRhdGEgPSB7fSkpLnNsb3QgPSBkYXRhLnNsb3Q7XG4gIH1cbiAgcmV0dXJuIGNsb25lXG59XG5cbmZ1bmN0aW9uIG1lcmdlUHJvcHMgKHRvLCBmcm9tKSB7XG4gIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgdG9bY2FtZWxpemUoa2V5KV0gPSBmcm9tW2tleV07XG4gIH1cbn1cblxuLyogICovXG5cblxuXG5cbi8vIFJlZ2lzdGVyIHRoZSBjb21wb25lbnQgaG9vayB0byB3ZWV4IG5hdGl2ZSByZW5kZXIgZW5naW5lLlxuLy8gVGhlIGhvb2sgd2lsbCBiZSB0cmlnZ2VyZWQgYnkgbmF0aXZlLCBub3QgamF2YXNjcmlwdC5cblxuXG4vLyBVcGRhdGVzIHRoZSBzdGF0ZSBvZiB0aGUgY29tcG9uZW50IHRvIHdlZXggbmF0aXZlIHJlbmRlciBlbmdpbmUuXG5cbi8qICAqL1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vSGFua3MxMDEwMC93ZWV4LW5hdGl2ZS1kaXJlY3RpdmUvdHJlZS9tYXN0ZXIvY29tcG9uZW50XG5cbi8vIGxpc3RlbmluZyBvbiBuYXRpdmUgY2FsbGJhY2tcblxuLyogICovXG5cbi8qICAqL1xuXG4vLyBpbmxpbmUgaG9va3MgdG8gYmUgaW52b2tlZCBvbiBjb21wb25lbnQgVk5vZGVzIGR1cmluZyBwYXRjaFxudmFyIGNvbXBvbmVudFZOb2RlSG9va3MgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQgKFxuICAgIHZub2RlLFxuICAgIGh5ZHJhdGluZyxcbiAgICBwYXJlbnRFbG0sXG4gICAgcmVmRWxtXG4gICkge1xuICAgIGlmIChcbiAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlICYmXG4gICAgICAhdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX2lzRGVzdHJveWVkICYmXG4gICAgICB2bm9kZS5kYXRhLmtlZXBBbGl2ZVxuICAgICkge1xuICAgICAgLy8ga2VwdC1hbGl2ZSBjb21wb25lbnRzLCB0cmVhdCBhcyBhIHBhdGNoXG4gICAgICB2YXIgbW91bnRlZE5vZGUgPSB2bm9kZTsgLy8gd29yayBhcm91bmQgZmxvd1xuICAgICAgY29tcG9uZW50Vk5vZGVIb29rcy5wcmVwYXRjaChtb3VudGVkTm9kZSwgbW91bnRlZE5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY2hpbGQgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlRm9yVm5vZGUoXG4gICAgICAgIHZub2RlLFxuICAgICAgICBhY3RpdmVJbnN0YW5jZSxcbiAgICAgICAgcGFyZW50RWxtLFxuICAgICAgICByZWZFbG1cbiAgICAgICk7XG4gICAgICBjaGlsZC4kbW91bnQoaHlkcmF0aW5nID8gdm5vZGUuZWxtIDogdW5kZWZpbmVkLCBoeWRyYXRpbmcpO1xuICAgIH1cbiAgfSxcblxuICBwcmVwYXRjaDogZnVuY3Rpb24gcHJlcGF0Y2ggKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBvcHRpb25zID0gdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICB2YXIgY2hpbGQgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IG9sZFZub2RlLmNvbXBvbmVudEluc3RhbmNlO1xuICAgIHVwZGF0ZUNoaWxkQ29tcG9uZW50KFxuICAgICAgY2hpbGQsXG4gICAgICBvcHRpb25zLnByb3BzRGF0YSwgLy8gdXBkYXRlZCBwcm9wc1xuICAgICAgb3B0aW9ucy5saXN0ZW5lcnMsIC8vIHVwZGF0ZWQgbGlzdGVuZXJzXG4gICAgICB2bm9kZSwgLy8gbmV3IHBhcmVudCB2bm9kZVxuICAgICAgb3B0aW9ucy5jaGlsZHJlbiAvLyBuZXcgY2hpbGRyZW5cbiAgICApO1xuICB9LFxuXG4gIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0ICh2bm9kZSkge1xuICAgIHZhciBjb250ZXh0ID0gdm5vZGUuY29udGV4dDtcbiAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBpZiAoIWNvbXBvbmVudEluc3RhbmNlLl9pc01vdW50ZWQpIHtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLl9pc01vdW50ZWQgPSB0cnVlO1xuICAgICAgY2FsbEhvb2soY29tcG9uZW50SW5zdGFuY2UsICdtb3VudGVkJyk7XG4gICAgfVxuICAgIGlmICh2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgaWYgKGNvbnRleHQuX2lzTW91bnRlZCkge1xuICAgICAgICAvLyB2dWUtcm91dGVyIzEyMTJcbiAgICAgICAgLy8gRHVyaW5nIHVwZGF0ZXMsIGEga2VwdC1hbGl2ZSBjb21wb25lbnQncyBjaGlsZCBjb21wb25lbnRzIG1heVxuICAgICAgICAvLyBjaGFuZ2UsIHNvIGRpcmVjdGx5IHdhbGtpbmcgdGhlIHRyZWUgaGVyZSBtYXkgY2FsbCBhY3RpdmF0ZWQgaG9va3NcbiAgICAgICAgLy8gb24gaW5jb3JyZWN0IGNoaWxkcmVuLiBJbnN0ZWFkIHdlIHB1c2ggdGhlbSBpbnRvIGEgcXVldWUgd2hpY2ggd2lsbFxuICAgICAgICAvLyBiZSBwcm9jZXNzZWQgYWZ0ZXIgdGhlIHdob2xlIHBhdGNoIHByb2Nlc3MgZW5kZWQuXG4gICAgICAgIHF1ZXVlQWN0aXZhdGVkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQoY29tcG9uZW50SW5zdGFuY2UsIHRydWUgLyogZGlyZWN0ICovKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSAodm5vZGUpIHtcbiAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBpZiAoIWNvbXBvbmVudEluc3RhbmNlLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgaWYgKCF2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS4kZGVzdHJveSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlLCB0cnVlIC8qIGRpcmVjdCAqLyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgaG9va3NUb01lcmdlID0gT2JqZWN0LmtleXMoY29tcG9uZW50Vk5vZGVIb29rcyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCAoXG4gIEN0b3IsXG4gIGRhdGEsXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuLFxuICB0YWdcbikge1xuICBpZiAoaXNVbmRlZihDdG9yKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGJhc2VDdG9yID0gY29udGV4dC4kb3B0aW9ucy5fYmFzZTtcblxuICAvLyBwbGFpbiBvcHRpb25zIG9iamVjdDogdHVybiBpdCBpbnRvIGEgY29uc3RydWN0b3JcbiAgaWYgKGlzT2JqZWN0KEN0b3IpKSB7XG4gICAgQ3RvciA9IGJhc2VDdG9yLmV4dGVuZChDdG9yKTtcbiAgfVxuXG4gIC8vIGlmIGF0IHRoaXMgc3RhZ2UgaXQncyBub3QgYSBjb25zdHJ1Y3RvciBvciBhbiBhc3luYyBjb21wb25lbnQgZmFjdG9yeSxcbiAgLy8gcmVqZWN0LlxuICBpZiAodHlwZW9mIEN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybigoXCJJbnZhbGlkIENvbXBvbmVudCBkZWZpbml0aW9uOiBcIiArIChTdHJpbmcoQ3RvcikpKSwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gYXN5bmMgY29tcG9uZW50XG4gIHZhciBhc3luY0ZhY3Rvcnk7XG4gIGlmIChpc1VuZGVmKEN0b3IuY2lkKSkge1xuICAgIGFzeW5jRmFjdG9yeSA9IEN0b3I7XG4gICAgQ3RvciA9IHJlc29sdmVBc3luY0NvbXBvbmVudChhc3luY0ZhY3RvcnksIGJhc2VDdG9yLCBjb250ZXh0KTtcbiAgICBpZiAoQ3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyByZXR1cm4gYSBwbGFjZWhvbGRlciBub2RlIGZvciBhc3luYyBjb21wb25lbnQsIHdoaWNoIGlzIHJlbmRlcmVkXG4gICAgICAvLyBhcyBhIGNvbW1lbnQgbm9kZSBidXQgcHJlc2VydmVzIGFsbCB0aGUgcmF3IGluZm9ybWF0aW9uIGZvciB0aGUgbm9kZS5cbiAgICAgIC8vIHRoZSBpbmZvcm1hdGlvbiB3aWxsIGJlIHVzZWQgZm9yIGFzeW5jIHNlcnZlci1yZW5kZXJpbmcgYW5kIGh5ZHJhdGlvbi5cbiAgICAgIHJldHVybiBjcmVhdGVBc3luY1BsYWNlaG9sZGVyKFxuICAgICAgICBhc3luY0ZhY3RvcnksXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICB0YWdcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAvLyByZXNvbHZlIGNvbnN0cnVjdG9yIG9wdGlvbnMgaW4gY2FzZSBnbG9iYWwgbWl4aW5zIGFyZSBhcHBsaWVkIGFmdGVyXG4gIC8vIGNvbXBvbmVudCBjb25zdHJ1Y3RvciBjcmVhdGlvblxuICByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKEN0b3IpO1xuXG4gIC8vIHRyYW5zZm9ybSBjb21wb25lbnQgdi1tb2RlbCBkYXRhIGludG8gcHJvcHMgJiBldmVudHNcbiAgaWYgKGlzRGVmKGRhdGEubW9kZWwpKSB7XG4gICAgdHJhbnNmb3JtTW9kZWwoQ3Rvci5vcHRpb25zLCBkYXRhKTtcbiAgfVxuXG4gIC8vIGV4dHJhY3QgcHJvcHNcbiAgdmFyIHByb3BzRGF0YSA9IGV4dHJhY3RQcm9wc0Zyb21WTm9kZURhdGEoZGF0YSwgQ3RvciwgdGFnKTtcblxuICAvLyBmdW5jdGlvbmFsIGNvbXBvbmVudFxuICBpZiAoaXNUcnVlKEN0b3Iub3B0aW9ucy5mdW5jdGlvbmFsKSkge1xuICAgIHJldHVybiBjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50KEN0b3IsIHByb3BzRGF0YSwgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pXG4gIH1cblxuICAvLyBleHRyYWN0IGxpc3RlbmVycywgc2luY2UgdGhlc2UgbmVlZHMgdG8gYmUgdHJlYXRlZCBhc1xuICAvLyBjaGlsZCBjb21wb25lbnQgbGlzdGVuZXJzIGluc3RlYWQgb2YgRE9NIGxpc3RlbmVyc1xuICB2YXIgbGlzdGVuZXJzID0gZGF0YS5vbjtcbiAgLy8gcmVwbGFjZSB3aXRoIGxpc3RlbmVycyB3aXRoIC5uYXRpdmUgbW9kaWZpZXJcbiAgLy8gc28gaXQgZ2V0cyBwcm9jZXNzZWQgZHVyaW5nIHBhcmVudCBjb21wb25lbnQgcGF0Y2guXG4gIGRhdGEub24gPSBkYXRhLm5hdGl2ZU9uO1xuXG4gIGlmIChpc1RydWUoQ3Rvci5vcHRpb25zLmFic3RyYWN0KSkge1xuICAgIC8vIGFic3RyYWN0IGNvbXBvbmVudHMgZG8gbm90IGtlZXAgYW55dGhpbmdcbiAgICAvLyBvdGhlciB0aGFuIHByb3BzICYgbGlzdGVuZXJzICYgc2xvdFxuXG4gICAgLy8gd29yayBhcm91bmQgZmxvd1xuICAgIHZhciBzbG90ID0gZGF0YS5zbG90O1xuICAgIGRhdGEgPSB7fTtcbiAgICBpZiAoc2xvdCkge1xuICAgICAgZGF0YS5zbG90ID0gc2xvdDtcbiAgICB9XG4gIH1cblxuICAvLyBpbnN0YWxsIGNvbXBvbmVudCBtYW5hZ2VtZW50IGhvb2tzIG9udG8gdGhlIHBsYWNlaG9sZGVyIG5vZGVcbiAgaW5zdGFsbENvbXBvbmVudEhvb2tzKGRhdGEpO1xuXG4gIC8vIHJldHVybiBhIHBsYWNlaG9sZGVyIHZub2RlXG4gIHZhciBuYW1lID0gQ3Rvci5vcHRpb25zLm5hbWUgfHwgdGFnO1xuICB2YXIgdm5vZGUgPSBuZXcgVk5vZGUoXG4gICAgKFwidnVlLWNvbXBvbmVudC1cIiArIChDdG9yLmNpZCkgKyAobmFtZSA/IChcIi1cIiArIG5hbWUpIDogJycpKSxcbiAgICBkYXRhLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb250ZXh0LFxuICAgIHsgQ3RvcjogQ3RvciwgcHJvcHNEYXRhOiBwcm9wc0RhdGEsIGxpc3RlbmVyczogbGlzdGVuZXJzLCB0YWc6IHRhZywgY2hpbGRyZW46IGNoaWxkcmVuIH0sXG4gICAgYXN5bmNGYWN0b3J5XG4gICk7XG5cbiAgLy8gV2VleCBzcGVjaWZpYzogaW52b2tlIHJlY3ljbGUtbGlzdCBvcHRpbWl6ZWQgQHJlbmRlciBmdW5jdGlvbiBmb3JcbiAgLy8gZXh0cmFjdGluZyBjZWxsLXNsb3QgdGVtcGxhdGUuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9IYW5rczEwMTAwL3dlZXgtbmF0aXZlLWRpcmVjdGl2ZS90cmVlL21hc3Rlci9jb21wb25lbnRcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIHJldHVybiB2bm9kZVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnRJbnN0YW5jZUZvclZub2RlIChcbiAgdm5vZGUsIC8vIHdlIGtub3cgaXQncyBNb3VudGVkQ29tcG9uZW50Vk5vZGUgYnV0IGZsb3cgZG9lc24ndFxuICBwYXJlbnQsIC8vIGFjdGl2ZUluc3RhbmNlIGluIGxpZmVjeWNsZSBzdGF0ZVxuICBwYXJlbnRFbG0sXG4gIHJlZkVsbVxuKSB7XG4gIHZhciBvcHRpb25zID0ge1xuICAgIF9pc0NvbXBvbmVudDogdHJ1ZSxcbiAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICBfcGFyZW50Vm5vZGU6IHZub2RlLFxuICAgIF9wYXJlbnRFbG06IHBhcmVudEVsbSB8fCBudWxsLFxuICAgIF9yZWZFbG06IHJlZkVsbSB8fCBudWxsXG4gIH07XG4gIC8vIGNoZWNrIGlubGluZS10ZW1wbGF0ZSByZW5kZXIgZnVuY3Rpb25zXG4gIHZhciBpbmxpbmVUZW1wbGF0ZSA9IHZub2RlLmRhdGEuaW5saW5lVGVtcGxhdGU7XG4gIGlmIChpc0RlZihpbmxpbmVUZW1wbGF0ZSkpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IGlubGluZVRlbXBsYXRlLnJlbmRlcjtcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGlubGluZVRlbXBsYXRlLnN0YXRpY1JlbmRlckZucztcbiAgfVxuICByZXR1cm4gbmV3IHZub2RlLmNvbXBvbmVudE9wdGlvbnMuQ3RvcihvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBpbnN0YWxsQ29tcG9uZW50SG9va3MgKGRhdGEpIHtcbiAgdmFyIGhvb2tzID0gZGF0YS5ob29rIHx8IChkYXRhLmhvb2sgPSB7fSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3NUb01lcmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGhvb2tzVG9NZXJnZVtpXTtcbiAgICBob29rc1trZXldID0gY29tcG9uZW50Vk5vZGVIb29rc1trZXldO1xuICB9XG59XG5cbi8vIHRyYW5zZm9ybSBjb21wb25lbnQgdi1tb2RlbCBpbmZvICh2YWx1ZSBhbmQgY2FsbGJhY2spIGludG9cbi8vIHByb3AgYW5kIGV2ZW50IGhhbmRsZXIgcmVzcGVjdGl2ZWx5LlxuZnVuY3Rpb24gdHJhbnNmb3JtTW9kZWwgKG9wdGlvbnMsIGRhdGEpIHtcbiAgdmFyIHByb3AgPSAob3B0aW9ucy5tb2RlbCAmJiBvcHRpb25zLm1vZGVsLnByb3ApIHx8ICd2YWx1ZSc7XG4gIHZhciBldmVudCA9IChvcHRpb25zLm1vZGVsICYmIG9wdGlvbnMubW9kZWwuZXZlbnQpIHx8ICdpbnB1dCc7KGRhdGEucHJvcHMgfHwgKGRhdGEucHJvcHMgPSB7fSkpW3Byb3BdID0gZGF0YS5tb2RlbC52YWx1ZTtcbiAgdmFyIG9uID0gZGF0YS5vbiB8fCAoZGF0YS5vbiA9IHt9KTtcbiAgaWYgKGlzRGVmKG9uW2V2ZW50XSkpIHtcbiAgICBvbltldmVudF0gPSBbZGF0YS5tb2RlbC5jYWxsYmFja10uY29uY2F0KG9uW2V2ZW50XSk7XG4gIH0gZWxzZSB7XG4gICAgb25bZXZlbnRdID0gZGF0YS5tb2RlbC5jYWxsYmFjaztcbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIFNJTVBMRV9OT1JNQUxJWkUgPSAxO1xudmFyIEFMV0FZU19OT1JNQUxJWkUgPSAyO1xuXG4vLyB3cmFwcGVyIGZ1bmN0aW9uIGZvciBwcm92aWRpbmcgYSBtb3JlIGZsZXhpYmxlIGludGVyZmFjZVxuLy8gd2l0aG91dCBnZXR0aW5nIHllbGxlZCBhdCBieSBmbG93XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50IChcbiAgY29udGV4dCxcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgbm9ybWFsaXphdGlvblR5cGUsXG4gIGFsd2F5c05vcm1hbGl6ZVxuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpIHx8IGlzUHJpbWl0aXZlKGRhdGEpKSB7XG4gICAgbm9ybWFsaXphdGlvblR5cGUgPSBjaGlsZHJlbjtcbiAgICBjaGlsZHJlbiA9IGRhdGE7XG4gICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoaXNUcnVlKGFsd2F5c05vcm1hbGl6ZSkpIHtcbiAgICBub3JtYWxpemF0aW9uVHlwZSA9IEFMV0FZU19OT1JNQUxJWkU7XG4gIH1cbiAgcmV0dXJuIF9jcmVhdGVFbGVtZW50KGNvbnRleHQsIHRhZywgZGF0YSwgY2hpbGRyZW4sIG5vcm1hbGl6YXRpb25UeXBlKVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlRWxlbWVudCAoXG4gIGNvbnRleHQsXG4gIHRhZyxcbiAgZGF0YSxcbiAgY2hpbGRyZW4sXG4gIG5vcm1hbGl6YXRpb25UeXBlXG4pIHtcbiAgaWYgKGlzRGVmKGRhdGEpICYmIGlzRGVmKChkYXRhKS5fX29iX18pKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgXCJBdm9pZCB1c2luZyBvYnNlcnZlZCBkYXRhIG9iamVjdCBhcyB2bm9kZSBkYXRhOiBcIiArIChKU09OLnN0cmluZ2lmeShkYXRhKSkgKyBcIlxcblwiICtcbiAgICAgICdBbHdheXMgY3JlYXRlIGZyZXNoIHZub2RlIGRhdGEgb2JqZWN0cyBpbiBlYWNoIHJlbmRlciEnLFxuICAgICAgY29udGV4dFxuICAgICk7XG4gICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICB9XG4gIC8vIG9iamVjdCBzeW50YXggaW4gdi1iaW5kXG4gIGlmIChpc0RlZihkYXRhKSAmJiBpc0RlZihkYXRhLmlzKSkge1xuICAgIHRhZyA9IGRhdGEuaXM7XG4gIH1cbiAgaWYgKCF0YWcpIHtcbiAgICAvLyBpbiBjYXNlIG9mIGNvbXBvbmVudCA6aXMgc2V0IHRvIGZhbHN5IHZhbHVlXG4gICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICB9XG4gIC8vIHdhcm4gYWdhaW5zdCBub24tcHJpbWl0aXZlIGtleVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIGlzRGVmKGRhdGEpICYmIGlzRGVmKGRhdGEua2V5KSAmJiAhaXNQcmltaXRpdmUoZGF0YS5rZXkpXG4gICkge1xuICAgIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdBdm9pZCB1c2luZyBub24tcHJpbWl0aXZlIHZhbHVlIGFzIGtleSwgJyArXG4gICAgICAgICd1c2Ugc3RyaW5nL251bWJlciB2YWx1ZSBpbnN0ZWFkLicsXG4gICAgICAgIGNvbnRleHRcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIC8vIHN1cHBvcnQgc2luZ2xlIGZ1bmN0aW9uIGNoaWxkcmVuIGFzIGRlZmF1bHQgc2NvcGVkIHNsb3RcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmXG4gICAgdHlwZW9mIGNoaWxkcmVuWzBdID09PSAnZnVuY3Rpb24nXG4gICkge1xuICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIGRhdGEuc2NvcGVkU2xvdHMgPSB7IGRlZmF1bHQ6IGNoaWxkcmVuWzBdIH07XG4gICAgY2hpbGRyZW4ubGVuZ3RoID0gMDtcbiAgfVxuICBpZiAobm9ybWFsaXphdGlvblR5cGUgPT09IEFMV0FZU19OT1JNQUxJWkUpIHtcbiAgICBjaGlsZHJlbiA9IG5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKTtcbiAgfSBlbHNlIGlmIChub3JtYWxpemF0aW9uVHlwZSA9PT0gU0lNUExFX05PUk1BTElaRSkge1xuICAgIGNoaWxkcmVuID0gc2ltcGxlTm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICB9XG4gIHZhciB2bm9kZSwgbnM7XG4gIGlmICh0eXBlb2YgdGFnID09PSAnc3RyaW5nJykge1xuICAgIHZhciBDdG9yO1xuICAgIG5zID0gKGNvbnRleHQuJHZub2RlICYmIGNvbnRleHQuJHZub2RlLm5zKSB8fCBjb25maWcuZ2V0VGFnTmFtZXNwYWNlKHRhZyk7XG4gICAgaWYgKGNvbmZpZy5pc1Jlc2VydmVkVGFnKHRhZykpIHtcbiAgICAgIC8vIHBsYXRmb3JtIGJ1aWx0LWluIGVsZW1lbnRzXG4gICAgICB2bm9kZSA9IG5ldyBWTm9kZShcbiAgICAgICAgY29uZmlnLnBhcnNlUGxhdGZvcm1UYWdOYW1lKHRhZyksIGRhdGEsIGNoaWxkcmVuLFxuICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29udGV4dFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzRGVmKEN0b3IgPSByZXNvbHZlQXNzZXQoY29udGV4dC4kb3B0aW9ucywgJ2NvbXBvbmVudHMnLCB0YWcpKSkge1xuICAgICAgLy8gY29tcG9uZW50XG4gICAgICB2bm9kZSA9IGNyZWF0ZUNvbXBvbmVudChDdG9yLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbiwgdGFnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdW5rbm93biBvciB1bmxpc3RlZCBuYW1lc3BhY2VkIGVsZW1lbnRzXG4gICAgICAvLyBjaGVjayBhdCBydW50aW1lIGJlY2F1c2UgaXQgbWF5IGdldCBhc3NpZ25lZCBhIG5hbWVzcGFjZSB3aGVuIGl0c1xuICAgICAgLy8gcGFyZW50IG5vcm1hbGl6ZXMgY2hpbGRyZW5cbiAgICAgIHZub2RlID0gbmV3IFZOb2RlKFxuICAgICAgICB0YWcsIGRhdGEsIGNoaWxkcmVuLFxuICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29udGV4dFxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gZGlyZWN0IGNvbXBvbmVudCBvcHRpb25zIC8gY29uc3RydWN0b3JcbiAgICB2bm9kZSA9IGNyZWF0ZUNvbXBvbmVudCh0YWcsIGRhdGEsIGNvbnRleHQsIGNoaWxkcmVuKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICByZXR1cm4gdm5vZGVcbiAgfSBlbHNlIGlmIChpc0RlZih2bm9kZSkpIHtcbiAgICBpZiAoaXNEZWYobnMpKSB7IGFwcGx5TlModm5vZGUsIG5zKTsgfVxuICAgIGlmIChpc0RlZihkYXRhKSkgeyByZWdpc3RlckRlZXBCaW5kaW5ncyhkYXRhKTsgfVxuICAgIHJldHVybiB2bm9kZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjcmVhdGVFbXB0eVZOb2RlKClcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseU5TICh2bm9kZSwgbnMsIGZvcmNlKSB7XG4gIHZub2RlLm5zID0gbnM7XG4gIGlmICh2bm9kZS50YWcgPT09ICdmb3JlaWduT2JqZWN0Jykge1xuICAgIC8vIHVzZSBkZWZhdWx0IG5hbWVzcGFjZSBpbnNpZGUgZm9yZWlnbk9iamVjdFxuICAgIG5zID0gdW5kZWZpbmVkO1xuICAgIGZvcmNlID0gdHJ1ZTtcbiAgfVxuICBpZiAoaXNEZWYodm5vZGUuY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IHZub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgaWYgKGlzRGVmKGNoaWxkLnRhZykgJiYgKFxuICAgICAgICBpc1VuZGVmKGNoaWxkLm5zKSB8fCAoaXNUcnVlKGZvcmNlKSAmJiBjaGlsZC50YWcgIT09ICdzdmcnKSkpIHtcbiAgICAgICAgYXBwbHlOUyhjaGlsZCwgbnMsIGZvcmNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gcmVmICM1MzE4XG4vLyBuZWNlc3NhcnkgdG8gZW5zdXJlIHBhcmVudCByZS1yZW5kZXIgd2hlbiBkZWVwIGJpbmRpbmdzIGxpa2UgOnN0eWxlIGFuZFxuLy8gOmNsYXNzIGFyZSB1c2VkIG9uIHNsb3Qgbm9kZXNcbmZ1bmN0aW9uIHJlZ2lzdGVyRGVlcEJpbmRpbmdzIChkYXRhKSB7XG4gIGlmIChpc09iamVjdChkYXRhLnN0eWxlKSkge1xuICAgIHRyYXZlcnNlKGRhdGEuc3R5bGUpO1xuICB9XG4gIGlmIChpc09iamVjdChkYXRhLmNsYXNzKSkge1xuICAgIHRyYXZlcnNlKGRhdGEuY2xhc3MpO1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0UmVuZGVyICh2bSkge1xuICB2bS5fdm5vZGUgPSBudWxsOyAvLyB0aGUgcm9vdCBvZiB0aGUgY2hpbGQgdHJlZVxuICB2bS5fc3RhdGljVHJlZXMgPSBudWxsOyAvLyB2LW9uY2UgY2FjaGVkIHRyZWVzXG4gIHZhciBvcHRpb25zID0gdm0uJG9wdGlvbnM7XG4gIHZhciBwYXJlbnRWbm9kZSA9IHZtLiR2bm9kZSA9IG9wdGlvbnMuX3BhcmVudFZub2RlOyAvLyB0aGUgcGxhY2Vob2xkZXIgbm9kZSBpbiBwYXJlbnQgdHJlZVxuICB2YXIgcmVuZGVyQ29udGV4dCA9IHBhcmVudFZub2RlICYmIHBhcmVudFZub2RlLmNvbnRleHQ7XG4gIHZtLiRzbG90cyA9IHJlc29sdmVTbG90cyhvcHRpb25zLl9yZW5kZXJDaGlsZHJlbiwgcmVuZGVyQ29udGV4dCk7XG4gIHZtLiRzY29wZWRTbG90cyA9IGVtcHR5T2JqZWN0O1xuICAvLyBiaW5kIHRoZSBjcmVhdGVFbGVtZW50IGZuIHRvIHRoaXMgaW5zdGFuY2VcbiAgLy8gc28gdGhhdCB3ZSBnZXQgcHJvcGVyIHJlbmRlciBjb250ZXh0IGluc2lkZSBpdC5cbiAgLy8gYXJncyBvcmRlcjogdGFnLCBkYXRhLCBjaGlsZHJlbiwgbm9ybWFsaXphdGlvblR5cGUsIGFsd2F5c05vcm1hbGl6ZVxuICAvLyBpbnRlcm5hbCB2ZXJzaW9uIGlzIHVzZWQgYnkgcmVuZGVyIGZ1bmN0aW9ucyBjb21waWxlZCBmcm9tIHRlbXBsYXRlc1xuICB2bS5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KHZtLCBhLCBiLCBjLCBkLCBmYWxzZSk7IH07XG4gIC8vIG5vcm1hbGl6YXRpb24gaXMgYWx3YXlzIGFwcGxpZWQgZm9yIHRoZSBwdWJsaWMgdmVyc2lvbiwgdXNlZCBpblxuICAvLyB1c2VyLXdyaXR0ZW4gcmVuZGVyIGZ1bmN0aW9ucy5cbiAgdm0uJGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudCh2bSwgYSwgYiwgYywgZCwgdHJ1ZSk7IH07XG5cbiAgLy8gJGF0dHJzICYgJGxpc3RlbmVycyBhcmUgZXhwb3NlZCBmb3IgZWFzaWVyIEhPQyBjcmVhdGlvbi5cbiAgLy8gdGhleSBuZWVkIHRvIGJlIHJlYWN0aXZlIHNvIHRoYXQgSE9DcyB1c2luZyB0aGVtIGFyZSBhbHdheXMgdXBkYXRlZFxuICB2YXIgcGFyZW50RGF0YSA9IHBhcmVudFZub2RlICYmIHBhcmVudFZub2RlLmRhdGE7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBkZWZpbmVSZWFjdGl2ZSh2bSwgJyRhdHRycycsIHBhcmVudERhdGEgJiYgcGFyZW50RGF0YS5hdHRycyB8fCBlbXB0eU9iamVjdCwgZnVuY3Rpb24gKCkge1xuICAgICAgIWlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCAmJiB3YXJuKFwiJGF0dHJzIGlzIHJlYWRvbmx5LlwiLCB2bSk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgZGVmaW5lUmVhY3RpdmUodm0sICckbGlzdGVuZXJzJywgb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzIHx8IGVtcHR5T2JqZWN0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAhaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50ICYmIHdhcm4oXCIkbGlzdGVuZXJzIGlzIHJlYWRvbmx5LlwiLCB2bSk7XG4gICAgfSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZGVmaW5lUmVhY3RpdmUodm0sICckYXR0cnMnLCBwYXJlbnREYXRhICYmIHBhcmVudERhdGEuYXR0cnMgfHwgZW1wdHlPYmplY3QsIG51bGwsIHRydWUpO1xuICAgIGRlZmluZVJlYWN0aXZlKHZtLCAnJGxpc3RlbmVycycsIG9wdGlvbnMuX3BhcmVudExpc3RlbmVycyB8fCBlbXB0eU9iamVjdCwgbnVsbCwgdHJ1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyTWl4aW4gKFZ1ZSkge1xuICAvLyBpbnN0YWxsIHJ1bnRpbWUgY29udmVuaWVuY2UgaGVscGVyc1xuICBpbnN0YWxsUmVuZGVySGVscGVycyhWdWUucHJvdG90eXBlKTtcblxuICBWdWUucHJvdG90eXBlLiRuZXh0VGljayA9IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiBuZXh0VGljayhmbiwgdGhpcylcbiAgfTtcblxuICBWdWUucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICB2YXIgcmVmID0gdm0uJG9wdGlvbnM7XG4gICAgdmFyIHJlbmRlciA9IHJlZi5yZW5kZXI7XG4gICAgdmFyIF9wYXJlbnRWbm9kZSA9IHJlZi5fcGFyZW50Vm5vZGU7XG5cbiAgICAvLyByZXNldCBfcmVuZGVyZWQgZmxhZyBvbiBzbG90cyBmb3IgZHVwbGljYXRlIHNsb3QgY2hlY2tcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgZm9yICh2YXIga2V5IGluIHZtLiRzbG90cykge1xuICAgICAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICAgICAgdm0uJHNsb3RzW2tleV0uX3JlbmRlcmVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKF9wYXJlbnRWbm9kZSkge1xuICAgICAgdm0uJHNjb3BlZFNsb3RzID0gX3BhcmVudFZub2RlLmRhdGEuc2NvcGVkU2xvdHMgfHwgZW1wdHlPYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gc2V0IHBhcmVudCB2bm9kZS4gdGhpcyBhbGxvd3MgcmVuZGVyIGZ1bmN0aW9ucyB0byBoYXZlIGFjY2Vzc1xuICAgIC8vIHRvIHRoZSBkYXRhIG9uIHRoZSBwbGFjZWhvbGRlciBub2RlLlxuICAgIHZtLiR2bm9kZSA9IF9wYXJlbnRWbm9kZTtcbiAgICAvLyByZW5kZXIgc2VsZlxuICAgIHZhciB2bm9kZTtcbiAgICB0cnkge1xuICAgICAgdm5vZGUgPSByZW5kZXIuY2FsbCh2bS5fcmVuZGVyUHJveHksIHZtLiRjcmVhdGVFbGVtZW50KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJyZW5kZXJcIik7XG4gICAgICAvLyByZXR1cm4gZXJyb3IgcmVuZGVyIHJlc3VsdCxcbiAgICAgIC8vIG9yIHByZXZpb3VzIHZub2RlIHRvIHByZXZlbnQgcmVuZGVyIGVycm9yIGNhdXNpbmcgYmxhbmsgY29tcG9uZW50XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKHZtLiRvcHRpb25zLnJlbmRlckVycm9yKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZub2RlID0gdm0uJG9wdGlvbnMucmVuZGVyRXJyb3IuY2FsbCh2bS5fcmVuZGVyUHJveHksIHZtLiRjcmVhdGVFbGVtZW50LCBlKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJyZW5kZXJFcnJvclwiKTtcbiAgICAgICAgICAgIHZub2RlID0gdm0uX3Zub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2bm9kZSA9IHZtLl92bm9kZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiBlbXB0eSB2bm9kZSBpbiBjYXNlIHRoZSByZW5kZXIgZnVuY3Rpb24gZXJyb3JlZCBvdXRcbiAgICBpZiAoISh2bm9kZSBpbnN0YW5jZW9mIFZOb2RlKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnTXVsdGlwbGUgcm9vdCBub2RlcyByZXR1cm5lZCBmcm9tIHJlbmRlciBmdW5jdGlvbi4gUmVuZGVyIGZ1bmN0aW9uICcgK1xuICAgICAgICAgICdzaG91bGQgcmV0dXJuIGEgc2luZ2xlIHJvb3Qgbm9kZS4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB2bm9kZSA9IGNyZWF0ZUVtcHR5Vk5vZGUoKTtcbiAgICB9XG4gICAgLy8gc2V0IHBhcmVudFxuICAgIHZub2RlLnBhcmVudCA9IF9wYXJlbnRWbm9kZTtcbiAgICByZXR1cm4gdm5vZGVcbiAgfTtcbn1cblxuLyogICovXG5cbnZhciB1aWQkMyA9IDA7XG5cbmZ1bmN0aW9uIGluaXRNaXhpbiAoVnVlKSB7XG4gIFZ1ZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgLy8gYSB1aWRcbiAgICB2bS5fdWlkID0gdWlkJDMrKztcblxuICAgIHZhciBzdGFydFRhZywgZW5kVGFnO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBtYXJrKSB7XG4gICAgICBzdGFydFRhZyA9IFwidnVlLXBlcmYtc3RhcnQ6XCIgKyAodm0uX3VpZCk7XG4gICAgICBlbmRUYWcgPSBcInZ1ZS1wZXJmLWVuZDpcIiArICh2bS5fdWlkKTtcbiAgICAgIG1hcmsoc3RhcnRUYWcpO1xuICAgIH1cblxuICAgIC8vIGEgZmxhZyB0byBhdm9pZCB0aGlzIGJlaW5nIG9ic2VydmVkXG4gICAgdm0uX2lzVnVlID0gdHJ1ZTtcbiAgICAvLyBtZXJnZSBvcHRpb25zXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5faXNDb21wb25lbnQpIHtcbiAgICAgIC8vIG9wdGltaXplIGludGVybmFsIGNvbXBvbmVudCBpbnN0YW50aWF0aW9uXG4gICAgICAvLyBzaW5jZSBkeW5hbWljIG9wdGlvbnMgbWVyZ2luZyBpcyBwcmV0dHkgc2xvdywgYW5kIG5vbmUgb2YgdGhlXG4gICAgICAvLyBpbnRlcm5hbCBjb21wb25lbnQgb3B0aW9ucyBuZWVkcyBzcGVjaWFsIHRyZWF0bWVudC5cbiAgICAgIGluaXRJbnRlcm5hbENvbXBvbmVudCh2bSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLiRvcHRpb25zID0gbWVyZ2VPcHRpb25zKFxuICAgICAgICByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKHZtLmNvbnN0cnVjdG9yKSxcbiAgICAgICAgb3B0aW9ucyB8fCB7fSxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGluaXRQcm94eSh2bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IHZtO1xuICAgIH1cbiAgICAvLyBleHBvc2UgcmVhbCBzZWxmXG4gICAgdm0uX3NlbGYgPSB2bTtcbiAgICBpbml0TGlmZWN5Y2xlKHZtKTtcbiAgICBpbml0RXZlbnRzKHZtKTtcbiAgICBpbml0UmVuZGVyKHZtKTtcbiAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZUNyZWF0ZScpO1xuICAgIGluaXRJbmplY3Rpb25zKHZtKTsgLy8gcmVzb2x2ZSBpbmplY3Rpb25zIGJlZm9yZSBkYXRhL3Byb3BzXG4gICAgaW5pdFN0YXRlKHZtKTtcbiAgICBpbml0UHJvdmlkZSh2bSk7IC8vIHJlc29sdmUgcHJvdmlkZSBhZnRlciBkYXRhL3Byb3BzXG4gICAgY2FsbEhvb2sodm0sICdjcmVhdGVkJyk7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcucGVyZm9ybWFuY2UgJiYgbWFyaykge1xuICAgICAgdm0uX25hbWUgPSBmb3JtYXRDb21wb25lbnROYW1lKHZtLCBmYWxzZSk7XG4gICAgICBtYXJrKGVuZFRhZyk7XG4gICAgICBtZWFzdXJlKChcInZ1ZSBcIiArICh2bS5fbmFtZSkgKyBcIiBpbml0XCIpLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICB9XG5cbiAgICBpZiAodm0uJG9wdGlvbnMuZWwpIHtcbiAgICAgIHZtLiRtb3VudCh2bS4kb3B0aW9ucy5lbCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbml0SW50ZXJuYWxDb21wb25lbnQgKHZtLCBvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gdm0uJG9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHZtLmNvbnN0cnVjdG9yLm9wdGlvbnMpO1xuICAvLyBkb2luZyB0aGlzIGJlY2F1c2UgaXQncyBmYXN0ZXIgdGhhbiBkeW5hbWljIGVudW1lcmF0aW9uLlxuICB2YXIgcGFyZW50Vm5vZGUgPSBvcHRpb25zLl9wYXJlbnRWbm9kZTtcbiAgb3B0cy5wYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcbiAgb3B0cy5fcGFyZW50Vm5vZGUgPSBwYXJlbnRWbm9kZTtcbiAgb3B0cy5fcGFyZW50RWxtID0gb3B0aW9ucy5fcGFyZW50RWxtO1xuICBvcHRzLl9yZWZFbG0gPSBvcHRpb25zLl9yZWZFbG07XG5cbiAgdmFyIHZub2RlQ29tcG9uZW50T3B0aW9ucyA9IHBhcmVudFZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gIG9wdHMucHJvcHNEYXRhID0gdm5vZGVDb21wb25lbnRPcHRpb25zLnByb3BzRGF0YTtcbiAgb3B0cy5fcGFyZW50TGlzdGVuZXJzID0gdm5vZGVDb21wb25lbnRPcHRpb25zLmxpc3RlbmVycztcbiAgb3B0cy5fcmVuZGVyQ2hpbGRyZW4gPSB2bm9kZUNvbXBvbmVudE9wdGlvbnMuY2hpbGRyZW47XG4gIG9wdHMuX2NvbXBvbmVudFRhZyA9IHZub2RlQ29tcG9uZW50T3B0aW9ucy50YWc7XG5cbiAgaWYgKG9wdGlvbnMucmVuZGVyKSB7XG4gICAgb3B0cy5yZW5kZXIgPSBvcHRpb25zLnJlbmRlcjtcbiAgICBvcHRzLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMgKEN0b3IpIHtcbiAgdmFyIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnM7XG4gIGlmIChDdG9yLnN1cGVyKSB7XG4gICAgdmFyIHN1cGVyT3B0aW9ucyA9IHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMoQ3Rvci5zdXBlcik7XG4gICAgdmFyIGNhY2hlZFN1cGVyT3B0aW9ucyA9IEN0b3Iuc3VwZXJPcHRpb25zO1xuICAgIGlmIChzdXBlck9wdGlvbnMgIT09IGNhY2hlZFN1cGVyT3B0aW9ucykge1xuICAgICAgLy8gc3VwZXIgb3B0aW9uIGNoYW5nZWQsXG4gICAgICAvLyBuZWVkIHRvIHJlc29sdmUgbmV3IG9wdGlvbnMuXG4gICAgICBDdG9yLnN1cGVyT3B0aW9ucyA9IHN1cGVyT3B0aW9ucztcbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBhbnkgbGF0ZS1tb2RpZmllZC9hdHRhY2hlZCBvcHRpb25zICgjNDk3NilcbiAgICAgIHZhciBtb2RpZmllZE9wdGlvbnMgPSByZXNvbHZlTW9kaWZpZWRPcHRpb25zKEN0b3IpO1xuICAgICAgLy8gdXBkYXRlIGJhc2UgZXh0ZW5kIG9wdGlvbnNcbiAgICAgIGlmIChtb2RpZmllZE9wdGlvbnMpIHtcbiAgICAgICAgZXh0ZW5kKEN0b3IuZXh0ZW5kT3B0aW9ucywgbW9kaWZpZWRPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoc3VwZXJPcHRpb25zLCBDdG9yLmV4dGVuZE9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMubmFtZSkge1xuICAgICAgICBvcHRpb25zLmNvbXBvbmVudHNbb3B0aW9ucy5uYW1lXSA9IEN0b3I7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvcHRpb25zXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVNb2RpZmllZE9wdGlvbnMgKEN0b3IpIHtcbiAgdmFyIG1vZGlmaWVkO1xuICB2YXIgbGF0ZXN0ID0gQ3Rvci5vcHRpb25zO1xuICB2YXIgZXh0ZW5kZWQgPSBDdG9yLmV4dGVuZE9wdGlvbnM7XG4gIHZhciBzZWFsZWQgPSBDdG9yLnNlYWxlZE9wdGlvbnM7XG4gIGZvciAodmFyIGtleSBpbiBsYXRlc3QpIHtcbiAgICBpZiAobGF0ZXN0W2tleV0gIT09IHNlYWxlZFtrZXldKSB7XG4gICAgICBpZiAoIW1vZGlmaWVkKSB7IG1vZGlmaWVkID0ge307IH1cbiAgICAgIG1vZGlmaWVkW2tleV0gPSBkZWR1cGUobGF0ZXN0W2tleV0sIGV4dGVuZGVkW2tleV0sIHNlYWxlZFtrZXldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1vZGlmaWVkXG59XG5cbmZ1bmN0aW9uIGRlZHVwZSAobGF0ZXN0LCBleHRlbmRlZCwgc2VhbGVkKSB7XG4gIC8vIGNvbXBhcmUgbGF0ZXN0IGFuZCBzZWFsZWQgdG8gZW5zdXJlIGxpZmVjeWNsZSBob29rcyB3b24ndCBiZSBkdXBsaWNhdGVkXG4gIC8vIGJldHdlZW4gbWVyZ2VzXG4gIGlmIChBcnJheS5pc0FycmF5KGxhdGVzdCkpIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgc2VhbGVkID0gQXJyYXkuaXNBcnJheShzZWFsZWQpID8gc2VhbGVkIDogW3NlYWxlZF07XG4gICAgZXh0ZW5kZWQgPSBBcnJheS5pc0FycmF5KGV4dGVuZGVkKSA/IGV4dGVuZGVkIDogW2V4dGVuZGVkXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGVzdC5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gcHVzaCBvcmlnaW5hbCBvcHRpb25zIGFuZCBub3Qgc2VhbGVkIG9wdGlvbnMgdG8gZXhjbHVkZSBkdXBsaWNhdGVkIG9wdGlvbnNcbiAgICAgIGlmIChleHRlbmRlZC5pbmRleE9mKGxhdGVzdFtpXSkgPj0gMCB8fCBzZWFsZWQuaW5kZXhPZihsYXRlc3RbaV0pIDwgMCkge1xuICAgICAgICByZXMucHVzaChsYXRlc3RbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxhdGVzdFxuICB9XG59XG5cbmZ1bmN0aW9uIFZ1ZSAob3B0aW9ucykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICEodGhpcyBpbnN0YW5jZW9mIFZ1ZSlcbiAgKSB7XG4gICAgd2FybignVnVlIGlzIGEgY29uc3RydWN0b3IgYW5kIHNob3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgYG5ld2Aga2V5d29yZCcpO1xuICB9XG4gIHRoaXMuX2luaXQob3B0aW9ucyk7XG59XG5cbmluaXRNaXhpbihWdWUpO1xuc3RhdGVNaXhpbihWdWUpO1xuZXZlbnRzTWl4aW4oVnVlKTtcbmxpZmVjeWNsZU1peGluKFZ1ZSk7XG5yZW5kZXJNaXhpbihWdWUpO1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdFVzZSAoVnVlKSB7XG4gIFZ1ZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgdmFyIGluc3RhbGxlZFBsdWdpbnMgPSAodGhpcy5faW5zdGFsbGVkUGx1Z2lucyB8fCAodGhpcy5faW5zdGFsbGVkUGx1Z2lucyA9IFtdKSk7XG4gICAgaWYgKGluc3RhbGxlZFBsdWdpbnMuaW5kZXhPZihwbHVnaW4pID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLy8gYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG4gICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgYXJncy51bnNoaWZ0KHRoaXMpO1xuICAgIGlmICh0eXBlb2YgcGx1Z2luLmluc3RhbGwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHBsdWdpbi5pbnN0YWxsLmFwcGx5KHBsdWdpbiwgYXJncyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwbHVnaW4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICAgIGluc3RhbGxlZFBsdWdpbnMucHVzaChwbHVnaW4pO1xuICAgIHJldHVybiB0aGlzXG4gIH07XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0TWl4aW4kMSAoVnVlKSB7XG4gIFZ1ZS5taXhpbiA9IGZ1bmN0aW9uIChtaXhpbikge1xuICAgIHRoaXMub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh0aGlzLm9wdGlvbnMsIG1peGluKTtcbiAgICByZXR1cm4gdGhpc1xuICB9O1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEV4dGVuZCAoVnVlKSB7XG4gIC8qKlxuICAgKiBFYWNoIGluc3RhbmNlIGNvbnN0cnVjdG9yLCBpbmNsdWRpbmcgVnVlLCBoYXMgYSB1bmlxdWVcbiAgICogY2lkLiBUaGlzIGVuYWJsZXMgdXMgdG8gY3JlYXRlIHdyYXBwZWQgXCJjaGlsZFxuICAgKiBjb25zdHJ1Y3RvcnNcIiBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZSBhbmQgY2FjaGUgdGhlbS5cbiAgICovXG4gIFZ1ZS5jaWQgPSAwO1xuICB2YXIgY2lkID0gMTtcblxuICAvKipcbiAgICogQ2xhc3MgaW5oZXJpdGFuY2VcbiAgICovXG4gIFZ1ZS5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5kT3B0aW9ucykge1xuICAgIGV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zIHx8IHt9O1xuICAgIHZhciBTdXBlciA9IHRoaXM7XG4gICAgdmFyIFN1cGVySWQgPSBTdXBlci5jaWQ7XG4gICAgdmFyIGNhY2hlZEN0b3JzID0gZXh0ZW5kT3B0aW9ucy5fQ3RvciB8fCAoZXh0ZW5kT3B0aW9ucy5fQ3RvciA9IHt9KTtcbiAgICBpZiAoY2FjaGVkQ3RvcnNbU3VwZXJJZF0pIHtcbiAgICAgIHJldHVybiBjYWNoZWRDdG9yc1tTdXBlcklkXVxuICAgIH1cblxuICAgIHZhciBuYW1lID0gZXh0ZW5kT3B0aW9ucy5uYW1lIHx8IFN1cGVyLm9wdGlvbnMubmFtZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBuYW1lKSB7XG4gICAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUobmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIFN1YiA9IGZ1bmN0aW9uIFZ1ZUNvbXBvbmVudCAob3B0aW9ucykge1xuICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICB9O1xuICAgIFN1Yi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyLnByb3RvdHlwZSk7XG4gICAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YjtcbiAgICBTdWIuY2lkID0gY2lkKys7XG4gICAgU3ViLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXG4gICAgICBTdXBlci5vcHRpb25zLFxuICAgICAgZXh0ZW5kT3B0aW9uc1xuICAgICk7XG4gICAgU3ViWydzdXBlciddID0gU3VwZXI7XG5cbiAgICAvLyBGb3IgcHJvcHMgYW5kIGNvbXB1dGVkIHByb3BlcnRpZXMsIHdlIGRlZmluZSB0aGUgcHJveHkgZ2V0dGVycyBvblxuICAgIC8vIHRoZSBWdWUgaW5zdGFuY2VzIGF0IGV4dGVuc2lvbiB0aW1lLCBvbiB0aGUgZXh0ZW5kZWQgcHJvdG90eXBlLiBUaGlzXG4gICAgLy8gYXZvaWRzIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxscyBmb3IgZWFjaCBpbnN0YW5jZSBjcmVhdGVkLlxuICAgIGlmIChTdWIub3B0aW9ucy5wcm9wcykge1xuICAgICAgaW5pdFByb3BzJDEoU3ViKTtcbiAgICB9XG4gICAgaWYgKFN1Yi5vcHRpb25zLmNvbXB1dGVkKSB7XG4gICAgICBpbml0Q29tcHV0ZWQkMShTdWIpO1xuICAgIH1cblxuICAgIC8vIGFsbG93IGZ1cnRoZXIgZXh0ZW5zaW9uL21peGluL3BsdWdpbiB1c2FnZVxuICAgIFN1Yi5leHRlbmQgPSBTdXBlci5leHRlbmQ7XG4gICAgU3ViLm1peGluID0gU3VwZXIubWl4aW47XG4gICAgU3ViLnVzZSA9IFN1cGVyLnVzZTtcblxuICAgIC8vIGNyZWF0ZSBhc3NldCByZWdpc3RlcnMsIHNvIGV4dGVuZGVkIGNsYXNzZXNcbiAgICAvLyBjYW4gaGF2ZSB0aGVpciBwcml2YXRlIGFzc2V0cyB0b28uXG4gICAgQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgU3ViW3R5cGVdID0gU3VwZXJbdHlwZV07XG4gICAgfSk7XG4gICAgLy8gZW5hYmxlIHJlY3Vyc2l2ZSBzZWxmLWxvb2t1cFxuICAgIGlmIChuYW1lKSB7XG4gICAgICBTdWIub3B0aW9ucy5jb21wb25lbnRzW25hbWVdID0gU3ViO1xuICAgIH1cblxuICAgIC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyIG9wdGlvbnMgYXQgZXh0ZW5zaW9uIHRpbWUuXG4gICAgLy8gbGF0ZXIgYXQgaW5zdGFudGlhdGlvbiB3ZSBjYW4gY2hlY2sgaWYgU3VwZXIncyBvcHRpb25zIGhhdmVcbiAgICAvLyBiZWVuIHVwZGF0ZWQuXG4gICAgU3ViLnN1cGVyT3B0aW9ucyA9IFN1cGVyLm9wdGlvbnM7XG4gICAgU3ViLmV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zO1xuICAgIFN1Yi5zZWFsZWRPcHRpb25zID0gZXh0ZW5kKHt9LCBTdWIub3B0aW9ucyk7XG5cbiAgICAvLyBjYWNoZSBjb25zdHJ1Y3RvclxuICAgIGNhY2hlZEN0b3JzW1N1cGVySWRdID0gU3ViO1xuICAgIHJldHVybiBTdWJcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdFByb3BzJDEgKENvbXApIHtcbiAgdmFyIHByb3BzID0gQ29tcC5vcHRpb25zLnByb3BzO1xuICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICBwcm94eShDb21wLnByb3RvdHlwZSwgXCJfcHJvcHNcIiwga2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0Q29tcHV0ZWQkMSAoQ29tcCkge1xuICB2YXIgY29tcHV0ZWQgPSBDb21wLm9wdGlvbnMuY29tcHV0ZWQ7XG4gIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgIGRlZmluZUNvbXB1dGVkKENvbXAucHJvdG90eXBlLCBrZXksIGNvbXB1dGVkW2tleV0pO1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0QXNzZXRSZWdpc3RlcnMgKFZ1ZSkge1xuICAvKipcbiAgICogQ3JlYXRlIGFzc2V0IHJlZ2lzdHJhdGlvbiBtZXRob2RzLlxuICAgKi9cbiAgQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIFZ1ZVt0eXBlXSA9IGZ1bmN0aW9uIChcbiAgICAgIGlkLFxuICAgICAgZGVmaW5pdGlvblxuICAgICkge1xuICAgICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZSA9PT0gJ2NvbXBvbmVudCcpIHtcbiAgICAgICAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUoaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnY29tcG9uZW50JyAmJiBpc1BsYWluT2JqZWN0KGRlZmluaXRpb24pKSB7XG4gICAgICAgICAgZGVmaW5pdGlvbi5uYW1lID0gZGVmaW5pdGlvbi5uYW1lIHx8IGlkO1xuICAgICAgICAgIGRlZmluaXRpb24gPSB0aGlzLm9wdGlvbnMuX2Jhc2UuZXh0ZW5kKGRlZmluaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnZGlyZWN0aXZlJyAmJiB0eXBlb2YgZGVmaW5pdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRlZmluaXRpb24gPSB7IGJpbmQ6IGRlZmluaXRpb24sIHVwZGF0ZTogZGVmaW5pdGlvbiB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF0gPSBkZWZpbml0aW9uO1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZSAob3B0cykge1xuICByZXR1cm4gb3B0cyAmJiAob3B0cy5DdG9yLm9wdGlvbnMubmFtZSB8fCBvcHRzLnRhZylcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAocGF0dGVybiwgbmFtZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShwYXR0ZXJuKSkge1xuICAgIHJldHVybiBwYXR0ZXJuLmluZGV4T2YobmFtZSkgPiAtMVxuICB9IGVsc2UgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KCcsJykuaW5kZXhPZihuYW1lKSA+IC0xXG4gIH0gZWxzZSBpZiAoaXNSZWdFeHAocGF0dGVybikpIHtcbiAgICByZXR1cm4gcGF0dGVybi50ZXN0KG5hbWUpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHBydW5lQ2FjaGUgKGtlZXBBbGl2ZUluc3RhbmNlLCBmaWx0ZXIpIHtcbiAgdmFyIGNhY2hlID0ga2VlcEFsaXZlSW5zdGFuY2UuY2FjaGU7XG4gIHZhciBrZXlzID0ga2VlcEFsaXZlSW5zdGFuY2Uua2V5cztcbiAgdmFyIF92bm9kZSA9IGtlZXBBbGl2ZUluc3RhbmNlLl92bm9kZTtcbiAgZm9yICh2YXIga2V5IGluIGNhY2hlKSB7XG4gICAgdmFyIGNhY2hlZE5vZGUgPSBjYWNoZVtrZXldO1xuICAgIGlmIChjYWNoZWROb2RlKSB7XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoY2FjaGVkTm9kZS5jb21wb25lbnRPcHRpb25zKTtcbiAgICAgIGlmIChuYW1lICYmICFmaWx0ZXIobmFtZSkpIHtcbiAgICAgICAgcHJ1bmVDYWNoZUVudHJ5KGNhY2hlLCBrZXksIGtleXMsIF92bm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBydW5lQ2FjaGVFbnRyeSAoXG4gIGNhY2hlLFxuICBrZXksXG4gIGtleXMsXG4gIGN1cnJlbnRcbikge1xuICB2YXIgY2FjaGVkJCQxID0gY2FjaGVba2V5XTtcbiAgaWYgKGNhY2hlZCQkMSAmJiAoIWN1cnJlbnQgfHwgY2FjaGVkJCQxLnRhZyAhPT0gY3VycmVudC50YWcpKSB7XG4gICAgY2FjaGVkJCQxLmNvbXBvbmVudEluc3RhbmNlLiRkZXN0cm95KCk7XG4gIH1cbiAgY2FjaGVba2V5XSA9IG51bGw7XG4gIHJlbW92ZShrZXlzLCBrZXkpO1xufVxuXG52YXIgcGF0dGVyblR5cGVzID0gW1N0cmluZywgUmVnRXhwLCBBcnJheV07XG5cbnZhciBLZWVwQWxpdmUgPSB7XG4gIG5hbWU6ICdrZWVwLWFsaXZlJyxcbiAgYWJzdHJhY3Q6IHRydWUsXG5cbiAgcHJvcHM6IHtcbiAgICBpbmNsdWRlOiBwYXR0ZXJuVHlwZXMsXG4gICAgZXhjbHVkZTogcGF0dGVyblR5cGVzLFxuICAgIG1heDogW1N0cmluZywgTnVtYmVyXVxuICB9LFxuXG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQgKCkge1xuICAgIHRoaXMuY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMua2V5cyA9IFtdO1xuICB9LFxuXG4gIGRlc3Ryb3llZDogZnVuY3Rpb24gZGVzdHJveWVkICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzJDEuY2FjaGUpIHtcbiAgICAgIHBydW5lQ2FjaGVFbnRyeSh0aGlzJDEuY2FjaGUsIGtleSwgdGhpcyQxLmtleXMpO1xuICAgIH1cbiAgfSxcblxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHRoaXMuJHdhdGNoKCdpbmNsdWRlJywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcHJ1bmVDYWNoZSh0aGlzJDEsIGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBtYXRjaGVzKHZhbCwgbmFtZSk7IH0pO1xuICAgIH0pO1xuICAgIHRoaXMuJHdhdGNoKCdleGNsdWRlJywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcHJ1bmVDYWNoZSh0aGlzJDEsIGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiAhbWF0Y2hlcyh2YWwsIG5hbWUpOyB9KTtcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgdmFyIHNsb3QgPSB0aGlzLiRzbG90cy5kZWZhdWx0O1xuICAgIHZhciB2bm9kZSA9IGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoc2xvdCk7XG4gICAgdmFyIGNvbXBvbmVudE9wdGlvbnMgPSB2bm9kZSAmJiB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xuICAgIGlmIChjb21wb25lbnRPcHRpb25zKSB7XG4gICAgICAvLyBjaGVjayBwYXR0ZXJuXG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoY29tcG9uZW50T3B0aW9ucyk7XG4gICAgICB2YXIgcmVmID0gdGhpcztcbiAgICAgIHZhciBpbmNsdWRlID0gcmVmLmluY2x1ZGU7XG4gICAgICB2YXIgZXhjbHVkZSA9IHJlZi5leGNsdWRlO1xuICAgICAgaWYgKFxuICAgICAgICAvLyBub3QgaW5jbHVkZWRcbiAgICAgICAgKGluY2x1ZGUgJiYgKCFuYW1lIHx8ICFtYXRjaGVzKGluY2x1ZGUsIG5hbWUpKSkgfHxcbiAgICAgICAgLy8gZXhjbHVkZWRcbiAgICAgICAgKGV4Y2x1ZGUgJiYgbmFtZSAmJiBtYXRjaGVzKGV4Y2x1ZGUsIG5hbWUpKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB2bm9kZVxuICAgICAgfVxuXG4gICAgICB2YXIgcmVmJDEgPSB0aGlzO1xuICAgICAgdmFyIGNhY2hlID0gcmVmJDEuY2FjaGU7XG4gICAgICB2YXIga2V5cyA9IHJlZiQxLmtleXM7XG4gICAgICB2YXIga2V5ID0gdm5vZGUua2V5ID09IG51bGxcbiAgICAgICAgLy8gc2FtZSBjb25zdHJ1Y3RvciBtYXkgZ2V0IHJlZ2lzdGVyZWQgYXMgZGlmZmVyZW50IGxvY2FsIGNvbXBvbmVudHNcbiAgICAgICAgLy8gc28gY2lkIGFsb25lIGlzIG5vdCBlbm91Z2ggKCMzMjY5KVxuICAgICAgICA/IGNvbXBvbmVudE9wdGlvbnMuQ3Rvci5jaWQgKyAoY29tcG9uZW50T3B0aW9ucy50YWcgPyAoXCI6OlwiICsgKGNvbXBvbmVudE9wdGlvbnMudGFnKSkgOiAnJylcbiAgICAgICAgOiB2bm9kZS5rZXk7XG4gICAgICBpZiAoY2FjaGVba2V5XSkge1xuICAgICAgICB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IGNhY2hlW2tleV0uY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIC8vIG1ha2UgY3VycmVudCBrZXkgZnJlc2hlc3RcbiAgICAgICAgcmVtb3ZlKGtleXMsIGtleSk7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FjaGVba2V5XSA9IHZub2RlO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgLy8gcHJ1bmUgb2xkZXN0IGVudHJ5XG4gICAgICAgIGlmICh0aGlzLm1heCAmJiBrZXlzLmxlbmd0aCA+IHBhcnNlSW50KHRoaXMubWF4KSkge1xuICAgICAgICAgIHBydW5lQ2FjaGVFbnRyeShjYWNoZSwga2V5c1swXSwga2V5cywgdGhpcy5fdm5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZub2RlLmRhdGEua2VlcEFsaXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZub2RlIHx8IChzbG90ICYmIHNsb3RbMF0pXG4gIH1cbn1cblxudmFyIGJ1aWx0SW5Db21wb25lbnRzID0ge1xuICBLZWVwQWxpdmU6IEtlZXBBbGl2ZVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEdsb2JhbEFQSSAoVnVlKSB7XG4gIC8vIGNvbmZpZ1xuICB2YXIgY29uZmlnRGVmID0ge307XG4gIGNvbmZpZ0RlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25maWc7IH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uZmlnRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdEbyBub3QgcmVwbGFjZSB0aGUgVnVlLmNvbmZpZyBvYmplY3QsIHNldCBpbmRpdmlkdWFsIGZpZWxkcyBpbnN0ZWFkLidcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLCAnY29uZmlnJywgY29uZmlnRGVmKTtcblxuICAvLyBleHBvc2VkIHV0aWwgbWV0aG9kcy5cbiAgLy8gTk9URTogdGhlc2UgYXJlIG5vdCBjb25zaWRlcmVkIHBhcnQgb2YgdGhlIHB1YmxpYyBBUEkgLSBhdm9pZCByZWx5aW5nIG9uXG4gIC8vIHRoZW0gdW5sZXNzIHlvdSBhcmUgYXdhcmUgb2YgdGhlIHJpc2suXG4gIFZ1ZS51dGlsID0ge1xuICAgIHdhcm46IHdhcm4sXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgbWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXG4gICAgZGVmaW5lUmVhY3RpdmU6IGRlZmluZVJlYWN0aXZlXG4gIH07XG5cbiAgVnVlLnNldCA9IHNldDtcbiAgVnVlLmRlbGV0ZSA9IGRlbDtcbiAgVnVlLm5leHRUaWNrID0gbmV4dFRpY2s7XG5cbiAgVnVlLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgVnVlLm9wdGlvbnNbdHlwZSArICdzJ10gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9KTtcblxuICAvLyB0aGlzIGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIFwiYmFzZVwiIGNvbnN0cnVjdG9yIHRvIGV4dGVuZCBhbGwgcGxhaW4tb2JqZWN0XG4gIC8vIGNvbXBvbmVudHMgd2l0aCBpbiBXZWV4J3MgbXVsdGktaW5zdGFuY2Ugc2NlbmFyaW9zLlxuICBWdWUub3B0aW9ucy5fYmFzZSA9IFZ1ZTtcblxuICBleHRlbmQoVnVlLm9wdGlvbnMuY29tcG9uZW50cywgYnVpbHRJbkNvbXBvbmVudHMpO1xuXG4gIGluaXRVc2UoVnVlKTtcbiAgaW5pdE1peGluJDEoVnVlKTtcbiAgaW5pdEV4dGVuZChWdWUpO1xuICBpbml0QXNzZXRSZWdpc3RlcnMoVnVlKTtcbn1cblxuaW5pdEdsb2JhbEFQSShWdWUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRpc1NlcnZlcicsIHtcbiAgZ2V0OiBpc1NlcnZlclJlbmRlcmluZ1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJHNzckNvbnRleHQnLCB7XG4gIGdldDogZnVuY3Rpb24gZ2V0ICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiB0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0XG4gIH1cbn0pO1xuXG4vLyBleHBvc2UgRnVuY3Rpb25hbFJlbmRlckNvbnRleHQgZm9yIHNzciBydW50aW1lIGhlbHBlciBpbnN0YWxsYXRpb25cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUsICdGdW5jdGlvbmFsUmVuZGVyQ29udGV4dCcsIHtcbiAgdmFsdWU6IEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0XG59KTtcblxuVnVlLnZlcnNpb24gPSAnMi41LjE2JztcblxuLyogICovXG5cbi8vIHRoZXNlIGFyZSByZXNlcnZlZCBmb3Igd2ViIGJlY2F1c2UgdGhleSBhcmUgZGlyZWN0bHkgY29tcGlsZWQgYXdheVxuLy8gZHVyaW5nIHRlbXBsYXRlIGNvbXBpbGF0aW9uXG52YXIgaXNSZXNlcnZlZEF0dHIgPSBtYWtlTWFwKCdzdHlsZSxjbGFzcycpO1xuXG4vLyBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIGJlIHVzaW5nIHByb3BzIGZvciBiaW5kaW5nXG52YXIgYWNjZXB0VmFsdWUgPSBtYWtlTWFwKCdpbnB1dCx0ZXh0YXJlYSxvcHRpb24sc2VsZWN0LHByb2dyZXNzJyk7XG52YXIgbXVzdFVzZVByb3AgPSBmdW5jdGlvbiAodGFnLCB0eXBlLCBhdHRyKSB7XG4gIHJldHVybiAoXG4gICAgKGF0dHIgPT09ICd2YWx1ZScgJiYgYWNjZXB0VmFsdWUodGFnKSkgJiYgdHlwZSAhPT0gJ2J1dHRvbicgfHxcbiAgICAoYXR0ciA9PT0gJ3NlbGVjdGVkJyAmJiB0YWcgPT09ICdvcHRpb24nKSB8fFxuICAgIChhdHRyID09PSAnY2hlY2tlZCcgJiYgdGFnID09PSAnaW5wdXQnKSB8fFxuICAgIChhdHRyID09PSAnbXV0ZWQnICYmIHRhZyA9PT0gJ3ZpZGVvJylcbiAgKVxufTtcblxudmFyIGlzRW51bWVyYXRlZEF0dHIgPSBtYWtlTWFwKCdjb250ZW50ZWRpdGFibGUsZHJhZ2dhYmxlLHNwZWxsY2hlY2snKTtcblxudmFyIGlzQm9vbGVhbkF0dHIgPSBtYWtlTWFwKFxuICAnYWxsb3dmdWxsc2NyZWVuLGFzeW5jLGF1dG9mb2N1cyxhdXRvcGxheSxjaGVja2VkLGNvbXBhY3QsY29udHJvbHMsZGVjbGFyZSwnICtcbiAgJ2RlZmF1bHQsZGVmYXVsdGNoZWNrZWQsZGVmYXVsdG11dGVkLGRlZmF1bHRzZWxlY3RlZCxkZWZlcixkaXNhYmxlZCwnICtcbiAgJ2VuYWJsZWQsZm9ybW5vdmFsaWRhdGUsaGlkZGVuLGluZGV0ZXJtaW5hdGUsaW5lcnQsaXNtYXAsaXRlbXNjb3BlLGxvb3AsbXVsdGlwbGUsJyArXG4gICdtdXRlZCxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3ZhbGlkYXRlLG5vd3JhcCxvcGVuLHBhdXNlb25leGl0LHJlYWRvbmx5LCcgK1xuICAncmVxdWlyZWQscmV2ZXJzZWQsc2NvcGVkLHNlYW1sZXNzLHNlbGVjdGVkLHNvcnRhYmxlLHRyYW5zbGF0ZSwnICtcbiAgJ3RydWVzcGVlZCx0eXBlbXVzdG1hdGNoLHZpc2libGUnXG4pO1xuXG52YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcblxudmFyIGlzWGxpbmsgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmFtZS5jaGFyQXQoNSkgPT09ICc6JyAmJiBuYW1lLnNsaWNlKDAsIDUpID09PSAneGxpbmsnXG59O1xuXG52YXIgZ2V0WGxpbmtQcm9wID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIGlzWGxpbmsobmFtZSkgPyBuYW1lLnNsaWNlKDYsIG5hbWUubGVuZ3RoKSA6ICcnXG59O1xuXG52YXIgaXNGYWxzeUF0dHJWYWx1ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PSBudWxsIHx8IHZhbCA9PT0gZmFsc2Vcbn07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBnZW5DbGFzc0ZvclZub2RlICh2bm9kZSkge1xuICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gIHZhciBwYXJlbnROb2RlID0gdm5vZGU7XG4gIHZhciBjaGlsZE5vZGUgPSB2bm9kZTtcbiAgd2hpbGUgKGlzRGVmKGNoaWxkTm9kZS5jb21wb25lbnRJbnN0YW5jZSkpIHtcbiAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlO1xuICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBtZXJnZUNsYXNzRGF0YShjaGlsZE5vZGUuZGF0YSwgZGF0YSk7XG4gICAgfVxuICB9XG4gIHdoaWxlIChpc0RlZihwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnQpKSB7XG4gICAgaWYgKHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5kYXRhKSB7XG4gICAgICBkYXRhID0gbWVyZ2VDbGFzc0RhdGEoZGF0YSwgcGFyZW50Tm9kZS5kYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlbmRlckNsYXNzKGRhdGEuc3RhdGljQ2xhc3MsIGRhdGEuY2xhc3MpXG59XG5cbmZ1bmN0aW9uIG1lcmdlQ2xhc3NEYXRhIChjaGlsZCwgcGFyZW50KSB7XG4gIHJldHVybiB7XG4gICAgc3RhdGljQ2xhc3M6IGNvbmNhdChjaGlsZC5zdGF0aWNDbGFzcywgcGFyZW50LnN0YXRpY0NsYXNzKSxcbiAgICBjbGFzczogaXNEZWYoY2hpbGQuY2xhc3MpXG4gICAgICA/IFtjaGlsZC5jbGFzcywgcGFyZW50LmNsYXNzXVxuICAgICAgOiBwYXJlbnQuY2xhc3NcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDbGFzcyAoXG4gIHN0YXRpY0NsYXNzLFxuICBkeW5hbWljQ2xhc3Ncbikge1xuICBpZiAoaXNEZWYoc3RhdGljQ2xhc3MpIHx8IGlzRGVmKGR5bmFtaWNDbGFzcykpIHtcbiAgICByZXR1cm4gY29uY2F0KHN0YXRpY0NsYXNzLCBzdHJpbmdpZnlDbGFzcyhkeW5hbWljQ2xhc3MpKVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBjb25jYXQgKGEsIGIpIHtcbiAgcmV0dXJuIGEgPyBiID8gKGEgKyAnICcgKyBiKSA6IGEgOiAoYiB8fCAnJylcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5Q2xhc3MgKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBzdHJpbmdpZnlBcnJheSh2YWx1ZSlcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN0cmluZ2lmeU9iamVjdCh2YWx1ZSlcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlBcnJheSAodmFsdWUpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICB2YXIgc3RyaW5naWZpZWQ7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGlzRGVmKHN0cmluZ2lmaWVkID0gc3RyaW5naWZ5Q2xhc3ModmFsdWVbaV0pKSAmJiBzdHJpbmdpZmllZCAhPT0gJycpIHtcbiAgICAgIGlmIChyZXMpIHsgcmVzICs9ICcgJzsgfVxuICAgICAgcmVzICs9IHN0cmluZ2lmaWVkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdCAodmFsdWUpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAodmFsdWVba2V5XSkge1xuICAgICAgaWYgKHJlcykgeyByZXMgKz0gJyAnOyB9XG4gICAgICByZXMgKz0ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG52YXIgbmFtZXNwYWNlTWFwID0ge1xuICBzdmc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gIG1hdGg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJ1xufTtcblxudmFyIGlzSFRNTFRhZyA9IG1ha2VNYXAoXG4gICdodG1sLGJvZHksYmFzZSxoZWFkLGxpbmssbWV0YSxzdHlsZSx0aXRsZSwnICtcbiAgJ2FkZHJlc3MsYXJ0aWNsZSxhc2lkZSxmb290ZXIsaGVhZGVyLGgxLGgyLGgzLGg0LGg1LGg2LGhncm91cCxuYXYsc2VjdGlvbiwnICtcbiAgJ2RpdixkZCxkbCxkdCxmaWdjYXB0aW9uLGZpZ3VyZSxwaWN0dXJlLGhyLGltZyxsaSxtYWluLG9sLHAscHJlLHVsLCcgK1xuICAnYSxiLGFiYnIsYmRpLGJkbyxicixjaXRlLGNvZGUsZGF0YSxkZm4sZW0saSxrYmQsbWFyayxxLHJwLHJ0LHJ0YyxydWJ5LCcgK1xuICAncyxzYW1wLHNtYWxsLHNwYW4sc3Ryb25nLHN1YixzdXAsdGltZSx1LHZhcix3YnIsYXJlYSxhdWRpbyxtYXAsdHJhY2ssdmlkZW8sJyArXG4gICdlbWJlZCxvYmplY3QscGFyYW0sc291cmNlLGNhbnZhcyxzY3JpcHQsbm9zY3JpcHQsZGVsLGlucywnICtcbiAgJ2NhcHRpb24sY29sLGNvbGdyb3VwLHRhYmxlLHRoZWFkLHRib2R5LHRkLHRoLHRyLCcgK1xuICAnYnV0dG9uLGRhdGFsaXN0LGZpZWxkc2V0LGZvcm0saW5wdXQsbGFiZWwsbGVnZW5kLG1ldGVyLG9wdGdyb3VwLG9wdGlvbiwnICtcbiAgJ291dHB1dCxwcm9ncmVzcyxzZWxlY3QsdGV4dGFyZWEsJyArXG4gICdkZXRhaWxzLGRpYWxvZyxtZW51LG1lbnVpdGVtLHN1bW1hcnksJyArXG4gICdjb250ZW50LGVsZW1lbnQsc2hhZG93LHRlbXBsYXRlLGJsb2NrcXVvdGUsaWZyYW1lLHRmb290J1xuKTtcblxuLy8gdGhpcyBtYXAgaXMgaW50ZW50aW9uYWxseSBzZWxlY3RpdmUsIG9ubHkgY292ZXJpbmcgU1ZHIGVsZW1lbnRzIHRoYXQgbWF5XG4vLyBjb250YWluIGNoaWxkIGVsZW1lbnRzLlxudmFyIGlzU1ZHID0gbWFrZU1hcChcbiAgJ3N2ZyxhbmltYXRlLGNpcmNsZSxjbGlwcGF0aCxjdXJzb3IsZGVmcyxkZXNjLGVsbGlwc2UsZmlsdGVyLGZvbnQtZmFjZSwnICtcbiAgJ2ZvcmVpZ25PYmplY3QsZyxnbHlwaCxpbWFnZSxsaW5lLG1hcmtlcixtYXNrLG1pc3NpbmctZ2x5cGgscGF0aCxwYXR0ZXJuLCcgK1xuICAncG9seWdvbixwb2x5bGluZSxyZWN0LHN3aXRjaCxzeW1ib2wsdGV4dCx0ZXh0cGF0aCx0c3Bhbix1c2UsdmlldycsXG4gIHRydWVcbik7XG5cblxuXG52YXIgaXNSZXNlcnZlZFRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgcmV0dXJuIGlzSFRNTFRhZyh0YWcpIHx8IGlzU1ZHKHRhZylcbn07XG5cbmZ1bmN0aW9uIGdldFRhZ05hbWVzcGFjZSAodGFnKSB7XG4gIGlmIChpc1NWRyh0YWcpKSB7XG4gICAgcmV0dXJuICdzdmcnXG4gIH1cbiAgLy8gYmFzaWMgc3VwcG9ydCBmb3IgTWF0aE1MXG4gIC8vIG5vdGUgaXQgZG9lc24ndCBzdXBwb3J0IG90aGVyIE1hdGhNTCBlbGVtZW50cyBiZWluZyBjb21wb25lbnQgcm9vdHNcbiAgaWYgKHRhZyA9PT0gJ21hdGgnKSB7XG4gICAgcmV0dXJuICdtYXRoJ1xuICB9XG59XG5cbnZhciB1bmtub3duRWxlbWVudENhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmZ1bmN0aW9uIGlzVW5rbm93bkVsZW1lbnQgKHRhZykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKCFpbkJyb3dzZXIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmIChpc1Jlc2VydmVkVGFnKHRhZykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICB0YWcgPSB0YWcudG9Mb3dlckNhc2UoKTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh1bmtub3duRWxlbWVudENhY2hlW3RhZ10gIT0gbnVsbCkge1xuICAgIHJldHVybiB1bmtub3duRWxlbWVudENhY2hlW3RhZ11cbiAgfVxuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGlmICh0YWcuaW5kZXhPZignLScpID4gLTEpIHtcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODIxMDM2NC8xMDcwMjQ0XG4gICAgcmV0dXJuICh1bmtub3duRWxlbWVudENhY2hlW3RhZ10gPSAoXG4gICAgICBlbC5jb25zdHJ1Y3RvciA9PT0gd2luZG93LkhUTUxVbmtub3duRWxlbWVudCB8fFxuICAgICAgZWwuY29uc3RydWN0b3IgPT09IHdpbmRvdy5IVE1MRWxlbWVudFxuICAgICkpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh1bmtub3duRWxlbWVudENhY2hlW3RhZ10gPSAvSFRNTFVua25vd25FbGVtZW50Ly50ZXN0KGVsLnRvU3RyaW5nKCkpKVxuICB9XG59XG5cbnZhciBpc1RleHRJbnB1dFR5cGUgPSBtYWtlTWFwKCd0ZXh0LG51bWJlcixwYXNzd29yZCxzZWFyY2gsZW1haWwsdGVsLHVybCcpO1xuXG4vKiAgKi9cblxuLyoqXG4gKiBRdWVyeSBhbiBlbGVtZW50IHNlbGVjdG9yIGlmIGl0J3Mgbm90IGFuIGVsZW1lbnQgYWxyZWFkeS5cbiAqL1xuZnVuY3Rpb24gcXVlcnkgKGVsKSB7XG4gIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIHNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAnQ2Fubm90IGZpbmQgZWxlbWVudDogJyArIGVsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RlZFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbFxuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50JDEgKHRhZ05hbWUsIHZub2RlKSB7XG4gIHZhciBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICBpZiAodGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHtcbiAgICByZXR1cm4gZWxtXG4gIH1cbiAgLy8gZmFsc2Ugb3IgbnVsbCB3aWxsIHJlbW92ZSB0aGUgYXR0cmlidXRlIGJ1dCB1bmRlZmluZWQgd2lsbCBub3RcbiAgaWYgKHZub2RlLmRhdGEgJiYgdm5vZGUuZGF0YS5hdHRycyAmJiB2bm9kZS5kYXRhLmF0dHJzLm11bHRpcGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbG0uc2V0QXR0cmlidXRlKCdtdWx0aXBsZScsICdtdWx0aXBsZScpO1xuICB9XG4gIHJldHVybiBlbG1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TIChuYW1lc3BhY2UsIHRhZ05hbWUpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VNYXBbbmFtZXNwYWNlXSwgdGFnTmFtZSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUgKHRleHQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQgKHRleHQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dClcbn1cblxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlIChwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZCAobm9kZSwgY2hpbGQpIHtcbiAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENoaWxkIChub2RlLCBjaGlsZCkge1xuICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cblxuZnVuY3Rpb24gcGFyZW50Tm9kZSAobm9kZSkge1xuICByZXR1cm4gbm9kZS5wYXJlbnROb2RlXG59XG5cbmZ1bmN0aW9uIG5leHRTaWJsaW5nIChub2RlKSB7XG4gIHJldHVybiBub2RlLm5leHRTaWJsaW5nXG59XG5cbmZ1bmN0aW9uIHRhZ05hbWUgKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUudGFnTmFtZVxufVxuXG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudCAobm9kZSwgdGV4dCkge1xuICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGVTY29wZSAobm9kZSwgc2NvcGVJZCkge1xuICBub2RlLnNldEF0dHJpYnV0ZShzY29wZUlkLCAnJyk7XG59XG5cblxudmFyIG5vZGVPcHMgPSBPYmplY3QuZnJlZXplKHtcblx0Y3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCQxLFxuXHRjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcblx0Y3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuXHRjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuXHRpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcblx0cmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuXHRhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG5cdHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG5cdG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcblx0dGFnTmFtZTogdGFnTmFtZSxcblx0c2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuXHRzZXRTdHlsZVNjb3BlOiBzZXRTdHlsZVNjb3BlXG59KTtcblxuLyogICovXG5cbnZhciByZWYgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlIChfLCB2bm9kZSkge1xuICAgIHJlZ2lzdGVyUmVmKHZub2RlKTtcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUgKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIGlmIChvbGRWbm9kZS5kYXRhLnJlZiAhPT0gdm5vZGUuZGF0YS5yZWYpIHtcbiAgICAgIHJlZ2lzdGVyUmVmKG9sZFZub2RlLCB0cnVlKTtcbiAgICAgIHJlZ2lzdGVyUmVmKHZub2RlKTtcbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3kgKHZub2RlKSB7XG4gICAgcmVnaXN0ZXJSZWYodm5vZGUsIHRydWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyUmVmICh2bm9kZSwgaXNSZW1vdmFsKSB7XG4gIHZhciBrZXkgPSB2bm9kZS5kYXRhLnJlZjtcbiAgaWYgKCFpc0RlZihrZXkpKSB7IHJldHVybiB9XG5cbiAgdmFyIHZtID0gdm5vZGUuY29udGV4dDtcbiAgdmFyIHJlZiA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlIHx8IHZub2RlLmVsbTtcbiAgdmFyIHJlZnMgPSB2bS4kcmVmcztcbiAgaWYgKGlzUmVtb3ZhbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlZnNba2V5XSkpIHtcbiAgICAgIHJlbW92ZShyZWZzW2tleV0sIHJlZik7XG4gICAgfSBlbHNlIGlmIChyZWZzW2tleV0gPT09IHJlZikge1xuICAgICAgcmVmc1trZXldID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodm5vZGUuZGF0YS5yZWZJbkZvcikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlZnNba2V5XSkpIHtcbiAgICAgICAgcmVmc1trZXldID0gW3JlZl07XG4gICAgICB9IGVsc2UgaWYgKHJlZnNba2V5XS5pbmRleE9mKHJlZikgPCAwKSB7XG4gICAgICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgICAgICByZWZzW2tleV0ucHVzaChyZWYpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZWZzW2tleV0gPSByZWY7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVmlydHVhbCBET00gcGF0Y2hpbmcgYWxnb3JpdGhtIGJhc2VkIG9uIFNuYWJiZG9tIGJ5XG4gKiBTaW1vbiBGcmlpcyBWaW5kdW0gKEBwYWxkZXBpbmQpXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxkZXBpbmQvc25hYmJkb20vYmxvYi9tYXN0ZXIvTElDRU5TRVxuICpcbiAqIG1vZGlmaWVkIGJ5IEV2YW4gWW91IChAeXl4OTkwODAzKVxuICpcbiAqIE5vdCB0eXBlLWNoZWNraW5nIHRoaXMgYmVjYXVzZSB0aGlzIGZpbGUgaXMgcGVyZi1jcml0aWNhbCBhbmQgdGhlIGNvc3RcbiAqIG9mIG1ha2luZyBmbG93IHVuZGVyc3RhbmQgaXQgaXMgbm90IHdvcnRoIGl0LlxuICovXG5cbnZhciBlbXB0eU5vZGUgPSBuZXcgVk5vZGUoJycsIHt9LCBbXSk7XG5cbnZhciBob29rcyA9IFsnY3JlYXRlJywgJ2FjdGl2YXRlJywgJ3VwZGF0ZScsICdyZW1vdmUnLCAnZGVzdHJveSddO1xuXG5mdW5jdGlvbiBzYW1lVm5vZGUgKGEsIGIpIHtcbiAgcmV0dXJuIChcbiAgICBhLmtleSA9PT0gYi5rZXkgJiYgKFxuICAgICAgKFxuICAgICAgICBhLnRhZyA9PT0gYi50YWcgJiZcbiAgICAgICAgYS5pc0NvbW1lbnQgPT09IGIuaXNDb21tZW50ICYmXG4gICAgICAgIGlzRGVmKGEuZGF0YSkgPT09IGlzRGVmKGIuZGF0YSkgJiZcbiAgICAgICAgc2FtZUlucHV0VHlwZShhLCBiKVxuICAgICAgKSB8fCAoXG4gICAgICAgIGlzVHJ1ZShhLmlzQXN5bmNQbGFjZWhvbGRlcikgJiZcbiAgICAgICAgYS5hc3luY0ZhY3RvcnkgPT09IGIuYXN5bmNGYWN0b3J5ICYmXG4gICAgICAgIGlzVW5kZWYoYi5hc3luY0ZhY3RvcnkuZXJyb3IpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbmZ1bmN0aW9uIHNhbWVJbnB1dFR5cGUgKGEsIGIpIHtcbiAgaWYgKGEudGFnICE9PSAnaW5wdXQnKSB7IHJldHVybiB0cnVlIH1cbiAgdmFyIGk7XG4gIHZhciB0eXBlQSA9IGlzRGVmKGkgPSBhLmRhdGEpICYmIGlzRGVmKGkgPSBpLmF0dHJzKSAmJiBpLnR5cGU7XG4gIHZhciB0eXBlQiA9IGlzRGVmKGkgPSBiLmRhdGEpICYmIGlzRGVmKGkgPSBpLmF0dHJzKSAmJiBpLnR5cGU7XG4gIHJldHVybiB0eXBlQSA9PT0gdHlwZUIgfHwgaXNUZXh0SW5wdXRUeXBlKHR5cGVBKSAmJiBpc1RleHRJbnB1dFR5cGUodHlwZUIpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4IChjaGlsZHJlbiwgYmVnaW5JZHgsIGVuZElkeCkge1xuICB2YXIgaSwga2V5O1xuICB2YXIgbWFwID0ge307XG4gIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAga2V5ID0gY2hpbGRyZW5baV0ua2V5O1xuICAgIGlmIChpc0RlZihrZXkpKSB7IG1hcFtrZXldID0gaTsgfVxuICB9XG4gIHJldHVybiBtYXBcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGF0Y2hGdW5jdGlvbiAoYmFja2VuZCkge1xuICB2YXIgaSwgajtcbiAgdmFyIGNicyA9IHt9O1xuXG4gIHZhciBtb2R1bGVzID0gYmFja2VuZC5tb2R1bGVzO1xuICB2YXIgbm9kZU9wcyA9IGJhY2tlbmQubm9kZU9wcztcblxuICBmb3IgKGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgZm9yIChqID0gMDsgaiA8IG1vZHVsZXMubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmIChpc0RlZihtb2R1bGVzW2pdW2hvb2tzW2ldXSkpIHtcbiAgICAgICAgY2JzW2hvb2tzW2ldXS5wdXNoKG1vZHVsZXNbal1baG9va3NbaV1dKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbXB0eU5vZGVBdCAoZWxtKSB7XG4gICAgcmV0dXJuIG5ldyBWTm9kZShub2RlT3BzLnRhZ05hbWUoZWxtKS50b0xvd2VyQ2FzZSgpLCB7fSwgW10sIHVuZGVmaW5lZCwgZWxtKVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUm1DYiAoY2hpbGRFbG0sIGxpc3RlbmVycykge1xuICAgIGZ1bmN0aW9uIHJlbW92ZSAoKSB7XG4gICAgICBpZiAoLS1yZW1vdmUubGlzdGVuZXJzID09PSAwKSB7XG4gICAgICAgIHJlbW92ZU5vZGUoY2hpbGRFbG0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZW1vdmUubGlzdGVuZXJzID0gbGlzdGVuZXJzO1xuICAgIHJldHVybiByZW1vdmVcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU5vZGUgKGVsKSB7XG4gICAgdmFyIHBhcmVudCA9IG5vZGVPcHMucGFyZW50Tm9kZShlbCk7XG4gICAgLy8gZWxlbWVudCBtYXkgaGF2ZSBhbHJlYWR5IGJlZW4gcmVtb3ZlZCBkdWUgdG8gdi1odG1sIC8gdi10ZXh0XG4gICAgaWYgKGlzRGVmKHBhcmVudCkpIHtcbiAgICAgIG5vZGVPcHMucmVtb3ZlQ2hpbGQocGFyZW50LCBlbCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNVbmtub3duRWxlbWVudCQkMSAodm5vZGUsIGluVlByZSkge1xuICAgIHJldHVybiAoXG4gICAgICAhaW5WUHJlICYmXG4gICAgICAhdm5vZGUubnMgJiZcbiAgICAgICEoXG4gICAgICAgIGNvbmZpZy5pZ25vcmVkRWxlbWVudHMubGVuZ3RoICYmXG4gICAgICAgIGNvbmZpZy5pZ25vcmVkRWxlbWVudHMuc29tZShmdW5jdGlvbiAoaWdub3JlKSB7XG4gICAgICAgICAgcmV0dXJuIGlzUmVnRXhwKGlnbm9yZSlcbiAgICAgICAgICAgID8gaWdub3JlLnRlc3Qodm5vZGUudGFnKVxuICAgICAgICAgICAgOiBpZ25vcmUgPT09IHZub2RlLnRhZ1xuICAgICAgICB9KVxuICAgICAgKSAmJlxuICAgICAgY29uZmlnLmlzVW5rbm93bkVsZW1lbnQodm5vZGUudGFnKVxuICAgIClcbiAgfVxuXG4gIHZhciBjcmVhdGluZ0VsbUluVlByZSA9IDA7XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxtIChcbiAgICB2bm9kZSxcbiAgICBpbnNlcnRlZFZub2RlUXVldWUsXG4gICAgcGFyZW50RWxtLFxuICAgIHJlZkVsbSxcbiAgICBuZXN0ZWQsXG4gICAgb3duZXJBcnJheSxcbiAgICBpbmRleFxuICApIHtcbiAgICBpZiAoaXNEZWYodm5vZGUuZWxtKSAmJiBpc0RlZihvd25lckFycmF5KSkge1xuICAgICAgLy8gVGhpcyB2bm9kZSB3YXMgdXNlZCBpbiBhIHByZXZpb3VzIHJlbmRlciFcbiAgICAgIC8vIG5vdyBpdCdzIHVzZWQgYXMgYSBuZXcgbm9kZSwgb3ZlcndyaXRpbmcgaXRzIGVsbSB3b3VsZCBjYXVzZVxuICAgICAgLy8gcG90ZW50aWFsIHBhdGNoIGVycm9ycyBkb3duIHRoZSByb2FkIHdoZW4gaXQncyB1c2VkIGFzIGFuIGluc2VydGlvblxuICAgICAgLy8gcmVmZXJlbmNlIG5vZGUuIEluc3RlYWQsIHdlIGNsb25lIHRoZSBub2RlIG9uLWRlbWFuZCBiZWZvcmUgY3JlYXRpbmdcbiAgICAgIC8vIGFzc29jaWF0ZWQgRE9NIGVsZW1lbnQgZm9yIGl0LlxuICAgICAgdm5vZGUgPSBvd25lckFycmF5W2luZGV4XSA9IGNsb25lVk5vZGUodm5vZGUpO1xuICAgIH1cblxuICAgIHZub2RlLmlzUm9vdEluc2VydCA9ICFuZXN0ZWQ7IC8vIGZvciB0cmFuc2l0aW9uIGVudGVyIGNoZWNrXG4gICAgaWYgKGNyZWF0ZUNvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgdGFnID0gdm5vZGUudGFnO1xuICAgIGlmIChpc0RlZih0YWcpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnByZSkge1xuICAgICAgICAgIGNyZWF0aW5nRWxtSW5WUHJlKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5rbm93bkVsZW1lbnQkJDEodm5vZGUsIGNyZWF0aW5nRWxtSW5WUHJlKSkge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAnVW5rbm93biBjdXN0b20gZWxlbWVudDogPCcgKyB0YWcgKyAnPiAtIGRpZCB5b3UgJyArXG4gICAgICAgICAgICAncmVnaXN0ZXIgdGhlIGNvbXBvbmVudCBjb3JyZWN0bHk/IEZvciByZWN1cnNpdmUgY29tcG9uZW50cywgJyArXG4gICAgICAgICAgICAnbWFrZSBzdXJlIHRvIHByb3ZpZGUgdGhlIFwibmFtZVwiIG9wdGlvbi4nLFxuICAgICAgICAgICAgdm5vZGUuY29udGV4dFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdm5vZGUuZWxtID0gdm5vZGUubnNcbiAgICAgICAgPyBub2RlT3BzLmNyZWF0ZUVsZW1lbnROUyh2bm9kZS5ucywgdGFnKVxuICAgICAgICA6IG5vZGVPcHMuY3JlYXRlRWxlbWVudCh0YWcsIHZub2RlKTtcbiAgICAgIHNldFNjb3BlKHZub2RlKTtcblxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICB7XG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICAgICAgaW52b2tlQ3JlYXRlSG9va3Modm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zZXJ0KHBhcmVudEVsbSwgdm5vZGUuZWxtLCByZWZFbG0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBkYXRhICYmIGRhdGEucHJlKSB7XG4gICAgICAgIGNyZWF0aW5nRWxtSW5WUHJlLS07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1RydWUodm5vZGUuaXNDb21tZW50KSkge1xuICAgICAgdm5vZGUuZWxtID0gbm9kZU9wcy5jcmVhdGVDb21tZW50KHZub2RlLnRleHQpO1xuICAgICAgaW5zZXJ0KHBhcmVudEVsbSwgdm5vZGUuZWxtLCByZWZFbG0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2bm9kZS5lbG0gPSBub2RlT3BzLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpO1xuICAgICAgaW5zZXJ0KHBhcmVudEVsbSwgdm5vZGUuZWxtLCByZWZFbG0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pIHtcbiAgICB2YXIgaSA9IHZub2RlLmRhdGE7XG4gICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICB2YXIgaXNSZWFjdGl2YXRlZCA9IGlzRGVmKHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSAmJiBpLmtlZXBBbGl2ZTtcbiAgICAgIGlmIChpc0RlZihpID0gaS5ob29rKSAmJiBpc0RlZihpID0gaS5pbml0KSkge1xuICAgICAgICBpKHZub2RlLCBmYWxzZSAvKiBoeWRyYXRpbmcgKi8sIHBhcmVudEVsbSwgcmVmRWxtKTtcbiAgICAgIH1cbiAgICAgIC8vIGFmdGVyIGNhbGxpbmcgdGhlIGluaXQgaG9vaywgaWYgdGhlIHZub2RlIGlzIGEgY2hpbGQgY29tcG9uZW50XG4gICAgICAvLyBpdCBzaG91bGQndmUgY3JlYXRlZCBhIGNoaWxkIGluc3RhbmNlIGFuZCBtb3VudGVkIGl0LiB0aGUgY2hpbGRcbiAgICAgIC8vIGNvbXBvbmVudCBhbHNvIGhhcyBzZXQgdGhlIHBsYWNlaG9sZGVyIHZub2RlJ3MgZWxtLlxuICAgICAgLy8gaW4gdGhhdCBjYXNlIHdlIGNhbiBqdXN0IHJldHVybiB0aGUgZWxlbWVudCBhbmQgYmUgZG9uZS5cbiAgICAgIGlmIChpc0RlZih2bm9kZS5jb21wb25lbnRJbnN0YW5jZSkpIHtcbiAgICAgICAgaW5pdENvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgaWYgKGlzVHJ1ZShpc1JlYWN0aXZhdGVkKSkge1xuICAgICAgICAgIHJlYWN0aXZhdGVDb21wb25lbnQodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdENvbXBvbmVudCAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIGlmIChpc0RlZih2bm9kZS5kYXRhLnBlbmRpbmdJbnNlcnQpKSB7XG4gICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaC5hcHBseShpbnNlcnRlZFZub2RlUXVldWUsIHZub2RlLmRhdGEucGVuZGluZ0luc2VydCk7XG4gICAgICB2bm9kZS5kYXRhLnBlbmRpbmdJbnNlcnQgPSBudWxsO1xuICAgIH1cbiAgICB2bm9kZS5lbG0gPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS4kZWw7XG4gICAgaWYgKGlzUGF0Y2hhYmxlKHZub2RlKSkge1xuICAgICAgaW52b2tlQ3JlYXRlSG9va3Modm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICBzZXRTY29wZSh2bm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVtcHR5IGNvbXBvbmVudCByb290LlxuICAgICAgLy8gc2tpcCBhbGwgZWxlbWVudC1yZWxhdGVkIG1vZHVsZXMgZXhjZXB0IGZvciByZWYgKCMzNDU1KVxuICAgICAgcmVnaXN0ZXJSZWYodm5vZGUpO1xuICAgICAgLy8gbWFrZSBzdXJlIHRvIGludm9rZSB0aGUgaW5zZXJ0IGhvb2tcbiAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFjdGl2YXRlQ29tcG9uZW50ICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkge1xuICAgIHZhciBpO1xuICAgIC8vIGhhY2sgZm9yICM0MzM5OiBhIHJlYWN0aXZhdGVkIGNvbXBvbmVudCB3aXRoIGlubmVyIHRyYW5zaXRpb25cbiAgICAvLyBkb2VzIG5vdCB0cmlnZ2VyIGJlY2F1c2UgdGhlIGlubmVyIG5vZGUncyBjcmVhdGVkIGhvb2tzIGFyZSBub3QgY2FsbGVkXG4gICAgLy8gYWdhaW4uIEl0J3Mgbm90IGlkZWFsIHRvIGludm9sdmUgbW9kdWxlLXNwZWNpZmljIGxvZ2ljIGluIGhlcmUgYnV0XG4gICAgLy8gdGhlcmUgZG9lc24ndCBzZWVtIHRvIGJlIGEgYmV0dGVyIHdheSB0byBkbyBpdC5cbiAgICB2YXIgaW5uZXJOb2RlID0gdm5vZGU7XG4gICAgd2hpbGUgKGlubmVyTm9kZS5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgaW5uZXJOb2RlID0gaW5uZXJOb2RlLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZTtcbiAgICAgIGlmIChpc0RlZihpID0gaW5uZXJOb2RlLmRhdGEpICYmIGlzRGVmKGkgPSBpLnRyYW5zaXRpb24pKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuYWN0aXZhdGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjYnMuYWN0aXZhdGVbaV0oZW1wdHlOb2RlLCBpbm5lck5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKGlubmVyTm9kZSk7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVubGlrZSBhIG5ld2x5IGNyZWF0ZWQgY29tcG9uZW50LFxuICAgIC8vIGEgcmVhY3RpdmF0ZWQga2VlcC1hbGl2ZSBjb21wb25lbnQgZG9lc24ndCBpbnNlcnQgaXRzZWxmXG4gICAgaW5zZXJ0KHBhcmVudEVsbSwgdm5vZGUuZWxtLCByZWZFbG0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0IChwYXJlbnQsIGVsbSwgcmVmJCQxKSB7XG4gICAgaWYgKGlzRGVmKHBhcmVudCkpIHtcbiAgICAgIGlmIChpc0RlZihyZWYkJDEpKSB7XG4gICAgICAgIGlmIChyZWYkJDEucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50LCBlbG0sIHJlZiQkMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVPcHMuYXBwZW5kQ2hpbGQocGFyZW50LCBlbG0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoaWxkcmVuICh2bm9kZSwgY2hpbGRyZW4sIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY2hlY2tEdXBsaWNhdGVLZXlzKGNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY3JlYXRlRWxtKGNoaWxkcmVuW2ldLCBpbnNlcnRlZFZub2RlUXVldWUsIHZub2RlLmVsbSwgbnVsbCwgdHJ1ZSwgY2hpbGRyZW4sIGkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNQcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgIG5vZGVPcHMuYXBwZW5kQ2hpbGQodm5vZGUuZWxtLCBub2RlT3BzLmNyZWF0ZVRleHROb2RlKFN0cmluZyh2bm9kZS50ZXh0KSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzUGF0Y2hhYmxlICh2bm9kZSkge1xuICAgIHdoaWxlICh2bm9kZS5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgdm5vZGUgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGU7XG4gICAgfVxuICAgIHJldHVybiBpc0RlZih2bm9kZS50YWcpXG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VDcmVhdGVIb29rcyAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kkMSkge1xuICAgICAgY2JzLmNyZWF0ZVtpJDFdKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgIH1cbiAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgaWYgKGlzRGVmKGkuY3JlYXRlKSkgeyBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTsgfVxuICAgICAgaWYgKGlzRGVmKGkuaW5zZXJ0KSkgeyBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7IH1cbiAgICB9XG4gIH1cblxuICAvLyBzZXQgc2NvcGUgaWQgYXR0cmlidXRlIGZvciBzY29wZWQgQ1NTLlxuICAvLyB0aGlzIGlzIGltcGxlbWVudGVkIGFzIGEgc3BlY2lhbCBjYXNlIHRvIGF2b2lkIHRoZSBvdmVyaGVhZFxuICAvLyBvZiBnb2luZyB0aHJvdWdoIHRoZSBub3JtYWwgYXR0cmlidXRlIHBhdGNoaW5nIHByb2Nlc3MuXG4gIGZ1bmN0aW9uIHNldFNjb3BlICh2bm9kZSkge1xuICAgIHZhciBpO1xuICAgIGlmIChpc0RlZihpID0gdm5vZGUuZm5TY29wZUlkKSkge1xuICAgICAgbm9kZU9wcy5zZXRTdHlsZVNjb3BlKHZub2RlLmVsbSwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhbmNlc3RvciA9IHZub2RlO1xuICAgICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICAgIGlmIChpc0RlZihpID0gYW5jZXN0b3IuY29udGV4dCkgJiYgaXNEZWYoaSA9IGkuJG9wdGlvbnMuX3Njb3BlSWQpKSB7XG4gICAgICAgICAgbm9kZU9wcy5zZXRTdHlsZVNjb3BlKHZub2RlLmVsbSwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGZvciBzbG90IGNvbnRlbnQgdGhleSBzaG91bGQgYWxzbyBnZXQgdGhlIHNjb3BlSWQgZnJvbSB0aGUgaG9zdCBpbnN0YW5jZS5cbiAgICBpZiAoaXNEZWYoaSA9IGFjdGl2ZUluc3RhbmNlKSAmJlxuICAgICAgaSAhPT0gdm5vZGUuY29udGV4dCAmJlxuICAgICAgaSAhPT0gdm5vZGUuZm5Db250ZXh0ICYmXG4gICAgICBpc0RlZihpID0gaS4kb3B0aW9ucy5fc2NvcGVJZClcbiAgICApIHtcbiAgICAgIG5vZGVPcHMuc2V0U3R5bGVTY29wZSh2bm9kZS5lbG0sIGkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFZub2RlcyAocGFyZW50RWxtLCByZWZFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgY3JlYXRlRWxtKHZub2Rlc1tzdGFydElkeF0sIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0sIGZhbHNlLCB2bm9kZXMsIHN0YXJ0SWR4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VEZXN0cm95SG9vayAodm5vZGUpIHtcbiAgICB2YXIgaSwgajtcbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpIHsgaSh2bm9kZSk7IH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuZGVzdHJveS5sZW5ndGg7ICsraSkgeyBjYnMuZGVzdHJveVtpXSh2bm9kZSk7IH1cbiAgICB9XG4gICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraikge1xuICAgICAgICBpbnZva2VEZXN0cm95SG9vayh2bm9kZS5jaGlsZHJlbltqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzIChwYXJlbnRFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCkge1xuICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgIGlmIChpc0RlZihjaC50YWcpKSB7XG4gICAgICAgICAgcmVtb3ZlQW5kSW52b2tlUmVtb3ZlSG9vayhjaCk7XG4gICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICB9IGVsc2UgeyAvLyBUZXh0IG5vZGVcbiAgICAgICAgICByZW1vdmVOb2RlKGNoLmVsbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBbmRJbnZva2VSZW1vdmVIb29rICh2bm9kZSwgcm0pIHtcbiAgICBpZiAoaXNEZWYocm0pIHx8IGlzRGVmKHZub2RlLmRhdGEpKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBjYnMucmVtb3ZlLmxlbmd0aCArIDE7XG4gICAgICBpZiAoaXNEZWYocm0pKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSByZWN1cnNpdmVseSBwYXNzZWQgZG93biBybSBjYWxsYmFja1xuICAgICAgICAvLyBpbmNyZWFzZSB0aGUgbGlzdGVuZXJzIGNvdW50XG4gICAgICAgIHJtLmxpc3RlbmVycyArPSBsaXN0ZW5lcnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkaXJlY3RseSByZW1vdmluZ1xuICAgICAgICBybSA9IGNyZWF0ZVJtQ2Iodm5vZGUuZWxtLCBsaXN0ZW5lcnMpO1xuICAgICAgfVxuICAgICAgLy8gcmVjdXJzaXZlbHkgaW52b2tlIGhvb2tzIG9uIGNoaWxkIGNvbXBvbmVudCByb290IG5vZGVcbiAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UpICYmIGlzRGVmKGkgPSBpLl92bm9kZSkgJiYgaXNEZWYoaS5kYXRhKSkge1xuICAgICAgICByZW1vdmVBbmRJbnZva2VSZW1vdmVIb29rKGksIHJtKTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNicy5yZW1vdmVbaV0odm5vZGUsIHJtKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5yZW1vdmUpKSB7XG4gICAgICAgIGkodm5vZGUsIHJtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJtKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZU5vZGUodm5vZGUuZWxtKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbiAocGFyZW50RWxtLCBvbGRDaCwgbmV3Q2gsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSkge1xuICAgIHZhciBvbGRTdGFydElkeCA9IDA7XG4gICAgdmFyIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICB2YXIgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgIHZhciBvbGRLZXlUb0lkeCwgaWR4SW5PbGQsIHZub2RlVG9Nb3ZlLCByZWZFbG07XG5cbiAgICAvLyByZW1vdmVPbmx5IGlzIGEgc3BlY2lhbCBmbGFnIHVzZWQgb25seSBieSA8dHJhbnNpdGlvbi1ncm91cD5cbiAgICAvLyB0byBlbnN1cmUgcmVtb3ZlZCBlbGVtZW50cyBzdGF5IGluIGNvcnJlY3QgcmVsYXRpdmUgcG9zaXRpb25zXG4gICAgLy8gZHVyaW5nIGxlYXZpbmcgdHJhbnNpdGlvbnNcbiAgICB2YXIgY2FuTW92ZSA9ICFyZW1vdmVPbmx5O1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGNoZWNrRHVwbGljYXRlS2V5cyhuZXdDaCk7XG4gICAgfVxuXG4gICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgIGlmIChpc1VuZGVmKG9sZFN0YXJ0Vm5vZGUpKSB7XG4gICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgaGFzIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgfSBlbHNlIGlmIChpc1VuZGVmKG9sZEVuZFZub2RlKSkge1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgcmlnaHRcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBub2RlT3BzLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgfSBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7IC8vIFZub2RlIG1vdmVkIGxlZnRcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzVW5kZWYob2xkS2V5VG9JZHgpKSB7IG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpOyB9XG4gICAgICAgIGlkeEluT2xkID0gaXNEZWYobmV3U3RhcnRWbm9kZS5rZXkpXG4gICAgICAgICAgPyBvbGRLZXlUb0lkeFtuZXdTdGFydFZub2RlLmtleV1cbiAgICAgICAgICA6IGZpbmRJZHhJbk9sZChuZXdTdGFydFZub2RlLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkgeyAvLyBOZXcgZWxlbWVudFxuICAgICAgICAgIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGZhbHNlLCBuZXdDaCwgbmV3U3RhcnRJZHgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZub2RlVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgIGlmIChzYW1lVm5vZGUodm5vZGVUb01vdmUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKHZub2RlVG9Nb3ZlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIHZub2RlVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzYW1lIGtleSBidXQgZGlmZmVyZW50IGVsZW1lbnQuIHRyZWF0IGFzIG5ldyBlbGVtZW50XG4gICAgICAgICAgICBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBmYWxzZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob2xkU3RhcnRJZHggPiBvbGRFbmRJZHgpIHtcbiAgICAgIHJlZkVsbSA9IGlzVW5kZWYobmV3Q2hbbmV3RW5kSWR4ICsgMV0pID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcbiAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIHJlZkVsbSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgfSBlbHNlIGlmIChuZXdTdGFydElkeCA+IG5ld0VuZElkeCkge1xuICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRHVwbGljYXRlS2V5cyAoY2hpbGRyZW4pIHtcbiAgICB2YXIgc2VlbktleXMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdm5vZGUgPSBjaGlsZHJlbltpXTtcbiAgICAgIHZhciBrZXkgPSB2bm9kZS5rZXk7XG4gICAgICBpZiAoaXNEZWYoa2V5KSkge1xuICAgICAgICBpZiAoc2VlbktleXNba2V5XSkge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAoXCJEdXBsaWNhdGUga2V5cyBkZXRlY3RlZDogJ1wiICsga2V5ICsgXCInLiBUaGlzIG1heSBjYXVzZSBhbiB1cGRhdGUgZXJyb3IuXCIpLFxuICAgICAgICAgICAgdm5vZGUuY29udGV4dFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VlbktleXNba2V5XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kSWR4SW5PbGQgKG5vZGUsIG9sZENoLCBzdGFydCwgZW5kKSB7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIHZhciBjID0gb2xkQ2hbaV07XG4gICAgICBpZiAoaXNEZWYoYykgJiYgc2FtZVZub2RlKG5vZGUsIGMpKSB7IHJldHVybiBpIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXRjaFZub2RlIChvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSkge1xuICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XG5cbiAgICBpZiAoaXNUcnVlKG9sZFZub2RlLmlzQXN5bmNQbGFjZWhvbGRlcikpIHtcbiAgICAgIGlmIChpc0RlZih2bm9kZS5hc3luY0ZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgICAgIGh5ZHJhdGUob2xkVm5vZGUuZWxtLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZub2RlLmlzQXN5bmNQbGFjZWhvbGRlciA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyByZXVzZSBlbGVtZW50IGZvciBzdGF0aWMgdHJlZXMuXG4gICAgLy8gbm90ZSB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIHZub2RlIGlzIGNsb25lZCAtXG4gICAgLy8gaWYgdGhlIG5ldyBub2RlIGlzIG5vdCBjbG9uZWQgaXQgbWVhbnMgdGhlIHJlbmRlciBmdW5jdGlvbnMgaGF2ZSBiZWVuXG4gICAgLy8gcmVzZXQgYnkgdGhlIGhvdC1yZWxvYWQtYXBpIGFuZCB3ZSBuZWVkIHRvIGRvIGEgcHJvcGVyIHJlLXJlbmRlci5cbiAgICBpZiAoaXNUcnVlKHZub2RlLmlzU3RhdGljKSAmJlxuICAgICAgaXNUcnVlKG9sZFZub2RlLmlzU3RhdGljKSAmJlxuICAgICAgdm5vZGUua2V5ID09PSBvbGRWbm9kZS5rZXkgJiZcbiAgICAgIChpc1RydWUodm5vZGUuaXNDbG9uZWQpIHx8IGlzVHJ1ZSh2bm9kZS5pc09uY2UpKVxuICAgICkge1xuICAgICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgPSBvbGRWbm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBpO1xuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICBpZiAoaXNEZWYoZGF0YSkgJiYgaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkucHJlcGF0Y2gpKSB7XG4gICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgfVxuXG4gICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgaWYgKGlzRGVmKGRhdGEpICYmIGlzUGF0Y2hhYmxlKHZub2RlKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNicy51cGRhdGUubGVuZ3RoOyArK2kpIHsgY2JzLnVwZGF0ZVtpXShvbGRWbm9kZSwgdm5vZGUpOyB9XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSkgeyBpKG9sZFZub2RlLCB2bm9kZSk7IH1cbiAgICB9XG4gICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgIGlmIChvbGRDaCAhPT0gY2gpIHsgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSk7IH1cbiAgICAgIH0gZWxzZSBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkgeyBub2RlT3BzLnNldFRleHRDb250ZW50KGVsbSwgJycpOyB9XG4gICAgICAgIGFkZFZub2RlcyhlbG0sIG51bGwsIGNoLCAwLCBjaC5sZW5ndGggLSAxLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgfSBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgfSBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICBub2RlT3BzLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2xkVm5vZGUudGV4dCAhPT0gdm5vZGUudGV4dCkge1xuICAgICAgbm9kZU9wcy5zZXRUZXh0Q29udGVudChlbG0sIHZub2RlLnRleHQpO1xuICAgIH1cbiAgICBpZiAoaXNEZWYoZGF0YSkpIHtcbiAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5wb3N0cGF0Y2gpKSB7IGkob2xkVm5vZGUsIHZub2RlKTsgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUluc2VydEhvb2sgKHZub2RlLCBxdWV1ZSwgaW5pdGlhbCkge1xuICAgIC8vIGRlbGF5IGluc2VydCBob29rcyBmb3IgY29tcG9uZW50IHJvb3Qgbm9kZXMsIGludm9rZSB0aGVtIGFmdGVyIHRoZVxuICAgIC8vIGVsZW1lbnQgaXMgcmVhbGx5IGluc2VydGVkXG4gICAgaWYgKGlzVHJ1ZShpbml0aWFsKSAmJiBpc0RlZih2bm9kZS5wYXJlbnQpKSB7XG4gICAgICB2bm9kZS5wYXJlbnQuZGF0YS5wZW5kaW5nSW5zZXJ0ID0gcXVldWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgcXVldWVbaV0uZGF0YS5ob29rLmluc2VydChxdWV1ZVtpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGh5ZHJhdGlvbkJhaWxlZCA9IGZhbHNlO1xuICAvLyBsaXN0IG9mIG1vZHVsZXMgdGhhdCBjYW4gc2tpcCBjcmVhdGUgaG9vayBkdXJpbmcgaHlkcmF0aW9uIGJlY2F1c2UgdGhleVxuICAvLyBhcmUgYWxyZWFkeSByZW5kZXJlZCBvbiB0aGUgY2xpZW50IG9yIGhhcyBubyBuZWVkIGZvciBpbml0aWFsaXphdGlvblxuICAvLyBOb3RlOiBzdHlsZSBpcyBleGNsdWRlZCBiZWNhdXNlIGl0IHJlbGllcyBvbiBpbml0aWFsIGNsb25lIGZvciBmdXR1cmVcbiAgLy8gZGVlcCB1cGRhdGVzICgjNzA2MykuXG4gIHZhciBpc1JlbmRlcmVkTW9kdWxlID0gbWFrZU1hcCgnYXR0cnMsY2xhc3Msc3RhdGljQ2xhc3Msc3RhdGljU3R5bGUsa2V5Jyk7XG5cbiAgLy8gTm90ZTogdGhpcyBpcyBhIGJyb3dzZXItb25seSBmdW5jdGlvbiBzbyB3ZSBjYW4gYXNzdW1lIGVsbXMgYXJlIERPTSBub2Rlcy5cbiAgZnVuY3Rpb24gaHlkcmF0ZSAoZWxtLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBpblZQcmUpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgdGFnID0gdm5vZGUudGFnO1xuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICBpblZQcmUgPSBpblZQcmUgfHwgKGRhdGEgJiYgZGF0YS5wcmUpO1xuICAgIHZub2RlLmVsbSA9IGVsbTtcblxuICAgIGlmIChpc1RydWUodm5vZGUuaXNDb21tZW50KSAmJiBpc0RlZih2bm9kZS5hc3luY0ZhY3RvcnkpKSB7XG4gICAgICB2bm9kZS5pc0FzeW5jUGxhY2Vob2xkZXIgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gYXNzZXJ0IG5vZGUgbWF0Y2hcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCFhc3NlcnROb2RlTWF0Y2goZWxtLCB2bm9kZSwgaW5WUHJlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHsgaSh2bm9kZSwgdHJ1ZSAvKiBoeWRyYXRpbmcgKi8pOyB9XG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSkge1xuICAgICAgICAvLyBjaGlsZCBjb21wb25lbnQuIGl0IHNob3VsZCBoYXZlIGh5ZHJhdGVkIGl0cyBvd24gdHJlZS5cbiAgICAgICAgaW5pdENvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzRGVmKHRhZykpIHtcbiAgICAgIGlmIChpc0RlZihjaGlsZHJlbikpIHtcbiAgICAgICAgLy8gZW1wdHkgZWxlbWVudCwgYWxsb3cgY2xpZW50IHRvIHBpY2sgdXAgYW5kIHBvcHVsYXRlIGNoaWxkcmVuXG4gICAgICAgIGlmICghZWxtLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgIGNyZWF0ZUNoaWxkcmVuKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB2LWh0bWwgYW5kIGRvbVByb3BzOiBpbm5lckhUTUxcbiAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEpICYmIGlzRGVmKGkgPSBpLmRvbVByb3BzKSAmJiBpc0RlZihpID0gaS5pbm5lckhUTUwpKSB7XG4gICAgICAgICAgICBpZiAoaSAhPT0gZWxtLmlubmVySFRNTCkge1xuICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAhaHlkcmF0aW9uQmFpbGVkXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGh5ZHJhdGlvbkJhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdQYXJlbnQ6ICcsIGVsbSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdzZXJ2ZXIgaW5uZXJIVE1MOiAnLCBpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ2NsaWVudCBpbm5lckhUTUw6ICcsIGVsbS5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpdGVyYXRlIGFuZCBjb21wYXJlIGNoaWxkcmVuIGxpc3RzXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW5NYXRjaCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgY2hpbGROb2RlID0gZWxtLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBjaGlsZHJlbi5sZW5ndGg7IGkkMSsrKSB7XG4gICAgICAgICAgICAgIGlmICghY2hpbGROb2RlIHx8ICFoeWRyYXRlKGNoaWxkTm9kZSwgY2hpbGRyZW5baSQxXSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBpblZQcmUpKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5NYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2hpbGROb2RlID0gY2hpbGROb2RlLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgY2hpbGROb2RlIGlzIG5vdCBudWxsLCBpdCBtZWFucyB0aGUgYWN0dWFsIGNoaWxkTm9kZXMgbGlzdCBpc1xuICAgICAgICAgICAgLy8gbG9uZ2VyIHRoYW4gdGhlIHZpcnR1YWwgY2hpbGRyZW4gbGlzdC5cbiAgICAgICAgICAgIGlmICghY2hpbGRyZW5NYXRjaCB8fCBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgIWh5ZHJhdGlvbkJhaWxlZFxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBoeWRyYXRpb25CYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUGFyZW50OiAnLCBlbG0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWlzbWF0Y2hpbmcgY2hpbGROb2RlcyB2cy4gVk5vZGVzOiAnLCBlbG0uY2hpbGROb2RlcywgY2hpbGRyZW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICAgIHZhciBmdWxsSW52b2tlID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgaWYgKCFpc1JlbmRlcmVkTW9kdWxlKGtleSkpIHtcbiAgICAgICAgICAgIGZ1bGxJbnZva2UgPSB0cnVlO1xuICAgICAgICAgICAgaW52b2tlQ3JlYXRlSG9va3Modm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZ1bGxJbnZva2UgJiYgZGF0YVsnY2xhc3MnXSkge1xuICAgICAgICAgIC8vIGVuc3VyZSBjb2xsZWN0aW5nIGRlcHMgZm9yIGRlZXAgY2xhc3MgYmluZGluZ3MgZm9yIGZ1dHVyZSB1cGRhdGVzXG4gICAgICAgICAgdHJhdmVyc2UoZGF0YVsnY2xhc3MnXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsbS5kYXRhICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICBlbG0uZGF0YSA9IHZub2RlLnRleHQ7XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBhc3NlcnROb2RlTWF0Y2ggKG5vZGUsIHZub2RlLCBpblZQcmUpIHtcbiAgICBpZiAoaXNEZWYodm5vZGUudGFnKSkge1xuICAgICAgcmV0dXJuIHZub2RlLnRhZy5pbmRleE9mKCd2dWUtY29tcG9uZW50JykgPT09IDAgfHwgKFxuICAgICAgICAhaXNVbmtub3duRWxlbWVudCQkMSh2bm9kZSwgaW5WUHJlKSAmJlxuICAgICAgICB2bm9kZS50YWcudG9Mb3dlckNhc2UoKSA9PT0gKG5vZGUudGFnTmFtZSAmJiBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSlcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09ICh2bm9kZS5pc0NvbW1lbnQgPyA4IDogMylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gcGF0Y2ggKG9sZFZub2RlLCB2bm9kZSwgaHlkcmF0aW5nLCByZW1vdmVPbmx5LCBwYXJlbnRFbG0sIHJlZkVsbSkge1xuICAgIGlmIChpc1VuZGVmKHZub2RlKSkge1xuICAgICAgaWYgKGlzRGVmKG9sZFZub2RlKSkgeyBpbnZva2VEZXN0cm95SG9vayhvbGRWbm9kZSk7IH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBpc0luaXRpYWxQYXRjaCA9IGZhbHNlO1xuICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcblxuICAgIGlmIChpc1VuZGVmKG9sZFZub2RlKSkge1xuICAgICAgLy8gZW1wdHkgbW91bnQgKGxpa2VseSBhcyBjb21wb25lbnQpLCBjcmVhdGUgbmV3IHJvb3QgZWxlbWVudFxuICAgICAgaXNJbml0aWFsUGF0Y2ggPSB0cnVlO1xuICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgcmVmRWxtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGlzUmVhbEVsZW1lbnQgPSBpc0RlZihvbGRWbm9kZS5ub2RlVHlwZSk7XG4gICAgICBpZiAoIWlzUmVhbEVsZW1lbnQgJiYgc2FtZVZub2RlKG9sZFZub2RlLCB2bm9kZSkpIHtcbiAgICAgICAgLy8gcGF0Y2ggZXhpc3Rpbmcgcm9vdCBub2RlXG4gICAgICAgIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHJlbW92ZU9ubHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzUmVhbEVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBtb3VudGluZyB0byBhIHJlYWwgZWxlbWVudFxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgc2VydmVyLXJlbmRlcmVkIGNvbnRlbnQgYW5kIGlmIHdlIGNhbiBwZXJmb3JtXG4gICAgICAgICAgLy8gYSBzdWNjZXNzZnVsIGh5ZHJhdGlvbi5cbiAgICAgICAgICBpZiAob2xkVm5vZGUubm9kZVR5cGUgPT09IDEgJiYgb2xkVm5vZGUuaGFzQXR0cmlidXRlKFNTUl9BVFRSKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUucmVtb3ZlQXR0cmlidXRlKFNTUl9BVFRSKTtcbiAgICAgICAgICAgIGh5ZHJhdGluZyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc1RydWUoaHlkcmF0aW5nKSkge1xuICAgICAgICAgICAgaWYgKGh5ZHJhdGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpKSB7XG4gICAgICAgICAgICAgIGludm9rZUluc2VydEhvb2sodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIHJldHVybiBvbGRWbm9kZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgICAgJ1RoZSBjbGllbnQtc2lkZSByZW5kZXJlZCB2aXJ0dWFsIERPTSB0cmVlIGlzIG5vdCBtYXRjaGluZyAnICtcbiAgICAgICAgICAgICAgICAnc2VydmVyLXJlbmRlcmVkIGNvbnRlbnQuIFRoaXMgaXMgbGlrZWx5IGNhdXNlZCBieSBpbmNvcnJlY3QgJyArXG4gICAgICAgICAgICAgICAgJ0hUTUwgbWFya3VwLCBmb3IgZXhhbXBsZSBuZXN0aW5nIGJsb2NrLWxldmVsIGVsZW1lbnRzIGluc2lkZSAnICtcbiAgICAgICAgICAgICAgICAnPHA+LCBvciBtaXNzaW5nIDx0Ym9keT4uIEJhaWxpbmcgaHlkcmF0aW9uIGFuZCBwZXJmb3JtaW5nICcgK1xuICAgICAgICAgICAgICAgICdmdWxsIGNsaWVudC1zaWRlIHJlbmRlci4nXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGVpdGhlciBub3Qgc2VydmVyLXJlbmRlcmVkLCBvciBoeWRyYXRpb24gZmFpbGVkLlxuICAgICAgICAgIC8vIGNyZWF0ZSBhbiBlbXB0eSBub2RlIGFuZCByZXBsYWNlIGl0XG4gICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXBsYWNpbmcgZXhpc3RpbmcgZWxlbWVudFxuICAgICAgICB2YXIgb2xkRWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgcGFyZW50RWxtJDEgPSBub2RlT3BzLnBhcmVudE5vZGUob2xkRWxtKTtcblxuICAgICAgICAvLyBjcmVhdGUgbmV3IG5vZGVcbiAgICAgICAgY3JlYXRlRWxtKFxuICAgICAgICAgIHZub2RlLFxuICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZSxcbiAgICAgICAgICAvLyBleHRyZW1lbHkgcmFyZSBlZGdlIGNhc2U6IGRvIG5vdCBpbnNlcnQgaWYgb2xkIGVsZW1lbnQgaXMgaW4gYVxuICAgICAgICAgIC8vIGxlYXZpbmcgdHJhbnNpdGlvbi4gT25seSBoYXBwZW5zIHdoZW4gY29tYmluaW5nIHRyYW5zaXRpb24gK1xuICAgICAgICAgIC8vIGtlZXAtYWxpdmUgKyBIT0NzLiAoIzQ1OTApXG4gICAgICAgICAgb2xkRWxtLl9sZWF2ZUNiID8gbnVsbCA6IHBhcmVudEVsbSQxLFxuICAgICAgICAgIG5vZGVPcHMubmV4dFNpYmxpbmcob2xkRWxtKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwYXJlbnQgcGxhY2Vob2xkZXIgbm9kZSBlbGVtZW50LCByZWN1cnNpdmVseVxuICAgICAgICBpZiAoaXNEZWYodm5vZGUucGFyZW50KSkge1xuICAgICAgICAgIHZhciBhbmNlc3RvciA9IHZub2RlLnBhcmVudDtcbiAgICAgICAgICB2YXIgcGF0Y2hhYmxlID0gaXNQYXRjaGFibGUodm5vZGUpO1xuICAgICAgICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYnMuZGVzdHJveS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICBjYnMuZGVzdHJveVtpXShhbmNlc3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmNlc3Rvci5lbG0gPSB2bm9kZS5lbG07XG4gICAgICAgICAgICBpZiAocGF0Y2hhYmxlKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kkMSkge1xuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaSQxXShlbXB0eU5vZGUsIGFuY2VzdG9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyAjNjUxM1xuICAgICAgICAgICAgICAvLyBpbnZva2UgaW5zZXJ0IGhvb2tzIHRoYXQgbWF5IGhhdmUgYmVlbiBtZXJnZWQgYnkgY3JlYXRlIGhvb2tzLlxuICAgICAgICAgICAgICAvLyBlLmcuIGZvciBkaXJlY3RpdmVzIHRoYXQgdXNlcyB0aGUgXCJpbnNlcnRlZFwiIGhvb2suXG4gICAgICAgICAgICAgIHZhciBpbnNlcnQgPSBhbmNlc3Rvci5kYXRhLmhvb2suaW5zZXJ0O1xuICAgICAgICAgICAgICBpZiAoaW5zZXJ0Lm1lcmdlZCkge1xuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGF0IGluZGV4IDEgdG8gYXZvaWQgcmUtaW52b2tpbmcgY29tcG9uZW50IG1vdW50ZWQgaG9va1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkkMiA9IDE7IGkkMiA8IGluc2VydC5mbnMubGVuZ3RoOyBpJDIrKykge1xuICAgICAgICAgICAgICAgICAgaW5zZXJ0LmZuc1tpJDJdKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWdpc3RlclJlZihhbmNlc3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXN0cm95IG9sZCBub2RlXG4gICAgICAgIGlmIChpc0RlZihwYXJlbnRFbG0kMSkpIHtcbiAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtJDEsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRhZykpIHtcbiAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbnZva2VJbnNlcnRIb29rKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIGlzSW5pdGlhbFBhdGNoKTtcbiAgICByZXR1cm4gdm5vZGUuZWxtXG4gIH1cbn1cblxuLyogICovXG5cbnZhciBkaXJlY3RpdmVzID0ge1xuICBjcmVhdGU6IHVwZGF0ZURpcmVjdGl2ZXMsXG4gIHVwZGF0ZTogdXBkYXRlRGlyZWN0aXZlcyxcbiAgZGVzdHJveTogZnVuY3Rpb24gdW5iaW5kRGlyZWN0aXZlcyAodm5vZGUpIHtcbiAgICB1cGRhdGVEaXJlY3RpdmVzKHZub2RlLCBlbXB0eU5vZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZURpcmVjdGl2ZXMgKG9sZFZub2RlLCB2bm9kZSkge1xuICBpZiAob2xkVm5vZGUuZGF0YS5kaXJlY3RpdmVzIHx8IHZub2RlLmRhdGEuZGlyZWN0aXZlcykge1xuICAgIF91cGRhdGUob2xkVm5vZGUsIHZub2RlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXBkYXRlIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgdmFyIGlzQ3JlYXRlID0gb2xkVm5vZGUgPT09IGVtcHR5Tm9kZTtcbiAgdmFyIGlzRGVzdHJveSA9IHZub2RlID09PSBlbXB0eU5vZGU7XG4gIHZhciBvbGREaXJzID0gbm9ybWFsaXplRGlyZWN0aXZlcyQxKG9sZFZub2RlLmRhdGEuZGlyZWN0aXZlcywgb2xkVm5vZGUuY29udGV4dCk7XG4gIHZhciBuZXdEaXJzID0gbm9ybWFsaXplRGlyZWN0aXZlcyQxKHZub2RlLmRhdGEuZGlyZWN0aXZlcywgdm5vZGUuY29udGV4dCk7XG5cbiAgdmFyIGRpcnNXaXRoSW5zZXJ0ID0gW107XG4gIHZhciBkaXJzV2l0aFBvc3RwYXRjaCA9IFtdO1xuXG4gIHZhciBrZXksIG9sZERpciwgZGlyO1xuICBmb3IgKGtleSBpbiBuZXdEaXJzKSB7XG4gICAgb2xkRGlyID0gb2xkRGlyc1trZXldO1xuICAgIGRpciA9IG5ld0RpcnNba2V5XTtcbiAgICBpZiAoIW9sZERpcikge1xuICAgICAgLy8gbmV3IGRpcmVjdGl2ZSwgYmluZFxuICAgICAgY2FsbEhvb2skMShkaXIsICdiaW5kJywgdm5vZGUsIG9sZFZub2RlKTtcbiAgICAgIGlmIChkaXIuZGVmICYmIGRpci5kZWYuaW5zZXJ0ZWQpIHtcbiAgICAgICAgZGlyc1dpdGhJbnNlcnQucHVzaChkaXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBleGlzdGluZyBkaXJlY3RpdmUsIHVwZGF0ZVxuICAgICAgZGlyLm9sZFZhbHVlID0gb2xkRGlyLnZhbHVlO1xuICAgICAgY2FsbEhvb2skMShkaXIsICd1cGRhdGUnLCB2bm9kZSwgb2xkVm5vZGUpO1xuICAgICAgaWYgKGRpci5kZWYgJiYgZGlyLmRlZi5jb21wb25lbnRVcGRhdGVkKSB7XG4gICAgICAgIGRpcnNXaXRoUG9zdHBhdGNoLnB1c2goZGlyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoZGlyc1dpdGhJbnNlcnQubGVuZ3RoKSB7XG4gICAgdmFyIGNhbGxJbnNlcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcnNXaXRoSW5zZXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNhbGxIb29rJDEoZGlyc1dpdGhJbnNlcnRbaV0sICdpbnNlcnRlZCcsIHZub2RlLCBvbGRWbm9kZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoaXNDcmVhdGUpIHtcbiAgICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLCAnaW5zZXJ0JywgY2FsbEluc2VydCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxJbnNlcnQoKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZGlyc1dpdGhQb3N0cGF0Y2gubGVuZ3RoKSB7XG4gICAgbWVyZ2VWTm9kZUhvb2sodm5vZGUsICdwb3N0cGF0Y2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcnNXaXRoUG9zdHBhdGNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNhbGxIb29rJDEoZGlyc1dpdGhQb3N0cGF0Y2hbaV0sICdjb21wb25lbnRVcGRhdGVkJywgdm5vZGUsIG9sZFZub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmICghaXNDcmVhdGUpIHtcbiAgICBmb3IgKGtleSBpbiBvbGREaXJzKSB7XG4gICAgICBpZiAoIW5ld0RpcnNba2V5XSkge1xuICAgICAgICAvLyBubyBsb25nZXIgcHJlc2VudCwgdW5iaW5kXG4gICAgICAgIGNhbGxIb29rJDEob2xkRGlyc1trZXldLCAndW5iaW5kJywgb2xkVm5vZGUsIG9sZFZub2RlLCBpc0Rlc3Ryb3kpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG52YXIgZW1wdHlNb2RpZmllcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVEaXJlY3RpdmVzJDEgKFxuICBkaXJzLFxuICB2bVxuKSB7XG4gIHZhciByZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBpZiAoIWRpcnMpIHtcbiAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gcmVzXG4gIH1cbiAgdmFyIGksIGRpcjtcbiAgZm9yIChpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyBpKyspIHtcbiAgICBkaXIgPSBkaXJzW2ldO1xuICAgIGlmICghZGlyLm1vZGlmaWVycykge1xuICAgICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgICBkaXIubW9kaWZpZXJzID0gZW1wdHlNb2RpZmllcnM7XG4gICAgfVxuICAgIHJlc1tnZXRSYXdEaXJOYW1lKGRpcildID0gZGlyO1xuICAgIGRpci5kZWYgPSByZXNvbHZlQXNzZXQodm0uJG9wdGlvbnMsICdkaXJlY3RpdmVzJywgZGlyLm5hbWUsIHRydWUpO1xuICB9XG4gIC8vICRmbG93LWRpc2FibGUtbGluZVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGdldFJhd0Rpck5hbWUgKGRpcikge1xuICByZXR1cm4gZGlyLnJhd05hbWUgfHwgKChkaXIubmFtZSkgKyBcIi5cIiArIChPYmplY3Qua2V5cyhkaXIubW9kaWZpZXJzIHx8IHt9KS5qb2luKCcuJykpKVxufVxuXG5mdW5jdGlvbiBjYWxsSG9vayQxIChkaXIsIGhvb2ssIHZub2RlLCBvbGRWbm9kZSwgaXNEZXN0cm95KSB7XG4gIHZhciBmbiA9IGRpci5kZWYgJiYgZGlyLmRlZltob29rXTtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIGZuKHZub2RlLmVsbSwgZGlyLCB2bm9kZSwgb2xkVm5vZGUsIGlzRGVzdHJveSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaGFuZGxlRXJyb3IoZSwgdm5vZGUuY29udGV4dCwgKFwiZGlyZWN0aXZlIFwiICsgKGRpci5uYW1lKSArIFwiIFwiICsgaG9vayArIFwiIGhvb2tcIikpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgYmFzZU1vZHVsZXMgPSBbXG4gIHJlZixcbiAgZGlyZWN0aXZlc1xuXVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gdXBkYXRlQXR0cnMgKG9sZFZub2RlLCB2bm9kZSkge1xuICB2YXIgb3B0cyA9IHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gIGlmIChpc0RlZihvcHRzKSAmJiBvcHRzLkN0b3Iub3B0aW9ucy5pbmhlcml0QXR0cnMgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKGlzVW5kZWYob2xkVm5vZGUuZGF0YS5hdHRycykgJiYgaXNVbmRlZih2bm9kZS5kYXRhLmF0dHJzKSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBrZXksIGN1ciwgb2xkO1xuICB2YXIgZWxtID0gdm5vZGUuZWxtO1xuICB2YXIgb2xkQXR0cnMgPSBvbGRWbm9kZS5kYXRhLmF0dHJzIHx8IHt9O1xuICB2YXIgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzIHx8IHt9O1xuICAvLyBjbG9uZSBvYnNlcnZlZCBvYmplY3RzLCBhcyB0aGUgdXNlciBwcm9iYWJseSB3YW50cyB0byBtdXRhdGUgaXRcbiAgaWYgKGlzRGVmKGF0dHJzLl9fb2JfXykpIHtcbiAgICBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnMgPSBleHRlbmQoe30sIGF0dHJzKTtcbiAgfVxuXG4gIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgY3VyID0gYXR0cnNba2V5XTtcbiAgICBvbGQgPSBvbGRBdHRyc1trZXldO1xuICAgIGlmIChvbGQgIT09IGN1cikge1xuICAgICAgc2V0QXR0cihlbG0sIGtleSwgY3VyKTtcbiAgICB9XG4gIH1cbiAgLy8gIzQzOTE6IGluIElFOSwgc2V0dGluZyB0eXBlIGNhbiByZXNldCB2YWx1ZSBmb3IgaW5wdXRbdHlwZT1yYWRpb11cbiAgLy8gIzY2NjY6IElFL0VkZ2UgZm9yY2VzIHByb2dyZXNzIHZhbHVlIGRvd24gdG8gMSBiZWZvcmUgc2V0dGluZyBhIG1heFxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKChpc0lFIHx8IGlzRWRnZSkgJiYgYXR0cnMudmFsdWUgIT09IG9sZEF0dHJzLnZhbHVlKSB7XG4gICAgc2V0QXR0cihlbG0sICd2YWx1ZScsIGF0dHJzLnZhbHVlKTtcbiAgfVxuICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgIGlmIChpc1VuZGVmKGF0dHJzW2tleV0pKSB7XG4gICAgICBpZiAoaXNYbGluayhrZXkpKSB7XG4gICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCBnZXRYbGlua1Byb3Aoa2V5KSk7XG4gICAgICB9IGVsc2UgaWYgKCFpc0VudW1lcmF0ZWRBdHRyKGtleSkpIHtcbiAgICAgICAgZWxtLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRBdHRyIChlbCwga2V5LCB2YWx1ZSkge1xuICBpZiAoZWwudGFnTmFtZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgIGJhc2VTZXRBdHRyKGVsLCBrZXksIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChpc0Jvb2xlYW5BdHRyKGtleSkpIHtcbiAgICAvLyBzZXQgYXR0cmlidXRlIGZvciBibGFuayB2YWx1ZVxuICAgIC8vIGUuZy4gPG9wdGlvbiBkaXNhYmxlZD5TZWxlY3Qgb25lPC9vcHRpb24+XG4gICAgaWYgKGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGVjaG5pY2FsbHkgYWxsb3dmdWxsc2NyZWVuIGlzIGEgYm9vbGVhbiBhdHRyaWJ1dGUgZm9yIDxpZnJhbWU+LFxuICAgICAgLy8gYnV0IEZsYXNoIGV4cGVjdHMgYSB2YWx1ZSBvZiBcInRydWVcIiB3aGVuIHVzZWQgb24gPGVtYmVkPiB0YWdcbiAgICAgIHZhbHVlID0ga2V5ID09PSAnYWxsb3dmdWxsc2NyZWVuJyAmJiBlbC50YWdOYW1lID09PSAnRU1CRUQnXG4gICAgICAgID8gJ3RydWUnXG4gICAgICAgIDoga2V5O1xuICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0VudW1lcmF0ZWRBdHRyKGtleSkpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCBpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSB8fCB2YWx1ZSA9PT0gJ2ZhbHNlJyA/ICdmYWxzZScgOiAndHJ1ZScpO1xuICB9IGVsc2UgaWYgKGlzWGxpbmsoa2V5KSkge1xuICAgIGlmIChpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlTlMoeGxpbmtOUywgZ2V0WGxpbmtQcm9wKGtleSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYmFzZVNldEF0dHIoZWwsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2VTZXRBdHRyIChlbCwga2V5LCB2YWx1ZSkge1xuICBpZiAoaXNGYWxzeUF0dHJWYWx1ZSh2YWx1ZSkpIHtcbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgfSBlbHNlIHtcbiAgICAvLyAjNzEzODogSUUxMCAmIDExIGZpcmVzIGlucHV0IGV2ZW50IHdoZW4gc2V0dGluZyBwbGFjZWhvbGRlciBvblxuICAgIC8vIDx0ZXh0YXJlYT4uLi4gYmxvY2sgdGhlIGZpcnN0IGlucHV0IGV2ZW50IGFuZCByZW1vdmUgdGhlIGJsb2NrZXJcbiAgICAvLyBpbW1lZGlhdGVseS5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoXG4gICAgICBpc0lFICYmICFpc0lFOSAmJlxuICAgICAgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJyAmJlxuICAgICAga2V5ID09PSAncGxhY2Vob2xkZXInICYmICFlbC5fX2llcGhcbiAgICApIHtcbiAgICAgIHZhciBibG9ja2VyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBibG9ja2VyKTtcbiAgICAgIH07XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGJsb2NrZXIpO1xuICAgICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgICBlbC5fX2llcGggPSB0cnVlOyAvKiBJRSBwbGFjZWhvbGRlciBwYXRjaGVkICovXG4gICAgfVxuICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgfVxufVxuXG52YXIgYXR0cnMgPSB7XG4gIGNyZWF0ZTogdXBkYXRlQXR0cnMsXG4gIHVwZGF0ZTogdXBkYXRlQXR0cnNcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIHVwZGF0ZUNsYXNzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgdmFyIGVsID0gdm5vZGUuZWxtO1xuICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gIHZhciBvbGREYXRhID0gb2xkVm5vZGUuZGF0YTtcbiAgaWYgKFxuICAgIGlzVW5kZWYoZGF0YS5zdGF0aWNDbGFzcykgJiZcbiAgICBpc1VuZGVmKGRhdGEuY2xhc3MpICYmIChcbiAgICAgIGlzVW5kZWYob2xkRGF0YSkgfHwgKFxuICAgICAgICBpc1VuZGVmKG9sZERhdGEuc3RhdGljQ2xhc3MpICYmXG4gICAgICAgIGlzVW5kZWYob2xkRGF0YS5jbGFzcylcbiAgICAgIClcbiAgICApXG4gICkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGNscyA9IGdlbkNsYXNzRm9yVm5vZGUodm5vZGUpO1xuXG4gIC8vIGhhbmRsZSB0cmFuc2l0aW9uIGNsYXNzZXNcbiAgdmFyIHRyYW5zaXRpb25DbGFzcyA9IGVsLl90cmFuc2l0aW9uQ2xhc3NlcztcbiAgaWYgKGlzRGVmKHRyYW5zaXRpb25DbGFzcykpIHtcbiAgICBjbHMgPSBjb25jYXQoY2xzLCBzdHJpbmdpZnlDbGFzcyh0cmFuc2l0aW9uQ2xhc3MpKTtcbiAgfVxuXG4gIC8vIHNldCB0aGUgY2xhc3NcbiAgaWYgKGNscyAhPT0gZWwuX3ByZXZDbGFzcykge1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbHMpO1xuICAgIGVsLl9wcmV2Q2xhc3MgPSBjbHM7XG4gIH1cbn1cblxudmFyIGtsYXNzID0ge1xuICBjcmVhdGU6IHVwZGF0ZUNsYXNzLFxuICB1cGRhdGU6IHVwZGF0ZUNsYXNzXG59XG5cbi8qICAqL1xuXG4vKiAgKi9cblxuXG5cblxuXG5cblxuXG5cbi8vIGFkZCBhIHJhdyBhdHRyICh1c2UgdGhpcyBpbiBwcmVUcmFuc2Zvcm1zKVxuXG5cblxuXG5cblxuXG5cbi8vIG5vdGU6IHRoaXMgb25seSByZW1vdmVzIHRoZSBhdHRyIGZyb20gdGhlIEFycmF5IChhdHRyc0xpc3QpIHNvIHRoYXQgaXRcbi8vIGRvZXNuJ3QgZ2V0IHByb2Nlc3NlZCBieSBwcm9jZXNzQXR0cnMuXG4vLyBCeSBkZWZhdWx0IGl0IGRvZXMgTk9UIHJlbW92ZSBpdCBmcm9tIHRoZSBtYXAgKGF0dHJzTWFwKSBiZWNhdXNlIHRoZSBtYXAgaXNcbi8vIG5lZWRlZCBkdXJpbmcgY29kZWdlbi5cblxuLyogICovXG5cbi8qKlxuICogQ3Jvc3MtcGxhdGZvcm0gY29kZSBnZW5lcmF0aW9uIGZvciBjb21wb25lbnQgdi1tb2RlbFxuICovXG5cblxuLyoqXG4gKiBDcm9zcy1wbGF0Zm9ybSBjb2RlZ2VuIGhlbHBlciBmb3IgZ2VuZXJhdGluZyB2LW1vZGVsIHZhbHVlIGFzc2lnbm1lbnQgY29kZS5cbiAqL1xuXG4vKiAgKi9cblxuLy8gaW4gc29tZSBjYXNlcywgdGhlIGV2ZW50IHVzZWQgaGFzIHRvIGJlIGRldGVybWluZWQgYXQgcnVudGltZVxuLy8gc28gd2UgdXNlZCBzb21lIHJlc2VydmVkIHRva2VucyBkdXJpbmcgY29tcGlsZS5cbnZhciBSQU5HRV9UT0tFTiA9ICdfX3InO1xudmFyIENIRUNLQk9YX1JBRElPX1RPS0VOID0gJ19fYyc7XG5cbi8qICAqL1xuXG4vLyBub3JtYWxpemUgdi1tb2RlbCBldmVudCB0b2tlbnMgdGhhdCBjYW4gb25seSBiZSBkZXRlcm1pbmVkIGF0IHJ1bnRpbWUuXG4vLyBpdCdzIGltcG9ydGFudCB0byBwbGFjZSB0aGUgZXZlbnQgYXMgdGhlIGZpcnN0IGluIHRoZSBhcnJheSBiZWNhdXNlXG4vLyB0aGUgd2hvbGUgcG9pbnQgaXMgZW5zdXJpbmcgdGhlIHYtbW9kZWwgY2FsbGJhY2sgZ2V0cyBjYWxsZWQgYmVmb3JlXG4vLyB1c2VyLWF0dGFjaGVkIGhhbmRsZXJzLlxuZnVuY3Rpb24gbm9ybWFsaXplRXZlbnRzIChvbikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGlzRGVmKG9uW1JBTkdFX1RPS0VOXSkpIHtcbiAgICAvLyBJRSBpbnB1dFt0eXBlPXJhbmdlXSBvbmx5IHN1cHBvcnRzIGBjaGFuZ2VgIGV2ZW50XG4gICAgdmFyIGV2ZW50ID0gaXNJRSA/ICdjaGFuZ2UnIDogJ2lucHV0JztcbiAgICBvbltldmVudF0gPSBbXS5jb25jYXQob25bUkFOR0VfVE9LRU5dLCBvbltldmVudF0gfHwgW10pO1xuICAgIGRlbGV0ZSBvbltSQU5HRV9UT0tFTl07XG4gIH1cbiAgLy8gVGhpcyB3YXMgb3JpZ2luYWxseSBpbnRlbmRlZCB0byBmaXggIzQ1MjEgYnV0IG5vIGxvbmdlciBuZWNlc3NhcnlcbiAgLy8gYWZ0ZXIgMi41LiBLZWVwaW5nIGl0IGZvciBiYWNrd2FyZHMgY29tcGF0IHdpdGggZ2VuZXJhdGVkIGNvZGUgZnJvbSA8IDIuNFxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGlzRGVmKG9uW0NIRUNLQk9YX1JBRElPX1RPS0VOXSkpIHtcbiAgICBvbi5jaGFuZ2UgPSBbXS5jb25jYXQob25bQ0hFQ0tCT1hfUkFESU9fVE9LRU5dLCBvbi5jaGFuZ2UgfHwgW10pO1xuICAgIGRlbGV0ZSBvbltDSEVDS0JPWF9SQURJT19UT0tFTl07XG4gIH1cbn1cblxudmFyIHRhcmdldCQxO1xuXG5mdW5jdGlvbiBjcmVhdGVPbmNlSGFuZGxlciAoaGFuZGxlciwgZXZlbnQsIGNhcHR1cmUpIHtcbiAgdmFyIF90YXJnZXQgPSB0YXJnZXQkMTsgLy8gc2F2ZSBjdXJyZW50IHRhcmdldCBlbGVtZW50IGluIGNsb3N1cmVcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uY2VIYW5kbGVyICgpIHtcbiAgICB2YXIgcmVzID0gaGFuZGxlci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIGlmIChyZXMgIT09IG51bGwpIHtcbiAgICAgIHJlbW92ZSQyKGV2ZW50LCBvbmNlSGFuZGxlciwgY2FwdHVyZSwgX3RhcmdldCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZCQxIChcbiAgZXZlbnQsXG4gIGhhbmRsZXIsXG4gIG9uY2UkJDEsXG4gIGNhcHR1cmUsXG4gIHBhc3NpdmVcbikge1xuICBoYW5kbGVyID0gd2l0aE1hY3JvVGFzayhoYW5kbGVyKTtcbiAgaWYgKG9uY2UkJDEpIHsgaGFuZGxlciA9IGNyZWF0ZU9uY2VIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCBjYXB0dXJlKTsgfVxuICB0YXJnZXQkMS5hZGRFdmVudExpc3RlbmVyKFxuICAgIGV2ZW50LFxuICAgIGhhbmRsZXIsXG4gICAgc3VwcG9ydHNQYXNzaXZlXG4gICAgICA/IHsgY2FwdHVyZTogY2FwdHVyZSwgcGFzc2l2ZTogcGFzc2l2ZSB9XG4gICAgICA6IGNhcHR1cmVcbiAgKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlJDIgKFxuICBldmVudCxcbiAgaGFuZGxlcixcbiAgY2FwdHVyZSxcbiAgX3RhcmdldFxuKSB7XG4gIChfdGFyZ2V0IHx8IHRhcmdldCQxKS5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgIGV2ZW50LFxuICAgIGhhbmRsZXIuX3dpdGhUYXNrIHx8IGhhbmRsZXIsXG4gICAgY2FwdHVyZVxuICApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVET01MaXN0ZW5lcnMgKG9sZFZub2RlLCB2bm9kZSkge1xuICBpZiAoaXNVbmRlZihvbGRWbm9kZS5kYXRhLm9uKSAmJiBpc1VuZGVmKHZub2RlLmRhdGEub24pKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9uID0gdm5vZGUuZGF0YS5vbiB8fCB7fTtcbiAgdmFyIG9sZE9uID0gb2xkVm5vZGUuZGF0YS5vbiB8fCB7fTtcbiAgdGFyZ2V0JDEgPSB2bm9kZS5lbG07XG4gIG5vcm1hbGl6ZUV2ZW50cyhvbik7XG4gIHVwZGF0ZUxpc3RlbmVycyhvbiwgb2xkT24sIGFkZCQxLCByZW1vdmUkMiwgdm5vZGUuY29udGV4dCk7XG4gIHRhcmdldCQxID0gdW5kZWZpbmVkO1xufVxuXG52YXIgZXZlbnRzID0ge1xuICBjcmVhdGU6IHVwZGF0ZURPTUxpc3RlbmVycyxcbiAgdXBkYXRlOiB1cGRhdGVET01MaXN0ZW5lcnNcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIHVwZGF0ZURPTVByb3BzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgaWYgKGlzVW5kZWYob2xkVm5vZGUuZGF0YS5kb21Qcm9wcykgJiYgaXNVbmRlZih2bm9kZS5kYXRhLmRvbVByb3BzKSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBrZXksIGN1cjtcbiAgdmFyIGVsbSA9IHZub2RlLmVsbTtcbiAgdmFyIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5kb21Qcm9wcyB8fCB7fTtcbiAgdmFyIHByb3BzID0gdm5vZGUuZGF0YS5kb21Qcm9wcyB8fCB7fTtcbiAgLy8gY2xvbmUgb2JzZXJ2ZWQgb2JqZWN0cywgYXMgdGhlIHVzZXIgcHJvYmFibHkgd2FudHMgdG8gbXV0YXRlIGl0XG4gIGlmIChpc0RlZihwcm9wcy5fX29iX18pKSB7XG4gICAgcHJvcHMgPSB2bm9kZS5kYXRhLmRvbVByb3BzID0gZXh0ZW5kKHt9LCBwcm9wcyk7XG4gIH1cblxuICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgIGlmIChpc1VuZGVmKHByb3BzW2tleV0pKSB7XG4gICAgICBlbG1ba2V5XSA9ICcnO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgLy8gaWdub3JlIGNoaWxkcmVuIGlmIHRoZSBub2RlIGhhcyB0ZXh0Q29udGVudCBvciBpbm5lckhUTUwsXG4gICAgLy8gYXMgdGhlc2Ugd2lsbCB0aHJvdyBhd2F5IGV4aXN0aW5nIERPTSBub2RlcyBhbmQgY2F1c2UgcmVtb3ZhbCBlcnJvcnNcbiAgICAvLyBvbiBzdWJzZXF1ZW50IHBhdGNoZXMgKCMzMzYwKVxuICAgIGlmIChrZXkgPT09ICd0ZXh0Q29udGVudCcgfHwga2V5ID09PSAnaW5uZXJIVE1MJykge1xuICAgICAgaWYgKHZub2RlLmNoaWxkcmVuKSB7IHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9IDA7IH1cbiAgICAgIGlmIChjdXIgPT09IG9sZFByb3BzW2tleV0pIHsgY29udGludWUgfVxuICAgICAgLy8gIzY2MDEgd29yayBhcm91bmQgQ2hyb21lIHZlcnNpb24gPD0gNTUgYnVnIHdoZXJlIHNpbmdsZSB0ZXh0Tm9kZVxuICAgICAgLy8gcmVwbGFjZWQgYnkgaW5uZXJIVE1ML3RleHRDb250ZW50IHJldGFpbnMgaXRzIHBhcmVudE5vZGUgcHJvcGVydHlcbiAgICAgIGlmIChlbG0uY2hpbGROb2Rlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZWxtLnJlbW92ZUNoaWxkKGVsbS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAndmFsdWUnKSB7XG4gICAgICAvLyBzdG9yZSB2YWx1ZSBhcyBfdmFsdWUgYXMgd2VsbCBzaW5jZVxuICAgICAgLy8gbm9uLXN0cmluZyB2YWx1ZXMgd2lsbCBiZSBzdHJpbmdpZmllZFxuICAgICAgZWxtLl92YWx1ZSA9IGN1cjtcbiAgICAgIC8vIGF2b2lkIHJlc2V0dGluZyBjdXJzb3IgcG9zaXRpb24gd2hlbiB2YWx1ZSBpcyB0aGUgc2FtZVxuICAgICAgdmFyIHN0ckN1ciA9IGlzVW5kZWYoY3VyKSA/ICcnIDogU3RyaW5nKGN1cik7XG4gICAgICBpZiAoc2hvdWxkVXBkYXRlVmFsdWUoZWxtLCBzdHJDdXIpKSB7XG4gICAgICAgIGVsbS52YWx1ZSA9IHN0ckN1cjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgfVxuICB9XG59XG5cbi8vIGNoZWNrIHBsYXRmb3Jtcy93ZWIvdXRpbC9hdHRycy5qcyBhY2NlcHRWYWx1ZVxuXG5cbmZ1bmN0aW9uIHNob3VsZFVwZGF0ZVZhbHVlIChlbG0sIGNoZWNrVmFsKSB7XG4gIHJldHVybiAoIWVsbS5jb21wb3NpbmcgJiYgKFxuICAgIGVsbS50YWdOYW1lID09PSAnT1BUSU9OJyB8fFxuICAgIGlzTm90SW5Gb2N1c0FuZERpcnR5KGVsbSwgY2hlY2tWYWwpIHx8XG4gICAgaXNEaXJ0eVdpdGhNb2RpZmllcnMoZWxtLCBjaGVja1ZhbClcbiAgKSlcbn1cblxuZnVuY3Rpb24gaXNOb3RJbkZvY3VzQW5kRGlydHkgKGVsbSwgY2hlY2tWYWwpIHtcbiAgLy8gcmV0dXJuIHRydWUgd2hlbiB0ZXh0Ym94ICgubnVtYmVyIGFuZCAudHJpbSkgbG9zZXMgZm9jdXMgYW5kIGl0cyB2YWx1ZSBpc1xuICAvLyBub3QgZXF1YWwgdG8gdGhlIHVwZGF0ZWQgdmFsdWVcbiAgdmFyIG5vdEluRm9jdXMgPSB0cnVlO1xuICAvLyAjNjE1N1xuICAvLyB3b3JrIGFyb3VuZCBJRSBidWcgd2hlbiBhY2Nlc3NpbmcgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbiBhbiBpZnJhbWVcbiAgdHJ5IHsgbm90SW5Gb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGVsbTsgfSBjYXRjaCAoZSkge31cbiAgcmV0dXJuIG5vdEluRm9jdXMgJiYgZWxtLnZhbHVlICE9PSBjaGVja1ZhbFxufVxuXG5mdW5jdGlvbiBpc0RpcnR5V2l0aE1vZGlmaWVycyAoZWxtLCBuZXdWYWwpIHtcbiAgdmFyIHZhbHVlID0gZWxtLnZhbHVlO1xuICB2YXIgbW9kaWZpZXJzID0gZWxtLl92TW9kaWZpZXJzOyAvLyBpbmplY3RlZCBieSB2LW1vZGVsIHJ1bnRpbWVcbiAgaWYgKGlzRGVmKG1vZGlmaWVycykpIHtcbiAgICBpZiAobW9kaWZpZXJzLmxhenkpIHtcbiAgICAgIC8vIGlucHV0cyB3aXRoIGxhenkgc2hvdWxkIG9ubHkgYmUgdXBkYXRlZCB3aGVuIG5vdCBpbiBmb2N1c1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmIChtb2RpZmllcnMubnVtYmVyKSB7XG4gICAgICByZXR1cm4gdG9OdW1iZXIodmFsdWUpICE9PSB0b051bWJlcihuZXdWYWwpXG4gICAgfVxuICAgIGlmIChtb2RpZmllcnMudHJpbSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRyaW0oKSAhPT0gbmV3VmFsLnRyaW0oKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWUgIT09IG5ld1ZhbFxufVxuXG52YXIgZG9tUHJvcHMgPSB7XG4gIGNyZWF0ZTogdXBkYXRlRE9NUHJvcHMsXG4gIHVwZGF0ZTogdXBkYXRlRE9NUHJvcHNcbn1cblxuLyogICovXG5cbnZhciBwYXJzZVN0eWxlVGV4dCA9IGNhY2hlZChmdW5jdGlvbiAoY3NzVGV4dCkge1xuICB2YXIgcmVzID0ge307XG4gIHZhciBsaXN0RGVsaW1pdGVyID0gLzsoPyFbXihdKlxcKSkvZztcbiAgdmFyIHByb3BlcnR5RGVsaW1pdGVyID0gLzooLispLztcbiAgY3NzVGV4dC5zcGxpdChsaXN0RGVsaW1pdGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHZhciB0bXAgPSBpdGVtLnNwbGl0KHByb3BlcnR5RGVsaW1pdGVyKTtcbiAgICAgIHRtcC5sZW5ndGggPiAxICYmIChyZXNbdG1wWzBdLnRyaW0oKV0gPSB0bXBbMV0udHJpbSgpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxuLy8gbWVyZ2Ugc3RhdGljIGFuZCBkeW5hbWljIHN0eWxlIGRhdGEgb24gdGhlIHNhbWUgdm5vZGVcbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0eWxlRGF0YSAoZGF0YSkge1xuICB2YXIgc3R5bGUgPSBub3JtYWxpemVTdHlsZUJpbmRpbmcoZGF0YS5zdHlsZSk7XG4gIC8vIHN0YXRpYyBzdHlsZSBpcyBwcmUtcHJvY2Vzc2VkIGludG8gYW4gb2JqZWN0IGR1cmluZyBjb21waWxhdGlvblxuICAvLyBhbmQgaXMgYWx3YXlzIGEgZnJlc2ggb2JqZWN0LCBzbyBpdCdzIHNhZmUgdG8gbWVyZ2UgaW50byBpdFxuICByZXR1cm4gZGF0YS5zdGF0aWNTdHlsZVxuICAgID8gZXh0ZW5kKGRhdGEuc3RhdGljU3R5bGUsIHN0eWxlKVxuICAgIDogc3R5bGVcbn1cblxuLy8gbm9ybWFsaXplIHBvc3NpYmxlIGFycmF5IC8gc3RyaW5nIHZhbHVlcyBpbnRvIE9iamVjdFxuZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVCaW5kaW5nIChiaW5kaW5nU3R5bGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYmluZGluZ1N0eWxlKSkge1xuICAgIHJldHVybiB0b09iamVjdChiaW5kaW5nU3R5bGUpXG4gIH1cbiAgaWYgKHR5cGVvZiBiaW5kaW5nU3R5bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhcnNlU3R5bGVUZXh0KGJpbmRpbmdTdHlsZSlcbiAgfVxuICByZXR1cm4gYmluZGluZ1N0eWxlXG59XG5cbi8qKlxuICogcGFyZW50IGNvbXBvbmVudCBzdHlsZSBzaG91bGQgYmUgYWZ0ZXIgY2hpbGQnc1xuICogc28gdGhhdCBwYXJlbnQgY29tcG9uZW50J3Mgc3R5bGUgY291bGQgb3ZlcnJpZGUgaXRcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGUgKHZub2RlLCBjaGVja0NoaWxkKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIHN0eWxlRGF0YTtcblxuICBpZiAoY2hlY2tDaGlsZCkge1xuICAgIHZhciBjaGlsZE5vZGUgPSB2bm9kZTtcbiAgICB3aGlsZSAoY2hpbGROb2RlLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlO1xuICAgICAgaWYgKFxuICAgICAgICBjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmRhdGEgJiZcbiAgICAgICAgKHN0eWxlRGF0YSA9IG5vcm1hbGl6ZVN0eWxlRGF0YShjaGlsZE5vZGUuZGF0YSkpXG4gICAgICApIHtcbiAgICAgICAgZXh0ZW5kKHJlcywgc3R5bGVEYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoKHN0eWxlRGF0YSA9IG5vcm1hbGl6ZVN0eWxlRGF0YSh2bm9kZS5kYXRhKSkpIHtcbiAgICBleHRlbmQocmVzLCBzdHlsZURhdGEpO1xuICB9XG5cbiAgdmFyIHBhcmVudE5vZGUgPSB2bm9kZTtcbiAgd2hpbGUgKChwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnQpKSB7XG4gICAgaWYgKHBhcmVudE5vZGUuZGF0YSAmJiAoc3R5bGVEYXRhID0gbm9ybWFsaXplU3R5bGVEYXRhKHBhcmVudE5vZGUuZGF0YSkpKSB7XG4gICAgICBleHRlbmQocmVzLCBzdHlsZURhdGEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG52YXIgY3NzVmFyUkUgPSAvXi0tLztcbnZhciBpbXBvcnRhbnRSRSA9IC9cXHMqIWltcG9ydGFudCQvO1xudmFyIHNldFByb3AgPSBmdW5jdGlvbiAoZWwsIG5hbWUsIHZhbCkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGNzc1ZhclJFLnRlc3QobmFtZSkpIHtcbiAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWwpO1xuICB9IGVsc2UgaWYgKGltcG9ydGFudFJFLnRlc3QodmFsKSkge1xuICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHZhbC5yZXBsYWNlKGltcG9ydGFudFJFLCAnJyksICdpbXBvcnRhbnQnKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbm9ybWFsaXplZE5hbWUgPSBub3JtYWxpemUobmFtZSk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgLy8gU3VwcG9ydCB2YWx1ZXMgYXJyYXkgY3JlYXRlZCBieSBhdXRvcHJlZml4ZXIsIGUuZy5cbiAgICAgIC8vIHtkaXNwbGF5OiBbXCItd2Via2l0LWJveFwiLCBcIi1tcy1mbGV4Ym94XCIsIFwiZmxleFwiXX1cbiAgICAgIC8vIFNldCB0aGVtIG9uZSBieSBvbmUsIGFuZCB0aGUgYnJvd3NlciB3aWxsIG9ubHkgc2V0IHRob3NlIGl0IGNhbiByZWNvZ25pemVcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZWwuc3R5bGVbbm9ybWFsaXplZE5hbWVdID0gdmFsW2ldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZVtub3JtYWxpemVkTmFtZV0gPSB2YWw7XG4gICAgfVxuICB9XG59O1xuXG52YXIgdmVuZG9yTmFtZXMgPSBbJ1dlYmtpdCcsICdNb3onLCAnbXMnXTtcblxudmFyIGVtcHR5U3R5bGU7XG52YXIgbm9ybWFsaXplID0gY2FjaGVkKGZ1bmN0aW9uIChwcm9wKSB7XG4gIGVtcHR5U3R5bGUgPSBlbXB0eVN0eWxlIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlO1xuICBwcm9wID0gY2FtZWxpemUocHJvcCk7XG4gIGlmIChwcm9wICE9PSAnZmlsdGVyJyAmJiAocHJvcCBpbiBlbXB0eVN0eWxlKSkge1xuICAgIHJldHVybiBwcm9wXG4gIH1cbiAgdmFyIGNhcE5hbWUgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZW5kb3JOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuYW1lID0gdmVuZG9yTmFtZXNbaV0gKyBjYXBOYW1lO1xuICAgIGlmIChuYW1lIGluIGVtcHR5U3R5bGUpIHtcbiAgICAgIHJldHVybiBuYW1lXG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG9sZFZub2RlLCB2bm9kZSkge1xuICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gIHZhciBvbGREYXRhID0gb2xkVm5vZGUuZGF0YTtcblxuICBpZiAoaXNVbmRlZihkYXRhLnN0YXRpY1N0eWxlKSAmJiBpc1VuZGVmKGRhdGEuc3R5bGUpICYmXG4gICAgaXNVbmRlZihvbGREYXRhLnN0YXRpY1N0eWxlKSAmJiBpc1VuZGVmKG9sZERhdGEuc3R5bGUpXG4gICkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGN1ciwgbmFtZTtcbiAgdmFyIGVsID0gdm5vZGUuZWxtO1xuICB2YXIgb2xkU3RhdGljU3R5bGUgPSBvbGREYXRhLnN0YXRpY1N0eWxlO1xuICB2YXIgb2xkU3R5bGVCaW5kaW5nID0gb2xkRGF0YS5ub3JtYWxpemVkU3R5bGUgfHwgb2xkRGF0YS5zdHlsZSB8fCB7fTtcblxuICAvLyBpZiBzdGF0aWMgc3R5bGUgZXhpc3RzLCBzdHlsZWJpbmRpbmcgYWxyZWFkeSBtZXJnZWQgaW50byBpdCB3aGVuIGRvaW5nIG5vcm1hbGl6ZVN0eWxlRGF0YVxuICB2YXIgb2xkU3R5bGUgPSBvbGRTdGF0aWNTdHlsZSB8fCBvbGRTdHlsZUJpbmRpbmc7XG5cbiAgdmFyIHN0eWxlID0gbm9ybWFsaXplU3R5bGVCaW5kaW5nKHZub2RlLmRhdGEuc3R5bGUpIHx8IHt9O1xuXG4gIC8vIHN0b3JlIG5vcm1hbGl6ZWQgc3R5bGUgdW5kZXIgYSBkaWZmZXJlbnQga2V5IGZvciBuZXh0IGRpZmZcbiAgLy8gbWFrZSBzdXJlIHRvIGNsb25lIGl0IGlmIGl0J3MgcmVhY3RpdmUsIHNpbmNlIHRoZSB1c2VyIGxpa2VseSB3YW50c1xuICAvLyB0byBtdXRhdGUgaXQuXG4gIHZub2RlLmRhdGEubm9ybWFsaXplZFN0eWxlID0gaXNEZWYoc3R5bGUuX19vYl9fKVxuICAgID8gZXh0ZW5kKHt9LCBzdHlsZSlcbiAgICA6IHN0eWxlO1xuXG4gIHZhciBuZXdTdHlsZSA9IGdldFN0eWxlKHZub2RlLCB0cnVlKTtcblxuICBmb3IgKG5hbWUgaW4gb2xkU3R5bGUpIHtcbiAgICBpZiAoaXNVbmRlZihuZXdTdHlsZVtuYW1lXSkpIHtcbiAgICAgIHNldFByb3AoZWwsIG5hbWUsICcnKTtcbiAgICB9XG4gIH1cbiAgZm9yIChuYW1lIGluIG5ld1N0eWxlKSB7XG4gICAgY3VyID0gbmV3U3R5bGVbbmFtZV07XG4gICAgaWYgKGN1ciAhPT0gb2xkU3R5bGVbbmFtZV0pIHtcbiAgICAgIC8vIGllOSBzZXR0aW5nIHRvIG51bGwgaGFzIG5vIGVmZmVjdCwgbXVzdCB1c2UgZW1wdHkgc3RyaW5nXG4gICAgICBzZXRQcm9wKGVsLCBuYW1lLCBjdXIgPT0gbnVsbCA/ICcnIDogY3VyKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHN0eWxlID0ge1xuICBjcmVhdGU6IHVwZGF0ZVN0eWxlLFxuICB1cGRhdGU6IHVwZGF0ZVN0eWxlXG59XG5cbi8qICAqL1xuXG4vKipcbiAqIEFkZCBjbGFzcyB3aXRoIGNvbXBhdGliaWxpdHkgZm9yIFNWRyBzaW5jZSBjbGFzc0xpc3QgaXMgbm90IHN1cHBvcnRlZCBvblxuICogU1ZHIGVsZW1lbnRzIGluIElFXG4gKi9cbmZ1bmN0aW9uIGFkZENsYXNzIChlbCwgY2xzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIWNscyB8fCAhKGNscyA9IGNscy50cmltKCkpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgaWYgKGNscy5pbmRleE9mKCcgJykgPiAtMSkge1xuICAgICAgY2xzLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGN1ciA9IFwiIFwiICsgKGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJykgKyBcIiBcIjtcbiAgICBpZiAoY3VyLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA8IDApIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoY3VyICsgY2xzKS50cmltKCkpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBjbGFzcyB3aXRoIGNvbXBhdGliaWxpdHkgZm9yIFNWRyBzaW5jZSBjbGFzc0xpc3QgaXMgbm90IHN1cHBvcnRlZCBvblxuICogU1ZHIGVsZW1lbnRzIGluIElFXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzIChlbCwgY2xzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIWNscyB8fCAhKGNscyA9IGNscy50cmltKCkpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgaWYgKGNscy5pbmRleE9mKCcgJykgPiAtMSkge1xuICAgICAgY2xzLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZWwuY2xhc3NMaXN0LnJlbW92ZShjKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKTtcbiAgICB9XG4gICAgaWYgKCFlbC5jbGFzc0xpc3QubGVuZ3RoKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBjdXIgPSBcIiBcIiArIChlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJycpICsgXCIgXCI7XG4gICAgdmFyIHRhciA9ICcgJyArIGNscyArICcgJztcbiAgICB3aGlsZSAoY3VyLmluZGV4T2YodGFyKSA+PSAwKSB7XG4gICAgICBjdXIgPSBjdXIucmVwbGFjZSh0YXIsICcgJyk7XG4gICAgfVxuICAgIGN1ciA9IGN1ci50cmltKCk7XG4gICAgaWYgKGN1cikge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGN1cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIHJlc29sdmVUcmFuc2l0aW9uIChkZWYpIHtcbiAgaWYgKCFkZWYpIHtcbiAgICByZXR1cm5cbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodHlwZW9mIGRlZiA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgcmVzID0ge307XG4gICAgaWYgKGRlZi5jc3MgIT09IGZhbHNlKSB7XG4gICAgICBleHRlbmQocmVzLCBhdXRvQ3NzVHJhbnNpdGlvbihkZWYubmFtZSB8fCAndicpKTtcbiAgICB9XG4gICAgZXh0ZW5kKHJlcywgZGVmKTtcbiAgICByZXR1cm4gcmVzXG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gYXV0b0Nzc1RyYW5zaXRpb24oZGVmKVxuICB9XG59XG5cbnZhciBhdXRvQ3NzVHJhbnNpdGlvbiA9IGNhY2hlZChmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4ge1xuICAgIGVudGVyQ2xhc3M6IChuYW1lICsgXCItZW50ZXJcIiksXG4gICAgZW50ZXJUb0NsYXNzOiAobmFtZSArIFwiLWVudGVyLXRvXCIpLFxuICAgIGVudGVyQWN0aXZlQ2xhc3M6IChuYW1lICsgXCItZW50ZXItYWN0aXZlXCIpLFxuICAgIGxlYXZlQ2xhc3M6IChuYW1lICsgXCItbGVhdmVcIiksXG4gICAgbGVhdmVUb0NsYXNzOiAobmFtZSArIFwiLWxlYXZlLXRvXCIpLFxuICAgIGxlYXZlQWN0aXZlQ2xhc3M6IChuYW1lICsgXCItbGVhdmUtYWN0aXZlXCIpXG4gIH1cbn0pO1xuXG52YXIgaGFzVHJhbnNpdGlvbiA9IGluQnJvd3NlciAmJiAhaXNJRTk7XG52YXIgVFJBTlNJVElPTiA9ICd0cmFuc2l0aW9uJztcbnZhciBBTklNQVRJT04gPSAnYW5pbWF0aW9uJztcblxuLy8gVHJhbnNpdGlvbiBwcm9wZXJ0eS9ldmVudCBzbmlmZmluZ1xudmFyIHRyYW5zaXRpb25Qcm9wID0gJ3RyYW5zaXRpb24nO1xudmFyIHRyYW5zaXRpb25FbmRFdmVudCA9ICd0cmFuc2l0aW9uZW5kJztcbnZhciBhbmltYXRpb25Qcm9wID0gJ2FuaW1hdGlvbic7XG52YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kJztcbmlmIChoYXNUcmFuc2l0aW9uKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAod2luZG93Lm9udHJhbnNpdGlvbmVuZCA9PT0gdW5kZWZpbmVkICYmXG4gICAgd2luZG93Lm9ud2Via2l0dHJhbnNpdGlvbmVuZCAhPT0gdW5kZWZpbmVkXG4gICkge1xuICAgIHRyYW5zaXRpb25Qcm9wID0gJ1dlYmtpdFRyYW5zaXRpb24nO1xuICAgIHRyYW5zaXRpb25FbmRFdmVudCA9ICd3ZWJraXRUcmFuc2l0aW9uRW5kJztcbiAgfVxuICBpZiAod2luZG93Lm9uYW5pbWF0aW9uZW5kID09PSB1bmRlZmluZWQgJiZcbiAgICB3aW5kb3cub253ZWJraXRhbmltYXRpb25lbmQgIT09IHVuZGVmaW5lZFxuICApIHtcbiAgICBhbmltYXRpb25Qcm9wID0gJ1dlYmtpdEFuaW1hdGlvbic7XG4gICAgYW5pbWF0aW9uRW5kRXZlbnQgPSAnd2Via2l0QW5pbWF0aW9uRW5kJztcbiAgfVxufVxuXG4vLyBiaW5kaW5nIHRvIHdpbmRvdyBpcyBuZWNlc3NhcnkgdG8gbWFrZSBob3QgcmVsb2FkIHdvcmsgaW4gSUUgaW4gc3RyaWN0IG1vZGVcbnZhciByYWYgPSBpbkJyb3dzZXJcbiAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KVxuICAgIDogc2V0VGltZW91dFxuICA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4oKTsgfTtcblxuZnVuY3Rpb24gbmV4dEZyYW1lIChmbikge1xuICByYWYoZnVuY3Rpb24gKCkge1xuICAgIHJhZihmbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRUcmFuc2l0aW9uQ2xhc3MgKGVsLCBjbHMpIHtcbiAgdmFyIHRyYW5zaXRpb25DbGFzc2VzID0gZWwuX3RyYW5zaXRpb25DbGFzc2VzIHx8IChlbC5fdHJhbnNpdGlvbkNsYXNzZXMgPSBbXSk7XG4gIGlmICh0cmFuc2l0aW9uQ2xhc3Nlcy5pbmRleE9mKGNscykgPCAwKSB7XG4gICAgdHJhbnNpdGlvbkNsYXNzZXMucHVzaChjbHMpO1xuICAgIGFkZENsYXNzKGVsLCBjbHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRyYW5zaXRpb25DbGFzcyAoZWwsIGNscykge1xuICBpZiAoZWwuX3RyYW5zaXRpb25DbGFzc2VzKSB7XG4gICAgcmVtb3ZlKGVsLl90cmFuc2l0aW9uQ2xhc3NlcywgY2xzKTtcbiAgfVxuICByZW1vdmVDbGFzcyhlbCwgY2xzKTtcbn1cblxuZnVuY3Rpb24gd2hlblRyYW5zaXRpb25FbmRzIChcbiAgZWwsXG4gIGV4cGVjdGVkVHlwZSxcbiAgY2Jcbikge1xuICB2YXIgcmVmID0gZ2V0VHJhbnNpdGlvbkluZm8oZWwsIGV4cGVjdGVkVHlwZSk7XG4gIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gIHZhciB0aW1lb3V0ID0gcmVmLnRpbWVvdXQ7XG4gIHZhciBwcm9wQ291bnQgPSByZWYucHJvcENvdW50O1xuICBpZiAoIXR5cGUpIHsgcmV0dXJuIGNiKCkgfVxuICB2YXIgZXZlbnQgPSB0eXBlID09PSBUUkFOU0lUSU9OID8gdHJhbnNpdGlvbkVuZEV2ZW50IDogYW5pbWF0aW9uRW5kRXZlbnQ7XG4gIHZhciBlbmRlZCA9IDA7XG4gIHZhciBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgb25FbmQpO1xuICAgIGNiKCk7XG4gIH07XG4gIHZhciBvbkVuZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBlbCkge1xuICAgICAgaWYgKCsrZW5kZWQgPj0gcHJvcENvdW50KSB7XG4gICAgICAgIGVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGVuZGVkIDwgcHJvcENvdW50KSB7XG4gICAgICBlbmQoKTtcbiAgICB9XG4gIH0sIHRpbWVvdXQgKyAxKTtcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgb25FbmQpO1xufVxuXG52YXIgdHJhbnNmb3JtUkUgPSAvXFxiKHRyYW5zZm9ybXxhbGwpKCx8JCkvO1xuXG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uSW5mbyAoZWwsIGV4cGVjdGVkVHlwZSkge1xuICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICB2YXIgdHJhbnNpdGlvbkRlbGF5cyA9IHN0eWxlc1t0cmFuc2l0aW9uUHJvcCArICdEZWxheSddLnNwbGl0KCcsICcpO1xuICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9ucyA9IHN0eWxlc1t0cmFuc2l0aW9uUHJvcCArICdEdXJhdGlvbiddLnNwbGl0KCcsICcpO1xuICB2YXIgdHJhbnNpdGlvblRpbWVvdXQgPSBnZXRUaW1lb3V0KHRyYW5zaXRpb25EZWxheXMsIHRyYW5zaXRpb25EdXJhdGlvbnMpO1xuICB2YXIgYW5pbWF0aW9uRGVsYXlzID0gc3R5bGVzW2FuaW1hdGlvblByb3AgKyAnRGVsYXknXS5zcGxpdCgnLCAnKTtcbiAgdmFyIGFuaW1hdGlvbkR1cmF0aW9ucyA9IHN0eWxlc1thbmltYXRpb25Qcm9wICsgJ0R1cmF0aW9uJ10uc3BsaXQoJywgJyk7XG4gIHZhciBhbmltYXRpb25UaW1lb3V0ID0gZ2V0VGltZW91dChhbmltYXRpb25EZWxheXMsIGFuaW1hdGlvbkR1cmF0aW9ucyk7XG5cbiAgdmFyIHR5cGU7XG4gIHZhciB0aW1lb3V0ID0gMDtcbiAgdmFyIHByb3BDb3VudCA9IDA7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoZXhwZWN0ZWRUeXBlID09PSBUUkFOU0lUSU9OKSB7XG4gICAgaWYgKHRyYW5zaXRpb25UaW1lb3V0ID4gMCkge1xuICAgICAgdHlwZSA9IFRSQU5TSVRJT047XG4gICAgICB0aW1lb3V0ID0gdHJhbnNpdGlvblRpbWVvdXQ7XG4gICAgICBwcm9wQ291bnQgPSB0cmFuc2l0aW9uRHVyYXRpb25zLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWRUeXBlID09PSBBTklNQVRJT04pIHtcbiAgICBpZiAoYW5pbWF0aW9uVGltZW91dCA+IDApIHtcbiAgICAgIHR5cGUgPSBBTklNQVRJT047XG4gICAgICB0aW1lb3V0ID0gYW5pbWF0aW9uVGltZW91dDtcbiAgICAgIHByb3BDb3VudCA9IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRpbWVvdXQgPSBNYXRoLm1heCh0cmFuc2l0aW9uVGltZW91dCwgYW5pbWF0aW9uVGltZW91dCk7XG4gICAgdHlwZSA9IHRpbWVvdXQgPiAwXG4gICAgICA/IHRyYW5zaXRpb25UaW1lb3V0ID4gYW5pbWF0aW9uVGltZW91dFxuICAgICAgICA/IFRSQU5TSVRJT05cbiAgICAgICAgOiBBTklNQVRJT05cbiAgICAgIDogbnVsbDtcbiAgICBwcm9wQ291bnQgPSB0eXBlXG4gICAgICA/IHR5cGUgPT09IFRSQU5TSVRJT05cbiAgICAgICAgPyB0cmFuc2l0aW9uRHVyYXRpb25zLmxlbmd0aFxuICAgICAgICA6IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGhcbiAgICAgIDogMDtcbiAgfVxuICB2YXIgaGFzVHJhbnNmb3JtID1cbiAgICB0eXBlID09PSBUUkFOU0lUSU9OICYmXG4gICAgdHJhbnNmb3JtUkUudGVzdChzdHlsZXNbdHJhbnNpdGlvblByb3AgKyAnUHJvcGVydHknXSk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgIHByb3BDb3VudDogcHJvcENvdW50LFxuICAgIGhhc1RyYW5zZm9ybTogaGFzVHJhbnNmb3JtXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGltZW91dCAoZGVsYXlzLCBkdXJhdGlvbnMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgd2hpbGUgKGRlbGF5cy5sZW5ndGggPCBkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgZGVsYXlzID0gZGVsYXlzLmNvbmNhdChkZWxheXMpO1xuICB9XG5cbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIGR1cmF0aW9ucy5tYXAoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICByZXR1cm4gdG9NcyhkKSArIHRvTXMoZGVsYXlzW2ldKVxuICB9KSlcbn1cblxuZnVuY3Rpb24gdG9NcyAocykge1xuICByZXR1cm4gTnVtYmVyKHMuc2xpY2UoMCwgLTEpKSAqIDEwMDBcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGVudGVyICh2bm9kZSwgdG9nZ2xlRGlzcGxheSkge1xuICB2YXIgZWwgPSB2bm9kZS5lbG07XG5cbiAgLy8gY2FsbCBsZWF2ZSBjYWxsYmFjayBub3dcbiAgaWYgKGlzRGVmKGVsLl9sZWF2ZUNiKSkge1xuICAgIGVsLl9sZWF2ZUNiLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgZWwuX2xlYXZlQ2IoKTtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzb2x2ZVRyYW5zaXRpb24odm5vZGUuZGF0YS50cmFuc2l0aW9uKTtcbiAgaWYgKGlzVW5kZWYoZGF0YSkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNEZWYoZWwuX2VudGVyQ2IpIHx8IGVsLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgY3NzID0gZGF0YS5jc3M7XG4gIHZhciB0eXBlID0gZGF0YS50eXBlO1xuICB2YXIgZW50ZXJDbGFzcyA9IGRhdGEuZW50ZXJDbGFzcztcbiAgdmFyIGVudGVyVG9DbGFzcyA9IGRhdGEuZW50ZXJUb0NsYXNzO1xuICB2YXIgZW50ZXJBY3RpdmVDbGFzcyA9IGRhdGEuZW50ZXJBY3RpdmVDbGFzcztcbiAgdmFyIGFwcGVhckNsYXNzID0gZGF0YS5hcHBlYXJDbGFzcztcbiAgdmFyIGFwcGVhclRvQ2xhc3MgPSBkYXRhLmFwcGVhclRvQ2xhc3M7XG4gIHZhciBhcHBlYXJBY3RpdmVDbGFzcyA9IGRhdGEuYXBwZWFyQWN0aXZlQ2xhc3M7XG4gIHZhciBiZWZvcmVFbnRlciA9IGRhdGEuYmVmb3JlRW50ZXI7XG4gIHZhciBlbnRlciA9IGRhdGEuZW50ZXI7XG4gIHZhciBhZnRlckVudGVyID0gZGF0YS5hZnRlckVudGVyO1xuICB2YXIgZW50ZXJDYW5jZWxsZWQgPSBkYXRhLmVudGVyQ2FuY2VsbGVkO1xuICB2YXIgYmVmb3JlQXBwZWFyID0gZGF0YS5iZWZvcmVBcHBlYXI7XG4gIHZhciBhcHBlYXIgPSBkYXRhLmFwcGVhcjtcbiAgdmFyIGFmdGVyQXBwZWFyID0gZGF0YS5hZnRlckFwcGVhcjtcbiAgdmFyIGFwcGVhckNhbmNlbGxlZCA9IGRhdGEuYXBwZWFyQ2FuY2VsbGVkO1xuICB2YXIgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuXG4gIC8vIGFjdGl2ZUluc3RhbmNlIHdpbGwgYWx3YXlzIGJlIHRoZSA8dHJhbnNpdGlvbj4gY29tcG9uZW50IG1hbmFnaW5nIHRoaXNcbiAgLy8gdHJhbnNpdGlvbi4gT25lIGVkZ2UgY2FzZSB0byBjaGVjayBpcyB3aGVuIHRoZSA8dHJhbnNpdGlvbj4gaXMgcGxhY2VkXG4gIC8vIGFzIHRoZSByb290IG5vZGUgb2YgYSBjaGlsZCBjb21wb25lbnQuIEluIHRoYXQgY2FzZSB3ZSBuZWVkIHRvIGNoZWNrXG4gIC8vIDx0cmFuc2l0aW9uPidzIHBhcmVudCBmb3IgYXBwZWFyIGNoZWNrLlxuICB2YXIgY29udGV4dCA9IGFjdGl2ZUluc3RhbmNlO1xuICB2YXIgdHJhbnNpdGlvbk5vZGUgPSBhY3RpdmVJbnN0YW5jZS4kdm5vZGU7XG4gIHdoaWxlICh0cmFuc2l0aW9uTm9kZSAmJiB0cmFuc2l0aW9uTm9kZS5wYXJlbnQpIHtcbiAgICB0cmFuc2l0aW9uTm9kZSA9IHRyYW5zaXRpb25Ob2RlLnBhcmVudDtcbiAgICBjb250ZXh0ID0gdHJhbnNpdGlvbk5vZGUuY29udGV4dDtcbiAgfVxuXG4gIHZhciBpc0FwcGVhciA9ICFjb250ZXh0Ll9pc01vdW50ZWQgfHwgIXZub2RlLmlzUm9vdEluc2VydDtcblxuICBpZiAoaXNBcHBlYXIgJiYgIWFwcGVhciAmJiBhcHBlYXIgIT09ICcnKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3RhcnRDbGFzcyA9IGlzQXBwZWFyICYmIGFwcGVhckNsYXNzXG4gICAgPyBhcHBlYXJDbGFzc1xuICAgIDogZW50ZXJDbGFzcztcbiAgdmFyIGFjdGl2ZUNsYXNzID0gaXNBcHBlYXIgJiYgYXBwZWFyQWN0aXZlQ2xhc3NcbiAgICA/IGFwcGVhckFjdGl2ZUNsYXNzXG4gICAgOiBlbnRlckFjdGl2ZUNsYXNzO1xuICB2YXIgdG9DbGFzcyA9IGlzQXBwZWFyICYmIGFwcGVhclRvQ2xhc3NcbiAgICA/IGFwcGVhclRvQ2xhc3NcbiAgICA6IGVudGVyVG9DbGFzcztcblxuICB2YXIgYmVmb3JlRW50ZXJIb29rID0gaXNBcHBlYXJcbiAgICA/IChiZWZvcmVBcHBlYXIgfHwgYmVmb3JlRW50ZXIpXG4gICAgOiBiZWZvcmVFbnRlcjtcbiAgdmFyIGVudGVySG9vayA9IGlzQXBwZWFyXG4gICAgPyAodHlwZW9mIGFwcGVhciA9PT0gJ2Z1bmN0aW9uJyA/IGFwcGVhciA6IGVudGVyKVxuICAgIDogZW50ZXI7XG4gIHZhciBhZnRlckVudGVySG9vayA9IGlzQXBwZWFyXG4gICAgPyAoYWZ0ZXJBcHBlYXIgfHwgYWZ0ZXJFbnRlcilcbiAgICA6IGFmdGVyRW50ZXI7XG4gIHZhciBlbnRlckNhbmNlbGxlZEhvb2sgPSBpc0FwcGVhclxuICAgID8gKGFwcGVhckNhbmNlbGxlZCB8fCBlbnRlckNhbmNlbGxlZClcbiAgICA6IGVudGVyQ2FuY2VsbGVkO1xuXG4gIHZhciBleHBsaWNpdEVudGVyRHVyYXRpb24gPSB0b051bWJlcihcbiAgICBpc09iamVjdChkdXJhdGlvbilcbiAgICAgID8gZHVyYXRpb24uZW50ZXJcbiAgICAgIDogZHVyYXRpb25cbiAgKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBleHBsaWNpdEVudGVyRHVyYXRpb24gIT0gbnVsbCkge1xuICAgIGNoZWNrRHVyYXRpb24oZXhwbGljaXRFbnRlckR1cmF0aW9uLCAnZW50ZXInLCB2bm9kZSk7XG4gIH1cblxuICB2YXIgZXhwZWN0c0NTUyA9IGNzcyAhPT0gZmFsc2UgJiYgIWlzSUU5O1xuICB2YXIgdXNlcldhbnRzQ29udHJvbCA9IGdldEhvb2tBcmd1bWVudHNMZW5ndGgoZW50ZXJIb29rKTtcblxuICB2YXIgY2IgPSBlbC5fZW50ZXJDYiA9IG9uY2UoZnVuY3Rpb24gKCkge1xuICAgIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIHRvQ2xhc3MpO1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBhY3RpdmVDbGFzcyk7XG4gICAgfVxuICAgIGlmIChjYi5jYW5jZWxsZWQpIHtcbiAgICAgIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgc3RhcnRDbGFzcyk7XG4gICAgICB9XG4gICAgICBlbnRlckNhbmNlbGxlZEhvb2sgJiYgZW50ZXJDYW5jZWxsZWRIb29rKGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWZ0ZXJFbnRlckhvb2sgJiYgYWZ0ZXJFbnRlckhvb2soZWwpO1xuICAgIH1cbiAgICBlbC5fZW50ZXJDYiA9IG51bGw7XG4gIH0pO1xuXG4gIGlmICghdm5vZGUuZGF0YS5zaG93KSB7XG4gICAgLy8gcmVtb3ZlIHBlbmRpbmcgbGVhdmUgZWxlbWVudCBvbiBlbnRlciBieSBpbmplY3RpbmcgYW4gaW5zZXJ0IGhvb2tcbiAgICBtZXJnZVZOb2RlSG9vayh2bm9kZSwgJ2luc2VydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgdmFyIHBlbmRpbmdOb2RlID0gcGFyZW50ICYmIHBhcmVudC5fcGVuZGluZyAmJiBwYXJlbnQuX3BlbmRpbmdbdm5vZGUua2V5XTtcbiAgICAgIGlmIChwZW5kaW5nTm9kZSAmJlxuICAgICAgICBwZW5kaW5nTm9kZS50YWcgPT09IHZub2RlLnRhZyAmJlxuICAgICAgICBwZW5kaW5nTm9kZS5lbG0uX2xlYXZlQ2JcbiAgICAgICkge1xuICAgICAgICBwZW5kaW5nTm9kZS5lbG0uX2xlYXZlQ2IoKTtcbiAgICAgIH1cbiAgICAgIGVudGVySG9vayAmJiBlbnRlckhvb2soZWwsIGNiKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHN0YXJ0IGVudGVyIHRyYW5zaXRpb25cbiAgYmVmb3JlRW50ZXJIb29rICYmIGJlZm9yZUVudGVySG9vayhlbCk7XG4gIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBzdGFydENsYXNzKTtcbiAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGFjdGl2ZUNsYXNzKTtcbiAgICBuZXh0RnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBzdGFydENsYXNzKTtcbiAgICAgIGlmICghY2IuY2FuY2VsbGVkKSB7XG4gICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgdG9DbGFzcyk7XG4gICAgICAgIGlmICghdXNlcldhbnRzQ29udHJvbCkge1xuICAgICAgICAgIGlmIChpc1ZhbGlkRHVyYXRpb24oZXhwbGljaXRFbnRlckR1cmF0aW9uKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChjYiwgZXhwbGljaXRFbnRlckR1cmF0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBjYik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAodm5vZGUuZGF0YS5zaG93KSB7XG4gICAgdG9nZ2xlRGlzcGxheSAmJiB0b2dnbGVEaXNwbGF5KCk7XG4gICAgZW50ZXJIb29rICYmIGVudGVySG9vayhlbCwgY2IpO1xuICB9XG5cbiAgaWYgKCFleHBlY3RzQ1NTICYmICF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgY2IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsZWF2ZSAodm5vZGUsIHJtKSB7XG4gIHZhciBlbCA9IHZub2RlLmVsbTtcblxuICAvLyBjYWxsIGVudGVyIGNhbGxiYWNrIG5vd1xuICBpZiAoaXNEZWYoZWwuX2VudGVyQ2IpKSB7XG4gICAgZWwuX2VudGVyQ2IuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICBlbC5fZW50ZXJDYigpO1xuICB9XG5cbiAgdmFyIGRhdGEgPSByZXNvbHZlVHJhbnNpdGlvbih2bm9kZS5kYXRhLnRyYW5zaXRpb24pO1xuICBpZiAoaXNVbmRlZihkYXRhKSB8fCBlbC5ub2RlVHlwZSAhPT0gMSkge1xuICAgIHJldHVybiBybSgpXG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGlzRGVmKGVsLl9sZWF2ZUNiKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGNzcyA9IGRhdGEuY3NzO1xuICB2YXIgdHlwZSA9IGRhdGEudHlwZTtcbiAgdmFyIGxlYXZlQ2xhc3MgPSBkYXRhLmxlYXZlQ2xhc3M7XG4gIHZhciBsZWF2ZVRvQ2xhc3MgPSBkYXRhLmxlYXZlVG9DbGFzcztcbiAgdmFyIGxlYXZlQWN0aXZlQ2xhc3MgPSBkYXRhLmxlYXZlQWN0aXZlQ2xhc3M7XG4gIHZhciBiZWZvcmVMZWF2ZSA9IGRhdGEuYmVmb3JlTGVhdmU7XG4gIHZhciBsZWF2ZSA9IGRhdGEubGVhdmU7XG4gIHZhciBhZnRlckxlYXZlID0gZGF0YS5hZnRlckxlYXZlO1xuICB2YXIgbGVhdmVDYW5jZWxsZWQgPSBkYXRhLmxlYXZlQ2FuY2VsbGVkO1xuICB2YXIgZGVsYXlMZWF2ZSA9IGRhdGEuZGVsYXlMZWF2ZTtcbiAgdmFyIGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbjtcblxuICB2YXIgZXhwZWN0c0NTUyA9IGNzcyAhPT0gZmFsc2UgJiYgIWlzSUU5O1xuICB2YXIgdXNlcldhbnRzQ29udHJvbCA9IGdldEhvb2tBcmd1bWVudHNMZW5ndGgobGVhdmUpO1xuXG4gIHZhciBleHBsaWNpdExlYXZlRHVyYXRpb24gPSB0b051bWJlcihcbiAgICBpc09iamVjdChkdXJhdGlvbilcbiAgICAgID8gZHVyYXRpb24ubGVhdmVcbiAgICAgIDogZHVyYXRpb25cbiAgKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBpc0RlZihleHBsaWNpdExlYXZlRHVyYXRpb24pKSB7XG4gICAgY2hlY2tEdXJhdGlvbihleHBsaWNpdExlYXZlRHVyYXRpb24sICdsZWF2ZScsIHZub2RlKTtcbiAgfVxuXG4gIHZhciBjYiA9IGVsLl9sZWF2ZUNiID0gb25jZShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5fcGVuZGluZykge1xuICAgICAgZWwucGFyZW50Tm9kZS5fcGVuZGluZ1t2bm9kZS5rZXldID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVUb0NsYXNzKTtcbiAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVBY3RpdmVDbGFzcyk7XG4gICAgfVxuICAgIGlmIChjYi5jYW5jZWxsZWQpIHtcbiAgICAgIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVDbGFzcyk7XG4gICAgICB9XG4gICAgICBsZWF2ZUNhbmNlbGxlZCAmJiBsZWF2ZUNhbmNlbGxlZChlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJtKCk7XG4gICAgICBhZnRlckxlYXZlICYmIGFmdGVyTGVhdmUoZWwpO1xuICAgIH1cbiAgICBlbC5fbGVhdmVDYiA9IG51bGw7XG4gIH0pO1xuXG4gIGlmIChkZWxheUxlYXZlKSB7XG4gICAgZGVsYXlMZWF2ZShwZXJmb3JtTGVhdmUpO1xuICB9IGVsc2Uge1xuICAgIHBlcmZvcm1MZWF2ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVyZm9ybUxlYXZlICgpIHtcbiAgICAvLyB0aGUgZGVsYXllZCBsZWF2ZSBtYXkgaGF2ZSBhbHJlYWR5IGJlZW4gY2FuY2VsbGVkXG4gICAgaWYgKGNiLmNhbmNlbGxlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIHJlY29yZCBsZWF2aW5nIGVsZW1lbnRcbiAgICBpZiAoIXZub2RlLmRhdGEuc2hvdykge1xuICAgICAgKGVsLnBhcmVudE5vZGUuX3BlbmRpbmcgfHwgKGVsLnBhcmVudE5vZGUuX3BlbmRpbmcgPSB7fSkpWyh2bm9kZS5rZXkpXSA9IHZub2RlO1xuICAgIH1cbiAgICBiZWZvcmVMZWF2ZSAmJiBiZWZvcmVMZWF2ZShlbCk7XG4gICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVDbGFzcyk7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQWN0aXZlQ2xhc3MpO1xuICAgICAgbmV4dEZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUNsYXNzKTtcbiAgICAgICAgaWYgKCFjYi5jYW5jZWxsZWQpIHtcbiAgICAgICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlVG9DbGFzcyk7XG4gICAgICAgICAgaWYgKCF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgICAgICAgICBpZiAoaXNWYWxpZER1cmF0aW9uKGV4cGxpY2l0TGVhdmVEdXJhdGlvbikpIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChjYiwgZXhwbGljaXRMZWF2ZUR1cmF0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdoZW5UcmFuc2l0aW9uRW5kcyhlbCwgdHlwZSwgY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGxlYXZlICYmIGxlYXZlKGVsLCBjYik7XG4gICAgaWYgKCFleHBlY3RzQ1NTICYmICF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgICBjYigpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBvbmx5IHVzZWQgaW4gZGV2IG1vZGVcbmZ1bmN0aW9uIGNoZWNrRHVyYXRpb24gKHZhbCwgbmFtZSwgdm5vZGUpIHtcbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdudW1iZXInKSB7XG4gICAgd2FybihcbiAgICAgIFwiPHRyYW5zaXRpb24+IGV4cGxpY2l0IFwiICsgbmFtZSArIFwiIGR1cmF0aW9uIGlzIG5vdCBhIHZhbGlkIG51bWJlciAtIFwiICtcbiAgICAgIFwiZ290IFwiICsgKEpTT04uc3RyaW5naWZ5KHZhbCkpICsgXCIuXCIsXG4gICAgICB2bm9kZS5jb250ZXh0XG4gICAgKTtcbiAgfSBlbHNlIGlmIChpc05hTih2YWwpKSB7XG4gICAgd2FybihcbiAgICAgIFwiPHRyYW5zaXRpb24+IGV4cGxpY2l0IFwiICsgbmFtZSArIFwiIGR1cmF0aW9uIGlzIE5hTiAtIFwiICtcbiAgICAgICd0aGUgZHVyYXRpb24gZXhwcmVzc2lvbiBtaWdodCBiZSBpbmNvcnJlY3QuJyxcbiAgICAgIHZub2RlLmNvbnRleHRcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWREdXJhdGlvbiAodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsKVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHRyYW5zaXRpb24gaG9vaydzIGFyZ3VtZW50IGxlbmd0aC4gVGhlIGhvb2sgbWF5IGJlOlxuICogLSBhIG1lcmdlZCBob29rIChpbnZva2VyKSB3aXRoIHRoZSBvcmlnaW5hbCBpbiAuZm5zXG4gKiAtIGEgd3JhcHBlZCBjb21wb25lbnQgbWV0aG9kIChjaGVjayAuX2xlbmd0aClcbiAqIC0gYSBwbGFpbiBmdW5jdGlvbiAoLmxlbmd0aClcbiAqL1xuZnVuY3Rpb24gZ2V0SG9va0FyZ3VtZW50c0xlbmd0aCAoZm4pIHtcbiAgaWYgKGlzVW5kZWYoZm4pKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgdmFyIGludm9rZXJGbnMgPSBmbi5mbnM7XG4gIGlmIChpc0RlZihpbnZva2VyRm5zKSkge1xuICAgIC8vIGludm9rZXJcbiAgICByZXR1cm4gZ2V0SG9va0FyZ3VtZW50c0xlbmd0aChcbiAgICAgIEFycmF5LmlzQXJyYXkoaW52b2tlckZucylcbiAgICAgICAgPyBpbnZva2VyRm5zWzBdXG4gICAgICAgIDogaW52b2tlckZuc1xuICAgIClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKGZuLl9sZW5ndGggfHwgZm4ubGVuZ3RoKSA+IDFcbiAgfVxufVxuXG5mdW5jdGlvbiBfZW50ZXIgKF8sIHZub2RlKSB7XG4gIGlmICh2bm9kZS5kYXRhLnNob3cgIT09IHRydWUpIHtcbiAgICBlbnRlcih2bm9kZSk7XG4gIH1cbn1cblxudmFyIHRyYW5zaXRpb24gPSBpbkJyb3dzZXIgPyB7XG4gIGNyZWF0ZTogX2VudGVyLFxuICBhY3RpdmF0ZTogX2VudGVyLFxuICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSQkMSAodm5vZGUsIHJtKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAodm5vZGUuZGF0YS5zaG93ICE9PSB0cnVlKSB7XG4gICAgICBsZWF2ZSh2bm9kZSwgcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBybSgpO1xuICAgIH1cbiAgfVxufSA6IHt9XG5cbnZhciBwbGF0Zm9ybU1vZHVsZXMgPSBbXG4gIGF0dHJzLFxuICBrbGFzcyxcbiAgZXZlbnRzLFxuICBkb21Qcm9wcyxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb25cbl1cblxuLyogICovXG5cbi8vIHRoZSBkaXJlY3RpdmUgbW9kdWxlIHNob3VsZCBiZSBhcHBsaWVkIGxhc3QsIGFmdGVyIGFsbFxuLy8gYnVpbHQtaW4gbW9kdWxlcyBoYXZlIGJlZW4gYXBwbGllZC5cbnZhciBtb2R1bGVzID0gcGxhdGZvcm1Nb2R1bGVzLmNvbmNhdChiYXNlTW9kdWxlcyk7XG5cbnZhciBwYXRjaCA9IGNyZWF0ZVBhdGNoRnVuY3Rpb24oeyBub2RlT3BzOiBub2RlT3BzLCBtb2R1bGVzOiBtb2R1bGVzIH0pO1xuXG4vKipcbiAqIE5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBsaWtlIGF0dGFjaGluZ1xuICogcHJvcGVydGllcyB0byBFbGVtZW50cy5cbiAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmIChpc0lFOSkge1xuICAvLyBodHRwOi8vd3d3Lm1hdHRzNDExLmNvbS9wb3N0L2ludGVybmV0LWV4cGxvcmVyLTktb25pbnB1dC9cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGVsICYmIGVsLnZtb2RlbCkge1xuICAgICAgdHJpZ2dlcihlbCwgJ2lucHV0Jyk7XG4gICAgfVxuICB9KTtcbn1cblxudmFyIGRpcmVjdGl2ZSA9IHtcbiAgaW5zZXJ0ZWQ6IGZ1bmN0aW9uIGluc2VydGVkIChlbCwgYmluZGluZywgdm5vZGUsIG9sZFZub2RlKSB7XG4gICAgaWYgKHZub2RlLnRhZyA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIC8vICM2OTAzXG4gICAgICBpZiAob2xkVm5vZGUuZWxtICYmICFvbGRWbm9kZS5lbG0uX3ZPcHRpb25zKSB7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLCAncG9zdHBhdGNoJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRpcmVjdGl2ZS5jb21wb25lbnRVcGRhdGVkKGVsLCBiaW5kaW5nLCB2bm9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQoZWwsIGJpbmRpbmcsIHZub2RlLmNvbnRleHQpO1xuICAgICAgfVxuICAgICAgZWwuX3ZPcHRpb25zID0gW10ubWFwLmNhbGwoZWwub3B0aW9ucywgZ2V0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodm5vZGUudGFnID09PSAndGV4dGFyZWEnIHx8IGlzVGV4dElucHV0VHlwZShlbC50eXBlKSkge1xuICAgICAgZWwuX3ZNb2RpZmllcnMgPSBiaW5kaW5nLm1vZGlmaWVycztcbiAgICAgIGlmICghYmluZGluZy5tb2RpZmllcnMubGF6eSkge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjb21wb3NpdGlvbnN0YXJ0Jywgb25Db21wb3NpdGlvblN0YXJ0KTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25lbmQnLCBvbkNvbXBvc2l0aW9uRW5kKTtcbiAgICAgICAgLy8gU2FmYXJpIDwgMTAuMiAmIFVJV2ViVmlldyBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgd2hlblxuICAgICAgICAvLyBzd2l0Y2hpbmcgZm9jdXMgYmVmb3JlIGNvbmZpcm1pbmcgY29tcG9zaXRpb24gY2hvaWNlXG4gICAgICAgIC8vIHRoaXMgYWxzbyBmaXhlcyB0aGUgaXNzdWUgd2hlcmUgc29tZSBicm93c2VycyBlLmcuIGlPUyBDaHJvbWVcbiAgICAgICAgLy8gZmlyZXMgXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIiBvbiBhdXRvY29tcGxldGUuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uQ29tcG9zaXRpb25FbmQpO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGlzSUU5KSB7XG4gICAgICAgICAgZWwudm1vZGVsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnRVcGRhdGVkOiBmdW5jdGlvbiBjb21wb25lbnRVcGRhdGVkIChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICBpZiAodm5vZGUudGFnID09PSAnc2VsZWN0Jykge1xuICAgICAgc2V0U2VsZWN0ZWQoZWwsIGJpbmRpbmcsIHZub2RlLmNvbnRleHQpO1xuICAgICAgLy8gaW4gY2FzZSB0aGUgb3B0aW9ucyByZW5kZXJlZCBieSB2LWZvciBoYXZlIGNoYW5nZWQsXG4gICAgICAvLyBpdCdzIHBvc3NpYmxlIHRoYXQgdGhlIHZhbHVlIGlzIG91dC1vZi1zeW5jIHdpdGggdGhlIHJlbmRlcmVkIG9wdGlvbnMuXG4gICAgICAvLyBkZXRlY3Qgc3VjaCBjYXNlcyBhbmQgZmlsdGVyIG91dCB2YWx1ZXMgdGhhdCBubyBsb25nZXIgaGFzIGEgbWF0Y2hpbmdcbiAgICAgIC8vIG9wdGlvbiBpbiB0aGUgRE9NLlxuICAgICAgdmFyIHByZXZPcHRpb25zID0gZWwuX3ZPcHRpb25zO1xuICAgICAgdmFyIGN1ck9wdGlvbnMgPSBlbC5fdk9wdGlvbnMgPSBbXS5tYXAuY2FsbChlbC5vcHRpb25zLCBnZXRWYWx1ZSk7XG4gICAgICBpZiAoY3VyT3B0aW9ucy5zb21lKGZ1bmN0aW9uIChvLCBpKSB7IHJldHVybiAhbG9vc2VFcXVhbChvLCBwcmV2T3B0aW9uc1tpXSk7IH0pKSB7XG4gICAgICAgIC8vIHRyaWdnZXIgY2hhbmdlIGV2ZW50IGlmXG4gICAgICAgIC8vIG5vIG1hdGNoaW5nIG9wdGlvbiBmb3VuZCBmb3IgYXQgbGVhc3Qgb25lIHZhbHVlXG4gICAgICAgIHZhciBuZWVkUmVzZXQgPSBlbC5tdWx0aXBsZVxuICAgICAgICAgID8gYmluZGluZy52YWx1ZS5zb21lKGZ1bmN0aW9uICh2KSB7IHJldHVybiBoYXNOb01hdGNoaW5nT3B0aW9uKHYsIGN1ck9wdGlvbnMpOyB9KVxuICAgICAgICAgIDogYmluZGluZy52YWx1ZSAhPT0gYmluZGluZy5vbGRWYWx1ZSAmJiBoYXNOb01hdGNoaW5nT3B0aW9uKGJpbmRpbmcudmFsdWUsIGN1ck9wdGlvbnMpO1xuICAgICAgICBpZiAobmVlZFJlc2V0KSB7XG4gICAgICAgICAgdHJpZ2dlcihlbCwgJ2NoYW5nZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRTZWxlY3RlZCAoZWwsIGJpbmRpbmcsIHZtKSB7XG4gIGFjdHVhbGx5U2V0U2VsZWN0ZWQoZWwsIGJpbmRpbmcsIHZtKTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChpc0lFIHx8IGlzRWRnZSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgYWN0dWFsbHlTZXRTZWxlY3RlZChlbCwgYmluZGluZywgdm0pO1xuICAgIH0sIDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFjdHVhbGx5U2V0U2VsZWN0ZWQgKGVsLCBiaW5kaW5nLCB2bSkge1xuICB2YXIgdmFsdWUgPSBiaW5kaW5nLnZhbHVlO1xuICB2YXIgaXNNdWx0aXBsZSA9IGVsLm11bHRpcGxlO1xuICBpZiAoaXNNdWx0aXBsZSAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICBcIjxzZWxlY3QgbXVsdGlwbGUgdi1tb2RlbD1cXFwiXCIgKyAoYmluZGluZy5leHByZXNzaW9uKSArIFwiXFxcIj4gXCIgK1xuICAgICAgXCJleHBlY3RzIGFuIEFycmF5IHZhbHVlIGZvciBpdHMgYmluZGluZywgYnV0IGdvdCBcIiArIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKSksXG4gICAgICB2bVxuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHNlbGVjdGVkLCBvcHRpb247XG4gIGZvciAodmFyIGkgPSAwLCBsID0gZWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBvcHRpb24gPSBlbC5vcHRpb25zW2ldO1xuICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICBzZWxlY3RlZCA9IGxvb3NlSW5kZXhPZih2YWx1ZSwgZ2V0VmFsdWUob3B0aW9uKSkgPiAtMTtcbiAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQgIT09IHNlbGVjdGVkKSB7XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobG9vc2VFcXVhbChnZXRWYWx1ZShvcHRpb24pLCB2YWx1ZSkpIHtcbiAgICAgICAgaWYgKGVsLnNlbGVjdGVkSW5kZXggIT09IGkpIHtcbiAgICAgICAgICBlbC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKCFpc011bHRpcGxlKSB7XG4gICAgZWwuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhc05vTWF0Y2hpbmdPcHRpb24gKHZhbHVlLCBvcHRpb25zKSB7XG4gIHJldHVybiBvcHRpb25zLmV2ZXJ5KGZ1bmN0aW9uIChvKSB7IHJldHVybiAhbG9vc2VFcXVhbChvLCB2YWx1ZSk7IH0pXG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlIChvcHRpb24pIHtcbiAgcmV0dXJuICdfdmFsdWUnIGluIG9wdGlvblxuICAgID8gb3B0aW9uLl92YWx1ZVxuICAgIDogb3B0aW9uLnZhbHVlXG59XG5cbmZ1bmN0aW9uIG9uQ29tcG9zaXRpb25TdGFydCAoZSkge1xuICBlLnRhcmdldC5jb21wb3NpbmcgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBvbkNvbXBvc2l0aW9uRW5kIChlKSB7XG4gIC8vIHByZXZlbnQgdHJpZ2dlcmluZyBhbiBpbnB1dCBldmVudCBmb3Igbm8gcmVhc29uXG4gIGlmICghZS50YXJnZXQuY29tcG9zaW5nKSB7IHJldHVybiB9XG4gIGUudGFyZ2V0LmNvbXBvc2luZyA9IGZhbHNlO1xuICB0cmlnZ2VyKGUudGFyZ2V0LCAnaW5wdXQnKTtcbn1cblxuZnVuY3Rpb24gdHJpZ2dlciAoZWwsIHR5cGUpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbn1cblxuLyogICovXG5cbi8vIHJlY3Vyc2l2ZWx5IHNlYXJjaCBmb3IgcG9zc2libGUgdHJhbnNpdGlvbiBkZWZpbmVkIGluc2lkZSB0aGUgY29tcG9uZW50IHJvb3RcbmZ1bmN0aW9uIGxvY2F0ZU5vZGUgKHZub2RlKSB7XG4gIHJldHVybiB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSAmJiAoIXZub2RlLmRhdGEgfHwgIXZub2RlLmRhdGEudHJhbnNpdGlvbilcbiAgICA/IGxvY2F0ZU5vZGUodm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlKVxuICAgIDogdm5vZGVcbn1cblxudmFyIHNob3cgPSB7XG4gIGJpbmQ6IGZ1bmN0aW9uIGJpbmQgKGVsLCByZWYsIHZub2RlKSB7XG4gICAgdmFyIHZhbHVlID0gcmVmLnZhbHVlO1xuXG4gICAgdm5vZGUgPSBsb2NhdGVOb2RlKHZub2RlKTtcbiAgICB2YXIgdHJhbnNpdGlvbiQkMSA9IHZub2RlLmRhdGEgJiYgdm5vZGUuZGF0YS50cmFuc2l0aW9uO1xuICAgIHZhciBvcmlnaW5hbERpc3BsYXkgPSBlbC5fX3ZPcmlnaW5hbERpc3BsYXkgPVxuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJycgOiBlbC5zdHlsZS5kaXNwbGF5O1xuICAgIGlmICh2YWx1ZSAmJiB0cmFuc2l0aW9uJCQxKSB7XG4gICAgICB2bm9kZS5kYXRhLnNob3cgPSB0cnVlO1xuICAgICAgZW50ZXIodm5vZGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IG9yaWdpbmFsRGlzcGxheTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyBvcmlnaW5hbERpc3BsYXkgOiAnbm9uZSc7XG4gICAgfVxuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlIChlbCwgcmVmLCB2bm9kZSkge1xuICAgIHZhciB2YWx1ZSA9IHJlZi52YWx1ZTtcbiAgICB2YXIgb2xkVmFsdWUgPSByZWYub2xkVmFsdWU7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIXZhbHVlID09PSAhb2xkVmFsdWUpIHsgcmV0dXJuIH1cbiAgICB2bm9kZSA9IGxvY2F0ZU5vZGUodm5vZGUpO1xuICAgIHZhciB0cmFuc2l0aW9uJCQxID0gdm5vZGUuZGF0YSAmJiB2bm9kZS5kYXRhLnRyYW5zaXRpb247XG4gICAgaWYgKHRyYW5zaXRpb24kJDEpIHtcbiAgICAgIHZub2RlLmRhdGEuc2hvdyA9IHRydWU7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZW50ZXIodm5vZGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZWwuX192T3JpZ2luYWxEaXNwbGF5O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlYXZlKHZub2RlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/IGVsLl9fdk9yaWdpbmFsRGlzcGxheSA6ICdub25lJztcbiAgICB9XG4gIH0sXG5cbiAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQgKFxuICAgIGVsLFxuICAgIGJpbmRpbmcsXG4gICAgdm5vZGUsXG4gICAgb2xkVm5vZGUsXG4gICAgaXNEZXN0cm95XG4gICkge1xuICAgIGlmICghaXNEZXN0cm95KSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZWwuX192T3JpZ2luYWxEaXNwbGF5O1xuICAgIH1cbiAgfVxufVxuXG52YXIgcGxhdGZvcm1EaXJlY3RpdmVzID0ge1xuICBtb2RlbDogZGlyZWN0aXZlLFxuICBzaG93OiBzaG93XG59XG5cbi8qICAqL1xuXG4vLyBQcm92aWRlcyB0cmFuc2l0aW9uIHN1cHBvcnQgZm9yIGEgc2luZ2xlIGVsZW1lbnQvY29tcG9uZW50LlxuLy8gc3VwcG9ydHMgdHJhbnNpdGlvbiBtb2RlIChvdXQtaW4gLyBpbi1vdXQpXG5cbnZhciB0cmFuc2l0aW9uUHJvcHMgPSB7XG4gIG5hbWU6IFN0cmluZyxcbiAgYXBwZWFyOiBCb29sZWFuLFxuICBjc3M6IEJvb2xlYW4sXG4gIG1vZGU6IFN0cmluZyxcbiAgdHlwZTogU3RyaW5nLFxuICBlbnRlckNsYXNzOiBTdHJpbmcsXG4gIGxlYXZlQ2xhc3M6IFN0cmluZyxcbiAgZW50ZXJUb0NsYXNzOiBTdHJpbmcsXG4gIGxlYXZlVG9DbGFzczogU3RyaW5nLFxuICBlbnRlckFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIGxlYXZlQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyVG9DbGFzczogU3RyaW5nLFxuICBkdXJhdGlvbjogW051bWJlciwgU3RyaW5nLCBPYmplY3RdXG59O1xuXG4vLyBpbiBjYXNlIHRoZSBjaGlsZCBpcyBhbHNvIGFuIGFic3RyYWN0IGNvbXBvbmVudCwgZS5nLiA8a2VlcC1hbGl2ZT5cbi8vIHdlIHdhbnQgdG8gcmVjdXJzaXZlbHkgcmV0cmlldmUgdGhlIHJlYWwgY29tcG9uZW50IHRvIGJlIHJlbmRlcmVkXG5mdW5jdGlvbiBnZXRSZWFsQ2hpbGQgKHZub2RlKSB7XG4gIHZhciBjb21wT3B0aW9ucyA9IHZub2RlICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gIGlmIChjb21wT3B0aW9ucyAmJiBjb21wT3B0aW9ucy5DdG9yLm9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICByZXR1cm4gZ2V0UmVhbENoaWxkKGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoY29tcE9wdGlvbnMuY2hpbGRyZW4pKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB2bm9kZVxuICB9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RUcmFuc2l0aW9uRGF0YSAoY29tcCkge1xuICB2YXIgZGF0YSA9IHt9O1xuICB2YXIgb3B0aW9ucyA9IGNvbXAuJG9wdGlvbnM7XG4gIC8vIHByb3BzXG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zLnByb3BzRGF0YSkge1xuICAgIGRhdGFba2V5XSA9IGNvbXBba2V5XTtcbiAgfVxuICAvLyBldmVudHMuXG4gIC8vIGV4dHJhY3QgbGlzdGVuZXJzIGFuZCBwYXNzIHRoZW0gZGlyZWN0bHkgdG8gdGhlIHRyYW5zaXRpb24gbWV0aG9kc1xuICB2YXIgbGlzdGVuZXJzID0gb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICBmb3IgKHZhciBrZXkkMSBpbiBsaXN0ZW5lcnMpIHtcbiAgICBkYXRhW2NhbWVsaXplKGtleSQxKV0gPSBsaXN0ZW5lcnNba2V5JDFdO1xuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbmZ1bmN0aW9uIHBsYWNlaG9sZGVyIChoLCByYXdDaGlsZCkge1xuICBpZiAoL1xcZC1rZWVwLWFsaXZlJC8udGVzdChyYXdDaGlsZC50YWcpKSB7XG4gICAgcmV0dXJuIGgoJ2tlZXAtYWxpdmUnLCB7XG4gICAgICBwcm9wczogcmF3Q2hpbGQuY29tcG9uZW50T3B0aW9ucy5wcm9wc0RhdGFcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhc1BhcmVudFRyYW5zaXRpb24gKHZub2RlKSB7XG4gIHdoaWxlICgodm5vZGUgPSB2bm9kZS5wYXJlbnQpKSB7XG4gICAgaWYgKHZub2RlLmRhdGEudHJhbnNpdGlvbikge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTYW1lQ2hpbGQgKGNoaWxkLCBvbGRDaGlsZCkge1xuICByZXR1cm4gb2xkQ2hpbGQua2V5ID09PSBjaGlsZC5rZXkgJiYgb2xkQ2hpbGQudGFnID09PSBjaGlsZC50YWdcbn1cblxudmFyIFRyYW5zaXRpb24gPSB7XG4gIG5hbWU6ICd0cmFuc2l0aW9uJyxcbiAgcHJvcHM6IHRyYW5zaXRpb25Qcm9wcyxcbiAgYWJzdHJhY3Q6IHRydWUsXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIgKGgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuJHNsb3RzLmRlZmF1bHQ7XG4gICAgaWYgKCFjaGlsZHJlbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIG91dCB0ZXh0IG5vZGVzIChwb3NzaWJsZSB3aGl0ZXNwYWNlcylcbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy50YWcgfHwgaXNBc3luY1BsYWNlaG9sZGVyKGMpOyB9KTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIWNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gd2FybiBtdWx0aXBsZSBlbGVtZW50c1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICc8dHJhbnNpdGlvbj4gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIHNpbmdsZSBlbGVtZW50LiBVc2UgJyArXG4gICAgICAgICc8dHJhbnNpdGlvbi1ncm91cD4gZm9yIGxpc3RzLicsXG4gICAgICAgIHRoaXMuJHBhcmVudFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgbW9kZSA9IHRoaXMubW9kZTtcblxuICAgIC8vIHdhcm4gaW52YWxpZCBtb2RlXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAgIG1vZGUgJiYgbW9kZSAhPT0gJ2luLW91dCcgJiYgbW9kZSAhPT0gJ291dC1pbidcbiAgICApIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdpbnZhbGlkIDx0cmFuc2l0aW9uPiBtb2RlOiAnICsgbW9kZSxcbiAgICAgICAgdGhpcy4kcGFyZW50XG4gICAgICApO1xuICAgIH1cblxuICAgIHZhciByYXdDaGlsZCA9IGNoaWxkcmVuWzBdO1xuXG4gICAgLy8gaWYgdGhpcyBpcyBhIGNvbXBvbmVudCByb290IG5vZGUgYW5kIHRoZSBjb21wb25lbnQnc1xuICAgIC8vIHBhcmVudCBjb250YWluZXIgbm9kZSBhbHNvIGhhcyB0cmFuc2l0aW9uLCBza2lwLlxuICAgIGlmIChoYXNQYXJlbnRUcmFuc2l0aW9uKHRoaXMuJHZub2RlKSkge1xuICAgICAgcmV0dXJuIHJhd0NoaWxkXG4gICAgfVxuXG4gICAgLy8gYXBwbHkgdHJhbnNpdGlvbiBkYXRhIHRvIGNoaWxkXG4gICAgLy8gdXNlIGdldFJlYWxDaGlsZCgpIHRvIGlnbm9yZSBhYnN0cmFjdCBjb21wb25lbnRzIGUuZy4ga2VlcC1hbGl2ZVxuICAgIHZhciBjaGlsZCA9IGdldFJlYWxDaGlsZChyYXdDaGlsZCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFjaGlsZCkge1xuICAgICAgcmV0dXJuIHJhd0NoaWxkXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xlYXZpbmcpIHtcbiAgICAgIHJldHVybiBwbGFjZWhvbGRlcihoLCByYXdDaGlsZClcbiAgICB9XG5cbiAgICAvLyBlbnN1cmUgYSBrZXkgdGhhdCBpcyB1bmlxdWUgdG8gdGhlIHZub2RlIHR5cGUgYW5kIHRvIHRoaXMgdHJhbnNpdGlvblxuICAgIC8vIGNvbXBvbmVudCBpbnN0YW5jZS4gVGhpcyBrZXkgd2lsbCBiZSB1c2VkIHRvIHJlbW92ZSBwZW5kaW5nIGxlYXZpbmcgbm9kZXNcbiAgICAvLyBkdXJpbmcgZW50ZXJpbmcuXG4gICAgdmFyIGlkID0gXCJfX3RyYW5zaXRpb24tXCIgKyAodGhpcy5fdWlkKSArIFwiLVwiO1xuICAgIGNoaWxkLmtleSA9IGNoaWxkLmtleSA9PSBudWxsXG4gICAgICA/IGNoaWxkLmlzQ29tbWVudFxuICAgICAgICA/IGlkICsgJ2NvbW1lbnQnXG4gICAgICAgIDogaWQgKyBjaGlsZC50YWdcbiAgICAgIDogaXNQcmltaXRpdmUoY2hpbGQua2V5KVxuICAgICAgICA/IChTdHJpbmcoY2hpbGQua2V5KS5pbmRleE9mKGlkKSA9PT0gMCA/IGNoaWxkLmtleSA6IGlkICsgY2hpbGQua2V5KVxuICAgICAgICA6IGNoaWxkLmtleTtcblxuICAgIHZhciBkYXRhID0gKGNoaWxkLmRhdGEgfHwgKGNoaWxkLmRhdGEgPSB7fSkpLnRyYW5zaXRpb24gPSBleHRyYWN0VHJhbnNpdGlvbkRhdGEodGhpcyk7XG4gICAgdmFyIG9sZFJhd0NoaWxkID0gdGhpcy5fdm5vZGU7XG4gICAgdmFyIG9sZENoaWxkID0gZ2V0UmVhbENoaWxkKG9sZFJhd0NoaWxkKTtcblxuICAgIC8vIG1hcmsgdi1zaG93XG4gICAgLy8gc28gdGhhdCB0aGUgdHJhbnNpdGlvbiBtb2R1bGUgY2FuIGhhbmQgb3ZlciB0aGUgY29udHJvbCB0byB0aGUgZGlyZWN0aXZlXG4gICAgaWYgKGNoaWxkLmRhdGEuZGlyZWN0aXZlcyAmJiBjaGlsZC5kYXRhLmRpcmVjdGl2ZXMuc29tZShmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5uYW1lID09PSAnc2hvdyc7IH0pKSB7XG4gICAgICBjaGlsZC5kYXRhLnNob3cgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIG9sZENoaWxkICYmXG4gICAgICBvbGRDaGlsZC5kYXRhICYmXG4gICAgICAhaXNTYW1lQ2hpbGQoY2hpbGQsIG9sZENoaWxkKSAmJlxuICAgICAgIWlzQXN5bmNQbGFjZWhvbGRlcihvbGRDaGlsZCkgJiZcbiAgICAgIC8vICM2Njg3IGNvbXBvbmVudCByb290IGlzIGEgY29tbWVudCBub2RlXG4gICAgICAhKG9sZENoaWxkLmNvbXBvbmVudEluc3RhbmNlICYmIG9sZENoaWxkLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZS5pc0NvbW1lbnQpXG4gICAgKSB7XG4gICAgICAvLyByZXBsYWNlIG9sZCBjaGlsZCB0cmFuc2l0aW9uIGRhdGEgd2l0aCBmcmVzaCBvbmVcbiAgICAgIC8vIGltcG9ydGFudCBmb3IgZHluYW1pYyB0cmFuc2l0aW9ucyFcbiAgICAgIHZhciBvbGREYXRhID0gb2xkQ2hpbGQuZGF0YS50cmFuc2l0aW9uID0gZXh0ZW5kKHt9LCBkYXRhKTtcbiAgICAgIC8vIGhhbmRsZSB0cmFuc2l0aW9uIG1vZGVcbiAgICAgIGlmIChtb2RlID09PSAnb3V0LWluJykge1xuICAgICAgICAvLyByZXR1cm4gcGxhY2Vob2xkZXIgbm9kZSBhbmQgcXVldWUgdXBkYXRlIHdoZW4gbGVhdmUgZmluaXNoZXNcbiAgICAgICAgdGhpcy5fbGVhdmluZyA9IHRydWU7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKG9sZERhdGEsICdhZnRlckxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMkMS5fbGVhdmluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMkMS4kZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwbGFjZWhvbGRlcihoLCByYXdDaGlsZClcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ2luLW91dCcpIHtcbiAgICAgICAgaWYgKGlzQXN5bmNQbGFjZWhvbGRlcihjaGlsZCkpIHtcbiAgICAgICAgICByZXR1cm4gb2xkUmF3Q2hpbGRcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsYXllZExlYXZlO1xuICAgICAgICB2YXIgcGVyZm9ybUxlYXZlID0gZnVuY3Rpb24gKCkgeyBkZWxheWVkTGVhdmUoKTsgfTtcbiAgICAgICAgbWVyZ2VWTm9kZUhvb2soZGF0YSwgJ2FmdGVyRW50ZXInLCBwZXJmb3JtTGVhdmUpO1xuICAgICAgICBtZXJnZVZOb2RlSG9vayhkYXRhLCAnZW50ZXJDYW5jZWxsZWQnLCBwZXJmb3JtTGVhdmUpO1xuICAgICAgICBtZXJnZVZOb2RlSG9vayhvbGREYXRhLCAnZGVsYXlMZWF2ZScsIGZ1bmN0aW9uIChsZWF2ZSkgeyBkZWxheWVkTGVhdmUgPSBsZWF2ZTsgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhd0NoaWxkXG4gIH1cbn1cblxuLyogICovXG5cbi8vIFByb3ZpZGVzIHRyYW5zaXRpb24gc3VwcG9ydCBmb3IgbGlzdCBpdGVtcy5cbi8vIHN1cHBvcnRzIG1vdmUgdHJhbnNpdGlvbnMgdXNpbmcgdGhlIEZMSVAgdGVjaG5pcXVlLlxuXG4vLyBCZWNhdXNlIHRoZSB2ZG9tJ3MgY2hpbGRyZW4gdXBkYXRlIGFsZ29yaXRobSBpcyBcInVuc3RhYmxlXCIgLSBpLmUuXG4vLyBpdCBkb2Vzbid0IGd1YXJhbnRlZSB0aGUgcmVsYXRpdmUgcG9zaXRpb25pbmcgb2YgcmVtb3ZlZCBlbGVtZW50cyxcbi8vIHdlIGZvcmNlIHRyYW5zaXRpb24tZ3JvdXAgdG8gdXBkYXRlIGl0cyBjaGlsZHJlbiBpbnRvIHR3byBwYXNzZXM6XG4vLyBpbiB0aGUgZmlyc3QgcGFzcywgd2UgcmVtb3ZlIGFsbCBub2RlcyB0aGF0IG5lZWQgdG8gYmUgcmVtb3ZlZCxcbi8vIHRyaWdnZXJpbmcgdGhlaXIgbGVhdmluZyB0cmFuc2l0aW9uOyBpbiB0aGUgc2Vjb25kIHBhc3MsIHdlIGluc2VydC9tb3ZlXG4vLyBpbnRvIHRoZSBmaW5hbCBkZXNpcmVkIHN0YXRlLiBUaGlzIHdheSBpbiB0aGUgc2Vjb25kIHBhc3MgcmVtb3ZlZFxuLy8gbm9kZXMgd2lsbCByZW1haW4gd2hlcmUgdGhleSBzaG91bGQgYmUuXG5cbnZhciBwcm9wcyA9IGV4dGVuZCh7XG4gIHRhZzogU3RyaW5nLFxuICBtb3ZlQ2xhc3M6IFN0cmluZ1xufSwgdHJhbnNpdGlvblByb3BzKTtcblxuZGVsZXRlIHByb3BzLm1vZGU7XG5cbnZhciBUcmFuc2l0aW9uR3JvdXAgPSB7XG4gIHByb3BzOiBwcm9wcyxcblxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCkge1xuICAgIHZhciB0YWcgPSB0aGlzLnRhZyB8fCB0aGlzLiR2bm9kZS5kYXRhLnRhZyB8fCAnc3Bhbic7XG4gICAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMucHJldkNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcbiAgICB2YXIgcmF3Q2hpbGRyZW4gPSB0aGlzLiRzbG90cy5kZWZhdWx0IHx8IFtdO1xuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB2YXIgdHJhbnNpdGlvbkRhdGEgPSBleHRyYWN0VHJhbnNpdGlvbkRhdGEodGhpcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IHJhd0NoaWxkcmVuW2ldO1xuICAgICAgaWYgKGMudGFnKSB7XG4gICAgICAgIGlmIChjLmtleSAhPSBudWxsICYmIFN0cmluZyhjLmtleSkuaW5kZXhPZignX192bGlzdCcpICE9PSAwKSB7XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChjKTtcbiAgICAgICAgICBtYXBbYy5rZXldID0gY1xuICAgICAgICAgIDsoYy5kYXRhIHx8IChjLmRhdGEgPSB7fSkpLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRGF0YTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdmFyIG9wdHMgPSBjLmNvbXBvbmVudE9wdGlvbnM7XG4gICAgICAgICAgdmFyIG5hbWUgPSBvcHRzID8gKG9wdHMuQ3Rvci5vcHRpb25zLm5hbWUgfHwgb3B0cy50YWcgfHwgJycpIDogYy50YWc7XG4gICAgICAgICAgd2FybigoXCI8dHJhbnNpdGlvbi1ncm91cD4gY2hpbGRyZW4gbXVzdCBiZSBrZXllZDogPFwiICsgbmFtZSArIFwiPlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJldkNoaWxkcmVuKSB7XG4gICAgICB2YXIga2VwdCA9IFtdO1xuICAgICAgdmFyIHJlbW92ZWQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IHByZXZDaGlsZHJlbi5sZW5ndGg7IGkkMSsrKSB7XG4gICAgICAgIHZhciBjJDEgPSBwcmV2Q2hpbGRyZW5baSQxXTtcbiAgICAgICAgYyQxLmRhdGEudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25EYXRhO1xuICAgICAgICBjJDEuZGF0YS5wb3MgPSBjJDEuZWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAobWFwW2MkMS5rZXldKSB7XG4gICAgICAgICAga2VwdC5wdXNoKGMkMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVtb3ZlZC5wdXNoKGMkMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMua2VwdCA9IGgodGFnLCBudWxsLCBrZXB0KTtcbiAgICAgIHRoaXMucmVtb3ZlZCA9IHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGgodGFnLCBudWxsLCBjaGlsZHJlbilcbiAgfSxcblxuICBiZWZvcmVVcGRhdGU6IGZ1bmN0aW9uIGJlZm9yZVVwZGF0ZSAoKSB7XG4gICAgLy8gZm9yY2UgcmVtb3ZpbmcgcGFzc1xuICAgIHRoaXMuX19wYXRjaF9fKFxuICAgICAgdGhpcy5fdm5vZGUsXG4gICAgICB0aGlzLmtlcHQsXG4gICAgICBmYWxzZSwgLy8gaHlkcmF0aW5nXG4gICAgICB0cnVlIC8vIHJlbW92ZU9ubHkgKCFpbXBvcnRhbnQsIGF2b2lkcyB1bm5lY2Vzc2FyeSBtb3ZlcylcbiAgICApO1xuICAgIHRoaXMuX3Zub2RlID0gdGhpcy5rZXB0O1xuICB9LFxuXG4gIHVwZGF0ZWQ6IGZ1bmN0aW9uIHVwZGF0ZWQgKCkge1xuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJldkNoaWxkcmVuO1xuICAgIHZhciBtb3ZlQ2xhc3MgPSB0aGlzLm1vdmVDbGFzcyB8fCAoKHRoaXMubmFtZSB8fCAndicpICsgJy1tb3ZlJyk7XG4gICAgaWYgKCFjaGlsZHJlbi5sZW5ndGggfHwgIXRoaXMuaGFzTW92ZShjaGlsZHJlblswXS5lbG0sIG1vdmVDbGFzcykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHdlIGRpdmlkZSB0aGUgd29yayBpbnRvIHRocmVlIGxvb3BzIHRvIGF2b2lkIG1peGluZyBET00gcmVhZHMgYW5kIHdyaXRlc1xuICAgIC8vIGluIGVhY2ggaXRlcmF0aW9uIC0gd2hpY2ggaGVscHMgcHJldmVudCBsYXlvdXQgdGhyYXNoaW5nLlxuICAgIGNoaWxkcmVuLmZvckVhY2goY2FsbFBlbmRpbmdDYnMpO1xuICAgIGNoaWxkcmVuLmZvckVhY2gocmVjb3JkUG9zaXRpb24pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goYXBwbHlUcmFuc2xhdGlvbik7XG5cbiAgICAvLyBmb3JjZSByZWZsb3cgdG8gcHV0IGV2ZXJ5dGhpbmcgaW4gcG9zaXRpb25cbiAgICAvLyBhc3NpZ24gdG8gdGhpcyB0byBhdm9pZCBiZWluZyByZW1vdmVkIGluIHRyZWUtc2hha2luZ1xuICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgIHRoaXMuX3JlZmxvdyA9IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0O1xuXG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgaWYgKGMuZGF0YS5tb3ZlZCkge1xuICAgICAgICB2YXIgZWwgPSBjLmVsbTtcbiAgICAgICAgdmFyIHMgPSBlbC5zdHlsZTtcbiAgICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBtb3ZlQ2xhc3MpO1xuICAgICAgICBzLnRyYW5zZm9ybSA9IHMuV2Via2l0VHJhbnNmb3JtID0gcy50cmFuc2l0aW9uRHVyYXRpb24gPSAnJztcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kRXZlbnQsIGVsLl9tb3ZlQ2IgPSBmdW5jdGlvbiBjYiAoZSkge1xuICAgICAgICAgIGlmICghZSB8fCAvdHJhbnNmb3JtJC8udGVzdChlLnByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkVuZEV2ZW50LCBjYik7XG4gICAgICAgICAgICBlbC5fbW92ZUNiID0gbnVsbDtcbiAgICAgICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbW92ZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBoYXNNb3ZlOiBmdW5jdGlvbiBoYXNNb3ZlIChlbCwgbW92ZUNsYXNzKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghaGFzVHJhbnNpdGlvbikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHRoaXMuX2hhc01vdmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc01vdmVcbiAgICAgIH1cbiAgICAgIC8vIERldGVjdCB3aGV0aGVyIGFuIGVsZW1lbnQgd2l0aCB0aGUgbW92ZSBjbGFzcyBhcHBsaWVkIGhhc1xuICAgICAgLy8gQ1NTIHRyYW5zaXRpb25zLiBTaW5jZSB0aGUgZWxlbWVudCBtYXkgYmUgaW5zaWRlIGFuIGVudGVyaW5nXG4gICAgICAvLyB0cmFuc2l0aW9uIGF0IHRoaXMgdmVyeSBtb21lbnQsIHdlIG1ha2UgYSBjbG9uZSBvZiBpdCBhbmQgcmVtb3ZlXG4gICAgICAvLyBhbGwgb3RoZXIgdHJhbnNpdGlvbiBjbGFzc2VzIGFwcGxpZWQgdG8gZW5zdXJlIG9ubHkgdGhlIG1vdmUgY2xhc3NcbiAgICAgIC8vIGlzIGFwcGxpZWQuXG4gICAgICB2YXIgY2xvbmUgPSBlbC5jbG9uZU5vZGUoKTtcbiAgICAgIGlmIChlbC5fdHJhbnNpdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgZWwuX3RyYW5zaXRpb25DbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGNscykgeyByZW1vdmVDbGFzcyhjbG9uZSwgY2xzKTsgfSk7XG4gICAgICB9XG4gICAgICBhZGRDbGFzcyhjbG9uZSwgbW92ZUNsYXNzKTtcbiAgICAgIGNsb25lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLiRlbC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICB2YXIgaW5mbyA9IGdldFRyYW5zaXRpb25JbmZvKGNsb25lKTtcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgICAgIHJldHVybiAodGhpcy5faGFzTW92ZSA9IGluZm8uaGFzVHJhbnNmb3JtKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsUGVuZGluZ0NicyAoYykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGMuZWxtLl9tb3ZlQ2IpIHtcbiAgICBjLmVsbS5fbW92ZUNiKCk7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChjLmVsbS5fZW50ZXJDYikge1xuICAgIGMuZWxtLl9lbnRlckNiKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjb3JkUG9zaXRpb24gKGMpIHtcbiAgYy5kYXRhLm5ld1BvcyA9IGMuZWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xufVxuXG5mdW5jdGlvbiBhcHBseVRyYW5zbGF0aW9uIChjKSB7XG4gIHZhciBvbGRQb3MgPSBjLmRhdGEucG9zO1xuICB2YXIgbmV3UG9zID0gYy5kYXRhLm5ld1BvcztcbiAgdmFyIGR4ID0gb2xkUG9zLmxlZnQgLSBuZXdQb3MubGVmdDtcbiAgdmFyIGR5ID0gb2xkUG9zLnRvcCAtIG5ld1Bvcy50b3A7XG4gIGlmIChkeCB8fCBkeSkge1xuICAgIGMuZGF0YS5tb3ZlZCA9IHRydWU7XG4gICAgdmFyIHMgPSBjLmVsbS5zdHlsZTtcbiAgICBzLnRyYW5zZm9ybSA9IHMuV2Via2l0VHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyBkeCArIFwicHgsXCIgKyBkeSArIFwicHgpXCI7XG4gICAgcy50cmFuc2l0aW9uRHVyYXRpb24gPSAnMHMnO1xuICB9XG59XG5cbnZhciBwbGF0Zm9ybUNvbXBvbmVudHMgPSB7XG4gIFRyYW5zaXRpb246IFRyYW5zaXRpb24sXG4gIFRyYW5zaXRpb25Hcm91cDogVHJhbnNpdGlvbkdyb3VwXG59XG5cbi8qICAqL1xuXG4vLyBpbnN0YWxsIHBsYXRmb3JtIHNwZWNpZmljIHV0aWxzXG5WdWUuY29uZmlnLm11c3RVc2VQcm9wID0gbXVzdFVzZVByb3A7XG5WdWUuY29uZmlnLmlzUmVzZXJ2ZWRUYWcgPSBpc1Jlc2VydmVkVGFnO1xuVnVlLmNvbmZpZy5pc1Jlc2VydmVkQXR0ciA9IGlzUmVzZXJ2ZWRBdHRyO1xuVnVlLmNvbmZpZy5nZXRUYWdOYW1lc3BhY2UgPSBnZXRUYWdOYW1lc3BhY2U7XG5WdWUuY29uZmlnLmlzVW5rbm93bkVsZW1lbnQgPSBpc1Vua25vd25FbGVtZW50O1xuXG4vLyBpbnN0YWxsIHBsYXRmb3JtIHJ1bnRpbWUgZGlyZWN0aXZlcyAmIGNvbXBvbmVudHNcbmV4dGVuZChWdWUub3B0aW9ucy5kaXJlY3RpdmVzLCBwbGF0Zm9ybURpcmVjdGl2ZXMpO1xuZXh0ZW5kKFZ1ZS5vcHRpb25zLmNvbXBvbmVudHMsIHBsYXRmb3JtQ29tcG9uZW50cyk7XG5cbi8vIGluc3RhbGwgcGxhdGZvcm0gcGF0Y2ggZnVuY3Rpb25cblZ1ZS5wcm90b3R5cGUuX19wYXRjaF9fID0gaW5Ccm93c2VyID8gcGF0Y2ggOiBub29wO1xuXG4vLyBwdWJsaWMgbW91bnQgbWV0aG9kXG5WdWUucHJvdG90eXBlLiRtb3VudCA9IGZ1bmN0aW9uIChcbiAgZWwsXG4gIGh5ZHJhdGluZ1xuKSB7XG4gIGVsID0gZWwgJiYgaW5Ccm93c2VyID8gcXVlcnkoZWwpIDogdW5kZWZpbmVkO1xuICByZXR1cm4gbW91bnRDb21wb25lbnQodGhpcywgZWwsIGh5ZHJhdGluZylcbn07XG5cbi8vIGRldnRvb2xzIGdsb2JhbCBob29rXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKGluQnJvd3Nlcikge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY29uZmlnLmRldnRvb2xzKSB7XG4gICAgICBpZiAoZGV2dG9vbHMpIHtcbiAgICAgICAgZGV2dG9vbHMuZW1pdCgnaW5pdCcsIFZ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgaXNDaHJvbWVcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlW2NvbnNvbGUuaW5mbyA/ICdpbmZvJyA6ICdsb2cnXShcbiAgICAgICAgICAnRG93bmxvYWQgdGhlIFZ1ZSBEZXZ0b29scyBleHRlbnNpb24gZm9yIGEgYmV0dGVyIGRldmVsb3BtZW50IGV4cGVyaWVuY2U6XFxuJyArXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtZGV2dG9vbHMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICBjb25maWcucHJvZHVjdGlvblRpcCAhPT0gZmFsc2UgJiZcbiAgICAgIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJ1xuICAgICkge1xuICAgICAgY29uc29sZVtjb25zb2xlLmluZm8gPyAnaW5mbycgOiAnbG9nJ10oXG4gICAgICAgIFwiWW91IGFyZSBydW5uaW5nIFZ1ZSBpbiBkZXZlbG9wbWVudCBtb2RlLlxcblwiICtcbiAgICAgICAgXCJNYWtlIHN1cmUgdG8gdHVybiBvbiBwcm9kdWN0aW9uIG1vZGUgd2hlbiBkZXBsb3lpbmcgZm9yIHByb2R1Y3Rpb24uXFxuXCIgK1xuICAgICAgICBcIlNlZSBtb3JlIHRpcHMgYXQgaHR0cHM6Ly92dWVqcy5vcmcvZ3VpZGUvZGVwbG95bWVudC5odG1sXCJcbiAgICAgICk7XG4gICAgfVxuICB9LCAwKTtcbn1cblxuLyogICovXG5cbm1vZHVsZS5leHBvcnRzID0gVnVlO1xuIl19
}).call(this,require("qC859L"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"qC859L":1}],4:[function(require,module,exports){
'use strict';

var inserted = exports.cache = {};

exports.insert = function (css) {
  if (inserted[css]) return;
  inserted[css] = true;

  var elem = document.createElement('style');
  elem.setAttribute('type', 'text/css');

  if ('textContent' in elem) {
    elem.textContent = css;
  } else {
    elem.styleSheet.cssText = css;
  }

  document.getElementsByTagName('head')[0].appendChild(elem);
  return elem;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc2VydC1jc3MuanMiXSwibmFtZXMiOlsiaW5zZXJ0ZWQiLCJleHBvcnRzIiwiY2FjaGUiLCJpbnNlcnQiLCJjc3MiLCJlbGVtIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUUMsS0FBUixHQUFnQixFQUEvQjs7QUFFQUQsUUFBUUUsTUFBUixHQUFpQixVQUFVQyxHQUFWLEVBQWU7QUFDOUIsTUFBSUosU0FBU0ksR0FBVCxDQUFKLEVBQW1CO0FBQ25CSixXQUFTSSxHQUFULElBQWdCLElBQWhCOztBQUVBLE1BQUlDLE9BQU9DLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWDtBQUNBRixPQUFLRyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLFVBQTFCOztBQUVBLE1BQUksaUJBQWlCSCxJQUFyQixFQUEyQjtBQUN6QkEsU0FBS0ksV0FBTCxHQUFtQkwsR0FBbkI7QUFDRCxHQUZELE1BRU87QUFDTEMsU0FBS0ssVUFBTCxDQUFnQkMsT0FBaEIsR0FBMEJQLEdBQTFCO0FBQ0Q7O0FBRURFLFdBQVNNLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDQyxXQUF6QyxDQUFxRFIsSUFBckQ7QUFDQSxTQUFPQSxJQUFQO0FBQ0QsQ0FmRCIsImZpbGUiOiJpbnNlcnQtY3NzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGluc2VydGVkID0gZXhwb3J0cy5jYWNoZSA9IHt9XG5cbmV4cG9ydHMuaW5zZXJ0ID0gZnVuY3Rpb24gKGNzcykge1xuICBpZiAoaW5zZXJ0ZWRbY3NzXSkgcmV0dXJuXG4gIGluc2VydGVkW2Nzc10gPSB0cnVlXG5cbiAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIGVsZW0uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJylcblxuICBpZiAoJ3RleHRDb250ZW50JyBpbiBlbGVtKSB7XG4gICAgZWxlbS50ZXh0Q29udGVudCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIGVsZW0uc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH1cblxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGVsZW0pXG4gIHJldHVybiBlbGVtXG59XG4iXX0=
},{}],5:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.red {\n  color: #f00;\n}\n")
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require("./store.js");

var _store2 = _interopRequireDefault(_store);

var _mixin = require("./mixin.js");

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_mixin2.default],
  data: function data() {
    return {
      drawer: null,
      colorTheme: 'indigo'
    };
  },

  computed: {
    menuList: function menuList() {
      return this.$store.getters.menuList;
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<v-app id=\"inspire\">\n     <v-navigation-drawer fixed=\"\" v-model=\"drawer\" app=\"\">\n       <v-list dense=\"\">\n         <v-list-tile v-on:click=\"$router.push(item.route)\" v-for=\"item in menuList\" v-bind:key=\"item.icon\">\n           <v-list-tile-action>\n             <v-icon>{{item.icon}}</v-icon>\n           </v-list-tile-action>\n           <v-list-tile-content>\n             <v-list-tile-title>{{item.title}}</v-list-tile-title>\n           </v-list-tile-content>\n         </v-list-tile>         \n       </v-list>\n     </v-navigation-drawer>\n     <v-toolbar v-bind:color=\"colorTheme\" dark=\"\" fixed=\"\" app=\"\">\n       <v-toolbar-side-icon @click.stop=\"drawer = !drawer\"></v-toolbar-side-icon>\n       <v-toolbar-title>Gulp + Browserify + Vueify + Vuetify (full demo)</v-toolbar-title>\n     </v-toolbar>\n     <v-content>\n       <v-container fluid=\"\" fill-height=\"\">  \n          <v-layout justify-center=\"\" align-center=\"\">       \n           <!-- отображение компонента, для которого совпал путь -->\n           <router-view></router-view>\n          </v-layout>\n       </v-container>\n     </v-content>\n     <v-footer v-bind:color=\"colorTheme\" app=\"\" inset=\"\">\n       <span class=\"white--text\">© 2018</span>\n     </v-footer>\n   </v-app>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.red {\n  color: #f00;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-91e83a14", module.exports)
  } else {
    hotAPI.update("_v-91e83a14", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./mixin.js":9,"./store.js":12,"vue":3,"vue-hot-reload-api":2,"vueify/lib/insert-css":4}],6:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.comp-a[_v-79604d2e] {\n  color: #ffaa00;\n}\n")
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "contacts",
  data: function data() {
    return {
      msg: "Hello from component Contacts!"
    };
  },

  methods: {
    fromPlugin: function fromPlugin() {
      return Vue.myGlobalMethod();
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div _v-79604d2e=\"\">\n  <h2 class=\"comp-a\" _v-79604d2e=\"\">{{msg}}</h2>\n  <span _v-79604d2e=\"\">{{fromPlugin()}}</span>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.comp-a[_v-79604d2e] {\n  color: #ffaa00;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-79604d2e", module.exports)
  } else {
    hotAPI.update("_v-79604d2e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":3,"vue-hot-reload-api":2,"vueify/lib/insert-css":4}],7:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.comp-a[_v-7501153a] {\n  color: #affa00;\n}\n")
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "home",
  data: function data() {
    return {
      msg: "Hello from component Home!"
    };
  },

  computed: {
    fromStore: function fromStore() {
      return this.$store.getters.msg;
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div _v-7501153a=\"\">\n  <h2 class=\"comp-a\" _v-7501153a=\"\">{{msg}}</h2>\n  <span _v-7501153a=\"\">{{fromStore}}</span>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.comp-a[_v-7501153a] {\n  color: #affa00;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-7501153a", module.exports)
  } else {
    hotAPI.update("_v-7501153a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":3,"vue-hot-reload-api":2,"vueify/lib/insert-css":4}],8:[function(require,module,exports){
'use strict';

var _plugins = require('./plugins.js');

var _plugins2 = _interopRequireDefault(_plugins);

var _store = require('./store.js');

var _store2 = _interopRequireDefault(_store);

var _router = require('./router.js');

var _router2 = _interopRequireDefault(_router);

var _app = require('./app.vue');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// main.js
new Vue({
  el: '#app',
  router: _router2.default,
  store: _store2.default,
  render: function render(createElement) {
    return createElement(_app2.default);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNDg2ODk2ZjkuanMiXSwibmFtZXMiOlsiVnVlIiwiZWwiLCJyb3V0ZXIiLCJSb3V0ZXIiLCJzdG9yZSIsIlN0b3JlIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsIkFwcCJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSkE7QUFRQSxJQUFJQSxHQUFKLENBQVE7QUFDTkMsTUFBSSxNQURFO0FBRU5DLFVBQVFDLGdCQUZGO0FBR05DLFNBQU9DLGVBSEQ7QUFJTkMsVUFBUSxnQkFBVUMsYUFBVixFQUF5QjtBQUMvQixXQUFPQSxjQUFjQyxhQUFkLENBQVA7QUFDRDtBQU5LLENBQVIiLCJmaWxlIjoiZmFrZV80ODY4OTZmOS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1haW4uanNcclxuaW1wb3J0IFBsdWdpbnMgZnJvbSAnLi9wbHVnaW5zLmpzJ1xyXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9zdG9yZS5qcydcclxuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlci5qcydcclxuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC52dWUnXHJcblxyXG5cclxuXHJcbm5ldyBWdWUoe1xyXG4gIGVsOiAnI2FwcCcsXHJcbiAgcm91dGVyOiBSb3V0ZXIsXHJcbiAgc3RvcmU6IFN0b3JlLFxyXG4gIHJlbmRlcjogZnVuY3Rpb24gKGNyZWF0ZUVsZW1lbnQpIHtcclxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KEFwcClcclxuICB9XHJcbn0pO1xyXG4iXX0=
},{"./app.vue":5,"./plugins.js":10,"./router.js":11,"./store.js":12}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// mixin.js
var mixins = {
  methods: {
    hello: function hello() {
      return 'hello from [mixin]!';
    }
  }
};

exports.default = mixins;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1peGluLmpzIl0sIm5hbWVzIjpbIm1peGlucyIsIm1ldGhvZHMiLCJoZWxsbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLElBQU1BLFNBQVM7QUFDYkMsV0FBUztBQUNQQyxXQUFPLGlCQUFZO0FBQ2pCLGFBQU8scUJBQVA7QUFDRDtBQUhNO0FBREksQ0FBZjs7a0JBUWVGLE0iLCJmaWxlIjoibWl4aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaXhpbi5qc1xyXG5jb25zdCBtaXhpbnMgPSB7XHJcbiAgbWV0aG9kczoge1xyXG4gICAgaGVsbG86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICdoZWxsbyBmcm9tIFttaXhpbl0hJztcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtaXhpbnNcclxuIl19
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var MyPlugin = function install(Vue, options) {

    Vue.myGlobalMethod = function () {
        return "Hello from [Plugin]";
    };

    Vue.directive('my-directive', {
        bind: function bind(el, binding, vnode, oldVnode) {}
    });

    Vue.mixin({
        created: function created() {
            console.log('created');
        }

    });

    Vue.prototype.$myMethod = function (methodOptions) {};
};

Vue.use(MyPlugin);

exports.default = MyPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbnMuanMiXSwibmFtZXMiOlsiTXlQbHVnaW4iLCJpbnN0YWxsIiwiVnVlIiwib3B0aW9ucyIsIm15R2xvYmFsTWV0aG9kIiwiZGlyZWN0aXZlIiwiYmluZCIsImVsIiwiYmluZGluZyIsInZub2RlIiwib2xkVm5vZGUiLCJtaXhpbiIsImNyZWF0ZWQiLCJjb25zb2xlIiwibG9nIiwicHJvdG90eXBlIiwiJG15TWV0aG9kIiwibWV0aG9kT3B0aW9ucyIsInVzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxXQUFXLFNBRWJDLE9BRmEsQ0FFTEMsR0FGSyxFQUVBQyxPQUZBLEVBRVM7O0FBRXRCRCxRQUFJRSxjQUFKLEdBQXFCLFlBQVk7QUFDN0IsZUFBTyxxQkFBUDtBQUNILEtBRkQ7O0FBSUFGLFFBQUlHLFNBQUosQ0FBYyxjQUFkLEVBQThCO0FBQzFCQyxZQUQwQixnQkFDckJDLEVBRHFCLEVBQ2pCQyxPQURpQixFQUNSQyxLQURRLEVBQ0RDLFFBREMsRUFDUyxDQUVsQztBQUh5QixLQUE5Qjs7QUFPQVIsUUFBSVMsS0FBSixDQUFVO0FBQ05DLGlCQUFTLG1CQUFZO0FBQ2pCQyxvQkFBUUMsR0FBUixDQUFZLFNBQVo7QUFDSDs7QUFISyxLQUFWOztBQU9BWixRQUFJYSxTQUFKLENBQWNDLFNBQWQsR0FBMEIsVUFBVUMsYUFBVixFQUF5QixDQUVsRCxDQUZEO0FBR0gsQ0F6QkQ7O0FBNEJBZixJQUFJZ0IsR0FBSixDQUFRbEIsUUFBUjs7a0JBRWVBLFEiLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE15UGx1Z2luID0gZnVuY3Rpb25cclxuXHJcbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xyXG5cclxuICAgIFZ1ZS5teUdsb2JhbE1ldGhvZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gXCJIZWxsbyBmcm9tIFtQbHVnaW5dXCI7XHJcbiAgICB9O1xyXG5cclxuICAgIFZ1ZS5kaXJlY3RpdmUoJ215LWRpcmVjdGl2ZScsIHtcclxuICAgICAgICBiaW5kKGVsLCBiaW5kaW5nLCB2bm9kZSwgb2xkVm5vZGUpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFZ1ZS5taXhpbih7XHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBWdWUucHJvdG90eXBlLiRteU1ldGhvZCA9IGZ1bmN0aW9uIChtZXRob2RPcHRpb25zKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuVnVlLnVzZShNeVBsdWdpbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeVBsdWdpbjsiXX0=
},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require('./components/home.vue');

var _home2 = _interopRequireDefault(_home);

var _contacts = require('./components/contacts.vue');

var _contacts2 = _interopRequireDefault(_contacts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{ path: '/', component: _home2.default }, { path: '/contacts', component: _contacts2.default }];

var router = new VueRouter({
  routes: routes
});

exports.default = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJwYXRoIiwiY29tcG9uZW50IiwiaG9tZSIsImNvbnRhY3RzIiwicm91dGVyIiwiVnVlUm91dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTLENBQ1gsRUFBRUMsTUFBTSxHQUFSLEVBQWFDLFdBQVdDLGNBQXhCLEVBRFcsRUFFWCxFQUFFRixNQUFNLFdBQVIsRUFBcUJDLFdBQVdFLGtCQUFoQyxFQUZXLENBQWY7O0FBS0UsSUFBTUMsU0FBUyxJQUFJQyxTQUFKLENBQWM7QUFDM0JOO0FBRDJCLENBQWQsQ0FBZjs7a0JBSWVLLE0iLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhvbWUgZnJvbSAnLi9jb21wb25lbnRzL2hvbWUudnVlJ1xyXG5pbXBvcnQgY29udGFjdHMgZnJvbSAnLi9jb21wb25lbnRzL2NvbnRhY3RzLnZ1ZSdcclxuXHJcbmNvbnN0IHJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogJy8nLCBjb21wb25lbnQ6IGhvbWUgfSxcclxuICAgIHsgcGF0aDogJy9jb250YWN0cycsIGNvbXBvbmVudDogY29udGFjdHMgfVxyXG4gIF1cclxuICAgXHJcbiAgY29uc3Qgcm91dGVyID0gbmV3IFZ1ZVJvdXRlcih7XHJcbiAgICByb3V0ZXMgXHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgcm91dGVyIl19
},{"./components/contacts.vue":6,"./components/home.vue":7}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var store = new Vuex.Store({
  state: {
    msg: 'Hello from [Store]',
    menuList: [{ title: 'Главная', icon: 'home', route: '/' }, { title: 'Контакты', icon: 'contact_mail', route: 'contacts' }]
  },
  getters: {
    msg: function msg(state) {
      return state.msg;
    },
    menuList: function menuList(state) {
      return state.menuList;
    }
  }
});

exports.default = store;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlLmpzIl0sIm5hbWVzIjpbInN0b3JlIiwiVnVleCIsIlN0b3JlIiwic3RhdGUiLCJtc2ciLCJtZW51TGlzdCIsInRpdGxlIiwiaWNvbiIsInJvdXRlIiwiZ2V0dGVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxRQUFRLElBQUlDLEtBQUtDLEtBQVQsQ0FBZTtBQUMzQkMsU0FBTztBQUNMQyxTQUFLLG9CQURBO0FBRUxDLGNBQVMsQ0FDUCxFQUFDQyxPQUFNLFNBQVAsRUFBa0JDLE1BQUssTUFBdkIsRUFBK0JDLE9BQU0sR0FBckMsRUFETyxFQUVQLEVBQUNGLE9BQU0sVUFBUCxFQUFtQkMsTUFBSyxjQUF4QixFQUF3Q0MsT0FBTSxVQUE5QyxFQUZPO0FBRkosR0FEb0I7QUFRM0JDLFdBQVM7QUFDUEwsU0FBSyxvQkFBUztBQUNaLGFBQU9ELE1BQU1DLEdBQWI7QUFDRCxLQUhNO0FBSVBDLGNBQVUseUJBQVM7QUFDakIsYUFBT0YsTUFBTUUsUUFBYjtBQUNEO0FBTk07QUFSa0IsQ0FBZixDQUFkOztrQkFrQmVMLEsiLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdG9yZSA9IG5ldyBWdWV4LlN0b3JlKHtcclxuICBzdGF0ZToge1xyXG4gICAgbXNnOiAnSGVsbG8gZnJvbSBbU3RvcmVdJyxcclxuICAgIG1lbnVMaXN0OltcclxuICAgICAge3RpdGxlOifQk9C70LDQstC90LDRjycsIGljb246J2hvbWUnLCByb3V0ZTonLyd9LFxyXG4gICAgICB7dGl0bGU6J9Ca0L7QvdGC0LDQutGC0YsnLCBpY29uOidjb250YWN0X21haWwnLCByb3V0ZTonY29udGFjdHMnfVxyXG4gICAgXSwgICBcclxuICB9LFxyXG4gIGdldHRlcnM6IHtcclxuICAgIG1zZzogc3RhdGUgPT4ge1xyXG4gICAgICByZXR1cm4gc3RhdGUubXNnO1xyXG4gICAgfSxcclxuICAgIG1lbnVMaXN0OiBzdGF0ZSA9PiB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS5tZW51TGlzdDtcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yZSJdfQ==
},{}]},{},[8])