<script>
export default {
  onLaunch: function () {
    // #ifdef H5
    this.setViewportMeta();
    this.removeScrollEvent();
    // #endif
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
  methods: {
    // #ifdef H5
    setViewportMeta() {
      const coverSupport =
        "CSS" in window &&
        typeof CSS !== 'undefined' &&
        typeof CSS.supports === "function" &&
        (CSS.supports("top: env(a)") || CSS.supports("top: constant(a)"));

      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content =
        "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" +
        (coverSupport ? ", viewport-fit=cover" : "");

      document.head.appendChild(meta);
    },
    // 去除谷歌浏览器的scroll、wheel等事件警告
    removeScrollEvent() {
      if (typeof EventTarget !== "undefined") {
        let func = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, fn, capture) {
          let passive = false;
          if (typeof capture === "object") {
            passive = capture.passive || false;
            capture.passive = false;
          } else {
            passive = !!capture;
            capture = { passive: false };
          }
          func.call(this, type, fn, { ...capture, passive });
        };
      }
    },
    // #endif
  },
};
</script>

<style lang="scss">
@use "@/styles/main.scss";
</style>
