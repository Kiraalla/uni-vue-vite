<script>
export default {
  onLaunch: function () {
    // console.log('App Launch')
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
  mounted() {
    // console.log('App Mounted')
    const coverSupport =
      'CSS' in window &&
      typeof CSS.supports === 'function' &&
      (CSS.supports('top: env(a)') || CSS.supports('top: constant(a)'));

    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content =
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
      (coverSupport ? ', viewport-fit=cover' : '');

    document.head.appendChild(meta);
  },
}
</script>

<style>
/* 每个页面公共css */
@import "@/static/base.css";
</style>