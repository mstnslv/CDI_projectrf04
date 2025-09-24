
const ClickOutside = {
  install: (app, options) => {
    app.directive('click-outside', {
      mounted: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // here I check that click was outside the el and his children
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            binding.value(event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    });

    app.directive('click-outside-v2',{
      mounted: function (el, binding, vnode){
        document.body.removeEventListener('click', el.clickOutsideEvent);
        el.clickOutsideEvent = function (event) {
            const isClickInside = vnode.children.some(element => {
              const el = element.el
              return event.target === el || el.contains(event.target)
            })
            if(!isClickInside) {
              binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    });
  }
}

export default ClickOutside;

